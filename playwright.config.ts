import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { channel } from 'diagnostics_channel';

/**
 * Configuration file for Playwright Test Runner
 * This file contains settings for test execution, browser configurations,
 * and other test-related parameters
 */

const config: PlaywrightTestConfig = {
  // Directory where test files are located
  testDir: "./e2e",

  // Assertion timeout settings
  expect: {
    timeout: 600000, // 10 minutes timeout for assertions
  },

  // Test execution configuration
  fullyParallel: true,  // Run tests in parallel for faster execution
  forbidOnly: !!process.env.CI,  // Prevents exclusive test runs (.only) in CI environment
  retries: process.env.CI ? 2 : 0,  // Retry failed tests twice in CI, no retries locally
  workers: process.env.CI ? 1 : undefined,  // Single worker in CI, auto-detect locally
  reporter: "html",  // Generate HTML test reports

  // Global test settings
  use: {
    actionTimeout: 0,  // No timeout for actions (clicks, type, etc.)
    trace: "on-first-retry",  // Capture trace on first retry of failed tests
    // Base URL for API requests
    baseURL: "https://sam.samexternal.net:443/sso/oauth2/access_token",
    // Global HTTP headers
    extraHTTPHeaders: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },

  // Browser configurations for cross-browser testing
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]  // Use Chrome-specific settings
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"]  // Use Firefox-specific settings
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"]  // Use Safari-specific settings
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        channel: "msedge",  // Use Microsoft Edge browser
      },
    },
    {
      name: "Google Chrome",
      use: {
        channel: "chrome",  // Use stable Chrome channel
      },
    },
  ],

  // Test artifacts and development server configuration
  outputDir: "test-results/",  // Directory for test artifacts
  webServer: {
    command: "npm run start",  // Command to start development server
    port: 3000,  // Port for development server
  },
};

export default config;