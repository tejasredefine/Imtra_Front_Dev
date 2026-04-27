import { SearchPageComponent } from "../components/searchPageComp";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.searchPageComponent = new SearchPageComponent(page, actions);
  }

  // ==================== UTILITIES ====================

  // Random item picker — used internally by clickOnRandomProductCard()
  getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  // ==================== SEARCH BAR ACTIONS ====================

  // Step: "user types a keyword using the search input by id"
  // Kept from existing file — used by other page files via global fill/findInputById
  async enterSearchKeyword(keyword) {
    const emailField = await findInputById("search");
    await fill(emailField, keyword);
  }

  // Step: "user selects a brand from the brand filter dropdown"
  async selectBrandFilter(brandName) {
    await this.searchPageComponent.selectBrandFromDropdown(brandName);
  }

  // Step: "user clicks the search bar"
  async clickSearchBar() {
    await this.searchPageComponent.clickSearchBar();
  }

  // Step: "user types a keyword into the search bar"
  async typeKeyword(keyword) {
    await this.searchPageComponent.typeInSearchBar(keyword);
  }

  // Step: "user clicks the SEARCH button"
  async clickSearch() {
    await this.searchPageComponent.clickSearchButton();
  }

  // ==================== AUTOCOMPLETE ====================

  // Step: "verify autocomplete suggestions are displayed"
  async getAutocompleteSuggestions() {
    return await this.searchPageComponent.getAutocompleteSuggestions();
  }

  // Step: "user clicks on a specific autocomplete suggestion"
  async clickSuggestion(suggestionText) {
    await this.searchPageComponent.clickAutocompleteSuggestion(suggestionText);
  }

  


  // Step: "verify the search results page title"
  async verifySearchPageTitle() {
    await this.verifyPageTitle("Search Results");
  }

  // Step: "verify at least one product card is shown"
  async verifyAtLeastOneResultShown() {
    const count = await this.searchPageComponent.getSearchResultCardCount();
    if (count < 1) {
      throw new Error(`Expected at least 1 search result, but found ${count}`);
    }
    console.log(`✓ Search results count verified: ${count} cards visible`);
    return count;
  }

  // Step: "record the count of cards before load more"
  async getResultCardCount() {
    return await this.searchPageComponent.getSearchResultCardCount();
  }

  // ==================== PRODUCT CARD — RANDOM SELECTION (existing) ====================

  // Step: "click on a random product card and capture all its details"
  // Kept from existing file — stores selectedProductDetails for use in verifySelectedProductDetailsPage()
  async clickOnRandomProductCard() {
    // Wait for product cards to load from API
    await this.page.waitForSelector(
      "div.border-dark.overflow-hidden.rounded-xl.border.bg-white",
      { state: "attached" },
    );

    // Get all product card containers
    const productCards = await this.page
      .locator("div.border-dark.overflow-hidden.rounded-xl.border.bg-white")
      .all();

    if (productCards.length === 0) {
      throw new Error("No product cards found on the page");
    }

    // Select a random product card
    const randomCard = this.getRandomItem(productCards);

    // Extract product details from the card with more specific selectors
    const brandName = await randomCard
      .locator("div.text-default.text-xs.tracking-wider.uppercase")
      .first()
      .textContent();

    const productName = await randomCard
      .locator("a.text-primary.text-xl.leading-tight.font-semibold")
      .first()
      .textContent();

    // SKU is in the format "Item: XXX" - target this specific element
    const skuNumber = await randomCard
      .locator("div.flex.flex-col.gap-2 > div.text-default.text-sm")
      .first()
      .textContent();

    const listPrice = await randomCard
      .locator("div.text-primary.text-lg.line-through")
      .first()
      .textContent();

    const yourPrice = await randomCard
      .locator("div.text-primary.text-xl.font-semibold")
      .first()
      .textContent();

    // Tariff Amount has specific text content
    const tariffAmount = await randomCard
      .locator("div.text-default.text-sm.sm\\:min-h-5")
      .first()
      .textContent();

    // Store all product details
    this.selectedProductDetails = {
      brand: brandName.trim(),
      name: productName.trim(),
      sku: skuNumber.replace("Item:", "").trim(),
      listPrice: listPrice.replace("List Price:", "").trim(),
      yourPrice: yourPrice.replace("Your Price:", "").trim(),
      tariffAmount: tariffAmount.replace("Tariff Amount:", "").trim(),
    };

    console.log("Selected Product Details:", this.selectedProductDetails);

    // Click the product link
    const productLink = randomCard.locator("a.text-primary.text-xl").first();
    await productLink.click();

    return this.selectedProductDetails;
  }

  // ==================== PRODUCT DETAILS PAGE VERIFICATION (existing) ====================

  // Step: "verify all product detail fields on the product details page match the card"
  // Kept from existing file — verifies brand, name, SKU, listPrice, yourPrice, tariff
  async verifySelectedProductDetailsPage() {
    if (!this.selectedProductDetails) {
      throw new Error(
        "No product was selected. Call clickOnRandomProductCard() first.",
      );
    }

    // Wait for product details page to load
    await this.page.waitForSelector(
      "//div[@class='text-primary text-xl leading-tight font-semibold lg:text-2xl']//h1",
      { state: "visible" },
    );

    // Verify Brand Name
    const detailsBrandName = await this.actions.findElementByXpath(
      "//div[@class='text-default text-sm font-medium tracking-wider uppercase']",
    );
    const actualBrand = (await detailsBrandName.textContent()).trim();

    if (actualBrand !== this.selectedProductDetails.brand) {
      throw new Error(
        `Brand mismatch: Expected "${this.selectedProductDetails.brand}" but found "${actualBrand}"`,
      );
    }

    // Verify Product Name
    const detailsProductName = await this.actions.findElementByXpath(
      "//div[@class='text-primary text-xl leading-tight font-semibold lg:text-2xl']//h1",
    );
    const actualProductName = (await detailsProductName.textContent()).trim();

    if (actualProductName !== this.selectedProductDetails.name) {
      throw new Error(
        `Product name mismatch: Expected "${this.selectedProductDetails.name}" but found "${actualProductName}"`,
      );
    }

    // Verify SKU Number
    const detailsSku = await this.actions.findElementByXpath(
      "//div[@class='text-default text-sm' and contains(text(), 'SKU:')]",
    );
    const actualSku = (await detailsSku.textContent())
      .replace("SKU:", "")
      .trim();

    if (actualSku !== this.selectedProductDetails.sku) {
      throw new Error(
        `SKU mismatch: Expected "${this.selectedProductDetails.sku}" but found "${actualSku}"`,
      );
    }

    // Verify List Price
    const detailsListPrice = await this.actions.findElementByXpath(
      "//div[@class='text-default text-lg line-through']",
    );
    const actualListPrice = (await detailsListPrice.textContent())
      .replace("List Price:", "")
      .trim();

    if (actualListPrice !== this.selectedProductDetails.listPrice) {
      throw new Error(
        `List Price mismatch: Expected "${this.selectedProductDetails.listPrice}" but found "${actualListPrice}"`,
      );
    }

    // Verify Your Price
    const detailsYourPrice = await this.actions.findElementByXpath(
      "//div[@class='text-primary text-lg font-semibold lg:text-2xl']",
    );
    const actualYourPrice = (await detailsYourPrice.textContent())
      .replace("Your Price:", "")
      .trim();

    if (actualYourPrice !== this.selectedProductDetails.yourPrice) {
      throw new Error(
        `Your Price mismatch: Expected "${this.selectedProductDetails.yourPrice}" but found "${actualYourPrice}"`,
      );
    }

    // Verify Tariff Amount
    const detailsTariff = await this.actions.findElementByXpath(
      "//div[@class='text-default text-lg' and contains(text(), 'Tariff Amount:')]",
    );
    const actualTariff = (await detailsTariff.textContent())
      .replace("Tariff Amount:", "")
      .replace("(Excluded From Pricing)", "")
      .trim();

    if (actualTariff !== this.selectedProductDetails.tariffAmount) {
      throw new Error(
        `Tariff Amount mismatch: Expected "${this.selectedProductDetails.tariffAmount}" but found "${actualTariff}"`,
      );
    }

    console.log("✓ All product details verified successfully");
  }

  // ==================== PRODUCT CARD ASSERTIONS (first card) ====================

  // Step: "verify the brand on the first product card matches the expected brand"
  async verifyFirstCardBrand(expectedBrand) {
    const brand = await this.searchPageComponent.getFirstCardBrandText();
    if (!brand.toLowerCase().includes(expectedBrand.toLowerCase())) {
      throw new Error(
        `Expected brand "${expectedBrand}", but found "${brand}" on first product card`,
      );
    }
    console.log(`✓ First card brand verified: "${brand}"`);
  }

  // Step: "verify the product name on the first card contains the expected text"
  async verifyFirstCardProductName(expectedName) {
    const name = await this.searchPageComponent.getFirstCardProductName();
    if (!name.toLowerCase().includes(expectedName.toLowerCase())) {
      throw new Error(
        `Expected product name to contain "${expectedName}", but found "${name}"`,
      );
    }
    console.log(`✓ First card product name verified: "${name}"`);
  }

  // Step: "verify the item number on the first card matches the expected SKU"
  async verifyFirstCardItemNumber(expectedSku) {
    const item = await this.searchPageComponent.getFirstCardItemNumber();
    if (!item.includes(expectedSku)) {
      throw new Error(
        `Expected item number "${expectedSku}", but found "${item}"`,
      );
    }
    console.log(`✓ First card item number verified: "${item}"`);
  }

  // Step: "verify the stock status on the first card"
  async verifyFirstCardStockStatus(expectedStatus) {
    const status = await this.searchPageComponent.getFirstCardStockStatus();
    if (!status.toLowerCase().includes(expectedStatus.toLowerCase())) {
      throw new Error(
        `Expected stock status "${expectedStatus}", but found "${status}"`,
      );
    }
    console.log(`✓ First card stock status verified: "${status}"`);
  }

  // Step: "verify the tariff amount on the first card"
  async verifyFirstCardTariffAmount(expectedTariff) {
    const tariff = await this.searchPageComponent.getFirstCardTariffAmount();
    if (!tariff.includes(expectedTariff)) {
      throw new Error(
        `Expected tariff "${expectedTariff}", but found "${tariff}"`,
      );
    }
    console.log(`✓ First card tariff amount verified: "${tariff}"`);
  }

  // Step: "navigate to the product details page by clicking the first card"
  async clickFirstProductCard() {
    await this.searchPageComponent.clickFirstProductCard();
  }

  // Step: "click the wishlist icon on the first product card"
  async clickFirstCardWishlistIcon() {
    await this.searchPageComponent.clickFirstCardWishlistIcon();
  }

  // ==================== QUANTITY AND CART ====================

  // Step: "set the quantity on the first product card"
  async setQuantityOnFirstCard(quantity) {
    await this.searchPageComponent.setQuantityOnFirstCard(quantity);
  }

  // Step: "click Add to Cart on the first product card"
  async clickAddToCartOnFirstCard() {
    await this.searchPageComponent.clickAddToCartOnFirstCard();
  }

  // Step: "verify the cart sidebar opens"
  async verifyCartSidebarOpen() {
    await this.searchPageComponent.verifyCartSidebarIsOpen();
  }

  // Step: "verify the cart sidebar shows the correct quantity"
  async verifyCartSidebarQuantity(expectedQty) {
    const qty = await this.searchPageComponent.getCartSidebarQuantity();
    if (!qty.includes(String(expectedQty))) {
      throw new Error(
        `Expected cart quantity "${expectedQty}", but found "${qty}"`,
      );
    }
    console.log(`✓ Cart quantity verified: ${qty}`);
  }

  // Step: "verify the cart subtotal matches the calculated total"
  async verifyCartSubtotal(expectedTotal) {
    const subtotal = await this.searchPageComponent.getCartSidebarSubtotal();
    if (!subtotal.includes(expectedTotal)) {
      throw new Error(
        `Expected cart subtotal "${expectedTotal}", but found "${subtotal}"`,
      );
    }
    console.log(`✓ Cart subtotal verified: ${subtotal}`);
  }

// ==================== SKU SEARCH VERIFICATION ====================

// searchPageComponent.js
async verifySearchHeadingContains(expectedHeading) {
  const heading = await this.page.locator('h1').innerText();
  if (!heading.toLowerCase().includes(expectedHeading.toLowerCase())) {
    throw new Error(`Search heading "${heading}" does not contain keyword "${expectedHeading}"`);
  }
  console.log(`✓ Search heading verified: "${heading}"`);
}



  // ==================== PAGINATION ====================

  // Step: "click Load More to load additional search results"
  async clickLoadMore() {
    await this.searchPageComponent.clickLoadMoreButton();
  }

  // Step: "verify more product cards appeared after Load More"
  async verifyMoreResultsLoadedAfter(previousCount) {
    const newCount = await this.searchPageComponent.getSearchResultCardCount();
    if (newCount <= previousCount) {
      throw new Error(
        `Expected more than ${previousCount} results after Load More, but still found ${newCount}`,
      );
    }
    console.log(
      `✓ Load More verified: went from ${previousCount} to ${newCount} cards`,
    );
  }
} 