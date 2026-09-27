const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users } = require('../utils/testData');

/**
 * Custom Playwright fixtures.
 *
 * These extend the built-in `test` object with ready-to-use Page Objects and a
 * `loggedInPage` fixture that performs a standard-user login before the test
 * body runs. Consuming a fixture keeps specs focused on assertions instead of
 * repetitive setup, and demonstrates Playwright's dependency-injection model.
 */
const test = base.test.extend({
  // A LoginPage bound to the current page.
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // An InventoryPage bound to the current page.
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // A CartPage bound to the current page.
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // A CheckoutPage bound to the current page.
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  /**
   * A page that is already authenticated as the standard user and sitting on
   * the inventory page. The fixture yields the InventoryPage object.
   */
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(users.standard);

    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

const expect = base.expect;

module.exports = { test, expect };
