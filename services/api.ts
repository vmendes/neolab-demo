import { MOCK_PRODUCTS, MOCK_USER, ADMIN_USER } from '../constants';
import { Product, User, Order } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-8832',
    userId: 'u1',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 },
      { ...MOCK_PRODUCTS[1], quantity: 2 }
    ],
    total: 68.00,
    status: 'Delivered',
    date: '2023-11-15T10:30:00Z'
  },
  {
    id: 'ord-9941',
    userId: 'u1',
    items: [
      { ...MOCK_PRODUCTS[4], quantity: 1 }
    ],
    total: 18.00,
    status: 'Shipped',
    date: '2023-12-05T14:20:00Z'
  }
];

class MockApiService {
  private products: Product[] = [...MOCK_PRODUCTS];
  private orders: Order[] = [...MOCK_ORDERS];
  // Maintain stateful user data
  private users: User[] = [{ ...MOCK_USER }, { ...ADMIN_USER }];
  
  async getProducts(): Promise<Product[]> {
    await delay(500);
    return this.products;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    await delay(300);
    return this.products.find(p => p.id === id);
  }

  async login(email: string): Promise<User> {
    await delay(800);
    if (email.includes('admin')) {
      return this.users.find(u => u.role === 'admin') || ADMIN_USER;
    }
    // Return the mutable instance so points persist
    return this.users.find(u => u.role === 'user') || MOCK_USER;
  }

  async createOrder(order: Order): Promise<boolean> {
    await delay(1000);
    this.orders.push(order);
    
    // Add points to user
    const user = this.users.find(u => u.id === order.userId);
    if (user) {
      // 10 points per dollar
      const pointsEarned = Math.floor(order.total * 10);
      user.points += pointsEarned;
    }
    
    return true;
  }

  async getOrders(): Promise<Order[]> {
    await delay(500);
    return this.orders;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    await delay(500);
    return this.orders.filter(o => o.userId === userId);
  }

  // Admin functions
  async updateProduct(product: Product): Promise<void> {
    await delay(500);
    this.products = this.products.map(p => p.id === product.id ? product : p);
  }

  async deleteProduct(id: string): Promise<void> {
    await delay(500);
    this.products = this.products.filter(p => p.id !== id);
  }
}

export const api = new MockApiService();