import { BasePage } from "../pages/BasePage";
import { ConsultationFormPage } from "../pages/ConsultationFormPage";
import { ProductDetailsFlow } from "./productDetailsPageFlow";
import { CONSULTATION_ERROR_MESSAGES, VALID_FORM_DATA } from "../utils/data/consultationFormData";

export class ConsultationFormFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.consultationFormPage = new ConsultationFormPage(page, actions);
    this.productDetailsFlow = new ProductDetailsFlow(page, actions);
  }

  // ============================================================================
  // Navigation - Reuse existing flow
  // ============================================================================

  async NavigateToConsultationForm() {
    // Use existing flow to navigate to product details and click Request Consultation
    await this.productDetailsFlow.VerifyRequestConsultationButton();
    await this.consultationFormPage.verifyOnConsultationPage();
  }

  // ============================================================================
  // Navigation Tests
  // ============================================================================

  async VerifyNavigateToConsultationForm() {
    await this.NavigateToConsultationForm();
    console.log("✓ Navigation to consultation form verified");
  }

//   async VerifyNavigateBackViaCancelButton() {
//     await this.NavigateToConsultationForm();
//     await this.consultationFormPage.clickCancelButton();
//     // Should be back on product details page
//     const url = this.page.url();
//     if (!url.includes("/product/")) {
//       throw new Error("Did not navigate back to product page");
//     }
//     console.log("✓ Cancel button navigation verified");
//   }

  async VerifyNavigateBackViaBreadcrumb() {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.clickBreadcrumbProductName();
    const url = this.page.url();
    if (!url.includes("/product/")) {
      throw new Error("Did not navigate back to product page via breadcrumb");
    }
    console.log("✓ Breadcrumb navigation to product verified");
  }

  async VerifyNavigateHomeViaBreadcrumb() {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.clickBreadcrumbHome();
    await this.verifyPageTitle("Imtra | Boating, Transportation, Energy & Marine Products");
    console.log("✓ Breadcrumb navigation to home verified");
  }

  // ============================================================================
  // Form Validation Tests
  // ============================================================================

  async VerifyEmptyFormValidation() {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.clickSubmitButton();
    const errors = await this.consultationFormPage.getAllErrorMessages();
    if (errors.length === 0) {
      throw new Error("No validation errors on empty form submission");
    }
    console.log(`✓ Empty form validation - ${errors.length} errors displayed`);
    return errors;
  }

  async VerifyFieldValidation(fieldName, value, errorMessage) {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.fillField(fieldName, value);
    await this.consultationFormPage.clickSubmitButton();
    await this.consultationFormPage.verifyErrorMessage(errorMessage);
    console.log(`✓ ${fieldName} validation working`);
  }

  async VerifyRequiredFieldValidation(fieldName, validValue, errorMessage) {
    await this.NavigateToConsultationForm();
    
    // Submit empty - verify error
    await this.consultationFormPage.clickSubmitButton();
    await this.consultationFormPage.verifyErrorMessage(errorMessage);
    
    // Fill field - verify error disappears
    await this.consultationFormPage.fillField(fieldName, validValue);
    await this.consultationFormPage.clickSubmitButton();
    await this.consultationFormPage.verifyNoErrorMessage(errorMessage);
    
    console.log(`✓ ${fieldName} required field validation working`);
  }

  async VerifyDropdownValidation(errorMessage) {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.clickSubmitButton();
    await this.consultationFormPage.verifyErrorMessage(errorMessage);
    
    // Select option
    await this.consultationFormPage.selectContactMethod("EMAIL");
    await this.consultationFormPage.clickSubmitButton();
    await this.consultationFormPage.verifyNoErrorMessage(errorMessage);
    
    console.log("✓ Contact Method dropdown validation working");
  }

  // ============================================================================
  // Optional Field Tests
  // ============================================================================

  async VerifyOptionalFieldWorks(fieldName, value) {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.verifyFieldAcceptsInput(fieldName, value);
    console.log(`✓ Optional field "${fieldName}" works`);
  }

  // ============================================================================
  // Format Validation Tests
  // ============================================================================

  async VerifyEmailFormatValidation(invalidEmail) {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.fillEmail(invalidEmail);
    await this.consultationFormPage.clickSubmitButton();
    await this.consultationFormPage.verifyErrorMessage(CONSULTATION_ERROR_MESSAGES.EMAIL_INVALID);
    console.log("✓ Email format validation working");
  }

  async VerifyPhoneFormatValidation(invalidPhone) {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.fillPhone(invalidPhone);
    await this.consultationFormPage.clickSubmitButton();
    await this.consultationFormPage.verifyErrorMessage(CONSULTATION_ERROR_MESSAGES.PHONE_INVALID);
    console.log("✓ Phone format validation working");
  }

  // ============================================================================
  // Successful Submission Tests (without actually submitting due to reCAPTCHA)
  // ============================================================================

  async VerifyFormCanBeFilled() {
    await this.NavigateToConsultationForm();
    await this.consultationFormPage.fillAllRequiredFields(VALID_FORM_DATA);
    
    // Also fill optional fields
    await this.consultationFormPage.fillMessage(VALID_FORM_DATA.message);
    
    console.log("✓ Form can be filled with all valid data");
  }
}