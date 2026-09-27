const { BasePage } = require('./BasePage');

/**
 * CheckoutPage
 *
 * Covers the two-step SauceDemo checkout: the buyer information form
 * (step one) and the order overview / finish action (step two), through to the
 * order confirmation screen.
 */
class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Step one: buyer information.
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step two: order overview.
    this.finishButton = page.locator('[data-test="finish"]');
    this.summarySubtotal = page.locator('[data-test="subtotal-label"]');
    this.summaryTotal = page.locator('[data-test="total-label"]');

    // Confirmation.
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Fill and submit the buyer information form.
   * @param {{ firstName: string, lastName: string, postalCode: string }} info
   */
  async fillInformation(info) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }

  /**
   * Read the checkout error banner text.
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  /**
   * Confirm the order from the overview step.
   */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Read the confirmation header shown after a successful purchase.
   * @returns {Promise<string>}
   */
  async getConfirmationMessage() {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }
}

module.exports = { CheckoutPage };
