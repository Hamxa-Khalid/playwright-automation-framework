const { test, expect } = require('../fixtures/fixtures');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { products, checkoutInfo, orderConfirmation } = require('../utils/testData');

/**
 * The checkout suite uses the custom `loggedInPage` fixture so each test starts
 * already authenticated as the standard user on the inventory page. This keeps
 * the specs focused on the checkout journey itself.
 */
test.describe('Checkout flow', () => {
  test('completes an end-to-end purchase', async ({ page, loggedInPage }) => {
    const inventoryPage = loggedInPage;
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add two products and open the cart.
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.fleeceJacket);
    await inventoryPage.openCart();

    expect(await cartPage.getItemCount()).toBe(2);

    // Move through the checkout steps.
    await cartPage.checkout();
    await checkoutPage.fillInformation(checkoutInfo);

    await expect(checkoutPage.finishButton).toBeVisible();
    await checkoutPage.finish();

    // Confirm the order completed successfully.
    await expect(checkoutPage.completeHeader).toBeVisible();
    expect(await checkoutPage.getConfirmationMessage()).toBe(
      orderConfirmation.header
    );
    await expect(page).toHaveURL(/checkout-complete\.html/);
  });

  test('requires buyer information before continuing', async ({
    page,
    loggedInPage,
  }) => {
    const inventoryPage = loggedInPage;
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();

    // Submit the information form with an empty first name.
    await checkoutPage.fillInformation({
      firstName: '',
      lastName: checkoutInfo.lastName,
      postalCode: checkoutInfo.postalCode,
    });

    await expect(checkoutPage.errorMessage).toBeVisible();
    expect(await checkoutPage.getErrorMessage()).toContain('First Name is required');
  });
});
