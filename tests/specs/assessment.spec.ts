import { swagLabs as test, expect } from '../fixtures/swagLabs.fixtures';

test.describe('Assessment Task: Senior QA Automation Engineer', () => {
  test('Visual: Add to Cart button changes color', async ({ authInventory }) => {
    await test.step('View product details', async () => {
      await authInventory.viewProductDetails('Sauce Labs Backpack');
    });

    await test.step('Verify Add to Cart button color', async () => {
      await expect(authInventory.addToCartButton).toHaveText(/ADD TO CART/i);
      await expect(authInventory.addToCartButton).toHaveCSS('color', 'rgb(19, 35, 34)');
    });

    await test.step('Add to Cart', async () => {
      await authInventory.addToCartButton.click();
    });

    await test.step('Verify Remove button color', async () => {
      await expect(authInventory.removeButton).toHaveText(/REMOVE/i);
      await expect(authInventory.removeButton).toHaveCSS('color', 'rgb(226, 35, 26)');
    });
  });

  //Option C (Performance):
  test('Performance: Inventory Page loads within 2.0 seconds', async ({ authInventory }) => {
    const timing = await authInventory.page.evaluate(() => {
      const perf = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return perf ? perf.loadEventEnd - perf.startTime : 0;
    });

    console.log(`Inventory Load Time: ${timing}ms`);

    expect(timing).toBeLessThan(2000);
  });
});
