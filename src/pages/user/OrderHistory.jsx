import React from 'react';
import { Package, Calendar, DollarSign } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-001', date: '2024-01-15', status: 'delivered', total: 299.99 },
  { id: 'ORD-002', date: '2024-01-10', status: 'shipped', total: 499.98 },
];

const OrderHistory = () => {
  const getStatusColor = (status) => {
    if (status === 'delivered') return 'bg-green-100 text-green-800';
    if (status === 'shipped') return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Order History</h1>
      <div className="space-y-6">
        {mockOrders.map(order => (
          <div key={order.id} className="card overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Placed on {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 mt-2 sm:mt-0 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="p-6 flex justify-between items-center">
                <div>
                    <p className="text-gray-600 dark:text-gray-400">Total Amount</p>
                    <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                </div>
                <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;