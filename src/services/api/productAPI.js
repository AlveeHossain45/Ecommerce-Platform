const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

export const productAPI = {
  async getProducts(filter) {
    const queryParams = new URLSearchParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

  async getProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },

  async getFeaturedProducts() {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }

    return response.json();
  },

  async searchProducts(query) {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }

    return response.json();
  }
};