import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StoreProvider, useStore } from './contexts/StoreContext';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';

const Login: React.FC = () => {
  const { login } = useStore();
  const [email, setEmail] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-dark-surface p-8 rounded-xl border border-dark-border w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to NeoLab</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-bg border border-slate-600 rounded-lg px-4 py-2 focus:border-neon-cyan outline-none"
              placeholder="user@neolab.com or admin@neolab.com"
            />
          </div>
          <button type="submit" className="w-full bg-neon-cyan hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition-colors">
            Login
          </button>
          <p className="text-xs text-center text-slate-500 mt-4">
            Use 'admin@neolab.com' for admin dashboard access.
          </p>
        </form>
      </div>
    </div>
  );
};

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
   const { user } = useStore();
   
   return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
       <Route path="/profile" element={
        <ProtectedRoute>
          <div className="text-center py-20 text-xl text-slate-400">User Profile Placeholder</div>
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
         <ProtectedRoute>
           <Admin />
         </ProtectedRoute>
      } />
    </Routes>
   )
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </StoreProvider>
  );
}

export default App;