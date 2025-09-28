import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      profile: null,
      addresses: [],
      orders: [],
      wishlist: [],
      preferences: {
        theme: 'light',
        language: 'en',
        currency: 'USD',
        notifications: {
          email: true,
          sms: false
        }
      },
      
      setProfile: (profile) => set({ profile }),
      
      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
      })),
      
      setAddresses: (addresses) => set({ addresses }),
      
      addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, address]
      })),
      
      updateAddress: (id, updates) => set((state) => ({
        addresses: state.addresses.map(addr =>
          addr.id === id ? { ...addr, ...updates } : addr
        )
      })),
      
      removeAddress: (id) => set((state) => ({
        addresses: state.addresses.filter(addr => addr.id !== id)
      })),
      
      setOrders: (orders) => set({ orders }),
      
      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders]
      })),
      
      setWishlist: (wishlist) => set({ wishlist }),
      
      addToWishlist: (product) => set((state) => ({
        wishlist: [...state.wishlist, product]
      })),
      
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter(item => item.id !== productId)
      })),
      
      updatePreferences: (preferences) => set((state) => ({
        preferences: { ...state.preferences, ...preferences }
      }))
    }),
    {
      name: 'user-storage'
    }
  )
);