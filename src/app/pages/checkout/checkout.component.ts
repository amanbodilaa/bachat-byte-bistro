import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { CartItem } from '../../core/models/cart.model';
import { PaymentMode } from '../../core/models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <div class="page-wrapper">
      <div class="checkout-page container">

        <!-- If cart empty, redirect hint -->
        @if (cartItems.length === 0 && !confirmed) {
          <div class="empty-checkout">
            <div style="font-size:4rem;margin-bottom:1rem;">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Go back and add some items first.</p>
            <button class="btn btn-primary" style="margin-top:1.5rem" (click)="goToMenu()">Browse Menu</button>
          </div>
        }

        <!-- Confirmation Screen -->
        @if (confirmed && placedOrder) {
          <div class="confirmation">
            <div class="confirmation-badge">🎉</div>
            <h1>Order Placed!</h1>
            <p class="confirm-sub">Your order is confirmed. Pay at the counter and collect when ready.</p>

            <div class="token-display">
              <div class="token-label">Your Token Number</div>
              <div class="token-number">#{{ String(placedOrder.tokenNumber).padStart(2,'0') }}</div>
              <div class="token-id">Order ID: {{ placedOrder.orderId }}</div>
            </div>

            <div class="confirm-details">
              <div class="confirm-row">
                <span>Payment Mode</span>
                <strong>{{ placedOrder.paymentMode }} at counter</strong>
              </div>
              <div class="confirm-row">
                <span>Total Amount</span>
                <strong class="price-tag">₹{{ placedOrder.total }}</strong>
              </div>
              <div class="confirm-row">
                <span>Name</span>
                <strong>{{ placedOrder.customer.name }}</strong>
              </div>
            </div>

            <p class="email-note">📧 A confirmation will be sent to {{ placedOrder.customer.email }}</p>

            <div class="confirm-actions">
              <button class="btn btn-primary" (click)="trackOrder()">Track My Order</button>
              <button class="btn btn-outline" (click)="viewInvoice()">View Invoice</button>
            </div>
          </div>
        }

        <!-- Checkout Form -->
        @if (!confirmed && cartItems.length > 0) {
          <div class="checkout-grid">
            <!-- Order Summary -->
            <div class="order-summary card" style="padding:2rem;">
              <h2 style="margin-bottom:1.5rem;">Order Summary</h2>
              <div class="summary-items">
                @for (item of cartItems; track item.menuItem.id) {
                  <div class="summary-item">
                    <span class="s-emoji">{{ item.menuItem.emoji }}</span>
                    <div class="s-info">
                      <div class="s-name">{{ item.menuItem.name }}</div>
                      <div class="s-qty">× {{ item.quantity }}</div>
                    </div>
                    <div class="s-price">₹{{ item.menuItem.price * item.quantity }}</div>
                  </div>
                }
              </div>
              <div class="summary-divider"></div>
              <div class="summary-total-row">
                <span>Total</span>
                <span class="price-tag">₹{{ cartTotal }}</span>
              </div>
              <p class="pay-note">💳 Pay by Cash or UPI at the counter</p>
            </div>

            <!-- Form -->
            <form class="checkout-form card" style="padding:2rem;" [formGroup]="form" (ngSubmit)="onSubmit()">
              <h2 style="margin-bottom:1.5rem;">Your Details</h2>

              <div class="form-group">
                <label class="form-label" for="name">Full Name *</label>
                <input id="name" class="form-input" type="text" formControlName="name" placeholder="Enter your name"
                  [class.error]="form.get('name')?.invalid && form.get('name')?.touched" />
                @if (form.get('name')?.invalid && form.get('name')?.touched) {
                  <span class="form-error">Name is required</span>
                }
              </div>

              <div class="form-group" style="margin-top:1.25rem;">
                <label class="form-label" for="phone">Phone Number *</label>
                <input id="phone" class="form-input" type="tel" formControlName="phone" placeholder="+91 XXXXX XXXXX"
                  [class.error]="form.get('phone')?.invalid && form.get('phone')?.touched" />
                @if (form.get('phone')?.invalid && form.get('phone')?.touched) {
                  <span class="form-error">Enter a valid 10-digit phone number</span>
                }
              </div>

              <div class="form-group" style="margin-top:1.25rem;">
                <label class="form-label" for="email">Email Address *</label>
                <input id="email" class="form-input" type="email" formControlName="email" placeholder="you@example.com"
                  [class.error]="form.get('email')?.invalid && form.get('email')?.touched" />
                @if (form.get('email')?.invalid && form.get('email')?.touched) {
                  <span class="form-error">Enter a valid email address</span>
                }
              </div>

              <div class="payment-section" style="margin-top:1.75rem;">
                <h3 style="margin-bottom:1rem;font-size:1rem;">Payment Mode (at counter)</h3>
                <div class="payment-options">
                  @for (mode of paymentModes; track mode.value) {
                    <label class="payment-option" [class.selected]="selectedPayment === mode.value">
                      <input type="radio" [value]="mode.value" [(ngModel)]="selectedPayment" [ngModelOptions]="{standalone:true}" />
                      <span class="pm-icon">{{ mode.icon }}</span>
                      <div class="pm-info">
                        <div class="pm-name">{{ mode.label }}</div>
                        <div class="pm-desc">{{ mode.desc }}</div>
                      </div>
                      @if (selectedPayment === mode.value) {
                        <span class="pm-check">✓</span>
                      }
                    </label>
                  }
                </div>
              </div>

              <button class="btn btn-primary" style="width:100%;margin-top:2rem;" type="submit"
                [disabled]="form.invalid">
                Confirm Order ₹{{ cartTotal }}
              </button>
            </form>
          </div>
        }
      </div>

      <!-- Payment Modal -->
      @if (showModal) {
        <div class="modal-overlay" (click)="showModal=false">
          <div class="modal-box" (click)="$event.stopPropagation()">
            <h2 style="margin-bottom:0.5rem;">Choose Payment Mode</h2>
            <p style="opacity:0.7;margin-bottom:1.5rem;font-size:0.9rem;">You'll pay at the counter — no online payment required.</p>
            <div class="payment-options">
              @for (mode of paymentModes; track mode.value) {
                <label class="payment-option" [class.selected]="selectedPayment === mode.value">
                  <input type="radio" [value]="mode.value" [(ngModel)]="selectedPayment" [ngModelOptions]="{standalone:true}" />
                  <span class="pm-icon">{{ mode.icon }}</span>
                  <div class="pm-info">
                    <div class="pm-name">{{ mode.label }}</div>
                    <div class="pm-desc">{{ mode.desc }}</div>
                  </div>
                </label>
              }
            </div>
            <button class="btn btn-primary" style="width:100%;margin-top:1.5rem;" (click)="confirmFromModal()">
              Confirm & Place Order
            </button>
            <button class="btn btn-outline" style="width:100%;margin-top:0.5rem;" (click)="showModal=false">Cancel</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .checkout-page { padding: 2.5rem 1.5rem 5rem; }
    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .empty-checkout {
      text-align: center;
      padding: 6rem 2rem;
    }
    .empty-checkout p { opacity: 0.6; margin-top: 0.5rem; }

    /* Summary */
    .summary-items { display: flex; flex-direction: column; gap: 0.75rem; }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 0;
      border-bottom: 1px solid var(--color-cream);
    }
    .s-emoji { font-size: 1.5rem; }
    .s-info { flex: 1; }
    .s-name { font-weight: 600; font-size: 0.9rem; color: var(--color-teal-deep); }
    .s-qty { font-size: 0.78rem; opacity: 0.6; }
    .s-price { font-weight: 700; color: var(--color-teal-dark); }
    .summary-divider { height: 2px; background: var(--color-cream); margin: 1rem 0; }
    .summary-total-row { display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem; }
    .pay-note { font-size: 0.82rem; opacity: 0.65; margin-top: 0.75rem; }

    /* Payment Options */
    .payment-options { display: flex; flex-direction: column; gap: 0.75rem; }
    .payment-option {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border: 2px solid var(--color-cream);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: border-color var(--transition-base), background var(--transition-base);
      position: relative;
    }
    .payment-option input { display: none; }
    .payment-option.selected {
      border-color: var(--color-terracotta);
      background: rgba(217, 112, 31, 0.05);
    }
    .pm-icon { font-size: 1.75rem; }
    .pm-info { flex: 1; }
    .pm-name { font-weight: 700; font-size: 0.95rem; color: var(--color-teal-deep); }
    .pm-desc { font-size: 0.78rem; opacity: 0.6; margin-top: 0.1rem; }
    .pm-check {
      width: 22px; height: 22px;
      background: var(--color-terracotta);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
    }

    /* Confirmation */
    .confirmation {
      max-width: 520px;
      margin: 0 auto;
      text-align: center;
      padding: 3rem 1.5rem;
    }
    .confirmation-badge { font-size: 4rem; margin-bottom: 1rem; }
    .confirm-sub { opacity: 0.7; margin: 0.5rem 0 2rem; }
    .token-display {
      background: linear-gradient(135deg, var(--color-teal-deep), var(--color-teal-dark));
      border-radius: var(--radius-xl);
      padding: 2.5rem 2rem;
      margin: 1.5rem 0;
      color: white;
    }
    .token-label { font-size: 0.85rem; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
    .token-number {
      font-family: var(--font-display);
      font-size: 5rem;
      font-weight: 800;
      color: var(--color-amber-gold);
      line-height: 1;
      animation: pulse-ring 2s infinite;
    }
    .token-id { font-size: 0.78rem; opacity: 0.5; margin-top: 0.5rem; }
    .confirm-details {
      background: var(--color-white);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      margin: 1.5rem 0;
      text-align: left;
    }
    .confirm-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      font-size: 0.9rem;
      border-bottom: 1px solid var(--color-cream);
    }
    .confirm-row:last-child { border-bottom: none; }
    .confirm-row span { opacity: 0.65; }
    .email-note { font-size: 0.82rem; opacity: 0.6; margin-bottom: 2rem; }
    .confirm-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

    @media (max-width: 768px) {
      .checkout-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  cartItems: CartItem[] = [];
  cartTotal = 0;
  selectedPayment: PaymentMode = 'Cash';
  showModal = false;
  confirmed = false;
  placedOrder: any = null;
  String = String;

  paymentModes = [
    { value: 'Cash' as PaymentMode, label: 'Cash', icon: '💵', desc: 'Pay with notes and coins at the counter' },
    { value: 'UPI' as PaymentMode, label: 'UPI / Scan & Pay', icon: '📲', desc: 'Scan the QR code at the counter' },
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => (this.cartItems = items));
    this.cartService.cartTotal$.subscribe(total => (this.cartTotal = total));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.placeOrder();
  }

  confirmFromModal(): void {
    this.showModal = false;
    this.placeOrder();
  }

  private placeOrder(): void {
    const { name, phone, email } = this.form.value;
    this.placedOrder = this.orderService.placeOrder(
      this.cartItems,
      { name, phone, email },
      this.selectedPayment
    );
    this.cartService.clearCart();
    this.confirmed = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackOrder(): void {
    this.router.navigate(['/track', this.placedOrder.orderId]);
  }

  viewInvoice(): void {
    this.router.navigate(['/invoice', this.placedOrder.orderId]);
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
