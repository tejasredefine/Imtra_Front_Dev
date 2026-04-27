import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/homePage";
import { CartFlow } from "./cartFlow";
import { CartPage } from "../pages/cartPage";
import { QuotePage } from "../pages/QuotePage";
import { LoginFlow } from "./loginFlow";
import { PAGE_TITLES } from "../utils/data/metaData";
import { ProductListingPage } from "../pages/productListingPage";

export class QuoteFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.cartPage = new CartPage(page, actions);
    this.quotePage = new QuotePage(page, actions);
    this.cartFlow = new CartFlow(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
    this.productListingPage = new ProductListingPage(page, actions);
  }

  async NavigateToCartPageFromNavCartIcon(email, password, expectedTitle) {
    await this.cartFlow.NavigateToCartPageFromNavCartIcon(
      email,
      password,
      expectedTitle,
    );
  }

  async NavigateToCartPageFromProductDeatailsPage() {
    await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
  }

  async AddaQuoteWhithoutLogin() {
    await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
    await this.ClickOnButtonByTagAndText("button", "ADD TO QUOTE");
    await addSleep(2);
    await this.verifyPageTitle(PAGE_TITLES.SIGN_IN);
  }

  async ClickOnQuoteWithoutlogin() {
    await this.homepage.clickOnTheQuote();
    await this.verifyPageTitle(PAGE_TITLES.SIGN_IN);
  }

  async ClickOnQuoteAfterlogin(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.homepage.clickOnTheQuote();
    await this.verifyPageTitle("IMTRA - Quotes");
  }

  async AddtoQuote(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
    await this.ClickOnButtonByTagAndText("button", "ADD TO QUOTE");
    await this.quotePage.AddaQuote();
  }

  async ConvertQuoteToCart(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.homepage.clickOnTheQuote();
    await this.verifyPageTitle("IMTRA - Quotes");
    await this.quotePage.ConvertQuoteToCart();
  }

  async DeleteItemInCartConvertedFromTheQuote(email, password, expectedTitle) {
    await this.ConvertQuoteToCart(email, password, expectedTitle);
    await this.quotePage.ClickOnDeleteAndVerify();
  }

  async CartItemAutoConvertToQuoteUponAddingTheQuotetoCart(
    email,
    password,
    expectedTitle,
  ) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
    await addSleep(3);
    await this.quotePage.GetCartItemAndConverNewQuoteToCartAndSeeTheCartItemConvertedToQuote();
  }

  async TrytoDecreaseItemQuantityConvertedFromQuotetoCart(
    email,
    password,
    expectedTitle,
  ) {
    await this.ConvertQuoteToCart(email, password, expectedTitle);
    await this.quotePage.clickOnMinusIconInCartItems();
  }

  async AddNewProductToCartConvertedFromQuoteAndTryToDecreaseItsQuantityAndRemoveIt(
    email,
    password,
    expectedTitle,
  ) {
    await this.ConvertQuoteToCart(email, password, expectedTitle);
    await this.homepage.hoverOvernavlinkrandomly();
    await this.homepage.clickOnTheOneSublinkInSubNavDropdown();
    await this.homepage.verifyPageRedirectionToProductListingPage();
    await this.productListingPage.clickOnRandomProductCard();
    const productName =
      await this.productListingPage.verifySelectedProductDetailsPage();
    await this.ClickOnButtonByTagAndText("span", "ADD TO CART");
    await addSleep(3);
    await this.verifyPageTitle("Cart - IMTRA");
    await this.quotePage.ClickOnTheDecreasebuttonofNewlyAddedProductAndClickOnDeleteButtonOfNewlyAddedProduct(
      productName,
    );
  }

  async ClearAllButtonTestConvertedFromTheCart(email, password, expectedTitle) {
    await this.ConvertQuoteToCart(email, password, expectedTitle);
    await this.ClickOnButtonByTagAndText("button", "CLEAR ALL");
    await this.validateModal(
      "Confirm",
      "Are you sure you want to clear all items from your cart?",
    );
    await this.ClickOnButtonByTagAndText("button", "Yes");
    await addSleep(1);
    await this.validateModal(
      "Error",
      "This cart is linked to a quote and cannot be deleted. Please contact sales to modify the quote.",
    );
  }

  async StatusDropDownTest(email, password, expectedTitle, status) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await this.homepage.clickOnTheQuote();
    await this.verifyPageTitle("IMTRA - Quotes");
    await this.quotePage.selectOptionFromDorpdownandVerifyStatus(status);
  }

  async NoteModalValidationMessageTest(email, password, expectedTitle) {
    await this.NavigateToCartPageFromNavCartIcon(
      email,
      password,
      expectedTitle,
    );
    await this.quotePage.clickOnAddToQuoteButtonAndValidateValidationMessages();
  }
}
