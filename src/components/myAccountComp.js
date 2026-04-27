/**
 * MyAccount Component
 * Contains common reusable UI interactions for all MyAccount tabs
 */
export class MyAccountComp {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  // ============================================================================
  // Common Edit/Save/Cancel Button Methods
  // ============================================================================

  /**
   * Clicks EDIT button in a specific section
   * @param {string} sectionName - Section heading text (e.g., "Account Information", "Communication Preferences")
   */
  async clickEditInSection(sectionName) {
    console.log(`[MyAccountComp] Clicking Edit in "${sectionName}" section...`);
  
    const section = this.page.locator('div.text-xl.font-semibold', {
      hasText: sectionName
    });
  
    const container = section.locator('xpath=ancestor::div[contains(@class,"rounded")]'); 
    const editButton = container.locator('button:has-text("EDIT")');
  
    await this.actions.click(editButton);
    await this.actions.addSleep(1);
  
    console.log(`✓ Clicked Edit in "${sectionName}"`);
  }

  /**
   * Clicks SAVE button in a specific section
   * @param {string} sectionName - Section heading text
   */
  async clickSaveInSection(sectionName) {
    console.log(`[MyAccountComp] Clicking Save in "${sectionName}" section...`);
    const saveButton = this.page.locator(`div:has-text("${sectionName}") >> button:has-text("SAVE")`).first();
    await this.actions.click(saveButton);
    await this.actions.addSleep(2);
    console.log(`✓ Clicked Save in "${sectionName}"`);
  }

  /**
   * Clicks CANCEL button in a specific section
   * @param {string} sectionName - Section heading text
   */
  async clickCancelInSection(sectionName) {
    console.log(`[MyAccountComp] Clicking Cancel in "${sectionName}" section...`);
    const cancelButton = this.page.locator(`div:has-text("${sectionName}") >> button:has-text("CANCEL")`).first();
    await this.actions.click(cancelButton);
    await this.actions.addSleep(1);
    console.log(`✓ Clicked Cancel in "${sectionName}"`);
  }

  /**
   * Clicks generic EDIT button (first found)
   */
  async clickEdit() {
    console.log("[MyAccountComp] Clicking Edit button...");
    const editButton = this.page.locator('button:has-text("EDIT")').first();
    await this.actions.click(editButton);
    await this.actions.addSleep(1);
    console.log("✓ Clicked Edit");
  }

  /**
   * Clicks generic SAVE button (first found)
   */
  async clickSave() {
    console.log("[MyAccountComp] Clicking Save button...");
    const saveButton = this.page.locator('button:has-text("SAVE")').first();
    await this.actions.click(saveButton);
    await this.actions.addSleep(2);
    console.log("✓ Clicked Save");
  }

  /**
   * Clicks generic CANCEL button (first found)
   */
  async clickCancel() {
    console.log("[MyAccountComp] Clicking Cancel button...");
    const cancelButton = this.page.locator('button:has-text("CANCEL")').first();
    await this.actions.click(cancelButton);
    await this.actions.addSleep(1);
    console.log("✓ Clicked Cancel");
  }

  // ============================================================================
  // Common Input Field Methods
  // ============================================================================

  /**
   * Fills an input field by ID
   * @param {string} fieldId - Input field ID
   * @param {string} value - Value to fill
   */
  async fillFieldById(fieldId, value) {
    console.log(`[MyAccountComp] Filling "#${fieldId}" with "${value}"`);
    const field = this.page.locator(`#${fieldId}`);
    await this.actions.waitForVisible(field);
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    await this.actions.addSleep(0.5);
    console.log(`✓ Filled "#${fieldId}"`);
  }

  /**
   * Fills an input field by name attribute
   * @param {string} fieldName - Input field name
   * @param {string} value - Value to fill
   */
  async fillFieldByName(fieldName, value) {
    console.log(`[MyAccountComp] Filling input[name="${fieldName}"] with "${value}"`);
    const field = await this.actions.findInputByName(fieldName);
    await this.actions.waitForVisible(field);
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    await this.actions.addSleep(0.5);
    console.log(`✓ Filled "${fieldName}"`);
  }

  /**
   * Fills an input field by label text
   * @param {string} labelText - Label text associated with input
   * @param {string} value - Value to fill
   */
  async fillFieldByLabel(labelText, value) {
    console.log(`[MyAccountComp] Filling field with label "${labelText}" with "${value}"`);
    const field = this.page.locator(`label:has-text("${labelText}") + input, label:has-text("${labelText}") ~ input`).first();
    await this.actions.waitForVisible(field);
    await this.actions.clearInput(field);
    await this.actions.fill(field, value);
    await this.actions.addSleep(0.5);
    console.log(`✓ Filled field with label "${labelText}"`);
  }

