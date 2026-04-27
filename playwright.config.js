// @ts-check
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: Number(process.env.RETRY_ATTEMPTS) ?? 1,
  workers: Number(process.env.WORKERS) ?? 1,
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

  testMatch: [
    "src/tests/homepage.spec.js",
    "src/tests/navbar.spec.js",
    "src/tests/search.spec.js",
    "src/tests/brands.spec.js",
    "src/tests/thrusters.spec.js",
    "src/tests/anchoring.spec.js",
    "src/tests/lightingSwitching.spec.js",
    "src/tests/wipersAccess.spec.js",
    "src/tests/learningCenter.spec.js",
    "src/tests/dealerLocator.spec.js",
    "src/tests/footer.spec.js",
    "src/tests/signUp.spec.js",
    "src/tests/login.spec.js",
    "src/tests/logout.spec.js",
    "src/tests/MyAccount/profile.spec.js",
    "src/tests/MyAccount/userLogin.spec.js",
    "src/tests/MyAccount/address.spec.js",
    "src/tests/MyAccount/shippingCarrier.spec.js",
    "src/tests/listing.spec.js",
    "src/tests/productDetails.spec.js",
    "src/tests/consultationForm.spec.js",
    "src/tests/cart.spec.js",
    "src/tests/checkout.spec.js",
    "src/tests/quote.spec.js",
    // Add other .spec.js files in the desired order
  ],
});
