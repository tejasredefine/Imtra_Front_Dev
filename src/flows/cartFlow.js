import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/homePage";
import { ProductListingPage } from "../pages/productListingPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { LoginFlow } from "./loginFlow";
import { WhislistPage } from "../pages/myAccountPage";
import { CartPage } from "../pages/cartPage";
import { PAGE_TITLES } from "../utils/data/metaData";

export class CartFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.productListingPage = new ProductListingPage(page, actions);
    this.productDetailsPage = new ProductDetailsPage(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
    this.whislistPage = new WhislistPage(page, actions);
    this.cartPage = new CartPage(page, actions);
  }

  // ******************* Small Flow Utilities ***************************

  async NavigateToProductListingPageRandomly() {
    await this.homepage.hoverOvernavlinkrandomly();
    await this.homepage.clickOnTheOneSublinkInSubNavDropdown();
    await this.homepage.verifyPageRedirectionToProductListingPage();
  }

  // ********************************************************************

  // ======== Cart Navigation Methods =================

  async NavigateToCartPageFromProductDetailsPage() {
    await this.homepage.hoverOvernavlinkrandomly();
    await this.homepage.clickOnTheOneSublinkInSubNavDropdown();
    await this.homepage.verifyPageRedirectionToProductListingPage();
    await this.productListingPage.clickOnRandomProductCard();
    await this.productListingPage.verifySelectedProductDetailsPage();
    await this.ClickOnButtonByTagAndText("span", "ADD TO CART");
    await this.verifyPageTitle("Cart - IMTRA");
  }

  // FIX: renamed from NavigateToCartPageFromProductDeatailsPage (typo) to correct spelling
  // Alias kept for backward compatibility
  async NavigateToCartPageFromProductDeatailsPage() {
    return this.NavigateToCartPageFromProductDetailsPage();
  }

  async NavigateToCartPageFromNavCartIcon(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
  }

  // ========== Cart Sidebar Methods ==================

  async EmptyCartTesting() {
    await this.ClickOnButtonByTagAndText("a", "Thrusters");
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.EmptyCartSidebarTesting(PAGE_TITLES.HOME);
  }

  async CartSidebarDetailsVerificationTesting() {
    await this.NavigateToProductListingPageRandomly();
    await this.cartPage.clickOnAddToCartAndVerifyTheCartDetails();
  }

  async CartSidebarTotalVerifications(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.verifyCartSidebarCalculations();
  }

  // FIX: original had two methods with the same name CartSidebarTotalVerificaions —
  // second one silently overwrote the first. Renamed to CartSidebarItemRemoval.
  async CartSidebarItemRemoval(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.cartSidebarItemRemove();
  }

  async NavigateToCartPageAndVerifyAllDetails(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.NavigateToCartPageAndVerifyDetailsOfSidebarAndCartPage();
  }

  async NavigateToCheckoutPage(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.ClickOnButtonByTagAndText("a", "Checkout Now");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("IMTRA - Checkout");
  }

  async NoteFunctionalityTesting(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
    await this.actions.addSleep(3);
    await this.cartPage.addANote("This is a testing Note");
    await this.cartPage.editNote("This is Edited testing Note", "This is a testing Note");
    await this.cartPage.tryToDeleteNote("This is Edited testing Note");
  }

  async SaveForLaterWithoutLogin() {
    await this.NavigateToCartPageFromProductDetailsPage();
    const saveForLater = await findElementByXpath("//span[text()='Save for later']");
    await click(saveForLater);
    await this.validateModal("Info", "Please login to add to wishlist");
  }

  async SaveForLaterWithLogin(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
    await this.actions.addSleep(2);
    await this.cartPage.clickOnSaveForLaterButtonAndVerifyitIntheWhislistPage();
  }

  async ContinueShoppingButtonTesting(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Continue Shopping");
    await this.actions.addSleep(1);
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }

  async ClearAllButtonTesting() {
    await this.NavigateToCartPageFromProductDetailsPage();
    await this.cartPage.VerifyClearAllButtonFuntionality();
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }

  async SingleItemRemovalTest() {
    await this.NavigateToCartPageFromProductDetailsPage();
    await this.cartPage.DeleteSingleItem();
  }

  async ProductQuantityVariationTesting() {
    await this.NavigateToCartPageFromProductDetailsPage();
    const { calculatedSubtotal, calculatedTariff, calculatedTotal } =
      await this.cartPage.GetUnitPriceAndTarrifIncreaseQuantityAndCalculateTotals();
    await this.cartPage.VarifyCardSubtotals(calculatedSubtotal, calculatedTariff);
    await this.cartPage.VarifyOrderSummary(calculatedSubtotal, calculatedTariff, calculatedTotal);
  }

  async ValidPromoCodeTesting() {
    await this.NavigateToCartPageFromProductDetailsPage();
    const { OrderSubtotal, OrderTariff } =
      await this.cartPage.GetOrderSummaryBeforeAppliyingPromoCode();
    const discountAmount = await this.cartPage.EnterPromoCodeAndReturnDiscount(
      "DVTEST01",
      "10",
      OrderSubtotal
    );
    await this.cartPage.ValidateOrderSummary(discountAmount, OrderSubtotal, OrderTariff);
  }

  async ValidPromoCodeRemovalTesting() {
    await this.NavigateToCartPageFromProductDetailsPage();
    const { OrderSubtotal, OrderTotal } =
      await this.cartPage.GetOrderSummaryBeforeAppliyingPromoCode();
    const discountAmount = await this.cartPage.EnterPromoCodeAndReturnDiscount(
      "DVTEST01",
      "10",
      OrderSubtotal
    );
    await this.cartPage.RemovePromoCode(OrderTotal);
  }

  async InvalidPromoCodeTesting() {
    await this.NavigateToCartPageFromProductDetailsPage();
    await this.cartPage.AddInvalidPromocodeTest();
  }

  async CheckoutNowButtonTest(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.verifyPageTitle("Cart - IMTRA");
    await this.ClickOnButtonByTagAndText("a", "CHECKOUT NOW");
    await this.actions.addSleep(1);
    await this.verifyPageTitle("IMTRA - Checkout");
  }

  async RequestBulkConsultationButtonTest(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.verifyPageTitle("Cart - IMTRA");
    await this.ClickOnButtonByTagAndText("a", "REQUEST BULK CONSULTATION");
    await this.actions.addSleep(1);
    await this.verifyPageTitle("Bulk Request Consultation - IMTRA");
  }
}
