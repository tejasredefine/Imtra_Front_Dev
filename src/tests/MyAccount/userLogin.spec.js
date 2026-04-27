import { test, expect } from "../../utils/fixtures/baseFixtures";
import { ProfileCompanyUserLoginFlow } from "../../flows/MyAccount/profileCompanyUserLoginFlow";

import {
  VALID_PROFILE_DATA,
  INVALID_PROFILE_DATA,
  MY_ACCOUNT_TABS,
  USER_LOGIN_TEST_DATA,
  USER_PERMISSIONS,
} from "../../utils/data/myAccountData";

test.describe("MyAccount Tests -> User Login", () => {
  let myAccountFlow;

  test.beforeEach(async ({ page, actions }) => {
    myAccountFlow = new ProfileCompanyUserLoginFlow(page, actions);
  });

  test.describe("User Login Tab", () => {
    
    test("@myAccount @userLogin001 - User Login Tab Loads With User List", async () => {
      await myAccountFlow.VerifyUserLoginTabLoads();
    });

    test("@myAccount @userLogin002 - Search Existing User By Partial Name", async () => {
      await myAccountFlow.VerifySearchUserByName(USER_LOGIN_TEST_DATA.existingUser.partialName);
    });

    test("@myAccount @userLogin003 - Add User Shows Required Field Errors", async () => {
      await myAccountFlow.VerifyAddUserRequiredFieldErrors();
    });

    test("@myAccount @userLogin004 - Add User Shows Address Required Error", async () => {
      await myAccountFlow.VerifyAddUserAddressRequired(USER_LOGIN_TEST_DATA.validNewUser);
    });

    test("@myAccount @userLogin005 - Add New User With Valid Data", async () => {
      await myAccountFlow.VerifyAddNewUser(
        USER_LOGIN_TEST_DATA.validNewUser,
        USER_LOGIN_TEST_DATA.address
      );
    });

    test("@myAccount @userLogin006 - Search Just Added User", async () => {
      await myAccountFlow.VerifySearchJustAddedUser(USER_LOGIN_TEST_DATA.validNewUser.firstName);
    });

    test("@myAccount @userLogin007 - Add Duplicate User Email Shows Error", async () => {
      await myAccountFlow.VerifyAddDuplicateUserEmail(
        USER_LOGIN_TEST_DATA.duplicateUser,
        USER_LOGIN_TEST_DATA.address
      );
    });

    test("@myAccount @userLogin008 - Edit User First Name and Last Name", async () => {
      await myAccountFlow.VerifyEditUser(
        USER_LOGIN_TEST_DATA.validNewUser.firstName,
        USER_LOGIN_TEST_DATA.updatedUser.firstName,
        USER_LOGIN_TEST_DATA.updatedUser.lastName
      );
    });

    test("@myAccount @userLogin009 - Search Edited User By New Name", async () => {
      await myAccountFlow.VerifySearchEditedUser(USER_LOGIN_TEST_DATA.updatedUser.firstName);
    });

    test("@myAccount @userLogin010 - Edit User Shows Required Field Errors", async () => {
      await myAccountFlow.VerifyEditUserRequiredFieldErrors(USER_LOGIN_TEST_DATA.updatedUser.firstName);
    });

    // Toggle another permission to verify it works for any permission
    test("@myAccount @userLogin011 - Toggle Pay Invoices Permission On User Card", async () => {
      await myAccountFlow.VerifyTogglePermissionOnCard(
        USER_LOGIN_TEST_DATA.updatedUser.firstName,
        "Pay Invoices"
      );
    });
    
    // Toggle another permission to verify it works for any permission
    test("@myAccount @userLogin012 - Edit Account Logins Permission On User Card", async () => {
      await myAccountFlow.VerifyTogglePermissionOnCard(
        USER_LOGIN_TEST_DATA.updatedUser.firstName,
        "Edit Account Logins"
      );
    });
    
    // Toggle another permission to verify it works for any permission
    test("@myAccount @userLogin013 - Place Orders Permission On User Card", async () => {
      await myAccountFlow.VerifyTogglePermissionOnCard(
        USER_LOGIN_TEST_DATA.updatedUser.firstName,
        "Place Orders"
      );
    });

    test("@myAccount @userLogin014 - Toggle Make Primary On User Card", async () => {
      await myAccountFlow.VerifyToggleMakePrimaryOnCard(USER_LOGIN_TEST_DATA.updatedUser.firstName);
    });

    // Delete user - LAST test to clean up
    test("@myAccount @userLogin015 - Delete User", async () => {
      await myAccountFlow.VerifyDeleteUser(USER_LOGIN_TEST_DATA.updatedUser.firstName);
    });
  });
});