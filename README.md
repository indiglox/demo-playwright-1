## Assessment Task: Senior QA Automation Engineer - "Project SpeedLabs"

#### Overview

This repository contains the solution for the "Project SpeedLabs" assessment, implementing a high-performance, robust
test suite for the SauceDemo e-commerce platform using **Playwright with TypeScript**.

#### Part 1: Test Strategy & Architecture

##### Framework Choice: Playwright + TypeScript

- **Speed**: Single WebSocket connection for fast execution and low flakiness compared to HTTP-based protocols
  (Selenium).
- **Modern Web**: Native support for auto-waiting, network interception, and mobile emulation.
- **Type Safety**: TypeScript ensures code quality and maintainability in larger suites.

##### Hybrid Auth Strategy (Risk vs. Reward)

We bypass the UI for the login step (Setup) but test it via the UI in critical paths (Smoke).

- **Reward**: Drastically reduced execution time (~500ms vs 3-5s per test).
- **Risk**: Potential drift if the login cookie logic changes on the backend.
- **Mitigation**: We use a `global.setup.ts` to perform _one_ real UI login per run, ensuring the tokens we inject are
  fresh and valid.

##### Test Plan (Checkout Flow)

1.  **Pre-condition**: User is logged in programmatically (Inventory Page).
2.  **Action**: Add "Sauce Labs Backpack" to cart.
3.  **Action**: Navigate to Cart -> Checkout.
4.  **Action**: Fill Personal Info (Dummy Data) -> Continue.
5.  **Verification**: Validate Product in Overview.
6.  **Action**: Finish.
7.  **Assertion**: Verify "Thank you for your order" message.

#### Part 2: The Framework & The Curveball (Programmatic Login)

**Constraint**: "Do NOT use the UI to log in for your main tests."

##### Implementation

We utilize Playwright's **Global Setup** pattern to solve the "Anti-Cheat" requirement robustly.

1.  **Capture**: `tests/global.setup.ts` performs a single UI login and saves the authorized browser state
    (cookies/localStorage) to `tests/.auth/user.json`.
2.  **Inject**: The `authenticated` fixture in `tests/fixtures/swagLabs.fixtures.ts` initializes a new browser context
    _using_ this saved state file.
    ```typescript
    // swagLabs.fixtures.ts
    authenticated: async ({ browser }, use) => {
      const context = await browser.newContext({ storageState: 'tests/.auth/user.json' });
      const page = await context.newPage();
      await page.goto('.../inventory.html'); // Lands directly on Inventory, logged in.
      await use(page);
    };
    ```
3.  **Result**: Tests start instantly on the Inventory page, skipping the login form entirely.

**Robust Selectors**: All locators use `data-test` attributes (e.g., `[data-test="add-to-cart-sauce-labs-backpack"]`) to
ensure resilience against CSS/layout changes.

#### Part 3: UX/UI & Visual Validation

##### Visual Logic Check

- **Test**: `tests/specs/assessment.spec.ts` -> "Visual: Add to Cart button changes color"
- **Logic**:
  1.  Asserts button text is "ADD TO CART".
  2.  Asserts button CSS color is valid.
  3.  Clicks button.
  4.  Asserts button text changes to "REMOVE".
  5.  Asserts button CSS color changes to Red (`rgb(226, 35, 26)`).

##### Responsiveness

- **Mobile Viewport**: The `playwright.config.ts` includes a "Mobile Chrome" project (Pixel 5 emulation).
- **Execution**: The Checkout Flow works seamlessly on mobile dimensions without code changes due to robust layout
  handling.

#### Part 4: The Senior "X-Factor" (Performance)

We implemented a performance guardrail to ensure the application remains snappy.

- **Check**: `tests/specs/assessment.spec.ts` -> "Performance: Inventory Page loads within 2.0 seconds"
- **Method**: Uses the reliable `PerformanceNavigationTiming` API via `page.evaluate()` to measure
  `loadEventEnd - startTime`.
- **Threshold**: Fails if load time > 2000ms.

#### Instructions

##### Installation

```bash
npm install
npx playwright install
```

##### Running Tests

Run all tests (Chromium):

```bash
npx playwright test
```

Run Mobile Viewport tests:

```bash
npx playwright test --project="Mobile Chrome"
```

Run specific deliverables:

```bash
npx playwright test -g "Checkout Flow"
npx playwright test -g "Visual"
npx playwright test -g "Performance"
```

#### Video Walkthrough
[Watch the Video Walkthrough](https://jam.dev/c/7390d06b-11c5-4520-a5fa-9c1ebf7c2c69) _(This video explains the
reverse-engineering of the session cookie and demonstrates the full test suite)._

