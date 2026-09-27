const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, errorMessages } = require('../utils/testData');

test.describe('Authentication', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('standard user can log in with valid credentials', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('login is rejected with invalid credentials', async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    expect(await loginPage.getErrorMessage()).toBe(
      errorMessages.invalidCredentials
    );
  });

  test('locked-out user sees the locked-out error', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toBeVisible();
    expect(await loginPage.getErrorMessage()).toBe(errorMessages.lockedOut);
  });

  test('login requires a username', async () => {
    await loginPage.login('', users.standard.password);

    expect(await loginPage.getErrorMessage()).toBe(
      errorMessages.missingUsername
    );
  });

  test('login requires a password', async () => {
    await loginPage.login(users.standard.username, '');

    expect(await loginPage.getErrorMessage()).toBe(
      errorMessages.missingPassword
    );
  });
});
