import { create } from 'zustand';

export const useUIStore = create((set) => ({
  modal: {
    isOpen: false,
    type: null,
    data: null
  },
  loading: {
    global: false,
    page: false,
    component: false
  },
  notification: {
    show: false,
    type: 'info',
    message: '',
    duration: 3000
  },
  sidebar: {
    isOpen: false,
    type: 'main'
  },
  
  openModal: (type, data = null) => set({ 
    modal: { isOpen: true, type, data } 
  }),
  
  closeModal: () => set({ 
    modal: { isOpen: false, type: null, data: null } 
  }),
  
  setLoading: (key, value) => set((state) => ({
    loading: { ...state.loading, [key]: value }
  })),
  
  showNotification: (message, type = 'info', duration = 3000) => set({
    notification: { show: true, message, type, duration }
  }),
  
  hideNotification: () => set({
    notification: { show: false, message: '', type: 'info' }
  }),
  
  toggleSidebar: (type = 'main') => set((state) => ({
    sidebar: { 
      isOpen: !state.sidebar.isOpen,
      type: state.sidebar.isOpen ? state.sidebar.type : type
    }
  }))
}));