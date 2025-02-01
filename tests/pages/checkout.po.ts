import { Locator, Page, expect } from '@playwright/test';
import { productData, type ProductData } from '../data/test.data';
import { calculateTax } from '../utils/taxCalculator';

export class CheckoutPage {
  private readonly page: Page;

  // Locator definitions
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly finishButton: Locator;
  private readonly backHomeButton: Locator;
  private readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  /**
   * Fills in the personal information fields
   * @param firstName - The first name to enter
   * @param lastName - The last name to enter
   * @param zipCode - The zip code to enter
   */
  async fillInPersonalInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  /**
   * Clicks the Continue button and verifies the next page is loaded
   */
  async continue(): Promise<void> {
    await this.continueButton.click();
    await expect(this.title).toContainText('Checkout: Overview');
  }

  /**
   * Asserts the checkout overview page displays correct product information
   * @param data - Array of product data objects
   */
  async assertCheckoutOverview(data: ProductData[]): Promise<void> {
    await expect(this.title).toContainText('Checkout: Overview');

    const itemTotal = data.reduce((total, product) => total + product.price, 0);
    const taxAmount = calculateTax(itemTotal);
    const totalPrice = itemTotal + taxAmount;

    for (const product of data) {
      const cartItem = this.page.locator(`.cart_item:has-text("${product.name}")`);
      await expect(cartItem).toContainText(product.name);
      await expect(cartItem).toContainText(product.price.toString());
    }

    await expect(this.page.locator('.summary_subtotal_label')).toContainText(itemTotal.toString());
    await expect(this.page.locator('.summary_tax_label')).toContainText(taxAmount.toString());
    await expect(this.page.locator('.summary_total_label')).toContainText(totalPrice.toString());
  }

  /**
   * Clicks the Finish button and verifies the order is complete
   */
  async finish(): Promise<void> {
    await this.finishButton.click();
    await expect(this.title).toContainText('Checkout: Complete!');
  }

  /**
   * Clicks the Back Home button and verifies navigation to products page
   */
  async backHome(): Promise<void> {
    await this.backHomeButton.click();
    await expect(this.title).toContainText('Products');
  }

  /**
   * Clicks the Cancel button and verifies navigation away from checkout
   */
  async cancel(): Promise<void> {
    const currentTitle = await this.title.innerText();
    const currentUrl = this.page.url();

    await this.cancelButton.click();
    await expect(this.title).not.toContainText(currentTitle);
    expect(this.page.url()).not.toBe(currentUrl);
  }
}
