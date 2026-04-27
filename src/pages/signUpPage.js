import { LoginPage } from "./loginPage";
import { BasePage } from "./BasePage";
import { expect } from "../utils/fixtures/baseFixtures";

export class SignUpPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.loginPage = new LoginPage(page, actions);
  }

  // ============================================================================
  // Navigation
  // ============================================================================

  async navigateToSignUpPage() {
    console.log("[SignUpPage] Navigating to Sign Up page...");
    await this.loginPage.clickOnLoginIcon();
    await this.verifyPageTitle("Sign In - IMTRA");
    
    const signUpLink = await findLinkByText("Sign Up");
    await click(signUpLink);
    await addSleep(2);
    
    await this.verifyPageTitle("Create Account | Sign Up - IMTRA");
    console.log("✓ Navigated to Sign Up page");
  }

  // ============================================================================
  // Generic Field Methods
  // ============================================================================

  async fillField(placeholder, value) {
    console.log(`[SignUpPage] Filling "${placeholder}" with "${value}"`);
    const field = this.page.locator(`input[placeholder="${placeholder}"]`);
    await field.fill(value);
    await addSleep(0.5);
  }

  async clearField(placeholder) {
    const field = this.page.locator(`input[placeholder="${placeholder}"]`);
    await field.clear();
  }

  async getFieldValue(placeholder) {
    const field = this.page.locator(`input[placeholder="${placeholder}"]`);
    return await field.inputValue();
  }

  async clearPreFilledFields() {
    console.log("[SignUpPage] Clearing pre-filled fields...");
    await this.clearField("Username");
    await this.clearField("Password");
    await this.clearField("Confirm Password");
    await addSleep(1);
    console.log("✓ Pre-filled fields cleared");
  }

  // ============================================================================
  // Button Method
  // ============================================================================

  async clickCompleteRegistration() {
    console.log("[SignUpPage] Clicking Complete Registration button...");
    const button = await findButtonByText("COMPLETE REGISTRATION");
    await click(button);
    await addSleep(2);
    console.log("✓ Clicked Complete Registration");
  }

  // ============================================================================
  // Error Verification Methods
  // ============================================================================

  async verifyErrorMessage(errorMessage) {
    console.log(`[SignUpPage] Verifying error: "${errorMessage}"...`);
  
    // Locator 1: Global error banner
    const globalError = this.page.locator('.bg-red-50', {
      hasText: errorMessage
    });
  
    // Locator 2: Field-level validation error
    const fieldError = this.page.locator('.text-red-600', {
      hasText: errorMessage
    });
  
    // Combine both
    const errorLocator = globalError.or(fieldError);
  
    await expect(errorLocator.first()).toBeVisible({ timeout: 5000 });
  
    console.log(`✓ Error displayed: "${errorMessage}"`);
  }

  async verifyNoErrorMessage(errorMessage) {
    console.log(`[SignUpPage] Verifying NO error: "${errorMessage}"...`);
    const errorLocator = this.page.locator(`text="${errorMessage}"`);
    const count = await errorLocator.count();
    if (count > 0) {
      throw new Error(`Error should not be displayed but found: "${errorMessage}"`);
    }
    console.log(`✓ No error: "${errorMessage}"`);
  }

  async getAllErrorMessages() {
    const errors = this.page.locator('text=/is required/');
    const count = await errors.count();
    const messages = [];
    for (let i = 0; i < count; i++) {
      messages.push((await errors.nth(i).textContent()).trim());
    }
    console.log(`[SignUpPage] Found ${messages.length} errors:`, messages);
    return messages;
  }

  // ============================================================================
  // Checkbox Methods
  // ============================================================================

  async clickCheckbox(labelText) {
    console.log(`[SignUpPage] Clicking checkbox: "${labelText}"`);
    const checkbox = this.page.locator(`label:has-text("${labelText}")`).first();
    await checkbox.click();
    await addSleep(0.5);
  }

  async isCheckboxChecked(labelText) {
    const checkbox = this.page.locator(`label:has-text("${labelText}") input[type="checkbox"]`);
    return await checkbox.isChecked();
  }

  async verifyCheckboxState(labelText, expectedChecked) {
    const isChecked = await this.isCheckboxChecked(labelText);
    if (isChecked !== expectedChecked) {
      throw new Error(`Checkbox "${labelText}" expected ${expectedChecked ? 'checked' : 'unchecked'} but was ${isChecked ? 'checked' : 'unchecked'}`);
    }
    console.log(`✓ Checkbox "${labelText}" is ${expectedChecked ? 'checked' : 'unchecked'}`);
  }

  // ============================================================================
  // Field Input Verification
  // ============================================================================

  async verifyFieldAcceptsInput(placeholder, value) {
    console.log(`[SignUpPage] Verifying "${placeholder}" field accepts input...`);
    await this.fillField(placeholder, value);
    const actualValue = await this.getFieldValue(placeholder);
    if (actualValue !== value) {
      throw new Error(`Field "${placeholder}" value mismatch. Expected: "${value}", Got: "${actualValue}"`);
    }
    console.log(`✓ Field "${placeholder}" works - Value: "${actualValue}"`);
  }
}