  /**
   * Gets the value of an input field by ID
   * @param {string} fieldId - Input field ID
   * @returns {string} Field value
   */
  async getFieldValueById(fieldId) {
    const field = this.page.locator(`#${fieldId}`);
    return await this.actions.getValue(field);
  }

  /**
   * Clears an input field by ID
   * @param {string} fieldId - Input field ID
   */
  async clearFieldById(fieldId) {
    console.log(`[MyAccountComp] Clearing "#${fieldId}"...`);
    const field = this.page.locator(`#${fieldId}`);
    await this.actions.clearInput(field);
    await this.actions.addSleep(0.5);
    console.log(`✓ Cleared "#${fieldId}"`);
  }

  /**
   * Checks if a field is disabled
   * @param {string} fieldId - Input field ID
   * @returns {boolean} True if disabled
   */
  async isFieldDisabled(fieldId) {
    const field = this.page.locator(`#${fieldId}`);
    return await this.actions.isDisabled(field);
  }

  // ============================================================================
  // Common Checkbox Methods
  // ============================================================================

  /**
   * Checks a checkbox by label text
   * @param {string} labelText - Checkbox label text
   */
  async checkCheckbox(labelText) {
    console.log(`[MyAccountComp] Checking checkbox: "${labelText}"`);
    const checkbox = this.page.locator(`label:has-text("${labelText}") input[type="checkbox"]`).first();
    const isChecked = await this.actions.isSelected(checkbox);
    if (!isChecked) {
      await this.actions.selectCheckbox(checkbox);
    }
    await this.actions.addSleep(0.5);
    console.log(`✓ Checkbox "${labelText}" is checked`);
  }

  /**
   * Unchecks a checkbox by label text
   * @param {string} labelText - Checkbox label text
   */
  async uncheckCheckbox(labelText) {
    console.log(`[MyAccountComp] Unchecking checkbox: "${labelText}"`);
    const checkbox = this.page.locator(`label:has-text("${labelText}") input[type="checkbox"]`).first();
    const isChecked = await this.actions.isSelected(checkbox);
    if (isChecked) {
      await this.actions.unselectCheckbox(checkbox);
    }
    await this.actions.addSleep(0.5);
    console.log(`✓ Checkbox "${labelText}" is unchecked`);
  }

  /**
   * Returns whether a checkbox is checked
   * @param {string} labelText - Checkbox label text
   * @returns {boolean} True if checked
   */
  async isCheckboxChecked(labelText) {
    const checkbox = this.page.locator(`label:has-text("${labelText}") input[type="checkbox"]`).first();
    return await this.actions.isSelected(checkbox);
  }

  /**
   * Toggles a checkbox
   * @param {string} labelText - Checkbox label text
   */
  async toggleCheckbox(labelText) {
    console.log(`[MyAccountComp] Toggling checkbox: "${labelText}"`);
    const checkbox = this.page.locator(`label:has-text("${labelText}") input[type="checkbox"]`).first();
    await this.actions.click(checkbox);
    await this.actions.addSleep(0.5);
  }

  /**
   * Checks all checkboxes in a list
   * @param {string[]} labels - Array of checkbox label texts
   */
  async checkAllCheckboxes(labels) {
    console.log("[MyAccountComp] Checking all checkboxes...");
    for (const label of labels) {
      await this.checkCheckbox(label);
    }
    console.log("✓ All checkboxes checked");
  }

  /**
   * Unchecks all checkboxes in a list
   * @param {string[]} labels - Array of checkbox label texts
   */
  async uncheckAllCheckboxes(labels) {
    console.log("[MyAccountComp] Unchecking all checkboxes...");
    for (const label of labels) {
      await this.uncheckCheckbox(label);
    }
    console.log("✓ All checkboxes unchecked");
  }

  // ============================================================================
  // Common Dropdown/Select Methods
  // ============================================================================

  /**
   * Selects an option from a dropdown by ID
   * @param {string} dropdownId - Dropdown element ID
   * @param {string} optionText - Option text to select
   */
  async selectDropdownById(dropdownId, optionText) {
    console.log(`[MyAccountComp] Selecting "${optionText}" from "#${dropdownId}"`);
    const dropdown = this.page.locator(`#${dropdownId}`);
    await this.actions.click(dropdown);
    await this.actions.addSleep(0.5);
    
    const option = this.page.locator(`li:has-text("${optionText}"), div[role="option"]:has-text("${optionText}")`).first();
    await this.actions.click(option);
    await this.actions.addSleep(0.5);
    console.log(`✓ Selected "${optionText}"`);
  }

