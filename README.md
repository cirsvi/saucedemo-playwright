# :gear: SauceDemo Playwright Automation

<div align="center">

[![CI](https://github.com/cirsvi/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/cirsvi/saucedemo-playwright/actions/workflows/playwright.yml) [![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Overview

This repository contains an automated test suite for the SauceDemo e-commerce application using **Playwright** and **TypeScript**.

This project complements the **[SauceDemo Manual Testing](https://github.com/cirsvi/saucedemo-manual-qa)** repository (for more details, see **[Manual Testing](#manual-testing)**). Every automated test is mapped to a manual test case ID to preserve traceability across both projects. The project follows **Page Object Model (POM)** design pattern and uses custom fixtures and utilities to keep tests maintainable and readable.

<p align="center">
  <img src="evidence/playwright-report.gif" alt="Example of Playwright HTML report"><br>
  <em>Playwright HTML report after a full test run (all tests executed as expected)</em>
</p>

## Test Coverage

The automated suite covers **62 test cases** across the main features of the application. The table below shows the distribution by feature (numbers correspond to the test cases).

| Feature         | Number of Tests |
|-----------------|------------|
| Login           | 11         |
| Logout          | 2          |
| Product Catalog | 7          |
| Shopping Cart   | 13         |
| Checkout        | 29         |

For the detailed list of test cases, see the **[Manual Test Case Overview](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-cases/tests-overview.md)**.

## Known Defects & Expected Failures

The SauceDemo application contains several known defects that have been documented in the manual testing repository. Tests that reproduce defects are wrapped with `test.fail()` so they are reported as **expected failures** rather than breaking the CI pipeline. Each such test includes a **bug annotation** (type: 'bug') linking it to the corresponding issue ID.

Example:
```typescript
test.fail('SDQA-16: Tab navigation', async ({ page }) => {
    test.info().annotations.push({
        type: 'bug',
        description: 'SDQA-118',
    });
    // test body ...
});
```

> As mentioned in [Overview](#overview), all automated test cases contain the manual test case ID in their title (e.g., `SDQA-3`).

For the complete list of documented bugs, see the **[Manual Bug Report Overview](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/bugs/bugs-overview.md)**.

## Tech Stack 
- **Playwright** with **TypeScript**
- **Page Object Model (POM)**: page classes under `/pages`
- **Custom fixtures**: reusable setup under `/fixtures`
- **Utility helpers**:  reusable utilities under `utils`
- **Test data**: centralized data under `/test-data`
- **Prettier**: code formatting (configuration in `.prettierrc`)
- **GitHub Actions**: CI pipeline (workflow under `.github/workflows`)

## Configuration
The Playwright configuration is defined in `playwright.config.ts`. Key settings include:
- **Base URL:** `https://www.saucedemo.com/`
- **Browsers:** Chromium, Firefox, WebKit
- **Timeout:** default (30 seconds per test)
- **Retries:** 0 on local, 2 on CI
- **Trace:** enabled on first retry
- **Test ID attribute:** `data-test`
- **Reporter:** HTML report

## Getting Started

### Prerequisites
- Node.js (version 18 or later)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/cirsvi/saucedemo-playwright.git
   cd saucedemo-playwright
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Install Playwright browsers:
    ```bash
    npx playwright install
    ```

### Test Execution

#### Run the Full Suite
Run the full suite headlessly:
```bash
npx playwright test
```
Or run with the Playwright UI mode:
```bash
npx playwright test --ui
```

#### Run by Test Set

The automated tests are tagged to mirror the manual test sets. Using `--grep` it is possible to run the tests that belong to a specific set, for example:
```bash
npx playwright test --grep "@smoke"
```


**Available tags** (each links to its manual test set):
| Tag                          | Manual Test Set |
|------------------------------|-----------------|
| `@smoke`                     | [Smoke Test Set](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-sets/SDQA-19-smoke.md) |
| `@login-regression`          | [Login Regression Test Set](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-sets/SDQA-20-login-regression.md) |
| `@product-catalog-regression`| [Product Catalog Regression Test Set](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-sets/SDQA-34-product-catalog-regression.md) |
| `@logout-regression`         | [Logout Regression Test Set](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-sets/SDQA-55-logout-regression.md) |
| `@cart-regression`           | [Shopping Cart Regression Test Set](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-sets/SDQA-49-shopping-cart-regression.md) |
| `@checkout-regression`       | [Checkout Regression Test Set](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-sets/SDQA-110-checkout-regression.md) |
| `@regression-expansion`      | [Login & Checkout Expansion Test Set](https://github.com/cirsvi/saucedemo-manual-qa/blob/main/test-sets/SDQA-151-regression-expansion.md) |

> [!TIP]
> It is possible to **combine tags** with `--grep` using `|` (pipe), for example, `--grep "@smoke|@login-regression"`. It is also possible to **exclude tags** with `--grep-invert`, for example, `--grep-invert "@regression-expansion"`. 

## Continuous Integration (CI)
This project uses **GitHub Actions** for CI. The workflow (`.github/workflows/playwright.yml`, named **"SauceDemo E2E Tests"**) triggers on every `push` and `pull` request to the `main` branch.

The CI pipeline installs dependencies and browsers, runs the full Playwright suite, and uploads generated HTML report as an artifact.

## Project Structure
- **`.github/workflows/`**: GitHub Actions CI pipeline definitions.
- **`components/`**: Reusable UI fragments (if any).
- **`fixtures/`**: Playwright custom fixtures for common test setup.
- **`pages/`**: Page Object Model classes representing application pages.
- **`test-data/`**: Static test data (customers, error messages, products).
- **`tests/`**: Test spec files grouped by feature.
    - **`login.spec.ts`**
    - **`logout.spec.ts`**
    - **`productCatalog.spec.ts`**
    - **`cart.spec.ts`**
    - **`checkout/`**: Checkout tests split by sub‑feature:
        - **`cart-checkout.spec.ts`**
        - **`checkout-access.spec.ts`**
        - **`information-checkout.spec.ts`**
        - **`overview-checkout.spec.ts`**
        - **`complete-checkout.spec.ts`**
- **`utils/`**: Helper functions for background color retrieval, price sum calculation, sorting verification, etc.
- **`.prettierrc`**: Prettier configuration file.
- **`playwright.config.ts`**: Playwright configuration.
- **`package.json`**/ **`package-lock.json`**: Project dependencies and scripts.

## Manual Testing

This automation project is built on top of the manual test suite documented in **[SauceDemo Manual Testing](https://github.com/cirsvi/saucedemo-manual-qa)**. The manual repository contains user stories, test cases, execution reports, and bug reports. The automation covers all 62 manual test cases and follows the same feature grouping for consistency.

Each automated test is also **tagged with one or more tags** for selective execution and traceability to the **[Manual Testing](https://github.com/cirsvi/saucedemo-manual-qa)** repository. The tags correspond exactly to the test sets defined in the manual project.

> [!NOTE]
> Tests that belong to multiple sets carry multiple tags, for example, a smoke test that is also part of the shopping cart regression will have both `@smoke` and `@cart-regression` in its title.
