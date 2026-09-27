// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for the SauceDemo end-to-end automation framework.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
const isCI = !!process.env.CI;

module.exports = defineConfig({
  // Directory that contains the spec files.
  testDir: './tests',

  // Run tests inside every file in parallel.
  fullyParallel: true,

  // Fail the build on CI if `test.only` was accidentally left in the source.
  forbidOnly: isCI,

  // Retry failing tests once on CI, never locally.
  retries: isCI ? 1 : 0,

  // Limit workers on CI to keep runs deterministic; use the default locally.
  workers: isCI ? 1 : undefined,

  // Reporters: a rich HTML report plus a concise list output in the terminal.
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Settings shared by every project below.
  use: {
    // Base URL so specs can navigate with page.goto('/').
    baseURL: 'https://www.saucedemo.com',

    // Collect a trace when a test is retried for the first time.
    trace: 'on-first-retry',

    // Capture a screenshot only when a test fails.
    screenshot: 'only-on-failure',

    // Keep video only for failing tests to aid debugging.
    video: 'retain-on-failure',
  },

  // Run the suite across the three major browser engines.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
