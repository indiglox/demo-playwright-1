import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './pages/login.po';

const authFile = 'tests/.auth/user.json';

async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com/v1/');
  await loginPage.submitForm('standard_user', 'secret_sauce');
  await page.waitForURL('**/inventory.html');

  // storageState() captures cookies and standard storage
  await page.context().storageState({ path: authFile });
  await browser.close();
  console.log('Auth state saved to ' + authFile);
}

export default globalSetup;
