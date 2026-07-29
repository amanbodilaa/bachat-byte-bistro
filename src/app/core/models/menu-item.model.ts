export interface MenuItem {
  id: string;
  name: string;
  cuisine: string;
  price: number;
  emoji: string;
  description: string;
  available: boolean;
  image?: string;
  flag?: string;
  tag?: string;
  category?: string;
  prepTime?: string;
  funFact?: string;
}
