import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  template: `
    <div class="kitchen-page">
      <div class="kitchen-header">
        <div class="kitchen-logo">
          <img src="logo.png" alt="logo" class="k-logo" />
          <div>
            <div class="k-title">Kitchen Display</div>
            <div class="k-sub">Bachat Byte Bistro · Staff View</div>
          </div>
        </div>
        <div class="kitchen-clock">{{ now | date:'HH:mm:ss' }}</div>
      </div>

      <div class="kitchen-body">
        @if ((preparingOrders$ | async)!.length === 0) {
          <div class="kitchen-empty">
            <div style="font-size:5rem;margin-bottom:1.5rem;">✅</div>
            <h2>All caught up!</h2>
            <p>No active orders in the queue right now.</p>
          </div>
        } @else {
          <div class="orders-grid">
            @for (order of preparingOrders$ | async; track order.orderId) {
              <div class="order-card" [class.ready]="order.status === 'Ready'">
                <div class="order-card-header">
                  <div class="order-token">#{{ String(order.tokenNumber).padStart(2,'0') }}</div>
                  <div class="order-meta">
                    <div class="order-name">{{ order.customer.name }}</div>
                    <div class="order-time">{{ timeSince(order.paidAt || order.placedAt) }} ago</div>
                  </div>
                  <div class="order-status-badge" [class.preparing]="order.status === 'Preparing'" [class.ready]="order.status === 'Ready'">
                    {{ order.status === 'Preparing' ? '👨‍🍳 Preparing' : '✅ Ready' }}
                  </div>
                </div>
                <div class="order-items-list">
                  @for (item of order.items; track item.menuItem.id) {
                    <div class="k-item">
                      <span class="k-item-emoji">{{ item.menuItem.emoji }}</span>
                      <span class="k-item-name">{{ item.menuItem.name }}</span>
                      <span class="k-item-qty">× {{ item.quantity }}</span>
                    </div>
                  }
                </div>
                <div class="order-card-footer">
                  <div class="order-payment">{{ order.paymentMode }} · ₹{{ order.total }}</div>
                  @if (order.status === 'Preparing') {
                    <button class="btn-mark-ready" (click)="markReady(order.orderId)">
                      ✓ Mark Ready
                    </button>
                  } @else {
                    <div class="ready-label">Ready for pickup</div>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-teal-dark);
    }
    .kitchen-page {
      min-height: 100vh;
      padding-top: var(--navbar-height);
    }
    .kitchen-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 2rem;
      background: rgba(0,0,0,0.25);
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .kitchen-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .k-logo {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid var(--color-terracotta);
    }
    .k-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.4rem;
      color: var(--color-cream);
    }
    .k-sub { font-size: 0.8rem; color: var(--color-muted-light); opacity: 0.6; }
    .kitchen-clock {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-amber-gold);
      letter-spacing: 0.05em;
    }
    .kitchen-body { padding: 2rem; }
    .kitchen-empty {
      text-align: center;
      padding: 8rem 2rem;
      color: var(--color-muted-light);
    }
    .kitchen-empty h2 { color: var(--color-cream); font-size: 2rem; margin-bottom: 0.5rem; }
    .kitchen-empty p { opacity: 0.6; font-size: 1.1rem; }

    .orders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .order-card {
      background: rgba(255,255,255,0.06);
      border: 2px solid rgba(255,255,255,0.10);
      border-radius: var(--radius-xl);
      overflow: hidden;
      transition: border-color var(--transition-base);
    }
    .order-card.ready {
      border-color: var(--color-amber-gold);
      background: rgba(232, 174, 75, 0.08);
    }
    .order-card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
      background: rgba(0,0,0,0.2);
    }
    .order-token {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--color-amber-gold);
      min-width: 60px;
    }
    .order-meta { flex: 1; }
    .order-name { font-size: 1rem; font-weight: 700; color: var(--color-cream); }
    .order-time { font-size: 0.8rem; color: var(--color-muted-light); opacity: 0.65; margin-top: 0.1rem; }
    .order-status-badge {
      padding: 0.4rem 0.9rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 700;
    }
    .order-status-badge.preparing { background: rgba(217, 112, 31, 0.2); color: var(--color-amber-warm); }
    .order-status-badge.ready { background: rgba(232, 174, 75, 0.25); color: var(--color-amber-gold); }

    .order-items-list {
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .k-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .k-item-emoji { font-size: 1.75rem; }
    .k-item-name { flex: 1; font-size: 1.05rem; font-weight: 600; color: var(--color-cream); }
    .k-item-qty {
      font-size: 1rem;
      font-weight: 800;
      color: var(--color-amber-gold);
      min-width: 40px;
      text-align: right;
    }

    .order-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      background: rgba(0,0,0,0.15);
      gap: 1rem;
    }
    .order-payment { font-size: 0.85rem; color: var(--color-muted-light); opacity: 0.65; }
    .btn-mark-ready {
      background: var(--color-terracotta);
      color: white;
      border: none;
      border-radius: var(--radius-full);
      padding: 0.65rem 1.5rem;
      font-family: var(--font-body);
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: background var(--transition-fast), transform var(--transition-fast);
    }
    .btn-mark-ready:hover { background: #c4601a; transform: scale(1.04); }
    .ready-label {
      color: var(--color-amber-gold);
      font-weight: 700;
      font-size: 0.9rem;
    }

    @media (max-width: 640px) {
      .kitchen-clock { font-size: 1.2rem; }
      .orders-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class KitchenComponent implements OnInit {
  private orderService = inject(OrderService);
  preparingOrders$ = this.orderService.getKitchenOrders();
  String = String;
  now = new Date();

  constructor() {}

  ngOnInit(): void {
    // Update clock every second
    setInterval(() => { this.now = new Date(); }, 1000);

    // Seed some mock orders for demo
    this.seedDemoOrders();
  }

  private seedDemoOrders(): void {
    const service = this.orderService as any;
    if (service.ordersSubject?.value?.length === 0) {
      const mockOrders = [
        this.createMock(1, 'Arjun Mehta', 'UPI', 200, [
          { menuItem: { id: 'aloo-tikki-chaat', name: 'Aloo Tikki Chaat', cuisine: 'Indian Street Food', price: 70, emoji: '🥘', description: '', available: true }, quantity: 2 },
          { menuItem: { id: 'iced-tea', name: 'Iced Tea', cuisine: 'Beverage', price: 60, emoji: '🧊', description: '', available: true }, quantity: 1 },
        ], 8),
        this.createMock(2, 'Priya Sharma', 'Cash', 175, [
          { menuItem: { id: 'taco', name: 'Taco', cuisine: 'Mexican', price: 85, emoji: '🌮', description: '', available: true }, quantity: 1 },
          { menuItem: { id: 'jamun-shots', name: 'Jamun Shots', cuisine: 'Dessert', price: 50, emoji: '🍮', description: '', available: true }, quantity: 1 },
          { menuItem: { id: 'hummus-pitta', name: 'Hummus Pitta', cuisine: 'Middle Eastern', price: 90, emoji: '🧆', description: '', available: true }, quantity: 0 },
        ], 5),
        this.createMock(3, 'Rahul Kapoor', 'UPI', 90, [
          { menuItem: { id: 'hummus-pitta', name: 'Hummus Pitta', cuisine: 'Middle Eastern', price: 90, emoji: '🧆', description: '', available: true }, quantity: 1 },
        ], 2),
      ];
      service.ordersSubject.next(mockOrders.filter((o: any) => o.items.some((i: any) => i.quantity > 0)));
    }
  }

  private createMock(token: number, name: string, payment: 'Cash' | 'UPI', total: number, items: any[], minutesAgo: number): any {
    const placedAt = new Date(Date.now() - minutesAgo * 60 * 1000);
    return {
      orderId: `BBB-DEMO-${token}`,
      tokenNumber: token,
      items: items.filter(i => i.quantity > 0),
      total,
      customer: { name, phone: `90000000${token}${token}`, email: `${name.toLowerCase().replace(' ', '.')}@example.com` },
      paymentMode: payment,
      status: 'Preparing',
      placedAt,
      paidAt: new Date(placedAt.getTime() + 30000),
    };
  }

  markReady(orderId: string): void {
    this.orderService.markReady(orderId);
  }

  timeSince(date: Date): string {
    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secs < 60) return `${secs}s`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  }
}
