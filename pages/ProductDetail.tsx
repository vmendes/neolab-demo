import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star, Truck, RefreshCw, Check } from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const data = await api.getProductById(id);
      setProduct(data || null);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-neon-cyan">Loading data...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-red-500">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-slate-800 rounded-2xl overflow-hidden border border-dark-border">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-slate-800 rounded-lg border border-slate-700 hover:border-neon-cyan cursor-pointer overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
               </div>
             ))}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <div className="mb-6">
            <span className="text-neon-cyan text-sm font-bold tracking-wider uppercase">{product.category}</span>
            <h1 className="text-4xl font-extrabold text-white mt-2 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-400">
                <Star size={18} fill="currentColor" />
                <span className="ml-1 text-white font-bold">{product.rating}</span>
              </div>
              <span className="text-slate-500">({product.reviews} Reviews)</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <p className="text-3xl font-mono text-white mb-6">${product.price.toFixed(2)}</p>
          </div>

          <div className="bg-dark-surface p-6 rounded-xl border border-dark-border mb-8">
            <p className="text-slate-300 leading-relaxed mb-6">{product.description}</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-neon-cyan hover:bg-cyan-400 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Truck size={20} className="text-neon-purple" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <RefreshCw size={20} className="text-neon-purple" />
              <span>30-Day Returns</span>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-slate-700 mb-6">
              {(['desc', 'specs', 'reviews'] as const).map(tab => (
                 <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 pr-6 font-medium text-sm capitalize transition-colors ${activeTab === tab ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-slate-400 hover:text-white'}`}
                 >
                   {tab === 'desc' ? 'Description' : tab}
                 </button>
              ))}
            </div>
            
            <div className="text-slate-300 text-sm">
              {activeTab === 'desc' && (
                <p>Designed for professionals and collectors alike. Printed on premium crushed stock with an air-cushion finish for superior handling. The tuck box features embossed details and metallic foil accents.</p>
              )}
              {activeTab === 'specs' && (
                <ul className="space-y-2">
                   <li className="flex justify-between py-1 border-b border-slate-800"><span>Stock</span> <span className="text-white">Premium Crushed</span></li>
                   <li className="flex justify-between py-1 border-b border-slate-800"><span>Finish</span> <span className="text-white">Air-Cushion</span></li>
                   <li className="flex justify-between py-1 border-b border-slate-800"><span>Cut</span> <span className="text-white">Traditional</span></li>
                   <li className="flex justify-between py-1 border-b border-slate-800"><span>Manufacturer</span> <span className="text-white">USPCC</span></li>
                </ul>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="bg-dark-surface p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                      <span className="font-bold text-white">Best deck ever</span>
                    </div>
                    <p className="text-slate-400">Handles like a dream right out of the box. The design is stunning under UV light.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};