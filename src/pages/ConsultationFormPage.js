import { BasePage } from "./BasePage";

export class ConsultationFormPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
  }

  // ============================================================================
  // Navigation
  // ============================================================================

  async verifyOnConsultationPage() {
    await this.verifyPageTitle("Request Consultation - IMTRA");
    console.log("✓ On Request Consultation page");
  }

  // ============================================================================
  // Form Field Methods
  // ============================================================================

  async fillField(labelText, value) {
    console.log(`[ConsultationForm] Filling "${labelText}" with "${value}"`);
    
    // Remove asterisk if present for matching
    const cleanLabel = labelText.replace("*", "").trim().toUpperCase();
    
    let field;
    
    // Use input ID or name attribute based on actual HTML structure
    switch (cleanLabel) {
      case "FIRST NAME":
        field = this.page.locator('#input-first-name');
        break;
      case "LAST NAME":
        field = this.page.locator('#input-last-name');
        break;
      case "COMPANY NAME":
        field = this.page.locator('#input-company-name');
        break;
      case "EMAIL":
        field = this.page.locator('#input-email');
        break;
      case "PHONE":
        field = this.page.locator('#input-phone');
        break;
      case "DESIRED QUANTITY":
        field = this.page.locator('#input-desired-quantity');
        break;
      case "IN HAND DATE":
        field = this.page.locator('#date-input-in-hand-date');
        break;
      case "MESSAGE":
        field = this.page.locator('#textarea-message');
        break;
      default:
        throw new Error(`Unknown field: ${labelText}`);
    }
    
    // Wait for field to be visible
    await field.waitFor({ state: 'visible', timeout: 5000 });
    
    // Clear and fill
    await field.clear();
    await field.fill(value);
    await addSleep(0.5);
    
    // Verify the value was entered
    const actualValue = await field.inputValue();
    if (actualValue !== value) {
      throw new Error(`Field "${cleanLabel}" value mismatch. Expected "${value}", got "${actualValue}"`);
    }
    
    console.log(`✓ Filled "${cleanLabel}" with "${value}"`);
  }

  async selectContactMethod(option) {
    console.log(`[ConsultationForm] Selecting contact method: "${option}"`);
  
    await this.page.locator('#preferedContactMethod').selectOption(option);
  
    console.log(`✓ Selected: "${option}"`);
  }

  async selectContactPerson(option) {
    console.log(`[ConsultationForm] Selecting contact person: "${option}"`);
    
    const dropdown = this.page.locator('text="Select Contact Person"').first();
    await dropdown.click();
    await addSleep(0.5);
    
    const optionLocator = this.page.locator(`text="${option}"`).last();
    await optionLocator.click();
    await addSleep(0.5);
  }

  async fillFirstName(value) {
    await this.fillField("First Name", value);
  }

  async fillLastName(value) {
    await this.fillField("Last Name", value);
  }

  async fillCompanyName(value) {
    await this.fillField("Company Name", value);
  }

  async fillEmail(value) {
    await this.fillField("Email", value);
  }

  async fillPhone(value) {
    await this.fillField("Phone", value);
  }

  async fillDesiredQuantity(value) {
    await this.fillField("Desired Quantity", value);
  }

  async fillMessage(value) {
    await this.fillField("Message", value);
  }

  async fillInHandDate(value) {
    await this.fillField("In Hand Date", value);
  }

  // ============================================================================
  // Button Methods
  // ============================================================================

  async clickSubmitButton() {
    console.log("[ConsultationForm] Clicking Submit button...");
    const button = await findButtonByText("SUBMIT");
    await click(button);
    await addSleep(2);
    console.log("✓ Clicked Submit");
  }

  async clickCancelButton() {
    console.log("[ConsultationForm] Clicking Cancel button...");
    const cancelLink = this.page.locator('text="CANCEL"');
    await cancelLink.click();
    await addSleep(2);
    console.log("✓ Clicked Cancel");
  }

  // ============================================================================
  // Error Verification Methods
  // ============================================================================

  async verifyErrorMessage(errorMessage) {
    console.log(`[ConsultationForm] Verifying error: "${errorMessage}"...`);
    const errorLocator = this.page.locator(`text="${errorMessage}"`);
    await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
    console.log(`✓ Error displayed: "${errorMessage}"`);
  }

  async verifyNoErrorMessage(errorMessage) {
    console.log(`[ConsultationForm] Verifying NO error: "${errorMessage}"...`);
    const errorLocator = this.page.locator(`text="${errorMessage}"`);
    const count = await errorLocator.count();
    if (count > 0) {
      throw new Error(`Error should not be displayed but found: "${errorMessage}"`);
    }
    console.log(`✓ No error: "${errorMessage}"`);
  }

  async getAllErrorMessages() {
    await addSleep(1);
    // Get all error messages (typically in red text below fields)
    const errors = this.page.locator('text=/is required|Enter your|Please enter|Please Select/i');
    const count = await errors.count();
    const messages = [];
    for (let i = 0; i < count; i++) {
      messages.push((await errors.nth(i).textContent()).trim());
    }
    console.log(`[ConsultationForm] Found ${messages.length} errors:`, messages);
    return messages;
  }

  // ============================================================================
  // Success Verification
  // ============================================================================

  async verifyThankYouPage() {
    console.log("[ConsultationForm] Verifying Thank You page...");
    const thankYouText = this.page.locator('text=/Thank you|successfully/i');
    await thankYouText.waitFor({ state: 'visible', timeout: 10000 });
    console.log("✓ Thank You page displayed");
  }

  async clickGoBackButton() {
    console.log("[ConsultationForm] Clicking Go Back button...");
    const button = this.page.locator('text="Go Back"');
    await button.click();
    await addSleep(2);
    console.log("✓ Clicked Go Back");
  }

  async clickContinueShoppingButton() {
    console.log("[ConsultationForm] Clicking Continue Shopping button...");
    const button = this.page.locator('text="Continue Shopping"');
    await button.click();
    await addSleep(2);
    console.log("✓ Clicked Continue Shopping");
  }

  // ============================================================================
  // Breadcrumb Navigation
  // ============================================================================

  async clickBreadcrumbHome() {
    console.log("[ConsultationForm] Clicking Home breadcrumb...");
    const breadcrumb = this.page.locator('a:has-text("Home")').first();
    await breadcrumb.click();
    await addSleep(2);
    console.log("✓ Clicked Home breadcrumb");
  }

  async clickBreadcrumbProductName() {
    console.log("[ConsultationForm] Clicking product name in breadcrumb...");
    // The product name is typically the second-to-last breadcrumb item
    const breadcrumbs = this.page.locator('div[itemtype="https://schema.org/BreadcrumbList"] a');
    const count = await breadcrumbs.count();
    if (count > 1) {
      await breadcrumbs.nth(count - 2).click();
      await addSleep(2);
      console.log("✓ Clicked product breadcrumb");
    }
  }

  // ============================================================================
  // Fill All Required Fields
  // ============================================================================

  async fillAllRequiredFields(data = {}) {
    const defaults = {
      firstName: "John",
      lastName: "Doe",
      companyName: "Test Company",
      email: "test@example.com",
      phone: "(555) 123-4567",
      contactMethod: "Email",
      quantity: "5",
    };
    const formData = { ...defaults, ...data };

    await this.fillFirstName(formData.firstName);
    await this.fillLastName(formData.lastName);
    await this.fillCompanyName(formData.companyName);
    await this.selectContactMethod(formData.contactMethod);
    await this.fillEmail(formData.email);
    await this.fillPhone(formData.phone);
    await this.fillDesiredQuantity(formData.quantity);
  }

  // ============================================================================
  // Field Input Verification
  // ============================================================================

  async verifyFieldAcceptsInput(labelText, value) {
    console.log(`[ConsultationForm] Verifying "${labelText}" accepts input...`);
    await this.fillField(labelText, value);
    console.log(`✓ Field "${labelText}" accepts input`);
  }
}