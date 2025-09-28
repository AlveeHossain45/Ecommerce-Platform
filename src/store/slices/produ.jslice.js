import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  filters: {
    category: '',
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    inStock: false
  },
  sortBy: 'name',
  searchQuery: '',
  
  setProducts: (products) => set({ products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),
  setCategories: (categories) => set({ categories }),
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFilteredProducts: () => {
    const { products, filters, sortBy, searchQuery } = get();
    
    let filtered = products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filters.category === '' || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange.min && 
                         product.price <= filters.priceRange.max;
      const matchesRating = product.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        default: return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  }
}));