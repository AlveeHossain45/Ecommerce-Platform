import React from 'react';
import { Users, ShoppingCart, DollarSign, Package, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$24,580', change: '+12.5%', icon: DollarSign, color: 'text-green-500' },
    { title: 'Total Orders', value: '1,248', change: '+8.2%', icon: ShoppingCart, color: 'text-blue-500' },
    { title: 'Total Products', value: '856', change: '+3.1%', icon: Package, color: 'text-purple-500' },
    { title: 'Total Customers', value: '5,423', change: '+15.7%', icon: Users, color: 'text-orange-500' }
  ];
  // ... rest of component logic
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendingUp size={14} className="inline mr-1" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}><Icon size={24} /></div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Add other dashboard components like recent orders here */}
    </div>
  );
};

export default Dashboard;