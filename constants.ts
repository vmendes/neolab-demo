import { Product, User } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neo-Tokyo Cyberdeck',
    description: 'A cyberpunk inspired deck featuring neon inks and futuristic pips. Perfect for cardistry.',
    price: 18.00,
    category: 'Cardistry',
    color: 'Neon',
    image: 'https://picsum.photos/400/600?random=1',
    stock: 50,
    rating: 4.8,
    reviews: 124,
    isNew: true
  },
  {
    id: '2',
    name: 'Midnight Alchemist',
    description: 'Deep blacks and metallic gold foil. Designed for the mysterious magician.',
    price: 25.00,
    category: 'Magic',
    color: 'Black',
    image: 'https://picsum.photos/400/600?random=2',
    stock: 20,
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Solar Flare Edition',
    description: 'Bursting with orange and red gradients. Handling is buttery smooth.',
    price: 15.00,
    category: 'Cardistry',
    color: 'Red',
    image: 'https://picsum.photos/400/600?random=3',
    stock: 100,
    rating: 4.5,
    reviews: 45
  },
  {
    id: '4',
    name: 'Royal Reserve: White',
    description: 'Minimalist luxury. Heavy stock paper with an air-cushion finish.',
    price: 35.00,
    category: 'Collector',
    color: 'White',
    image: 'https://picsum.photos/400/600?random=4',
    stock: 5,
    rating: 5.0,
    reviews: 12
  },
  {
    id: '5',
    name: 'Abyss Walker',
    description: 'Inspired by the deep sea. Blue bioluminescent patterns.',
    price: 18.00,
    category: 'Cardistry',
    color: 'Blue',
    image: 'https://picsum.photos/400/600?random=5',
    stock: 60,
    rating: 4.7,
    reviews: 67
  },
  {
    id: '6',
    name: 'Prestige Close-Up Pad',
    description: 'Professional grade close-up pad for card magic and coin tricks.',
    price: 45.00,
    category: 'Accessories',
    color: 'Black',
    image: 'https://picsum.photos/400/600?random=6',
    stock: 15,
    rating: 4.6,
    reviews: 30
  },
  {
    id: '7',
    name: 'Golden Era',
    description: 'Vintage style with modern finish. Gold metallic ink.',
    price: 22.00,
    category: 'Collector',
    color: 'Gold',
    image: 'https://picsum.photos/400/600?random=7',
    stock: 12,
    rating: 4.8,
    reviews: 55
  },
  {
    id: '8',
    name: 'Cyber Mat 3000',
    description: 'LED lit close-up pad with rechargeable battery.',
    price: 85.00,
    category: 'Accessories',
    color: 'Neon',
    image: 'https://picsum.photos/400/600?random=8',
    stock: 8,
    rating: 4.2,
    reviews: 10
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex@neolab.com',
  role: 'user',
  wishlist: ['2', '4']
};

export const ADMIN_USER: User = {
  id: 'a1',
  name: 'Neo Admin',
  email: 'admin@neolab.com',
  role: 'admin',
  wishlist: []
};
