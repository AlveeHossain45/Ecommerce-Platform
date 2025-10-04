export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium noise-cancelling wireless headphones. Featuring 30-hour battery life, touch controls, and luxurious memory foam ear cushions.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.5,
    reviewCount: 128,
    category: 'electronics',
    tags: ['wireless', 'noise-cancelling', 'premium', 'audio'],
    features: ['30-hour battery', 'Noise cancellation', 'Touch controls', 'Memory foam'],
    specifications: {
      connectivity: 'Bluetooth 5.0',
      battery: '30 hours',
      weight: '265g',
      colors: ['Black', 'Silver', 'Space Gray']
    },
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    isOnSale: true,
    saleEnd: '2024-12-31',
    brand: 'AudioMaster',
    sku: 'AUD-HP-PRO-001',
    warranty: '2 years',
    shipping: {
      free: true,
      express: true,
      delivery: '2-3 business days'
    }
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    description: 'Stay connected and track your fitness with our advanced smartwatch. Monitor heart rate, sleep patterns, and receive notifications seamlessly.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.8,
    reviewCount: 89,
    category: 'electronics',
    tags: ['smartwatch', 'fitness', 'wearable', 'premium'],
    features: ['Heart rate monitor', 'Sleep tracking', 'GPS', 'Water resistant'],
    specifications: {
      display: '1.7" AMOLED',
      battery: '7 days',
      compatibility: 'iOS & Android',
      colors: ['Midnight', 'Starlight', 'Product Red']
    },
    inStock: true,
    stockCount: 23,
    isFeatured: true,
    isOnSale: false,
    brand: 'TechWear',
    sku: 'TECH-SW-5-001',
    warranty: '1 year',
    shipping: {
      free: true,
      express: false,
      delivery: '3-5 business days'
    }
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Made from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear. Sustainable and eco-friendly.',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.3,
    reviewCount: 256,
    category: 'fashion',
    tags: ['organic', 'cotton', 'sustainable', 'casual'],
    features: ['100% organic cotton', 'Machine washable', 'Breathable fabric'],
    specifications: {
      material: '100% Organic Cotton',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Navy', 'Olive'],
      care: 'Machine wash cold'
    },
    inStock: true,
    stockCount: 156,
    isFeatured: false,
    isOnSale: true,
    saleEnd: '2024-06-30',
    brand: 'EcoWear',
    sku: 'ECO-TS-ORG-001',
    shipping: {
      free: false,
      express: true,
      delivery: '1-2 business days'
    }
  },
  {
    id: '4',
    name: 'Designer Leather Handbag',
    description: 'Crafted from genuine leather, this elegant handbag combines style with functionality. Perfect for both casual and formal occasions.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.7,
    reviewCount: 67,
    category: 'fashion',
    tags: ['leather', 'designer', 'handbag', 'luxury'],
    features: ['Genuine leather', 'Multiple compartments', 'Adjustable strap'],
    specifications: {
      material: 'Genuine Leather',
      dimensions: '30x20x10cm',
      colors: ['Brown', 'Black', 'Cognac'],
      closure: 'Magnetic snap'
    },
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isOnSale: false,
    brand: 'LeatherCraft',
    sku: 'LC-HB-PREM-001',
    warranty: 'Lifetime warranty',
    shipping: {
      free: true,
      express: true,
      delivery: '2-3 business days'
    }
  },
  {
    id: '5',
    name: 'Professional Camera DSLR',
    description: 'Capture stunning photos with this professional-grade DSLR camera. Perfect for both beginners and professional photographers.',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.9,
    reviewCount: 203,
    category: 'electronics',
    tags: ['camera', 'dslr', 'professional', 'photography'],
    features: ['24.2MP sensor', '4K video', 'Wi-Fi connectivity', 'Weather sealed'],
    specifications: {
      sensor: '24.2MP APS-C',
      video: '4K at 30fps',
      connectivity: 'Wi-Fi, Bluetooth',
      lens: '18-55mm kit lens'
    },
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isOnSale: true,
    saleEnd: '2024-03-31',
    brand: 'PhotoPro',
    sku: 'PP-DSLR-PRO-001',
    warranty: '3 years',
    shipping: {
      free: true,
      express: true,
      delivery: '1-2 business days'
    }
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    description: 'High-quality yoga mat with excellent grip and cushioning. Perfect for all types of yoga and fitness activities.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    rating: 4.4,
    reviewCount: 178,
    category: 'sports',
    tags: ['yoga', 'fitness', 'exercise', 'wellness'],
    features: ['Non-slip surface', 'Eco-friendly material', 'Easy to clean'],
    specifications: {
      material: 'TPE Eco-friendly',
      thickness: '6mm',
      dimensions: '183x61cm',
      weight: '1.2kg'
    },
    inStock: true,
    stockCount: 89,
    isFeatured: false,
    isOnSale: false,
    brand: 'FitLife',
    sku: 'FL-YM-PRO-001',
    shipping: {
      free: true,
      express: false,
      delivery: '4-6 business days'
    }
  }
]

