import React from 'react';
import { Users, ShoppingCart, DollarSign, Package, TrendingUp, Activity, Eye, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$24,580', 
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      description: 'Monthly earnings'
    },
    { 
      title: 'Total Orders', 
      value: '1,248', 
      change: '+8.2%', 
      icon: ShoppingCart, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      description: 'Successful orders'
    },
    { 
      title: 'Total Products', 
      value: '856', 
      change: '+3.1%', 
      icon: Package, 
      color: 'text-violet-500',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-200 dark:border-violet-800',
      description: 'Active products'
    },
    { 
      title: 'Total Customers', 
      value: '5,423', 
      change: '+15.7%', 
      icon: Users, 
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      description: 'Registered users'
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '$249.99', status: 'completed', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Sarah Smith', amount: '$149.50', status: 'processing', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '$399.00', status: 'completed', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Emily Brown', amount: '$89.99', status: 'pending', date: '2024-01-14' },
    { id: '#ORD-005', customer: 'Alex Wilson', amount: '$199.99', status: 'completed', date: '2024-01-13' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
              View Report
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2">
              <Activity size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative p-6 rounded-2xl border ${stat.borderColor} bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group`}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.bgColor}`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}>
                    <Icon size={20} className={stat.color} />
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </p>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {isPositive ? 
                        <ArrowUpRight size={16} className="flex-shrink-0" /> : 
                        <ArrowDownRight size={16} className="flex-shrink-0" />
                      }
                      <span>{stat.change}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">from last month</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShoppingCart size={16} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {order.id} • {order.date}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {order.amount}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300">
                    <Eye size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Performance Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance
              </h2>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <TrendingUp size={32} className="text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Sales chart visualization</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Product', icon: Package, color: 'bg-blue-500' },
                { label: 'View Sales', icon: DollarSign, color: 'bg-emerald-500' },
                { label: 'Customers', icon: Users, color: 'bg-amber-500' },
                { label: 'Analytics', icon: Activity, color: 'bg-violet-500' }
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-left block">
                      {action.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;