const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { users, products } = require('../utils/testData');

test.describe('Shopping cart', () => {
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(users.standard);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });

  test('adds multiple items and verifies them in the cart', async () => {
    const expectedItems = [products.backpack, products.bikeLight];

    for (const item of expectedItems) {
      await inventoryPage.addProductToCart(item);
    }
    await inventoryPage.openCart();

    expect(await cartPage.getItemCount()).toBe(expectedItems.length);
    for (const item of expectedItems) {
      expect(await cartPage.hasItem(item)).toBe(true);
    }
  });

  test('removes an item from within the cart', async () => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.bikeLight);
    await inventoryPage.openCart();

    expect(await cartPage.getItemCount()).toBe(2);

    await cartPage.removeItem(products.backpack);

    expect(await cartPage.getItemCount()).toBe(1);
    expect(await cartPage.hasItem(products.backpack)).toBe(false);
    expect(await cartPage.hasItem(products.bikeLight)).toBe(true);
  });

  test('continue shopping returns to the inventory page', async ({ page }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();

    await cartPage.continueShopping();

    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
