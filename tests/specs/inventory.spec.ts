import { swagLabs as test } from '../fixtures/swagLabs.fixtures';

test(
  'Should add a product to the cart',
  { tag: ['@smoke', '@P0'] },
  async ({ login, inventory }) => {
    const productName = 'Sauce Labs Backpack';
    await inventory.addToCart(productName);
    await inventory.assertProductIsAddedToCart(productName);
  }
);

test(
  'Should remove a product from the cart',
  { tag: ['@regression', '@P1'] },
  async ({ login, inventory }) => {
    const productName = 'Sauce Labs Backpack';
    await inventory.addToCart(productName);
    await inventory.removeFromCart(productName);
    await inventory.assertProductIsRemovedFromCart(productName);
  }
);
