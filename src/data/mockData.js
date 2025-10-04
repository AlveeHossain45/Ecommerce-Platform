export const mockProducts = [
  // Electronics
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Immersive sound quality with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=2070',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070'
    ],
    category: 'electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviewCount: 258,
    inStock: true,
    stockCount: 45,
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    saleEnd: '2024-12-31',
    tags: ['wireless', 'noise-cancelling', 'premium', 'audio', 'bluetooth'],
    features: ['Active Noise Cancellation', '30-hour Battery Life', 'Touch Controls', 'Voice Assistant', 'Quick Charge'],
    specifications: {
      connectivity: 'Bluetooth 5.0',
      battery: '30 hours playback',
      weight: '265g',
      colors: ['Matte Black', 'Silver', 'Midnight Blue'],
      warranty: '2 years'
    },
    shipping: {
      free: true,
      express: true,
      delivery: '2-3 business days'
    },
    sku: 'AUD-HP-PRO-001'
  },
  {
    id: '2',
    name: 'Smart Watch Series 7',
    description: 'Stay connected and track your fitness with this sleek and powerful smartwatch. Advanced health monitoring and seamless connectivity.',
    price: 349.99,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999',
      'https://images.unsplash.com/photo-1434493652605-8c23e35e1b14?q=80&w=2070'
    ],
    category: 'electronics',
    brand: 'TechWear',
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    stockCount: 23,
    isFeatured: true,
    tags: ['smartwatch', 'fitness', 'wearable', 'health', 'premium'],
    features: ['Heart Rate Monitor', 'Sleep Tracking', 'GPS', 'Water Resistant', 'Voice Control'],
    specifications: {
      display: '1.7" AMOLED',
      battery: '7 days typical use',
      compatibility: 'iOS & Android',
      colors: ['Midnight', 'Starlight', 'Product Red'],
      warranty: '1 year'
    },
    shipping: {
      free: true,
      express: false,
      delivery: '3-5 business days'
    },
    sku: 'TECH-SW-7-001'
  },
  {
    id: '3',
    name: '4K Ultra HD Drone',
    description: 'Capture breathtaking aerial footage with this professional-grade 4K drone. Perfect for photography and videography enthusiasts.',
    price: 799.00,
    originalPrice: 999.00,
    images: [
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070', // New drone image 1
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070', // New drone image 2
      'https://images.unsplash.com/photo-1508614589041-895a44691be8?q=80&w=2070', // New drone image 3
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070'  // New drone image 4
    ],
    category: 'electronics',
    brand: 'AeroCam',
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    stockCount: 12,
    isOnSale: true,
    saleEnd: '2024-04-30',
    tags: ['drone', '4k', 'camera', 'aerial', 'professional', 'photography'],
    features: ['4K Camera', '30-min Flight Time', 'GPS Navigation', 'Obstacle Avoidance', 'Follow Me Mode', 'Auto Return'],
    specifications: {
      camera: '4K UHD 60fps',
      flightTime: '30 minutes',
      range: '8km',
      weight: '900g',
      maxSpeed: '72 km/h',
      warranty: '1 year'
    },
    shipping: {
      free: true,
      express: true,
      delivery: '1-2 business days'
    },
    sku: 'AERO-DR-PRO-001'
  },
  
  // Fashion
  {
    id: '4',
    name: 'Classic Leather Jacket',
    description: 'A timeless piece for any wardrobe, made from 100% genuine leather. Crafted with precision and attention to detail.',
    price: 499.99,
    originalPrice: 599.99,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1887',
      'https://images.unsplash.com/photo-1544022613-d4f34c4d59d1?q=80&w=2070',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1974' // New leather jacket image
    ],
    category: 'fashion',
    brand: 'UrbanVogue',
    rating: 4.6,
    reviewCount: 145,
    inStock: true,
    stockCount: 28,
    isOnSale: true,
    tags: ['leather', 'jacket', 'premium', 'fashion', 'classic'],
    features: ['100% Genuine Leather', 'Multiple Pockets', 'Comfortable Fit', 'Durable Construction'],
    specifications: {
      material: 'Full Grain Leather',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Brown', 'Cognac'],
      care: 'Professional leather care recommended'
    },
    shipping: {
      free: true,
      express: true,
      delivery: '2-3 business days'
    },
    sku: 'UV-LJ-CL-001'
  },
  {
    id: '5',
    name: 'Luxury Chronograph Watch',
    description: 'Elegant and sophisticated, this watch combines classic design with modern precision. A statement piece for any occasion.',
    price: 850.00,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999',
      'https://images.unsplash.com/photo-1547996160-81dfd9c9a0e9?q=80&w=2070',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=2070'
    ],
    category: 'fashion',
    brand: 'Timeless',
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    tags: ['watch', 'luxury', 'chronograph', 'premium', 'accessory'],
    features: ['Swiss Movement', 'Sapphire Crystal', 'Water Resistant', 'Chronograph Function'],
    specifications: {
      movement: 'Swiss Automatic',
      crystal: 'Sapphire',
      waterResistance: '100m',
      case: 'Stainless Steel',
      warranty: '5 years'
    },
    shipping: {
      free: true,
      express: true,
      delivery: '1-2 business days'
    },
    sku: 'TIME-CH-LUX-001'
  },
  
  // Home & Garden
  {
    id: '6',
    name: 'Modern Scandinavian Sofa',
    description: 'Minimalist design meets maximum comfort. Perfect for any modern living room. Handcrafted with sustainable materials.',
    price: 1299.00,
    originalPrice: 1599.00,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070'
    ],
    category: 'home',
    brand: 'CozyHome',
    rating: 4.8,
    reviewCount: 88,
    inStock: true,
    stockCount: 8,
    isOnSale: true,
    saleEnd: '2024-05-15',
    tags: ['sofa', 'scandinavian', 'modern', 'furniture', 'living-room'],
    features: ['Sustainable Wood Frame', 'Premium Upholstery', 'Modular Design', 'Easy Assembly'],
    specifications: {
      dimensions: '220x95x85cm',
      material: 'Solid Oak + Premium Fabric',
      weight: '85kg',
      colors: ['Charcoal', 'Sand', 'Navy'],
      assembly: 'Required (tools included)'
    },
    shipping: {
      free: true,
      express: false,
      delivery: '5-7 business days'
    },
    sku: 'CH-SF-SCAN-001'
  },
  
  // Beauty
  {
    id: '7',
    name: 'Organic Skincare Set',
    description: 'Revitalize your skin with our all-natural, organic skincare collection. Gentle yet effective for all skin types.',
    price: 120.50,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780',
      'https://images.unsplash.com/photo-1556228852-55b6a38253b8?q=80&w=1887',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070'
    ],
    category: 'beauty',
    brand: 'PureGlow',
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    stockCount: 67,
    isNew: true,
    isFeatured: true,
    tags: ['skincare', 'organic', 'natural', 'beauty', 'premium'],
    features: ['100% Organic Ingredients', 'Cruelty-Free', 'Vegan Formula', 'All Skin Types'],
    specifications: {
      volume: '5 products (Full Routine)',
      ingredients: 'Certified Organic',
      shelfLife: '24 months',
      madeIn: 'USA',
      certification: 'USDA Organic'
    },
    shipping: {
      free: true,
      express: true,
      delivery: '2-3 business days'
    },
    sku: 'PG-SK-SET-001'
  },
    
  // Sports
  {
    id: '8',
    name: 'Professional Yoga Mat',
    description: 'Non-slip, eco-friendly mat for the perfect yoga session every time. Excellent cushioning and durability.',
    price: 79.99,
    originalPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070', // New yoga mat image 1
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070', // New yoga mat image 2
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2070', // New yoga mat image 3
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2070'  // New yoga mat image 4
    ],
    category: 'sports',
    brand: 'ZenFlex',
    rating: 4.8,
    reviewCount: 150,
    inStock: true,
    stockCount: 89,
    isOnSale: true,
    tags: ['yoga', 'fitness', 'exercise', 'wellness', 'eco-friendly', 'non-slip'],
    features: ['Non-Slip Surface', 'Eco-Friendly Material', 'Extra Thick', 'Easy to Clean', 'Perfect Alignment Marks'],
    specifications: {
      material: 'TPE Eco-friendly',
      thickness: '6mm',
      dimensions: '183x61cm',
      weight: '1.2kg',
      colors: ['Lavender', 'Ocean', 'Forest', 'Sunset']
    },
    shipping: {
      free: true,
      express: false,
      delivery: '4-6 business days'
    },
    sku: 'ZF-YM-PRO-001'
  },

  // Additional Products for Variety
  {
    id: '9',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and ultra-responsive buttons.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067',
      'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=1974', // New gaming mouse image
      'https://images.unsplash.com/photo-1563297007-0686b7003af7?q=80&w=1936'  // New gaming mouse image
    ],
    category: 'electronics',
    brand: 'GamePro',
    rating: 4.7,
    reviewCount: 178,
    inStock: true,
    stockCount: 34,
    isNew: true,
    tags: ['gaming', 'mouse', 'wireless', 'rgb', 'precision'],
    features: ['Wireless 2.4GHz', 'Customizable RGB', '6 Programmable Buttons', '16000 DPI'],
    specifications: {
      connectivity: '2.4GHz Wireless',
      sensor: 'Optical 16000 DPI',
      battery: '50 hours',
      weight: '85g'
    },
    shipping: {
      free: true,
      express: true,
      delivery: '1-2 business days'
    },
    sku: 'GP-MS-GAM-001'
  },
  {
    id: '10',
    name: 'Designer Sunglasses',
    description: 'Stylish and protective sunglasses with UV400 protection and polarized lenses.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080',
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2070', // New sunglasses image
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080'
    ],
    category: 'fashion',
    brand: 'SunStyle',
    rating: 4.6,
    reviewCount: 92,
    inStock: true,
    stockCount: 21,
    tags: ['sunglasses', 'designer', 'uv-protection', 'polarized', 'fashion'],
    features: ['UV400 Protection', 'Polarized Lenses', 'Lightweight Frame', 'Case Included'],
    specifications: {
      lens: 'Polarized Polycarbonate',
      protection: 'UV400',
      frame: 'Acetate',
      colors: ['Black', 'Tortoise', 'Gold']
    },
    shipping: {
      free: true,
      express: true,
      delivery: '2-3 business days'
    },
    sku: 'SS-SG-DES-001'
  },
  {
    id: '11',
    name: 'Professional Camera DSLR',
    description: 'Capture stunning photos with this professional-grade DSLR camera. Perfect for both beginners and professional photographers.',
    price: 899.99,
    originalPrice: 1199.99,
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=2070',
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070' // New camera image
    ],
    category: 'electronics',
    brand: 'PhotoPro',
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isOnSale: true,
    saleEnd: '2024-03-31',
    tags: ['camera', 'dslr', 'professional', 'photography', '4k'],
    features: ['24.2MP sensor', '4K video', 'Wi-Fi connectivity', 'Weather sealed'],
    specifications: {
      sensor: '24.2MP APS-C',
      video: '4K at 30fps',
      connectivity: 'Wi-Fi, Bluetooth',
      lens: '18-55mm kit lens'
    },
    shipping: {
      free: true,
      express: true,
      delivery: '1-2 business days'
    },
    sku: 'PP-DSLR-PRO-001'
  },
  {
    id: '12',
    name: 'Premium Coffee Maker',
    description: 'Brew the perfect cup of coffee every time with this premium programmable coffee maker.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070', // New coffee maker image
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070'
    ],
    category: 'home',
    brand: 'BrewMaster',
    rating: 4.5,
    reviewCount: 167,
    inStock: true,
    stockCount: 42,
    tags: ['coffee', 'kitchen', 'appliance', 'premium'],
    features: ['Programmable Timer', 'Thermal Carafe', 'Auto Shut-off', 'Strength Control'],
    specifications: {
      capacity: '12 cups',
      carafe: 'Stainless Steel Thermal',
      programming: '24-hour digital',
      warranty: '2 years'
    },
    shipping: {
      free: true,
      express: false,
      delivery: '3-5 business days'
    },
    sku: 'BM-CM-PRO-001'
  }
];