  /**
   * Selects an option from a dropdown by label
   * @param {string} labelText - Label text for dropdown
   * @param {string} optionText - Option text to select
   */
  async selectDropdownByLabel(labelText, optionText) {
    console.log(`[MyAccountComp] Selecting "${optionText}" from dropdown "${labelText}"`);
    const dropdown = this.page.locator(`label:has-text("${labelText}") ~ select, label:has-text("${labelText}") ~ div[class*="select"]`).first();
    await this.actions.click(dropdown);
    await this.actions.addSleep(0.5);
    
    const option = this.page.locator(`li:has-text("${optionText}"), option:has-text("${optionText}")`).first();
    await this.actions.click(option);
    await this.actions.addSleep(0.5);
    console.log(`✓ Selected "${optionText}"`);
  }

  // ============================================================================
  // Common Error/Success Message Methods
  // ============================================================================

  /**
   * Verifies an error message is displayed
   * @param {string} errorMessage - Expected error message text
   */
  async verifyErrorMessage(errorMessage) {
    console.log(`[MyAccountComp] Verifying error: "${errorMessage}"...`);
    const errorLocator = this.page.locator(`text="${errorMessage}"`);
    await this.actions.waitForVisible(errorLocator);
    console.log(`✓ Error displayed: "${errorMessage}"`);
  }

  /**
   * Verifies an error message is NOT displayed
   * @param {string} errorMessage - Error message that should not appear
   */
  async verifyNoErrorMessage(errorMessage) {
    console.log(`[MyAccountComp] Verifying NO error: "${errorMessage}"...`);
    const errorLocator = this.page.locator(`text="${errorMessage}"`);
    const count = await this.actions.getelementCount(errorLocator);
    if (count > 0) {
      throw new Error(`Error should not be displayed but found: "${errorMessage}"`);
    }
    console.log(`✓ No error: "${errorMessage}"`);
  }

  /**
   * Verifies a success message is displayed
   */
  /**
 * Verifies a success message is displayed
 */
async verifySuccessMessage() {
  console.log("[MyAccountComp] Verifying success message...");
  
  const successLocator = this.page.locator('text=/Communication preferences updated|Account information updated|do not have permission to edit/i');
  await this.actions.waitForVisible(successLocator);
  console.log("✓ Success message displayed");

  // Locator for the close (X) button (your SVG element)
  const closeIcon = this.page.locator('g[clip-path^="url(#clip0_"]');

  try {
    // Try to detect it quickly (non-blocking)
    if (await closeIcon.isVisible({ timeout: 2000 })) {
      console.log("[MyAccountComp] Close icon found, clicking...");
      await closeIcon.click();
    } else {
      console.log("[MyAccountComp] Close icon not present, continuing...");
    }
  } catch (e) {
    console.log("[MyAccountComp] Close icon not found, continuing...");
  }
}

  /**
   * Verifies a specific success message
   * @param {string} message - Success message to verify
   */
  async verifySpecificSuccessMessage(message) {
    console.log(`[MyAccountComp] Verifying success message: "${message}"...`);
    const successLocator = this.page.locator(`text="${message}"`);
    await this.actions.waitForVisible(successLocator);
    console.log(`✓ Success message displayed: "${message}"`);
  }

  // ============================================================================
  // Common Modal Methods
  // ============================================================================

