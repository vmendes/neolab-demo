import React, { useEffect, useState } from 'react';
import { Package, Heart, LogOut, Award, Crown, Zap } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { api } from '../services/api';
import { Order, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { LOYALTY_TIERS, LoyaltyTier } from '../constants';

export const Profile: React.FC = () => {
  const { user, wishlist, logout } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'points'>('points');

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      setLoading(true);

      // Fetch user orders
      const userOrders = await api.getUserOrders(user.id);
      setOrders(userOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

      // Fetch wishlist products
      const allProducts = await api.getProducts();
      const wished = allProducts.filter(p => wishlist.includes(p.id));
      setWishlistProducts(wished);

      setLoading(false);
    };
    loadData();
  }, [user, wishlist]);

  if (!user) return null;

  // Calculate Loyalty Status
  const currentTierIndex = LOYALTY_TIERS.slice().reverse().findIndex(tier => user.points >= tier.minPoints);
  const realIndex = currentTierIndex === -1 ? 0 : LOYALTY_TIERS.length - 1 - currentTierIndex;
  const currentTier = LOYALTY_TIERS[realIndex];
  const nextTier = LOYALTY_TIERS[realIndex + 1];

  const progress = nextTier 
    ? ((user.points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 
    : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* User Header */}
      <div className="bg-dark-surface rounded-2xl p-8 border border-dark-border mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-neon-cyan/5 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border-4 border-dark-bg z-10 text-white shadow-xl relative">
            <span className="text-3xl font-bold">{user.name.charAt(0)}</span>
            <div className="absolute -bottom-2 -right-2 bg-dark-bg p-1 rounded-full">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentTier.color} bg-slate-800 border border-slate-600`}>
                 <Crown size={14} fill="currentColor" />
               </div>
            </div>
        </div>
        
        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-slate-400 mb-4">{user.email}</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
             <span className={`px-3 py-1 bg-slate-800 text-xs font-bold rounded-full uppercase tracking-wider border border-slate-700 ${currentTier.color}`}>
               {currentTier.name} Status
             </span>
             <span className="px-3 py-1 bg-neon-cyan/10 text-neon-cyan text-xs font-bold rounded-full border border-neon-cyan/20">
               {user.points.toLocaleString()} NeoPoints
             </span>
          </div>
        </div>

        <div className="z-10">
            <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-red-500/20"
            >
                <LogOut size={16} /> Sign Out
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-dark-surface p-1 rounded-xl mb-8 w-fit border border-dark-border">
          <button
            onClick={() => setActiveTab('points')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'points' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Crown size={18} /> NeoRewards
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Package size={18} /> Order History
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'wishlist' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Heart size={18} /> Wishlist
          </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-cyan mx-auto mb-4"></div>
             <p className="text-slate-500">Loading your profile...</p>
        </div>
      ) : activeTab === 'points' ? (
        <div className="space-y-8">
            {/* Points Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-neon-purple rounded-full filter blur-3xl opacity-20"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Loyalty Progress</h3>
                                <p className="text-slate-400 text-sm">Earn 10 points for every $1 spent</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-3xl font-bold ${currentTier.color}`}>{user.points.toLocaleString()}</span>
                                <span className="text-xs text-slate-500 block uppercase tracking-wider">Total Points</span>
                            </div>
                        </div>

                        {nextTier ? (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className={currentTier.color}>{currentTier.name}</span>
                                    <span className="text-slate-500">{nextTier.minPoints - user.points} points to {nextTier.name}</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-1000 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                             <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-yellow-400">Max Tier Reached</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-400 w-full"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-dark-surface rounded-xl p-6 border border-dark-border flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 bg-neon-cyan/10 rounded-full flex items-center justify-center mb-4">
                        <Zap className="text-neon-cyan" size={24} />
                    </div>
                    <h4 className="font-bold text-white mb-2">Current Benefits</h4>
                    <ul className="text-sm text-slate-400 space-y-2">
                        {currentTier.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 justify-center">
                                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* All Tiers */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6">Loyalty Tiers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {LOYALTY_TIERS.map((tier) => {
                        const isCurrent = tier.name === currentTier.name;
                        const isUnlocked = user.points >= tier.minPoints;
                        
                        return (
                            <div 
                                key={tier.name} 
                                className={`rounded-xl p-6 border transition-all ${
                                    isCurrent 
                                        ? 'bg-slate-800 border-neon-cyan ring-1 ring-neon-cyan' 
                                        : isUnlocked 
                                            ? 'bg-dark-surface border-slate-600 opacity-80'
                                            : 'bg-dark-surface border-dark-border opacity-50'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className={`font-bold text-lg ${tier.color}`}>{tier.name}</h4>
                                    {isCurrent && <div className="bg-neon-cyan text-black text-[10px] font-bold px-2 py-0.5 rounded">CURRENT</div>}
                                </div>
                                <p className="text-xs text-slate-500 font-mono mb-4">{tier.minPoints}+ POINTS</p>
                                <ul className="space-y-2">
                                    {tier.benefits.map((b, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                            <span className={`mt-1.5 w-1 h-1 rounded-full ${isUnlocked ? 'bg-white' : 'bg-slate-600'}`}></span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      ) : activeTab === 'orders' ? (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="text-center py-20 bg-dark-surface rounded-xl border border-dark-border">
                    <Package size={48} className="mx-auto text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                    <p className="text-slate-400">Start your collection today.</p>
                </div>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="bg-dark-surface rounded-xl border border-dark-border p-6 hover:border-slate-600 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-4 border-b border-slate-700">
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Order Placed</p>
                                    <p className="text-sm text-white font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total</p>
                                    <p className="text-sm text-neon-cyan font-mono font-bold">${order.total.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Status</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold
                                        ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 
                                          order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="font-mono text-xs text-slate-500">#{order.id}</div>
                        </div>
                        <div className="space-y-3">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-12 h-16 bg-slate-800 rounded overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-white">{item.name}</h4>
                                        <p className="text-xs text-slate-400">Qty: {item.quantity} • ${item.price}</p>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-xs font-bold text-neon-purple">+{Math.floor(item.price * item.quantity * 10)} pts</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
      ) : (
        <div>
             {wishlistProducts.length === 0 ? (
                <div className="text-center py-20 bg-dark-surface rounded-xl border border-dark-border">
                    <Heart size={48} className="mx-auto text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-slate-400">Save items you want to see here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
      )}
    </div>
  );
};