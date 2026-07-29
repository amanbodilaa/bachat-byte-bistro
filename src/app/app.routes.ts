import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.component').then(m => m.MenuComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
  },
  {
    path: 'track/:orderId',
    loadComponent: () =>
      import('./pages/tracking/tracking.component').then(m => m.TrackingComponent),
  },
  {
    path: 'kitchen',
    loadComponent: () =>
      import('./pages/kitchen/kitchen.component').then(m => m.KitchenComponent),
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./pages/counter/counter.component').then(m => m.CounterComponent),
  },
  {
    path: 'invoice/:orderId',
    loadComponent: () =>
      import('./pages/invoice/invoice.component').then(m => m.InvoiceComponent),
  },
  {
    path: 'emails',
    loadComponent: () =>
      import('./pages/emails/emails.component').then(m => m.EmailsComponent),
  },
  { path: '**', redirectTo: '' },
];
