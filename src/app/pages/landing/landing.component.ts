import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ===== HERO — Editorial Split ===== -->
    <section class="hero" id="home">

      <!-- Left panel: dark teal, text -->
      <div class="hero-left">
        <!-- Decorative dot grid -->
        <div class="dot-grid" aria-hidden="true">
          @for (d of dots; track d) {
            <span class="dot" [style.opacity]="d.o" [style.width.px]="d.s" [style.height.px]="d.s"></span>
          }
        </div>

        <div class="hero-left-content">
          <!-- Top label -->
          <div class="hero-eyebrow">
            <span class="eyebrow-line"></span>
            <span class="devanagari">बचत</span>
            <span class="eyebrow-sep">·</span>
            <span>Byte</span>
            <span class="eyebrow-sep">·</span>
            <span>Bistro</span>
          </div>

          <!-- Giant headline -->
          <h1 class="hero-title">
            <span class="hero-word">Savour.</span>
            <span class="hero-word accent">Save.</span>
            <span class="hero-word">Share.</span>
          </h1>

          <p class="hero-sub">
            Authentic flavours, wallet-friendly prices.<br>
            Order in seconds, collect when ready.
          </p>

          <div class="hero-actions">
            <a routerLink="/menu" class="btn btn-primary btn-lg">🍽️ Order Now</a>
            <a href="#stories" class="btn btn-ghost-white btn-lg">Our Story ↓</a>
          </div>

          <!-- Stats bar -->
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-val">5</span>
              <span class="stat-label">Dishes</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-val">₹100</span>
              <span class="stat-label">Max price</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-val">&lt;10s</span>
              <span class="stat-label">To order</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right panel: warm cream, logo + floating food icons -->
      <div class="hero-right">
        <!-- Floating food items -->
        <div class="food-float f1" aria-hidden="true">🧆</div>
        <div class="food-float f2" aria-hidden="true">🌮</div>
        <div class="food-float f3" aria-hidden="true">🥘</div>
        <div class="food-float f4" aria-hidden="true">🍮</div>
        <div class="food-float f5" aria-hidden="true">🧊</div>

        <!-- Geometric accent circles -->
        <div class="geo-circle gc-1"></div>
        <div class="geo-circle gc-2"></div>

        <!-- Logo -->
        <div class="logo-showcase">
          <div class="logo-frame">
            <img src="logo.png" alt="Bachat Byte Bistro" class="showcase-logo" />
          </div>
          <div class="logo-tagline">Bachat Byte Bistro</div>
          <div class="logo-hindi devanagari">बचत बाइट बिस्ट्रो</div>
        </div>
      </div>

      <!-- Diagonal clip overlay -->
      <div class="hero-clip" aria-hidden="true"></div>

    </section>

    <!-- ===== DISH STORIES ===== -->
    <section class="dish-stories section-pad" id="stories">
      <div class="container">
        <div class="section-heading">
          <h2>Stories on a Plate</h2>
          <div class="divider"></div>
          <p>Every dish we serve carries centuries of culture, spice routes and street-corner wisdom</p>
        </div>

        <div class="stories-grid">
          @for (dish of dishStories; track dish.id) {
            <div class="story-card">
              <!-- Dish Photo -->
              <div class="story-img-wrap">
                <img [src]="dish.image" [alt]="dish.name" class="story-img" loading="lazy" />
                <div class="story-img-overlay">
                  <span class="origin-flag">{{ dish.flag }}</span>
                </div>
              </div>

              <div class="story-card-body">
                <div class="story-meta">
                  <span class="story-cuisine-tag">{{ dish.cuisine }}</span>
                  <span class="story-origin-label">{{ dish.origin }}</span>
                </div>
                <h3 class="story-name">{{ dish.name }}</h3>
                <p class="story-lore">{{ dish.lore }}</p>
                <div class="story-fun-fact">
                  <span class="fun-fact-icon">💡</span>
                  <span>{{ dish.funFact }}</span>
                </div>
              </div>

              <div class="story-card-footer">
                <a routerLink="/menu" class="story-order-btn">Order Now</a>
                <span class="story-price">₹{{ dish.price }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ===== HOW IT WORKS ===== -->
    <section class="how-it-works" id="how-it-works">
      <!-- Top wave divider -->
      <div class="hiw-wave hiw-wave-top">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#FBF8E7"/>
        </svg>
      </div>

      <div class="hiw-inner container">
        <div class="hiw-header">
          <span class="hiw-eyebrow">Simple &amp; Fast</span>
          <h2 class="hiw-title">How It Works</h2>
          <p class="hiw-sub">Four steps from craving to collection — no app download, no fuss</p>
        </div>

        <!-- Timeline -->
        <div class="hiw-timeline">
          <!-- Connecting line behind cards -->
          <div class="hiw-line">
            <div class="hiw-line-fill"></div>
          </div>

          @for (step of steps; track step.no; let last = $last) {
            <div class="hiw-step">
              <!-- Watermark number -->
              <div class="hiw-watermark">{{ step.no }}</div>

              <!-- Icon bubble -->
              <div class="hiw-icon-wrap" [class]="'step-color-' + step.no">
                <div class="hiw-icon-ring">
                  <span class="hiw-icon-svg" [innerHTML]="step.svg"></span>
                </div>
                <!-- Step number badge -->
                <div class="hiw-badge">{{ step.no }}</div>
              </div>

              <!-- Text -->
              <div class="hiw-text">
                <div class="hiw-step-label">Step {{ step.no }}</div>
                <h3 class="hiw-step-title">{{ step.title }}</h3>
                <p class="hiw-step-desc">{{ step.desc }}</p>
              </div>

              <!-- Arrow connector (not on last) -->
              @if (!last) {
                <div class="hiw-arrow">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16 H24 M18 10 L24 16 L18 22" stroke="#E8AE4B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              }
            </div>
          }
        </div>

        <!-- Bottom CTA -->
        <div class="hiw-cta">
          <a routerLink="/menu" class="btn btn-primary btn-lg">Start Ordering Now →</a>
          <p class="hiw-cta-note">Takes less than 2 minutes · No signup needed</p>
        </div>
      </div>

      <!-- Bottom wave -->
      <div class="hiw-wave hiw-wave-bottom">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,60 1440,0 L1440,60 L0,60 Z" fill="#EBE4D2"/>
        </svg>
      </div>
    </section>

    <!-- ===== BRAND STORY ===== -->
    <section class="brand-story section-pad">
      <div class="container">
        <div class="story-inner">
          <div class="brand-logo-col">
            <img src="logo.png" alt="Bachat Byte Bistro logo" class="brand-logo-img" />
          </div>
          <div class="brand-text">
            <h2>The Story Behind the Name</h2>
            <p>
              <strong class="text-terracotta">Bachat</strong> (बचत) — Hindi for <em>savings</em>. Every item is priced to keep your wallet happy.
            </p>
            <p>
              <strong class="text-teal">Byte</strong> — A playful nod to the digital world we live in.
            </p>
            <p>
              <strong class="text-amber">Bistro</strong> — A cosy place to eat, share, and enjoy.
            </p>
            <a routerLink="/menu" class="btn btn-secondary" style="margin-top:1.5rem;">Start Your Order</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ===== HERO — Editorial Split ===== */
    .hero { min-height: 100vh; display: grid; grid-template-columns: 55% 45%; position: relative; overflow: hidden; }
    .hero-left {
      background: linear-gradient(160deg, #0d4a50 0%, #0F5C62 45%, #1a4a40 100%);
      position: relative; display: flex; align-items: center;
      padding: 7rem 3.5rem 4rem 5rem; overflow: hidden;
    }
    .dot-grid {
      position: absolute; inset: 0;
      display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(10, 1fr);
      padding: 2rem; pointer-events: none;
    }
    .dot { border-radius: 50%; background: rgba(255,255,255,0.6); align-self: center; justify-self: center; }
    .hero-left-content { position: relative; z-index: 1; max-width: 560px; }
    .hero-eyebrow {
      display: flex; align-items: center; gap: 0.6rem;
      font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--color-amber-gold); margin-bottom: 2rem;
    }
    .eyebrow-line { display: inline-block; width: 32px; height: 2px; background: var(--color-terracotta); border-radius: 2px; }
    .eyebrow-sep { opacity: 0.4; }
    .hero-title {
      font-family: var(--font-display); font-weight: 800;
      font-size: clamp(3.2rem, 5vw, 5.8rem); line-height: 0.95;
      color: white; margin-bottom: 1.75rem; letter-spacing: -0.025em;
      display: flex; flex-direction: column;
    }
    .hero-word { display: block; }
    .hero-word.accent { color: transparent; -webkit-text-stroke: 2px var(--color-amber-gold); }
    .hero-sub { font-size: 1.05rem; color: rgba(228,217,195,0.75); line-height: 1.7; margin-bottom: 2.25rem; max-width: 400px; }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
    .btn-ghost-white {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 1.75rem; border: 1.5px solid rgba(255,255,255,0.3);
      border-radius: var(--radius-full); font-family: var(--font-body); font-weight: 600; font-size: 1rem;
      color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.06); text-decoration: none;
      transition: background var(--transition-base), border-color var(--transition-base);
    }
    .btn-ghost-white:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.55); color: white; }
    .hero-stats { display: flex; align-items: center; gap: 1.5rem; }
    .stat { display: flex; flex-direction: column; }
    .stat-val { font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; color: var(--color-amber-gold); line-height: 1; }
    .stat-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(228,217,195,0.5); margin-top: 0.15rem; }
    .stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }
    /* Right cream panel */
    .hero-right {
      background: linear-gradient(145deg, #f5eed8 0%, #ede5c8 50%, #e8dfc0 100%);
      position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .geo-circle { position: absolute; border-radius: 50%; pointer-events: none; }
    .gc-1 { width: 420px; height: 420px; border: 2px solid rgba(217,112,31,0.15); top: 50%; left: 50%; transform: translate(-50%,-50%); }
    .gc-2 { width: 290px; height: 290px; border: 1.5px solid rgba(217,112,31,0.12); top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(217,112,31,0.04); }
    .food-float { position: absolute; font-size: 2.2rem; pointer-events: none; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.12)); animation: float-bob 4s ease-in-out infinite; }
    .f1 { top: 12%; left: 12%; animation-delay: 0s; animation-duration: 4.2s; }
    .f2 { top: 16%; right: 10%; animation-delay: 0.8s; animation-duration: 5s; }
    .f3 { bottom: 22%; left: 10%; animation-delay: 1.6s; animation-duration: 4.6s; }
    .f4 { bottom: 14%; right: 12%; animation-delay: 0.4s; animation-duration: 3.8s; }
    .f5 { top: 48%; right: 5%; animation-delay: 1.2s; animation-duration: 4.4s; }
    @keyframes float-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    .logo-showcase { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .logo-frame {
      width: 220px; height: 220px; border-radius: 50%; background: white;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 0 8px rgba(217,112,31,0.15), 0 0 0 16px rgba(217,112,31,0.06), 0 20px 60px rgba(15,65,61,0.2);
      border: 3px solid var(--color-terracotta);
    }
    .showcase-logo { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
    .logo-tagline { font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; color: var(--color-teal-deep); }
    .logo-hindi { font-size: 0.85rem; color: var(--color-terracotta); font-weight: 700; }
    .hero-clip {
      position: absolute; top: 0; bottom: 0; left: 53%; width: 100px;
      background: linear-gradient(170deg, #0F5C62 48%, transparent 48%);
      pointer-events: none; z-index: 2;
    }

    /* ===== DISH STORIES ===== */
    .dish-stories { background: var(--color-cream); }

    .stories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .story-card {
      background: var(--color-white);
      border-radius: var(--radius-xl);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition-base), box-shadow var(--transition-base);
    }
    .story-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-card-hover);
    }

    /* Image */
    .story-img-wrap {
      position: relative;
      height: 210px;
      overflow: hidden;
    }
    .story-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      display: block;
    }
    .story-card:hover .story-img {
      transform: scale(1.06);
    }
    .story-img-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(to top, rgba(15,65,61,0.85), transparent);
      display: flex;
      align-items: flex-end;
      padding: 0.5rem 0.75rem;
    }
    .origin-flag { font-size: 1.75rem; line-height: 1; }

    /* Body */
    .story-card-body {
      padding: 1.25rem 1.5rem;
      flex: 1;
    }
    .story-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.6rem;
    }
    .story-cuisine-tag {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-teal-deep);
      background: rgba(15,92,98,0.08);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
    }
    .story-origin-label {
      font-size: 0.7rem;
      opacity: 0.5;
      font-style: italic;
    }
    .story-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--color-teal-deep);
      margin-bottom: 0.6rem;
    }
    .story-lore {
      font-size: 0.845rem;
      line-height: 1.65;
      color: var(--color-teal-dark);
      opacity: 0.82;
      margin-bottom: 1rem;
    }
    .story-fun-fact {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      background: rgba(232, 174, 75, 0.10);
      border-left: 3px solid var(--color-amber-gold);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 0.6rem 0.75rem;
      font-size: 0.78rem;
      font-style: italic;
      color: var(--color-teal-dark);
      line-height: 1.5;
    }
    .fun-fact-icon { flex-shrink: 0; font-style: normal; }

    /* Footer */
    .story-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--color-cream);
    }
    .story-order-btn {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--color-terracotta);
      border: 1.5px solid var(--color-terracotta);
      border-radius: var(--radius-full);
      padding: 0.35rem 0.9rem;
      text-decoration: none;
      transition: background var(--transition-fast), color var(--transition-fast);
    }
    .story-order-btn:hover {
      background: var(--color-terracotta);
      color: white;
    }
    .story-price {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.3rem;
      color: var(--color-terracotta);
    }

    /* ===== HOW IT WORKS ===== */
    .how-it-works {
      position: relative;
      background: linear-gradient(135deg, #0F5C62 0%, #1E413D 50%, #0d3f3f 100%);
      padding: 0;
    }
    .hiw-wave { display: block; line-height: 0; }
    .hiw-wave svg { display: block; width: 100%; }
    .hiw-wave-top svg { height: 60px; }
    .hiw-wave-bottom svg { height: 60px; }

    .hiw-inner { padding: 3.5rem 1.5rem; }

    .hiw-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .hiw-eyebrow {
      display: inline-block;
      text-transform: uppercase;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--color-amber-gold);
      background: rgba(232,174,75,0.15);
      border: 1px solid rgba(232,174,75,0.3);
      border-radius: var(--radius-full);
      padding: 0.3rem 1rem;
      margin-bottom: 1rem;
    }
    .hiw-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.8rem, 4vw, 2.75rem);
      color: white;
      margin-bottom: 0.75rem;
    }
    .hiw-sub {
      font-size: 1rem;
      color: rgba(228,217,195,0.7);
      max-width: 480px;
      margin: 0 auto;
    }

    /* Timeline row */
    .hiw-timeline {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      position: relative;
      align-items: start;
    }
    /* Horizontal line */
    .hiw-line {
      position: absolute;
      top: 56px;
      left: 12.5%;
      right: 12.5%;
      height: 2px;
      background: rgba(255,255,255,0.08);
      z-index: 0;
      border-radius: 1px;
    }
    .hiw-line-fill {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, var(--color-terracotta), var(--color-amber-gold), var(--color-terracotta));
      border-radius: 1px;
      animation: line-shimmer 3s ease-in-out infinite;
    }
    @keyframes line-shimmer {
      0%   { opacity: 0.4; }
      50%  { opacity: 1; }
      100% { opacity: 0.4; }
    }

    /* Each step */
    .hiw-step {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 1rem 2rem;
      z-index: 1;
    }

    /* Watermark big number */
    .hiw-watermark {
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: var(--font-display);
      font-size: 7rem;
      font-weight: 900;
      color: rgba(255,255,255,0.03);
      line-height: 1;
      pointer-events: none;
      user-select: none;
      letter-spacing: -0.05em;
    }

    /* Icon bubble */
    .hiw-icon-wrap {
      position: relative;
      margin-bottom: 1.75rem;
    }
    .hiw-icon-ring {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      border: 1.5px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
      cursor: default;
    }
    .hiw-step:hover .hiw-icon-ring {
      transform: translateY(-6px) scale(1.05);
    }
    .hiw-icon-svg svg {
      display: block;
    }

    /* Per-step accent colours */
    .step-color-1 .hiw-icon-ring {
      background: rgba(217,112,31,0.15);
      border-color: rgba(217,112,31,0.4);
      box-shadow: 0 0 32px rgba(217,112,31,0.2);
    }
    .step-color-1:hover .hiw-icon-ring { box-shadow: 0 8px 40px rgba(217,112,31,0.45); }
    .step-color-2 .hiw-icon-ring {
      background: rgba(232,174,75,0.15);
      border-color: rgba(232,174,75,0.4);
      box-shadow: 0 0 32px rgba(232,174,75,0.2);
    }
    .step-color-2:hover .hiw-icon-ring { box-shadow: 0 8px 40px rgba(232,174,75,0.45); }
    .step-color-3 .hiw-icon-ring {
      background: rgba(15,92,98,0.3);
      border-color: rgba(15,92,98,0.6);
      box-shadow: 0 0 32px rgba(15,92,98,0.3);
    }
    .step-color-3:hover .hiw-icon-ring { box-shadow: 0 8px 40px rgba(15,92,98,0.5); }
    .step-color-4 .hiw-icon-ring {
      background: rgba(223,149,62,0.15);
      border-color: rgba(223,149,62,0.4);
      box-shadow: 0 0 32px rgba(223,149,62,0.2);
    }
    .step-color-4:hover .hiw-icon-ring { box-shadow: 0 8px 40px rgba(223,149,62,0.45); }

    /* Number badge */
    .hiw-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--color-terracotta);
      color: white;
      font-size: 0.72rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #1E413D;
      box-shadow: 0 2px 8px rgba(217,112,31,0.5);
    }

    /* Arrow connector */
    .hiw-arrow {
      position: absolute;
      top: 32px;
      right: -16px;
      z-index: 2;
      opacity: 0.7;
    }

    /* Step text */
    .hiw-text {
      padding: 0 0.5rem;
    }
    .hiw-step-label {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--color-amber-gold);
      opacity: 0.75;
      margin-bottom: 0.4rem;
    }
    .hiw-step-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.1rem;
      color: white;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }
    .hiw-step-desc {
      font-size: 0.825rem;
      color: rgba(228,217,195,0.65);
      line-height: 1.6;
    }

    /* Bottom CTA */
    .hiw-cta {
      text-align: center;
      margin-top: 3.5rem;
      padding-top: 2.5rem;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .hiw-cta-note {
      font-size: 0.82rem;
      color: rgba(228,217,195,0.45);
      margin-top: 0.75rem;
    }

    /* ===== BRAND STORY ===== */
    .brand-story { background: var(--color-cream); }
    .story-inner {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 3rem;
      align-items: center;
    }
    .brand-logo-img {
      width: 180px; height: 180px;
      border-radius: 50%;
      object-fit: cover;
      border: 5px solid var(--color-terracotta);
      box-shadow: 0 0 0 8px rgba(217, 112, 31, 0.15);
      animation: pulse-ring 3s infinite;
    }
    .brand-text h2 { margin-bottom: 1rem; }
    .brand-text p { margin-bottom: 0.75rem; font-size: 1rem; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1100px) {
      .hero-left { padding: 6rem 2.5rem 4rem 3.5rem; }
      .logo-frame { width: 190px; height: 190px; }
      .gc-1 { width: 340px; height: 340px; }
      .gc-2 { width: 240px; height: 240px; }
      .stories-grid { grid-template-columns: repeat(2, 1fr); }
      .hiw-timeline { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
      .hiw-line { display: none; }
      .hiw-arrow { display: none; }
    }
    @media (max-width: 860px) {
      .hero { grid-template-columns: 1fr; grid-template-rows: auto; }
      .hero-clip { display: none; }
      .hero-left { padding: 7rem 2.5rem 3rem; align-items: flex-start; }
      .hero-left-content { max-width: 100%; }
      .hero-right { min-height: 380px; }
      .logo-frame { width: 160px; height: 160px; }
      .gc-1 { width: 280px; height: 280px; }
      .gc-2 { width: 200px; height: 200px; }
      .f1, .f2, .f3, .f4, .f5 { font-size: 1.6rem; }
    }
    @media (max-width: 640px) {
      .stories-grid { grid-template-columns: 1fr; }
      .story-inner { grid-template-columns: 1fr; text-align: center; }
      .brand-logo-img { display: block; margin: 0 auto; }
      .hiw-timeline { grid-template-columns: 1fr; }
      .hero-stats { gap: 1rem; }
    }
    @media (max-width: 480px) {
      .hero-left { padding: 6rem 1.5rem 2.5rem; }
      .hero-title { font-size: 3rem; }
      .hero-actions { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class LandingComponent {
  // Dot grid data for the hero left panel decoration
  dots = Array.from({ length: 120 }, () => ({
    o: Math.random() * 0.25 + 0.04,
    s: Math.random() * 3 + 2,
  }));
  dishStories = [
    {
      id: 1,
      name: 'Hummus Pitta',
      cuisine: 'Middle Eastern',
      price: 90,
      image: 'dishes/hummus-pitta.png',
      flag: '🇱🇧',
      origin: 'Levant, ~3000 BC',
      lore: 'Hummus — from the Arabic for "chickpeas" — traces its roots to ancient Egypt and the Levant. By the 13th century, it appeared in Cairo cookbooks. This creamy, tahini-laced dip became the soul food of an entire region, carried by spice traders across continents and into every modern kitchen.',
      funFact: 'The world\'s largest bowl of hummus (10,452 kg) was made in Lebanon in 2010 — a delicious act of national pride.',
    },
    {
      id: 2,
      name: 'Aloo Tikki Chaat',
      cuisine: 'Indian Street Food',
      price: 70,
      image: 'dishes/aloo-tikki-chaat.png',
      flag: '🇮🇳',
      origin: 'North India, 16–17th century',
      lore: 'Born on the bustling streets of Lucknow and Delhi, Aloo Tikki is the everyman\'s snack. "Chaat" derives from the Hindi word meaning "to lick" — tangy tamarind, cool yoghurt and fiery green chutney piled high on crispy potato patties.',
      funFact: 'Chaat has a therapeutic origin — it was devised by a Mughal emperor\'s physician to stimulate appetite during monsoon season.',
    },
    {
      id: 3,
      name: 'Taco',
      cuisine: 'Mexican',
      price: 85,
      image: 'dishes/taco.png',
      flag: '🇲🇽',
      origin: 'Central Mexico, pre-Columbian era',
      lore: 'Long before Spanish conquistadors arrived, the Aztecs were wrapping fillings in corn tortillas. By the 19th century, Mexican silver miners ate tacos stuffed with ingredients that varied by region, reflecting Mexico\'s incredible culinary diversity.',
      funFact: 'Americans eat over 4.5 billion tacos every year — October 4th is National Taco Day in the US.',
    },
    {
      id: 4,
      name: 'Iced Tea',
      cuisine: 'Beverage',
      price: 60,
      image: 'dishes/iced-tea.png',
      flag: '🌍',
      origin: 'World\'s Fair, St. Louis 1904',
      lore: 'Tea has been brewed for over 5,000 years, but iced tea is surprisingly recent. During the sweltering 1904 World\'s Fair, a tea merchant poured his hot tea over ice to attract customers. He sold out within hours. Our version bridges that American moment with Indian chai culture.',
      funFact: 'In the US South, "sweet tea" is so culturally significant it\'s been called "the house wine of the South."',
    },
    {
      id: 5,
      name: 'Jamun Shots',
      cuisine: 'Dessert',
      price: 50,
      image: 'dishes/jamun-shots.png',
      flag: '🇮🇳',
      origin: 'South Asia, ancient Ayurveda',
      lore: 'The jamun — Java plum — is one of India\'s oldest fruits, revered in Ayurvedic texts for blood-sugar balancing. Deep purple and intensely sweet-tart, jamun appears in the Ramayana. Our Jamun Shots bottle this ancient berry into a refreshing, guilt-free dessert.',
      funFact: 'Jamun turns your tongue deep purple — children across South Asia have used it as a dare for centuries.',
    },
  ];

  steps = [
    {
      no: 1,
      title: 'Order Online',
      desc: 'Browse the menu from your phone and add items to your cart — takes under a minute.',
      svg: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="4" width="24" height="36" rx="4" stroke="#D9701F" stroke-width="2"/>
        <rect x="14" y="8" width="16" height="10" rx="2" fill="rgba(217,112,31,0.2)" stroke="#D9701F" stroke-width="1.5"/>
        <circle cx="22" cy="32" r="3" fill="#D9701F"/>
        <line x1="14" y1="22" x2="30" y2="22" stroke="#E8AE4B" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="14" y1="26" x2="26" y2="26" stroke="#E8AE4B" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,
    },
    {
      no: 2,
      title: 'Pay at Counter',
      desc: 'Walk up and pay by Cash or UPI — no online payment gateway, no card details needed.',
      svg: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="12" width="32" height="22" rx="4" stroke="#E8AE4B" stroke-width="2"/>
        <rect x="6" y="17" width="32" height="5" fill="rgba(232,174,75,0.25)" stroke="none"/>
        <circle cx="14" cy="28" r="3" fill="rgba(232,174,75,0.4)" stroke="#E8AE4B" stroke-width="1.5"/>
        <rect x="22" y="26" width="10" height="4" rx="2" fill="rgba(232,174,75,0.4)" stroke="#E8AE4B" stroke-width="1.5"/>
        <text x="22" y="10" text-anchor="middle" font-size="8" font-weight="700" fill="#E8AE4B" font-family="sans-serif">₹</text>
      </svg>`,
    },
    {
      no: 3,
      title: 'Get Token & Track',
      desc: 'Receive a unique token number and watch your order status update live on your phone.',
      svg: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="28" height="20" rx="3" stroke="#0F5C62" stroke-width="2" fill="rgba(15,92,98,0.15)"/>
        <text x="22" y="22" text-anchor="middle" font-size="10" font-weight="900" fill="#0F5C62" font-family="sans-serif">#07</text>
        <path d="M14 32 Q22 38 30 32" stroke="#E8AE4B" stroke-width="2" stroke-linecap="round" fill="none"/>
        <circle cx="22" cy="38" r="3" fill="#E8AE4B"/>
      </svg>`,
    },
    {
      no: 4,
      title: 'Collect When Ready',
      desc: 'When the display shows Ready, collect your order at the counter — zero waiting in line.',
      svg: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 30 Q10 36 22 38 Q34 36 34 30" stroke="#DF953E" stroke-width="2" fill="rgba(223,149,62,0.15)" stroke-linejoin="round"/>
        <path d="M10 30 L10 20 Q10 16 22 14 Q34 16 34 20 L34 30" stroke="#DF953E" stroke-width="2" fill="rgba(223,149,62,0.15)"/>
        <polyline points="16,24 20,28 28,20" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
  ];
}
