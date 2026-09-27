/**
 * Centralized test data for the SauceDemo automation suite.
 *
 * Keeping users, product names and expected messages in one place makes the
 * specs data-driven and easy to maintain: a change to the site only needs to be
 * updated here rather than across every test.
 */

const BASE_URL = 'https://www.saucedemo.com';

// SauceDemo test accounts. The password is shared across all of them.
const PASSWORD = 'secret_sauce';

const users = {
  standard: {
    username: 'standard_user',
    password: PASSWORD,
  },
  lockedOut: {
    username: 'locked_out_user',
    password: PASSWORD,
  },
  problem: {
    username: 'problem_user',
    password: PASSWORD,
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: PASSWORD,
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

// Product names as they render on the inventory page.
const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
};

// The exact number of products SauceDemo lists on the inventory page.
const expectedProductCount = 6;

// Error messages surfaced by the SauceDemo login form.
const errorMessages = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials:
    'Epic sadface: Username and password do not match any user in this service',
  missingUsername: 'Epic sadface: Username is required',
  missingPassword: 'Epic sadface: Password is required',
};

// Sample buyer information used to complete the checkout flow.
const checkoutInfo = {
  firstName: 'Hamza',
  lastName: 'Khalid',
  postalCode: '54000',
};

// Confirmation text shown once an order is placed successfully.
const orderConfirmation = {
  header: 'Thank you for your order!',
};

module.exports = {
  BASE_URL,
  PASSWORD,
  users,
  products,
  expectedProductCount,
  errorMessages,
  checkoutInfo,
  orderConfirmation,
};
