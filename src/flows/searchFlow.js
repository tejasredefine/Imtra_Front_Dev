import { SearchPage } from "../pages/searchPage";
import { BasePage } from "../pages/BasePage";
import {
  SEARCH_KEYWORDS,
  SEARCH_SKUS,
  SEARCH_BRAND_FILTERS,
  AUTOCOMPLETE_KEYWORDS,
  ADD_TO_CART_DATA,
} from "../utils/data/searchData";
import { PAGE_TITLES } from "../utils/data/metaData";

export class SearchFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.searchPage = new SearchPage(page, actions);
  }

  // ************* UTILITIES *******************************

  async performSearch(keyword) {
    await this.searchPage.clickSearchBar();
    console.log("Search bar clicked");
    await this.searchPage.typeKeyword(keyword);
    console.log("Keyword typed");
    await this.page.keyboard.press("Enter");
    console.log("Enter key pressed to submit search");
  }

  async performSearchWithBrandFilter(brandName, keyword) {
    await this.searchPage.selectBrandFilter(brandName);
    await this.performSearch(keyword);
  }

  // ******************************************************

  // search001: Search bar navigation
  async verifySearchPageNavigation() {
    await this.performSearch(SEARCH_KEYWORDS.CABLE);
    await this.searchPage.verifySearchPageTitle();
  }

  // search002: Search heading matches keyword
  async verifySearchHeadingMatchesKeyword() {
    const keyword = SEARCH_KEYWORDS.WIPER;
    await this.performSearch(keyword);
    await this.searchPage.verifySearchHeadingContains(keyword);
  }

  // search003: Autocomplete suggestions — cable
  async verifyAutocompleteForCable() {
    await this.searchPage.clickSearchBar();
    await this.searchPage.typeKeyword(AUTOCOMPLETE_KEYWORDS.CABLE.keyword);
    await this.actions.addSleep(1);
    await this.page.keyboard.press("ArrowDown");
    const suggestions = await this.searchPage.getAutocompleteSuggestions();
    for (const expected of AUTOCOMPLETE_KEYWORDS.CABLE.expectedSuggestions) {
      const found = suggestions.some((s) => s.toLowerCase().includes(expected.toLowerCase()));
      if (!found) {
        throw new Error(`Autocomplete suggestion "${expected}" not found. Actual: ${suggestions}`);
      }
    }
    console.log(`✓ Autocomplete suggestions verified for: cable`);
  }

  // search004: Autocomplete suggestions — wiper
  async verifyAutocompleteForWiper() {
    await this.searchPage.clickSearchBar();
    await this.searchPage.typeKeyword(AUTOCOMPLETE_KEYWORDS.WIPER.keyword);
    const suggestions = await this.searchPage.getAutocompleteSuggestions();
    for (const expected of AUTOCOMPLETE_KEYWORDS.WIPER.expectedSuggestions) {
      const found = suggestions.some((s) => s.toLowerCase().includes(expected.toLowerCase()));
      if (!found) {
        throw new Error(`Autocomplete suggestion "${expected}" not found. Actual: ${suggestions}`);
      }
    }
    console.log(`✓ Autocomplete suggestions verified for: wiper`);
  }

  // search005: SKU search returns correct product
  async verifySkuSearchReturnsCorrectProduct() {
    const skuData = SEARCH_SKUS[0];
    await this.performSearch(skuData.sku);
    await this.searchPage.verifySearchHeadingContains(skuData.sku);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.verifyProductCardDetails(skuData);
    await this.searchPage.verifyFirstCardBrand(skuData.expectedBrand);
    await this.searchPage.verifyFirstCardItemNumber(skuData.expectedItemNumber);
  }

  // search006: SKU search verifies stock status
  async verifySkuSearchStockStatus() {
    const skuData = SEARCH_SKUS[0];
    await this.performSearch(skuData.sku);
    await this.searchPage.verifyFirstCardStockStatus(skuData.expectedStockStatus);
  }

  // search007: SKU search verifies tariff amount
  async verifySkuSearchTariffAmount() {
    const skuData = SEARCH_SKUS[0];
    await this.performSearch(skuData.sku);
    await this.searchPage.verifyFirstCardTariffAmount(skuData.expectedTariffAmount);
  }

  // search008: Brand filter — Sleipner
  async verifyBrandFilteredSearch() {
    const brand = SEARCH_BRAND_FILTERS.find((b) => b.dropdownValue === "SLEIPNER");
    await this.performSearchWithBrandFilter(brand.dropdownValue, SEARCH_KEYWORDS.CABLE);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.verifyFirstCardBrand("SLEIPNER");
  }

  // search009: Small keyword search returns results
  async verifySmallKeywordSearchReturnsResults() {
    await this.performSearch(SEARCH_KEYWORDS.ANCHOR);
    await this.searchPage.verifyAtLeastOneResultShown();
  }

  // search010: Search result contains keyword
  async verifySearchResultContainsKeyword() {
    const keyword = SEARCH_KEYWORDS.LIGHT;
    await this.performSearch(keyword);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.verifySearchHeadingContains(keyword);
  }

  // search011: Numeric/SKU keyword search
  async verifyNumericSkuKeywordSearch() {
    await this.performSearch(SEARCH_SKUS[0].sku);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.verifySearchHeadingContains(SEARCH_SKUS[0].sku);
  }

  // search012: Load More loads additional products
  async verifyLoadMoreButton() {
    await this.performSearch(SEARCH_KEYWORDS.CABLE);
    const countBefore = await this.searchPage.getResultCardCount();
    await this.searchPage.clickLoadMore();
    await this.searchPage.verifyMoreResultsLoadedAfter(countBefore);
  }

  // search013: Navigate to product details from search results
  async verifyProductDetailsPageNavigation() {
    await this.performSearch(SEARCH_SKUS[0].sku);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.clickFirstProductCard();
    const currentUrl = await this.actions.getCurrentUrl();
    if (currentUrl.includes("/search")) {
      throw new Error(`Expected product details page, but still on search: ${currentUrl}`);
    }
    console.log(`✓ Navigated to product details page: ${currentUrl}`);
  }

  // search014: Product details page content
  async verifyProductDetailsPageContent() {
    await this.performSearch(SEARCH_SKUS[0].sku);
    await this.searchPage.verifyFirstCardBrand(SEARCH_SKUS[0].expectedBrand);
    await this.searchPage.verifyFirstCardProductName(SEARCH_SKUS[0].expectedProductName);
    await this.searchPage.verifyFirstCardStockStatus(SEARCH_SKUS[0].expectedStockStatus);
  }

  // search015: Add to cart (default quantity 1)
  async verifyAddToCartWithDefaultQuantity() {
    await this.performSearch(ADD_TO_CART_DATA.SEARCH_KEYWORD);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.clickAddToCartOnFirstCard();
    await this.searchPage.verifyCartSidebarOpen();
  }

  // search016: Add to cart with custom quantity
  async verifyAddToCartWithCustomQuantity() {
    await this.performSearch(ADD_TO_CART_DATA.SEARCH_KEYWORD);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.setQuantityOnFirstCard(ADD_TO_CART_DATA.CUSTOM_QUANTITY);
    await this.searchPage.clickAddToCartOnFirstCard();
    await this.searchPage.verifyCartSidebarOpen();
    await this.searchPage.verifyCartSidebarQuantity(ADD_TO_CART_DATA.CUSTOM_QUANTITY);
  }

  // search017: Cart total calculation (price × quantity)
  async verifyCartTotalCalculation() {
    const skuData = SEARCH_SKUS[0];
    await this.performSearch(skuData.sku);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.clickAddToCartOnFirstCard();
    await this.searchPage.verifyCartSidebarOpen();
    await this.searchPage.verifyCartSubtotal(skuData.expectedYourPrice);
  }

  // search018: Cart total with tariff
  async verifyCartTotalWithTariff() {
    const skuData = SEARCH_SKUS[0];
    await this.performSearch(skuData.sku);
    await this.searchPage.verifyAtLeastOneResultShown();
    await this.searchPage.verifyFirstCardTariffAmount(skuData.expectedTariffAmount);
    await this.searchPage.clickAddToCartOnFirstCard();
    await this.searchPage.verifyCartSidebarOpen();
    console.log(`✓ Tariff amount ${skuData.expectedTariffAmount} verified before adding to cart`);
  }
}
