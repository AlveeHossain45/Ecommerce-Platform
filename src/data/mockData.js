export const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience premium sound quality with noise cancellation technology.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'electronics',
    brand: 'AudioTech',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge technology',
      'Premium build quality'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Color': 'Black'
    },
    tags: ['wireless', 'noise-cancellation', 'premium'],
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  // Add other mock products here
];

export const mockCategories = [
  { id: '1', name: 'Electronics', slug: 'electronics', productCount: 156 },
  { id: '2', name: 'Fashion', slug: 'fashion', productCount: 289 },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', productCount: 134 },
  { id: '4', name: 'Beauty', slug: 'beauty', productCount: 98 },
  { id: '5', name: 'Sports', slug: 'sports', productCount: 72 }
];