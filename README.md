# Playwright Test Automation for [Swag Labs: Sauce Demo](https://www.saucedemo.com/)

This repository demonstrates end-to-end (E2E) test automation using Playwright for the [Swag Labs: Sauce Demo](https://www.saucedemo.com/) web application. It includes test cases for various user journeys, such as login, inventory management, cart operations, filtering, and checkout.

## Project Overview

This project leverages Playwright to create a robust test suite for [Swag Labs: Sauce Demo](https://www.saucedemo.com/). The tests are organized into multiple test files, each focusing on a specific feature or user flow. The project uses TypeScript for better code quality and maintainability.

## Features

- **Test Cases**: Covers critical user journeys, including login, inventory, cart, filtering, and checkout.
- **Page Object Model (POM)**: Implements a clean architecture using the Page Object Model for better code organization.
- **Fixtures and Data-Driven Testing**: Utilizes Playwright fixtures and external data files for parameterized testing.
- **Tagging and Prioritization**: Tests are tagged with priorities (e.g., `@P0`, `@P1`) and categories (e.g., `@smoke`, `@regression`, `@E2E`).
- **CI/CD Pipeline**: GitHub Actions integration for automated testing.

## Getting Started

1. **Prerequisites**:
   - Node.js (LTS version or higher)
   - npm or yarn
   - Playwright installed globally or as a dev dependency

2. **Installation**:
   ```bash
   yarn install
   ```

3. **Running Tests**:
   ```bash
   yarn test
   ```

## Test Scenarios

The test suite is divided into multiple files, each focusing on a specific feature or user flow.

### 1. **Login Scenarios (`login.spec.ts`)**

- **Test Case 1**: Successful login with valid credentials.
  - Verify that the user is redirected to the products page after logging in with valid credentials.
- **Test Case 2**: Login with invalid credentials.
  - Verify that an error message is displayed when invalid credentials are used.

### 2. **Inventory Management (`inventory.spec.ts`)**

- **Test Case 1**: Add a product to the cart.
  - Verify that a product can be successfully added to the cart.
- **Test Case 2**: Remove a product from the cart.
  - Verify that a product is removed from the cart when the remove button is clicked.

### 3. **Cart Operations (`cart.spec.ts`)**

- **Test Case 1**: Remove a product from the cart.
  - Verify that a product is removed from the cart.
- **Test Case 2**: Return to the product page.
  - Verify that the user can navigate back to the products page from the cart.
- **Test Case 3**: Checkout.
  - Verify that the user can proceed to checkout from the cart.

### 4. **Checkout Process (`checkout.spec.ts`)**

- **Test Case 1**: End-to-end checkout flow.
  - Verify that the user can complete the checkout process, including:
    - Adding products to the cart.
    - Navigating to the cart.
    - Proceeding to checkout.
    - Filling in personal information.
    - Verifying the checkout overview.
    - Completing the checkout and returning to the products page.

### 5. **Filtering Products (`filter.spec.ts`)**

- **Test Case 1**: Filter products by name (ascending and descending).
  - Verify that products can be filtered by name in both ascending and descending order.
- **Test Case 2**: Filter products by price (ascending and descending).
  - Verify that products can be filtered by price in both ascending and descending order.

## Contributions

Contributions are welcome! If you have suggestions, improvements, or bug reports, feel free to open an issue or submit a pull request.

---
