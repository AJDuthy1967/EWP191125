export enum Category {
  SUIT = 'Suit',
  SHIRT = 'Shirt',
  TIE = 'Tie',
  SHOES = 'Shoes'
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: Category;
  imageUrl?: string; // Base64 or URL
}

export interface WardrobeState {
  [Category.SUIT]: WardrobeItem[];
  [Category.SHIRT]: WardrobeItem[];
  [Category.TIE]: WardrobeItem[];
  [Category.SHOES]: WardrobeItem[];
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export interface DailyOutfit {
  day: DayOfWeek;
  suit: WardrobeItem;
  shirt: WardrobeItem;
  tie: WardrobeItem;
  shoes: WardrobeItem;
  commentary?: string; // AI generated commentary
}