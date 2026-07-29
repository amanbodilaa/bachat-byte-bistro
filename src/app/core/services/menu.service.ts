import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly menuItems: MenuItem[] = [
    {
      id: 'hummus-pitta',
      name: 'Hummus Pitta',
      cuisine: 'Middle Eastern',
      price: 90,
      emoji: '🧆',
      description: 'Creamy hummus stuffed in warm pitta, drizzled with olive oil and herbs.',
      available: true,
    },
    {
      id: 'aloo-tikki-chaat',
      name: 'Aloo Tikki Chaat',
      cuisine: 'Indian Street Food',
      price: 70,
      emoji: '🥘',
      description: 'Crispy potato patties topped with chutneys, yoghurt and fresh coriander.',
      available: true,
    },
    {
      id: 'taco',
      name: 'Taco',
      cuisine: 'Mexican',
      price: 85,
      emoji: '🌮',
      description: 'Soft corn tortilla packed with spiced fillings and house salsa.',
      available: true,
    },
    {
      id: 'iced-tea',
      name: 'Iced Tea',
      cuisine: 'Beverage',
      price: 60,
      emoji: '🧊',
      description: 'Chilled black tea brewed with lemon and a hint of mint.',
      available: true,
    },
    {
      id: 'jamun-shots',
      name: 'Jamun Shots',
      cuisine: 'Dessert',
      price: 50,
      emoji: '🍮',
      description: 'Sweet jamun berry shots — a refreshing Indian dessert treat.',
      available: true,
    },
  ];

  /** Drop-in: replace `of(...)` with `this.http.get<MenuItem[]>('/api/menu')` */
  getMenuItems(): Observable<MenuItem[]> {
    return of(this.menuItems);
  }

  getMenuItemById(id: string): Observable<MenuItem | undefined> {
    return of(this.menuItems.find(item => item.id === id));
  }
}
