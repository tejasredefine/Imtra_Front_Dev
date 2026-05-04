import { DealerLocatorPage } from "../pages/DealerLocatorPage";
import { BasePage } from "../pages/BasePage";
import {
  DEALER_LOCATOR_BRANDS,
  DEALER_LOCATOR_CATEGORIES,
} from "../utils/data/dealerLocatorData";

export class DealerLocatorFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.dealerLocatorPage = new DealerLocatorPage(page, actions);
  }

  // ============================================================================
  // Navigation
  // ============================================================================

  async NavigateToDealerLocator() {
    await this.dealerLocatorPage.navigateToDealerLocator();
    await this.dealerLocatorPage.waitForPageToLoad();
  }

  // ============================================================================
  // Brand Checkbox Tests
  // ============================================================================

  async VerifyBrandCheckbox(brandName) {
    await this.NavigateToDealerLocator();
    return await this.dealerLocatorPage.selectCheckboxAndVerify(brandName);
  }

  async VerifyAllBrandCheckboxes() {
    await this.NavigateToDealerLocator();
    return await this.dealerLocatorPage.testEachCheckbox(DEALER_LOCATOR_BRANDS);
  }

  // ============================================================================
  // Category Checkbox Tests
  // ============================================================================

  async VerifyCategoryCheckbox(categoryName) {
    await this.NavigateToDealerLocator();
    return await this.dealerLocatorPage.selectCheckboxAndVerify(categoryName);
  }

  async VerifyAllCategoryCheckboxes() {
    await this.NavigateToDealerLocator();
    return await this.dealerLocatorPage.testEachCheckbox(DEALER_LOCATOR_CATEGORIES);
  }

  // ============================================================================
  // Location & Search Tests
  // ============================================================================

  async VerifyLocationSearch(location) {
    await this.NavigateToDealerLocator();
    await this.dealerLocatorPage.enterLocation(location);
    return await this.dealerLocatorPage.verifyResultState();
  }

  async VerifyDealerSearch(searchText) {
    await this.NavigateToDealerLocator();
    await this.dealerLocatorPage.searchDealer(searchText);
    return await this.dealerLocatorPage.verifyResultState();
  }

  // ============================================================================
  // Combined Filter Tests
  // ============================================================================

  async VerifyFilters(filters) {
    await this.NavigateToDealerLocator();
    return await this.dealerLocatorPage.applyFiltersAndVerify(filters);
  }

  // ============================================================================
  // Complete Test
  // ============================================================================

  async VerifyDealerLocatorComplete() {
    await this.NavigateToDealerLocator();
    const brandResults = await this.dealerLocatorPage.testEachCheckbox(DEALER_LOCATOR_BRANDS);
    const categoryResults = await this.dealerLocatorPage.testEachCheckbox(DEALER_LOCATOR_CATEGORIES);
    return { brandResults, categoryResults };
  }
}
