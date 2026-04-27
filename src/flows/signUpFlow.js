import { SignUpPage } from "../pages/SignUpPage";
import { BasePage } from "../pages/BasePage";
import { SIGNUP_ERROR_MESSAGES, SIGNUP_CHECKBOXES } from "../utils/data/signUpData";

export class SignUpFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.signUpPage = new SignUpPage(page, actions);
  }

  // ============================================================================
  // Navigation
  // ============================================================================

  async NavigateToSignUpPage() {
    await this.signUpPage.navigateToSignUpPage();
    await this.signUpPage.clearPreFilledFields();
  }

  // ============================================================================
  // Generic Validation Methods
  // ============================================================================

  async VerifyEmptyFormValidation() {
    await this.NavigateToSignUpPage();
    await this.signUpPage.clickCompleteRegistration();
    const errors = await this.signUpPage.getAllErrorMessages();
    if (errors.length === 0) {
      throw new Error("No validation errors displayed on empty form submission");
    }
    console.log(`✓ Empty form validation working - ${errors.length} errors displayed`);
    return errors;
  }

  async VerifyFieldValidation(placeholder, value, errorMessage) {
    await this.NavigateToSignUpPage();
    await this.signUpPage.fillField(placeholder, value);
    await this.signUpPage.clickCompleteRegistration();
    await this.signUpPage.verifyErrorMessage(errorMessage);
    console.log(`✓ ${placeholder} validation working for: "${value}"`);
  }

  async VerifyRequiredFieldValidation(placeholder, value, errorMessage) {
    await this.NavigateToSignUpPage();
    await this.signUpPage.clickCompleteRegistration();
    await this.signUpPage.verifyErrorMessage(errorMessage);
    await this.signUpPage.fillField(placeholder, value);
    await this.signUpPage.clickCompleteRegistration();
    await this.signUpPage.verifyNoErrorMessage(errorMessage);
    console.log(`✓ ${placeholder} required field validation working`);
  }

  // ============================================================================
  // Password Specific Methods
  // ============================================================================

  async VerifyPasswordValidation(password, errorMessage) {
    await this.NavigateToSignUpPage();
    await this.signUpPage.fillField("Password", password);
    await this.signUpPage.clickCompleteRegistration();
    await this.signUpPage.verifyErrorMessage(errorMessage);
    console.log(`✓ Password validation working for: "${password}"`);
  }

  async VerifyPasswordsMustMatch(password, differentPassword) {
    await this.NavigateToSignUpPage();
    await this.signUpPage.fillField("Password", password);
    await this.signUpPage.fillField("Confirm Password", differentPassword);
    await this.signUpPage.clickCompleteRegistration();
    await this.signUpPage.verifyErrorMessage(SIGNUP_ERROR_MESSAGES.PASSWORDS_MUST_MATCH);
    console.log("✓ Passwords must match validation working");
  }

  // ============================================================================
  // Already Registered Methods
  // ============================================================================

  async fillAllRequiredFields(overrides = {}) {
    const defaults = {
      email: "newuser" + Date.now() + "@test.com",
      username: "newuser" + Date.now(),
      password: "Test@123",
      confirmPassword: "Test@123",
      firstName: "Test",
      lastName: "User",
      phone: "(555) 123-4567",
      address: "123 Test Street",
      city: "New York",
      postalCode: "10001",
    };
    const data = { ...defaults, ...overrides };

    await this.signUpPage.fillField("Email", data.email);
    await this.signUpPage.fillField("Username", data.username);
    await this.signUpPage.fillField("Password", data.password);
    await this.signUpPage.fillField("Confirm Password", data.confirmPassword);
    await this.signUpPage.fillField("First Name", data.firstName);
    await this.signUpPage.fillField("Last Name", data.lastName);
    await this.signUpPage.fillField("Phone", data.phone);
    await this.signUpPage.fillField("Address", data.address);
    await this.signUpPage.fillField("City", data.city);
    await this.signUpPage.fillField("Postal Code", data.postalCode);
  }

  async VerifyAlreadyRegistered(overrides, description) {
    await this.NavigateToSignUpPage();
    await this.fillAllRequiredFields(overrides);
    await this.signUpPage.clickCompleteRegistration();
    await this.signUpPage.verifyErrorMessage(SIGNUP_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    console.log(`✓ ${description} validation working`);
  }

  // ============================================================================
  // Checkbox Test
  // ============================================================================

  async VerifyAllCheckboxes() {
    await this.NavigateToSignUpPage();
    for (const cb of SIGNUP_CHECKBOXES) await this.signUpPage.clickCheckbox(cb);
    for (const cb of SIGNUP_CHECKBOXES) await this.signUpPage.verifyCheckboxState(cb, true);
    for (const cb of SIGNUP_CHECKBOXES) await this.signUpPage.clickCheckbox(cb);
    for (const cb of SIGNUP_CHECKBOXES) await this.signUpPage.verifyCheckboxState(cb, false);
    console.log("✓ All checkboxes functionality verified");
  }

  // ============================================================================
  // Company Name Test
  // ============================================================================

  async VerifyCompanyNameField(companyName) {
    await this.NavigateToSignUpPage();
    await this.signUpPage.verifyFieldAcceptsInput("Company Name", companyName);
    console.log("✓ Company Name field working");
  }
}