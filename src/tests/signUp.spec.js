import { test, expect } from "../utils/fixtures/baseFixtures";
import { SignUpFlow } from "../flows/signUpFlow";
import {
  SIGNUP_ERROR_MESSAGES,
  EMAIL_TEST_DATA,
  USERNAME_TEST_DATA,
  PASSWORD_TEST_DATA,
  PHONE_TEST_DATA,
  OTHER_FIELD_TEST_DATA,
  REGISTERED_USER,
} from "../utils/data/signUpData";

test.describe("Sign Up Tests", () => {
  let signUpFlow;

  test.beforeEach(async ({ page, actions }) => {
    signUpFlow = new SignUpFlow(page, actions);
  });

  // ============================================================================
  // EMAIL VALIDATION TESTS (1-5, 36, 42)
  // ============================================================================

  test("@signup @signup001 @email - Email with consecutive dots", async () => {
    await signUpFlow.VerifyFieldValidation("Email", EMAIL_TEST_DATA.consecutiveDots, SIGNUP_ERROR_MESSAGES.EMAIL_INVALID);
  });

  test("@signup @signup002 @email - Very long email (200+ chars)", async () => {
    await signUpFlow.VerifyFieldValidation("Email", EMAIL_TEST_DATA.veryLong, SIGNUP_ERROR_MESSAGES.EMAIL_MAX_LENGTH);
  });

  test("@signup @signup003 @email - Invalid format - missing domain", async () => {
    await signUpFlow.VerifyFieldValidation("Email", EMAIL_TEST_DATA.missingDomain, SIGNUP_ERROR_MESSAGES.EMAIL_INVALID);
  });

  test("@signup @signup004 @email - Invalid format - missing TLD", async () => {
    await signUpFlow.VerifyFieldValidation("Email", EMAIL_TEST_DATA.missingTLD, SIGNUP_ERROR_MESSAGES.EMAIL_INVALID);
  });

  test("@signup @signup005 @email - Invalid format - no @ symbol", async () => {
    await signUpFlow.VerifyFieldValidation("Email", EMAIL_TEST_DATA.noAtSymbol, SIGNUP_ERROR_MESSAGES.EMAIL_INVALID);
  });

  // ============================================================================
  // USERNAME VALIDATION TESTS (6-11)
  // ============================================================================

  test("@signup @signup006 @user - Empty username field", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("Username", USERNAME_TEST_DATA.valid, SIGNUP_ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  test("@signup @signup007 @user - Minimum length username", async () => {
    await signUpFlow.VerifyFieldValidation("Username", USERNAME_TEST_DATA.minLength, SIGNUP_ERROR_MESSAGES.USERNAME_MIN_LENGTH);
  });

  test("@signup @signup008 @user - Username with only spaces", async () => {
    await signUpFlow.VerifyFieldValidation("Username", USERNAME_TEST_DATA.onlySpaces, SIGNUP_ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  test("@signup @signup009 @user - Maximum length username", async () => {
    await signUpFlow.VerifyFieldValidation("Username", USERNAME_TEST_DATA.maxLength, SIGNUP_ERROR_MESSAGES.USERNAME_MAX_LENGTH);
  });

  test("@signup @signup010 @user - Username with Unicode characters", async () => {
    await signUpFlow.VerifyFieldValidation("Username", USERNAME_TEST_DATA.unicode, SIGNUP_ERROR_MESSAGES.USERNAME_INVALID);
  });

  test("@signup @signup011 @user - Username with special characters", async () => {
    await signUpFlow.VerifyFieldValidation("Username", USERNAME_TEST_DATA.specialChars, SIGNUP_ERROR_MESSAGES.USERNAME_INVALID);
  });

  // ============================================================================
  // PASSWORD VALIDATION TESTS (12-19)
  // ============================================================================

  test("@signup @signup012 @password - Empty password field", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("Password", PASSWORD_TEST_DATA.valid, SIGNUP_ERROR_MESSAGES.PASSWORD_REQUIRED);
  });

  test("@signup @signup013 @password - Passwords do not match", async () => {
    await signUpFlow.VerifyPasswordsMustMatch("Test@123", "Different@456");
  });

  test("@signup @signup014 @password - Password below minimum length", async () => {
    await signUpFlow.VerifyPasswordValidation(PASSWORD_TEST_DATA.belowMinLength, SIGNUP_ERROR_MESSAGES.PASSWORD_MIN_LENGTH);
  });

  test("@signup @signup015 @password - Password with only spaces", async () => {
    await signUpFlow.VerifyPasswordValidation(PASSWORD_TEST_DATA.onlySpaces, SIGNUP_ERROR_MESSAGES.PASSWORD_REQUIRED);
  });

  test("@signup @signup016 @password - Password without number", async () => {
    await signUpFlow.VerifyPasswordValidation(PASSWORD_TEST_DATA.noNumber, SIGNUP_ERROR_MESSAGES.PASSWORD_NO_NUMBER);
  });

  test("@signup @signup017 @password - Password without lowercase letter", async () => {
    await signUpFlow.VerifyPasswordValidation(PASSWORD_TEST_DATA.noLowercase, SIGNUP_ERROR_MESSAGES.PASSWORD_NO_LOWERCASE);
  });

  test("@signup @signup018 @password - Password without uppercase letter", async () => {
    await signUpFlow.VerifyPasswordValidation(PASSWORD_TEST_DATA.noUppercase, SIGNUP_ERROR_MESSAGES.PASSWORD_NO_UPPERCASE);
  });

  test("@signup @signup019 @password - Password without special character", async () => {
    await signUpFlow.VerifyPasswordValidation(PASSWORD_TEST_DATA.noSpecialChar, SIGNUP_ERROR_MESSAGES.PASSWORD_NO_SPECIAL);
  });

  // ============================================================================
  // NAME VALIDATION TESTS (25-26)
  // ============================================================================

  test("@signup @signup025 - Empty first name", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("First Name", OTHER_FIELD_TEST_DATA.firstName.valid, SIGNUP_ERROR_MESSAGES.FIRST_NAME_REQUIRED);
  });

  test("@signup @signup026 - Empty last name", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("Last Name", OTHER_FIELD_TEST_DATA.lastName.valid, SIGNUP_ERROR_MESSAGES.LAST_NAME_REQUIRED);
  });

  // ============================================================================
  // PHONE VALIDATION TESTS (27-30)
  // ============================================================================

  test("@signup @signup027 @phone - Empty phone number", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("Phone", PHONE_TEST_DATA.valid, SIGNUP_ERROR_MESSAGES.PHONE_REQUIRED);
  });

  test("@signup @signup028 @phone - Non-numeric characters in phone", async () => {
    await signUpFlow.VerifyFieldValidation("Phone", PHONE_TEST_DATA.nonNumeric, SIGNUP_ERROR_MESSAGES.PHONE_REQUIRED);
  });

  test("@signup @signup029 @phone - Invalid phone number format", async () => {
    await signUpFlow.VerifyFieldValidation("Phone", PHONE_TEST_DATA.invalid, SIGNUP_ERROR_MESSAGES.PHONE_INVALID);
  });

  test("@signup @signup030 @phone - Phone number too short", async () => {
    await signUpFlow.VerifyFieldValidation("Phone", PHONE_TEST_DATA.tooShort, SIGNUP_ERROR_MESSAGES.PHONE_INVALID);
  });

  // ============================================================================
  // ADDRESS/CITY/POSTAL VALIDATION TESTS (31-35)
  // ============================================================================

  test("@signup @signup031 @address - Empty address field", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("Address", OTHER_FIELD_TEST_DATA.address.valid, SIGNUP_ERROR_MESSAGES.ADDRESS_REQUIRED);
  });

  test("@signup @signup032 @address - Empty city field", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("City", OTHER_FIELD_TEST_DATA.city.valid, SIGNUP_ERROR_MESSAGES.CITY_REQUIRED);
  });

  test("@signup @signup033 @address - Empty postal code", async () => {
    await signUpFlow.VerifyRequiredFieldValidation("Postal Code", OTHER_FIELD_TEST_DATA.postalCode.valid, SIGNUP_ERROR_MESSAGES.POSTAL_CODE_REQUIRED);
  });

  test("@signup @signup034 @address - Very long address string", async () => {
    await signUpFlow.VerifyFieldValidation("Address", OTHER_FIELD_TEST_DATA.address.maxLength, SIGNUP_ERROR_MESSAGES.ADDRESS_MAX_LENGTH);
  });

  test("@signup @signup035 @address - Invalid max length postal code", async () => {
    await signUpFlow.VerifyFieldValidation("Postal Code", OTHER_FIELD_TEST_DATA.postalCode.maxLength, SIGNUP_ERROR_MESSAGES.POSTAL_CODE_MAX_LENGTH);
  });

  // ============================================================================
  // ALREADY REGISTERED TESTS (36-42)
  // ============================================================================

  test("@signup @signup036 @already - Already registered email", async () => {
    await signUpFlow.VerifyAlreadyRegistered({ email: process.env.EMAIL }, "Already registered email");
  });

  test("@signup @signup037 @already - Registered phone with existing email", async () => {
    await signUpFlow.VerifyAlreadyRegistered({ email: process.env.EMAIL, phone: REGISTERED_USER.phone }, "Registered phone with existing email");
  });

  test("@signup @signup038 @already - Registered email with new phone", async () => {
    await signUpFlow.VerifyAlreadyRegistered({ email: process.env.EMAIL, phone: "(999) 888-7777" }, "Registered email with new phone");
  });

  test("@signup @signup039 @already - Email and phone different accounts", async () => {
    await signUpFlow.VerifyAlreadyRegistered({ email: process.env.EMAIL, phone: REGISTERED_USER.phone }, "Email and phone different accounts");
  });

  test("@signup @signup040 @already - Username taken and email registered", async () => {
    await signUpFlow.VerifyAlreadyRegistered({ email: process.env.EMAIL, username: REGISTERED_USER.username }, "Username taken and email registered");
  });

  test("@signup @signup041 @already - All three already registered", async () => {
    await signUpFlow.VerifyAlreadyRegistered({ email: process.env.EMAIL, username: REGISTERED_USER.username, phone: REGISTERED_USER.phone }, "All three already registered");
  });

  test("@signup @signup042 @already - Email with different casing", async () => {
    await signUpFlow.VerifyAlreadyRegistered({ email: EMAIL_TEST_DATA.differentCasing }, "Email with different casing");
  });

  // ============================================================================
  // CHECKBOX & COMPANY NAME TESTS (43-44)
  // ============================================================================

  test("@signup @signup043 - Checkboxes functionality", async () => {
    await signUpFlow.VerifyAllCheckboxes();
  });

  test("@signup @signup044 - Company name field", async () => {
    await signUpFlow.VerifyCompanyNameField(OTHER_FIELD_TEST_DATA.companyName.valid);
  });
});