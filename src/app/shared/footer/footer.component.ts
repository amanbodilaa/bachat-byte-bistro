import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner container">
        <div class="footer-brand">
          <img src="logo.png" alt="Bachat Byte Bistro" class="footer-logo" />
          <div>
            <div class="footer-name">Bachat Byte Bistro</div>
            <div class="footer-hindi devanagari">बचत बाइट बिस्ट्रो</div>
            <p class="footer-tagline">"Savour. Save. Share."</p>
          </div>
        </div>
        <div class="footer-links">
          <h4>Order</h4>
          <a routerLink="/menu">View Menu</a>
          <a routerLink="/checkout">Checkout</a>
        </div>
        <div class="footer-links">
          <h4>Staff</h4>
          <a routerLink="/counter">Counter</a>
          <a routerLink="/kitchen">Kitchen Display</a>
        </div>
        <div class="footer-links">
          <h4>Info</h4>
          <span>All prices ₹100 or below</span>
          <span>Fresh &amp; made to order</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Bachat Byte Bistro · Savour. Save. Share.</span>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-teal-dark);
      color: var(--color-muted-light);
      padding: 3rem 0 0;
    }
    .footer-inner {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 2rem;
      padding-bottom: 2rem;
    }
    .footer-brand {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    .footer-logo {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 2px solid var(--color-terracotta);
      object-fit: cover;
      flex-shrink: 0;
    }
    .footer-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--color-cream);
    }
    .footer-hindi {
      font-size: 0.8rem;
      color: var(--color-terracotta);
      font-weight: 700;
    }
    .footer-tagline {
      font-size: 0.85rem;
      color: var(--color-muted-light);
      opacity: 0.7;
      margin-top: 0.25rem;
    }
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .footer-links h4 {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--color-amber-gold);
      margin-bottom: 0.25rem;
    }
    .footer-links a, .footer-links span {
      font-size: 0.875rem;
      color: var(--color-muted-light);
      opacity: 0.75;
      transition: opacity var(--transition-fast), color var(--transition-fast);
    }
    .footer-links a:hover { opacity: 1; color: var(--color-cream); }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 1rem 1.5rem;
      text-align: center;
      font-size: 0.8rem;
      opacity: 0.5;
    }
    @media (max-width: 768px) {
      .footer-inner { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 480px) {
      .footer-inner { grid-template-columns: 1fr; }
    }
  `]
})
export class FooterComponent {}
