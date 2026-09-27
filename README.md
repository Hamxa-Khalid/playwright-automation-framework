# Playwright Automation Framework

> A clean, cross-browser end-to-end test automation framework built with **Playwright** and **JavaScript**, structured around the **Page Object Model** and demonstrated against the [SauceDemo](https://www.saucedemo.com) e-commerce practice site.

[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](#running-tests)
[![CI](https://github.com/Hamxa-Khalid/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Hamxa-Khalid/playwright-automation-framework/actions/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## Overview

This repository is a portfolio-quality demonstration of a maintainable UI test
automation framework. It exercises the core user journeys of an e-commerce
application - authentication, product browsing, cart management and a full
checkout - and runs the same suite across Chromium, Firefox and WebKit.

The framework is intentionally structured the way a real project would be: page
interactions are encapsulated in Page Object classes, test data lives in a
single reusable module, common setup is factored into custom fixtures, and every
run produces rich HTML reports with traces, screenshots and video captured
automatically on failure. A GitHub Actions pipeline runs the whole suite on
every push and pull request.

The application under test is [SauceDemo](https://www.saucedemo.com), a public
practice site maintained by Sauce Labs, which makes this suite fully runnable by
anyone who clones the repository.

## Tech Stack

| Area | Choice |
| --- | --- |
| Test runner | [@playwright/test](https://playwright.dev/docs/test-intro) `^1.48.0` |
| Language | JavaScript (Node.js `>=18`) |
| Design pattern | Page Object Model + custom fixtures |
| Browsers | Chromium, Firefox, WebKit |
| Reporting | Playwright HTML report + list reporter |
| CI/CD | GitHub Actions |

## Features

- **Page Object Model** - every screen is a class (`LoginPage`, `InventoryPage`,
  `CartPage`, `CheckoutPage`) extending a shared `BasePage`, so locators and
  actions are defined once and reused everywhere.
- **Cross-browser execution** - the suite runs on Chromium, Firefox and WebKit
  out of the box via Playwright projects.
- **Data-driven tests** - users, product names and expected messages are
  centralized in `utils/testData.js` and injected into the specs.
- **Custom fixtures** - a `loggedInPage` fixture handles authentication setup so
  specs stay focused on the behaviour they verify.
- **Resilient locators** - selectors use SauceDemo's `data-test` attributes
  rather than brittle CSS or XPath.
- **Automatic failure diagnostics** - traces on first retry, screenshots on
  failure and video retained on failure.
- **Rich reporting** - an interactive HTML report is generated after every run.
- **Continuous integration** - GitHub Actions runs the full suite and uploads
  the HTML report as a build artifact.

## Project Structure

```
playwright-automation-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI pipeline (install, test, upload report)
├── fixtures/
│   └── fixtures.js               # Custom test fixtures (Page Objects + loggedInPage)
├── pages/
│   ├── BasePage.js               # Shared navigation/helpers
│   ├── LoginPage.js              # Login screen
│   ├── InventoryPage.js          # Products listing, sorting, cart badge
│   ├── CartPage.js               # Shopping cart
│   └── CheckoutPage.js           # Checkout information, overview, confirmation
├── tests/
│   ├── login.spec.js             # Valid / invalid / locked-out login
│   ├── inventory.spec.js         # Product count, sorting, add/remove, badge
│   ├── cart.spec.js              # Add multiple, verify, remove
│   └── checkout.spec.js          # Full end-to-end purchase flow
├── utils/
│   └── testData.js               # Users, products, expected data
├── .gitignore
├── LICENSE
├── package.json
├── playwright.config.js
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) version **18 or higher**
- npm (bundled with Node.js)

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Hamxa-Khalid/playwright-automation-framework.git
cd playwright-automation-framework

# 2. Install dependencies
npm install

# 3. Download the Playwright browsers
npx playwright install
```

## Running Tests

Run the entire suite across all configured browsers:

```bash
npm test
```

Other useful scripts:

```bash
# Run with a visible browser window
npm run test:headed

# Open Playwright's interactive UI mode (great for debugging)
npm run test:ui

# Run against a single browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Open the last generated HTML report
npm run report
```

You can also target an individual spec or test directly with the Playwright CLI:

```bash
npx playwright test tests/checkout.spec.js
npx playwright test -g "completes an end-to-end purchase"
```

## CI/CD

The workflow at `.github/workflows/playwright.yml` runs on every push and pull
request targeting the `main` branch. On an `ubuntu-latest` runner it:

1. Checks out the repository.
2. Sets up Node.js 20 with npm caching.
3. Installs dependencies with `npm ci` for reproducible builds.
4. Installs the Playwright browsers with their system dependencies
   (`npx playwright install --with-deps`).
5. Runs the full test suite (`npx playwright test`).
6. Uploads the generated `playwright-report/` as a build artifact - always, so
   the report is available even when tests fail.

## What This Demonstrates

This project is designed to showcase practical QA automation engineering skills:

- Designing a **scalable, maintainable framework** using the Page Object Model
  and reusable fixtures.
- Writing **clean, readable and deterministic** end-to-end tests with meaningful
  assertions and Playwright's web-first, auto-waiting API.
- Choosing **stable locator strategies** (`data-test` attributes) to reduce
  flakiness.
- Building **cross-browser** coverage and **data-driven** test design.
- Producing **actionable failure diagnostics** through traces, screenshots and
  video.
- Integrating tests into a **CI/CD pipeline** with artifact reporting.
- Applying good software-engineering hygiene: clear structure, documentation,
  licensing and configuration.

## Author

**Muhammad Hamza Khalid** - Senior SQA Engineer

- LinkedIn: [linkedin.com/in/hamzakhalidqa](https://www.linkedin.com/in/hamzakhalidqa/)
- Email: [muhammadhamzaqae@gmail.com](mailto:muhammadhamzaqae@gmail.com)
- GitHub: [@Hamxa-Khalid](https://github.com/Hamxa-Khalid)

## License

This project is licensed under the [MIT License](./LICENSE).
