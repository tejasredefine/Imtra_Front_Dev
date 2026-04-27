// @ts-check
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: Number(process.env.RETRY_ATTEMPTS) ?? 0,
  workers: Number(process.env.WORKERS) ?? 4,
  timeout: 400 * 1000, // This time is for entire test case duration
  outputDir: "./reports/json/test-results",
  reporter: [
    ["html"],
    ["allure-playwright"],
    ["json", { outputFile: "reports/json/results.json" }],
  ],

  use: {
    headless: process.env.HEADLESS === "TRUE" ? true : false,
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 50000,
    navigationTimeout: 50000,
  },

  projects: [
    {
      name: "chromium",
      use: { viewport: null, launchOptions: { args: ["--start-maximized"] } },
    },
  ],
});
