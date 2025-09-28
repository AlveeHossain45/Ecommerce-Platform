import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    { icon: DollarSign, label: 'Total Revenue', value: '$24,580', change: '+12.5%' },
    { icon: ShoppingCart, label: 'Total Orders', value: '1,248', change: '+8.2%' },
    { icon: Users, label: 'Total Customers', value: '5,423', change: '+15.7%' },
    { icon: TrendingUp, label: 'Conversion Rate', value: '3.24%', change: '+2.1%' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your store performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
                  <p className="text-sm text-green-500 mt-1">{metric.change}</p>
                </div>
                <div className="p-3 rounded-full bg-primary-100 text-primary-600"><Icon size={24} /></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500">Revenue chart placeholder</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sales Trend</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500">Sales trend chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;