export const mockCategories = [
  { 
    id: 'electronics', 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964', 
    productCount: 156,
    description: 'Latest gadgets and tech devices for modern living',
    featured: true,
    subcategories: ['Headphones', 'Smartphones', 'Laptops', 'Cameras', 'Drones'],
    tags: ['tech', 'gadgets', 'innovation', 'smart']
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071', 
    productCount: 289,
    description: 'Trendy clothing and accessories for every style',
    featured: true,
    subcategories: ['Men', 'Women', 'Accessories', 'Shoes', 'Jewelry'],
    tags: ['style', 'trendy', 'clothing', 'accessories']
  },
  { 
    id: 'home', 
    name: 'Home Goods', 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916', 
    productCount: 134,
    description: 'Everything to make your house feel like home',
    featured: false,
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Lighting'],
    tags: ['decor', 'furniture', 'comfort', 'living']
  },
  { 
    id: 'beauty', 
    name: 'Beauty', 
    image: 'https://images.unsplash.com/photo-1556228852-55b6a38253b8?q=80&w=1887', 
    productCount: 98,
    description: 'Premium skincare and beauty products for your self-care routine',
    featured: true,
    subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Bath & Body'],
    tags: ['skincare', 'makeup', 'self-care', 'beauty']
  },
  { 
    id: 'sports', 
    name: 'Sports & Fitness', 
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070', 
    productCount: 167,
    description: 'Equipment and gear for your active lifestyle',
    featured: false,
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga', 'Running'],
    tags: ['fitness', 'sports', 'active', 'health']
  },
  { 
    id: 'books', 
    name: 'Books & Media', 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128', 
    productCount: 243,
    description: 'Expand your mind with our curated collection of books and media',
    featured: false,
    subcategories: ['Fiction', 'Non-Fiction', 'Movies', 'Music', 'Educational'],
    tags: ['books', 'media', 'entertainment', 'learning']
  }
];

// Helper functions for product data
export const getProductById = (id) => mockProducts.find(product => product.id === id);
export const getProductsByCategory = (category) => mockProducts.filter(product => product.category === category);
export const getFeaturedProducts = () => mockProducts.filter(product => product.isFeatured);
export const getNewProducts = () => mockProducts.filter(product => product.isNew);
export const getProductsOnSale = () => mockProducts.filter(product => product.isOnSale);
export const getProductsByBrand = (brand) => mockProducts.filter(product => product.brand === brand);
export const searchProducts = (query) => mockProducts.filter(product => 
  product.name.toLowerCase().includes(query.toLowerCase()) ||
  product.description.toLowerCase().includes(query.toLowerCase()) ||
  product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
);

// Usage examples:
/*
// Get a specific product
const product = getProductById('1');

// Get all electronics
const electronics = getProductsByCategory('electronics');

// Get featured products for homepage
const featured = getFeaturedProducts();

// Search for products
const searchResults = searchProducts('wireless');

// Get products on sale
const saleProducts = getProductsOnSale();
*/