import { expect } from "@playwright/test";
import { BasePage } from "../BasePage";
import { AddressModal } from "../../components/addressModal";

/**
 * Address Page
 * Contains methods for Address tab interactions
 */
export class AddressPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.addressModal = new AddressModal(page, actions);
  }


  // Clicks ADD NEW ADDRESS button
  async clickAddNewAddress() {
    console.log("[AddressPage] Clicking ADD NEW ADDRESS button...");
    await this.ClickOnButtonByTagAndText("a", "Add New Address");
    await this.actions.addSleep(2);
    console.log("✓ Clicked ADD NEW ADDRESS");
  }

  /**
   * Adds a new shipping address
   * @param {Object} addressData - Address data
   */
  async addShippingAddress(addressData) {
    await this.clickAddNewAddress();
    // Fill form
    await this.addressModal.fillAddressForm(addressData);
    
    // Ensure shipping is selected
    await this.addressModal.setShippingAddress(true);
    await this.addressModal.setBillingAddress(false);
    
    // Submit
    await this.addressModal.clickAddAddress();
    await this.validateModal("Success", "Address added successfully");
  }

  /**
   * Adds a new billing address
   * @param {Object} addressData - Address data
   */
  async addBillingAddress(addressData) {
    await this.clickAddNewAddress();
    // Fill form
    await this.addressModal.fillAddressForm(addressData);
    
    // Ensure billing is selected
    await this.addressModal.setBillingAddress(true);
    await this.addressModal.setShippingAddress(false);
    
    // Submit
    await this.addressModal.clickAddAddress();
    await this.validateModal("Success", "Address added successfully");
  }

  /**
   * Adds a combined address (both shipping and billing)
   * @param {Object} addressData - Address data
   */
  async addCombinedAddress(addressData) {
    await this.clickAddNewAddress();
    // Fill form
    await this.addressModal.fillAddressForm(addressData);
    
    // Select both
    await this.addressModal.setBillingAddress(true);
    await this.addressModal.setShippingAddress(true);
    
    // Submit
    await this.addressModal.clickAddAddress();
    await this.validateModal("Success", "Address added successfully");
  }

  // ============================================================================
  // Edit Address Methods
  // ============================================================================

  /**
   * Clicks Edit button on an address card by name
   * @param {string} name - Name on address card
   */
  async clickEditOnAddressCard(name) {
    console.log(`[AddressPage] Clicking Edit on address card: "${name}"...`);
    
    const addressCard = this.page.locator('div.border-dark').filter({has: this.page.locator(`div:has-text("${name}")`)}).first();
    
    await expect(addressCard).toBeVisible();
    
    // Click edit icon (first icon button is edit)
    const editButton = addressCard.locator('button, a').filter({has: this.page.locator('svg')}).first();
    
    await this.actions.click(editButton);
    await this.actions.addSleep(2);
    console.log(`✓ Clicked Edit on address card: "${name}"`);
  }

  /**
   * Edits an existing address
   * @param {string} originalName - Name to find the address
   * @param {Object} newData - New address data
   */
  async editAddress(originalName, newData) {
    await this.clickEditOnAddressCard(originalName);
    await this.addressModal.validateAddressModal("Edit Address");
    
    // Update fields
    await this.addressModal.fillAddressForm(newData);
    
    // Submit
    await this.addressModal.clickUpdateAddress();
    await this.validateModal("Success", "Address updated successfully");
  }

// ============================================================================
// Delete Address Methods
// ============================================================================

/**
 * Clicks Delete button on an address card by name
 * @param {string} name - Name on address card (e.g. "AutoTest Shipping")
 */
