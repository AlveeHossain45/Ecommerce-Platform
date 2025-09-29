export const mockProducts = [
  // Electronics
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Immersive sound quality with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    originalPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070'],
    category: 'electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviewCount: 258,
    inStock: true,
    isNew: true,
  },
  {
    id: '2',
    name: 'Smart Watch Series 7',
    description: 'Stay connected and track your fitness with this sleek and powerful smartwatch.',
    price: 349.99,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964'],
    category: 'electronics',
    brand: 'TechWear',
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
  },
  {
    id: '3',
    name: '4K Ultra HD Drone',
    description: 'Capture breathtaking aerial footage with this professional-grade 4K drone.',
    price: 799.00,
    images: ['https://images.unsplash.com/photo-1507582020474-9a3304a7f72c?q=80&w=2070'],
    category: 'electronics',
    brand: 'AeroCam',
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
  },
  
  // Fashion
  {
    id: '4',
    name: 'Classic Leather Jacket',
    description: 'A timeless piece for any wardrobe, made from 100% genuine leather.',
    price: 499.99,
    originalPrice: 599.99,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1887'],
    category: 'fashion',
    brand: 'UrbanVogue',
    rating: 4.6,
    reviewCount: 145,
    inStock: true,
  },
  {
    id: '5',
    name: 'Luxury Chronograph Watch',
    description: 'Elegant and sophisticated, this watch combines classic design with modern precision.',
    price: 850.00,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999'],
    category: 'fashion',
    brand: 'Timeless',
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
  },
  
  // Home & Garden
  {
    id: '6',
    name: 'Modern Scandinavian Sofa',
    description: 'Minimalist design meets maximum comfort. Perfect for any modern living room.',
    price: 1299.00,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070'],
    category: 'home',
    brand: 'CozyHome',
    rating: 4.8,
    reviewCount: 88,
    inStock: true,
  },
  
  // Beauty
  {
    id: '7',
    name: 'Organic Skincare Set',
    description: 'Revitalize your skin with our all-natural, organic skincare collection.',
    price: 120.50,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780'],
    category: 'beauty',
    brand: 'PureGlow',
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
  },
    
  // Sports
  {
    id: '8',
    name: 'Professional Yoga Mat',
    description: 'Non-slip, eco-friendly mat for the perfect yoga session every time.',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1591291621239-41f18a4c8f93?q=80&w=1935'],
    category: 'sports',
    brand: 'ZenFlex',
    rating: 4.8,
    reviewCount: 150,
    inStock: true,
  },
];

export const mockCategories = [
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964', productCount: 156 },
  { id: 'fashion', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071', productCount: 289 },
  { id: 'home', name: 'Home Goods', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916', productCount: 134 },
  { id: 'beauty', name: 'Beauty', image: 'https://images.unsplash.com/photo-1556228852-55b6a38253b8?q=80&w=1887', productCount: 98 }
];