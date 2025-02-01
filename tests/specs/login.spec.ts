import { LoginPage } from '../pages/';
import { expect, test } from '@playwright/test';

test(
  'Should successfully log in with valid credentials',
  { tag: ['@smoke', '@P0'] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.submitForm('standard_user', 'secret_sauce');
    await expect(page.locator('[data-test="title"]:has-text("Products")')).toBeVisible();
  }
);

test(
  'Should display error message for invalid credentials',
  { tag: ['@regression', '@P1'] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.submitForm('standard_user', 'invalid_password');
    await expect(
      page.locator(
        '[data-test="error"]:has-text("Username and password do not match any user in this service")'
      )
    ).toBeVisible();
  }
);
