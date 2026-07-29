import { CartItem } from './cart.model';

export type OrderStatus = 'Placed' | 'Paid' | 'Preparing' | 'Ready' | 'Collected';
export type PaymentMode = 'Cash' | 'UPI';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface Order {
  orderId: string;
  tokenNumber: number;
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
  paymentMode: PaymentMode;
  status: OrderStatus;
  placedAt: Date;
  paidAt?: Date;
  readyAt?: Date;
  collectedAt?: Date;
}
