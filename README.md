# Playwright Swag Labs Demo

This repository demonstrates the use of Playwright for end-to-end testing using Swag Labs, a sample e-commerce application. The project showcases various Playwright features and best practices for testing modern web applications.

## Purpose

This repository serves as a demonstration of Playwright's capabilities for:
- Cross-browser testing
- End-to-end testing of e-commerce workflows
- Parallel test execution
- Test reporting

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/playwright-swaglabs-demo.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests

The tests can be executed using the following commands:

```bash
npx playwright test
```

To run tests in a specific browser:
```bash
npx playwright test --browser=chromium
```

To run tests in headless mode:
```bash
npx playwright test --browser=chromium --headless
```

## Features

### Test Configuration
- **Multi-browser support**: Tests are configured to run on Chromium, Firefox, and WebKit
- **Desktop viewports**: Uses standard desktop browser configurations
- **Parallel execution**: Tests run in parallel for faster execution
- **Retries on CI**: Configured to retry failed tests on CI environments

### Test Cases

#### Example Tests
- `example.spec.ts`: Demonstrates basic Playwright functionality
  - Tests page title
  - Tests navigation through link clicks

#### Checkout Flow
- `checkout.spec.ts`: Tests the complete checkout flow
  - Adding products to cart
  - Navigating to checkout
  - Filling customer information
  - Verifying checkout overview
  - Completing the purchase

### Reporting
- Uses Playwright's built-in `list` reporter for test results
- Generates HTML reports for detailed test analysis

## Project Structure
