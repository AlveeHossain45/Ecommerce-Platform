// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import CheckoutLayout from './layouts/CheckoutLayout.jsx';

// Pages
import HomePage from './pages/home/HomePage.jsx';
import ProductListing from './pages/products/ProductListing.jsx';
import CategoryView from './pages/products/CategoryView.jsx';       // ক্যাটাগরি ডিটেল পেজ
import CategoriesPage from './pages/products/CategoriesPage.jsx';   // সব ক্যাটাগরি দেখানোর পেজ
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Profile from './pages/user/Profile.jsx';
import OrderHistory from './pages/user/OrderHistory.jsx';
import Cart from './pages/checkout/Cart.jsx';
import Shipping from './pages/checkout/Shipping.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import AdminProducts from './pages/admin/Products.jsx';
import AdminOrders from './pages/admin/Orders.jsx';

import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>

              {/* Checkout Routes */}
              <Route path="/checkout" element={<CheckoutLayout />}>
                <Route index element={<Shipping />} />
              </Route>
              
              {/* Main Application Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductListing />} />
                
                {/* --- নতুন যুক্ত করা রুট --- */}
                <Route path="categories" element={<CategoriesPage />} /> {/* /categories URL এর জন্য */}
                <Route path="category/:category" element={<CategoryView />} /> {/* /category/electronics URL এর জন্য */}
                
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="cart" element={<Cart />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;