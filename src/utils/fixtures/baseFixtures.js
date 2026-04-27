import { test as base, expect } from "@playwright/test";
import { ActionMethods } from "../helpers/ActionMethods";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Store the actions instance globally
let globalActions = null;

export const test = base.extend({
  // Inject ActionMethods into every test
  actions: async ({ page }, use) => {
    const actions = new ActionMethods(page);
    globalActions = actions;
    
    const methodNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(actions),
    ).filter(
      (method) =>
        method !== "constructor" && typeof actions[method] === "function",
    );

    // Inject into global scope
    methodNames.forEach((method) => {
      global[method] = actions[method].bind(actions);
    });
    
    await use(actions);
    
    // Cleanup after test completes
    methodNames.forEach((method) => {
      delete global[method];
    });
    globalActions = null;
  },

  // Auto-navigate to BASE_URL before each test
  page: async ({ page }, use) => {
    // Navigate to BASE_URL automatically
    await page.goto(process.env.BASE_URL);
    await use(page);
  },
});

export { expect };