async clickDeleteOnAddressCard(name) {
    console.log(`[AddressPage] Clicking Delete on address card: "${name}"...`);

    const addressCard = this.page.locator('div.border-dark.rounded-xl', { has: this.page.locator('.text-base.font-semibold', { hasText: name })}).first();
    await expect(addressCard).toBeVisible();
  
    // Now this will return ONLY 1 button
    const deleteButton = addressCard.getByRole('button', {name: 'Delete Address'});
    await deleteButton.click();
    await this.actions.addSleep(1);
    console.log(`✓ Clicked Delete on address card: "${name}"`);
  }

  /**
   * Deletes a non-primary address
   * @param {string} name - Name on address card
   */
  async deleteNonPrimaryAddress(name) {
    await this.clickDeleteOnAddressCard(name);
    await this.validateModalPartially("Confirm", "Are you sure you want to delete this shipping address?");
    await this.ClickOnButtonByTagAndText("button", "Yes");
    await this.actions.addSleep(2);
    await this.validateModal("Success", "Address deleted successfully");
  }

  /**
   * Deletes a non-primary address
   * @param {string} name - Name on address card
   */
  async deleteBillingAddress(name) {
    await this.actions.scrollToBottom();
    await this.clickDeleteOnAddressCard(name);
    await this.validateModalPartially("Confirm", "Are you sure you want to delete this billing address?");
    await this.ClickOnButtonByTagAndText("button", "Yes");
    await this.actions.addSleep(2);
    await this.validateModal("Success", "Address deleted successfully");
  }
  
  // Validation Test Methods
  async testAllValidations() {
    await this.clickAddNewAddress();
    // Click Add Address without filling anything
    await this.addressModal.clickAddAddress();
    
    // Verify all required field errors
    await this.addressModal.validateFieldErrorMessage("first_name", "First Name is required");
    await this.addressModal.validateFieldErrorMessage("last_name", "Last Name is required");
    await this.addressModal.validateFieldErrorMessage("address_1", "Address Line 1 is required");
    await this.addressModal.validateFieldErrorMessage("company_name", "Company Name is required");
    await this.addressModal.validateFieldErrorMessage("city", "City is required");
    await this.addressModal.validateFieldErrorMessage("postal_code", "Postal Code is required");
    await this.addressModal.validateFieldErrorMessage("phone", "Contact Phone is required");
    await this.addressModal.verifyAddressTypeError();
    
    console.log("✓ All validations tested");
  }
  
  async testAllLongValidations() {
    // Verify all required field errors
    await this.addressModal.validateFieldErrorMessage("first_name", "First Name exceeds the maximum limit of 50 characters");
    await this.addressModal.validateFieldErrorMessage("last_name", "Last Name exceeds the maximum limit of 50 characters");
    await this.addressModal.validateFieldErrorMessage("address_1", "Address Line 1 exceeds the maximum limit of 200 characters");
    await this.addressModal.validateFieldErrorMessage("company_name", "Company Name exceeds the maximum limit of 100 characters");
    await this.addressModal.validateFieldErrorMessage("city", "City exceeds the maximum limit of 100 characters");
    await this.addressModal.validateFieldErrorMessage("phone", "Please enter a valid phone number");
    
    console.log("✓ All validations tested");
  }

  // ============================================================================
  // Address Card Verification
  // ============================================================================

  /**
   * Verifies address card exists with given name
   * @param {string} name - Name on address card
   */
  async verifyAddressCardExists(name) {
    console.log(`[AddressPage] Verifying address card exists: "${name}"...`);
    const card = this.page.locator('div.border-dark').filter({
      has: this.page.locator(`text="${name}"`)
    }).first();
    await expect(card).toBeVisible({ timeout: 5000 });
    console.log(`✓ Address card exists: "${name}"`);
  }

  /**
   * Closes any open modal
   */
  async closeModal() {
    const closeButton = this.page.locator('button:has(svg[class*="close"]), button[aria-label*="close"], g[clip-path]').first();
    try {
      if (await closeButton.isVisible({ timeout: 2000 })) {
        await this.actions.click(closeButton);
        await this.actions.addSleep(0.5);
        console.log("✓ Modal closed");
      }
    } catch (e) {
      console.log("Modal close button not found, continuing...");
    }
  }
}