import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext.jsx';
import AddressForm from '../../components/checkout/address-form.jsx';
import ShippingOptions from '../../components/checkout/shipping-options.jsx';
import OrderSummary from '../../components/checkout/order-summary.jsx';

const Shipping = () => {
  const { cart, getCartTotal } = useCartContext();
  const navigate = useNavigate();
  
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: 'US',
    zipCode: ''
  });
  const [shippingOption, setShippingOption] = useState('standard');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save shipping data to context or state management
    navigate('/checkout/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AddressForm address={shippingData} onChange={setShippingData} />
            <div className="card p-6">
              <ShippingOptions selectedOption={shippingOption} onOptionSelect={setShippingOption} subtotal={getCartTotal()} />
            </div>
            <button type="submit" className="w-full btn-primary py-3 text-lg">
              Continue to Payment
            </button>
          </form>
        </div>
        <div className="lg:col-span-1">
            <div className="sticky top-24">
                <OrderSummary />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;