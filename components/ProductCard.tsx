import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-dark-surface border border-dark-border rounded-xl overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-neon-cyan/50">
      {product.isNew && (
        <div className="absolute top-3 left-3 z-10 bg-neon-purple text-white text-xs font-bold px-2 py-1 rounded">
          NEW
        </div>
      )}
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm transition-colors ${isWishlisted ? 'text-neon-pink' : 'text-white hover:text-neon-pink'}`}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden bg-slate-800">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-neon-cyan uppercase tracking-wider font-semibold">{product.category}</p>
            <Link to={`/product/${product.id}`} className="block mt-1">
              <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">{product.name}</h3>
            </Link>
          </div>
          <p className="text-lg font-mono font-semibold text-white">${product.price.toFixed(2)}</p>
        </div>
        
        <div className="mt-4">
          <button 
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-neon-cyan hover:text-black text-white py-2.5 rounded-lg transition-all font-semibold text-sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};