import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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

        <!-- Desktop & Mobile Nav Links -->
        <ul class="nav-links" [class.open]="menuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="menuOpen=false">Home</a></li>
          <li><a routerLink="/menu" routerLinkActive="active" (click)="menuOpen=false">Menu</a></li>
          <li><a href="/#stories" (click)="menuOpen=false">About Us</a></li>
          <li><a routerLink="/track/demo" routerLinkActive="active" (click)="menuOpen=false">Track Order</a></li>
          <li><a routerLink="/checkout" routerLinkActive="active" (click)="menuOpen=false">Checkout</a></li>
        </ul>

        <!-- Mobile Hamburger Toggle -->
        <div class="nav-actions">
          <button class="hamburger" [class.active]="menuOpen" (click)="menuOpen = !menuOpen" [attr.aria-expanded]="menuOpen" aria-label="Toggle menu">
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
      background: rgba(251, 248, 231, 0.94);
      backdrop-filter: blur(20px);
      border-bottom: 2px solid rgba(217, 112, 31, 0.22);
      transition: background var(--transition-base), box-shadow var(--transition-base);
    }
    .navbar.scrolled {
      background: rgba(251, 248, 231, 0.98);
      box-shadow: 0 6px 30px rgba(15, 92, 98, 0.14);
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
      gap: 1.5rem;
    }
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 1.1rem;
      text-decoration: none;
      flex-shrink: 0;
    }
    .logo-img {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      object-fit: cover;
      border: 3.5px solid var(--color-terracotta);
      box-shadow:
        0 0 0 6px rgba(217, 112, 31, 0.16),
        0 8px 24px rgba(217, 112, 31, 0.35);
      flex-shrink: 0;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
    }
    .nav-logo:hover .logo-img {
      transform: scale(1.08) rotate(3deg);
      box-shadow:
        0 0 0 8px rgba(217, 112, 31, 0.22),
        0 12px 32px rgba(217, 112, 31, 0.50);
    }
    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }
    .logo-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.35rem;
      color: var(--color-teal-deep);
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    .logo-hindi {
      font-size: 0.88rem;
      color: var(--color-terracotta);
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      list-style: none;
      flex: 1;
      justify-content: center;
    }
    .nav-links li { display: flex; align-items: center; }
    .nav-links a {
      padding: 0.55rem 1.1rem;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--color-teal-dark);
      transition: all var(--transition-fast);
      border: 1.5px solid transparent;
    }
    .nav-links a:hover {
      background: rgba(15, 92, 98, 0.08);
      color: var(--color-teal-deep);
      border-color: rgba(15, 92, 98, 0.15);
      transform: translateY(-1px);
    }
    .nav-links a.active {
      background: linear-gradient(135deg, var(--color-teal-deep), #164a4e);
      color: white;
      box-shadow: 0 6px 20px rgba(15, 92, 98, 0.28);
      border-color: transparent;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.85rem;
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
      width: 24px;
      height: 2.5px;
      background: var(--color-teal-deep);
      border-radius: 2px;
      transition: all var(--transition-base);
    }

    @media (max-width: 768px) {
      .nav-inner { padding: 0 1rem; }
      .logo-img { width: 58px; height: 58px; }
      .logo-name { font-size: 1.05rem; }
      .logo-hindi { font-size: 0.78rem; }
      .hamburger { display: flex; z-index: 950; }
      .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      .hamburger.active span:nth-child(2) { opacity: 0; }
      .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
      .nav-links {
        position: fixed;
        top: var(--navbar-height);
        left: 0;
        right: 0;
        background: var(--color-offwhite);
        flex-direction: column;
        align-items: stretch;
        padding: 1.25rem 1.5rem 2rem;
        gap: 0.5rem;
        box-shadow: 0 10px 30px rgba(15, 92, 98, 0.15);
        transform: translateY(-110%);
        opacity: 0;
        transition: transform var(--transition-base), opacity var(--transition-base);
        pointer-events: none;
        border-bottom: 2px solid var(--color-terracotta);
      }
      .nav-links.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      .nav-links a { padding: 0.85rem 1.25rem; font-size: 1.05rem; font-weight: 600; }
    }
    @media (max-width: 400px) {
      .logo-name { font-size: 0.9rem; }
      .logo-hindi { font-size: 0.7rem; }
      .nav-inner { gap: 0.5rem; }
    }
  `]
})
export class NavbarComponent {
  menuOpen = false;
  scrolled = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 20;
      });
    }
  }
}
