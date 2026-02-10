import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Box, Heart, LogOut, Shield } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

const Navbar: React.FC = () => {
  const { cart, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
              NEOLAB
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-neon-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/shop" className="hover:text-neon-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-neon-pink hover:text-neon-purple px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  <Shield size={14} /> Admin
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
             <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-neon-cyan rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white">
                  <User size={18} />
                  {user.name}
                </Link>
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-400">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
               <Link to="/login" className="bg-neon-purple/20 hover:bg-neon-purple/40 text-neon-purple border border-neon-purple/50 px-4 py-1.5 rounded-full text-sm font-semibold transition-all">
                Login
               </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface border-b border-dark-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Shop</Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800 flex items-center justify-between">
              Cart <span className="bg-neon-cyan text-black text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
            </Link>
             {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Profile</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-slate-800">Logout</button>
              </>
            ) : (
               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neon-cyan hover:bg-slate-800">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-surface border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple mb-4">
              NEOLAB
            </h3>
            <p className="text-slate-400 text-sm">
              Crafting the future of cardistry and magic. Premium quality decks for the modern era.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/shop?cat=Cardistry" className="hover:text-neon-cyan">Cardistry</Link></li>
              <li><Link to="/shop?cat=Magic" className="hover:text-neon-cyan">Magic</Link></li>
              <li><Link to="/shop?cat=Collector" className="hover:text-neon-cyan">Collector</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-neon-cyan">Shipping</a></li>
              <li><a href="#" className="hover:text-neon-cyan">Returns</a></li>
              <li><a href="#" className="hover:text-neon-cyan">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-neon-purple transition-colors cursor-pointer">
                <Box size={16} />
              </div>
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-neon-cyan transition-colors cursor-pointer">
                <Heart size={16} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          &copy; 2024 NeoLab TCG. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 font-sans selection:bg-neon-cyan selection:text-black">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};