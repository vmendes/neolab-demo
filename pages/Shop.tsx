import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { Product, FilterState } from '../types';

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    color: null,
    minPrice: 0,
    maxPrice: 100,
    sortBy: 'newest'
  });

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.color && p.color !== filters.color) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
    });
  }, [products, filters, searchQuery]);

  const categories = ['Cardistry', 'Magic', 'Collector', 'Accessories'];
  const colors = ['Red', 'Blue', 'Black', 'White', 'Gold', 'Neon'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search decks..." 
              className="w-full md:w-64 bg-dark-surface border border-slate-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-neon-cyan text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-2 bg-dark-surface border border-slate-600 rounded-lg text-slate-300"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-dark-surface p-6 rounded-xl border border-dark-border sticky top-24">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-400 mb-2 block">Category</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category"
                      className="accent-neon-cyan"
                      checked={filters.category === null}
                      onChange={() => setFilters({...filters, category: null})}
                    />
                    <span className="text-sm">All</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category"
                        className="accent-neon-cyan"
                        checked={filters.category === cat}
                        onChange={() => setFilters({...filters, category: cat})}
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-400 mb-2 block">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                     <button
                        key={color}
                        onClick={() => setFilters({...filters, color: filters.color === color ? null : color})}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          filters.color === color 
                            ? 'bg-neon-cyan text-black border-neon-cyan' 
                            : 'bg-transparent border-slate-600 hover:border-slate-400'
                        }`}
                     >
                       {color}
                     </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-400 mb-2 block">Sort By</label>
                <select 
                  className="w-full bg-dark-bg border border-slate-600 rounded p-2 text-sm focus:outline-none focus:border-neon-cyan"
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              
               <button 
                  onClick={() => setFilters({category: null, color: null, minPrice: 0, maxPrice: 100, sortBy: 'newest'})}
                  className="w-full text-xs text-slate-400 hover:text-white underline mt-4"
                >
                  Reset Filters
                </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-dark-surface rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
             <div className="text-center py-20 bg-dark-surface rounded-xl border border-dark-border">
                <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
                <button 
                  onClick={() => setFilters({category: null, color: null, minPrice: 0, maxPrice: 100, sortBy: 'newest'})}
                  className="mt-4 text-neon-cyan hover:underline"
                >
                  Clear all filters
                </button>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};