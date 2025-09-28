export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviewCount: 128,
    category: 'electronics'
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviewCount: 89,
    category: 'electronics'
  }
]

export const MOCK_CATEGORIES = [
  { id: '1', name: 'Electronics', productCount: 156 },
  { id: '2', name: 'Fashion', productCount: 289 },
  { id: '3', name: 'Home & Garden', productCount: 134 },
  { id: '4', name: 'Beauty', productCount: 98 }
]

export const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    joinDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    joinDate: '2024-01-05'
  }
]