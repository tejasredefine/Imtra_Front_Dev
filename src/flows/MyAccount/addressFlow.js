import { BasePage } from "../../pages/BasePage";
import { HomePage } from "../../pages/homePage";
import { LoginFlow } from "../loginFlow";
import { AddressPage } from "../../pages/MyAccount/addressPage";
import { VALID_ADDRESS_DATA , INVALID_ADDRESS_DATA } from "../../utils/data/addressData";

/**
 *  Address Flow
*/
export class AddressFlow extends BasePage {
constructor(page, actions) {
super(page, actions);
this.page = page;
this.actions = actions;
this.homepage = new HomePage(page, actions);
this.loginFlow = new LoginFlow(page, actions);
this.addressPage = new AddressPage(page, actions);
}


// Navigates to Address tab after login
async navigateToAddressTab(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.homepage.hoverOverTheAccountIconClickOnWhislist();
    await this.ClickOnButtonByTagAndTitle("a", "Address");
    console.log("✓ Clicked on the Address Tab");
}


// Add a Shipping Address
async AddShippingAddress(email, password, expectedTitle) {
    await this.navigateToAddressTab(email, password, expectedTitle);

    const addressData = VALID_ADDRESS_DATA.shippingAddress;
    
    await this.addressPage.addShippingAddress(addressData);
    await this.addressPage.closeModal();
    console.log("✓ Shipping address added successfully");
}

// Add a Billing Address
async AddBillingAddress(email, password, expectedTitle) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    
    const addressData = VALID_ADDRESS_DATA.billingAddress;
    
    await this.addressPage.addBillingAddress(addressData);
    await this.addressPage.closeModal();
    console.log("✓ Billing address added successfully");
}

// Add Combined Address (Shipping + Billing)
async AddCombinedAddress(email, password, expectedTitle) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    
    const addressData = VALID_ADDRESS_DATA.combinedAddress;
    
    await this.addressPage.addCombinedAddress(addressData);
    await this.addressPage.closeModal();
    console.log("✓ Combined address added successfully");
}

// Test All Add Address Validations
async TestAddAddressValidations(email, password, expectedTitle) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    await this.addressPage.testAllValidations();
    await this.ClickOnButtonByTagAndText("a", "Cancel");
    console.log("✓ All add address validations tested");
}

// TC006: Edit Address
async EditAddress(email, password, expectedTitle, originalName) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    
    const newData = VALID_ADDRESS_DATA.editedAddress;
    
    await this.addressPage.editAddress(originalName, newData);
    await this.addressPage.closeModal();
    
    // Verify old address is gone and new one exists
    await this.addressPage.verifyAddressCardExists("Updated");
    
    console.log("✓ Address edited successfully");
}

// Test Edit Address Validations
async TestEditAddressValidations(email, password, expectedTitle, addressName) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    
    await this.addressPage.clickEditOnAddressCard(addressName);
    await this.addressPage.addressModal.validateAddressModal("Edit Address");
    
    // Clear required fields
    await this.addressPage.addressModal.clearField("first_name");
    await this.addressPage.addressModal.clearField("last_name");
    await this.addressPage.addressModal.clearField("address_1");
    
    // Submit and verify errors
    await this.addressPage.addressModal.clickUpdateAddress();
    
    await this.addressPage.addressModal.validateFieldErrorMessage("first_name", "First Name is required");
    await this.addressPage.addressModal.validateFieldErrorMessage("last_name", "Last Name is required");
    await this.addressPage.addressModal.validateFieldErrorMessage("address_1", "Address Line 1 is required");
    
    await this.addressPage.addressModal.clickCancel();
    
    console.log("✓ Edit address validations tested");
}

// Delete Address
async DeleteNonPrimaryAddress(email, password, expectedTitle, addressName) {
    await this.navigateToAddressTab(email, password, expectedTitle);

    await this.addressPage.deleteNonPrimaryAddress(addressName);
    await this.addressPage.closeModal();
    console.log("✓ Shipping address deleted successfully");
}

// Delete Billing Address
async DeleteBillingAddress(email, password, expectedTitle, addressName) {
    await this.navigateToAddressTab(email, password, expectedTitle);

    await this.addressPage.deleteBillingAddress(addressName);
    await this.addressPage.closeModal();
    console.log("✓ Billing address deleted successfully");
}


// Add Address Without Selecting Address Type (Shipping/Billing)
async AddAddressWithoutType(email, password, expectedTitle) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    
    await this.addressPage.clickAddNewAddress();
    
    const addressData = VALID_ADDRESS_DATA.shippingAddress;
    
    // Fill form but don't select shipping or billing
    await this.addressPage.addressModal.fillFirstName(addressData.firstName);
    await this.addressPage.addressModal.fillLastName(addressData.lastName);
    await this.addressPage.addressModal.fillAddress1(addressData.address1);
    await this.addressPage.addressModal.fillCompanyName(addressData.companyName);
    await this.addressPage.addressModal.fillCity(addressData.city);
    await this.addressPage.addressModal.fillPostalCode(addressData.postalCode);
    await this.addressPage.addressModal.fillPhone(addressData.phone);
    await this.addressPage.addressModal.selectAddressType("Commercial Address");
    
    // Deselect both shipping and billing
    await this.addressPage.addressModal.setBillingAddress(false);
    await this.addressPage.addressModal.setShippingAddress(false);
    
    // Submit
    await this.addressPage.addressModal.clickAddAddress();
    
    // Should show error
    await this.addressPage.addressModal.verifyAddressTypeError();
    
    await this.ClickOnButtonByTagAndText("a", "Cancel");
    console.log("✓ Address type required validation verified");
}

async LongTextValidation(email,password,expectedTitle) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    
    await this.addressPage.clickAddNewAddress();
    
    const addressData = INVALID_ADDRESS_DATA.longValues;
    
    // Fill form but don't select shipping or billing
    await this.addressPage.addressModal.fillFirstName(addressData.firstName);
    await this.addressPage.addressModal.fillLastName(addressData.lastName);
    await this.addressPage.addressModal.fillAddress1(addressData.address1);
    await this.addressPage.addressModal.fillCompanyName(addressData.companyName);
    await this.addressPage.addressModal.fillCity(addressData.city);
    await this.addressPage.addressModal.fillPhone(addressData.phone);

    //Verify all errors
    await this.addressPage.testAllLongValidations();
    await this.ClickOnButtonByTagAndText("a", "Cancel");
    console.log("✓ All Long validations tested");
}

// Cancel Delete Address
async CancelDeleteAddress(email, password, expectedTitle, addressName) {
    await this.navigateToAddressTab(email, password, expectedTitle);
    
    await this.addressPage.clickDeleteOnAddressCard(addressName);
    await this.addressPage.validateModalPartially("Confirm", "Are you sure you want to delete");
    
    // Click Cancel
    await this.ClickOnButtonByTagAndText("button", "Cancel");
    await this.actions.addSleep(1);
}
}