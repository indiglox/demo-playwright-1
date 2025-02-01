import { Locator, Page, expect } from '@playwright/test';

/**
 * Page Object Model for the Login page
 */
export class LoginPage {
  private readonly page: Page;
  private readonly loginButton: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;

  /**
   * Initializes the LoginPage instance
   * @param page - The Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
  }

  /**
   * Navigates to the login page
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Submits the login form with the provided credentials
   * @param username - The username to use for login
   * @param password - The password to use for login
   */
  async submitForm(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Performs the entire login process
   * @param username - The username to use for login
   * @param password - The password to use for login
   */
  async login(username: string, password: string): Promise<void> {
    try {
      await this.navigate();
      await this.submitForm(username, password);
      await expect(this.page.locator('[data-test="title"]:has-text("Products")')).toBeVisible();
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}
