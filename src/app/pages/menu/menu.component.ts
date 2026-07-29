import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';
import { MenuItem } from '../../core/models/menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="page-wrapper">
      
      <!-- Menu Hero Banner -->
      <div class="menu-hero">
        <div class="container menu-hero-inner">
          <div class="hero-left">
            <span class="menu-eyebrow">
              <span class="devanagari">बचत</span> · Gourmet Food Fest
            </span>
            <h1>Bachat Bistro Craft Menu</h1>
            <p class="menu-hero-sub">
              Handcrafted street food &amp; refreshing blends · Every single dish <strong>₹100 or below</strong>
            </p>
          </div>
          <div class="price-guarantee-badge">
            <div class="badge-ring">
              <span class="badge-price">₹100</span>
              <span class="badge-text">MAX PRICE</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Container -->
      <div class="menu-page container">

        <!-- Category Filters Bar -->
        <div class="category-bar">
          <div class="categories-scroll">
            @for (cat of categories; track cat.id) {
              <button 
                class="category-btn" 
                [class.active]="selectedCategory === cat.id"
                (click)="selectedCategory = cat.id">
                <span class="cat-icon">{{ cat.icon }}</span>
                <span>{{ cat.name }}</span>
                <span class="cat-count">{{ getCategoryCount(cat.id) }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Full-Width Menu Section -->
        <div class="menu-full-section">
          <div class="section-title-row">
            <h2>{{ getCategoryTitle() }}</h2>
            <span class="items-found">{{ filteredMenuItems.length }} item(s)</span>
          </div>

          <!-- Full Width Grid for Food Cards -->
          <div class="menu-grid">
            @for (item of filteredMenuItems; track item.id) {
              <div class="menu-card" [class.in-cart]="getCartQty(item.id) > 0">

                <!-- Image & Badges -->
                <div class="card-img-wrap" (click)="openQuickView(item)">
                  @if (item.image) {
                    <img [src]="item.image" [alt]="item.name" class="card-img" loading="lazy" />
                  } @else {
                    <div class="card-emoji-fallback">{{ item.emoji }}</div>
                  }
                  
                  <div class="card-img-overlay"></div>

                  <!-- Badges Top -->
                  <div class="card-badges-top">
                    @if (item.tag) {
                      <span class="item-tag">{{ item.tag }}</span>
                    }
                    <span class="flag-badge">{{ item.flag || '🇮🇳' }}</span>
                  </div>

                  @if (item.prepTime) {
                    <div class="prep-time-badge">
                      ⏱️ {{ item.prepTime }}
                    </div>
                  }

                  <button class="quick-view-btn" aria-label="View dish story">
                    ℹ️ Story
                  </button>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                  <div class="card-meta">
                    <span class="cuisine-tag">{{ item.cuisine }}</span>
                  </div>

                  <h3 class="card-name" (click)="openQuickView(item)">{{ item.name }}</h3>
                  <p class="card-desc">{{ item.description }}</p>

                  @if (item.funFact) {
                    <div class="card-teaser" (click)="openQuickView(item)">
                      <span class="teaser-icon">💡</span>
                      <span class="teaser-text">{{ item.funFact }}</span>
                    </div>
                  }

                  <!-- Card Footer / Actions -->
                  <div class="card-footer">
                    <div class="price-wrap">
                      <span class="currency">₹</span>
                      <span class="price-val">{{ item.price }}</span>
                    </div>

                    @if (getCartQty(item.id) === 0) {
                      <button class="btn btn-primary btn-add" (click)="addToCart(item)">
                        <span>+ Add to Cart</span>
                      </button>
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

      </div>

      <!-- Floating Basket Trigger Button (Active when items > 0) -->
      @if ((cartCount$ | async)! > 0) {
        <div class="floating-basket-bar" (click)="openCart()">
          <div class="fb-left">
            <span class="fb-icon">🛒</span>
            <div class="fb-text">
              <span class="fb-count">{{ cartCount$ | async }} item(s) in basket</span>
              <span class="fb-sub">Tap to view &amp; checkout</span>
            </div>
          </div>
          <div class="fb-right">
            <span class="fb-total">₹{{ cartTotal$ | async }}</span>
            <span class="fb-arrow">View Basket →</span>
          </div>
        </div>
      }

      <!-- Dish Quick View Modal -->
      @if (selectedModalItem) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <button class="modal-close-btn" (click)="closeModal()">✕</button>
            
            <div class="modal-img-wrap">
              @if (selectedModalItem.image) {
                <img [src]="selectedModalItem.image" [alt]="selectedModalItem.name" class="modal-img" />
              }
              <div class="modal-flag">{{ selectedModalItem.flag || '🇮🇳' }}</div>
            </div>

            <div class="modal-body">
              <div class="modal-meta">
                <span class="cuisine-tag">{{ selectedModalItem.cuisine }}</span>
                @if (selectedModalItem.prepTime) {
                  <span class="modal-prep">⏱️ {{ selectedModalItem.prepTime }}</span>
                }
              </div>

              <h2 class="modal-title">{{ selectedModalItem.name }}</h2>
              <p class="modal-desc">{{ selectedModalItem.description }}</p>

              @if (selectedModalItem.funFact) {
                <div class="modal-story-box">
                  <div class="story-box-title">💡 Dish Highlight</div>
                  <p class="story-box-text">{{ selectedModalItem.funFact }}</p>
                </div>
              }

              <div class="modal-footer">
                <div class="modal-price">₹{{ selectedModalItem.price }}</div>
                <button class="btn btn-primary" (click)="addToCart(selectedModalItem); closeModal()">
                  + Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .page-wrapper {
      background: var(--color-offwhite);
      min-height: 100vh;
    }

    /* Menu Hero Banner */
    .menu-hero {
      background: linear-gradient(135deg, #0d4a50 0%, #0F5C62 45%, #1E413D 100%);
      color: white;
      padding: 6.5rem 0 3.5rem;
      position: relative;
      overflow: hidden;
    }
    .menu-hero-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
    .menu-eyebrow {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-amber-gold);
      margin-bottom: 0.75rem;
    }
    .menu-hero h1 {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 4.5vw, 3.8rem);
      font-weight: 800;
      color: white;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    .menu-hero-sub {
      font-size: 1.05rem;
      color: rgba(228,217,195,0.8);
      max-width: 540px;
    }
    .price-guarantee-badge {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .badge-ring {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: rgba(217,112,31,0.15);
      border: 3px dashed var(--color-amber-gold);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      animation: pulse-ring 3s infinite;
    }
    .badge-price {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 900;
      color: var(--color-amber-gold);
      line-height: 1;
    }
    .badge-text {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: rgba(255,255,255,0.8);
      margin-top: 0.2rem;
    }

    /* Category Navigation Bar */
    .category-bar {
      margin: 1.25rem 0 2rem;
      position: sticky;
      top: var(--navbar-height);
      z-index: 50;
      background: rgba(251, 248, 231, 0.95);
      backdrop-filter: blur(12px);
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(15, 92, 98, 0.08);
    }
    .categories-scroll {
      display: flex;
      gap: 0.75rem;
      overflow-x: auto;
      padding: 0.25rem 0.25rem 0.5rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .categories-scroll::-webkit-scrollbar { display: none; }

    .category-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.75rem 1.4rem;
      border-radius: var(--radius-full);
      background: white;
      border: 2px solid rgba(15, 92, 98, 0.12);
      color: var(--color-teal-dark);
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(0,0,0,0.04);
      transition: all var(--transition-base);
    }
    .category-btn:hover {
      border-color: var(--color-terracotta);
      transform: translateY(-2px);
    }
    .category-btn.active {
      background: var(--color-terracotta);
      color: white;
      border-color: var(--color-terracotta);
      box-shadow: 0 8px 24px rgba(217, 112, 31, 0.35);
    }
    .cat-icon { font-size: 1.1rem; }
    .cat-count {
      background: rgba(0,0,0,0.08);
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .category-btn.active .cat-count {
      background: rgba(255,255,255,0.25);
      color: white;
    }

    /* Menu Full Section */
    .menu-full-section {
      padding-bottom: 6rem;
    }
    .section-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.75rem;
    }
    .section-title-row h2 {
      font-size: 1.75rem;
      color: var(--color-teal-deep);
    }
    .items-found {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(15, 92, 98, 0.6);
    }

    /* Dish Cards Grid — Full Width 3-4 Columns */
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .menu-card {
      background: white;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(15, 92, 98, 0.08);
      border: 2px solid transparent;
      display: flex;
      flex-direction: column;
      transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
    }
    .menu-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 48px rgba(217, 112, 31, 0.18);
      border-color: rgba(217, 112, 31, 0.3);
    }
    .menu-card.in-cart {
      border-color: var(--color-terracotta);
    }

    /* Card Image */
    .card-img-wrap {
      position: relative;
      height: 220px;
      overflow: hidden;
      cursor: pointer;
      background: #f0ebe0;
    }
    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .menu-card:hover .card-img {
      transform: scale(1.08);
    }
    .card-img-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.4) 100%);
    }

    .card-badges-top {
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
    }
    .item-tag {
      background: rgba(217, 112, 31, 0.92);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-full);
      backdrop-filter: blur(4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .flag-badge {
      background: rgba(255,255,255,0.92);
      font-size: 1.15rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .prep-time-badge {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      background: rgba(15, 92, 98, 0.88);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-full);
      backdrop-filter: blur(4px);
      z-index: 2;
    }

    .quick-view-btn {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background: rgba(255,255,255,0.92);
      border: none;
      color: var(--color-teal-deep);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      z-index: 2;
      transition: background 0.2s;
    }
    .quick-view-btn:hover { background: white; }

    /* Card Body */
    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .card-meta { margin-bottom: 0.35rem; }
    .cuisine-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-terracotta);
    }
    .card-name {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--color-teal-deep);
      margin-bottom: 0.5rem;
      cursor: pointer;
      line-height: 1.2;
    }
    .card-desc {
      font-size: 0.875rem;
      color: rgba(30, 65, 61, 0.75);
      line-height: 1.6;
      margin-bottom: 1.25rem;
      flex: 1;
    }

    .card-teaser {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      background: var(--color-offwhite);
      padding: 0.6rem 0.85rem;
      border-radius: var(--radius-md);
      font-size: 0.8rem;
      color: var(--color-teal-dark);
      margin-bottom: 1.25rem;
      cursor: pointer;
      border: 1px solid rgba(217, 112, 31, 0.14);
    }
    .teaser-icon { flex-shrink: 0; }
    .teaser-text { opacity: 0.85; line-height: 1.4; }

    /* Card Footer */
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--color-cream);
    }
    .price-wrap {
      display: flex;
      align-items: baseline;
      gap: 0.1rem;
      color: var(--color-terracotta);
    }
    .currency { font-weight: 700; font-size: 1.15rem; }
    .price-val { font-family: var(--font-display); font-weight: 900; font-size: 1.7rem; }

    .btn-add {
      padding: 0.65rem 1.4rem;
      font-size: 0.95rem;
    }

    /* Floating Basket Bar */
    .floating-basket-bar {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 900;
      background: linear-gradient(135deg, var(--color-teal-deep), var(--color-teal-dark));
      color: white;
      padding: 0.85rem 1.5rem;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      box-shadow: 0 12px 40px rgba(15, 92, 98, 0.35);
      border: 2px solid var(--color-amber-gold);
      cursor: pointer;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }
    .floating-basket-bar:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 16px 50px rgba(217, 112, 31, 0.45);
    }
    .fb-left { display: flex; align-items: center; gap: 0.85rem; }
    .fb-icon { font-size: 1.5rem; }
    .fb-text { display: flex; flex-direction: column; }
    .fb-count { font-weight: 800; font-size: 0.95rem; color: white; }
    .fb-sub { font-size: 0.72rem; color: var(--color-amber-gold); }
    .fb-right { display: flex; align-items: center; gap: 1rem; }
    .fb-total { font-family: var(--font-display); font-weight: 900; font-size: 1.4rem; color: var(--color-amber-gold); }
    .fb-arrow {
      background: var(--color-terracotta);
      color: white;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 0.4rem 1rem;
      border-radius: 999px;
    }

    /* Modal Quick View */
    .modal-card {
      background: white;
      border-radius: var(--radius-xl);
      overflow: hidden;
      max-width: 520px;
      width: 92%;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      animation: slideUp 0.3s ease;
    }
    .modal-close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(0,0,0,0.5);
      color: white;
      border: none;
      font-weight: 700;
      cursor: pointer;
      z-index: 10;
    }
    .modal-img-wrap {
      height: 240px;
      position: relative;
      background: #f0ebe0;
    }
    .modal-img { width: 100%; height: 100%; object-fit: cover; }
    .modal-flag {
      position: absolute;
      bottom: 1rem;
      left: 1.5rem;
      background: white;
      font-size: 1.3rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .modal-body { padding: 1.75rem 1.75rem 1.5rem; }
    .modal-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
    .modal-prep { font-size: 0.78rem; font-weight: 600; color: var(--color-teal-deep); }
    .modal-title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--color-teal-deep); margin-bottom: 0.5rem; }
    .modal-desc { font-size: 0.9rem; color: rgba(30,65,61,0.8); line-height: 1.6; margin-bottom: 1.25rem; }
    .modal-story-box {
      background: var(--color-offwhite);
      border-left: 4px solid var(--color-terracotta);
      padding: 0.85rem 1rem;
      border-radius: 6px;
      margin-bottom: 1.5rem;
    }
    .story-box-title { font-size: 0.75rem; font-weight: 700; color: var(--color-terracotta); text-transform: uppercase; margin-bottom: 0.25rem; }
    .story-box-text { font-size: 0.85rem; color: var(--color-teal-dark); line-height: 1.5; }
    .modal-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-cream); padding-top: 1rem; }
    .modal-price { font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; color: var(--color-terracotta); }

    /* Responsive */
    @media (max-width: 768px) {
      .menu-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
      .floating-basket-bar { right: 1rem; left: 1rem; bottom: 1.5rem; gap: 1rem; }
      .fb-sub { display: none; }
    }
    @media (max-width: 600px) {
      .menu-hero { padding: 5.5rem 0 2.5rem; }
      .menu-grid { grid-template-columns: 1fr; }
      .card-img-wrap { height: 190px; }
      .price-guarantee-badge { display: none; }
    }
  `]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  selectedCategory = 'all';
  selectedModalItem: MenuItem | null = null;

  private cartService = inject(CartService);
  private menuService = inject(MenuService);
  private router = inject(Router);

  cart$ = this.cartService.cart$;
  cartTotal$ = this.cartService.cartTotal$;
  cartCount$ = this.cartService.cartCount$;

  categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'Mains', name: 'Mains & Tacos', icon: '🌮' },
    { id: 'Street Food', name: 'Street Chaat', icon: '🥘' },
    { id: 'Drinks & Desserts', name: 'Drinks & Desserts', icon: '🧊' },
  ];

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe(items => (this.menuItems = items));
  }

  get filteredMenuItems(): MenuItem[] {
    if (this.selectedCategory === 'all') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  getCategoryCount(catId: string): number {
    if (catId === 'all') return this.menuItems.length;
    return this.menuItems.filter(i => i.category === catId).length;
  }

  getCategoryTitle(): string {
    const cat = this.categories.find(c => c.id === this.selectedCategory);
    return cat ? `${cat.icon} ${cat.name}` : 'Menu';
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

  openQuickView(item: MenuItem): void {
    this.selectedModalItem = item;
  }

  closeModal(): void {
    this.selectedModalItem = null;
  }

  openCart(): void {
    this.cartService.openCart();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
