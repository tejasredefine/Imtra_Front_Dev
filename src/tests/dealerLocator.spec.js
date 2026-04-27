import { test, expect } from "../utils/fixtures/baseFixtures";
import { DealerLocatorFlow } from "../flows/dealerLocatorFlow";

test.describe("Dealer Locator Tests", () => {
  let dealerLocatorFlow;

  test.beforeEach(async ({ page, actions }) => {
    dealerLocatorFlow = new DealerLocatorFlow(page, actions);
  });

  // ============================================================================
  // Navigation Test
  // ============================================================================

  test("@dealerLocator @dealerLocator001 - Navigate to Dealer Locator", async () => {
    await dealerLocatorFlow.NavigateToDealerLocator();
  });


  // ============================================================================
  // Brand Checkbox Tests
  // ============================================================================

  test("@dealerLocator @dealerLocator002 - All Brand Checkboxes", async () => {
    await dealerLocatorFlow.VerifyAllBrandCheckboxes();
  });

  // ============================================================================
  // Category Checkbox Tests
  // ============================================================================

  test("@dealerLocator @dealerLocator003 - All Category Checkboxes", async () => {
    await dealerLocatorFlow.VerifyAllCategoryCheckboxes();
  });

  // ============================================================================
  // Location Search Tests
  // ============================================================================

  test("@dealerLocator @dealerLocator004 - Location Search - New York", async () => {
    await dealerLocatorFlow.VerifyLocationSearch("New York, NY, USA");
  });

  test("@dealerLocator @dealerLocator005 - Location Search - India", async () => {
    await dealerLocatorFlow.VerifyLocationSearch("India");
  });

  // ============================================================================
  // Dealer Search Tests
  // ============================================================================

  test("@dealerLocator @dealerLocator006 - Dealer Search by Name", async () => {
    await dealerLocatorFlow.VerifyDealerSearch("Hooper12");
  });

  // ===========================================    =================================
  // Combined Filter Tests
  // ============================================================================

  test("@dealerLocator @dealerLocator007 - Combined Filters", async () => {
    await dealerLocatorFlow.VerifyFilters({
      brands: ["Victron"],
      categories: ["Wipers", "Anchoring"],
    });
  });

  // ============================================================================
  // Complete Test
  // ============================================================================

  test("@dealerLocator @dealerLocator008 - Complete Dealer Locator Test", async () => {
    await dealerLocatorFlow.VerifyDealerLocatorComplete();
  });
});