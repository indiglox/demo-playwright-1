import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/v1/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('#login-button');

  // Wait for navigation
  await page.waitForURL('**/inventory.html');

  const cookies = await page.context().cookies();
  const localStorage = await page.evaluate('JSON.stringify(localStorage)');

  console.log('COOKIES:', JSON.stringify(cookies, null, 2));
  console.log('LOCAL STORAGE:', localStorage);

  await browser.close();
})();
