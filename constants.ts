import { Category, WardrobeState } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const DEFAULT_WARDROBE: WardrobeState = {
  [Category.SUIT]: [
    { id: generateId(), name: 'Green velvet suit', category: Category.SUIT, imageUrl: 'https://picsum.photos/seed/suit1/200/200' },
    { id: generateId(), name: 'Beige suede suit, with cowboy tassles', category: Category.SUIT, imageUrl: 'https://picsum.photos/seed/suit2/200/200' },
    { id: generateId(), name: 'Yellow cotton suit', category: Category.SUIT, imageUrl: 'https://picsum.photos/seed/suit3/200/200' },
    { id: generateId(), name: 'Tartan linen suit', category: Category.SUIT, imageUrl: 'https://picsum.photos/seed/suit4/200/200' },
    { id: generateId(), name: 'Purple plaid suit', category: Category.SUIT, imageUrl: 'https://picsum.photos/seed/suit5/200/200' },
  ],
  [Category.SHOES]: [
    { id: generateId(), name: 'Blue trainers', category: Category.SHOES, imageUrl: 'https://picsum.photos/seed/shoes1/200/200' },
    { id: generateId(), name: 'Plastic sandals', category: Category.SHOES, imageUrl: 'https://picsum.photos/seed/shoes2/200/200' },
    { id: generateId(), name: 'Brown leather loafers', category: Category.SHOES, imageUrl: 'https://picsum.photos/seed/shoes3/200/200' },
    { id: generateId(), name: 'Fawn leather brogues', category: Category.SHOES, imageUrl: 'https://picsum.photos/seed/shoes4/200/200' },
    { id: generateId(), name: 'Orange deck shoes', category: Category.SHOES, imageUrl: 'https://picsum.photos/seed/shoes5/200/200' },
  ],
  [Category.SHIRT]: [
    { id: generateId(), name: 'Lavender (cotton)', category: Category.SHIRT, imageUrl: 'https://picsum.photos/seed/shirt1/200/200' },
    { id: generateId(), name: 'Sky blue gingham', category: Category.SHIRT, imageUrl: 'https://picsum.photos/seed/shirt2/200/200' },
    { id: generateId(), name: 'Red Western shirt with white panel', category: Category.SHIRT, imageUrl: 'https://picsum.photos/seed/shirt3/200/200' },
    { id: generateId(), name: 'Green checked shirt', category: Category.SHIRT, imageUrl: 'https://picsum.photos/seed/shirt4/200/200' },
    { id: generateId(), name: 'White grandad collar shirt', category: Category.SHIRT, imageUrl: 'https://picsum.photos/seed/shirt5/200/200' },
  ],
  [Category.TIE]: [
    { id: generateId(), name: 'Piano keys leather tie', category: Category.TIE, imageUrl: 'https://picsum.photos/seed/tie1/200/200' },
    { id: generateId(), name: 'Diagonal striped tie', category: Category.TIE, imageUrl: 'https://picsum.photos/seed/tie2/200/200' },
    { id: generateId(), name: 'Traditional college professor grey woollen', category: Category.TIE, imageUrl: 'https://picsum.photos/seed/tie3/200/200' },
    { id: generateId(), name: 'Pink silk tie', category: Category.TIE, imageUrl: 'https://picsum.photos/seed/tie4/200/200' },
    { id: generateId(), name: 'Swirly-patterned tie', category: Category.TIE, imageUrl: 'https://picsum.photos/seed/tie5/200/200' },
  ],
};