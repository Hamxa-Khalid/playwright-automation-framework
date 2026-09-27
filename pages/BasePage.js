/**
 * BasePage
 *
 * Common behaviour shared by every Page Object. Concrete pages extend this
 * class so navigation and other cross-cutting helpers live in a single place.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the configured baseURL.
   * @param {string} path
   */
  async goto(path = '/') {
    await this.page.goto(path);
  }

  /**
   * Return the current page title.
   * @returns {Promise<string>}
   */
  async getTitle() {
    return this.page.title();
  }

  /**
   * Return the current page URL.
   * @returns {string}
   */
  getUrl() {
    return this.page.url();
  }
}

module.exports = { BasePage };
