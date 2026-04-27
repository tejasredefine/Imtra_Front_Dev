import { DocumentLibrary } from "../components/DocumentLibrary";
import { BasePage } from "./BasePage";

export class DocumentLibraryPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.documentLibrary = new DocumentLibrary(page, actions);
  }

  // ============================================================================
  // Page Verification Methods
  // ============================================================================

  /**
   * Verifies we are on the Document Library page and waits for it to fully load
   */
  async verifyOnDocumentLibraryPage() {
    await this.verifyPageTitle("Document Library");
    await this.documentLibrary.waitForPageToLoad();
    console.log("✓ Verified on Document Library page");
  }

  /**
   * Waits for the page to be fully ready (data loaded)
   */
  async waitForPageReady() {
    await this.documentLibrary.waitForPageToLoad();
    await this.documentLibrary.waitForDropdownDataToLoad();
  }

  // ============================================================================
  // Dropdown Selection and Verification Methods
  // ============================================================================

  /**
   * Selects a brand and verifies data state
   * @param {string} brandName - Brand name to select
   * @returns {object} { hasData, rowCount }
   */
  async selectBrandAndVerifyData(brandName) {
    await this.documentLibrary.selectBrand(brandName);
    return await this.documentLibrary.verifyDataState();
  }

  /**
   * Selects a category and verifies data state
   * @param {string} categoryName - Category name to select
   * @returns {object} { hasData, rowCount }
   */
  async selectCategoryAndVerifyData(categoryName) {
    await this.documentLibrary.selectCategory(categoryName);
    return await this.documentLibrary.verifyDataState();
  }

  /**
   * Selects a document type and verifies data state
   * @param {string} documentType - Document type to select
   * @returns {object} { hasData, rowCount }
   */
  async selectDocumentTypeAndVerifyData(documentType) {
    await this.documentLibrary.selectDocumentType(documentType);
    return await this.documentLibrary.verifyDataState();
  }

  /**
   * Generic method: Select from any dropdown and verify data
   * @param {string} dropdownText - Dropdown placeholder text
   * @param {string} optionText - Option to select
   * @returns {object} { hasData, rowCount }
   */
  async selectFromDropdownAndVerifyData(dropdownText, optionText) {
    await this.documentLibrary.selectFromDropdown(dropdownText, optionText);
    return await this.documentLibrary.verifyDataState();
  }

  // ============================================================================
  // Combined Filter Methods
  // ============================================================================

  /**
   * Applies multiple filters and verifies data
   * @param {object} filters - { brand, category, documentType }
   * @returns {object} { hasData, rowCount }
   */
  async applyFiltersAndVerifyData(filters = {}) {
    console.log("\n[DocumentLibraryPage] Applying filters:", filters);

    if (filters.brand) {
      await this.documentLibrary.selectBrand(filters.brand);
    }

    if (filters.category) {
      await this.documentLibrary.selectCategory(filters.category);
    }

    if (filters.documentType) {
      await this.documentLibrary.selectDocumentType(filters.documentType);
    }

    // Wait for filters to apply
    await this.actions.addSleep(2);

    return await this.documentLibrary.verifyDataState();
  }

  // ============================================================================
  // Search and Verification Methods
  // ============================================================================

  /**
   * Searches for documents and verifies data state
   * @param {string} searchText - Text to search
   * @returns {object} { hasData, rowCount }
   */
  async searchAndVerifyData(searchText) {
    await this.documentLibrary.searchDocuments(searchText);
    return await this.documentLibrary.verifyDataState();
  }

  // ============================================================================
  // Assertion Methods
  // ============================================================================

  /**
   * Selects from dropdown and asserts data IS displayed
   * @param {string} dropdownText - Dropdown placeholder text
   * @param {string} optionText - Option to select
   */
  async selectFromDropdownAndAssertDataExists(dropdownText, optionText) {
    await this.documentLibrary.selectFromDropdown(dropdownText, optionText);
    await this.documentLibrary.verifyDataIsDisplayed();
  }

  /**
   * Selects from dropdown and asserts NO data is displayed
   * @param {string} dropdownText - Dropdown placeholder text
   * @param {string} optionText - Option to select
   */
  async selectFromDropdownAndAssertNoData(dropdownText, optionText) {
    await this.documentLibrary.selectFromDropdown(dropdownText, optionText);
    await this.documentLibrary.verifyNoDataIsDisplayed();
  }

  /**
   * Selects brand and asserts data exists
   * @param {string} brandName - Brand to select
   */
  async selectBrandAndAssertDataExists(brandName) {
    await this.documentLibrary.selectBrand(brandName);
    await this.documentLibrary.verifyDataIsDisplayed();
  }

  /**
   * Selects brand and asserts no data
   * @param {string} brandName - Brand to select
   */
  async selectBrandAndAssertNoData(brandName) {
    await this.documentLibrary.selectBrand(brandName);
    await this.documentLibrary.verifyNoDataIsDisplayed();
  }

  /**
   * Selects category and asserts data exists
   * @param {string} categoryName - Category to select
   */
  async selectCategoryAndAssertDataExists(categoryName) {
    await this.documentLibrary.selectCategory(categoryName);
    await this.documentLibrary.verifyDataIsDisplayed();
  }

  /**
   * Selects document type and asserts data exists
   * @param {string} documentType - Document type to select
   */
  async selectDocumentTypeAndAssertDataExists(documentType) {
    await this.documentLibrary.selectDocumentType(documentType);
    await this.documentLibrary.verifyDataIsDisplayed();
  }

  // ============================================================================
  // Document Interaction Methods
  // ============================================================================

  /**
   * Clicks on a specific document file
   * @param {string} fileName - File name to click
   */
  async openDocument(fileName) {
    await this.documentLibrary.clickOnDocument(fileName);
  }

  /**
   * Gets all documents currently displayed
   * @returns {string[]} Array of document names
   */
  async getDisplayedDocuments() {
    return await this.documentLibrary.getAllDocumentNames();
  }

  /**
   * Gets all file names currently displayed
   * @returns {string[]} Array of file names
   */
  async getDisplayedFiles() {
    return await this.documentLibrary.getAllFileNames();
  }
}