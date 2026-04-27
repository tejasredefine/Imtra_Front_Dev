import { test } from "../utils/fixtures/baseFixtures";
import { CheckoutFlow } from "../flows/checkoutFlow";
import { creditCardFieldErrorMessages, emailErrorMessages, passwordErrorMessages, addressErrorMessages, newAccountErrorMessage, newAccountData, emptyNewAccountData, newAddressData } from "../utils/data/checkoutData";

test.describe("Checkout", () => {
    let checkoutFlow;

    test.beforeEach(async ({ page, actions }) => {
        checkoutFlow = new CheckoutFlow(page, actions);
    });

    test("@checkout @checkout001 - With login: Verify Checkout Page with user credit balance", async () => {
        await checkoutFlow.checkoutLoggedInUserDirect();
    });

    test("@checkout @checkout002 - With login: Verify Checkout Page and validate error messages", async () => {
        await checkoutFlow.checkoutLoggedInUserDirect(creditCardFieldErrorMessages);
    });

    test("@checkout @checkout003 - Without login: Go to Checkout Page and login with valid credentials", async () => {
        await checkoutFlow.checkoutWithoutLoginAndLoginWithValidCredentials();
    });

    test("@checkout @checkout004 - Without login: Go to Checkout Page and verify error messages of email", async () => {
        await checkoutFlow.checkoutWithoutLoginAndVerifyEmailErrorMessages(emailErrorMessages);
    });

    test("@checkout @checkout005 - Without login: Go to Checkout Page and verify error messages of password", async () => {
        await checkoutFlow.checkoutWithoutLoginAndVerifyPasswordErrorMessages(passwordErrorMessages);
    });

    test("@checkout @checkout006 - Without login: Go to Checkout Page and checkout as guest", async () => {
        await checkoutFlow.checkoutAsGuest();
    });

    test("@checkout @checkout007 - Without login: Go to Checkout Page and checkout as guest then verify error messages", async () => {
        await checkoutFlow.checkoutAsGuest(addressErrorMessages);
    });

    test("@checkout @checkout008 - Without login: Go to Checkout Page and verify error messages of new account", async () => {
        await checkoutFlow.createNewAccountAtCheckoutPage(newAccountErrorMessage, emptyNewAccountData);
    });

    test("@checkout @checkout009 - Without login: Go to Checkout Page and create new account", async () => {
        await checkoutFlow.createNewAccountAtCheckoutPage("", newAccountData);
    });

    test("@checkout @checkout010 - With login: Place order with PO Number", async () => {
        await checkoutFlow.placedOrderWithPONumber();
    });

    test("@checkout @checkout011 - With login: placed order with Credit Card", async () => {
        await checkoutFlow.placedOrderWithCreditCard();
    });

    test("@checkout @checkout012 - With login: edit shipping address", async () => {
        await checkoutFlow.editOrAddShippingOrBillingAddress(false, newAddressData);
    });

    test("@checkout @checkout013 - With login: edit billing address", async () => {
        await checkoutFlow.editOrAddShippingOrBillingAddress(true, newAddressData);
    });

    test("@checkout @checkout014 - With login: add new shipping address", async () => {
        await checkoutFlow.editOrAddShippingOrBillingAddress(false, newAddressData, true);
    });

    test("@checkout @checkout015 - With login: add new billing address", async () => {
        await checkoutFlow.editOrAddShippingOrBillingAddress(true, newAddressData, true);
    });

    test.only("@checkout @checkout016 - With login: return to cart page from checkout page with earlier added items", async () => {
        await checkoutFlow.returnToCartPageFromCheckoutPageWithEarlierAddedItems();
    });

});
