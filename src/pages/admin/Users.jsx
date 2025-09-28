import React, { useState } from 'react';
import { Mail, Phone, Calendar, Edit, Trash2, Search, UserPlus } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+15551234567', role: 'customer', status: 'active', joinDate: '2024-01-01', orders: 5 },
  ]);
  // filter logic
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage user accounts</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><UserPlus size={20} />Add User</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User cards go here */}
      </div>
    </div>
  );
};

export default Users;