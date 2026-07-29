import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../core/services/order.service';
import { Order, OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-wrapper">
      <div class="tracking-page container">

        @if (!order) {
          <div class="not-found">
            <div style="font-size:4rem;margin-bottom:1rem;">🔍</div>
            <h2>Order Not Found</h2>
            <p>The order ID doesn't match any records.</p>
            <a routerLink="/menu" class="btn btn-primary" style="margin-top:1.5rem;">Go to Menu</a>
          </div>
        } @else {
          <div class="track-header">
            <div class="token-pill">#{{ String(order.tokenNumber).padStart(2,'0') }}</div>
            <h1>Order Tracking</h1>
            <p class="track-sub">{{ order.orderId }}</p>
          </div>

          <!-- Status Stepper -->
          <div class="status-card card" style="padding:2.5rem 2rem;margin-bottom:2rem;">
            <div class="stepper">
              @for (step of statusSteps; track step.status; let i = $index) {
                <div class="step-item"
                  [class.done]="isStepDone(step.status)"
                  [class.active]="order.status === step.status">
                  <div class="step-dot">
                    @if (isStepDone(step.status) && order.status !== step.status) {
                      ✓
                    } @else if (order.status === step.status) {
                      {{ step.icon }}
                    } @else {
                      {{ i + 1 }}
                    }
                  </div>
                  <span class="step-label">{{ step.label }}</span>
                </div>
              }
            </div>

            <div class="current-status">
              <div class="status-icon">{{ currentStep?.icon }}</div>
              <div class="status-text">{{ order.status }}</div>
              @if (order.status === 'Preparing') {
                <div class="eta">
                  ⏱️ Est. ready in <strong>{{ etaMinutes }} min{{ etaMinutes !== 1 ? 's' : '' }}</strong>
                </div>
              }
              @if (order.status === 'Ready') {
                <div class="ready-alert">
                  🔔 Your order is ready! Please collect at the counter.
                </div>
              }
              @if (order.status === 'Collected') {
                <div class="collected-msg">
                  Thank you for dining with us! 🙏
                </div>
              }
            </div>
          </div>

          <!-- Order Details -->
          <div class="order-details-grid">
            <div class="card" style="padding:1.75rem;">
              <h3 style="margin-bottom:1.25rem;">Items Ordered</h3>
              <div class="order-items">
                @for (item of order.items; track item.menuItem.id) {
                  <div class="order-item-row">
                    <span class="oi-emoji">{{ item.menuItem.emoji }}</span>
                    <span class="oi-name">{{ item.menuItem.name }}</span>
                    <span class="oi-qty">× {{ item.quantity }}</span>
                    <span class="oi-price">₹{{ item.menuItem.price * item.quantity }}</span>
                  </div>
                }
              </div>
              <div class="oi-total">
                <span>Total</span>
                <span class="price-tag">₹{{ order.total }}</span>
              </div>
            </div>

            <div class="card" style="padding:1.75rem;">
              <h3 style="margin-bottom:1.25rem;">Order Info</h3>
              @for (info of orderInfoRows; track info.label) {
                <div class="info-row">
                  <span class="info-label">{{ info.label }}</span>
                  <span class="info-val">{{ info.value }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Actions -->
          <div class="track-actions">
            <a [routerLink]="['/invoice', order.orderId]" class="btn btn-outline">📄 View Invoice</a>
            <a routerLink="/menu" class="btn btn-secondary">+ Order More</a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .tracking-page { padding: 2.5rem 1.5rem 5rem; }
    .not-found { text-align: center; padding: 6rem 2rem; }
    .not-found p { opacity: 0.6; margin-top: 0.5rem; }

    .track-header { text-align: center; margin-bottom: 2.5rem; }
    .token-pill {
      display: inline-block;
      background: linear-gradient(135deg, var(--color-terracotta), var(--color-amber-warm));
      color: white;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.4rem;
      padding: 0.4rem 1.5rem;
      border-radius: var(--radius-full);
      margin-bottom: 0.75rem;
      box-shadow: 0 4px 16px rgba(217, 112, 31, 0.35);
    }
    .track-sub { font-size: 0.8rem; opacity: 0.5; margin-top: 0.25rem; }

    /* Current Status */
    .current-status {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 2px solid var(--color-cream);
    }
    .status-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .status-text {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-teal-deep);
    }
    .eta {
      margin-top: 0.75rem;
      background: rgba(232, 174, 75, 0.15);
      border: 1px solid var(--color-amber-gold);
      border-radius: var(--radius-full);
      display: inline-block;
      padding: 0.4rem 1.2rem;
      font-size: 0.9rem;
      color: var(--color-teal-dark);
    }
    .ready-alert {
      margin-top: 0.75rem;
      background: rgba(15, 92, 98, 0.1);
      border: 1px solid var(--color-teal-deep);
      border-radius: var(--radius-md);
      padding: 0.75rem 1.5rem;
      color: var(--color-teal-deep);
      font-weight: 600;
      animation: pulse-ring 2s infinite;
    }
    .collected-msg { margin-top: 0.75rem; font-size: 1rem; color: var(--color-amber-gold); font-weight: 600; }

    /* Details Grid */
    .order-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .order-items { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
    .order-item-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.9rem;
    }
    .oi-emoji { font-size: 1.2rem; }
    .oi-name { flex: 1; font-weight: 500; }
    .oi-qty { opacity: 0.6; }
    .oi-price { font-weight: 700; color: var(--color-teal-dark); }
    .oi-total {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      padding-top: 0.75rem;
      border-top: 2px solid var(--color-cream);
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-size: 0.9rem;
      border-bottom: 1px solid var(--color-cream);
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { opacity: 0.6; }
    .info-val { font-weight: 600; }
    .track-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem; }

    @media (max-width: 640px) {
      .order-details-grid { grid-template-columns: 1fr; }
      .stepper { gap: 0; }
      .step-label { font-size: 0.65rem; }
    }
  `]
})
export class TrackingComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  String = String;
  etaMinutes = 10;
  private pollSub?: Subscription;
  private etaSub?: any;

  statusSteps = [
    { status: 'Placed' as OrderStatus, label: 'Placed', icon: '📝' },
    { status: 'Paid' as OrderStatus, label: 'Paid', icon: '💰' },
    { status: 'Preparing' as OrderStatus, label: 'Preparing', icon: '👨‍🍳' },
    { status: 'Ready' as OrderStatus, label: 'Ready', icon: '🔔' },
    { status: 'Collected' as OrderStatus, label: 'Collected', icon: '✅' },
  ];

  statusOrder: OrderStatus[] = ['Placed', 'Paid', 'Preparing', 'Ready', 'Collected'];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (!orderId || orderId === 'demo') {
      // For demo: create a mock order in Preparing state
      this.createDemoOrder();
      return;
    }
    this.orderService.getOrder(orderId).subscribe(o => {
      this.order = o || null;
    });
    this.startPolling(orderId);
  }

  private createDemoOrder(): void {
    // Seed a demo order for the tracking demo link
    const demoOrder: Order = {
      orderId: 'DEMO-001',
      tokenNumber: 7,
      items: [
        { menuItem: { id: 'aloo-tikki-chaat', name: 'Aloo Tikki Chaat', cuisine: 'Indian Street Food', price: 70, emoji: '🥘', description: '', available: true }, quantity: 2 },
        { menuItem: { id: 'iced-tea', name: 'Iced Tea', cuisine: 'Beverage', price: 60, emoji: '🧊', description: '', available: true }, quantity: 1 },
      ],
      total: 200,
      customer: { name: 'Demo User', phone: '9000000000', email: 'demo@example.com' },
      paymentMode: 'UPI',
      status: 'Preparing',
      placedAt: new Date(Date.now() - 2 * 60 * 1000),
      paidAt: new Date(Date.now() - 1.5 * 60 * 1000),
    };
    // Register with service
    (this.orderService as any).ordersSubject?.next?.([
      ...(this.orderService as any).ordersSubject?.value || [],
      demoOrder
    ]);
    this.order = demoOrder;
    this.startEtaCountdown();
  }

  private startPolling(orderId: string): void {
    // Simulate polling every 7s to advance status
    const interval = setInterval(() => {
      if (!this.order) return;
      const idx = this.statusOrder.indexOf(this.order.status);
      if (idx < this.statusOrder.length - 1) {
        this.orderService.updateStatus(orderId, this.statusOrder[idx + 1]);
      }
    }, 7000);
    this.etaSub = interval;
    this.startEtaCountdown();
  }

  private startEtaCountdown(): void {
    this.etaMinutes = 10;
    const countInterval = setInterval(() => {
      if (this.etaMinutes > 0) {
        this.etaMinutes = Math.max(0, this.etaMinutes - 1);
      }
    }, 60000);
    // For demo, speed up: decrease by 1 every 30s simulation
    const fastInterval = setInterval(() => {
      if (this.order?.status === 'Preparing' && this.etaMinutes > 0) {
        this.etaMinutes--;
      }
    }, 7000);
    this.etaSub = fastInterval;
  }

  get currentStep() {
    return this.statusSteps.find(s => s.status === this.order?.status);
  }

  isStepDone(status: OrderStatus): boolean {
    if (!this.order) return false;
    const current = this.statusOrder.indexOf(this.order.status);
    const idx = this.statusOrder.indexOf(status);
    return idx < current;
  }

  get orderInfoRows() {
    if (!this.order) return [];
    return [
      { label: 'Customer', value: this.order.customer.name },
      { label: 'Phone', value: this.order.customer.phone },
      { label: 'Payment Mode', value: this.order.paymentMode },
      { label: 'Placed At', value: this.order.placedAt.toLocaleTimeString() },
      { label: 'Status', value: this.order.status },
    ];
  }

  ngOnDestroy(): void {
    if (this.etaSub) clearInterval(this.etaSub);
  }
}
