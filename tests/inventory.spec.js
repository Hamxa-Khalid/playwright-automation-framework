const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, products, expectedProductCount } = require('../utils/testData');

test.describe('Inventory page', () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(users.standard);

    inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });

  test(`lists exactly ${expectedProductCount} products`, async () => {
    expect(await inventoryPage.getProductCount()).toBe(expectedProductCount);
  });

  test('sorts products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('adds an item and reflects it in the cart badge', async () => {
    await inventoryPage.addProductToCart(products.backpack);

    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });

  test('removes an item and clears the cart badge', async () => {
    await inventoryPage.addProductToCart(products.backpack);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    await inventoryPage.removeProductFromCart(products.backpack);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('cart badge counts multiple added items', async () => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.bikeLight);
    await inventoryPage.addProductToCart(products.boltTShirt);

    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
  });
});
