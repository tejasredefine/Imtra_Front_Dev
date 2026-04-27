import { BasePage } from "./BasePage";
import { Whislist } from "../components/wishlist";
import { MyAccountComp } from "../components/MyAccountComp";

// ============================================================================
// EXISTING CODE - WhislistPage (DO NOT MODIFY)
// ============================================================================

export class WhislistPage {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
    this.whislist = new Whislist(page, actions);
  }

  async verifyProductInWishlist(expectedProductName) {
    await this.whislist.verifyProductInWishlist(expectedProductName);
  }
}

// ============================================================================
// NEW CODE - MyAccountPage (Added for MyAccount Module)
// ============================================================================

export class MyAccountPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.myAccountComp = new MyAccountComp(page, actions);
  }

  // ============================================================================
  // Navigation Methods
  // ============================================================================

  async verifyOnAccountSettingsPage() {
    await this.page.getByText(/account settings/i).waitFor({
      state: 'visible',
      timeout: 10000
    });
  
    console.log("✓ On Account Settings page");
  }

  async clickOnTab(tabName) {
    console.log(`[MyAccountPage] Clicking on tab: "${tabName}"`);
    const tab = this.page.locator('div.flex.items-center.overflow-hidden').getByRole('link', { name: tabName });
    await tab.click();
    console.log(`✓ Clicked on "${tabName}" tab`);
  }

  // ============================================================================
  // PROFILE TAB Methods
  // ============================================================================

  async verifyOnProfileTab() {
    await this.verifyOnAccountSettingsPage();
    await this.page.waitForSelector('text="Account Information"', { state: 'visible', timeout: 5000 });
    console.log("✓ On Profile tab");
  }

  async clickEditAccountInfo() {
    await this.myAccountComp.clickEditInSection("Account Information");
  }

  async clickSaveAccountInfo() {
    await this.myAccountComp.clickSave();
  }

  async clickCancelAccountInfo() {
    await this.myAccountComp.clickCancel();
  }

  async fillFirstName(value) {
    await this.myAccountComp.fillFieldById('FirstName', value);
  }

  async fillLastName(value) {
    await this.myAccountComp.fillFieldById('LastName', value);
  }

  async fillEmail(value) {
    const isDisabled = await this.myAccountComp.isFieldDisabled('input-email');
    if (isDisabled) {
      console.log("[MyAccountPage] Email field is disabled, skipping...");
      return;
    }
    await this.myAccountComp.fillFieldById('input-email', value);
  }

  async fillPrimaryPhoneNumber(value) {
    await this.myAccountComp.fillFieldById('Primary_phone_number', value);
  }

  async getFieldValue(fieldId) {
    return await this.myAccountComp.getFieldValueById(fieldId);
  }

  async clearField(fieldId) {
    await this.myAccountComp.clearFieldById(fieldId);
  }

  async verifyFieldValueAfterSave(fieldId, expectedValue) {
    const actualValue = await this.getFieldValue(fieldId);
    if (actualValue !== expectedValue) {
      throw new Error(`Field value mismatch. Expected: "${expectedValue}", Got: "${actualValue}"`);
    }
    console.log(`✓ Field "${fieldId}" value verified: "${expectedValue}"`);
  }

  // Communication Preferences Section
  async clickEditCommunicationPreferences() {
    await this.myAccountComp.clickEditInSection("Communication Preferences");
  }

  async clickSaveCommunicationPreferences() {
    await this.myAccountComp.clickSaveInSection("Communication Preferences");
  }

  async checkAllCommunicationPreferences(preferences) {
    await this.myAccountComp.checkAllCheckboxes(preferences);
  }

  async uncheckAllCommunicationPreferences(preferences) {
    await this.myAccountComp.uncheckAllCheckboxes(preferences);
  }

  async verifyAllCheckboxesState(preferences, expectedState) {
    console.log(`[MyAccountPage] Verifying all checkboxes are ${expectedState ? 'checked' : 'unchecked'}...`);
    for (const pref of preferences) {
      const isChecked = await this.myAccountComp.isCheckboxChecked(pref);
      if (isChecked !== expectedState) {
        throw new Error(`Checkbox "${pref}" should be ${expectedState ? 'checked' : 'unchecked'}`);
      }
    }
    console.log(`✓ All checkboxes verified as ${expectedState ? 'checked' : 'unchecked'}`);
  }

  // Change Password
  async clickChangePassword() {
    console.log("[MyAccountPage] Clicking Change Password link...");
    const changePasswordLink = this.page.locator('text="Change Password"').first();
    await this.actions.click(changePasswordLink);
    await this.actions.addSleep(1);
    console.log("✓ Clicked Change Password");
  }

  async verifyChangePasswordModal() {
    await this.myAccountComp.verifyModalVisible("Change Password");
    console.log("✓ Change Password modal verified");
  }

  async fillCurrentPassword(value) {
    const field = this.page.locator('input[type="password"]').nth(0);
    await this.actions.fill(field, value);
    await this.actions.addSleep(0.5);
  }

  async fillNewPassword(value) {
    const field = this.page.locator('input[type="password"]').nth(1);
    await this.actions.fill(field, value);
    await this.actions.addSleep(0.5);
  }

  async fillConfirmPassword(value) {
    const field = this.page.locator('input[type="password"]').nth(2);
    await this.actions.fill(field, value);
    await this.actions.addSleep(0.5);
  }

  async clickUpdatePassword() {
    const button = await this.actions.findButtonByText("UPDATE PASSWORD");
    await this.actions.click(button);
    await this.actions.addSleep(2);
  }

  async closeChangePasswordModal() {
    await this.myAccountComp.closeModal();
  }

  // View Mode Verification
  async verifyAccountInfoDisplayed() {
    await this.page.waitForSelector('text="Account Information"', { state: 'visible' });
    await this.page.locator('#FirstName').waitFor({state:'visible'});
    await this.page.locator('#LastName').waitFor({state:'visible'});
    await this.page.locator('#profile-email').waitFor({state:'visible'});
    console.log("✓ Account Information section verified");
  }

  async verifyUserInfoInLeftPanel() {
    const lastLoginExists = await this.page.locator('text=/Last Login/i').count() > 0;
    if (!lastLoginExists) {
      throw new Error("Last Login not found in left panel");
    }
    console.log("✓ User info in left panel verified");
  }

  // Delegate common methods to component
  async verifyErrorMessage(errorMessage) {
    await this.myAccountComp.verifyErrorMessage(errorMessage);
  }

  async verifySuccessMessage() {
    await this.myAccountComp.verifySuccessMessage();
  }

  // ============================================================================
  // COMPANY SETTINGS TAB Methods
  // ============================================================================

  async verifyOnCompanySettingsTab() {
    await this.clickOnTab("Company Settings");
    await this.page.waitForSelector('text="Communication Information"', { state: 'visible', timeout: 5000 });
    console.log("✓ On Company Settings tab");
  }

  async verifyCompanySettingsFieldsDisplayed() {
    console.log("[MyAccountPage] Verifying Company Settings fields are displayed...");

    await this.page.getByText("Communication Information").waitFor();
    await this.page.locator('#companyName').waitFor();
    await this.page.locator('#InvoicingEmail').waitFor();
    await this.page.locator('#Phone').waitFor();
    await this.page.locator('#PhoneSecondary').waitFor();
    console.log("✓ Communication Information fields verified");

    await this.page.getByText("Primary Billing Address").waitFor();
    await this.page.locator('#StreetAddress').waitFor();
    await this.page.locator('#AddressLine2').waitFor();
    await this.page.locator('#City').waitFor();
    await this.page.locator('#StateProvince').waitFor();
    await this.page.locator('#ZipPostalCode').waitFor();
    await this.page.locator('#Country').waitFor();
    console.log("✓ Primary Billing Address fields verified");

    await this.page.getByText("Business Classification & Sales Assignment").waitFor();
    await this.page.locator('#SalesmanTerritory').waitFor();
    await this.page.locator('#CustomerProfile').waitFor();
    await this.page.locator('#ChangeTermsTo').waitFor();
    await this.page.locator('#AcquisitionChannel').waitFor();
    console.log("✓ All Company Settings fields displayed successfully");
  }

  // ============================================================================
  // USER LOGIN TAB Methods
  // ============================================================================

  async verifyOnUserLoginTab() {
    await this.clickOnTab("User Login");
    await this.actions.addSleep(2);
    await this.page.getByText("ADD NEW USER").waitFor({ state: 'visible', timeout: 5000 });
    console.log("✓ On User Login tab");
  }

  async verifyUserListDisplayed() {
    console.log("[MyAccountPage] Verifying User List is displayed...");
    await this.page.getByPlaceholder(/search users/i).waitFor({ state: 'visible' });
    await this.page.getByRole('link', { name: /add new user/i }).waitFor({ state: 'visible' });
    console.log("✓ User list displayed");
  }

  async searchUser(searchText) {
    console.log(`[MyAccountPage] Searching for user: "${searchText}"...`);
    const searchField = this.page.getByPlaceholder(/search users/i);
    await this.actions.clearInput(searchField);
    await this.actions.fill(searchField, searchText);
    await this.actions.addSleep(1);
    console.log(`✓ Searched for user: "${searchText}"`);
  }

  async clearUserSearch() {
    console.log("[MyAccountPage] Clearing user search...");
    const searchField = this.page.getByPlaceholder(/search users/i);
    await this.actions.clearInput(searchField);
    await this.actions.addSleep(1);
    console.log("✓ User search cleared");
  }

  async verifyUserInList(userName) {
    console.log(`[MyAccountPage] Verifying user "${userName}" is in list...`);
    const userNameLocator = this.page
      .locator('div.border-dark.rounded-xl')
      .locator('.text-base.font-semibold')
      .filter({ hasText: new RegExp(userName, 'i') });
    await userNameLocator.first().waitFor({ state: 'visible', timeout: 5000 });
    console.log(`✓ User "${userName}" found in list`);
  }

  async verifyUserNotInList(userName) {
    console.log(`[MyAccountPage] Verifying user "${userName}" is NOT in list...`);
    await this.actions.addSleep(1);
    const userLocator = this.page.locator(`text="${userName}"`);
    const count = await userLocator.count();
    if (count > 0) {
      throw new Error(`User "${userName}" should not be in the list but was found`);
    }
    console.log(`✓ User "${userName}" is not in list (as expected)`);
  }

  async clickAddNewUser() {
    console.log("[MyAccountPage] Clicking ADD NEW USER button...");
    const addButton = this.page.getByRole('link', { name: /add new user/i });
    await addButton.click();
    await this.actions.addSleep(2);
    console.log("✓ Clicked ADD NEW USER");
  }

  async fillAddUserForm(userData) {
    console.log("[MyAccountPage] Filling Add User form...");

    if (userData.username) {
      await this.actions.fill(this.page.locator('#Username'), userData.username);
      console.log(`✓ Filled Username: ${userData.username}`);
    }

    if (userData.firstName) {
      await this.actions.fill(this.page.locator('#FirstName'), userData.firstName);
      console.log(`✓ Filled First Name: ${userData.firstName}`);
    }

    if (userData.lastName) {
      await this.actions.fill(this.page.locator('#LastName'), userData.lastName);
      console.log(`✓ Filled Last Name: ${userData.lastName}`);
    }

    if (userData.email) {
      await this.actions.fill(this.page.locator('#Email'), userData.email);
      console.log(`✓ Filled Email: ${userData.email}`);
    }

    if (userData.phone) {
      await this.actions.fill(this.page.locator('#Phone'), userData.phone);
      console.log(`✓ Filled Phone: ${userData.phone}`);
    }

    console.log("✓ Add User form filled");
  }

  async selectUserAddress(addressText) {
    console.log(`[MyAccountPage] Selecting address: "${addressText}"...`);
    const dropdown = this.page.locator('#Address');
    const options = await dropdown.locator('option').allTextContents();
    const match = options.find(opt => opt.toLowerCase().includes(addressText.toLowerCase()));

    if (!match) {
      throw new Error(`Address "${addressText}" not found in dropdown`);
    }
    await dropdown.selectOption({ label: match });
    console.log(`✓ Selected address: "${match}"`);
  }

  async clickAddLogin() {
    console.log("[MyAccountPage] Clicking ADD LOGIN button...");
    const addLoginButton = this.page.getByRole('button', { name: /add login/i });
    await this.actions.click(addLoginButton);
    await this.actions.addSleep(2);
    console.log("✓ Clicked ADD LOGIN");
  }

  async clickCancelUserForm() {
    console.log("[MyAccountPage] Clicking Cancel button...");
    const cancelButton = this.page.getByRole('button', { name: /cancel/i });
    await this.actions.click(cancelButton);
    await this.actions.addSleep(1);
    console.log("✓ Clicked Cancel");
  }

  async clickEditUser(userName) {
    console.log(`[MyAccountPage] Clicking EDIT for user "${userName}"...`);
    const userCard = this.page.locator('div.border-dark.rounded-xl').filter({
      has: this.page.locator('.text-base.font-semibold', {
        hasText: new RegExp(userName, 'i')
      })
    });
    const editButton = userCard.getByRole('link', { name: /edit/i });
    await editButton.click();
    console.log(`✓ Clicked EDIT for "${userName}"`);
  }

  async updateUserFirstName(newFirstName) {
    console.log(`[MyAccountPage] Updating First Name to: "${newFirstName}"...`);
    const firstNameInput = this.page.locator('#FirstName');
    await this.actions.clearInput(firstNameInput);
    await this.actions.fill(firstNameInput, newFirstName);
    console.log(`✓ Updated First Name: ${newFirstName}`);
  }

  async updateUserLastName(newLastName) {
    console.log(`[MyAccountPage] Updating Last Name to: "${newLastName}"...`);
    const lastNameInput = this.page.locator('#LastName');
    await this.actions.clearInput(lastNameInput);
    await this.actions.fill(lastNameInput, newLastName);
    console.log(`✓ Updated Last Name: ${newLastName}`);
  }

  async clearUserField(fieldId) {
    console.log(`[MyAccountPage] Clearing field: "${fieldId}"...`);
    const field = this.page.locator(`#${fieldId}`);
    await this.actions.clearInput(field);
    console.log(`✓ Cleared field: ${fieldId}`);
  }

  async clickUpdateLogin() {
    console.log("[MyAccountPage] Clicking UPDATE LOGIN button...");
    const updateButton = this.page.getByRole('button', { name: /update login/i });
    await this.actions.click(updateButton);
    await this.actions.addSleep(2);
    console.log("✓ Clicked UPDATE LOGIN");
  }

  async clickDeleteUser(userName) {
    console.log(`[MyAccountPage] Clicking DELETE for user "${userName}"...`);
    const userCard = this.page.locator(`div:has-text("${userName}")`).filter({ hasText: 'Permissions' }).first();
    const deleteButton = userCard.getByRole('button', { name: /delete/i });
    await this.actions.click(deleteButton);
    await this.actions.addSleep(1);
    console.log(`✓ Clicked DELETE for "${userName}"`);
  }

  async confirmDeleteUser() {
    console.log("[MyAccountPage] Confirming user deletion...");
    const confirmButton = this.page.getByRole('button', { name: /delete|confirm|yes/i }).last();
    await this.actions.click(confirmButton);
    await this.actions.addSleep(2);
    console.log("✓ User deletion confirmed");
  }

  // ============================================================================
  // USER CARD - Permission Methods (Simplified)
  // ============================================================================

  /**
   * Gets a user card locator by user name
   */
  getUserCardLocator(userName) {
    return this.page.locator('div.border-dark.rounded-xl').filter({
      has: this.page.locator('.text-base.font-semibold', {
        hasText: new RegExp(userName, 'i')
      })
    });
  }

  async isPermissionCheckedOnCard(userName, permissionLabel) {
    const userCard = this.getUserCardLocator(userName);
  
    const checkbox = userCard
      .locator('div:has(label)')
      .filter({
        has: this.page.locator('label', {
          hasText: new RegExp(permissionLabel, 'i')
        })
      })
      .locator('input[type="checkbox"]');
  
    // await checkbox.first().waitFor({ state: 'visible' });
  
    return await checkbox.first().isChecked();
  }

  /**
   * Clicks a permission checkbox on user card and verifies success modal
   * This is the ONLY method needed - it toggles the checkbox and handles the modal
   */
  async clickPermissionOnCard(userName, permissionLabel) {
    console.log(`[MyAccountPage] Clicking permission "${permissionLabel}" for "${userName}"...`);
    
    const userCard = this.getUserCardLocator(userName);
    const checkbox = userCard.getByLabel(new RegExp(permissionLabel, 'i'));
    
    // Click the checkbox
    await checkbox.click();
    await this.actions.addSleep(1);
    
    // Verify success modal appears
    await this.page.getByText("User permission updated successfully").waitFor({ state: 'visible', timeout: 5000 });
    console.log("✓ Success modal displayed");
    
    // Close the modal by clicking X
    const closeButton = this.page.getByRole('button', { name: /close icon/i });
    if (await closeButton.count() > 0) {
      await closeButton.first().click();
      await this.actions.addSleep(0.5);
    }
    console.log(`✓ Permission "${permissionLabel}" toggled for "${userName}"`);
  }

  /**
   * Toggles Make Primary switch for a user directly on user card
   */
  async toggleMakePrimaryOnCard(userName) {
    console.log(`[MyAccountPage] Toggling Make Primary for user "${userName}"...`);
    const userCard = this.getUserCardLocator(userName);
    const makePrimaryToggle = userCard.locator('text="Make Primary"').locator('..').locator('input[type="checkbox"], button, div[role="switch"]').first();
    await this.actions.click(makePrimaryToggle);
    await this.actions.addSleep(1);
    console.log(`✓ Toggled Make Primary for "${userName}"`);
  }

  /**
   * Verifies user success message after add/edit/delete
   */
  async verifyUserSuccessMessage() {
    console.log("[MyAccountPage] Verifying user operation success message...");
    const successLocator = this.page.locator('text=/success|created|updated|deleted|added/i');
    await successLocator.first().waitFor({ state: 'visible', timeout: 10000 });
    console.log("✓ Success message displayed");
  }

  /**
   * Verifies error message is displayed
   */
  async verifyUserErrorMessage(errorMessage) {
    console.log(`[MyAccountPage] Verifying error message: "${errorMessage}"...`);
    const errorLocator = this.page.locator(`text="${errorMessage}"`);
    await errorLocator.first().waitFor({ state: 'visible', timeout: 5000 });
    console.log(`✓ Error message displayed: "${errorMessage}"`);
  }

  // ============================================================================
  // OTHER TAB Methods (Future)
  // ============================================================================

  async verifyOnAddressTab() {
    await this.clickOnTab("Address");
    await this.page.waitForSelector('text="ADD NEW ADDRESS"', { state: 'visible', timeout: 5000 });
    console.log("✓ On Address tab");
  }

  async verifyOnOrdersTab() {
    await this.clickOnTab("Orders");
    await this.page.waitForSelector('text="Order #"', { state: 'visible', timeout: 5000 });
    console.log("✓ On Orders tab");
  }
}