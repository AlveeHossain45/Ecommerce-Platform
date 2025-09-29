import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

// Import the new HomePage component
import HomePage from './pages/home/HomePage.jsx'; 
import ProductListing from './pages/products/ProductListing.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Profile from './pages/user/Profile.jsx';
import OrderHistory from './pages/user/OrderHistory.jsx';
import Cart from './pages/checkout/Cart.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import CheckoutLayout from './layouts/CheckoutLayout.jsx';
import Shipping from './pages/checkout/Shipping.jsx';

import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} /> {/* USE HomePage HERE */}
                  <Route path="products" element={<ProductListing />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<OrderHistory />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                </Route>

                <Route path="/checkout" element={<CheckoutLayout />}>
                    <Route index element={<Shipping />} />
                    {/* Add payment and confirmation routes later */}
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;