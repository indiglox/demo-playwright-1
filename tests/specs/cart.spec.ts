import { swagLabs as test } from '../fixtures/swagLabs.fixtures';
import { expect } from '@playwright/test';

test(
  'Should be able to remove a product from the cart',
  { tag: ['@regression', '@P1'] },
  async ({ authInventory, authCart }) => {
    await authInventory.addToCart('Sauce Labs Backpack');
    await authInventory.addToCart('Sauce Labs Bike Light');
    await authInventory.cartButton.click();
    await authCart.removeItem('Sauce Labs Backpack');
    await authCart.assertItemIsRemoved('Sauce Labs Backpack');
  }
);

test(
  'Should be able to return to product page',
  { tag: ['@regression', '@P1'] },
  async ({ authInventory, authCart }) => {
    await authInventory.addToCart('Sauce Labs Backpack');
    await authInventory.cartButton.click();
    await authCart.continueShopping();
    // Verify that the product page is displayed by asserting the presence of the filter button
    await expect(authInventory.filterButton).toBeVisible();
  }
);

test('Should be able to checkout', { tag: ['@smoke', '@P0'] }, async ({ authInventory, authCart }) => {
  await authInventory.addToCart('Sauce Labs Backpack');
  await authInventory.addToCart('Sauce Labs Bike Light');
  await authInventory.cartButton.click();
  await authCart.checkout();
});
