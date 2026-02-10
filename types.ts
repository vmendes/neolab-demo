export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Cardistry' | 'Magic' | 'Collector' | 'Accessories';
  color: 'Red' | 'Blue' | 'Black' | 'White' | 'Gold' | 'Neon';
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  wishlist: string[]; // Product IDs
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
}

export interface FilterState {
  category: string | null;
  color: string | null;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}