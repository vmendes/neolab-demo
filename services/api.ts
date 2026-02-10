import { MOCK_PRODUCTS, MOCK_USER, ADMIN_USER } from '../constants';
import { Product, User, Order } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockApiService {
  private products: Product[] = [...MOCK_PRODUCTS];
  private orders: Order[] = [];
  
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
    if (email.includes('admin')) return ADMIN_USER;
    return MOCK_USER;
  }

  async createOrder(order: Order): Promise<boolean> {
    await delay(1000);
    this.orders.push(order);
    return true;
  }

  async getOrders(): Promise<Order[]> {
    await delay(500);
    return this.orders;
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