const { BasePage } = require('./BasePage');

/**
 * LoginPage
 *
 * Encapsulates the SauceDemo login screen: the username/password fields, the
 * submit button and the error banner shown on failed authentication.
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Open the login page (the SauceDemo home route is the login form).
   */
  async open() {
    await this.goto('/');
  }

  /**
   * Fill the credentials and submit the login form.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Convenience helper that opens the page and logs in as the given user.
   * @param {{ username: string, password: string }} user
   */
  async loginAs(user) {
    await this.open();
    await this.login(user.username, user.password);
  }

  /**
   * Read the text of the login error banner.
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }
}

module.exports = { LoginPage };
