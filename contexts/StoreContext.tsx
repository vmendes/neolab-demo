import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Product, Order } from '../types';
import { api } from '../services/api';

interface StoreContextType {
  user: User | null;
  cart: CartItem[];
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  placeOrder: () => Promise<void>;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // Load cart from local storage on mount (optional)
    const savedCart = localStorage.getItem('neo-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('neo-cart', JSON.stringify(cart));
  }, [cart]);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const userData = await api.login(email);
      setUser(userData);
      setWishlist(userData.wishlist);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = async () => {
    if (!user) throw new Error("Must be logged in");
    setIsLoading(true);
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      items: cart,
      total: cartTotal,
      status: 'Pending',
      date: new Date().toISOString()
    };
    
    await api.createOrder(order);
    
    // Calculate and add points locally for immediate UI feedback (10 points per $1)
    const pointsEarned = Math.floor(cartTotal * 10);
    setUser(prev => prev ? { ...prev, points: prev.points + pointsEarned } : null);
    
    clearCart();
    setIsLoading(false);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <StoreContext.Provider value={{
      user, cart, isLoading, login, logout, 
      addToCart, removeFromCart, updateCartQuantity, clearCart, 
      cartTotal, placeOrder, wishlist, toggleWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};