import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/homePage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { LoginFlow } from "./loginFlow";
import { PAGE_TITLES } from "../utils/data/metaData";
import { CartFlow } from "./cartFlow";
import { CheckoutComp } from "../components/checkoutComp";

export class CheckoutFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.cartPage = new CartPage(page, actions);
    this.checkoutPage = new CheckoutPage(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
    this.cartFlow = new CartFlow(page, actions);
    this.checkoutComp = new CheckoutComp(page, actions);
  }

  // ---- Navigate to checkout — shared helper ----
  async _goToCheckout() {
    await this.cartFlow.NavigateToCartPageFromProductDetailsPage();
    await this.ClickOnButtonByTagAndText("a", "Checkout Now");
    await this.actions.addSleep(2);
    await this.verifyPageTitle("IMTRA - Checkout");
  }

  /**
   * Logged-in user: home → listing → add to cart → checkout (skips guest email).
   */
  async checkoutLoggedInUserDirect(ifErrorMessages = "") {
    await this.loginFlow.LoginAndVerifyRedirection(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME
    );
    await this._goToCheckout();
    await this.checkoutPage.checkoutPageCommonMethods(ifErrorMessages);
  }

  async checkoutWithoutLoginAndLoginWithValidCredentials(
    emailErrorMessages = "",
    passwordErrorMessages = "",
    ifErrorMessages = ""
  ) {
    await this._goToCheckout();
    await this.checkoutPage.fillEmailWithCorrectDetailsOrErrorMessages(emailErrorMessages);
    await this.checkoutPage.fillPasswordWithCorrectDetailsOrErrorMessages(passwordErrorMessages);
    await this.checkoutPage.checkoutPageCommonMethods(ifErrorMessages);
  }

  async checkoutWithoutLoginAndVerifyEmailErrorMessages(emailErrorMessages = "") {
    await this._goToCheckout();
    await this.checkoutPage.fillEmailWithCorrectDetailsOrErrorMessages(emailErrorMessages);
  }

  async checkoutWithoutLoginAndVerifyPasswordErrorMessages(passwordErrorMessages = "") {
    await this._goToCheckout();
    await this.checkoutPage.fillEmailWithCorrectDetailsOrErrorMessages("");
    await this.checkoutPage.fillPasswordWithCorrectDetailsOrErrorMessages(passwordErrorMessages);
  }

  async checkoutAsGuest(addressErrorMessages = "") {
    await this._goToCheckout();
    await this.checkoutPage.fillEmailForGuestCheckout();
    await this.checkoutPage.clickOnCheckoutAsGuestButtonAndVerify();

    if (addressErrorMessages) {
      await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
      await this.checkoutPage.verifyErrorMessages(addressErrorMessages);
      return;
    }

    await this.checkoutPage.fillShippingAndBillingAddress();
    await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
    await this.checkoutComp.clickContinueInSection("Shipping Method");
  }

  async createNewAccountAtCheckoutPage(newAccountErrorMessage = "", data = {}) {
    await this._goToCheckout();
    await this.checkoutPage.createNewAccountAndVerify();

    if (newAccountErrorMessage !== "") {
      await this.page.getByText("CONTINUE").click();
      await this.checkoutPage.verifyErrorMessages(newAccountErrorMessage);
      return;
    }

    await this.checkoutPage.clickOnCreateNewAccountButtonAndFillForm(data);
    await this.page.getByText("CONTINUE").click();
    await this.checkoutPage.fillShippingAndBillingAddress();
    await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
    await this.checkoutComp.clickContinueInSection("Shipping Method");
    await this.actions.addSleep(2);
    await this.checkoutComp.clickContinueInSection("Payment Method");
  }

  // ================ Placed Order With PO Number ================
  async placedOrderWithPONumber() {
    await this.loginFlow.LoginAndVerifyRedirection(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME
    );
    await this._goToCheckout();
    await this.checkoutPage.placeOrderWithPONumber();
  }

  // ================ Placed Order With Credit Card ================
  async placedOrderWithCreditCard() {
    await this.loginFlow.LoginAndVerifyRedirection(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME
    );
    await this._goToCheckout();
    await this.checkoutPage.placeOrderWithCreditCard();
  }

  // ================ Edit or Add Shipping/Billing Address ================
  async editOrAddShippingOrBillingAddress(isBillingAddress = false, addressData, addNewAddress = false) {
    await this.loginFlow.LoginAndVerifyRedirection(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME
    );
    await this._goToCheckout();
    await this.checkoutPage.editOrAddShippingOrBillingAddress(
      isBillingAddress,
      addressData,
      addNewAddress
    );
  }

  // ================ Return to Cart Page From Checkout With Same Items ================
  async returnToCartPageFromCheckoutPageWithEarlierAddedItems() {
    await this.loginFlow.LoginAndVerifyRedirection(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME
    );
    await this._goToCheckout();
    await this.checkoutPage.returnToCartPageFromCheckoutPageWithEarlierAddedItems();
  }
}
