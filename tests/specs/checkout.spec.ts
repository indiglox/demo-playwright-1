import { swagLabs as test } from '../fixtures/swagLabs.fixtures';
import { expect } from '@playwright/test';

test(
  'Should be able to checkout',
  { tag: ['@E2E', '@P0'] },
  async ({ login, inventory, cart, checkout, customerInfo, productData }) => {
    // Core Flow
    await inventory.addToCart(productData[0].name);
    await inventory.addToCart(productData[1].name);
    await inventory.cartButton.click();
    await cart.checkout();

    // Fill customer info
    await checkout.fillInPersonalInfo(
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.zipCode
    );

    // Validate and submit checkout
    await checkout.continue();
    await checkout.assertCheckoutOverview([productData[0], productData[1]]);

    // Complete checkout and navigate back to product page
    await checkout.finish();
    await checkout.backHome();
  }
);
