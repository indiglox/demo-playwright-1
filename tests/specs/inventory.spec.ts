import { swagLabs as test } from '../fixtures/swagLabs.fixtures';

test('Should add a product to the cart', { tag: ['@smoke', '@P0'] }, async ({ authInventory }) => {
  const productName = 'Sauce Labs Backpack';
  await authInventory.addToCart(productName);
  await authInventory.assertProductIsAddedToCart(productName);
});

test('Should remove a product from the cart', { tag: ['@regression', '@P1'] }, async ({ authInventory }) => {
  const productName = 'Sauce Labs Backpack';
  await authInventory.addToCart(productName);
  await authInventory.removeFromCart(productName);
  await authInventory.assertProductIsRemovedFromCart(productName);
});
