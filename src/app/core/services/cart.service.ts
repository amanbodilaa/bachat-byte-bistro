import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart.model';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  cartCount$: Observable<number> = this.cart$.pipe(
    map(items => items.reduce((sum, i) => sum + i.quantity, 0))
  );

  cartTotal$: Observable<number> = this.cart$.pipe(
    map(items => items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0))
  );

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  addItem(menuItem: MenuItem): void {
    const current = this.cartSubject.value;
    const existing = current.find(i => i.menuItem.id === menuItem.id);
    if (existing) {
      this.cartSubject.next(
        current.map(i =>
          i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      this.cartSubject.next([...current, { menuItem, quantity: 1 }]);
    }
  }

  removeItem(menuItemId: string): void {
    const current = this.cartSubject.value;
    const existing = current.find(i => i.menuItem.id === menuItemId);
    if (!existing) return;
    if (existing.quantity <= 1) {
      this.cartSubject.next(current.filter(i => i.menuItem.id !== menuItemId));
    } else {
      this.cartSubject.next(
        current.map(i =>
          i.menuItem.id === menuItemId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  }

  deleteItem(menuItemId: string): void {
    this.cartSubject.next(
      this.cartSubject.value.filter(i => i.menuItem.id !== menuItemId)
    );
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.cartSubject.value.reduce(
      (sum, i) => sum + i.menuItem.price * i.quantity,
      0
    );
  }
}
