import React, { useState } from 'react';
import { Eye, Search, Filter, Download } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', amount: 299.99, status: 'delivered', date: '2024-01-15', items: 1 },
    { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', amount: 149.99, status: 'processing', date: '2024-01-15', items: 2 }
  ]);
  // ... rest of component logic
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
        </div>
        <button className="btn-secondary flex items-center gap-2"><Download size={20} />Export</button>
      </div>
      {/* Table goes here */}
    </div>
  );
};

export default Orders;