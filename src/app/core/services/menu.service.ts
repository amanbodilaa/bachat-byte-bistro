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
      image: 'dishes/hummus-pitta.png',
      flag: '🇱🇧',
      tag: '🌿 Chef Special',
      category: 'Mains',
      prepTime: '3-5 mins',
      funFact: 'Creamy chickpeas & extra virgin olive oil with fluffy warm pita',
      description: 'Velvety, garlic-tahini hummus drizzled with cold-pressed olive oil, za\'atar, and served alongside freshly baked warm pita pockets.',
      available: true,
    },
    {
      id: 'aloo-tikki-chaat',
      name: 'Aloo Tikki Chaat',
      cuisine: 'Indian Street Food',
      price: 70,
      emoji: '🥘',
      image: 'dishes/aloo-tikki-chaat.png',
      flag: '🇮🇳',
      tag: '🔥 Bestseller',
      category: 'Street Food',
      prepTime: '4-6 mins',
      funFact: 'Gold-crisp potato patties with tangy chutneys & spiced yoghurt',
      description: 'Golden shallow-fried potato patties crowned with whipped yoghurt, sweet tamarind glaze, fiery mint chutney, and crunchy sev.',
      available: true,
    },
    {
      id: 'taco',
      name: 'Taco',
      cuisine: 'Mexican',
      price: 85,
      emoji: '🌮',
      image: 'dishes/taco.png',
      flag: '🇲🇽',
      tag: '🌶️ Trending',
      category: 'Mains',
      prepTime: '3-5 mins',
      funFact: 'Authentic corn tortillas packed with vibrant salsa & fresh herbs',
      description: 'Warm artisan tortilla loaded with seasoned fillings, pico de gallo, lime crema, and crisp shredded greens.',
      available: true,
    },
    {
      id: 'iced-tea',
      name: 'Iced Tea',
      cuisine: 'Beverage',
      price: 60,
      emoji: '🧊',
      image: 'dishes/iced-tea.png',
      flag: '🌍',
      tag: '🧊 Chill Favorite',
      category: 'Drinks & Desserts',
      prepTime: '1-2 mins',
      funFact: 'Slow-steeped Assam black tea infused with fresh lemon & mint',
      description: 'Artisanal black tea brewed fresh daily, chilled over ice with fresh citrus slices, fresh mint leaves, and raw cane sugar.',
      available: true,
    },
    {
      id: 'jamun-shots',
      name: 'Jamun Shots',
      cuisine: 'Dessert',
      price: 50,
      emoji: '🍮',
      image: 'dishes/jamun-shots.png',
      flag: '🇮🇳',
      tag: '💜 Must Try',
      category: 'Drinks & Desserts',
      prepTime: '1-2 mins',
      funFact: 'Pureed Indian black plum with pink salt & lemon twist',
      description: 'Vibrant purple shot of real wild jamun fruit puree blended with black salt, cumin, and a squeeze of fresh lime.',
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
