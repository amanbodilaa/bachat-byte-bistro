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
          <button class="btn btn-primary" style="margin-top:1rem;" (click)="goBack()">Go to Menu</button>
        </div>
      } @else {
        <!-- Print Actions (hidden on print) -->
        <div class="print-actions no-print">
          <button class="btn btn-primary" (click)="print()">🖨️ Print / Save PDF</button>
          <button class="btn btn-outline" (click)="goBack()">← Back to Menu</button>
        </div>

        <!-- Invoice Paper Document -->
        <div class="invoice" id="invoice-content">
          
          <!-- Header Banner -->
          <div class="invoice-header">
            <div class="inv-brand">
              <img src="logo.png" alt="Bachat Byte Bistro Logo" class="inv-logo" />
              <div class="inv-brand-text">
                <div class="inv-name">Bachat Byte Bistro</div>
                <div class="inv-hindi devanagari">बचत बाइट बिस्ट्रो</div>
                <div class="inv-slogan">Savour. Save. Share.</div>
              </div>
            </div>
            <div class="inv-meta">
              <div class="inv-title">TAX INVOICE</div>
              <div class="inv-id">{{ order.orderId }}</div>
              <div class="inv-date">{{ order.placedAt | date:'dd MMM yyyy, hh:mm a' }}</div>
            </div>
          </div>

          <!-- Token Callout Banner -->
          <div class="token-banner">
            <div class="token-info">
              <span class="token-label-sm">BISTRO TOKEN NUMBER</span>
              <span class="token-num-large">#{{ String(order.tokenNumber).padStart(2,'0') }}</span>
            </div>
            <div class="token-status-badge" [class]="order.status.toLowerCase()">
              {{ order.status === 'Placed' ? 'PAYMENT PENDING' : 'PAID & CONFIRMED' }}
            </div>
          </div>

          <!-- Customer Info -->
          <div class="invoice-section">
            <h3 class="inv-section-title">Customer &amp; Billing Info</h3>
            <div class="inv-customer-grid">
              <div class="cust-col">
                <span class="c-label">Customer Name:</span>
                <span class="c-val"><strong>{{ order.customer.name }}</strong></span>
              </div>
              <div class="cust-col">
                <span class="c-label">Phone Number:</span>
                <span class="c-val">{{ order.customer.phone }}</span>
              </div>
              <div class="cust-col">
                <span class="c-label">Email Address:</span>
                <span class="c-val">{{ order.customer.email }}</span>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="invoice-section">
            <h3 class="inv-section-title">Itemized Order Summary</h3>
            <table class="inv-table">
              <thead>
                <tr>
                  <th>Dish Description</th>
                  <th>Cuisine</th>
                  <th class="text-right">Unit Price</th>
                  <th class="text-center">Qty</th>
                  <th class="text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                @for (item of order.items; track item.menuItem.id) {
                  <tr>
                    <td class="item-name-cell">
                      <span class="t-emoji">{{ item.menuItem.emoji }}</span>
                      <span class="t-item-name">{{ item.menuItem.name }}</span>
                    </td>
                    <td class="t-cuisine">{{ item.menuItem.cuisine }}</td>
                    <td class="text-right">₹{{ item.menuItem.price }}</td>
                    <td class="text-center font-bold">{{ item.quantity }}</td>
                    <td class="text-right t-subtotal">₹{{ item.menuItem.price * item.quantity }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Totals Breakdown -->
          <div class="invoice-totals">
            <div class="total-row">
              <span>Items Subtotal</span>
              <span>₹{{ order.total }}</span>
            </div>
            <div class="total-row promise">
              <span>✨ Savings Guarantee (All items ≤ ₹100)</span>
              <span class="applied-badge">APPLIED</span>
            </div>
            <div class="total-row">
              <span>Taxes &amp; Bistro Packaging</span>
              <span class="free-text">FREE</span>
            </div>
            <div class="total-row grand">
              <span>Grand Total Paid</span>
              <span class="grand-val">₹{{ order.total }}</span>
            </div>
          </div>

          <!-- Payment Mode Info -->
          <div class="invoice-payment">
            <div class="pay-mode">
              <span class="pay-icon">{{ order.paymentMode === 'Cash' ? '💵' : '📲' }}</span>
              <div>
                <div class="pay-label">Payment Method</div>
                <div class="pay-val">{{ order.paymentMode }} at Counter</div>
              </div>
            </div>
            <div class="pay-status">
              Order Status: <strong>{{ order.status }}</strong>
            </div>
          </div>

          <!-- Footer -->
          <div class="invoice-footer">
            <p class="footer-msg">Thank you for dining at <strong>Bachat Byte Bistro</strong>!</p>
            <p class="devanagari footer-hindi">
              आपका धन्यवाद 🙏
            </p>
            <p class="footer-note">
              Savour. Save. Share. · Every single item ₹100 or below
            </p>
          </div>

        </div>
      }
    </div>
  `,
  styles: [`
    .invoice-wrapper {
      max-width: 780px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 5rem;
    }
    .print-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-bottom: 1.5rem;
    }
    .invoice {
      background: white;
      border-radius: var(--radius-xl);
      box-shadow: 0 12px 48px rgba(15, 92, 98, 0.12);
      overflow: hidden;
      border: 1px solid rgba(15, 92, 98, 0.1);
    }
    .invoice-header {
      background: linear-gradient(135deg, #0F5C62, #1E413D);
      color: white;
      padding: 2rem 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .inv-brand { display: flex; align-items: center; gap: 1.25rem; }
    .inv-logo {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      border: 3px solid var(--color-terracotta);
      object-fit: cover;
      flex-shrink: 0;
    }
    .inv-name {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 800;
      color: white;
      line-height: 1.1;
    }
    .inv-hindi {
      font-size: 0.95rem;
      color: var(--color-amber-gold);
      font-weight: 700;
      margin-top: 0.15rem;
    }
    .inv-slogan {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.65);
      margin-top: 0.1rem;
    }

    .inv-meta { text-align: right; }
    .inv-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 900;
      color: var(--color-amber-gold);
      letter-spacing: 0.05em;
    }
    .inv-id { font-size: 0.88rem; font-weight: 700; color: white; margin-top: 0.2rem; }
    .inv-date { font-size: 0.78rem; color: rgba(255,255,255,0.7); margin-top: 0.1rem; }

    /* Token Banner */
    .token-banner {
      background: linear-gradient(135deg, var(--color-terracotta), var(--color-amber-warm));
      color: white;
      padding: 1.25rem 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .token-label-sm { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; opacity: 0.9; display: block; }
    .token-num-large { font-family: var(--font-display); font-size: 2.8rem; font-weight: 900; color: white; line-height: 1; }
    .token-status-badge {
      background: white;
      color: var(--color-terracotta);
      font-weight: 800;
      font-size: 0.85rem;
      padding: 0.4rem 1.1rem;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    /* Sections */
    .invoice-section {
      padding: 1.75rem 2.5rem;
      border-bottom: 1px solid var(--color-cream);
    }
    .inv-section-title {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--color-teal-deep);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .inv-customer-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      background: var(--color-offwhite);
      padding: 1.1rem 1.5rem;
      border-radius: var(--radius-md);
      border: 1px solid rgba(15,92,98,0.08);
    }
    .cust-col { display: flex; flex-direction: column; gap: 0.2rem; }
    .c-label { font-size: 0.75rem; color: rgba(30,65,61,0.6); font-weight: 600; }
    .c-val { font-size: 0.9rem; color: var(--color-teal-dark); }

    /* Table */
    .inv-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    .inv-table th {
      text-align: left;
      padding: 0.75rem 1rem;
      background: var(--color-offwhite);
      color: var(--color-teal-deep);
      font-weight: 700;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid var(--color-cream);
    }
    .inv-table td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid var(--color-cream);
      color: var(--color-teal-dark);
    }
    .item-name-cell { display: flex; align-items: center; gap: 0.6rem; font-weight: 600; }
    .t-emoji { font-size: 1.2rem; }
    .t-cuisine { font-size: 0.8rem; color: rgba(30,65,61,0.6); }
    .t-subtotal { font-weight: 700; color: var(--color-terracotta); }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-bold { font-weight: 700; }

    /* Totals */
    .invoice-totals {
      padding: 1.5rem 2.5rem;
      background: var(--color-offwhite);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border-bottom: 1px solid var(--color-cream);
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      color: rgba(30,65,61,0.8);
    }
    .applied-badge {
      background: rgba(22, 163, 74, 0.15);
      color: #16a34a;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0.15rem 0.6rem;
      border-radius: 999px;
    }
    .free-text { color: #16a34a; font-weight: 700; }
    .total-row.grand {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--color-teal-deep);
      padding-top: 0.75rem;
      margin-top: 0.35rem;
      border-top: 2px solid var(--color-cream);
    }
    .grand-val {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 900;
      color: var(--color-terracotta);
    }

    /* Payment Info */
    .invoice-payment {
      padding: 1.5rem 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-cream);
    }
    .pay-mode { display: flex; align-items: center; gap: 0.85rem; }
    .pay-icon { font-size: 1.75rem; }
    .pay-label { font-size: 0.75rem; opacity: 0.6; font-weight: 600; }
    .pay-val { font-weight: 700; font-size: 0.95rem; color: var(--color-teal-deep); }
    .pay-status { font-size: 0.9rem; color: var(--color-teal-dark); }

    /* Footer */
    .invoice-footer {
      background: linear-gradient(135deg, #0F5C62, #1E413D);
      color: white;
      padding: 2rem 2.5rem;
      text-align: center;
    }
    .footer-msg { font-size: 1.05rem; }
    .footer-hindi { font-size: 1.1rem; color: var(--color-amber-gold); margin-top: 0.35rem; }
    .footer-note { font-size: 0.78rem; opacity: 0.65; margin-top: 0.5rem; }

    @media print {
      .print-actions { display: none !important; }
      .invoice-wrapper { padding: 0; }
      .invoice { box-shadow: none; border-radius: 0; border: none; }
    }
    @media (max-width: 650px) {
      .invoice-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .inv-meta { text-align: left; }
      .inv-customer-grid { grid-template-columns: 1fr; }
      .invoice-section, .invoice-totals, .invoice-payment, .invoice-footer { padding-left: 1.25rem; padding-right: 1.25rem; }
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
      if (orderId === 'demo') {
        this.order = this.createDemoOrder();
        return;
      }
      this.orderService.getOrder(orderId).subscribe(o => {
        this.order = o || this.createDemoOrder();
      });
    } else {
      this.order = this.createDemoOrder();
    }
  }

  private createDemoOrder(): Order {
    return {
      orderId: 'BBB-2026-070',
      tokenNumber: 7,
      customer: {
        name: 'Arjun Mehta',
        phone: '+91 98765 43210',
        email: 'arjun.m@example.com'
      },
      items: [
        {
          menuItem: {
            id: 'aloo-tikki-chaat',
            name: 'Aloo Tikki Chaat',
            cuisine: 'Indian Street Food',
            price: 70,
            emoji: '🥘',
            description: '',
            available: true
          },
          quantity: 2
        },
        {
          menuItem: {
            id: 'hummus-pitta',
            name: 'Hummus Pitta',
            cuisine: 'Middle Eastern',
            price: 90,
            emoji: '🧆',
            description: '',
            available: true
          },
          quantity: 1
        },
        {
          menuItem: {
            id: 'jamun-shots',
            name: 'Jamun Shots',
            cuisine: 'Dessert',
            price: 50,
            emoji: '🍮',
            description: '',
            available: true
          },
          quantity: 2
        },
        {
          menuItem: {
            id: 'iced-tea',
            name: 'Iced Tea',
            cuisine: 'Beverage',
            price: 60,
            emoji: '🧊',
            description: '',
            available: true
          },
          quantity: 1
        }
      ],
      total: 390,
      paymentMode: 'UPI',
      status: 'Paid',
      placedAt: new Date()
    };
  }

  print(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }
}
