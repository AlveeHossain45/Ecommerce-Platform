const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

export const userAPI = {
  async getProfile() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  async updateProfile(profileData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  },

  async getAddresses() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch addresses');
    }

    return response.json();
  },

  async addAddress(addressData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    });

    if (!response.ok) {
      throw new Error('Failed to add address');
    }

    return response.json();
  },

  async updateAddress(id, addressData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/addresses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    });

    if (!response.ok) {
      throw new Error('Failed to update address');
    }

    return response.json();
  },

  async deleteAddress(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/addresses/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete address');
    }
  }
};