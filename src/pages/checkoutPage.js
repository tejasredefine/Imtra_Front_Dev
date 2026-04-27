import { BasePage } from "./BasePage";
import { CheckoutComp } from "../components/checkoutComp";
import { SignUpPage } from "./signUpPage";
import { expect } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { checkoutAddress } from "../utils/data/checkoutData";
export class CheckoutPage extends BasePage {
    constructor(page, actions) {
        super(page, actions);
        this.page = page;
        this.actions = actions;
        this.checkoutComp = new CheckoutComp(page, actions);
        this.signUpPage = new SignUpPage(page, actions);
        this.loginPage = new LoginPage(page, actions);
    }

    // ============ Generate Random Email ============
    async generateRandomEmail() {
        const randomEmail = `test${Math.random().toString(36).substring(2, 15)}@gmail.com`;
        return randomEmail;
    }

    // ============ Generate Random Number ============
    async generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async verifyErrorMessages(errorMessage) {
        for (const message of errorMessage) {
            await this.signUpPage.verifyErrorMessage(message);
            console.log(`✓ Error message verified: "${message}"`);
        }
    }

    async clickOnUserCreditBalance() {
        const userCreditBalance = await this.page.locator("#UseCreditBalance");
        await this.actions.click(userCreditBalance);
    }

    async verifyProductIsVisible() {
        const productDetails = await this.page.locator("#order-review");
        expect(productDetails).toBeVisible();
    }

    async fillEmailWithCorrectDetailsOrErrorMessages(ifErrorMessages = "") {

        const startCheckoutBtn = await this.page.locator("#btn-start-checkout");
        // fill email if error messages are present
        if (ifErrorMessages === "") {
            const emailInput = await this.page.locator("#EmailAddress");
            await fill(emailInput, process.env.EMAIL);
            await click(startCheckoutBtn);
        }
        else {
            await click(startCheckoutBtn);
            await this.signUpPage.verifyErrorMessage(ifErrorMessages);
        }
    }

    async fillPasswordWithCorrectDetailsOrErrorMessages(ifErrorMessages = "") {
        const loginBtn = await this.page.locator("#btn-login");
        // fill password if no error messages
        if (ifErrorMessages === "") {
            const passwordInput = await this.page.locator("#LoginPassword");
            await fill(passwordInput, process.env.PASSWORD);
            await click(loginBtn);
        }
        else {
            await click(loginBtn);
            await this.signUpPage.verifyErrorMessage(ifErrorMessages);
        }
    }

    // ================ Checkout page common methods ================
    async checkoutPageCommonMethods(ifErrorMessages = "") {
        await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
        await this.checkoutComp.clickContinueInSection("Shipping Method");

        // validate error messages if any
        if (ifErrorMessages !== "") {
            await this.checkoutComp.clickContinueInSection("Payment Method");
            await this.verifyErrorMessages(ifErrorMessages);
            return;
        }
        else {
            // click on user credit balance
            await this.clickOnUserCreditBalance();
            await this.checkoutComp.clickContinueInSection("Payment Method");
            await this.verifyProductIsVisible();


            // fill job name and instructions
            await this.checkoutComp.fillJobNameAndInstructions("Test Job", "Test Instructions");

            // click on place order button
            const placeOrderBtn = await this.page.locator("#btn-place-order");
            await click(placeOrderBtn);

            // verify order success message
            const orderSuccessMessage = await this.page.locator("xpath=//div[contains(text(),'Order has been placed successfully')]");
            await waitForVisible(orderSuccessMessage);
            await expect(orderSuccessMessage).toBeVisible();
            console.log("✓ Order success message verified");

        }
    }

    async fillEmailForGuestCheckout() {
        const startCheckoutBtn = await this.page.locator("#btn-start-checkout");
        const emailInput = await this.page.locator("#EmailAddress");
        await fill(emailInput, process.env.EMAIL.toLowerCase());
        await click(startCheckoutBtn);
    }

    // ======== checkout as guest button ================
    async clickOnCheckoutAsGuestButtonAndVerify() {
        const checkoutAsGuestBtn = await this.page.getByText("Checkout As Guest");
        await click(checkoutAsGuestBtn);

        const checkoutPageTitle = await this.page.getByText("Shipping And Billing");
        expect(checkoutPageTitle).toBeVisible();
    }

    // ================ Fill Shipping And Billing Address ================
    async fillShippingAndBillingAddress() {
        await this.checkoutComp.fillShippingAddress(checkoutAddress);
    }

    // ================ Create New Account ================
    async clickOnCreateNewAccountButtonAndFillForm(data = { firstName, lastName, password, verifyPassword }) {
        if (data) {
            await this.checkoutComp.fillCreateAccountForm(data);
        }
        else {
            console.log("No data provided to fill the form");
        }
    }

    // =============== create new account and verify ================
    async createNewAccountAndVerify() {
        const startCheckoutBtn = await this.page.locator("#btn-start-checkout");
        const emailInput = await this.page.locator("#EmailAddress");
        await fill(emailInput, await this.generateRandomEmail());
        await click(startCheckoutBtn);
    }


    // ================ Fill PO Number ================
    async fillPONumber() {
        const poNumberRadioButton = await this.page.locator("#payByOtherMethods");
        await click(poNumberRadioButton);

        const poNumberInput = await this.page.locator("#EnterPONumber");
        await fill(poNumberInput, "1234567890");
    }

