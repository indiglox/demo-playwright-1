import { swagLabs as test } from '../fixtures/swagLabs.fixtures';
import { expect } from '@playwright/test';

test('Should successfully log in with valid credentials', { tag: ['@smoke', '@P0'] }, async ({ login, page }) => {
  await login.navigate();
  await login.submitForm('standard_user', 'secret_sauce');
  await expect(page.locator('[data-test="title"]:has-text("Products")')).toBeVisible();
});

test('Should display error message for invalid credentials', { tag: ['@regression', '@P1'] }, async ({ login }) => {
  await login.navigate();
  await login.submitForm('standard_user', 'invalid_password');
  await expect(login.loginError).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});