  /**
   * Closes a modal by clicking X button
   */
  async closeModal() {
    console.log("[MyAccountComp] Closing modal...");
    const closeButton = this.page.getByRole('button', { name: /close icon/i });
    if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeButton.click();
      await this.actions.addSleep(1);
      console.log("✓ Modal closed");
    } else {
      console.log(" Close button not found, skipping...");
    }
  }

  /**
   * Verifies a modal is visible with given title
   * @param {string} modalTitle - Expected modal title
   */
  async verifyModalVisible(modalTitle) {
    console.log(`[MyAccountComp] Verifying modal: "${modalTitle}"...`);
    await this.page.waitForSelector(`text="${modalTitle}"`, { state: 'visible', timeout: 5000 });
    console.log(`✓ Modal "${modalTitle}" is visible`);
  }

  // ============================================================================
  // Common Table Methods (for Orders, Returns, etc.)
  // ============================================================================

  /**
   * Gets the count of rows in a table
   * @returns {number} Number of rows
   */
  async getTableRowCount() {
    const rows = this.page.locator('table tbody tr, div[role="row"]');
    return await this.actions.getelementCount(rows);
  }

  /**
   * Clicks on a row in the table by index
   * @param {number} index - Row index (0-based)
   */
  async clickTableRow(index) {
    const row = this.page.locator('table tbody tr, div[role="row"]').nth(index);
    await this.actions.click(row);
    await this.actions.addSleep(1);
  }

  /**
   * Searches in a search field
   * @param {string} searchText - Text to search
   * @param {string} placeholder - Search input placeholder (default: "Search")
   */
  async searchInTable(searchText, placeholder = "Search") {
    console.log(`[MyAccountComp] Searching: "${searchText}"`);
    const searchField = await this.actions.getByPlaceholder(placeholder);
    await this.actions.fill(searchField, searchText);
    await this.actions.addSleep(1);
    console.log(`✓ Searched: "${searchText}"`);
  }

  /**
   * Clears search field
   * @param {string} placeholder - Search input placeholder
   */
  async clearSearch(placeholder = "Search") {
    const searchField = await this.actions.getByPlaceholder(placeholder);
    await this.actions.clearInput(searchField);
    await this.actions.addSleep(1);
  }

  // ============================================================================
  // Common Card Methods (for User Login, Address tabs)
  // ============================================================================

  /**
   * Clicks Edit button on a card by index
   * @param {number} index - Card index (0-based)
   */
  async clickEditOnCard(index = 0) {
    console.log(`[MyAccountComp] Clicking Edit on card ${index}...`);
    const editButton = this.page.locator('button:has-text("Edit"), button[title="Edit"]').nth(index);
    await this.actions.click(editButton);
    await this.actions.addSleep(1);
    console.log(`✓ Clicked Edit on card ${index}`);
  }

  /**
   * Clicks Delete button on a card by index
   * @param {number} index - Card index (0-based)
   */
  async clickDeleteOnCard(index = 0) {
    console.log(`[MyAccountComp] Clicking Delete on card ${index}...`);
    const deleteButton = this.page.locator('button:has-text("Delete"), button[title="Delete"]').nth(index);
    await this.actions.click(deleteButton);
    await this.actions.addSleep(1);
    console.log(`✓ Clicked Delete on card ${index}`);
  }

  /**
   * Confirms deletion in confirmation dialog
   */
  async confirmDelete() {
    console.log("[MyAccountComp] Confirming deletion...");
    const confirmButton = this.page.locator('button:has-text("Confirm"), button:has-text("Yes"), button:has-text("Delete")').last();
    await this.actions.click(confirmButton);
    await this.actions.addSleep(2);
    console.log("✓ Deletion confirmed");
  }

  /**
   * Cancels deletion in confirmation dialog
   */
  async cancelDelete() {
    console.log("[MyAccountComp] Cancelling deletion...");
    const cancelButton = this.page.locator('button:has-text("Cancel"), button:has-text("No")').last();
    await this.actions.click(cancelButton);
    await this.actions.addSleep(1);
    console.log("✓ Deletion cancelled");
  }

  // ============================================================================
  // Common Add New Button Methods
  // ============================================================================

  /**
   * Clicks Add New button with specific text
   * @param {string} buttonText - Button text (e.g., "ADD NEW USER", "ADD NEW ADDRESS")
   */
  async clickAddNewButton(buttonText) {
    console.log(`[MyAccountComp] Clicking "${buttonText}" button...`);
    const button = await this.actions.findButtonByText(buttonText);
    await this.actions.click(button);
    await this.actions.addSleep(1);
    console.log(`✓ Clicked "${buttonText}"`);
  }

  // ============================================================================
  // Pagination Methods
  // ============================================================================

  /**
   * Clicks Next page button
   */
  async clickNextPage() {
    const nextButton = await this.actions.findButtonByText("Next");
    await this.actions.click(nextButton);
    await this.actions.addSleep(1);
  }

  /**
   * Clicks Previous page button
   */
  async clickPreviousPage() {
    const prevButton = await this.actions.findButtonByText("Previous");
    await this.actions.click(prevButton);
    await this.actions.addSleep(1);
  }

  /**
   * Gets pagination info text
   * @returns {string} Pagination text (e.g., "Showing 1 to 10 of 50")
   */
  async getPaginationInfo() {
    const paginationText = this.page.locator('text=/Showing \\d+ to \\d+ of \\d+/');
    const count = await this.actions.getelementCount(paginationText);
    if (count > 0) {
      return await this.actions.getText(paginationText);
    }
    return "";
  }
}