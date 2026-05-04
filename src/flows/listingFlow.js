import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/homePage";
import { ProductListingPage } from "../pages/productListingPage";
import { LoginFlow } from "./loginFlow";
import { WhislistPage } from "../pages/myAccountPage";
import { CartPage } from "../pages/cartPage";
import { PAGE_TITLES } from "../utils/data/metaData";

export class ListingFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.listingPage = new ProductListingPage(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
    this.whislistPage = new WhislistPage(page, actions);
    this.cartPage = new CartPage(page, actions);
  }

  async navigateToListingPageByNavLinkAndVerify(navLink, pageTitle) {
    await this.listingPage.clickOnNavlinkByNavLinkText(navLink);
    await this.listingPage.verifyProductListingPageByTitle(pageTitle);
  }

  // ======= Navigate to Category or SubCategory in Listing Page =======
  async navigateToCategoryOrSubCategoriesInListingPageAndVerify(
    categoryOrSubCategory,
    categoryOrSubCategoryTitle
  ) {
    await this.listingPage.clickCategoryOrSubCategoryInListingPage(categoryOrSubCategory);
    await this.listingPage.verifyCategoryOrSubCategoryInListingPage(categoryOrSubCategoryTitle);
  }

  // ======= Navigate to Category and All SubCategories =======
  async navigateToCategoryAndAllSubCategoriesInListingPageAndVerify(subCategories) {
    await this.listingPage.clickCategoryAndAllSubCategoriesInListingPageAndVerify(subCategories);
  }

  // ======= Apply Filters =======
  async appliedFiltersInListingPageFilterAndVerify(
    filterName,
    filterOptions,
    specialFilters = [{ elementIndex: 0, elementName: "" }],
    isAppliedFilter = true
  ) {
    if (isAppliedFilter) {
      await this.listingPage.clickFilterDropdown(filterName);
    }
    await this.listingPage.clickFiltersInListingPageFilterAndVerify(filterOptions, specialFilters, isAppliedFilter);
  }

  async applyCustomFiltersInListingPageAndVerify(customFilters, isAppliedFilter = true) {
    await this.listingPage.clickCustomFiltersInListingPageAndVerify(customFilters, isAppliedFilter);
  }

  async applyPriceRangeFilterInListingPageAndVerify(filterName) {
    await this.listingPage.clickFilterDropdown(filterName);
    await this.listingPage.applyRandomlyPriceRangeFilter();
  }

  // ======= Apply Sorting =======
  async applySortingPriceInListingPageAndVerify(sortingOption, isLowToHigh = true) {
    await this.listingPage.clickSortByOptionInListingPage();
    await this.listingPage.applySortingInListingPage(sortingOption);
    await this.listingPage.verifySortingPriceInListingPage(isLowToHigh);
  }

  async applySortingProductTagInListingPageAndVerify(TagName) {
    await this.listingPage.clickSortByOptionInListingPage();
    await this.listingPage.applySortingInListingPage(TagName);
    await this.listingPage.verifySortingProductTagInListingPage(TagName);
    await this.listingPage.verifyProductTagsInListingPageToDetailsPage();
  }

  async verifyProductTagsInListingPageToDetailsPage() {
    await this.listingPage.verifyProductTagsInListingPageToDetailsPage();
  }

  // ******************* Small Flow Utilities ***************************

  async NavigateToProductListingPageRandomly() {
    await this.homepage.hoverOvernavlinkrandomly();
    await this.homepage.clickOnTheOneSublinkInSubNavDropdown();
    await this.homepage.verifyPageRedirectionToProductListingPage();
  }

  // ====== Navigate to Clearance Item Listing Page ======
  async NavigateToClearanceItemListingPage() {
    await this.ClickOnButtonByTagAndTitle("a", "Imtra Clearance Items");
    await this.verifyPageTitle("Clearance Items");
    await this.verifyBreadcrumb("Clearance Items");
    await this.verifyPageHeader("h1", "Clearance Items");
  }

  async NavigateToVimarListingPage() {
    await this.ClickOnButtonByTagAndTitle("a", "Vimar");
    await this.verifyPageTitle("Vimar");
    await this.verifyBreadcrumb("Vimar");
    await this.verifyPageHeader("h1", "Vimar");
  }

  async VerifyTheSearchFilterFunctionality() {
    await this.NavigateToProductListingPageRandomly();
    await this.listingPage.searchFiltersInTheProductListing();
  }

  async VerifyBrandsFiltersFunctionality() {
    await this.NavigateToProductListingPageRandomly();
    await this.listingPage.clickFilterDropdown("Brands");
    await this.listingPage.selectAnyBrandFromBrandsFilter();
  }

  async navigateToCategoryAndAllSubCategoriesInListingPageAndVerifyDynamically() {
    await this.NavigateToProductListingPageRandomly();
    const categoriesData = {};

    const allCategories = await this.listingPage.listingComp.actions.findListOfElementByXpath(
      "//div[@role='tree']//button[@class='text-primary flex-1 cursor-pointer py-1.5 text-left text-sm hover:underline ']"
    );

    for (const categoryElement of allCategories) {
      const categoryName = (await categoryElement.textContent()).trim();
      categoriesData[categoryName] = [];
    }

    console.log("Extracted categories:", JSON.stringify(categoriesData, null, 2));
    await this.navigateToCategoryAndAllSubCategoriesInListingPageAndVerify(categoriesData);
  }

  async navigateToProductDetailsPage() {
    await this.NavigateToProductListingPageRandomly();
    await this.listingPage.clickOnRandomProductCard();
    await this.listingPage.verifySelectedProductDetailsPage();
  }

  async VerifyWishlistFunctionalityWithoutLogin() {
    await this.NavigateToProductListingPageRandomly();
    await this.listingPage.clickOnWishlistIcon();
    await this.validateModal("Info", "Please login to add to wishlist");
  }

  async VerifyWishlistFunctionalityWithLogin(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(1);
    await this.NavigateToProductListingPageRandomly();
    const wishlistProductName = await this.listingPage.clickOnWishlistIcon();
    await this.homepage.hoverOverTheAccountIconClickOnWhislist();
    await this.verifyPageTitle("Wishlist");
    await this.whislistPage.verifyProductInWishlist(wishlistProductName);
  }

  async VerifyAddToCartFunctionality() {
    await this.NavigateToProductListingPageRandomly();
    await this.cartPage.clickOnAddToCartAndVerifyTheCartDetails();
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
  }
}
