export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 1.0 },
  { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.85 },
  { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.73 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', exchangeRate: 110.5 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', exchangeRate: 1.25 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 1.35 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', exchangeRate: 6.45 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', exchangeRate: 74.5 }
];

export const formatCurrency = (
  amount,
  currencyCode = 'USD',
  locale = 'en-US'
) => {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  const convertedAmount = amount * currency.exchangeRate;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(convertedAmount);
};

export const convertCurrency = (
  amount,
  fromCurrency,
  toCurrency
) => {
  const from = currencies.find(c => c.code === fromCurrency) || currencies[0];
  const to = currencies.find(c => c.code === toCurrency) || currencies[0];
  
  const amountInUSD = amount / from.exchangeRate;
  return amountInUSD * to.exchangeRate;
};

export const getCurrencySymbol = (currencyCode) => {
  return currencies.find(c => c.code === currencyCode)?.symbol || '$';
};