import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-dark-surface rounded-full flex items-center justify-center mb-6 text-slate-500">
          <Trash2 size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-slate-400 mb-8">Looks like you haven't added any magic yet.</p>
        <Link to="/shop" className="px-8 py-3 bg-neon-cyan text-black font-bold rounded-full hover:bg-cyan-400 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-dark-surface p-4 rounded-xl border border-dark-border flex gap-4 sm:gap-6 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-28 object-cover rounded-md bg-slate-800" />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  <p className="font-mono text-neon-cyan font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <p className="text-sm text-slate-400 mb-4">{item.category} • {item.color}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 bg-dark-bg p-1 rounded-lg border border-slate-700">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-white text-slate-400 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-white text-slate-400 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-dark-surface p-6 rounded-xl border border-dark-border sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-mono">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-neon-cyan font-mono">Free</span>
              </div>
              <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-white font-mono">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-neon-purple hover:bg-fuchsia-400 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)]"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
            
            <p className="text-xs text-center text-slate-500 mt-4">
              Secure checkout provided by NeoPay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};