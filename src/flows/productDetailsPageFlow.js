import { BasePage } from "../pages/BasePage";
import { PAGE_TITLES } from "../utils/data/metaData";
import { HomePage } from "../pages/homePage";
import { ProductListingPage } from "../pages/productListingPage";
import { SearchPage } from "../pages/searchPage";
import { ListingFlow } from "../flows/listingFlow";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { LoginFlow } from "./loginFlow";
import { WhislistPage } from "../pages/myAccountPage";
import { CartPage } from "../pages/cartPage";

export class ProductDetailsFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.productListingPage = new ProductListingPage(page, actions);
    this.productDetailsPage = new ProductDetailsPage(page, actions);
    this.searchPage = new SearchPage(page, actions);
    this.listingpageFlow = new ListingFlow(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
    this.whislistPage = new WhislistPage(page, actions);
    this.cartPage = new CartPage(page, actions);
  }

  async NavigateToProductDetailsPageFromHomepageFeaturedProductSection() {
    await this.verifyPageTitle(PAGE_TITLES.HOME);
    const featuredProductSecion = await findElementByXpath(
      "//a[@title='Vimar']",
    );
    await this.actions.scrollIntoView(featuredProductSecion);
    await addSleep(1);
    const selectedProductName =
      await this.homepage.clickOnAnyProductRandomalyInFeaturedProductSlider();
    await addSleep(1);
    await this.verifyPageHeader("h1", selectedProductName);
  }

  async NavigateToProductDetailsPageFromNavbar() {
    await this.verifyPageTitle(PAGE_TITLES.HOME);
    await this.homepage.hoverOvernavlinkrandomly();
    await this.homepage.clickOnTheOneSublinkInSubNavDropdown();
    await this.homepage.verifyPageRedirectionToProductListingPage();
    await this.productListingPage.clickOnRandomProductCard();
    await this.productListingPage.verifySelectedProductDetailsPage();
  }

  async NavigateToProductDetailsPageFromSearchPage() {
    await this.searchPage.enterSearchKeyword("d");
    await this.ClickOnButtonByTagAndText("span", "Search");
    await this.verifyPageTitle("Search Results");
    await this.searchPage.clickOnRandomProductCard();
    await this.searchPage.verifySelectedProductDetailsPage();
  }

  async NavigateToProductDetailsPageFromCartPage() {
    await this.listingpageFlow.VerifyAddToCartFunctionality();
    const button = await findElementByXpath(
      "//a[@class='text-primary line-clamp-2 text-base font-semibold']",
    );
    const productName = await this.actions.getText(button);
    console.log("Selected Product Name From Cart:", productName);
    await click(button);
    await addSleep(1);
    await this.verifyPageHeader("h1", productName);
  }

  async WhislistFuntionalityTesingWithouLogin() {
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnWhislistIcon();
    await this.validateModal("Info", "Please login to add to wishlist");
  }

  async WhislistFuntionalityTesingWithLogin(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    const productTitle = await findElementByXpath("//h1");
    const productName = await this.actions.getText(productTitle);
    await this.productDetailsPage.clickOnWhislistIcon();
    await this.homepage.hoverOverTheAccountIconClickOnWhislist();
    await this.verifyPageTitle("Wishlist");
    await this.whislistPage.verifyProductInWishlist(productName);
    await this.productDetailsPage.removeFromWhislist();
  }

  async WhislistFuntionalityTesingWithCarPage(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    const productTitle = await findElementByXpath("//h1");
    const productName = await this.actions.getText(productTitle);

    await this.productDetailsPage.clickOnWhislistIcon();
    await this.productDetailsPage.clickOnAddToCart();

    await this.cartPage.verifyProductInCartIsMarkedAsWishlist(productName);
  }

  async AddYourCustomerItemNumberTestingWhithoutLogin() {
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnTheAddYourcustomerItemNumberLink();
    await this.verifyPageTitle("Sign In - IMTRA");
  }

  async AddYourCustomerItemNumberTestingWithBlankNumber(
    email,
    password,
    expectedTitle,
  ) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnTheAddYourcustomerItemNumberLink();
    await this.productDetailsPage.verifyAddCustomerItemNumberPopup();
    await this.productDetailsPage.enterItemNumberAndSave("");
    await this.productDetailsPage.EditCustomerNumberLinkWillNotVisible();
  }

  async AddYourCustomerItemNumberTestingWithValidNumber(
    email,
    password,
    expectedTitle,
  ) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnTheAddYourcustomerItemNumberLink();
    await this.productDetailsPage.verifyAddCustomerItemNumberPopup();
    await this.productDetailsPage.enterItemNumberAndSave("205-CUPPs");
    await addSleep(1);
    await this.productDetailsPage.verifyItemNumberAddition("205-CUPPs");
  }

  async AddYourCustomerItemNumberTestingWithInvalidNumber(
    email,
    password,
    expectedTitle,
  ) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnTheAddYourcustomerItemNumberLink();
    await this.productDetailsPage.verifyAddCustomerItemNumberPopup();
    await this.productDetailsPage.enterItemNumberAndSave(
      "545-dfvbrb545-dfvbrb545-dfvbrb545-dfvbrb545-dfvbrb545-dfvbrb545-dfvbrb545-dfvbrb545-dfvbrbkdgholsduiv",
    );
    await this.productDetailsPage.verifyCustomerItemNumberErrorMessage(
      "Customer item number exceeds the maximum limit of 100 characters",
    );
  }

  async EditYourCustomerItemNumberTestingWithValidNumber(
    email,
    password,
    expectedTitle,
  ) {
    await this.AddYourCustomerItemNumberTestingWithValidNumber(
      email,
      password,
      expectedTitle,
    );
    await this.productDetailsPage.clickOnTheEditYourcustomerItemNumberLink();
    await this.productDetailsPage.verifyAddCustomerItemNumberPopup("205-CUPPs");
    await this.productDetailsPage.enterItemNumberAndSave("POP-UP-2034");
    await addSleep(1);
    await this.productDetailsPage.verifyItemNumberAddition("POP-UP-2034");
  }

  async RemoveCustomerItemNumbeTest(email, password, expectedTitle) {
    await this.AddYourCustomerItemNumberTestingWithValidNumber(
      email,
      password,
      expectedTitle,
    );
    await this.productDetailsPage.clickOnTheEditYourcustomerItemNumberLink();
    await this.productDetailsPage.verifyAddCustomerItemNumberPopup("205-CUPPs");
    await this.productDetailsPage.enterItemNumberAndSave(" ");
    await addSleep(1);
    await this.productDetailsPage.EditCustomerNumberLinkWillNotVisible();
  }

  async CancelCustomerItemNumbeTest(email, password, expectedTitle) {
    await this.AddYourCustomerItemNumberTestingWithValidNumber(
      email,
      password,
      expectedTitle,
    );
    await this.productDetailsPage.clickOnTheEditYourcustomerItemNumberLink();
    await this.productDetailsPage.verifyAddCustomerItemNumberPopup("205-CUPPs");
    await this.productDetailsPage.enterItemNumberAndCancel("Lojkg");
    await addSleep(2);
    await this.productDetailsPage.verifyItemNumberAddition("205-CUPPs");
  }

  async CancelAddCustomerItemNumbeTest(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnTheAddYourcustomerItemNumberLink();
    await this.productDetailsPage.verifyAddCustomerItemNumberPopup();
    await this.productDetailsPage.enterItemNumberAndCancel("Lojkg");
    await this.productDetailsPage.EditCustomerNumberLinkWillNotVisible();
  }

  async AddToCartFuntionalityTest() {
    await this.NavigateToProductDetailsPageFromNavbar();
    const cartData =
      await this.productDetailsPage.addRandomQuantityToCartFromDetailsPage();
    await addSleep(3);
    await this.verifyPageTitle("Cart - IMTRA");
    await addSleep(3);
    await this.productDetailsPage.verifyCartDetailsOnCartPage(cartData);
  }

  async VerifyRequestConsultationButton() {
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.ClickOnButtonByTagAndText("a", "Request Consultation");
    await addSleep(2);
    await this.verifyPageTitle("Request Consultation - IMTRA");
  }

  async ImportantWarningSectionTest() {
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.ImportantWarningSecionTest();
  }

  async PerformWriteAReview(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnWriteAReviewAndVerifyPageRedirection();
    await this.productDetailsPage.AddaReviewDetailsTestCases();
  }

  async ValidaeErrorMessagesOnTheWriteAReviewPage(
    email,
    password,
    expectedTitle,
  ) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.NavigateToProductDetailsPageFromNavbar();
    await this.productDetailsPage.clickOnWriteAReviewAndVerifyPageRedirection();
    await this.productDetailsPage.ValidateErrorMessageReviewDetailsPage();
  }
}
