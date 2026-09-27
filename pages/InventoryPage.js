const { BasePage } = require('./BasePage');

/**
 * InventoryPage
 *
 * Represents the products (inventory) page shown after a successful login.
 * Encapsulates listing products, sorting, adding/removing items and reading the
 * shopping cart badge.
 */
class InventoryPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  /**
   * Convert a product name into the slug SauceDemo uses in its data-test ids.
   * Example: "Sauce Labs Backpack" -> "sauce-labs-backpack".
   * @param {string} productName
   * @returns {string}
   */
  static slugFor(productName) {
    return productName.toLowerCase().replace(/[().]/g, '').replace(/\s+/g, '-');
  }

  /**
   * @returns {boolean} true when the inventory list is visible.
   */
  async isLoaded() {
    return this.inventoryContainer.isVisible();
  }

  /**
   * @returns {Promise<number>} number of products currently listed.
   */
  async getProductCount() {
    return this.inventoryItems.count();
  }

  /**
   * @returns {Promise<string[]>} the product names in display order.
   */
  async getProductNames() {
    return this.itemNames.allTextContents();
  }

  /**
   * @returns {Promise<number[]>} the product prices in display order.
   */
  async getProductPrices() {
    const raw = await this.itemPrices.allTextContents();
    return raw.map((price) => parseFloat(price.replace('$', '')));
  }

  /**
   * Sort the inventory using one of SauceDemo's sort option values:
   * 'az', 'za', 'lohi' (price low to high) or 'hilo' (price high to low).
   * @param {'az'|'za'|'lohi'|'hilo'} optionValue
   */
  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  /**
   * Add a product to the cart by its display name.
   * @param {string} productName
   */
  async addProductToCart(productName) {
    const slug = InventoryPage.slugFor(productName);
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  /**
   * Remove a product from the cart by its display name.
   * @param {string} productName
   */
  async removeProductFromCart(productName) {
    const slug = InventoryPage.slugFor(productName);
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  /**
   * @returns {Promise<number>} the numeric cart badge count (0 when hidden).
   */
  async getCartBadgeCount() {
    if ((await this.cartBadge.count()) === 0) {
      return 0;
    }
    const text = (await this.cartBadge.textContent())?.trim();
    return text ? parseInt(text, 10) : 0;
  }

  /**
   * Open the shopping cart page.
   */
  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
