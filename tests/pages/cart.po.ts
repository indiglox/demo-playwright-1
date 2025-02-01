import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartItemCount: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemCount = page.locator('.shopping_cart_badge');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue shopping',
    });
  }

  /**
   * Removes a product from the cart by name
   * @param productName - Name of the product to remove
   */
  async removeItem(productName: string) {
    // Get current cart item count
    let cartItemCount: number = parseInt((await this.cartItemCount.innerText()) || '0');
    const item = this.page.locator(`.cart_item:has-text("${productName}")`);

    // Click the "Remove" button and decrement cart count
    await item
      .getByRole('button', { name: 'Remove' })
      .click()
      .then(() => {
        cartItemCount--;
      });

    // Verify cart count has decreased
    await expect(this.cartItemCount).toHaveText(cartItemCount.toString());
  }

  /**
   * Verifies a product has been removed from the cart
   * @param productName - Name of the product to check
   */
  async assertItemIsRemoved(productName: string) {
    await expect(this.page.locator(`.cart_item:has-text("${productName}")`)).toBeHidden();
  }

  /**
   * Navigates to the checkout page
   */
  async checkout() {
    await this.checkoutButton.click();
    await expect(
      this.page.locator('[data-test="title"]:has-text("Checkout: Your Information")')
    ).toBeVisible();
  }

  /**
   * Navigates back to the product page
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.page.locator('[data-test="title"]:has-text("Product")')).toBeVisible();
  }
}
