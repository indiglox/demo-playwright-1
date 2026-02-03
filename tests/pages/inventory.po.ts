import { Locator, Page, expect } from '@playwright/test';
import { FilterOption } from '../data/test.data';

export class InventoryPage {
  readonly page: Page;
  readonly filterButton: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly cartButton: Locator;
  readonly inventoryItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.filterButton = page.locator('[data-test="product-sort-container"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
  }

  private getProductItem(productName: string) {
    return this.inventoryItem.filter({ hasText: productName });
  }

  async viewProductDetails(productName: string) {
    const item = this.getProductItem(productName);
    await item.locator('[data-test="inventory-item-name"]').click();
  }

  /**
   * Adds a product to the cart by name
   * @param productName - Name of the product to add
   */
  async addToCart(productName: string) {
    // Get current cart item count
    let cartItemCount: number = parseInt((await this.cartButton.innerText()) || '0');

    // Find the product card with matching name
    const item = this.getProductItem(productName);

    // Click the "Add to cart" button and increment cart count
    await item
      .getByRole('button', { name: 'Add to cart' })
      .click()
      .then(() => {
        cartItemCount++;
      });

    // Verify cart count has increased
    await expect(this.cartButton).toHaveText(cartItemCount.toString());
  }

  /**
   * Asserts that a product is added to the cart by asserting the presence of the "Remove" button
   * @param productName
   */
  async assertProductIsAddedToCart(productName: string) {
    const item = this.getProductItem(productName);
    await expect(item.filter({ hasText: 'remove' })).toBeVisible();
  }

  async assertProductIsRemovedFromCart(productName: string) {
    const item = this.getProductItem(productName);
    await expect(item.filter({ hasText: 'Add to cart' })).toBeVisible();
  }

  /**
   * Removes a product from the cart by name
   * @param productName - Name of the product to remove
   */
  async removeFromCart(productName: string) {
    // Get current cart item count
    let cartItemCount: number = parseInt((await this.cartButton.innerText()) || '0');

    // Find the product card with matching name
    const item = this.getProductItem(productName);

    // Click the "Remove" button and decrement cart count
    await item
      .getByRole('button', { name: 'Remove' })
      .click()
      .then(() => {
        cartItemCount--;
      });

    // Verify cart count has decreased
    if (cartItemCount === 0) {
      await expect(this.cartButton.filter({ hasText: cartItemCount.toString() })).toBeHidden();
    } else {
      await expect(this.cartButton).toHaveText(cartItemCount.toString());
    }
  }

  /**
   * Filters products by the specified filter option
   * @param filter - The filter option to apply (e.g., "A-Z", "Z-A", etc.)
   */
  async filterBy(filter: FilterOption) {
    // Click the filter button to open options
    await this.filterButton.selectOption({ value: filter });
  }

  /**
   * Retrieves product data (names or prices) from the inventory
   * @param dataType - Type of data to retrieve ("name" or "price")
   * @returns Promise<string[]> Array of product names or prices
   */
  private async getProductData(dataType: 'name' | 'price'): Promise<string[]> {
    let data: string[] = [];

    // Get all inventory items
    const items = await this.inventoryItem.all();

    // Collect requested data from each item
    for (const item of items) {
      if (dataType === 'name') {
        const name = await item.locator('[data-test="inventory-item-name"]').innerText();
        data.push(name);
      } else {
        const price = await item.locator('[data-test="inventory-item-price"]').innerText();
        data.push(price);
      }
    }
    return data;
  }

  /**
   * Verifies products are filtered alphabetically by name
   * @param filter - The filter option ("A-Z" for ascending, "Z-A" for descending)
   */
  async assertFilteredByName(filter: FilterOption) {
    // Get filtered product names
    const filteredProductData = await this.getProductData('name');
    const count = filteredProductData.length;

    // Verify sorting order
    if (filter === 'az') {
      for (let i = 0; i < count; i++) {
        const productName = filteredProductData[i];
        await expect(this.inventoryItem.nth(i)).toContainText(productName);
      }
    }
    if (filter === 'za') {
      for (let i = count - 1; i >= 0; i--) {
        const productName = filteredProductData[i];
        await expect(this.inventoryItem.nth(i)).toContainText(productName);
      }
    }
  }

  /**
   * Verifies products are filtered by price
   * @param filter - The filter option ("Low to High" or "High to Low")
   */
  async assertFilteredByPrice(filter: FilterOption) {
    // Get filtered product prices
    const filteredProductData = await this.getProductData('price');
    const count = filteredProductData.length;

    // Verify sorting order
    if (filter === 'lohi') {
      for (let i = 0; i < count; i++) {
        const price = parseFloat(filteredProductData[i].split('$')[1]);
        await expect(this.inventoryItem.nth(i)).toContainText(price.toString());
      }
    }
    if (filter === 'hilo') {
      for (let i = count - 1; i >= 0; i--) {
        const price = parseFloat(filteredProductData[i].split('$')[1]);
        await expect(this.inventoryItem.nth(i)).toContainText(price.toString());
      }
    }
  }
}
