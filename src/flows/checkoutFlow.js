import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/homePage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { LoginFlow } from "./loginFlow";
import { PAGE_TITLES } from "../utils/data/metaData";
import { CartFlow } from "./cartFlow";
import { CheckoutComp } from "../components/checkoutComp";
import { creditCardFieldErrorMessages } from "../utils/data/checkoutData";

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

    /**
     * Logged-in user: home → listing add to cart → cart → CHECKOUT NOW (skips guest email).
     */
    async checkoutLoggedInUserDirect(ifErrorMessages = "") {
        await this.loginFlow.LoginAndVerifyRedirection(
            process.env.EMAIL,
            process.env.PASSWORD,
            PAGE_TITLES.HOME,
        );
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        // common methods of shipping and billing address
        await this.checkoutPage.checkoutPageCommonMethods(ifErrorMessages);
    }

    async checkoutWithoutLoginAndLoginWithValidCredentials(emailErrorMessages = "", passwordErrorMessages = "", ifErrorMessages = "") {
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.fillEmailWithCorrectDetailsOrErrorMessages(emailErrorMessages);
        await this.checkoutPage.fillPasswordWithCorrectDetailsOrErrorMessages(passwordErrorMessages);

        // common methods of shipping and billing address
        await this.checkoutPage.checkoutPageCommonMethods(ifErrorMessages);
    }

    async checkoutWithoutLoginAndVerifyEmailErrorMessages(emailErrorMessages = "") {
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.fillEmailWithCorrectDetailsOrErrorMessages(emailErrorMessages);
    }

    async checkoutWithoutLoginAndVerifyPasswordErrorMessages(passwordErrorMessages = "") {
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.fillEmailWithCorrectDetailsOrErrorMessages("");
        await this.checkoutPage.fillPasswordWithCorrectDetailsOrErrorMessages(passwordErrorMessages);
    }

    async checkoutAsGuest(addressErrorMessages = "") {
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.fillEmailForGuestCheckout();

        // click on checkout as guest button and verify
        await this.checkoutPage.clickOnCheckoutAsGuestButtonAndVerify();

        if (addressErrorMessages) {
            await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
            await this.checkoutPage.verifyErrorMessages(addressErrorMessages);
            return;
        }
        else {
            // fill shipping and billing address
            await this.checkoutPage.fillShippingAndBillingAddress();

            // continue to Shipping Method
            await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
            await this.checkoutComp.clickContinueInSection("Shipping Method");
            // await addSleep(2);

            // // Verify Validation Errors
            // await this.checkoutComp.clickContinueInSection("Payment Method");
            // await addSleep(2);
            // await this.checkoutPage.verifyErrorMessages(ifErrorMessages);
        }
    }

    async createNewAccountAtCheckoutPage(newAccountErrorMessage = "", data = {}) {
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.createNewAccountAndVerify();

        // if error messages are present then verify and return
        if (newAccountErrorMessage !== "") {
            await this.page.getByText("CONTINUE").click();
            await this.checkoutPage.verifyErrorMessages(newAccountErrorMessage);
            return;
        }
        else {
            // click on create new account button
            await this.checkoutPage.clickOnCreateNewAccountButtonAndFillForm(data);

            // continue to Shipping Method
            await this.page.getByText("CONTINUE").click();

            // fill shipping and billing address
            await this.checkoutPage.fillShippingAndBillingAddress();

            // continue to Shipping Method
            await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
            await this.checkoutComp.clickContinueInSection("Shipping Method");
            await addSleep(2);

            // Verify Validation Errors
            await this.checkoutComp.clickContinueInSection("Payment Method");
            // await addSleep(2);
            // await this.checkoutPage.verifyErrorMessages(creditCardFieldErrorMessages);
        }
    }

    // ================ Placed Order With PO Number ================
    async placedOrderWithPONumber() {
        await this.loginFlow.LoginAndVerifyRedirection(
            process.env.EMAIL,
            process.env.PASSWORD,
            PAGE_TITLES.HOME,
        );
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.placeOrderWithPONumber();
    }

    // ================ Placed Order With Credit Card ================
    async placedOrderWithCreditCard() {
        await this.loginFlow.LoginAndVerifyRedirection(
            process.env.EMAIL,
            process.env.PASSWORD,
            PAGE_TITLES.HOME,
        );
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.placeOrderWithCreditCard();
    }

    // ================ Edit or Add Shipping or Billing Address ================
    async editOrAddShippingOrBillingAddress(isBillingAddress = false, addressData, addNewAddress = false) {
        await this.loginFlow.LoginAndVerifyRedirection(
            process.env.EMAIL,
            process.env.PASSWORD,
            PAGE_TITLES.HOME,
        );
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        await addSleep(2);
        await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.editOrAddShippingOrBillingAddress(isBillingAddress, addressData, addNewAddress);
    }

    // ================ Return to Cart Page From Checkout Page With same Added Items count================
    async returnToCartPageFromCheckoutPageWithEarlierAddedItems() {
        await this.loginFlow.LoginAndVerifyRedirection(
            process.env.EMAIL,
            process.env.PASSWORD,
            PAGE_TITLES.HOME,
        );
        await this.cartFlow.NavigateToCartPageFromProductDeatailsPage();
        await this.ClickOnButtonByTagAndText("a", "Checkout Now");
        // await addSleep(2);
        // await this.verifyPageTitle("IMTRA - Checkout");

        await this.checkoutPage.returnToCartPageFromCheckoutPageWithEarlierAddedItems();
    }
}
