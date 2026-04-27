import { expect } from "@playwright/test";

/**
 * Address Modal Component
 * Handles Add/Edit Address modal interactions
 */
export class AddressModal {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }


  // ============================================================================
  // Address Type Selection (Left Section)
  // ============================================================================

  /**
   * Selects address type checkbox
   * @param {string} addressType - "Default Address", "Commercial Address", "Third Party Address"
   */
  async selectAddressType(addressType) {
    console.log(`[AddressModal] Selecting address type: "${addressType}"...`);
    const checkbox = this.page.getByLabel(addressType);
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
    await this.actions.addSleep(0.3);
    console.log(`✓ Address type "${addressType}" selected`);
  }


  // ============================================================================
  // Additional Options Selection (Right Section)
  // ============================================================================

  /**
   * Selects Billing Address option
   * @param {boolean} select - True to select, false to deselect
   */
  async setBillingAddress(select = true) {
    console.log(`[AddressModal] ${select ? "Selecting" : "Deselecting"} Billing Address...`);
    const checkbox = this.page.getByLabel("Billing Address");
    const isChecked = await checkbox.isChecked();
    
    if (select && !isChecked) {
      await checkbox.check();
    } else if (!select && isChecked) {
      await checkbox.uncheck();
    }
    await this.actions.addSleep(0.3);
    console.log(`✓ Billing Address ${select ? "selected" : "deselected"}`);
  }

  /**
   * Selects Shipping Address option
   * @param {boolean} select - True to select, false to deselect
   */
  async setShippingAddress(select = true) {
    console.log(`[AddressModal] ${select ? "Selecting" : "Deselecting"} Shipping Address...`);
    const checkbox = this.page.getByLabel("Shipping Address");
    const isChecked = await checkbox.isChecked();
    
    if (select && !isChecked) {
      await checkbox.check();
    } else if (!select && isChecked) {
      await checkbox.uncheck();
    }
    await this.actions.addSleep(0.3);
    console.log(`✓ Shipping Address ${select ? "selected" : "deselected"}`);
  }

  // ============================================================================
  // Contact Information Fields
  // ============================================================================

  /**
   * Fills first name field
   * @param {string} value - First name value
   */
  async fillFirstName(value) {
    const field = this.page.locator('#ShipToAccountName');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ First Name filled`);
  }

  /**
   * Fills last name field
   * @param {string} value - Last name value
   */
  async fillLastName(value) {
    const field = this.page.locator('#LastName');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ Last Name filled`);
  }

  /**
   * Fills address line 1 field
   * @param {string} value - Address line 1 value
   */
  async fillAddress1(value) {
    const field = this.page.locator('#Address1');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ Address 1 filled`);
  }

  /**
   * Fills address line 2 field
   * @param {string} value - Address line 2 value
   */
  async fillAddress2(value) {
    const field = this.page.locator('#Address2');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ Address 2 filled`);
  }

  /**
   * Fills company name field
   * @param {string} value - Company name value
   */
  async fillCompanyName(value) {
    const field = this.page.locator('#CompanyName');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ Company Name filled`);
  }

  /**
   * Fills city field
   * @param {string} value - City value
   */
  async fillCity(value) {
    const field = this.page.locator('#City');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ City filled`);
  }

  /**
   * Fills postal code field
   * @param {string} value - Postal code value
   */
  async fillPostalCode(value) {
    const field = this.page.locator('#PostalCode');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ Postal Code filled`);
  }

  /**
   * Fills phone field
   * @param {string} value - Phone value
   */
  async fillPhone(value) {
    const field = this.page.locator('#Phone');
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    console.log(`✓ Phone filled`);
  }

  // ============================================================================
  // Fill Complete Form
  // ============================================================================

  /**
   * Fills the entire address form
   * @param {Object} addressData - Address data object
   */
  async fillAddressForm(addressData) {
    console.log("[AddressModal] Filling address form...");

    // Fill contact information
    if (addressData.firstName) await this.fillFirstName(addressData.firstName);
    if (addressData.lastName) await this.fillLastName(addressData.lastName);
    if (addressData.address1) await this.fillAddress1(addressData.address1);
    if (addressData.address2) await this.fillAddress2(addressData.address2);
    if (addressData.companyName) await this.fillCompanyName(addressData.companyName);
    if (addressData.city) await this.fillCity(addressData.city);
    if (addressData.postalCode) await this.fillPostalCode(addressData.postalCode);
    if (addressData.phone) await this.fillPhone(addressData.phone);

    // Select address type
    if (addressData.addressType) await this.selectAddressType(addressData.addressType);

    // Select additional options
    if (addressData.isBilling !== undefined) await this.setBillingAddress(addressData.isBilling);
    if (addressData.isShipping !== undefined) await this.setShippingAddress(addressData.isShipping);

    console.log("✓ Address form filled");
  }

  // ============================================================================
  // Clear Fields
  // ============================================================================

  /**
   * Clears a specific field
   * @param {string} fieldName - Field name to clear
   */
  async clearField(fieldName) {
    console.log(`[AddressModal] Clearing field: "${fieldName}"...`);
    const field = this.page.locator(`input[name="${fieldName}"], input[id*="${fieldName}"]`).first();
    await this.actions.clearInput(field);
    console.log(`✓ Field "${fieldName}" cleared`);
  }

  // ============================================================================
  // Submit Actions
  // ============================================================================

  /**
   * Clicks Add Address button
   */
  async clickAddAddress() {
    const button = this.page.getByRole("button", { name: /add address/i });
    await this.actions.click(button);
    await this.actions.addSleep(2);
    console.log("✓ Clicked ADD ADDRESS");
  }

  /**
   * Clicks Update Address button
   */
  async clickUpdateAddress() {
    const button = this.page.getByRole("button", { name: /update address/i });
    await this.actions.click(button);
    await this.actions.addSleep(2);
    console.log("✓ Clicked UPDATE ADDRESS");
  }

  // ============================================================================
  // Validation Error Methods
  // ============================================================================

  /**
   * Validates field error message
   * @param {string} fieldName - Field name
   * @param {string} expectedMessage - Expected error message
   */
  async validateFieldErrorMessage(fieldName, expectedMessage) {
    console.log(`[AddressModal] Validating error for "${fieldName}": "${expectedMessage}"...`);
    const errorLocator = this.page.locator(`text="${expectedMessage}"`);
    await this.actions.waitForVisible(errorLocator);
    console.log(`✓ Error message validated: "${expectedMessage}"`);
  }

  /**
   * Verifies address type error is displayed
   */
  async verifyAddressTypeError() {
    console.log("[AddressModal] Verifying address type error...");
    const errorText = this.page.locator('text=/At least one address type must be selected/i');
    await this.actions.waitForVisible(errorText);
    console.log("✓ Address type error displayed");
  }
}