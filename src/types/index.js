export * from './product.js';
export * from './user.js';
export * from './order.js';
export * from './api.js';

// Common types
export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const SORT_OPTIONS = {
  NAME: 'name',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high',
  RATING: 'rating',
  NEWEST: 'newest'
};