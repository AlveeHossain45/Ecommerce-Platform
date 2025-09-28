import React, 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../../components/checkout/order-summary.jsx';
import PaymentMethods from '../../components/checkout/payment-methods.jsx'; // Assuming this component exists
import { useCartContext } from '../../contexts/CartContext.jsx';

const Payment = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCartContext();
    const [paymentMethod, setPaymentMethod] = React.useState('credit-card');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock order creation
        const order = {
            id: `ORD-${Date.now()}`,
            items: cart,
            total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
            paymentMethod: paymentMethod,
            status: 'confirmed',
            date: new Date().toISOString()
        };
        clearCart();
        navigate('/checkout/confirmation', { state: { order } });
    };

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        <div className="card p-6">
                            <PaymentMethods selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full btn-primary py-3 text-lg">Complete Order</button>
                        </div>
                    </form>
                </div>
                <div className="lg:col-span-1">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default Payment;