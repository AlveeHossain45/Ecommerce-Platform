export const i18n = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Operation completed successfully',
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit'
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?'
    },
    cart: {
      addToCart: 'Add to Cart',
      viewCart: 'View Cart',
      checkout: 'Checkout',
      emptyCart: 'Your cart is empty',
      subtotal: 'Subtotal',
      total: 'Total'
    },
    product: {
      price: 'Price',
      quantity: 'Quantity',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      reviews: 'Reviews',
      description: 'Description',
      features: 'Features',
      specifications: 'Specifications'
    }
  },
  // Add more languages as needed
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      success: 'Operación completada con éxito'
    }
  }
};

/**
 * Finds a translation string from the i18n object.
 * @param {string} lang - The language code (e.g., 'en', 'es').
 * @param {string} key - The key for the translation string (e.g., 'common.loading').
 * @returns {string} The translated string or the key itself if not found.
 */
export const getTranslation = (lang, key) => {
  const keys = key.split('.');
  
  const findValue = (obj, path) => path.reduce((current, k) => current?.[k], obj);

  // Try to find translation in the selected language
  let value = findValue(i18n[lang], keys);

  // If not found, fall back to English
  if (value === undefined) {
    value = findValue(i18n.en, keys);
  }

  // If still not found, return the key itself
  return value || key;
};