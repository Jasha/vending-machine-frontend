const API_ENDPOINTS = {
  // Common
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  LOGOUT_ALL: 'auth/logout/all',
  REFRESH_TOKENS: 'auth/refresh-tokens',
  USER: 'user',
  PRODUCTS: 'product',

  // Buyer
  DEPOSIT_INCREASE: 'user/deposit',
  DEPOSIT_RESET: 'user/reset',
  BUY_PRODUCT: 'product/buy',

  // Seller
  PRODUCT: 'product',
};

export default API_ENDPOINTS;
