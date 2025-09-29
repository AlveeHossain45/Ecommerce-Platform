import React, { useState } from 'react';
import { Mail, Phone, Calendar, Edit, Trash2, Search, UserPlus, MoreVertical, User, Shield, ShoppingBag, Ban, CheckCircle, XCircle, Filter, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Users = () => {
  const [users, setUsers] = useState([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '+15551234567', 
      role: 'customer', 
      status: 'active', 
      joinDate: '2024-01-01', 
      orders: 5,
      lastActive: '2024-01-15',
      avatar: null
    },
    { 
      id: '2', 
      name: 'Sarah Wilson', 
      email: 'sarah@example.com', 
      phone: '+15551234568', 
      role: 'admin', 
      status: 'active', 
      joinDate: '2024-01-02', 
      orders: 12,
      lastActive: '2024-01-15',
      avatar: null
    },
    { 
      id: '3', 
      name: 'Mike Johnson', 
      email: 'mike@example.com', 
      phone: '+15551234569', 
      role: 'customer', 
      status: 'inactive', 
      joinDate: '2024-01-03', 
      orders: 0,
      lastActive: '2024-01-10',
      avatar: null
    },
    { 
      id: '4', 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      phone: '+15551234570', 
      role: 'moderator', 
      status: 'active', 
      joinDate: '2024-01-04', 
      orders: 8,
      lastActive: '2024-01-14',
      avatar: null
    },
    { 
      id: '5', 
      name: 'Alex Brown', 
      email: 'alex@example.com', 
      phone: '+15551234571', 
      role: 'customer', 
      status: 'suspended', 
      joinDate: '2024-01-05', 
      orders: 3,
      lastActive: '2024-01-08',
      avatar: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'inactive':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800';
      case 'suspended':
        return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'moderator':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'customer':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield size={14} />;
      case 'moderator':
        return <User size={14} />;
      case 'customer':
        return <ShoppingBag size={14} />;
      default:
        return <User size={14} />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusToggle = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    setActiveDropdown(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setActiveDropdown(null);
  };

  const UserCard = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition-all duration-500 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg group-hover:scale-110 transition-transform duration-300">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {user.name}
            </h3>
            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
              {getRoleIcon(user.role)}
              <span className="capitalize">{user.role}</span>
            </span>
          </div>
        </div>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
          >
            <MoreVertical size={16} />
          </motion.button>

          <AnimatePresence>
            {activeDropdown === user.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden"
              >
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2">
                    <Edit size={14} />
                    <span>Edit User</span>
                  </button>
                  {user.status === 'active' ? (
                    <button 
                      onClick={() => handleStatusToggle(user.id, 'suspended')}
                      className="w-full text-left px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Ban size={14} />
                      <span>Suspend User</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleStatusToggle(user.id, 'active')}
                      className="w-full text-left px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <CheckCircle size={14} />
                      <span>Activate User</span>
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Trash2 size={14} />
                    <span>Delete User</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Mail size={14} />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Phone size={14} />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar size={14} />
          <span>Joined {user.joinDate}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">{user.orders}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{user.status}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.lastActive}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Last Active</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between mt-4">
        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
          {user.status === 'active' && <CheckCircle size={12} />}
          {user.status === 'inactive' && <XCircle size={12} />}
          {user.status === 'suspended' && <Ban size={12} />}
          <span className="capitalize">{user.status}</span>
        </span>
        
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300">
          View Profile
        </button>
      </div>
    </motion.div>
  );

  const UserListRow = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </h3>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                {getRoleIcon(user.role)}
                <span className="capitalize">{user.role}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <Mail size={12} />
                <span>{user.email}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Phone size={12} />
                <span>{user.phone}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{user.joinDate}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="font-bold text-gray-900 dark:text-white">{user.orders}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
          </div>

          <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
            {user.status === 'active' && <CheckCircle size={12} />}
            {user.status === 'inactive' && <XCircle size={12} />}
            {user.status === 'suspended' && <Ban size={12} />}
            <span className="capitalize">{user.status}</span>
          </span>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
              <Edit size={16} />
            </button>
            <button 
              onClick={() => handleDeleteUser(user.id)}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
              User Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Manage all user accounts and permissions
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Export</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
            >
              <UserPlus size={16} />
              <span>Add User</span>
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
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl py-2.5 px-4 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="customer">Customer</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl py-2.5 px-4 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              {['grid', 'list'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {mode === 'grid' ? 'Grid' : 'List'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Grid/List */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <UserCard key={user.id} user={user} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <UserListRow key={user.id} user={user} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <User size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No users have been added yet'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <UserPlus size={16} />
            <span>Add First User</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Users;