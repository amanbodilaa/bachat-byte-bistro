import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  template: `
    <!-- Toast notification popover -->
    @if (toast$ | async; as toast) {
      <div class="cart-toast">
        <span class="toast-emoji">{{ toast.emoji }}</span>
        <span class="toast-msg">{{ toast.message }}</span>
        <button class="toast-action" (click)="openCart()">View Basket →</button>
      </div>
    }

    <!-- Slide-over Drawer Overlay -->
    @if (isOpen$ | async) {
      <div class="drawer-overlay" (click)="closeCart()">
        <div class="drawer-panel" (click)="$event.stopPropagation()">
          
          <!-- Drawer Header -->
          <div class="drawer-header">
            <div class="dh-title-wrap">
              <span class="dh-icon">🛒</span>
              <div>
                <h2>Your Basket</h2>
                <span class="dh-count">{{ cartCount$ | async }} item(s)</span>
              </div>
            </div>
            <button class="dh-close-btn" (click)="closeCart()" aria-label="Close basket">✕</button>
          </div>

          <!-- Price Promise Banner -->
          <div class="drawer-promise-banner">
            <span class="dp-icon">✨</span>
            <span>All items <strong>₹100 or below</strong> · Fresh &amp; made to order</span>
          </div>

          <!-- Drawer Body -->
          <div class="drawer-body">
            @if ((cart$ | async)!.length === 0) {
              <div class="drawer-empty">
                <div class="empty-icon-wrap">
                  <span class="e-icon e1">🧆</span>
                  <span class="e-icon e2">🌮</span>
                  <span class="e-icon e3">🥤</span>
                </div>
                <h3>Your basket is empty</h3>
                <p>Explore our menu and add your favorite bistro items!</p>
                <button class="btn btn-primary btn-sm" (click)="goToMenu()">Explore Menu →</button>
              </div>
            } @else {
              <div class="cart-items-list">
                @for (item of cart$ | async; track item.menuItem.id) {
                  <div class="drawer-cart-item">
                    
                    <div class="item-thumb">
                      @if (item.menuItem.image) {
                        <img [src]="item.menuItem.image" [alt]="item.menuItem.name" class="thumb-img" />
                      } @else {
                        <span class="thumb-emoji">{{ item.menuItem.emoji }}</span>
                      }
                    </div>

                    <div class="item-details">
                      <div class="item-name">{{ item.menuItem.name }}</div>
                      <div class="item-cuisine">{{ item.menuItem.cuisine }}</div>
                      <div class="item-unit-price">₹{{ item.menuItem.price }} each</div>
                    </div>

                    <div class="item-controls">
                      <div class="stepper-wrap">
                        <button class="step-btn" (click)="decrease(item)" aria-label="Decrease">−</button>
                        <span class="step-qty">{{ item.quantity }}</span>
                        <button class="step-btn" (click)="increase(item)" aria-label="Increase">+</button>
                      </div>
                      
                      <div class="item-price-actions">
                        <span class="item-subtotal">₹{{ item.menuItem.price * item.quantity }}</span>
                        <button class="delete-btn" (click)="deleteItem(item.menuItem.id)" title="Remove item">🗑️</button>
                      </div>
                    </div>

                  </div>
                }
              </div>

              <!-- Kitchen Note Input -->
              <div class="kitchen-note-box">
                <label class="note-label">📝 Kitchen Instructions (Optional)</label>
                <input 
                  type="text" 
                  class="note-input"
                  placeholder="e.g. Extra mint chutney, less spicy..."
                  [ngModel]="orderNote"
                  (ngModelChange)="onNoteChange($event)" />
              </div>
            }
          </div>

          <!-- Drawer Footer -->
          @if ((cart$ | async)!.length > 0) {
            <div class="drawer-footer">
              <div class="bill-row">
                <span>Subtotal</span>
                <span>₹{{ cartTotal$ | async }}</span>
              </div>
              <div class="bill-row">
                <span>Taxes &amp; Packaging</span>
                <span class="free-tag">FREE</span>
              </div>
              <div class="bill-row grand-row">
                <span>Grand Total</span>
                <span class="grand-amount">₹{{ cartTotal$ | async }}</span>
              </div>

              <button class="btn btn-primary btn-checkout-lg" (click)="proceedToCheckout()">
                <span>Proceed to Checkout</span>
                <span class="btn-price-badge">₹{{ cartTotal$ | async }} →</span>
              </button>
            </div>
          }

        </div>
      </div>
    }
  `,
  styles: [`
    /* Toast Popover */
    .cart-toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 2000;
      background: var(--color-teal-dark);
      color: white;
      padding: 0.85rem 1.25rem;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      border: 1.5px solid var(--color-terracotta);
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .toast-emoji { font-size: 1.2rem; }
    .toast-msg { font-size: 0.9rem; font-weight: 500; }
    .toast-action {
      background: var(--color-terracotta);
      color: white;
      border: none;
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      margin-left: 0.5rem;
    }

    /* Drawer Overlay */
    .drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 92, 98, 0.5);
      backdrop-filter: blur(6px);
      z-index: 1500;
      display: flex;
      justify-content: flex-end;
      animation: fadeIn 0.25s ease;
    }

    /* Drawer Panel */
    .drawer-panel {
      width: 100%;
      max-width: 440px;
      height: 100vh;
      background: white;
      display: flex;
      flex-direction: column;
      box-shadow: -10px 0 40px rgba(0,0,0,0.2);
      animation: slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Header */
    .drawer-header {
      background: linear-gradient(135deg, #0F5C62, #1E413D);
      color: white;
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dh-title-wrap { display: flex; align-items: center; gap: 0.85rem; }
    .dh-icon { font-size: 1.75rem; }
    .drawer-header h2 { font-family: var(--font-display); font-size: 1.35rem; color: white; margin-bottom: 0.1rem; }
    .dh-count { font-size: 0.8rem; color: rgba(228,217,195,0.75); }
    .dh-close-btn {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      color: white;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .dh-close-btn:hover { background: rgba(255,255,255,0.3); }

    /* Promise Banner */
    .drawer-promise-banner {
      background: #fff8f0;
      border-bottom: 1px solid #f0e6d8;
      padding: 0.65rem 1.5rem;
      font-size: 0.8rem;
      color: var(--color-teal-dark);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .dp-icon { color: var(--color-terracotta); }

    /* Body */
    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
    }

    /* Empty Cart State */
    .drawer-empty {
      margin: auto;
      text-align: center;
      padding: 3rem 1rem;
    }
    .empty-icon-wrap { display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; }
    .e-icon { font-size: 2.5rem; animation: float-bob 3s ease-in-out infinite; }
    .e1 { animation-delay: 0s; }
    .e2 { animation-delay: 0.5s; }
    .e3 { animation-delay: 1s; }
    .drawer-empty h3 { font-size: 1.2rem; color: var(--color-teal-deep); margin-bottom: 0.5rem; }
    .drawer-empty p { font-size: 0.875rem; color: rgba(30,65,61,0.65); margin-bottom: 1.5rem; }

    /* Cart Items List */
    .cart-items-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .drawer-cart-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.85rem;
      background: var(--color-offwhite);
      border-radius: var(--radius-md);
      border: 1px solid rgba(15, 92, 98, 0.06);
    }
    .item-thumb {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-sm);
      overflow: hidden;
      background: white;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .thumb-img { width: 100%; height: 100%; object-fit: cover; }
    .thumb-emoji { font-size: 1.8rem; }

    .item-details { flex: 1; min-width: 0; }
    .item-name { font-weight: 700; font-size: 0.95rem; color: var(--color-teal-deep); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .item-cuisine { font-size: 0.72rem; color: var(--color-terracotta); text-transform: uppercase; font-weight: 700; }
    .item-unit-price { font-size: 0.78rem; color: rgba(30,65,61,0.6); margin-top: 0.1rem; }

    .item-controls { display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem; }
    .stepper-wrap {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 999px;
      border: 1px solid var(--color-cream);
      padding: 0.15rem 0.35rem;
    }
    .step-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background: var(--color-terracotta);
      color: white;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .step-qty { font-weight: 800; font-size: 0.85rem; min-width: 22px; text-align: center; color: var(--color-teal-deep); }

    .item-price-actions { display: flex; align-items: center; gap: 0.6rem; }
    .item-subtotal { font-family: var(--font-display); font-weight: 800; font-size: 1rem; color: var(--color-teal-deep); }
    .delete-btn {
      background: none;
      border: none;
      font-size: 0.95rem;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    .delete-btn:hover { opacity: 1; }

    /* Kitchen Instructions */
    .kitchen-note-box {
      margin-top: 1.5rem;
      padding-top: 1.25rem;
      border-top: 1px dashed var(--color-cream);
    }
    .note-label { font-size: 0.8rem; font-weight: 700; color: var(--color-teal-deep); margin-bottom: 0.4rem; display: block; }
    .note-input {
      width: 100%;
      padding: 0.65rem 0.9rem;
      border: 1.5px solid var(--color-cream);
      border-radius: var(--radius-md);
      font-family: var(--font-body);
      font-size: 0.85rem;
      background: var(--color-offwhite);
      outline: none;
    }
    .note-input:focus { border-color: var(--color-teal-deep); }

    /* Footer */
    .drawer-footer {
      padding: 1.25rem 1.5rem 1.75rem;
      background: white;
      border-top: 2px solid var(--color-cream);
      box-shadow: 0 -10px 30px rgba(0,0,0,0.05);
    }
    .bill-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      padding: 0.3rem 0;
      color: rgba(30,65,61,0.75);
    }
    .free-tag { color: #16a34a; font-weight: 700; font-size: 0.8rem; }
    .grand-row {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--color-teal-deep);
      padding-top: 0.75rem;
      margin-top: 0.35rem;
      border-top: 1px solid var(--color-cream);
    }
    .grand-amount { font-family: var(--font-display); font-size: 1.6rem; color: var(--color-terracotta); }

    .btn-checkout-lg {
      width: 100%;
      margin-top: 1.25rem;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      font-size: 1.05rem;
    }
    .btn-price-badge { font-weight: 800; font-family: var(--font-display); font-size: 1.1rem; }

    @keyframes slideLeft {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 480px) {
      .drawer-panel { max-width: 100%; }
      .cart-toast { right: 1rem; left: 1rem; bottom: 1rem; }
    }
  `]
})
export class CartDrawerComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  isOpen$ = this.cartService.isDrawerOpen$;
  cart$ = this.cartService.cart$;
  cartTotal$ = this.cartService.cartTotal$;
  cartCount$ = this.cartService.cartCount$;
  toast$ = this.cartService.toast$;
  orderNote = this.cartService.getOrderNote();

  openCart(): void {
    this.cartService.openCart();
  }

  closeCart(): void {
    this.cartService.closeCart();
  }

  increase(item: CartItem): void {
    this.cartService.addItem(item.menuItem);
  }

  decrease(item: CartItem): void {
    this.cartService.removeItem(item.menuItem.id);
  }

  deleteItem(itemId: string): void {
    this.cartService.deleteItem(itemId);
  }

  onNoteChange(note: string): void {
    this.orderNote = note;
    this.cartService.setOrderNote(note);
  }

  goToMenu(): void {
    this.closeCart();
    this.router.navigate(['/menu']);
  }

  proceedToCheckout(): void {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }
}
