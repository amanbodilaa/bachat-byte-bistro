import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="emails-page">

      <!-- Page Header -->
      <div class="page-header">
        <div class="container">
          <a routerLink="/" class="back-link">← Back to Home</a>
          <div class="header-badge">Automated Notifications</div>
          <h1>Email Templates</h1>
          <p class="header-sub">Three transactional emails sent automatically at key order milestones</p>

          <!-- Trigger table -->
          <div class="trigger-table">
            <div class="trigger-row trigger-head">
              <span>#</span><span>Trigger</span><span>Contents</span>
            </div>
            @for (t of triggers; track t.no) {
              <div class="trigger-row" [class.active]="activeEmail === t.no" (click)="activeEmail = t.no">
                <span class="t-no">{{ t.no }}</span>
                <span class="t-trigger">{{ t.trigger }}</span>
                <span class="t-contents">{{ t.contents }}</span>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Email switcher tabs -->
      <div class="tabs-bar">
        <div class="container tabs-inner">
          @for (t of triggers; track t.no) {
            <button class="tab-btn" [class.active]="activeEmail === t.no" (click)="activeEmail = t.no">
              <span class="tab-icon">{{ t.icon }}</span>
              <span>{{ t.label }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Email Preview -->
      <div class="preview-wrap container">

        <!-- EMAIL 1: Order Confirmed -->
        @if (activeEmail === 1) {
          <div class="email-shell" id="email-1">
            <div class="email-meta-bar">
              <div class="em-field"><span class="em-label">From:</span> noreply&#64;bachatbytebistro.in</div>
              <div class="em-field"><span class="em-label">To:</span> customer&#64;example.com</div>
              <div class="em-field"><span class="em-label">Subject:</span> 🧾 Order Confirmed — Token #07 | Bachat Byte Bistro</div>
            </div>
            <div class="email-body">
              <!-- Header -->
              <div class="e-header">
                <img src="logo.png" alt="Bachat Byte Bistro" class="e-logo" />
                <div class="e-brand">Bachat Byte Bistro</div>
                <div class="e-hindi devanagari">बचत बाइट बिस्ट्रो</div>
              </div>

              <!-- Token hero -->
              <div class="e-token-hero">
                <div class="e-token-label">YOUR TOKEN NUMBER</div>
                <div class="e-token-num">#07</div>
                <div class="e-token-sub">Show this at the counter when collecting your order</div>
              </div>

              <div class="e-section">
                <h2 class="e-section-title">Order Confirmed! 🎉</h2>
                <p class="e-text">Hi <strong>Rahul</strong>, your order has been received and is being prepared. Please pay at the counter before collecting.</p>
              </div>

              <!-- Order summary table -->
              <div class="e-section">
                <h3 class="e-sub-title">Order Summary</h3>
                <table class="e-table">
                  <thead>
                    <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>🧆 Hummus Pitta</td><td>1</td><td>₹90</td></tr>
                    <tr><td>🌮 Taco</td><td>2</td><td>₹170</td></tr>
                    <tr class="total-row"><td colspan="2"><strong>Total</strong></td><td><strong>₹260</strong></td></tr>
                  </tbody>
                </table>
              </div>

              <div class="e-section e-info-box">
                <div class="e-info-icon">💵</div>
                <div>
                  <div class="e-info-title">Payment at Counter</div>
                  <div class="e-info-text">Please pay <strong>₹260</strong> by Cash or UPI when you arrive. Your food will be confirmed after payment.</div>
                </div>
              </div>

              <div class="e-section e-steps">
                <div class="e-step"><div class="e-step-dot">1</div><span>Visit the counter</span></div>
                <div class="e-step-arrow">→</div>
                <div class="e-step"><div class="e-step-dot">2</div><span>Pay ₹260</span></div>
                <div class="e-step-arrow">→</div>
                <div class="e-step"><div class="e-step-dot">3</div><span>Collect when ready</span></div>
              </div>

              <div class="e-footer">
                <p>Thank you for choosing Bachat Byte Bistro!</p>
                <p class="devanagari" style="color:#D9701F;margin-top:0.25rem;">आपका धन्यवाद 🙏</p>
                <p class="e-footer-note">Savour. Save. Share. · All items ₹100 or below</p>
              </div>
            </div>
          </div>
        }

        <!-- EMAIL 2: Payment Received -->
        @if (activeEmail === 2) {
          <div class="email-shell" id="email-2">
            <div class="email-meta-bar">
              <div class="em-field"><span class="em-label">From:</span> noreply&#64;bachatbytebistro.in</div>
              <div class="em-field"><span class="em-label">To:</span> customer&#64;example.com</div>
              <div class="em-field"><span class="em-label">Subject:</span> ✅ Payment Received — Your order #BBB-0042 is now cooking!</div>
            </div>
            <div class="email-body">
              <div class="e-header e-header-green">
                <img src="logo.png" alt="Bachat Byte Bistro" class="e-logo" />
                <div class="e-brand">Bachat Byte Bistro</div>
                <div class="e-hindi devanagari">बचत बाइट बिस्ट्रो</div>
              </div>

              <!-- Payment confirmed badge -->
              <div class="e-paid-hero">
                <div class="e-paid-check">✓</div>
                <div class="e-paid-title">Payment Confirmed!</div>
                <div class="e-paid-amount">₹260 received via UPI</div>
              </div>

              <div class="e-section">
                <p class="e-text">Hi <strong>Rahul</strong>, great news! The counter staff has confirmed your payment. Your order is now in the kitchen queue.</p>
              </div>

              <!-- CTA Buttons -->
              <div class="e-section e-cta-group">
                <a href="#" class="e-btn e-btn-primary">📍 Track My Order</a>
                <a href="#" class="e-btn e-btn-outline">🧾 View Invoice</a>
              </div>

              <!-- Order details card -->
              <div class="e-section e-card">
                <div class="e-card-row">
                  <span class="e-card-label">Order ID</span>
                  <span class="e-card-val">#BBB-0042</span>
                </div>
                <div class="e-card-row">
                  <span class="e-card-label">Token Number</span>
                  <span class="e-card-val e-token-inline">#07</span>
                </div>
                <div class="e-card-row">
                  <span class="e-card-label">Amount Paid</span>
                  <span class="e-card-val">₹260</span>
                </div>
                <div class="e-card-row">
                  <span class="e-card-label">Payment Mode</span>
                  <span class="e-card-val">UPI at Counter</span>
                </div>
                <div class="e-card-row">
                  <span class="e-card-label">Status</span>
                  <span class="e-card-val e-status-cooking">🔥 Cooking</span>
                </div>
              </div>

              <div class="e-section e-info-box e-info-amber">
                <div class="e-info-icon">⏱️</div>
                <div>
                  <div class="e-info-title">Estimated Wait Time</div>
                  <div class="e-info-text">Your order is in the queue. We'll send you another email the moment it's ready for pickup.</div>
                </div>
              </div>

              <div class="e-footer">
                <p>Thank you for your payment!</p>
                <p class="e-footer-note">Bachat Byte Bistro · Savour. Save. Share.</p>
              </div>
            </div>
          </div>
        }

        <!-- EMAIL 3: Ready for Pickup -->
        @if (activeEmail === 3) {
          <div class="email-shell" id="email-3">
            <div class="email-meta-bar">
              <div class="em-field"><span class="em-label">From:</span> noreply&#64;bachatbytebistro.in</div>
              <div class="em-field"><span class="em-label">To:</span> customer&#64;example.com</div>
              <div class="em-field"><span class="em-label">Subject:</span> 🍽️ Your order is READY — Token #07 — Come collect now!</div>
            </div>
            <div class="email-body">
              <div class="e-header e-header-terracotta">
                <img src="logo.png" alt="Bachat Byte Bistro" class="e-logo" />
                <div class="e-brand">Bachat Byte Bistro</div>
                <div class="e-hindi devanagari">बचत बाइट बिस्ट्रो</div>
              </div>

              <!-- Ready banner -->
              <div class="e-ready-hero">
                <div class="e-ready-icon">🍽️</div>
                <div class="e-ready-title">READY FOR<br>PICKUP!</div>
                <div class="e-ready-sub">Your food is hot, fresh and waiting</div>
              </div>

              <!-- Big token -->
              <div class="e-token-hero e-token-dark">
                <div class="e-token-label">COLLECT WITH TOKEN</div>
                <div class="e-token-num">#07</div>
                <div class="e-token-sub">Show this number at the collection counter</div>
              </div>

              <div class="e-section">
                <p class="e-text" style="text-align:center;font-size:1.05rem;">Hi <strong>Rahul</strong> — your order is ready! 🎉<br>Please come to the collection counter and show Token <strong>#07</strong>.</p>
              </div>

              <!-- What's ready -->
              <div class="e-section">
                <h3 class="e-sub-title">What's ready for you</h3>
                <div class="e-ready-items">
                  <div class="e-ready-item"><span class="e-ready-emoji">🧆</span><span>Hummus Pitta × 1</span></div>
                  <div class="e-ready-item"><span class="e-ready-emoji">🌮</span><span>Taco × 2</span></div>
                </div>
              </div>

              <div class="e-section e-info-box e-info-red">
                <div class="e-info-icon">⚡</div>
                <div>
                  <div class="e-info-title">Please collect promptly</div>
                  <div class="e-info-text">Your order will be held at the counter for 10 minutes. After that it may be cleared to serve the next customer.</div>
                </div>
              </div>

              <!-- Pickup instructions -->
              <div class="e-section e-pickup-steps">
                <div class="e-pickup-step">
                  <div class="e-pickup-num">1</div>
                  <div class="e-pickup-text">Head to the <strong>Collection Counter</strong></div>
                </div>
                <div class="e-pickup-step">
                  <div class="e-pickup-num">2</div>
                  <div class="e-pickup-text">Show Token <strong>#07</strong> to the staff</div>
                </div>
                <div class="e-pickup-step">
                  <div class="e-pickup-num">3</div>
                  <div class="e-pickup-text">Enjoy your meal! 😊</div>
                </div>
              </div>

              <div class="e-footer">
                <p>Enjoy your meal from Bachat Byte Bistro!</p>
                <p class="devanagari" style="color:#D9701F;margin-top:0.25rem;">खाने का मज़ा लीजिए! 🙏</p>
                <p class="e-footer-note">Savour. Save. Share. · All items ₹100 or below</p>
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .emails-page { min-height: 100vh; background: #f0ede6; }

    /* Page Header */
    .page-header {
      background: linear-gradient(135deg, #0F5C62 0%, #1E413D 100%);
      padding: 7rem 0 3rem;
      color: white;
    }
    .back-link {
      display: inline-block; color: rgba(255,255,255,0.6); font-size: 0.875rem;
      text-decoration: none; margin-bottom: 1.5rem;
      transition: color 0.2s;
    }
    .back-link:hover { color: white; }
    .header-badge {
      display: inline-block; background: rgba(232,174,75,0.2); border: 1px solid rgba(232,174,75,0.4);
      color: #E8AE4B; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 0.3rem 0.9rem; border-radius: 999px; margin-bottom: 1rem;
    }
    .page-header h1 {
      font-family: var(--font-display); font-size: 2.5rem; font-weight: 800;
      color: white; margin-bottom: 0.5rem;
    }
    .header-sub { color: rgba(228,217,195,0.7); font-size: 1rem; margin-bottom: 2rem; }

    /* Trigger table */
    .trigger-table { border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
    .trigger-row {
      display: grid; grid-template-columns: 48px 1fr 1fr;
      padding: 0.85rem 1.25rem; gap: 1rem; align-items: center;
      cursor: pointer; transition: background 0.2s;
    }
    .trigger-head {
      background: rgba(255,255,255,0.08); font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5);
      cursor: default;
    }
    .trigger-row:not(.trigger-head) { background: rgba(255,255,255,0.04); border-top: 1px solid rgba(255,255,255,0.06); }
    .trigger-row:not(.trigger-head):hover { background: rgba(255,255,255,0.1); }
    .trigger-row.active { background: rgba(217,112,31,0.25); border-left: 3px solid #D9701F; }
    .t-no { font-weight: 800; color: #E8AE4B; }
    .t-trigger { font-size: 0.9rem; color: rgba(255,255,255,0.85); }
    .t-contents { font-size: 0.85rem; color: rgba(255,255,255,0.55); }

    /* Tabs */
    .tabs-bar { background: white; border-bottom: 1px solid #e8e0d0; position: sticky; top: 88px; z-index: 10; }
    .tabs-inner { display: flex; gap: 0; }
    .tab-btn {
      display: flex; align-items: center; gap: 0.5rem; padding: 1rem 1.75rem;
      border: none; background: none; cursor: pointer; font-family: var(--font-body);
      font-size: 0.875rem; font-weight: 600; color: #777; border-bottom: 3px solid transparent;
      transition: color 0.2s, border-color 0.2s; white-space: nowrap;
    }
    .tab-btn:hover { color: #0F5C62; }
    .tab-btn.active { color: #D9701F; border-bottom-color: #D9701F; }
    .tab-icon { font-size: 1.1rem; }

    /* Preview */
    .preview-wrap { padding: 3rem 1.5rem 5rem; max-width: 680px; }

    /* Email shell */
    .email-shell {
      background: white; border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.08);
      overflow: hidden; border: 1px solid #e8e0d0;
    }
    .email-meta-bar {
      background: #f8f5ee; border-bottom: 1px solid #e8e0d0;
      padding: 1rem 1.5rem; display: flex; flex-direction: column; gap: 0.3rem;
    }
    .em-field { font-size: 0.8rem; color: #555; }
    .em-label { font-weight: 700; color: #333; margin-right: 0.4rem; }

    /* Email body */
    .email-body { padding: 0; font-family: 'Poppins', sans-serif; }

    /* Email header */
    .e-header {
      background: linear-gradient(135deg, #0F5C62, #1E413D);
      padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    }
    .e-header-green { background: linear-gradient(135deg, #1a5c3a, #0d4a2e); }
    .e-header-terracotta { background: linear-gradient(135deg, #8b3a1a, #D9701F); }
    .e-logo { width: 60px; height: 60px; border-radius: 50%; border: 2px solid rgba(217,112,31,0.6); object-fit: cover; }
    .e-brand { font-weight: 800; font-size: 1.1rem; color: white; letter-spacing: -0.01em; }
    .e-hindi { font-size: 0.8rem; color: #D9701F; font-weight: 700; }

    /* Token hero */
    .e-token-hero {
      background: linear-gradient(135deg, #D9701F, #E8AE4B);
      padding: 2.5rem 2rem; text-align: center;
    }
    .e-token-dark { background: linear-gradient(135deg, #1E413D, #0F5C62); }
    .e-token-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
    .e-token-num { font-family: var(--font-display); font-size: 4rem; font-weight: 900; color: white; line-height: 1; letter-spacing: -0.02em; }
    .e-token-sub { font-size: 0.8rem; color: rgba(255,255,255,0.75); margin-top: 0.5rem; }

    /* Paid hero */
    .e-paid-hero {
      background: linear-gradient(135deg, #1a6b3a, #27a85f);
      padding: 2.5rem 2rem; text-align: center;
    }
    .e-paid-check { font-size: 3rem; color: white; margin-bottom: 0.5rem; }
    .e-paid-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: white; }
    .e-paid-amount { font-size: 1rem; color: rgba(255,255,255,0.8); margin-top: 0.4rem; }

    /* Ready hero */
    .e-ready-hero {
      background: linear-gradient(135deg, #8b3a1a, #D9701F);
      padding: 2.5rem 2rem; text-align: center;
    }
    .e-ready-icon { font-size: 3rem; margin-bottom: 0.5rem; }
    .e-ready-title { font-family: var(--font-display); font-size: 2.2rem; font-weight: 900; color: white; line-height: 1.1; letter-spacing: -0.02em; }
    .e-ready-sub { font-size: 0.9rem; color: rgba(255,255,255,0.8); margin-top: 0.5rem; }

    /* Sections */
    .e-section { padding: 1.75rem 2rem; border-bottom: 1px solid #f5f0e8; }
    .e-section:last-child { border-bottom: none; }
    .e-section-title { font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: #0F5C62; margin-bottom: 0.75rem; }
    .e-sub-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #D9701F; margin-bottom: 1rem; }
    .e-text { font-size: 0.925rem; color: #444; line-height: 1.7; }

    /* Table */
    .e-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    .e-table th { text-align: left; padding: 0.5rem 0.75rem; background: #f8f5ee; color: #555; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
    .e-table td { padding: 0.65rem 0.75rem; border-top: 1px solid #f0ebe0; color: #333; }
    .e-table .total-row td { border-top: 2px solid #e8e0d0; background: #fafaf8; }

    /* Info box */
    .e-info-box {
      display: flex; align-items: flex-start; gap: 1rem;
      background: #f0f7f8; border-left: 4px solid #0F5C62;
    }
    .e-info-amber { background: #fffbf0; border-left-color: #E8AE4B; }
    .e-info-red { background: #fff8f5; border-left-color: #D9701F; }
    .e-info-icon { font-size: 1.5rem; flex-shrink: 0; }
    .e-info-title { font-weight: 700; font-size: 0.875rem; color: #1E413D; margin-bottom: 0.25rem; }
    .e-info-text { font-size: 0.825rem; color: #555; line-height: 1.6; }

    /* Steps */
    .e-steps { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
    .e-step { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
    .e-step-dot {
      width: 36px; height: 36px; border-radius: 50%;
      background: #D9701F; color: white; font-weight: 800; font-size: 0.9rem;
      display: flex; align-items: center; justify-content: center;
    }
    .e-step span { font-size: 0.75rem; color: #555; text-align: center; max-width: 70px; }
    .e-step-arrow { color: #D9701F; font-size: 1.2rem; font-weight: 700; padding: 0 0.25rem; }

    /* CTA buttons */
    .e-cta-group { display: flex; gap: 1rem; flex-wrap: wrap; }
    .e-btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 1.5rem; border-radius: 999px; font-weight: 700; font-size: 0.9rem;
      text-decoration: none; transition: opacity 0.2s;
    }
    .e-btn:hover { opacity: 0.85; }
    .e-btn-primary { background: #D9701F; color: white; }
    .e-btn-outline { background: white; color: #0F5C62; border: 2px solid #0F5C62; }

    /* Card */
    .e-card { background: #fafaf8; border-radius: 0; }
    .e-card-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f0ebe0; font-size: 0.875rem; }
    .e-card-row:last-child { border-bottom: none; }
    .e-card-label { color: #888; }
    .e-card-val { font-weight: 600; color: #333; }
    .e-token-inline { color: #D9701F; font-size: 1rem; font-weight: 800; }
    .e-status-cooking { color: #c45a00; background: #fff3e0; padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.8rem; }

    /* Ready items */
    .e-ready-items { display: flex; flex-direction: column; gap: 0.5rem; }
    .e-ready-item {
      display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 1rem;
      background: #f8f5ee; border-radius: 8px; font-size: 0.9rem; color: #333; font-weight: 500;
    }
    .e-ready-emoji { font-size: 1.3rem; }

    /* Pickup steps */
    .e-pickup-steps { display: flex; flex-direction: column; gap: 0.75rem; }
    .e-pickup-step { display: flex; align-items: center; gap: 1rem; }
    .e-pickup-num {
      width: 32px; height: 32px; border-radius: 50%; background: #D9701F;
      color: white; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .e-pickup-text { font-size: 0.9rem; color: #444; }

    /* Footer */
    .e-footer {
      background: #1E413D; padding: 2rem; text-align: center; color: rgba(255,255,255,0.7); font-size: 0.85rem;
    }
    .e-footer p { margin-bottom: 0.25rem; }
    .e-footer-note { font-size: 0.75rem; opacity: 0.5; margin-top: 0.5rem; }

    @media (max-width: 600px) {
      .trigger-row { grid-template-columns: 36px 1fr; }
      .t-contents { display: none; }
      .tab-btn { padding: 0.75rem 1rem; font-size: 0.78rem; }
      .e-section { padding: 1.25rem 1.25rem; }
      .e-cta-group { flex-direction: column; }
    }
  `]
})
export class EmailsComponent {
  activeEmail = 1;

  triggers = [
    { no: 1, icon: '🧾', label: 'Order Confirmed', trigger: 'Order confirmed (before payment)', contents: 'Order summary + token number' },
    { no: 2, icon: '✅', label: 'Payment Received', trigger: 'Payment marked received by counter staff', contents: 'Track Order link + Invoice link' },
    { no: 3, icon: '🍽️', label: 'Ready for Pickup', trigger: 'Kitchen marks order Ready', contents: '"Ready for pickup" notice' },
  ];
}
