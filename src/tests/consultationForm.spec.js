import { test, expect } from "../utils/fixtures/baseFixtures";
import { ConsultationFormFlow } from "../flows/consultationFormFlow";
import {
  CONSULTATION_ERROR_MESSAGES,
  VALID_FORM_DATA,
  INVALID_FORM_DATA,
} from "../utils/data/consultationFormData";

test.describe("Request Consultation Form Tests", () => {
  let consultationFormFlow;

  test.beforeEach(async ({ page, actions }) => {
    consultationFormFlow = new ConsultationFormFlow(page, actions);
  });

  // ============================================================================
  // NAVIGATION TESTS
  // ============================================================================

  test("@consultation @consultation001 - Navigate to Request Consultation Page", async () => {
    await consultationFormFlow.VerifyNavigateToConsultationForm();
  });

//   test("@consultation @consultation002 - Navigate Back via Cancel Button", async () => {
//     await consultationFormFlow.VerifyNavigateBackViaCancelButton();
//   });

  test("@consultation @consultation003 - Navigate Back via Product Breadcrumb", async () => {
    await consultationFormFlow.VerifyNavigateBackViaBreadcrumb();
  });

  test("@consultation @consultation004 - Navigate to Home via Breadcrumb", async () => {
    await consultationFormFlow.VerifyNavigateHomeViaBreadcrumb();
  });

  // ============================================================================
  // EMPTY FORM VALIDATION
  // ============================================================================

  test("@consultation @consultation005 - Empty Form Validation", async () => {
    const errors = await consultationFormFlow.VerifyEmptyFormValidation();
    expect(errors.length).toBeGreaterThan(0);
  });

  // ============================================================================
  // REQUIRED FIELD VALIDATION TESTS
  // ============================================================================

  test("@consultation @consultation006 @reqFieldChk - First Name Required", async () => {
    await consultationFormFlow.VerifyRequiredFieldValidation(
      "First Name",
      VALID_FORM_DATA.firstName,
      CONSULTATION_ERROR_MESSAGES.FIRST_NAME_REQUIRED
    );
  });

  test("@consultation @consultation007 @reqFieldChk - Last Name Required", async () => {
    await consultationFormFlow.VerifyRequiredFieldValidation(
      "Last Name",
      VALID_FORM_DATA.lastName,
      CONSULTATION_ERROR_MESSAGES.LAST_NAME_REQUIRED
    );
  });

  test("@consultation @consultation008 @reqFieldChk - Company Name Required", async () => {
    await consultationFormFlow.VerifyRequiredFieldValidation(
      "Company Name",
      VALID_FORM_DATA.companyName,
      CONSULTATION_ERROR_MESSAGES.COMPANY_NAME_REQUIRED
    );
  });

  test("@consultation @consultation009 @reqFieldChk - Email Required", async () => {
    await consultationFormFlow.VerifyRequiredFieldValidation(
      "Email",
      VALID_FORM_DATA.email,
      CONSULTATION_ERROR_MESSAGES.EMAIL_REQUIRED
    );
  });

  test("@consultation @consultation010 @reqFieldChk - Phone Required", async () => {
    await consultationFormFlow.VerifyRequiredFieldValidation(
      "Phone",
      VALID_FORM_DATA.phone,
      CONSULTATION_ERROR_MESSAGES.PHONE_REQUIRED
    );
  });

  test("@consultation @consultation011 @reqFieldChk - Preferred Contact Method Required", async () => {
    await consultationFormFlow.VerifyDropdownValidation(
      CONSULTATION_ERROR_MESSAGES.CONTACT_METHOD_REQUIRED
    );
  });

  test("@consultation @consultation012 @reqFieldChk - Desired Quantity Required", async () => {
    await consultationFormFlow.VerifyRequiredFieldValidation(
      "Desired Quantity",
      VALID_FORM_DATA.desiredQuantity,
      CONSULTATION_ERROR_MESSAGES.QUANTITY_REQUIRED
    );
  });

  // ============================================================================
  // FORMAT VALIDATION TESTS
  // ============================================================================

  test("@consultation @consultation013 @format - Invalid Email Format - No @ Symbol", async () => {
    await consultationFormFlow.VerifyEmailFormatValidation(INVALID_FORM_DATA.email.noAtSymbol);
  });

  test("@consultation @consultation014 @format - Invalid Email Format - No TLD", async () => {
    await consultationFormFlow.VerifyEmailFormatValidation(INVALID_FORM_DATA.email.noTLD);
  });

  test("@consultation @consultation015 @format - Invalid Email Format - Consecutive Dots", async () => {
    await consultationFormFlow.VerifyEmailFormatValidation(INVALID_FORM_DATA.email.consecutiveDots);
  });

  test("@consultation @consultation016 @format - Invalid Phone Format - Too Short", async () => {
    await consultationFormFlow.VerifyPhoneFormatValidation(INVALID_FORM_DATA.phone.tooShort);
  });

  test("@consultation @consultation017 @format - Invalid Phone Format - Invalid", async () => {
    await consultationFormFlow.VerifyPhoneFormatValidation(INVALID_FORM_DATA.phone.invalid);
  });

  // ============================================================================
  // OPTIONAL FIELD TESTS
  // ============================================================================

  test("@consultation @consultation020 - Message Field Works", async () => {
    await consultationFormFlow.VerifyOptionalFieldWorks("Message", "This is a test message for consultation.");
  });

  // ============================================================================
  // FORM FILL TEST
  // ============================================================================

  // test("@consultation @consultation021 - Fill All Required Fields", async () => {
  //   await consultationFormFlow.VerifyFormCanBeFilled();
  // });
});