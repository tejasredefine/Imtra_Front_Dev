import { test, expect } from "../../utils/fixtures/baseFixtures";
import { ProfileCompanyUserLoginFlow } from "../../flows/MyAccount/profileCompanyUserLoginFlow";

import {
  VALID_PROFILE_DATA,
  INVALID_PROFILE_DATA,
  MY_ACCOUNT_TABS,
  // USER_LOGIN_TEST_DATA,
  // USER_PERMISSIONS,
} from "../../utils/data/myAccountData";

test.describe("MyAccount Tests -> Profile , Company Settings", () => {
  let myAccountFlow;

  test.beforeEach(async ({ page, actions }) => {
    myAccountFlow = new ProfileCompanyUserLoginFlow(page, actions);
  });

  // ============================================================================
  // PROFILE TAB TESTS
  // ============================================================================

  test.describe("Profile Tab", () => {
    test("@myAccount @profile001 - View Profile Page Loads", async () => {
      await myAccountFlow.VerifyProfilePageLoads();
    });

    test("@myAccount @profile002 - View All Profile Fields Visible", async () => {
      await myAccountFlow.VerifyAllProfileFieldsVisible();
    });

    test("@myAccount @profile003 - Edit First Name and Last Name", async () => {
      await myAccountFlow.VerifyEditFirstNameLastName(
        VALID_PROFILE_DATA.firstName,
        VALID_PROFILE_DATA.lastName
      );
    });
    
    test("@myAccount @profile004 - Long First Name Validation", async () => {
      await myAccountFlow.VerifyLongFirstName(
        VALID_PROFILE_DATA.longFirstname,
        VALID_PROFILE_DATA.lastName
      );
    });

    test("@myAccount @profile005 - Edit Primary Phone Number", async () => {
      await myAccountFlow.VerifyEditPrimaryPhoneNumber(VALID_PROFILE_DATA.primaryPhone);
    });

    test("@myAccount @profile006 - First Name Required Validation", async () => {
      await myAccountFlow.VerifyFirstNameRequired();
    });

    test("@myAccount @profile007 - Cancel Edit Restores Original Values", async () => {
      await myAccountFlow.VerifyCancelEditAccountInfo();
    });

    test("@myAccount @profile008 - Enable All Communication Preferences", async () => {
      await myAccountFlow.VerifyEnableAllCommunicationPreferences();
    });

    test("@myAccount @profile009 - Disable All Communication Preferences", async () => {
      await myAccountFlow.VerifyDisableAllCommunicationPreferences();
    });

    test("@myAccount @profile010 - Change Password Modal Opens", async () => {
      await myAccountFlow.VerifyChangePasswordModalOpens();
    });

    test("@myAccount @profile011 - Change Password Mismatch Error", async () => {
      await myAccountFlow.VerifyChangePasswordMismatch();
    });

    test("@myAccount @profile012 - Change Password Empty Fields Error", async () => {
      await myAccountFlow.VerifyChangePasswordEmptyFields();
    });
  });

  // ============================================================================
  // COMPANY SETTINGS TAB TESTS
  // ============================================================================

  test.describe("Company Settings Tab", () => {
    test("@myAccount @companySettings013 - Company Settings Page Loads With All Fields Visible", async () => {
      await myAccountFlow.VerifyCompanySettingsPageLoadsWithAllFields();
    });
  });
});