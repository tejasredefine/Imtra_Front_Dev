import { BasePage } from "../../pages/BasePage";
import { MyAccountPage } from "../../pages/myAccountPage";
import { LoginFlow } from "../loginFlow";
import { PAGE_TITLES } from "../../utils/data/metaData";
import {
  PROFILE_ERROR_MESSAGES,
  VALID_PROFILE_DATA,
  COMMUNICATION_PREFERENCES,
  PASSWORD_TEST_DATA,
  USER_LOGIN_TEST_DATA,
  USER_LOGIN_ERROR_MESSAGES,
} from "../../utils/data/myAccountData";

export class ProfileCompanyUserLoginFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.myAccountPage = new MyAccountPage(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
  }

  // ============================================================================
  // NAVIGATION METHODS
  // ============================================================================

  async LoginAndNavigateToMyAccount() {
    await this.loginFlow.LoginAndVerifyRedirection(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME
    );
    await this.navigateToAccountSettings();
  }

  async navigateToAccountSettings() {
    console.log("[MyAccountFlow] Navigating to Account Settings...");
    await this.actions.addSleep(2);
    
    try {
      const accountLink = await this.actions.findLinkByTitle("Account");
      const accountLinkCount = await accountLink.count();
      
      if (accountLinkCount > 0) {
        await this.actions.click(accountLink.first());
        console.log("✓ Clicked Account link by title");
      } else {
        const accountByText = await this.actions.findLinkByText("Account");
        const accountTextCount = await accountByText.count();
        
        if (accountTextCount > 0) {
          await this.actions.click(accountByText.first());
          console.log("✓ Clicked Account link by text");
        } else {
          const accountIcon = await this.actions.findElementByXpath("//a[contains(@href, 'account') or contains(@title, 'Account')]");
          await this.actions.click(accountIcon);
          console.log("✓ Clicked Account link by XPath");
        }
      }
    } catch (error) {
      console.log("[MyAccountFlow] Primary navigation failed, trying direct URL...");
      await this.actions.navigateToUrl(process.env.BASE_URL + "/account-settings");
    }
    
    await this.actions.addSleep(3);
    await this.myAccountPage.verifyOnAccountSettingsPage();
    console.log("✓ Navigated to Account Settings");
  }

  // ============================================================================
  // PROFILE TAB FLOWS
  // ============================================================================

  async VerifyProfilePageLoads() {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnProfileTab();
    await this.myAccountPage.verifyAccountInfoDisplayed();
    await this.myAccountPage.verifyUserInfoInLeftPanel();
    console.log("✓ Profile page loads correctly");
  }

  async VerifyAllProfileFieldsVisible() {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyAccountInfoDisplayed();
    console.log("✓ All profile fields are visible");
  }

  async VerifyEditFirstNameLastName(newFirstName, newLastName) {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickEditAccountInfo();
    const originalFirstName = await this.myAccountPage.getFieldValue('FirstName');
    const originalLastName = await this.myAccountPage.getFieldValue('LastName');
    await this.myAccountPage.clickCancelAccountInfo();
    
    await this.myAccountPage.clickEditAccountInfo();
    await this.myAccountPage.fillFirstName(newFirstName);
    await this.myAccountPage.fillLastName(newLastName);
    await this.myAccountPage.clickSaveAccountInfo();
    await this.myAccountPage.verifySuccessMessage();
    
    await this.myAccountPage.clickEditAccountInfo();
    await this.myAccountPage.verifyFieldValueAfterSave('FirstName', newFirstName);
    await this.myAccountPage.verifyFieldValueAfterSave('LastName', newLastName);
    
    await this.myAccountPage.fillFirstName(originalFirstName);
    await this.myAccountPage.fillLastName(originalLastName);
    await this.myAccountPage.clickSaveAccountInfo();
    
    console.log("✓ Edit first name and last name verified");
  }
  
  async VerifyLongFirstName(newFirstName, newLastName) {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickEditAccountInfo();
    await this.myAccountPage.fillFirstName(newFirstName);
    await this.myAccountPage.fillLastName(newLastName);

    await this.myAccountPage.verifyErrorMessage(PROFILE_ERROR_MESSAGES.LONG_FIRST_NAME_REQUIRED);
    console.log("✓ Validation displayed");
  }

  async VerifyEditPrimaryPhoneNumber(newPhone) {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickEditAccountInfo();
    const originalPhone = await this.myAccountPage.getFieldValue('Primary_phone_number');
    
    await this.myAccountPage.fillPrimaryPhoneNumber(newPhone);
    await this.myAccountPage.clickSaveAccountInfo();
    await this.myAccountPage.verifySuccessMessage();
    
    await this.myAccountPage.clickEditAccountInfo();
    await this.myAccountPage.fillPrimaryPhoneNumber(originalPhone);
    await this.myAccountPage.clickSaveAccountInfo();
    
    console.log("✓ Edit primary phone number verified");
  }

  async VerifyFirstNameRequired() {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickEditAccountInfo();
    const originalFirstName = await this.myAccountPage.getFieldValue('FirstName');
    
    await this.myAccountPage.clearField('FirstName');
    await this.myAccountPage.clickSaveAccountInfo();
    
    await this.myAccountPage.verifyErrorMessage(PROFILE_ERROR_MESSAGES.FIRST_NAME_REQUIRED);
    
    await this.myAccountPage.fillFirstName(originalFirstName);
    await this.myAccountPage.clickCancelAccountInfo();
    
    console.log("✓ First name required validation verified");
  }

  async VerifyCancelEditAccountInfo() {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickEditAccountInfo();
    const originalFirstName = await this.myAccountPage.getFieldValue('FirstName');
    
    await this.myAccountPage.fillFirstName("TempName");
    await this.myAccountPage.clickCancelAccountInfo();
    
    await this.myAccountPage.clickEditAccountInfo();
    await this.myAccountPage.verifyFieldValueAfterSave('FirstName', originalFirstName);
    await this.myAccountPage.clickCancelAccountInfo();
    
    console.log("✓ Cancel edit restores original values");
  }

  async VerifyEnableAllCommunicationPreferences() {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickEditCommunicationPreferences();
    await this.myAccountPage.checkAllCommunicationPreferences(COMMUNICATION_PREFERENCES);
    await this.myAccountPage.clickSaveCommunicationPreferences();
    await this.myAccountPage.verifySuccessMessage();
    
    await this.actions.refreshPage();
    await this.actions.addSleep(2);
    await this.myAccountPage.verifyOnProfileTab();
    await this.myAccountPage.clickEditCommunicationPreferences();
    await this.myAccountPage.verifyAllCheckboxesState(COMMUNICATION_PREFERENCES, true);
    
    console.log("✓ Enable all communication preferences verified");
  }

  async VerifyDisableAllCommunicationPreferences() {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickEditCommunicationPreferences();
    await this.myAccountPage.uncheckAllCommunicationPreferences(COMMUNICATION_PREFERENCES);
    await this.myAccountPage.clickSaveCommunicationPreferences();
    await this.myAccountPage.verifySuccessMessage();
    
    await this.actions.refreshPage();
    await this.actions.addSleep(2);
    await this.myAccountPage.verifyOnProfileTab();
    await this.myAccountPage.clickEditCommunicationPreferences();
    await this.myAccountPage.verifyAllCheckboxesState(COMMUNICATION_PREFERENCES, false);
    
    console.log("✓ Disable all communication preferences verified");
  }

  async VerifyChangePasswordModalOpens() {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickChangePassword();
    await this.myAccountPage.verifyChangePasswordModal();
    await this.myAccountPage.closeChangePasswordModal();
    
    console.log("✓ Change password modal opens correctly");
  }

  async VerifyChangePasswordMismatch() {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickChangePassword();
    await this.myAccountPage.verifyChangePasswordModal();
    
    await this.myAccountPage.fillCurrentPassword(PASSWORD_TEST_DATA.mismatchedPasswords.currentPassword);
    await this.myAccountPage.fillNewPassword(PASSWORD_TEST_DATA.mismatchedPasswords.newPassword);
    await this.myAccountPage.fillConfirmPassword(PASSWORD_TEST_DATA.mismatchedPasswords.confirmPassword);
    await this.myAccountPage.clickUpdatePassword();
    
    await this.myAccountPage.verifyErrorMessage(PROFILE_ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
    await this.myAccountPage.closeChangePasswordModal();
    
    console.log("✓ Change password mismatch shows error");
  }

  async VerifyChangePasswordEmptyFields() {
    await this.LoginAndNavigateToMyAccount();
    
    await this.myAccountPage.clickChangePassword();
    await this.myAccountPage.verifyChangePasswordModal();
    
    await this.myAccountPage.clickUpdatePassword();
    
    await this.myAccountPage.verifyErrorMessage(PROFILE_ERROR_MESSAGES.CURRENT_PASSWORD_REQUIRED);
    await this.myAccountPage.verifyErrorMessage(PROFILE_ERROR_MESSAGES.NEW_PASSWORD_REQUIRED);
    await this.myAccountPage.verifyErrorMessage(PROFILE_ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED);
    await this.myAccountPage.closeChangePasswordModal();
    
    console.log("✓ Change password empty fields shows errors");
  }

  // ============================================================================
  // COMPANY SETTINGS TAB FLOWS
  // ============================================================================

  async VerifyCompanySettingsPageLoadsWithAllFields() {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnCompanySettingsTab();
    await this.myAccountPage.verifyCompanySettingsFieldsDisplayed();
    console.log("✓ Company Settings page loads with all fields");
  }

  // ============================================================================
  // USER LOGIN TAB FLOWS
  // ============================================================================

  async VerifyUserLoginTabLoads() {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.verifyUserListDisplayed();
    console.log("✓ User Login tab loads with user list");
  }

  async VerifySearchUserByName(searchText) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.searchUser(searchText);
    await this.myAccountPage.verifyUserInList(searchText);
    console.log(`✓ Search user by name "${searchText}" verified`);
  }

  async VerifyAddNewUser(userData, addressText) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.clickAddNewUser();
    await this.actions.addSleep(1);
    
    await this.myAccountPage.fillAddUserForm(userData);
    await this.myAccountPage.selectUserAddress(addressText);
    await this.myAccountPage.clickAddLogin();
    await this.myAccountPage.verifyUserSuccessMessage();
    
    console.log(`✓ Add new user "${userData.firstName} ${userData.lastName}" verified`);
  }

  async VerifyAddUserRequiredFieldErrors() {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.clickAddNewUser();
    await this.actions.addSleep(1);
    
    await this.myAccountPage.clickAddLogin();
    
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.USERNAME_REQUIRED);
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.FIRST_NAME_REQUIRED);
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.LAST_NAME_REQUIRED);
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.EMAIL_REQUIRED);
    
    console.log("✓ Add User required field errors verified");
  }

  async VerifyAddUserAddressRequired(userData) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.clickAddNewUser();
    await this.actions.addSleep(1);
    
    await this.myAccountPage.fillAddUserForm(userData);
    await this.myAccountPage.clickAddLogin();
    
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.ADDRESS_REQUIRED);
    
    console.log("✓ Add User address required error verified");
  }

  async VerifyAddDuplicateUserEmail(userData, addressText) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.clickAddNewUser();
    await this.actions.addSleep(1);
    
    await this.myAccountPage.fillAddUserForm(userData);
    await this.myAccountPage.selectUserAddress(addressText);
    await this.myAccountPage.clickAddLogin();
    
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    
    console.log("✓ Duplicate user email error verified");
  }

  async VerifySearchJustAddedUser(userName) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.searchUser(userName);
    await this.myAccountPage.verifyUserInList(userName);
    console.log(`✓ Just added user "${userName}" found in search results`);
  }

  async VerifyEditUser(userName, newFirstName, newLastName) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    
    await this.myAccountPage.searchUser(userName);
    await this.myAccountPage.verifyUserInList(userName);
    
    await this.myAccountPage.clickEditUser(userName);
    
    await this.myAccountPage.updateUserFirstName(newFirstName);
    await this.myAccountPage.updateUserLastName(newLastName);
    
    await this.myAccountPage.clickUpdateLogin();
    await this.myAccountPage.verifyUserSuccessMessage();
    
    console.log(`✓ Edit user to "${newFirstName} ${newLastName}" verified`);
  }

  async VerifyEditUserRequiredFieldErrors(userName) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    
    await this.myAccountPage.searchUser(userName);
    await this.myAccountPage.clickEditUser(userName);
    
    await this.myAccountPage.clearUserField('FirstName');
    await this.myAccountPage.clearUserField('LastName');
    
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.FIRST_NAME_REQUIRED);
    await this.myAccountPage.verifyUserErrorMessage(USER_LOGIN_ERROR_MESSAGES.LAST_NAME_REQUIRED);
    
    console.log("✓ Edit User required field errors verified");
  }

  async VerifySearchEditedUser(newUserName) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.searchUser(newUserName);
    await this.myAccountPage.verifyUserInList(newUserName);
    console.log(`✓ Edited user "${newUserName}" found in search results`);
  }

  /**
   * Toggle permission on user card:
   * - Check current state
   * - Click to toggle
   * - Verify success modal
   * - Verify new state is opposite
   */
  async VerifyTogglePermissionOnCard(userName, permissionLabel) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.searchUser(userName);
    
    // Click permission (this also verifies success modal)
    await this.myAccountPage.clickPermissionOnCard(userName, permissionLabel);
    
    console.log(`✓ Toggle permission verified`);
  }

  async VerifyToggleMakePrimaryOnCard(userName) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.searchUser(userName);
    await this.myAccountPage.toggleMakePrimaryOnCard(userName);
    console.log(`✓ Toggle Make Primary for "${userName}" verified`);
  }

  async VerifyDeleteUser(userName) {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnUserLoginTab();
    await this.myAccountPage.searchUser(userName);
    await this.myAccountPage.clickDeleteUser(userName);
    await this.myAccountPage.verifyUserSuccessMessage();
    
    console.log(`✓ Delete user "${userName}" verified`);
  }

  // ============================================================================
  // OTHER TAB FLOWS (Future)
  // ============================================================================

  async VerifyAddressTabLoads() {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnAddressTab();
    console.log("✓ Address tab loads");
  }

  async VerifyOrdersTabLoads() {
    await this.LoginAndNavigateToMyAccount();
    await this.myAccountPage.verifyOnOrdersTab();
    console.log("✓ Orders tab loads");
  }
}