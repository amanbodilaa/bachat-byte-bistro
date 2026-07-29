import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CartDrawerComponent } from './shared/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CartDrawerComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-cart-drawer></app-cart-drawer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 72px);
    }
  `]
})
export class AppComponent {}
