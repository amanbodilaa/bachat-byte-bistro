import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  template: `
    <div class="page-wrapper">
      <div class="counter-page container">
        <div class="counter-header">
          <img src="logo.png" alt="logo" class="counter-logo" />
          <div>
            <h1>Counter — Payment Confirmation</h1>
            <p class="counter-sub">Staff View · Mark orders as paid to move them to kitchen</p>
          </div>
        </div>

        <!-- Search -->
        <div class="search-bar card" style="padding:1.5rem 2rem;">
          <h3 style="margin-bottom:1rem;">Look Up Order</h3>
          <div class="search-row">
            <div class="search-group">
              <label class="form-label">Token Number</label>
              <input type="number" class="form-input" [(ngModel)]="tokenSearch" placeholder="e.g. 03" (keyup.enter)="searchByToken()" />
            </div>
            <div class="search-or">or</div>
            <div class="search-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-input" [(ngModel)]="phoneSearch" placeholder="e.g. 9876543210" (keyup.enter)="searchByPhone()" />
            </div>
            <button class="btn btn-primary" (click)="search()">🔍 Search</button>
          </div>
        </div>

        <!-- Search Result -->
        @if (searched) {
          @if (!foundOrder) {
            <div class="not-found-msg">
              No pending order found. Try a different token or phone number.
            </div>
          } @else {
            <div class="found-order card" style="padding:2rem;">
              <div class="found-header">
                <div class="found-token">#{{ String(foundOrder.tokenNumber).padStart(2,'0') }}</div>
                <div class="found-info">
                  <div class="found-name">{{ foundOrder.customer.name }}</div>
                  <div class="found-phone">📱 {{ foundOrder.customer.phone }}</div>
                </div>
                <div class="found-status" [class]="foundOrder.status.toLowerCase()">{{ foundOrder.status }}</div>
              </div>
              <div class="found-items">
                @for (item of foundOrder.items; track item.menuItem.id) {
                  <div class="found-item-row">
                    <span>{{ item.menuItem.emoji }} {{ item.menuItem.name }}</span>
                    <span>× {{ item.quantity }}</span>
                    <span>₹{{ item.menuItem.price * item.quantity }}</span>
                  </div>
                }
              </div>
              <div class="found-total">
                <span>Total Due</span>
                <span class="price-tag">₹{{ foundOrder.total }}</span>
              </div>
              <div class="found-payment-mode">
                Payment Mode: <strong>{{ foundOrder.paymentMode }}</strong>
              </div>
              @if (foundOrder.status === 'Placed') {
                <button class="btn btn-primary" style="margin-top:1.5rem;width:100%;" (click)="markPaid()">
                  ✓ Mark as Paid — Send to Kitchen
                </button>
              } @else {
                <div class="already-paid">
                  ✅ This order is already <strong>{{ foundOrder.status }}</strong>
                </div>
                @if (foundOrder.status === 'Ready' || foundOrder.status === 'Preparing') {
                  <button class="btn btn-secondary" style="margin-top:1rem;width:100%;" (click)="viewInvoice()">
                    📄 View Invoice
                  </button>
                }
              }
            </div>
          }
        }

        <!-- Pending Orders List -->
        <div class="pending-section" style="margin-top:2.5rem;">
          <h2 style="margin-bottom:1.25rem;">Pending Payment Orders</h2>
          @if ((pendingOrders$ | async)!.length === 0) {
            <div class="empty-pending">No pending payment orders 🎉</div>
          } @else {
            <div class="pending-list">
              @for (order of pendingOrders$ | async; track order.orderId) {
                <div class="pending-row card" style="padding:1.25rem 1.5rem;">
                  <div class="p-token">#{{ String(order.tokenNumber).padStart(2,'0') }}</div>
                  <div class="p-info">
                    <div class="p-name">{{ order.customer.name }}</div>
                    <div class="p-phone">{{ order.customer.phone }}</div>
                  </div>
                  <div class="p-items">{{ order.items.length }} item(s)</div>
                  <div class="p-total price-tag">₹{{ order.total }}</div>
                  <div class="p-mode">{{ order.paymentMode }}</div>
                  <button class="btn btn-primary btn-sm" (click)="quickMarkPaid(order.orderId)">Mark Paid</button>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .counter-page { padding: 2rem 1.5rem 5rem; max-width: 960px; margin: 0 auto; }
    .counter-header {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 2rem;
    }
    .counter-logo {
      width: 60px; height: 60px;
      border-radius: 50%;
      border: 3px solid var(--color-terracotta);
      object-fit: cover;
    }
    .counter-sub { opacity: 0.65; font-size: 0.9rem; margin-top: 0.25rem; }

    /* Search */
    .search-row {
      display: flex;
      align-items: flex-end;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .search-group { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 180px; }
    .search-or { font-weight: 600; opacity: 0.5; padding-bottom: 0.65rem; }
    .not-found-msg {
      background: rgba(217, 112, 31, 0.1);
      border: 1px solid var(--color-terracotta);
      border-radius: var(--radius-md);
      padding: 1rem 1.5rem;
      color: var(--color-terracotta);
      font-weight: 500;
      margin-top: 1.25rem;
    }

    /* Found Order */
    .found-order { margin-top: 1.5rem; }
    .found-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--color-cream);
    }
    .found-token {
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-terracotta);
    }
    .found-info { flex: 1; }
    .found-name { font-weight: 700; font-size: 1.1rem; color: var(--color-teal-deep); }
    .found-phone { font-size: 0.85rem; opacity: 0.6; margin-top: 0.1rem; }
    .found-status {
      padding: 0.4rem 1rem;
      border-radius: var(--radius-full);
      font-weight: 700;
      font-size: 0.85rem;
      background: rgba(232, 174, 75, 0.2);
      color: var(--color-teal-deep);
    }
    .found-items { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
    .found-item-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      gap: 1rem;
    }
    .found-item-row span:first-child { flex: 1; }
    .found-item-row span:last-child { font-weight: 700; }
    .found-total {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 1.1rem;
      padding: 0.75rem 0;
      border-top: 2px solid var(--color-cream);
      border-bottom: 2px solid var(--color-cream);
      margin-bottom: 0.75rem;
    }
    .found-payment-mode { font-size: 0.875rem; opacity: 0.65; }
    .already-paid {
      background: rgba(15, 92, 98, 0.1);
      border: 1px solid var(--color-teal-deep);
      border-radius: var(--radius-md);
      padding: 1rem 1.5rem;
      color: var(--color-teal-deep);
      font-weight: 500;
      margin-top: 1rem;
    }

    /* Pending List */
    .empty-pending {
      text-align: center;
      padding: 2rem;
      opacity: 0.5;
      font-style: italic;
    }
    .pending-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .pending-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .p-token {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.5rem;
      color: var(--color-terracotta);
      min-width: 50px;
    }
    .p-info { flex: 1; min-width: 120px; }
    .p-name { font-weight: 600; color: var(--color-teal-deep); }
    .p-phone { font-size: 0.8rem; opacity: 0.6; }
    .p-items { font-size: 0.85rem; opacity: 0.65; }
    .p-total { font-size: 1.1rem; }
    .p-mode { font-size: 0.8rem; opacity: 0.6; }

    @media (max-width: 640px) {
      .counter-page { padding: 1.25rem 1rem 4rem; }
      .counter-header { gap: 0.85rem; }
      .counter-logo { width: 48px; height: 48px; }
      .counter-header h1 { font-size: 1.4rem; }
      .search-bar { padding: 1.25rem 1rem !important; }
      .search-row { flex-direction: column; align-items: stretch; gap: 1rem; }
      .search-group { width: 100%; min-width: 0; }
      .search-or { display: none; }
      .search-row .btn { width: 100%; justify-content: center; margin-top: 0.5rem; }
      .pending-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
      .pending-row .btn { width: 100%; }
    }
  `]
})
export class CounterComponent {
  tokenSearch: number | null = null;
  phoneSearch = '';
  searched = false;
  foundOrder: Order | null = null;
  String = String;
  private orderService = inject(OrderService);
  private router = inject(Router);

  pendingOrders$ = this.orderService.getPendingPaymentOrders();

  constructor() {}

  search(): void {
    this.searched = true;
    this.foundOrder = null;
    if (this.tokenSearch) {
      this.foundOrder = this.orderService.getOrderByToken(this.tokenSearch) || null;
    } else if (this.phoneSearch) {
      this.foundOrder = this.orderService.getOrderByPhone(this.phoneSearch) || null;
    }
  }

  searchByToken(): void { this.search(); }
  searchByPhone(): void { this.search(); }

  markPaid(): void {
    if (this.foundOrder) {
      this.orderService.markPaid(this.foundOrder.orderId);
      // Refresh found order
      this.foundOrder = this.orderService.getAllOrders().find(o => o.orderId === this.foundOrder!.orderId) || null;
    }
  }

  quickMarkPaid(orderId: string): void {
    this.orderService.markPaid(orderId);
  }

  viewInvoice(): void {
    if (this.foundOrder) {
      this.router.navigate(['/invoice', this.foundOrder.orderId]);
    }
  }
}
