import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart.model';
import { CustomerInfo, Order, OrderStatus, PaymentMode } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  private tokenCounter = 0;

  /** Drop-in: replace body with `this.http.post<Order>('/api/orders', payload)` */
  placeOrder(
    items: CartItem[],
    customer: CustomerInfo,
    paymentMode: PaymentMode
  ): Order {
    this.tokenCounter++;
    const total = items.reduce((s, i) => s + i.menuItem.price * i.quantity, 0);
    const order: Order = {
      orderId: `BBB-${Date.now()}`,
      tokenNumber: this.tokenCounter,
      items: items.map(i => ({ ...i })),
      total,
      customer,
      paymentMode,
      status: 'Placed',
      placedAt: new Date(),
    };
    this.ordersSubject.next([...this.ordersSubject.value, order]);
    return order;
  }

  getOrder(orderId: string): Observable<Order | undefined> {
    return this.orders$.pipe(map(orders => orders.find(o => o.orderId === orderId)));
  }

  getOrderByToken(token: number): Order | undefined {
    return this.ordersSubject.value.find(o => o.tokenNumber === token);
  }

  getOrderByPhone(phone: string): Order | undefined {
    return this.ordersSubject.value.find(
      o => o.customer.phone === phone && o.status !== 'Collected'
    );
  }

  getKitchenOrders(): Observable<Order[]> {
    return this.orders$.pipe(
      map(orders =>
        orders
          .filter(o => o.status === 'Preparing' || o.status === 'Ready')
          .sort((a, b) => a.placedAt.getTime() - b.placedAt.getTime())
      )
    );
  }

  getPendingPaymentOrders(): Observable<Order[]> {
    return this.orders$.pipe(
      map(orders => orders.filter(o => o.status === 'Placed'))
    );
  }

  updateStatus(orderId: string, status: OrderStatus): void {
    const now = new Date();
    this.ordersSubject.next(
      this.ordersSubject.value.map(o => {
        if (o.orderId !== orderId) return o;
        const updated: Order = { ...o, status };
        if (status === 'Paid') updated.paidAt = now;
        if (status === 'Ready') updated.readyAt = now;
        if (status === 'Collected') updated.collectedAt = now;
        return updated;
      })
    );
  }

  markPaid(orderId: string): void {
    this.updateStatus(orderId, 'Paid');
    // immediately move to preparing (kitchen workflow)
    setTimeout(() => this.updateStatus(orderId, 'Preparing'), 500);
  }

  markReady(orderId: string): void {
    this.updateStatus(orderId, 'Ready');
  }

  getAllOrders(): Order[] {
    return this.ordersSubject.value;
  }
}
