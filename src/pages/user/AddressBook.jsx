import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Home, 
  Building2, 
  Check, 
  X, 
  Star,
  Phone,
  User,
  AlertCircle,
  Save,
  Loader2,
  Package
} from 'lucide-react';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      label: 'Home',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      isDefault: true
    },
    {
      id: '2',
      label: 'Office',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@work.com',
      phone: '+1 (555) 987-6543',
      address: '456 Business Ave',
      apartment: 'Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'US',
      isDefault: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    label: 'Home',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const addressLabels = [
    { value: 'Home', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
    { value: 'Office', icon: Building2, gradient: 'from-purple-500 to-pink-500' },
    { value: 'Other', icon: MapPin, gradient: 'from-amber-500 to-orange-500' }
  ];

  const openModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData(address);
    } else {
      setEditingAddress(null);
      setFormData({
        label: 'Home',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        isDefault: addresses.length === 0
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP is required';
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    let newAddressId = '';
    
    if (editingAddress) {
      // Update existing
      setAddresses(prev => prev.map(addr =>
        addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr
      ));
      newAddressId = editingAddress.id;
    } else {
      // Add new
      const newAddress = {
        ...formData,
        id: Date.now().toString()
      };
      setAddresses(prev => [...prev, newAddress]);
      newAddressId = newAddress.id;
    }

    // Handle default
    if (formData.isDefault) {
      setAddresses(prev => prev.map(addr => ({
        ...addr,
        isDefault: addr.id === newAddressId
      })));
    }

    setIsSaving(false);
    closeModal();
  };

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const getLabelIcon = (label) => {
    const found = addressLabels.find(l => l.value === label);
    return found || addressLabels[2];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Address Book
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your shipping and billing addresses
            </p>
          </div>
          
          <motion.button
            onClick={() => openModal()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 self-start"
          >
            <Plus size={20} />
            <span>Add New Address</span>
          </motion.button>
        </motion.div>

        {/* Addresses Grid */}
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {addresses.map((address, index) => {
                const labelInfo = getLabelIcon(address.label);
                const LabelIcon = labelInfo.icon;
                
                return (
                  <motion.div
                    key={address.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 overflow-hidden"
                  >
                    {/* Default Badge */}
                    {address.isDefault && (
                      <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <Star size={10} className="fill-current" />
                        Default
                      </div>
                    )}

                    {/* Header with Label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${labelInfo.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <LabelIcon size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {address.label}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {address.firstName} {address.lastName}
                        </p>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin size={16} className="mt-0.5 flex-shrink-0 text-blue-500" />
                        <div>
                          <p>{address.address}</p>
                          {address.apartment && <p>{address.apartment}</p>}
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone size={16} className="flex-shrink-0 text-green-500" />
                        <span>{address.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <User size={16} className="flex-shrink-0 text-purple-500" />
                        <span>{address.email}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                      {!address.isDefault && (
                        <motion.button
                          onClick={() => handleSetDefault(address.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                          <Check size={14} />
                          Set Default
                        </motion.button>
                      )}
                      
                      <motion.button
                        onClick={() => openModal(address)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <Edit size={14} />
                        Edit
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setDeleteConfirmId(address.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
              <Package size={40} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Addresses Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Add your first shipping address to speed up checkout
            </p>
            <motion.button
              onClick={() => openModal()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Plus size={20} />
              Add Your First Address
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {editingAddress ? 'Update your address details' : 'Enter your shipping information'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Label Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Address Label
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {addressLabels.map((label) => {
                        const Icon = label.icon;
                        const isSelected = formData.label === label.value;
                        return (
                          <motion.button
                            key={label.value}
                            type="button"
                            onClick={() => handleChange('label', label.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                              isSelected
                                ? `bg-gradient-to-br ${label.gradient} border-transparent text-white shadow-lg`
                                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                            }`}
                          >
                            <Icon size={20} />
                            <span className="text-xs font-semibold">{label.value}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                          errors.firstName
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                          errors.lastName
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                          errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                          errors.phone
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                        errors.address
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Apartment (optional) */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Apartment, Suite, etc. (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleChange('apartment', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      placeholder="Apt 4B"
                    />
                  </div>

                  {/* City/State/ZIP */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                          errors.city
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                          errors.state
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${
                          errors.zipCode
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="BD">Bangladesh</option>
                      <option value="IN">India</option>
                    </select>
                  </div>

                  {/* Default Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isDefault}
                      onChange={(e) => handleChange('isDefault', e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        Set as default address
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Use this address by default at checkout
                      </p>
                    </div>
                  </label>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                  <motion.button
                    onClick={closeModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSave}
                    disabled={isSaving}
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Delete Address?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This action cannot be undone. Are you sure?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirmId)}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressBook;