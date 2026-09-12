import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  X,
  Save,
  Loader2,
  AlertCircle,
  ChevronDown,
  Check,
  MoreVertical,
  Eye,
  Star,
  ShoppingCart
} from 'lucide-react';
import Modal from '../../components/ui/modal.jsx';

const AdminProducts = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      stock: 150,
      status: 'active',
      rating: 4.8,
      sales: 245,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '2',
      name: 'Smart Watch Series 5',
      category: 'Electronics',
      price: 349.99,
      stock: 75,
      status: 'active',
      rating: 4.9,
      sales: 189,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '3',
      name: 'Classic Leather Jacket',
      category: 'Fashion',
      price: 499.99,
      stock: 28,
      status: 'active',
      rating: 4.6,
      sales: 145,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '4',
      name: '4K Ultra HD Drone',
      category: 'Electronics',
      price: 799.00,
      stock: 12,
      status: 'low-stock',
      rating: 4.7,
      sales: 95,
      image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '5',
      name: 'Organic Skincare Set',
      category: 'Beauty',
      price: 120.50,
      stock: 0,
      status: 'out-of-stock',
      rating: 4.9,
      sales: 312,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    status: 'active',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'];

  // Stats
  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 20).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  }), [products]);

  // Filtered & Sorted
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'stock': return a.stock - b.stock;
        case 'sales': return b.sales - a.sales;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [products, searchTerm, categoryFilter, statusFilter, sortBy]);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        status: product.status,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Electronics',
        price: '',
        stock: '',
        status: 'active',
        image: ''
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
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
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (formData.stock === '' || parseInt(formData.stock) < 0) newErrors.stock = 'Valid stock is required';
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      rating: editingProduct?.rating || 0,
      sales: editingProduct?.sales || 0
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        rating: 0,
        sales: 0
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setIsSaving(false);
    closeModal();
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'low-stock': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      'out-of-stock': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    };
    const labels = {
      active: 'Active',
      'low-stock': 'Low Stock',
      'out-of-stock': 'Out of Stock'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30 p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Products Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your product catalog and inventory
          </p>
        </div>
        
        <motion.button
          onClick={() => openModal()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 self-start"
        >
          <Plus size={20} />
          Add Product
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {[
          { label: 'Total Products', value: stats.total, icon: Package, gradient: 'from-blue-500 to-cyan-500' },
          { label: 'Active', value: stats.active, icon: Check, gradient: 'from-green-500 to-emerald-500' },
          { label: 'Low Stock', value: stats.lowStock, icon: TrendingDown, gradient: 'from-amber-500 to-orange-500' },
          { label: 'Inventory Value', value: `$${stats.totalValue.toLocaleString()}`, icon: DollarSign, gradient: 'from-purple-500 to-pink-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock">Stock</option>
              <option value="sales">Best Selling</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 hidden lg:block">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-1 text-center">Stock</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.03 }}
                className="px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="lg:col-span-5 flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xl shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={10} className="text-yellow-500 fill-current" />
                          {product.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <ShoppingCart size={10} />
                          {product.sales} sold
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="lg:col-span-2 lg:text-center">
                    <span className="lg:hidden text-xs text-gray-500 mr-2">Price:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="lg:col-span-1 lg:text-center">
                    <span className="lg:hidden text-xs text-gray-500 mr-2">Stock:</span>
                    <span className={`font-semibold ${
                      product.stock === 0 ? 'text-red-600 dark:text-red-400' :
                      product.stock <= 20 ? 'text-amber-600 dark:text-amber-400' :
                      'text-gray-900 dark:text-white'
                    }`}>
                      {product.stock}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="lg:col-span-2 lg:text-center">
                    {getStatusBadge(product.status)}
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-2 flex items-center justify-center gap-2">
                    <motion.button
                      onClick={() => openModal(product)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </motion.button>
                    <motion.button
                      onClick={() => setDeleteConfirmId(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first product'
              }
            </p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={18} />
              Add Product
            </button>
          </motion.div>
        )}

        {/* Footer */}
        {filteredProducts.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center lg:text-left">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span> products
            </div>
          </div>
        )}
      </motion.div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
        variant="premium"
      >
        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              >
                <option value="active">Active</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  errors.price
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stock *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                  errors.stock
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.stock}
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Preview */}
          {formData.image && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <img
                src={formData.image}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100?text=Invalid';
                }}
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Image Preview
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This is how your image will appear
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={closeModal}
              className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editingProduct ? 'Update' : 'Create'} Product
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Product"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Are you sure?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            This action cannot be undone. The product will be permanently deleted.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="flex-1 px-4 py-2.5 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteConfirmId)}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;