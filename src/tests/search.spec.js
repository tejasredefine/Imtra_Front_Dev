import { test, expect } from "../utils/fixtures/baseFixtures";
import { SearchFlow } from "../flows/searchFlow";

test.describe("Search Module Tests", () => {
  let searchFlow;

  test.beforeEach(async ({ page, actions }) => {
    searchFlow = new SearchFlow(page, actions);
  });

  // ============================================================================
  // Group 1: Search Navigation & Heading
  // Ref: Imtra_Search_Functionality_001
  // ============================================================================

  test("@search @search001 - Search bar navigates to Search Results page", async () => {
    await searchFlow.verifySearchPageNavigation();
  });

  // ============================================================================
  test("@search @search002 - Search heading matches the searched keyword", async () => {
    await searchFlow.verifySearchHeadingMatchesKeyword();
  });

  // ============================================================================
  // Group 2: Autocomplete Suggestions
  // Ref: Imtra_Search_Functionality_001 (search result value testing)
  // ============================================================================

  test("@search @search003 - Autocomplete shows suggestions when typing 'cable'", async () => {
    await searchFlow.verifyAutocompleteForCable();
  });

  // ============================================================================
  // Group 3: SKU / Item Number Search  
  // Ref: Imtra_Search_Functionality_003
  // Screenshots: Image 1 — SM61320-20M search result
  // ============================================================================

  test("@search @search005 - SKU search returns correct product name, brand, and item number", async () => {
    await searchFlow.verifySkuSearchReturnsCorrectProduct();
  });

  // ============================================================================
  test("@search @search006 - SKU search result shows correct stock status (In Stock)", async () => {
    await searchFlow.verifySkuSearchStockStatus();
  });

  // ============================================================================
  test("@search @search007 - SKU search result shows correct tariff amount", async () => {
    await searchFlow.verifySkuSearchTariffAmount();
  });

  // ============================================================================
  // Group 4: Brand Filter Dropdown Search
  // Ref: Imtra_Search_Functionality_002
  // Screenshot: Image 3 — brand dropdown options
  // ============================================================================

  test("@search @search008 - Brand filter (Sleipner) limits results to selected brand", async () => {
    await searchFlow.verifyBrandFilteredSearch();
  });

  // ============================================================================
  // Group 5: Keyword Search — Small Keywords & Categories
  // Ref: Imtra_Search_Functionality_003
  // ============================================================================

  test("@search @search009 - Small keyword search ('anchor') returns at least one result", async () => {
    await searchFlow.verifySmallKeywordSearchReturnsResults();
  });

  // ============================================================================
  test("@search @search010 - Search result product name or brand contains the searched keyword", async () => {
    await searchFlow.verifySearchResultContainsKeyword();
  });

  // ============================================================================
  test("@search @search011 - Numeric SKU keyword search returns matching product", async () => {
    await searchFlow.verifyNumericSkuKeywordSearch();
  });

  // ============================================================================
  // Group 6: Pagination — Load More
  // Ref: Imtra_Search_Functionality_004 (Manual only — skipped for automation)
  // ============================================================================

  test("@search @search012 - Load More button loads additional product cards", async () => {
    await searchFlow.verifyLoadMoreButton();
  });

  // ============================================================================
  // Group 7: Product Details Page Navigation from Search Results
  // Ref: Imtra_Search_Functionality_004 (Product details page navigation testing)
  // ============================================================================

  test("@search @search013 - Clicking a product card navigates to its product details page", async () => {
    await searchFlow.verifyProductDetailsPageNavigation();
  });

  // ============================================================================
  test("@search @search014 - Product card on search results shows brand, name, price, and stock status", async () => {
    await searchFlow.verifyProductDetailsPageContent();
  });

  // ============================================================================
  // Group 8: Add to Cart from Search Results
  // Ref: Imtra_Product_listing_006
  // ============================================================================

  test("@search @search015 - Add to Cart opens cart sidebar with default quantity (1)", async () => {
    await searchFlow.verifyAddToCartWithDefaultQuantity();
  });

  // ============================================================================
  test("@search @search016 - Add to Cart with custom quantity shows correct quantity in cart sidebar", async () => {
    await searchFlow.verifyAddToCartWithCustomQuantity();
  });

  // ============================================================================
  test("@search @search017 - Cart total matches product price × quantity", async () => {
    await searchFlow.verifyCartTotalCalculation();
  });

  // ============================================================================
  test("@search @search018 - Cart total includes correct tariff amount", async () => {
    await searchFlow.verifyCartTotalWithTariff();
  });
}); 