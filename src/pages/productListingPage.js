import { expect } from "@playwright/test";
import { ListingComp } from "../components/listingComp";
export class ProductListingPage {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
    this.selectedProductName = null; // Store the selected product name
    this.listingComp = new ListingComp(page, actions);
  }

  getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  async clickOnRandomProductCard() {
    // Wait for product cards to be visible
    await this.page.waitForSelector("div.virtuoso-grid-item", {
      state: "visible",
    });

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

  async verifySelectedProductDetailsPage() {
    if (!this.selectedProductDetails) {
      throw new Error(
        "No product was selected. Call clickOnRandomProductCard() first.",
      );
    }

    await addSleep(2);

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
      .split("(")[0]
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
    return actualProductName;
  }

  async clickOnNavlinkByNavLinkText(navLinkText) {
    await this.listingComp.clickOnNavLink(navLinkText);
    await this.page.mouse.move(0, 20);
  }

  async verifyProductListingPageByTitle(pageTitle) {
    await this.listingComp.verifyProductListingPageByTitle(pageTitle);
  }

  async clickCategoryOrSubCategoryInListingPage(categoryOrSubCategory) {
    await this.listingComp.clickCategoryOrSubCategoryInListingPage(
      categoryOrSubCategory,
    );
  }

  async verifyCategoryOrSubCategoryInListingPage(categoryOrSubCategoryTitle) {
    await this.listingComp.verifyCategoryOrSubCategoryInListingPage(
      categoryOrSubCategoryTitle,
    );
  }

  async clickCategoryAndAllSubCategoriesInListingPageAndVerify(subCategories) {
    await this.listingComp.clickCategoryAndAllSubCategoriesInListingPageAndVerify(
      subCategories,
    );
  }

  async clickFiltersInListingPageFilterAndVerify(
    filterOptions,
    specialFilters = [{ elementIndex: 0, elementName: "" }],
    isAppliedFilter = true,
  ) {
    await this.listingComp.clickFilterInListingPageAndVerify(
      filterOptions,
      specialFilters,
      isAppliedFilter,
    );
  }
  async clickCustomFiltersInListingPageAndVerify(customFilters, isAppliedFilter = true) {
    await this.listingComp.clickCustomFiltersInListingPageAndVerify(customFilters, isAppliedFilter);
  }

  async clickFilterDropdown(filterName) {
    await this.listingComp.clickFilterDropdown(filterName);
  }

  async applyRandomlyPriceRangeFilter() {
    await this.listingComp.applyRandomlyPriceRangeFilter();
  }

  async applySortingInListingPage(sortingOption) {
    await this.listingComp.applySortingInListingPage(sortingOption);
  }

  async verifySortingPriceInListingPage(isLowToHigh = true) {
    await this.listingComp.verifySortingPriceInListingPage(isLowToHigh);
  }
  async clickSortByOptionInListingPage() {
    await this.listingComp.clickSortByOptionInListingPage();
  }

  async verifySortingProductTagInListingPage(TagName) {
    await this.listingComp.verifySortingProductTagInListingPage(TagName);
  }

  async clickOnProductTagInListingPage() {
    const productCards = await this.page
      .locator("div.border-dark.overflow-hidden.rounded-xl.border.bg-white")
      .all();

    const TagArray = [];

    const randomCard = this.getRandomItem(productCards);

    const productTag = await randomCard
      .locator("div.z-10.rounded-xl.text-sm.absolute.h-auto.w-auto")
      .allTextContents();

    if (productTag.length > 0) {
      for (const tag of productTag) {
        TagArray.push(tag);
      }
      await click(randomCard);
    }
    else {
      return [];
    }
    return TagArray;
  }

  async verifyProductTagsInListingPageToDetailsPage() {
    const selectedProductTags = await this.clickOnProductTagInListingPage();
    await addSleep(2);
    console.log("Selected Product Tags:", selectedProductTags);

    // Verify Product Tags
    if (selectedProductTags.length > 0) {
      for (const tag of selectedProductTags) {
        const detailsProductTag = await this.actions.findElementByXpath(
          `//div[contains(text(), '${tag}')]`,
        );
        expect(detailsProductTag.isVisible()).toBeTruthy();
      }
    } else {
      console.log("Product Tags are not available on both listing page and detail page.");
      return;
    };
  }

  // ************************************************************************
  generateRandomSearchString() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
    }

    return result;
  }

  // ========= Search Anything in the Product listing filer search bar and verify that product displayed or no ============
  async searchFiltersInTheProductListing() {
    const searchbox = await this.actions.findInputById("quick-search");
    const searchTerm = this.generateRandomSearchString();
    const searchButton = await this.actions.findElementByXpath(
      "//button[@aria-label='Search']",
    );
    console.log(`Searching for: ${searchTerm}`);
    await fill(searchbox, searchTerm);
    await click(searchButton);
    await addSleep(2);

    let isProductCardVisible = false;
    let isNoProductsVisible = false;
    let firstProductCard, noProductsMessage;

    try {
      firstProductCard = await this.actions.findElementByXpath(
        "(//div[@class='border-dark overflow-hidden rounded-xl border bg-white text-left shadow-sm lg:h-[660px] flex flex-col '])[1]",
      );
      isProductCardVisible = await firstProductCard.isVisible();
    } catch (error) {
      isProductCardVisible = false;
    }

    try {
      noProductsMessage = await this.actions.findElementByXpath(
        "//div[contains(text(), 'No products found')]",
      );
      isNoProductsVisible = await noProductsMessage.isVisible();
    } catch (error) {
      isNoProductsVisible = false;
    }

    // If no products found message is displayed - test passes
    if (isNoProductsVisible) {
      return;
    }

    if (isProductCardVisible) {
      const productCardText = await firstProductCard.textContent();
      const isSearchTermPresent = productCardText
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (!isSearchTermPresent) {
        throw new Error(
          `Search term "${searchTerm}" not found in the first product card`,
        );
      }

      return;
    }

    // Neither displayed - fail the test
    throw new Error(
      `Neither product card nor "No products found" message is displayed after searching for "${searchTerm}"`,
    );
  }

  async selectAnyBrandFromBrandsFilter() {
    const brandFilters = await this.actions.findListOfElementByXpath(
      "//div[@id='filter-brand-Brands']//label[@class='hover:bg-light flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 transition-colors']",
    );

    if (brandFilters.length === 0) {
      throw new Error("No brand filters found");
    }

    const randomIndex = Math.floor(Math.random() * brandFilters.length);
    const selectedBrandFilter = brandFilters[randomIndex];

    // Get the full text content from the label and extract brand name
    const fullText = await selectedBrandFilter.textContent();
    const brandName = fullText.trim();

    // Click on the selected brand filter
    await click(selectedBrandFilter);
    await addSleep(2);

    // Find the first product card
    let firstProductCard;
    try {
      firstProductCard = await this.actions.findElementByXpath(
        "(//div[@class='border-dark overflow-hidden rounded-xl border bg-white text-left shadow-sm lg:h-[660px] flex flex-col '])[1]",
      );

      const isProductCardVisible = await firstProductCard.isVisible();

      if (!isProductCardVisible) {
        throw new Error(
          `No product card displayed after selecting brand filter "${brandName}"`,
        );
      }
    } catch (error) {
      throw new Error(
        `Product card not found after selecting brand filter "${brandName}"`,
      );
    }

    // Get the brand name from the product card using direct XPath
    const productBrandElement = await this.actions.findElementByXpath(
      "(//div[@class='border-dark overflow-hidden rounded-xl border bg-white text-left shadow-sm lg:h-[660px] flex flex-col '])[1]//div[@class='text-default text-xs tracking-wider uppercase']",
    );
    const displayedBrandName = (await productBrandElement.textContent()).trim();

    // Verify the brand name matches (case-insensitive comparison)
    if (displayedBrandName.toLowerCase() !== brandName.toLowerCase()) {
      throw new Error(
        `Brand mismatch: Selected "${brandName}" but product shows "${displayedBrandName}"`,
      );
    }
  }

  async clickOnWishlistIcon() {
    // Wait for product cards to be visible
    await this.page.waitForSelector("div.virtuoso-grid-item", {
      state: "visible",
    });

    // Get all product card containers
    const productCards = await this.page
      .locator("div.border-dark.overflow-hidden.rounded-xl.border.bg-white")
      .all();

    if (productCards.length === 0) {
      throw new Error("No product cards found on the page");
    }

    // Select a random product card
    const randomCard = this.getRandomItem(productCards);

    // Get the product name before clicking wishlist
    const productName = await randomCard
      .locator("a.text-primary.text-xl.leading-tight.font-semibold")
      .first()
      .textContent();

    this.wishlistProductName = productName.trim();

    // Find and click the wishlist icon button
    const wishlistButton = randomCard
      .locator("button[aria-label='Add to wishlist']")
      .first();

    await wishlistButton.click();
    await addSleep(1);

    console.log(
      `Clicked wishlist icon for product: ${this.wishlistProductName}`,
    );

    return this.wishlistProductName;
  }
  //  ************************************************************************
}
