import { test as base, Page, expect } from '@playwright/test';
import { LoginPage, CartPage, InventoryPage, CheckoutPage } from '../pages/';
import { type CustomerInfo, customerInfo, type ProductData, productData } from '../data/test.data';

type SwagLabs = {
  authenticated: Page;
  login: LoginPage;
  customerInfo: CustomerInfo;
  productData: ProductData[];
  // Regular page objects
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
  // Authenticated page objects
  authInventory: InventoryPage;
  authCart: CartPage;
  authCheckout: CheckoutPage;
};

const swagLabs = base.extend<SwagLabs>({
  authenticated: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'tests/.auth/user.json',
    });
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/inventory.html');
    await use(page);
    await context.close();
  },

  // Regular page objects
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Authenticated page objects
  authInventory: async ({ authenticated }, use) => {
    await use(new InventoryPage(authenticated));
  },

  authCart: async ({ authenticated }, use) => {
    await use(new CartPage(authenticated));
  },

  authCheckout: async ({ authenticated }, use) => {
    await use(new CheckoutPage(authenticated));
  },

  productData: async ({}, use) => {
    await use(productData);
  },

  customerInfo: async ({}, use) => {
    await use(customerInfo());
  },
});

export { swagLabs, expect };
