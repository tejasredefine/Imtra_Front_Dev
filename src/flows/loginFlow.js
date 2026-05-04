import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { ProductListingPage } from "../pages/productListingPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { BasePage } from "../pages/BasePage";

export class LoginFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.loginPage = new LoginPage(page, actions);
    this.homepage = new HomePage(page, actions);
    this.productListingPage = new ProductListingPage(page, actions);
    this.productDetailsPage = new ProductDetailsPage(page, actions);
  }

  // ************* UTILITIES ******************************

  async login(email, password) {
    await this.verifyPageTitle("Sign In - IMTRA");
    await this.loginPage.enterEmail(email, "LoginEmail");
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickOnLoginButton();
  }

  async navigateToRandomProduct() {
    await this.homepage.hoverOvernavlinkrandomly();
    await this.homepage.clickOnTheOneSublinkInSubNavDropdown();
    await this.homepage.verifyPageRedirectionToProductListingPage();
    await this.productListingPage.clickOnRandomProductCard();
    await this.productListingPage.verifySelectedProductDetailsPage();
  }

  // ******************************************************

  // ---------- Login with valid credentials --------------
  async LoginAndVerifyRedirection(email, password, expectedTitle) {
    await this.loginPage.clickOnLoginIcon();
    await this.login(email, password);
    await this.verifyPageTitle(expectedTitle);
  }

  // ---------- Login from the Quote link ----------------
  async PerformLoginFromQuote(email, password, expectedTitle) {
    await this.homepage.clickOnTheQuote();
    await this.login(email, password);
    await this.verifyPageTitle(expectedTitle);
  }

  // ------- Login From Product Details Page (Add customer Item number) ---------
  async performLoginFromProductDetailsPage(email, password) {
    await this.navigateToRandomProduct();
    await this.productDetailsPage.clickOnTheAddYourcustomerItemNumberLink();
    await this.login(email, password);
  }

  // ---------- Login From Product Details Page (customer Review) -------------
  async performLoginFromProductDetailsPageCustomerReview(email, password) {
    await this.navigateToRandomProduct();
    await this.productDetailsPage.clickOnTheLoginButtonInTheCustomerReviewSection();
    await this.login(email, password);
  }

  // ---------- Login with wrong Email/Password -----------------------
  async performLoginWithWrongEmailPassword(email, password, type, errorMessage) {
    await this.loginPage.clickOnLoginIcon();
    await this.login(email, password);
    await this.validateModal(type, errorMessage);
  }

  // --------------- Forgot Password Scenarios ------------------------
  async performForgotpassword(email, type, message) {
    await this.loginPage.clickOnLoginIcon();
    await this.verifyPageTitle("Sign In - IMTRA");
    await this.loginPage.clickOnForgotPassword();
    await this.loginPage.enterEmail(email, "ForgotPasswordEmail");
    await this.loginPage.clickOnSendlink();
    await this.validateModal(type, message);
  }
}
