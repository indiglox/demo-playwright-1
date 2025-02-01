import { test as base } from '@playwright/test';
import { LoginPage, CartPage, InventoryPage, CheckoutPage } from '../pages/';
import { type CustomerInfo, customerInfo, type ProductData, productData } from '../data/test.data';

type SwagLabs = {
  login: LoginPage;
  customerInfo: CustomerInfo;
  cart: CartPage;
  inventory: InventoryPage;
  checkout: CheckoutPage;
  productData: ProductData[];
};

const swagLabs = base.extend<SwagLabs>({
  login: async ({ page }, use) => {
    // Create a new instance of the login page
    const loginPage = new LoginPage(page);
    // Navigate to the login page and perform login
    await loginPage.login('standard_user', 'secret_sauce');
    // Provide the login page instance to tests
    use(loginPage);
  },

  inventory: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    use(inventoryPage);
  },

  checkout: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    use(checkoutPage);
  },

  cart: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    use(cartPage);
  },

  productData: async ({}, use) => {
    // Fetch static product data from the test.data.ts file
    const data: ProductData[] = productData;
    use(data);
  },
  customerInfo: async ({}, use) => {
    // Generate customer info data using Faker.js
    const data = customerInfo();
    use(data);
  },
});

export { swagLabs };
