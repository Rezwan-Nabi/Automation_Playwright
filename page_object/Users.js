const USERS = {
  locked:      { username: 'locked_out_user',       password: 'secret_sauce' },
  standard:    { username: 'standard_user',          password: 'secret_sauce' },
  glitch:      { username: 'performance_glitch_user',password: 'secret_sauce' },
};

const CHECKOUT_INFO = {
  firstName: 'Rezwan',
  lastName:  'Nabi',
  zip:       '1229',
};

// Three products to add in Q2
const Q2_PRODUCTS = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
];

const MESSAGES = {
  lockedError:    'Epic sadface: Sorry, this user has been locked out.',
  orderSuccess:   'Thank you for your order!',
  orderDispatched:'Your order has been dispatched',
};

const URLS = {
  base:        'https://www.saucedemo.com',
  login:       'https://www.saucedemo.com/',
  inventory:   'https://www.saucedemo.com/inventory.html',
  cart:        'https://www.saucedemo.com/cart.html',
  checkoutOne: 'https://www.saucedemo.com/checkout-step-one.html',
  checkoutTwo: 'https://www.saucedemo.com/checkout-step-two.html',
  complete:    'https://www.saucedemo.com/checkout-complete.html',
};

module.exports = { USERS, CHECKOUT_INFO, Q2_PRODUCTS, MESSAGES, URLS };