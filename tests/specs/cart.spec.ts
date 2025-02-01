import { swagLabs as test } from '../fixtures/swagLabs.fixtures';
import { expect } from '@playwright/test';

test(
  'Should be able to remove a product from the cart',
  { tag: ['@regression', '@P1'] },
  async ({ login, inventory, cart }) => {
    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');
    await inventory.cartButton.click();
    await cart.removeItem('Sauce Labs Backpack');
    await cart.assertItemIsRemoved('Sauce Labs Backpack');
  }
);

test(
  'Should be able to return to product page',
  { tag: ['@regression', '@P1'] },
  async ({ login, inventory, cart }) => {
    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.cartButton.click();
    await cart.continueShopping();
    // Verify that the product page is displayed by asserting the presence of the filter button
    await expect(inventory.filterButton).toBeVisible();
  }
);

test(
  'Should be able to checkout',
  { tag: ['@smoke', '@P0'] },
  async ({ login, cart, inventory }) => {
    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');
    await inventory.cartButton.click();
    await cart.checkout();
  }
);
