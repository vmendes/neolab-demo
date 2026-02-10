import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, Edit, Trash, Plus } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { api } from '../services/api';
import { Product, Order } from '../types';

export const Admin: React.FC = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const p = await api.getProducts();
      setProducts(p);
      const o = await api.getOrders();
      setOrders(o);
    };
    fetchData();
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="text-slate-400">You do not have permission to view this area.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex bg-dark-surface rounded-lg p-1 border border-slate-700">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Products
          </button>
          <button 
             onClick={() => setActiveTab('orders')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Orders
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="bg-dark-surface rounded-xl border border-dark-border overflow-hidden">
          <div className="p-4 border-b border-dark-border flex justify-between items-center">
            <h3 className="font-bold">Product Inventory</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-neon-purple text-white text-xs font-bold rounded hover:bg-fuchsia-600 transition-colors">
              <Plus size={14} /> Add New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-800 text-slate-200 uppercase font-bold text-xs">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                    <td className="px-6 py-4">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded"><Edit size={16} /></button>
                        <button className="p-1.5 text-red-400 hover:bg-red-400/10 rounded"><Trash size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-dark-surface rounded-xl border border-dark-border overflow-hidden">
           <div className="p-4 border-b border-dark-border">
            <h3 className="font-bold">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-800 text-slate-200 uppercase font-bold text-xs">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No orders found. Place an order to see it here.</td>
                  </tr>
                ) : (
                  orders.map(o => (
                    <tr key={o.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-white">#{o.id}</td>
                      <td className="px-6 py-4">{new Date(o.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-bold text-neon-cyan">${o.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold">{o.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-neon-cyan hover:underline">View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};