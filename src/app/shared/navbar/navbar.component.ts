import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled">
      <div class="nav-inner">
        <!-- Logo -->
        <a routerLink="/" class="nav-logo" aria-label="Bachat Byte Bistro Home">
          <img src="logo.png" alt="Bachat Byte Bistro logo" class="logo-img" />
          <div class="logo-text">
            <span class="logo-name">Bachat Byte Bistro</span>
            <span class="logo-hindi devanagari">बचत बाइट बिस्ट्रो</span>
          </div>
        </a>

        <!-- Desktop Nav Links -->
        <ul class="nav-links" [class.open]="menuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="menuOpen=false">Home</a></li>
          <li><a routerLink="/menu" routerLinkActive="active" (click)="menuOpen=false">Menu</a></li>
          <li><a routerLink="/track/demo" routerLinkActive="active" (click)="menuOpen=false">Track Order</a></li>
          <li class="staff-links">
            <span class="staff-label">Staff</span>
            <a routerLink="/counter" routerLinkActive="active" (click)="menuOpen=false">Counter</a>
            <a routerLink="/kitchen" routerLinkActive="active" (click)="menuOpen=false">Kitchen</a>
          </li>
        </ul>

        <!-- Cart & Hamburger -->
        <div class="nav-actions">
          <a routerLink="/menu" class="cart-btn" aria-label="Open cart">
            <span class="cart-icon">🛒</span>
            @if ((cartCount$ | async)! > 0) {
              <span class="cart-badge">{{ cartCount$ | async }}</span>
            }
          </a>
          <button class="hamburger" (click)="menuOpen = !menuOpen" [attr.aria-expanded]="menuOpen" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 900;
      height: var(--navbar-height);
      background: rgba(251, 248, 231, 0.92);
      backdrop-filter: blur(16px);
      border-bottom: 2px solid rgba(217, 112, 31, 0.18);
      transition: background var(--transition-base), box-shadow var(--transition-base);
    }
    .navbar.scrolled {
      background: rgba(251, 248, 231, 0.98);
      box-shadow: 0 4px 24px rgba(15, 92, 98, 0.12);
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      gap: 1.25rem;
    }
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      flex-shrink: 0;
    }
    .logo-img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--color-terracotta);
      box-shadow: 0 0 0 5px rgba(217, 112, 31, 0.15), 0 4px 16px rgba(217, 112, 31, 0.25);
      flex-shrink: 0;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
    }
    .nav-logo:hover .logo-img {
      transform: scale(1.06) rotate(3deg);
      box-shadow: 0 0 0 7px rgba(217, 112, 31, 0.20), 0 6px 24px rgba(217, 112, 31, 0.40);
    }
    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }
    .logo-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--color-teal-deep);
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    .logo-hindi {
      font-size: 0.82rem;
      color: var(--color-terracotta);
      font-weight: 700;
      letter-spacing: 0.01em;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      list-style: none;
      flex: 1;
      justify-content: center;
    }
    .nav-links li { display: flex; align-items: center; gap: 0.25rem; }
    .nav-links a {
      padding: 0.45rem 0.85rem;
      border-radius: var(--radius-full);
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--color-teal-dark);
      transition: background var(--transition-fast), color var(--transition-fast);
    }
    .nav-links a:hover {
      background: rgba(15, 92, 98, 0.08);
      color: var(--color-teal-deep);
    }
    .nav-links a.active {
      background: var(--color-teal-deep);
      color: white;
    }
    .staff-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--color-amber-gold);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding-left: 0.5rem;
      border-left: 2px solid var(--color-amber-gold);
    }
    .staff-links { gap: 0.25rem !important; }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .cart-btn {
      position: relative;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--color-terracotta);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
      box-shadow: 0 2px 12px rgba(217, 112, 31, 0.35);
    }
    .cart-btn:hover { transform: scale(1.08); box-shadow: 0 4px 20px rgba(217, 112, 31, 0.55); }
    .cart-icon { font-size: 1.1rem; }
    .cart-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--color-amber-gold);
      color: var(--color-teal-dark);
      font-size: 0.65rem;
      font-weight: 800;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-offwhite);
      animation: pulse-ring 1.5s infinite;
    }
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.4rem;
    }
    .hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--color-teal-deep);
      border-radius: 2px;
      transition: all var(--transition-base);
    }
    @media (max-width: 700px) {
      .logo-text { display: none; }
      .logo-img { width: 54px; height: 54px; }
    }
    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav-links {
        position: fixed;
        top: var(--navbar-height);
        left: 0;
        right: 0;
        background: var(--color-offwhite);
        flex-direction: column;
        align-items: stretch;
        padding: 1rem 1.5rem 2rem;
        gap: 0.25rem;
        box-shadow: var(--shadow-lg);
        transform: translateY(-110%);
        opacity: 0;
        transition: transform var(--transition-base), opacity var(--transition-base);
        pointer-events: none;
      }
      .nav-links.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      .nav-links a { padding: 0.75rem 1rem; font-size: 1rem; }
      .staff-label { padding-left: 0; border-left: none; margin-top: 0.5rem; }
      .staff-links { flex-direction: column; align-items: stretch; }
    }
  `]
})
export class NavbarComponent {
  menuOpen = false;
  scrolled = false;
  private cartService = inject(CartService);
  cartCount$ = this.cartService.cartCount$;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 20;
      });
    }
  }
}
