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

  // ======== Cart Navigation Method =================
  async NavigateToCartPageFromProductDeatailsPage() {
    await this.homepage.hoverOvernavlinkrandomly();
    await this.homepage.clickOnTheOneSublinkInSubNavDropdown();
    await this.homepage.verifyPageRedirectionToProductListingPage();
    await this.productListingPage.clickOnRandomProductCard();
    await this.productListingPage.verifySelectedProductDetailsPage();
    await this.ClickOnButtonByTagAndText("span", "ADD TO CART");
    await this.verifyPageTitle("Cart - IMTRA");
  }

  async NavigateToCartPageFromNavCartIcon(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
  }

  // ========== Cart Sidebar Method ==================
  // ------------ Empty Cart Tesing ------------------
  async EmptyCartTesting() {
    await this.ClickOnButtonByTagAndText("a", "Thrusters");
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.EmptyCartSidebarTesting(PAGE_TITLES.HOME);
  }

  // --- Cart Item Additon And verificaion Testing --
  async CartSidebarDetailsVerificationesting() {
    await this.NavigateToProductListingPageRandomly();
    await this.cartPage.clickOnAddToCartAndVerifyTheCartDetails();
  }

  // ---- Cart Sidebar Values Calculation Testing ---
  async CartSidebarTotalVerificaions(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.verifyCartSidebarCalculations();
  }

  // ---- Cart Sidebar Item Removal Testing ---
  async CartSidebarTotalVerificaions(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.cartSidebarItemRemove();
  }

  async NavigateToCartPageAndVerifyAllDeails(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.cartPage.NavigateToCartPageAndVerifyDetailsOfSidebarAndCartPage();
  }

  async NavigateToCheckoutPage(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(1);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.ClickOnButtonByTagAndText("a", "Checkout Now");
    await addSleep(2);
    await this.verifyPageTitle("IMTRA - Checkout");
  }

  async NoteFuntionalityTesting(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );

    await addSleep(2);

    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
    await this.actions.addSleep(3);

    await this.cartPage.addANote("This is a testing Note");
    await this.cartPage.editNote(
      "This is Edited tesing Note",
      "This is a testing Note",
    );
    await this.cartPage.tryToDeleteNote("This is Edited tesing Note");
  }

  async SaveForLaterWithoutLogin() {
    await this.NavigateToCartPageFromProductDeatailsPage();
    const saveForLater = await findElementByXpath(
      "//span[text()='Save for later']",
    );
    await click(saveForLater);
    await this.validateModal("Info", "Please login to add to wishlist");
  }

  async SaveForLaterWithLogin(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );

    await addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");
    await this.actions.addSleep(2);
    await this.cartPage.clickOnSaveForLaterButtonAndVerifyitIntheWhislistPage();
  }

  async ContinueShoppingButtonTesing(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(2);
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

  async ClearAllButtonTesing() {
    await this.NavigateToCartPageFromProductDeatailsPage();
    await this.cartPage.VerifyClearAllButtonFuntionality();
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }

  async SingleItemRemovalTest() {
    await this.NavigateToCartPageFromProductDeatailsPage();
    await this.cartPage.DeleteSingleItem();
  }

  async ProductQuantityVariationTesting() {
    await this.NavigateToCartPageFromProductDeatailsPage();
    const { calculatedSubtotal, calculatedTariff, calculatedTotal } =
      await this.cartPage.GetUnitPriceAndTarrifIncreaseQuantityAndCalculateTotals();
    await this.cartPage.VarifyCardSubtotals(
      calculatedSubtotal,
      calculatedTariff,
    );
    await this.cartPage.VarifyOrderSummary(
      calculatedSubtotal,
      calculatedTariff,
      calculatedTotal,
    );
  }

  async ValidPromoCodeTesting() {
    await this.NavigateToCartPageFromProductDeatailsPage();
    const { OrderSubtotal, OrderTariff } =
      await this.cartPage.GetOrderSummaryBeforeAppliyingPromoCode();
    const discountAmount = await this.cartPage.EnterPromoCodeAndReturnDiscount(
      "DVTEST01",
      "10",
      OrderSubtotal,
    );
    await this.cartPage.ValidateOrderSummary(
      discountAmount,
      OrderSubtotal,
      OrderTariff,
    );
  }

  async ValidPromoCodeRemovalTesting() {
    await this.NavigateToCartPageFromProductDeatailsPage();
    const { OrderSubtotal, OrderTotal } =
      await this.cartPage.GetOrderSummaryBeforeAppliyingPromoCode();
    const discountAmount = await this.cartPage.EnterPromoCodeAndReturnDiscount(
      "DVTEST01",
      "10",
      OrderSubtotal,
    );
    await this.cartPage.RemovePromoCode(OrderTotal);
  }

  async InvalidPromoCodeTesting() {
    await this.NavigateToCartPageFromProductDeatailsPage();
    await this.cartPage.AddInvalidPromocodeTest();
  }

  async CheckoutNowButtonTest(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.verifyPageTitle("Cart - IMTRA");
    await this.ClickOnButtonByTagAndText("a", "CHECKOUT NOW");
    await this.actions.addSleep(1);
    await this.verifyPageTitle("IMTRA - Checkout");
  }

  async RequestBulkConsultationButtonTest(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(2);
    await this.cartPage.clickOnCartIconinNavbar();
    await this.actions.addSleep(2);
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await this.verifyPageTitle("Cart - IMTRA");
    await this.ClickOnButtonByTagAndText("a", "REQUEST BULK CONSULTATION");
    await this.actions.addSleep(1);
    await this.verifyPageTitle("Bulk Request Consultation - IMTRA");
  }
}
