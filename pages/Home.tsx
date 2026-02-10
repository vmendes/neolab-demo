import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCcw, Crown, Zap, Calendar, MapPin, Trophy, Medal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { Product, Event } from '../types';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [leaderboard, setLeaderboard] = useState<{name: string, points: number, tier: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const all = await api.getProducts();
      setFeaturedProducts(all.slice(0, 4));
      
      const eventsData = await api.getEvents();
      setEvents(eventsData);

      const leaderboardData = await api.getLeaderboard();
      setLeaderboard(leaderboardData);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?q=80&w=2670&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
            <span className="text-white">FUTURE OF</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-pink animate-gradient-x">CARDISTRY</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Premium decks engineered for performance, designed for the bold. Elevate your craft with NeoLab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="px-8 py-4 bg-neon-cyan hover:bg-cyan-400 text-black font-bold rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Shop Collection <ArrowRight size={20} />
            </Link>
            <Link to="/shop?sort=newest" className="px-8 py-4 bg-transparent border-2 border-slate-600 hover:border-white text-white font-bold rounded-full transition-all flex items-center justify-center">
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Fast Shipping", desc: "Global delivery within 3-5 days" },
            { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted payments & data protection" },
            { icon: RefreshCcw, title: "Easy Returns", desc: "30-day money back guarantee" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-dark-surface p-8 rounded-2xl border border-dark-border flex flex-col items-center text-center hover:border-neon-purple/50 transition-colors">
              <feature.icon className="w-12 h-12 text-neon-purple mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

       {/* Upcoming Events Section */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-neon-cyan text-sm font-bold tracking-wider uppercase mb-1 block">Community</span>
            <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          </div>
          <button className="text-sm text-slate-400 hover:text-white transition-colors">View Calendar</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="group relative bg-dark-surface rounded-xl overflow-hidden border border-dark-border hover:border-neon-cyan/50 transition-all">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent z-10"></div>
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-slate-700 rounded px-3 py-1 text-xs font-bold text-white">
                  {event.type}
                </div>
              </div>
              <div className="p-6 relative z-20 -mt-8">
                <div className="bg-slate-800 rounded px-4 py-1 text-center w-fit mb-4 border border-slate-600 shadow-lg">
                  <span className="text-neon-cyan font-bold font-mono text-sm">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{event.title}</h3>
                <div className="flex items-center text-slate-400 text-sm mb-4">
                  <MapPin size={14} className="mr-1" />
                  {event.location}
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  {event.description}
                </p>
                <button className="w-full py-2 border border-slate-600 rounded text-sm font-bold hover:bg-white hover:text-black transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NeoRewards Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden border border-slate-700">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan rounded-full filter blur-[120px] opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple rounded-full filter blur-[120px] opacity-10"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-400/20">
                  <Crown size={14} /> New Loyalty Program
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Earn Rewards with Every Deck</h2>
                <p className="text-slate-300 text-lg mb-6 max-w-xl">
                  Join the <span className="text-neon-cyan font-bold">NeoRewards</span> program. Collect points on every purchase to unlock exclusive discounts, early access to drops, and free shipping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <Zap size={16} className="text-neon-cyan" />
                    </div>
                    <span>10 Points / $1 Spent</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <Star size={16} className="text-neon-purple" />
                    </div>
                    <span>Tiered Benefits</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 relative">
                <div className="w-48 h-64 bg-slate-800 rounded-xl border border-slate-600 transform rotate-6 shadow-2xl flex items-center justify-center relative z-10">
                   <div className="text-center">
                      <Crown size={48} className="text-yellow-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white tracking-widest">VIP</div>
                      <div className="text-xs text-slate-500 uppercase">Member Card</div>
                   </div>
                </div>
                <div className="w-48 h-64 bg-slate-700 rounded-xl border border-slate-600 transform -rotate-6 absolute top-0 left-0 shadow-xl"></div>
              </div>
            </div>
         </div>
      </section>

      {/* Leaderboard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-white mb-2">Top VIPs</h2>
              <p className="text-slate-400 mb-6">Recognizing the most dedicated collectors and magicians in our community.</p>
              <div className="bg-dark-surface p-6 rounded-xl border border-dark-border">
                <Trophy size={48} className="text-yellow-400 mb-4" />
                <h3 className="font-bold text-white text-lg">Hall of Fame</h3>
                <p className="text-sm text-slate-400 mt-2">Earn points to climb the ranks and unlock exclusive Grandmaster perks.</p>
              </div>
           </div>
           
           <div className="lg:col-span-3">
              <div className="bg-dark-surface rounded-xl border border-dark-border overflow-hidden">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors last:border-0 ${
                      index === 0 ? 'bg-yellow-400/5' : 
                      index === 1 ? 'bg-slate-300/5' : 
                      index === 2 ? 'bg-orange-400/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg font-bold text-lg
                        ${index === 0 ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.3)]' :
                          index === 1 ? 'bg-slate-300 text-black' :
                          index === 2 ? 'bg-orange-400 text-black' :
                          'bg-slate-800 text-slate-400'
                        }
                      `}>
                         {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-white">{user.name}</span>
                           {index < 3 && <Medal size={14} className={
                             index === 0 ? 'text-yellow-400' :
                             index === 1 ? 'text-slate-300' : 'text-orange-400'
                           } />}
                        </div>
                        <span className="text-xs text-slate-500 uppercase">{user.tier}</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="font-mono font-bold text-neon-cyan">{user.points.toLocaleString()}</span>
                       <span className="text-xs text-slate-500 hidden sm:inline ml-1">PTS</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Trending Now</h2>
            <p className="text-slate-400 mt-2">Our most popular decks this week</p>
          </div>
          <Link to="/shop" className="text-neon-cyan hover:text-white transition-colors font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 rounded-3xl p-12 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the NeoLab Club</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Sign up for exclusive drops, member-only discounts, and magic tutorials.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-dark-bg border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan"
              />
              <button className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};