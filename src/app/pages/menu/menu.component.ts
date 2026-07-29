import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';
import { MenuItem } from '../../core/models/menu-item.model';
import { CartItem } from '../../core/models/cart.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="page-wrapper">
      <div class="menu-page">
        <!-- Left: Menu Grid -->
        <div class="menu-section">
          <div class="menu-header">
            <h1>Our Menu</h1>
            <p class="menu-sub">All items ₹100 or below · Fresh &amp; made to order</p>
          </div>

          <div class="menu-grid">
            @for (item of menuItems; track item.id) {
              <div class="menu-card" [class.added]="getCartQty(item.id) > 0">
                <div class="card-emoji">{{ item.emoji }}</div>
                <div class="card-body">
                  <div class="card-header-row">
                    <h3 class="card-name">{{ item.name }}</h3>
                    <span class="badge badge-cuisine">{{ item.cuisine }}</span>
                  </div>
                  <p class="card-desc">{{ item.description }}</p>
                  <div class="card-footer">
                    <span class="price-tag">₹{{ item.price }}</span>
                    @if (getCartQty(item.id) === 0) {
                      <button class="btn btn-primary btn-sm" (click)="addToCart(item)">+ Add</button>
                    } @else {
                      <div class="qty-stepper">
                        <button class="qty-btn" (click)="decrease(item)" aria-label="Decrease quantity">−</button>
                        <span class="qty-value">{{ getCartQty(item.id) }}</span>
                        <button class="qty-btn" (click)="addToCart(item)" aria-label="Increase quantity">+</button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Right: Cart Sidebar -->
        <aside class="cart-sidebar">
          <div class="cart-box">
            <div class="cart-header">
              <h2>🛒 Your Cart</h2>
              @if ((cart$ | async)!.length > 0) {
                <button class="clear-btn" (click)="clearCart()">Clear all</button>
              }
            </div>

            @if ((cart$ | async)!.length === 0) {
              <div class="empty-cart">
                <div class="empty-icon">🍽️</div>
                <p>Your cart is empty.<br>Add something delicious!</p>
              </div>
            } @else {
              <div class="cart-items">
                @for (item of cart$ | async; track item.menuItem.id) {
                  <div class="cart-item">
                    <span class="cart-item-emoji">{{ item.menuItem.emoji }}</span>
                    <div class="cart-item-info">
                      <div class="cart-item-name">{{ item.menuItem.name }}</div>
                      <div class="cart-item-price">₹{{ item.menuItem.price }} × {{ item.quantity }}</div>
                    </div>
                    <div class="cart-item-actions">
                      <div class="qty-stepper">
                        <button class="qty-btn" (click)="decreaseCart(item)" aria-label="Decrease">−</button>
                        <span class="qty-value">{{ item.quantity }}</span>
                        <button class="qty-btn" (click)="increaseCart(item)" aria-label="Increase">+</button>
                      </div>
                      <div class="cart-item-subtotal">₹{{ item.menuItem.price * item.quantity }}</div>
                    </div>
                  </div>
                }
              </div>

              <div class="cart-summary">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>₹{{ cartTotal$ | async }}</span>
                </div>
                <div class="summary-row note">
                  <span>Pay at counter (Cash/UPI)</span>
                </div>
                <div class="summary-total">
                  <span>Total</span>
                  <span class="price-tag">₹{{ cartTotal$ | async }}</span>
                </div>
                <button class="btn btn-primary" style="width:100%;margin-top:1rem;" (click)="checkout()">
                  Proceed to Checkout →
                </button>
              </div>
            }
          </div>
        </aside>
      </div>

      <!-- Mobile Sticky Cart Bar -->
      @if ((cartCount$ | async)! > 0) {
        <div class="mobile-cart-bar">
          <div class="mobile-cart-info">
            <span class="mobile-cart-count">{{ cartCount$ | async }} item(s)</span>
            <span class="mobile-cart-total">₹{{ cartTotal$ | async }}</span>
          </div>
          <button class="btn btn-primary btn-sm" (click)="checkout()">Checkout →</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .menu-page {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
      align-items: start;
    }
    .menu-header { margin-bottom: 2rem; }
    .menu-header h1 { margin-bottom: 0.35rem; }
    .menu-sub { opacity: 0.65; font-size: 0.95rem; }

    /* Menu Grid */
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }
    .menu-card {
      background: var(--color-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
      border: 2px solid transparent;
    }
    .menu-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .menu-card.added {
      border-color: var(--color-terracotta);
    }
    .card-emoji {
      font-size: 3.5rem;
      background: linear-gradient(135deg, var(--color-cream), var(--color-offwhite));
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
    }
    .card-body { padding: 1.25rem; }
    .card-header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .card-name {
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-teal-deep);
    }
    .card-desc {
      font-size: 0.82rem;
      opacity: 0.7;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Cart Sidebar */
    .cart-sidebar {
      position: sticky;
      top: calc(var(--navbar-height) + 1.5rem);
    }
    .cart-box {
      background: var(--color-white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }
    .cart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 2px solid var(--color-cream);
    }
    .cart-header h2 { font-size: 1.1rem; }
    .clear-btn {
      background: none;
      border: none;
      color: var(--color-terracotta);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-full);
      transition: background var(--transition-fast);
    }
    .clear-btn:hover { background: rgba(217,112,31,0.1); }
    .empty-cart {
      padding: 3rem 2rem;
      text-align: center;
    }
    .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
    .empty-cart p { opacity: 0.6; font-size: 0.9rem; }
    .cart-items {
      padding: 1rem;
      max-height: 380px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .cart-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--color-offwhite);
      border-radius: var(--radius-md);
    }
    .cart-item-emoji { font-size: 1.5rem; flex-shrink: 0; }
    .cart-item-info { flex: 1; }
    .cart-item-name { font-weight: 600; font-size: 0.875rem; color: var(--color-teal-deep); }
    .cart-item-price { font-size: 0.78rem; opacity: 0.6; margin-top: 0.1rem; }
    .cart-item-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; }
    .cart-item-subtotal { font-weight: 700; font-size: 0.9rem; color: var(--color-terracotta); }
    .cart-summary {
      padding: 1rem 1.5rem 1.5rem;
      border-top: 2px solid var(--color-cream);
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      padding: 0.3rem 0;
      opacity: 0.7;
    }
    .summary-row.note { opacity: 0.5; font-size: 0.78rem; font-style: italic; }
    .summary-total {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.75rem 0 0;
      border-top: 1px solid var(--color-cream);
      margin-top: 0.35rem;
    }

    /* Mobile sticky cart bar */
    .mobile-cart-bar {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-teal-deep);
      color: white;
      padding: 1rem 1.5rem;
      align-items: center;
      justify-content: space-between;
      z-index: 800;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
    }
    .mobile-cart-info { display: flex; flex-direction: column; gap: 0.1rem; }
    .mobile-cart-count { font-size: 0.85rem; opacity: 0.8; }
    .mobile-cart-total { font-family: var(--font-display); font-weight: 800; font-size: 1.2rem; color: var(--color-amber-gold); }

    @media (max-width: 900px) {
      .menu-page { grid-template-columns: 1fr; }
      .cart-sidebar { display: none; }
      .mobile-cart-bar { display: flex; }
      .page-wrapper { padding-bottom: 80px; }
    }
    @media (max-width: 480px) {
      .menu-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  private cartService = inject(CartService);
  private menuService = inject(MenuService);
  private router = inject(Router);
  cart$ = this.cartService.cart$;
  cartTotal$ = this.cartService.cartTotal$;
  cartCount$ = this.cartService.cartCount$;

  constructor() {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe(items => (this.menuItems = items));
  }

  getCartQty(itemId: string): number {
    const item = this.cartService.getCart().find(i => i.menuItem.id === itemId);
    return item ? item.quantity : 0;
  }

  addToCart(item: MenuItem): void {
    this.cartService.addItem(item);
  }

  decrease(item: MenuItem): void {
    this.cartService.removeItem(item.id);
  }

  increaseCart(cartItem: CartItem): void {
    this.cartService.addItem(cartItem.menuItem);
  }

  decreaseCart(cartItem: CartItem): void {
    this.cartService.removeItem(cartItem.menuItem.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
