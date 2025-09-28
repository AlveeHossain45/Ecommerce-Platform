export const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price);
  };
  
  export const formatDate = (date, format = 'short') => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: format,
    }).format(new Date(date));
  };
  
  export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };