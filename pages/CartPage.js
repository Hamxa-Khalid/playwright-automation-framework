const { BasePage } = require('./BasePage');

/**
 * CartPage
 *
 * Represents the shopping cart page: the list of items added, per-item removal
 * and the continue-shopping / checkout controls.
 */
class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * @returns {Promise<number>} number of line items in the cart.
   */
  async getItemCount() {
    return this.cartItems.count();
  }

  /**
   * @returns {Promise<string[]>} the names of the products in the cart.
   */
  async getItemNames() {
    return this.cartItemNames.allTextContents();
  }

  /**
   * @param {string} productName
   * @returns {Promise<boolean>} true when the product is present in the cart.
   */
  async hasItem(productName) {
    const names = await this.getItemNames();
    return names.includes(productName);
  }

  /**
   * Remove a product from the cart by its display name.
   * @param {string} productName
   */
  async removeItem(productName) {
    const slug = productName
      .toLowerCase()
      .replace(/[().]/g, '')
      .replace(/\s+/g, '-');
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  /**
   * Proceed to the checkout information step.
   */
  async checkout() {
    await this.checkoutButton.click();
  }

  /**
   * Return to the inventory page.
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { CartPage };
