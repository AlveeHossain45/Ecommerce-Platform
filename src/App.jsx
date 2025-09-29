import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

// Pages
import Home from './pages/home/HeroSection.jsx';
import ProductListing from './pages/products/ProductListing.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Profile from './pages/user/Profile.jsx'; // <-- ADDED
import OrderHistory from './pages/user/OrderHistory.jsx'; // <-- ADDED
import Cart from './pages/checkout/Cart.jsx'; // <-- ADDED
import About from './pages/About.jsx'; // <-- ADDED
import Contact from './pages/Contact.jsx'; // <-- ADDED
import NotFound from './pages/NotFound.jsx';

// Styles
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Authentication Routes */}
                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                {/* Main Application Routes */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<ProductListing />} />
                  <Route path="profile" element={<Profile />} /> {/* <-- ADDED ROUTE */}
                  <Route path="orders" element={<OrderHistory />} /> {/* <-- ADDED ROUTE */}
                  <Route path="cart" element={<Cart />} /> {/* <-- ADDED ROUTE */}
                  <Route path="about" element={<About />} /> {/* <-- ADDED ROUTE */}
                  <Route path="contact" element={<Contact />} /> {/* <-- ADDED ROUTE */}
                </Route>

                {/* Not Found Route */}
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