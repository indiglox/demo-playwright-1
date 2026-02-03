import { swagLabs as test } from '../fixtures/swagLabs.fixtures';

test(
  'Checkout Flow - Should be able to checkout',
  { tag: ['@E2E', '@P0'] },
  async ({ authInventory, authCart, authCheckout, customerInfo, productData }) => {
    // Core Flow
    await authInventory.addToCart(productData[0].name);
    await authInventory.addToCart(productData[1].name);
    await authInventory.cartButton.click();
    await authCart.checkout();

    // Fill customer info
    await authCheckout.fillInPersonalInfo(customerInfo.firstName, customerInfo.lastName, customerInfo.zipCode);

    // Validate and submit checkout
    await authCheckout.continue();
    await authCheckout.assertCheckoutOverview([productData[0], productData[1]]);

    // Complete checkout and navigate back to product page
    await authCheckout.finish();
    await authCheckout.backHome();
  }
);
