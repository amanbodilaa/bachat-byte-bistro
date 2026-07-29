import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="invoice-wrapper">
      @if (!order) {
        <div class="not-found" style="text-align:center;padding:6rem 2rem;">
          <h2>Invoice Not Found</h2>
          <p>Order ID does not exist.</p>
        </div>
      } @else {
        <!-- Print Actions (hidden on print) -->
        <div class="print-actions no-print">
          <button class="btn btn-primary" (click)="print()">🖨️ Print / Download PDF</button>
          <button class="btn btn-outline" (click)="goBack()">← Back</button>
        </div>

        <!-- Invoice -->
        <div class="invoice" id="invoice-content">
          <!-- Header -->
          <div class="invoice-header">
            <div class="inv-brand">
              <img src="logo.png" alt="Bachat Byte Bistro" class="inv-logo" />
              <div class="inv-brand-text">
                <div class="inv-name">Bachat Byte Bistro</div>
                <div class="inv-hindi devanagari">बचत बाइट बिस्ट्रो</div>

              </div>
            </div>
            <div class="inv-meta">
              <div class="inv-title">INVOICE</div>
              <div class="inv-id">{{ order.orderId }}</div>
              <div class="inv-date">{{ order.placedAt | date:'dd MMM yyyy, HH:mm' }}</div>
            </div>
          </div>

          <!-- Token Banner -->
          <div class="token-banner">
            <span class="token-label-sm">TOKEN NUMBER</span>
            <span class="token-num-large">#{{ String(order.tokenNumber).padStart(2,'0') }}</span>
          </div>

          <!-- Customer Info -->
          <div class="invoice-section">
            <h3 class="inv-section-title">Billed To</h3>
            <div class="inv-customer">
              <div><strong>{{ order.customer.name }}</strong></div>
              <div>{{ order.customer.phone }}</div>
              <div>{{ order.customer.email }}</div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="invoice-section">
            <h3 class="inv-section-title">Order Details</h3>
            <table class="inv-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cuisine</th>
                  <th class="text-right">Price</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                @for (item of order.items; track item.menuItem.id) {
                  <tr>
                    <td>
                      <span class="t-emoji">{{ item.menuItem.emoji }}</span>
                      {{ item.menuItem.name }}
                    </td>
                    <td class="t-cuisine">{{ item.menuItem.cuisine }}</td>
                    <td class="text-right">₹{{ item.menuItem.price }}</td>
                    <td class="text-right">{{ item.quantity }}</td>
                    <td class="text-right t-subtotal">₹{{ item.menuItem.price * item.quantity }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div class="invoice-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>₹{{ order.total }}</span>
            </div>
            <div class="total-row">
              <span>Taxes & Service</span>
              <span>Included</span>
            </div>
            <div class="total-row grand">
              <span>Grand Total</span>
              <span>₹{{ order.total }}</span>
            </div>
          </div>

          <!-- Payment Info -->
          <div class="invoice-payment">
            <div class="pay-mode">
              <span class="pay-icon">{{ order.paymentMode === 'Cash' ? '💵' : '📲' }}</span>
              <div>
                <div class="pay-label">Payment Mode</div>
                <div class="pay-val">{{ order.paymentMode }} at Counter</div>
              </div>
            </div>
            <div class="pay-status">
              Status: <strong>{{ order.status }}</strong>
            </div>
          </div>

          <!-- Footer -->
          <div class="invoice-footer">
            <p>Thank you for dining at <strong>Bachat Byte Bistro</strong>!</p>
            <p class="devanagari" style="font-size:1rem;color:var(--color-terracotta);margin-top:0.25rem;">
              आपका धन्यवाद 🙏
            </p>
            <p style="font-size:0.75rem;opacity:0.5;margin-top:0.5rem;">
              Savour. Save. Share. · All items ₹100 or below
            </p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .invoice-wrapper {
      max-width: 760px;
      margin: 0 auto;
      padding: 2rem 1.5rem 5rem;
    }
    .print-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .invoice {
      background: white;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      font-family: var(--font-body);
    }

    /* Header */
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 2.5rem;
      background: linear-gradient(135deg, var(--color-teal-dark), var(--color-teal-deep));
      gap: 1rem;
    }
    .inv-brand { display: flex; align-items: center; gap: 1rem; }
    .inv-logo {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 3px solid var(--color-terracotta);
      object-fit: cover;
    }
    .inv-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.3rem;
      color: var(--color-cream);
    }
    .inv-hindi { color: var(--color-terracotta); font-size: 0.85rem; font-weight: 700; }
    .inv-event { color: var(--color-muted-light); font-size: 0.75rem; opacity: 0.65; margin-top: 0.2rem; }
    .inv-meta { text-align: right; color: var(--color-muted-light); }
    .inv-title { font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; color: var(--color-amber-gold); letter-spacing: 0.1em; }
    .inv-id { font-size: 0.78rem; opacity: 0.6; margin-top: 0.2rem; }
    .inv-date { font-size: 0.82rem; opacity: 0.7; margin-top: 0.15rem; }

    /* Token Banner */
    .token-banner {
      background: linear-gradient(90deg, var(--color-terracotta), var(--color-amber-warm));
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2.5rem;
    }
    .token-label-sm { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; color: rgba(255,255,255,0.75); text-transform: uppercase; }
    .token-num-large { font-family: var(--font-display); font-weight: 800; font-size: 2.5rem; color: white; }

    /* Sections */
    .invoice-section { padding: 1.75rem 2.5rem; border-bottom: 1px solid var(--color-cream); }
    .inv-section-title {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-terracotta);
      margin-bottom: 0.75rem;
    }
    .inv-customer { font-size: 0.9rem; line-height: 1.7; color: var(--color-teal-dark); }

    /* Table */
    .inv-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .inv-table th {
      text-align: left;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-teal-deep);
      opacity: 0.65;
      padding: 0.5rem 0;
      border-bottom: 2px solid var(--color-cream);
    }
    .inv-table td {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--color-cream);
      color: var(--color-teal-dark);
    }
    .text-right { text-align: right; }
    .t-emoji { font-size: 1.1rem; margin-right: 0.35rem; }
    .t-cuisine { font-size: 0.8rem; opacity: 0.55; }
    .t-subtotal { font-weight: 700; color: var(--color-teal-deep); }

    /* Totals */
    .invoice-totals { padding: 1.5rem 2.5rem; background: var(--color-offwhite); }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 0.35rem 0;
      font-size: 0.9rem;
      color: var(--color-teal-dark);
      opacity: 0.7;
    }
    .total-row.grand {
      font-weight: 800;
      font-size: 1.2rem;
      opacity: 1;
      color: var(--color-teal-deep);
      padding-top: 0.75rem;
      margin-top: 0.35rem;
      border-top: 2px solid var(--color-cream);
    }

    /* Payment */
    .invoice-payment {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2.5rem;
      border-top: 2px solid var(--color-cream);
    }
    .pay-mode { display: flex; align-items: center; gap: 0.75rem; }
    .pay-icon { font-size: 1.75rem; }
    .pay-label { font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.08em; }
    .pay-val { font-weight: 700; color: var(--color-teal-deep); font-size: 0.95rem; }
    .pay-status { font-size: 0.875rem; opacity: 0.7; }

    /* Footer */
    .invoice-footer {
      background: linear-gradient(135deg, var(--color-teal-dark), var(--color-teal-deep));
      padding: 2rem 2.5rem;
      text-align: center;
      color: var(--color-muted-light);
    }

    @media print {
      .print-actions { display: none !important; }
      .invoice-wrapper { padding: 0; }
      .invoice { box-shadow: none; border-radius: 0; }
    }
    @media (max-width: 600px) {
      .invoice-header { flex-direction: column; align-items: flex-start; }
      .inv-meta { text-align: left; }
      .invoice-section, .invoice-totals, .invoice-payment, .invoice-footer { padding-left: 1.5rem; padding-right: 1.5rem; }
      .invoice-payment { flex-direction: column; align-items: flex-start; gap: 1rem; }
    }
  `]
})
export class InvoiceComponent implements OnInit {
  order: Order | null = null;
  String = String;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderService.getOrder(orderId).subscribe(o => {
        this.order = o || null;
      });
    }
  }

  print(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }
}
