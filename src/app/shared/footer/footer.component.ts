import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner container">
        
        <!-- Brand Info -->
        <div class="footer-brand">
          <img src="logo.png" alt="Bachat Byte Bistro" class="footer-logo" />
          <div>
            <div class="footer-name">Bachat Byte Bistro</div>
            <div class="footer-hindi devanagari">बचत बाइट बिस्ट्रो</div>
            <p class="footer-tagline">"Savour. Save. Share."</p>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="footer-nav">
          <a routerLink="/">Home</a>
          <a routerLink="/menu">Menu</a>
          <a href="/#stories">About Us</a>
          <a routerLink="/track/demo">Track Order</a>
          <a routerLink="/checkout">Checkout</a>
        </div>

      </div>

      <!-- Footer Bottom Copyright -->
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      padding-bottom: 2.5rem;
      flex-wrap: wrap;
    }
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 1.15rem;
    }
    .footer-logo {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      border: 3.5px solid var(--color-terracotta);
      box-shadow:
        0 0 0 5px rgba(217, 112, 31, 0.20),
        0 8px 24px rgba(0,0,0,0.35);
      object-fit: cover;
      flex-shrink: 0;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
    }
    .footer-brand:hover .footer-logo {
      transform: scale(1.06) rotate(3deg);
      box-shadow:
        0 0 0 7px rgba(217, 112, 31, 0.28),
        0 12px 30px rgba(0,0,0,0.45);
    }
    .footer-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.35rem;
      color: var(--color-cream);
      letter-spacing: -0.01em;
    }
    .footer-hindi {
      font-size: 0.88rem;
      color: var(--color-terracotta);
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .footer-tagline {
      font-size: 0.88rem;
      color: var(--color-muted-light);
      opacity: 0.75;
      margin-top: 0.15rem;
    }

    .footer-nav {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      flex-wrap: wrap;
    }
    .footer-nav a {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-muted-light);
      opacity: 0.85;
      transition: opacity var(--transition-fast), color var(--transition-fast);
    }
    .footer-nav a:hover {
      opacity: 1;
      color: var(--color-amber-gold);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 1.25rem 1.5rem;
      text-align: center;
      font-size: 0.8rem;
      opacity: 0.55;
    }

    @media (max-width: 768px) {
      .footer-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
      }
      .footer-nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.85rem;
      }
    }
  `]
})
export class FooterComponent {}
