import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export const Checkout: React.FC = () => {
  const { cartTotal, user, placeOrder, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first (Mock: use 'user@neolab.com')");
      return;
    }
    setLoading(true);
    await placeOrder();
    setStep('confirm');
    setLoading(false);
  };

  if (step === 'confirm') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">Order Confirmed!</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          Thank you for your purchase. Your futuristic gear is being prepared for dispatch. Check your profile for order history.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-dark-surface border border-slate-600 text-white font-bold rounded-full hover:bg-slate-800 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-dark-surface p-6 rounded-xl border border-dark-border">
            <h3 className="text-lg font-bold mb-4">Shipping Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">First Name</label>
                  <input required type="text" className="w-full bg-dark-bg border border-slate-600 rounded p-2 text-sm focus:border-neon-cyan outline-none" defaultValue={user?.name.split(' ')[0]} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Last Name</label>
                  <input required type="text" className="w-full bg-dark-bg border border-slate-600 rounded p-2 text-sm focus:border-neon-cyan outline-none" defaultValue={user?.name.split(' ')[1]} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Address</label>
                <input required type="text" className="w-full bg-dark-bg border border-slate-600 rounded p-2 text-sm focus:border-neon-cyan outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">City</label>
                  <input required type="text" className="w-full bg-dark-bg border border-slate-600 rounded p-2 text-sm focus:border-neon-cyan outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Postal Code</label>
                  <input required type="text" className="w-full bg-dark-bg border border-slate-600 rounded p-2 text-sm focus:border-neon-cyan outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-surface p-6 rounded-xl border border-dark-border">
            <h3 className="text-lg font-bold mb-4">Payment Method</h3>
            <div className="p-4 border border-neon-cyan/30 bg-neon-cyan/5 rounded-lg flex items-center gap-4">
              <CreditCard className="text-neon-cyan" />
              <div>
                <p className="font-semibold text-white">Credit Card (Mock)</p>
                <p className="text-xs text-slate-400">ending in 4242</p>
              </div>
              <CheckCircle size={18} className="ml-auto text-neon-cyan" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neon-cyan hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : `Pay $${cartTotal.toFixed(2)}`}
          </button>
        </form>

        <div className="hidden md:block">
           <div className="bg-dark-surface p-6 rounded-xl border border-dark-border sticky top-24">
             <h3 className="font-bold mb-4">In Your Cart</h3>
             <div className="space-y-2 text-sm">
                {useStore().cart.map(item => (
                   <div key={item.id} className="flex justify-between py-2 border-b border-slate-700 last:border-0">
                      <span>{item.name} <span className="text-slate-500">x{item.quantity}</span></span>
                      <span className="font-mono text-slate-300">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                ))}
                <div className="flex justify-between pt-4 font-bold text-lg text-white">
                   <span>Total</span>
                   <span>${cartTotal.toFixed(2)}</span>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};