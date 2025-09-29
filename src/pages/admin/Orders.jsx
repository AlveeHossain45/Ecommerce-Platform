import React, { useState } from 'react';
import { Eye, Search, Filter, Download, MoreVertical, ChevronDown, Calendar, User, Mail, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-001', 
      customer: 'John Doe', 
      email: 'john@example.com', 
      amount: 299.99, 
      status: 'delivered', 
      date: '2024-01-15', 
      items: 1,
      shipping: 'Express',
      payment: 'Credit Card'
    },
    { 
      id: 'ORD-002', 
      customer: 'Jane Smith', 
      email: 'jane@example.com', 
      amount: 149.99, 
      status: 'processing', 
      date: '2024-01-15', 
      items: 2,
      shipping: 'Standard',
      payment: 'PayPal'
    },
    { 
      id: 'ORD-003', 
      customer: 'Mike Johnson', 
      email: 'mike@example.com', 
      amount: 599.99, 
      status: 'shipped', 
      date: '2024-01-14', 
      items: 3,
      shipping: 'Express',
      payment: 'Credit Card'
    },
    { 
      id: 'ORD-004', 
      customer: 'Sarah Wilson', 
      email: 'sarah@example.com', 
      amount: 89.99, 
      status: 'pending', 
      date: '2024-01-14', 
      items: 1,
      shipping: 'Standard',
      payment: 'Stripe'
    },
    { 
      id: 'ORD-005', 
      customer: 'Alex Brown', 
      email: 'alex@example.com', 
      amount: 199.99, 
      status: 'cancelled', 
      date: '2024-01-13', 
      items: 2,
      shipping: 'Express',
      payment: 'Credit Card'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': 
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'shipped': 
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'processing': 
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'pending': 
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800';
      case 'cancelled': 
        return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      default: 
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'shipped': return '🚚';
      case 'processing': return '⚡';
      case 'pending': return '⏳';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30 p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Order Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Manage and track all customer orders in one place
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders, customers, emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl py-2.5 pl-4 pr-10 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 cursor-pointer"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl py-2.5 pl-4 pr-10 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            <div className="col-span-3">Order / Customer</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-2 text-center">Amount</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-3 text-center">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {sortedOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-300"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Order & Customer */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Package size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {order.id}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1 mt-1">
                          <User size={12} />
                          <span>{order.customer}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center space-x-1 mt-1">
                          <Mail size={12} />
                          <span>{order.email}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2 text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${order.amount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {order.items} item{order.items > 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 text-center">
                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      <span>{getStatusIcon(order.status)}</span>
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-3">
                    <div className="flex items-center justify-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(order)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center space-x-1"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </motion.button>

                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
                        >
                          <MoreVertical size={16} />
                        </motion.button>

                        <AnimatePresence>
                          {activeDropdown === order.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden"
                            >
                              <div className="py-1">
                                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                                  <button
                                    key={status}
                                    onClick={() => handleUpdateStatus(order.id, status)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 capitalize"
                                  >
                                    Mark as {status}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {sortedOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'No orders have been placed yet'
              }
            </p>
          </motion.div>
        )}

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div>
              Showing <span className="font-semibold">{sortedOrders.length}</span> of{' '}
              <span className="font-semibold">{orders.length}</span> orders
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                Previous
              </button>
              <button className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                Next
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;