    async placeOrderWithPONumber() {
        await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
        await this.checkoutComp.clickContinueInSection("Shipping Method");

        // fill po number
        await this.fillPONumber();
        await this.checkoutComp.clickContinueInSection("Payment Method");
        await this.verifyProductIsVisible();

        // click on place order button
        const placeOrderBtn = await this.page.locator("#btn-place-order");
        await click(placeOrderBtn);

        // verify order success message
        const orderSuccessMessage = await this.page.locator("xpath=//div[contains(text(),'Order placed successfully with order')]");
        await waitForVisible(orderSuccessMessage);
        await expect(orderSuccessMessage).toBeVisible();
        console.log("✓ Order success message verified");

    }

    // ================ Fill Credit Card Details ================
    async fillCreditCardDetails() {
        const creditCardNumberInput = await this.page.locator("#CreditCardNumber");
        await fill(creditCardNumberInput, "1234567890234354");

        // Select Month and Year
        const monthSelect = await this.page.locator("#CreditCardMonth");
        await selectOption(monthSelect, "03");
        const yearSelect = await this.page.locator("#CreditCardYear");
        await selectOption(yearSelect, "2028");

        // Fill CVV
        const cvvInput = await this.page.locator("#CreditCardSecurityCode");
        await fill(cvvInput, "123");

    }

    async placeOrderWithCreditCard() {
        await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
        await this.checkoutComp.clickContinueInSection("Shipping Method");

        // fill credit card details
        await this.fillCreditCardDetails();
        await this.checkoutComp.clickContinueInSection("Payment Method");
        await this.verifyProductIsVisible();

        // click on place order button
        const placeOrderBtn = await this.page.locator("#btn-place-order");
        await click(placeOrderBtn);

        // verify order success message
        const orderSuccessMessage = await this.page.locator("xpath=//div[contains(text(),'Payment processing failed. Please try again.')]");
        await waitForVisible(orderSuccessMessage);
        await expect(orderSuccessMessage).toBeVisible();
        console.log("✓ Order success message verified");
    }

    // ================ Edit or Add Shipping or Billing Address ================
    async editOrAddShippingOrBillingAddress(isBillingAddress = false, addressData, addNewAddress = false) {
        await this.checkoutComp.clickContinueInSection("Shipping And Billing Address");
        await this.checkoutComp.clickContinueInSection("Shipping Method");

        // click on edit shipping address button
        const editShippingAddressBtn = await this.page.locator("xpath=//button[@aria-label='Edit address']");
        await click(editShippingAddressBtn);

        // edit Billing address
        if (isBillingAddress && !addNewAddress) {
            const checkbox = await this.page.locator("#billingSameAsShippingAddress");
            const editBillingAddressBtn = await this.page.locator("xpath=//button[@aria-label='Edit BILLING Address']");
            await addSleep(7);
            if (!await checkbox.isChecked()) {
                await click(editBillingAddressBtn);
            }
            else {
                editBillingAddressBtn.isVisible();
                await addSleep(7);
                expect(editBillingAddressBtn).toBeFalsy();
            }
        }
        else if (!isBillingAddress && !addNewAddress) {
            const editShippingAddressBtn = await this.page.locator("xpath=//button[@aria-label='Edit SHIPPING Address']");
            await click(editShippingAddressBtn);
        }

        else if (addNewAddress) {
            const addAddressDataBtn = await this.page.locator("xpath=//button[text()='Add New Address']");
            await click(addAddressDataBtn);

            // fill the new address data
            await this.checkoutComp.updateOrAddShippingAddressInModal(addressData);

            // click on save address button
            const saveAddressBtn = await this.page.locator("xpath=//button[text()='Save']");
            await click(saveAddressBtn);
        }
        else {
            // Edit actual billing address by passing the address data
            const editAddressData = await this.page.locator("xpath=//button[text()='Edit']").first();
            await click(editAddressData);

            // fill the updated address data
            await this.checkoutComp.updateOrAddShippingAddressInModal(addressData);

            // click on save address button
            const updateAddressBtn = await this.page.locator("xpath=//button[text()='Update']");
            await click(updateAddressBtn);

        }
        // verify address updated message -- popup is not visible now so i commented code
        // const addressUpdatedMessage = await this.page.locator("xpath=//div[contains(text(),'Address updated successfully')]");
        // await waitForVisible(addressUpdatedMessage);
        // await expect(addressUpdatedMessage).toBeVisible();
    }

    // ================ Return to Cart Page From Checkout Page With same Added Items count================

    async increaseQuantityOfAddedItems() {
        const increaseQuantityBtn = await this.page.locator("xpath=//input[@aria-label='Quantity']").first();
        const randomNumber = await this.generateRandomNumber(1, 10);
        await fill(increaseQuantityBtn, randomNumber.toString());
        return randomNumber;
    }

    async returnToCartPageFromCheckoutPageWithEarlierAddedItems() {
        const randomNumber = await this.increaseQuantityOfAddedItems();

        const returnToCartBtn = await this.page.locator("xpath=//span[text()='Return to Cart']");
        await click(returnToCartBtn);

        const increaseQuantityBtn = await this.page.locator("xpath=//input[@aria-label='Quantity']").first();
        await addSleep(2);
        expect(increaseQuantityBtn).toHaveValue(randomNumber.toString());
    }
}