export const MOCK_CATEGORIES = [
  { 
    id: '1', 
    name: 'Electronics', 
    productCount: 156,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Latest gadgets and tech devices',
    featured: true,
    subcategories: ['Headphones', 'Smartphones', 'Laptops', 'Cameras']
  },
  { 
    id: '2', 
    name: 'Fashion', 
    productCount: 289,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Trendy clothing and accessories',
    featured: true,
    subcategories: ['Men', 'Women', 'Accessories', 'Shoes']
  },
  { 
    id: '3', 
    name: 'Home & Garden', 
    productCount: 134,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Everything for your home and garden',
    featured: false,
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden']
  },
  { 
    id: '4', 
    name: 'Beauty', 
    productCount: 98,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Skincare and beauty products',
    featured: false,
    subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare']
  },
  { 
    id: '5', 
    name: 'Sports & Outdoors', 
    productCount: 167,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Equipment for sports and outdoor activities',
    featured: true,
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports']
  },
  { 
    id: '6', 
    name: 'Books & Media', 
    productCount: 243,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Books, movies, and music',
    featured: false,
    subcategories: ['Fiction', 'Non-Fiction', 'Movies', 'Music']
  }
]

export const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    joinDate: '2024-01-01',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'active',
    lastLogin: '2024-03-15T10:30:00Z',
    orders: 12,
    totalSpent: 2456.78,
    preferences: {
      newsletter: true,
      smsNotifications: false,
      theme: 'light'
    },
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    joinDate: '2024-01-05',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'active',
    lastLogin: '2024-03-15T14:22:00Z',
    orders: 0,
    totalSpent: 0,
    permissions: ['read', 'write', 'delete', 'manage_users'],
    preferences: {
      newsletter: false,
      smsNotifications: true,
      theme: 'dark'
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'customer',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'active',
    lastLogin: '2024-03-14T16:45:00Z',
    orders: 5,
    totalSpent: 789.50,
    preferences: {
      newsletter: true,
      smsNotifications: true,
      theme: 'system'
    },
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'moderator',
    joinDate: '2024-02-01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'active',
    lastLogin: '2024-03-15T09:15:00Z',
    orders: 3,
    totalSpent: 456.25,
    permissions: ['read', 'write', 'delete'],
    preferences: {
      newsletter: false,
      smsNotifications: false,
      theme: 'light'
    },
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  }
]

export const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    userId: '1',
    status: 'delivered',
    total: 299.99,
    items: [
      { productId: '1', quantity: 1, price: 299.99 }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'credit_card',
    createdAt: '2024-03-10T14:30:00Z',
    deliveredAt: '2024-03-12T10:15:00Z',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    userId: '3',
    status: 'processing',
    total: 649.98,
    items: [
      { productId: '3', quantity: 2, price: 29.99 },
      { productId: '6', quantity: 1, price: 49.99 }
    ],
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'paypal',
    createdAt: '2024-03-14T16:45:00Z',
    estimatedDelivery: '2024-03-18'
  }
]

export const MOCK_REVIEWS = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    rating: 5,
    title: 'Amazing sound quality!',
    comment: 'These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is as advertised.',
    createdAt: '2024-03-13T10:30:00Z',
    verified: true
  },
  {
    id: '2',
    productId: '1',
    userId: '3',
    rating: 4,
    title: 'Great but could be better',
    comment: 'Good sound quality and comfortable, but the touch controls are a bit sensitive.',
    createdAt: '2024-03-14T14:22:00Z',
    verified: true
  }
]

// Helper functions for mock data
export const getProductById = (id) => MOCK_PRODUCTS.find(product => product.id === id)
export const getProductsByCategory = (category) => MOCK_PRODUCTS.filter(product => product.category === category)
export const getFeaturedProducts = () => MOCK_PRODUCTS.filter(product => product.isFeatured)
export const getProductsOnSale = () => MOCK_PRODUCTS.filter(product => product.isOnSale)
export const getUserById = (id) => MOCK_USERS.find(user => user.id === id)
export const getOrdersByUserId = (userId) => MOCK_ORDERS.filter(order => order.userId === userId)
export const getReviewsByProductId = (productId) => MOCK_REVIEWS.filter(review => review.productId === productId)

// Usage examples:
/*
// Get product details
const product = getProductById('1')

// Get featured products for homepage
const featuredProducts = getFeaturedProducts()

// Get user orders
const userOrders = getOrdersByUserId('1')

// Get product reviews
const productReviews = getReviewsByProductId('1')
*/