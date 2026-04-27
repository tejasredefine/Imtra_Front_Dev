export class DocumentLibrary {
    constructor(page, actions) {
      this.page = page;
      this.actions = actions;
  
      // React-Select Dropdown Selectors - click on the control container, not the placeholder
      // These selectors target the clickable container of React-Select
      this.brandDropdownSelector = '.react-select__control:has(.react-select__placeholder:has-text("Select brand(s)"))';
      this.categoryDropdownSelector = '.react-select__control:has(.react-select__placeholder:has-text("Select category(ies)"))';
      this.documentTypeDropdownSelector = '.react-select__control:has(.react-select__placeholder:has-text("Select document type(s)"))';
      
      // Alternative selectors using nth-child if above doesn't work
      this.brandDropdownAlt = '(//div[contains(@class, "react-select__control")])[1]';
      this.categoryDropdownAlt = '(//div[contains(@class, "react-select__control")])[2]';
      this.documentTypeDropdownAlt = '(//div[contains(@class, "react-select__control")])[3]';
      
      this.searchInput = 'input[placeholder*="Search documents"]';
      this.dataTable = "table";
      this.noDataMessage = 'text="No data found"';
    }
  
    // ============================================================================
    // Page Load & Initialization Methods
    // ============================================================================
  
    /**
     * Waits for the Document Library page to fully load
     * Ensures dropdowns and data are ready for interaction
     */
    async waitForPageToLoad() {
      console.log("\n[DocumentLibrary] Waiting for page to fully load...");
      
      // Wait for the page header to be visible
      await this.page.waitForSelector('text="Search for Document"', { state: 'visible', timeout: 15000 });
      
      // Wait for all three dropdowns to be present
      await this.page.waitForSelector('.react-select__control', { state: 'visible', timeout: 10000 });
      
      // Wait for the table to be present (even if empty)
      await this.page.waitForSelector('table', { state: 'visible', timeout: 10000 });
      
      // Additional wait for any async data loading
      await this.actions.addSleep(2);
      
      // Wait for network to be idle (no pending requests)
      try {
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch (e) {
        console.log("[DocumentLibrary] Network did not become idle, proceeding anyway");
      }
      
      console.log("✓ Document Library page fully loaded");
    }
  
    /**
     * Waits for dropdown data to be loaded (checks for API calls completion)
     */
    async waitForDropdownDataToLoad() {
      console.log("\n[DocumentLibrary] Waiting for dropdown data to load...");
      
      // Wait for network to settle
      try {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 });
      } catch (e) {
        console.log("[DocumentLibrary] Network idle timeout, proceeding...");
      }
      
      // Additional wait for React state updates
      await this.actions.addSleep(2);
      
      console.log("✓ Dropdown data should be loaded");
    }
  
    // ============================================================================
    // Dropdown Methods - React-Select Specific
    // ============================================================================
  
    /**
     * Clicks on a React-Select dropdown by finding its control container
     * @param {string} placeholderText - The placeholder text to identify the dropdown
     */
    async clickReactSelectDropdown(placeholderText) {
      console.log(`\n[DocumentLibrary] Clicking on React-Select dropdown: "${placeholderText}"`);
      
      // Method 1: Try clicking the control that contains the placeholder
      let dropdown = this.page.locator(
        `.react-select__control:has(.react-select__placeholder:text-is("${placeholderText}"))`
      );
      
      let dropdownExists = await dropdown.count() > 0;
      
      if (!dropdownExists) {
        // Method 2: Try finding by placeholder and going to parent control
        dropdown = this.page.locator(
          `.react-select__placeholder:text-is("${placeholderText}")`
        ).locator('xpath=ancestor::div[contains(@class, "react-select__control")]');
        dropdownExists = await dropdown.count() > 0;
      }
      
      if (!dropdownExists) {
        // Method 3: Try clicking the value-container which is also clickable
        dropdown = this.page.locator(
          `.react-select__value-container:has(.react-select__placeholder:text-is("${placeholderText}"))`
        );
        dropdownExists = await dropdown.count() > 0;
      }
  
      if (!dropdownExists) {
        // Method 4: Find by aria-label or nearby indicators
        dropdown = this.page.locator(`div[class*="react-select"]:has-text("${placeholderText}")`).first();
      }
  
      await dropdown.click({ force: true });
      await this.actions.addSleep(1);
      console.log(`✓ Dropdown "${placeholderText}" opened`);
    }
  
    /**
     * Clicks on dropdown and waits for options to load (for async data loading)
     * @param {string} placeholderText - The placeholder text to identify the dropdown
     * @param {number} maxRetries - Maximum number of retries to wait for options
     */
    async clickReactSelectDropdownAndWaitForOptions(placeholderText, maxRetries = 5) {
      console.log(`\n[DocumentLibrary] Clicking on dropdown and waiting for options: "${placeholderText}"`);
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        // Click the dropdown
        await this.clickReactSelectDropdown(placeholderText);
        
        // Wait a moment for options to load
        await this.actions.addSleep(1);
        
        // Check if menu is open and has options (not "No options")
        const menu = this.page.locator('.react-select__menu');
        const menuExists = await menu.count() > 0;
        
        if (menuExists) {
          // Check if "No options" message is displayed
          const noOptions = this.page.locator('.react-select__menu-notice--no-options, .react-select__menu:has-text("No options")');
          const hasNoOptions = await noOptions.count() > 0;
          
          if (!hasNoOptions) {
            // Options are loaded!
            console.log(`✓ Options loaded on attempt ${attempt}`);
            return true;
          }
          
          // Check if actual options exist
          const options = this.page.locator('.react-select__option');
          const optionCount = await options.count();
          
          if (optionCount > 0) {
            console.log(`✓ Found ${optionCount} options on attempt ${attempt}`);
            return true;
          }
        }
        
        console.log(`[DocumentLibrary] Attempt ${attempt}: Options not loaded yet, retrying...`);
        
        // Close the dropdown by pressing Escape and wait before retry
        await this.page.keyboard.press('Escape');
        await this.actions.addSleep(2);
      }
      
      console.log(`[DocumentLibrary] Warning: Options may not have loaded after ${maxRetries} attempts`);
      return false;
    }
  
    /**
     * Clicks on the Brand dropdown to open it
     */
    async clickOnBrandDropdown() {
      console.log("\n[DocumentLibrary] Clicking on Brand dropdown");
      await this.clickReactSelectDropdownAndWaitForOptions("Select brand(s)");
      console.log("✓ Brand dropdown opened");
    }
  
    /**
     * Clicks on the Category dropdown to open it
     */
    async clickOnCategoryDropdown() {
      console.log("\n[DocumentLibrary] Clicking on Category dropdown");
      await this.clickReactSelectDropdownAndWaitForOptions("Select category(ies)");
      console.log("✓ Category dropdown opened");
    }
  
    /**
     * Clicks on the Document Type dropdown to open it
     */
    async clickOnDocumentTypeDropdown() {
      console.log("\n[DocumentLibrary] Clicking on Document Type dropdown");
      await this.clickReactSelectDropdownAndWaitForOptions("Select document type(s)");
      console.log("✓ Document Type dropdown opened");
    }
  
    /**
     * Generic method to click on any dropdown by placeholder/label text
     * Uses wait for options to handle async loading
     * @param {string} dropdownText - The placeholder text of the dropdown
     */
    async clickOnDropdown(dropdownText) {
      await this.clickReactSelectDropdownAndWaitForOptions(dropdownText);
    }
  
    /**
     * Selects an option from the currently open React-Select dropdown
     * @param {string} optionText - The text of the option to select
     */
    async selectDropdownOption(optionText) {
      console.log(`\n[DocumentLibrary] Selecting option: "${optionText}"`);
      
      // Wait for React-Select menu to be visible and have options
      try {
        await this.page.waitForSelector('.react-select__menu', { state: 'visible', timeout: 10000 });
      } catch (e) {
        console.log("[DocumentLibrary] Menu not visible, dropdown may need to be clicked again");
      }
      
      // Wait for actual options to appear (not "No options")
      let optionLoaded = false;
      for (let i = 0; i < 10; i++) {
        const options = this.page.locator('.react-select__option');
        const optionCount = await options.count();
        
        if (optionCount > 0) {
          optionLoaded = true;
          console.log(`[DocumentLibrary] Found ${optionCount} options in dropdown`);
          break;
        }
        
        // Check for "No options" message
        const noOptions = this.page.locator('.react-select__menu-notice--no-options');
        if (await noOptions.count() > 0) {
          console.log("[DocumentLibrary] 'No options' displayed, waiting for data to load...");
        }
        
        await this.actions.addSleep(0.5);
      }
      
      if (!optionLoaded) {
        throw new Error(`Options did not load in dropdown. Cannot select "${optionText}"`);
      }
      
      // React-Select options are typically in .react-select__option
      let option = this.page.locator(`.react-select__option:has-text("${optionText}")`).first();
      let optionExists = await option.count() > 0;
      
      if (!optionExists) {
        // Try alternative: div with role="option"
        option = this.page.locator(`div[role="option"]:has-text("${optionText}")`).first();
        optionExists = await option.count() > 0;
      }
      
      if (!optionExists) {
        // Try finding in the menu list
        option = this.page.locator(`.react-select__menu-list`).getByText(optionText, { exact: false }).first();
        optionExists = await option.count() > 0;
      }
  
      if (!optionExists) {
        // Last resort: any element with the text in the menu
        option = this.page.locator(`.react-select__menu`).getByText(optionText).first();
      }
      
      await option.click();
      await this.actions.addSleep(1);
      console.log(`✓ Selected option: "${optionText}"`);
    }
  
    /**
     * Selects a brand from the brand dropdown
     * @param {string} brandName - The brand name to select
     */
    async selectBrand(brandName) {
      await this.clickOnBrandDropdown();
      await this.selectDropdownOption(brandName);
    }
  
    /**
     * Selects a category from the category dropdown
     * @param {string} categoryName - The category name to select
     */
    async selectCategory(categoryName) {
      await this.clickOnCategoryDropdown();
      await this.selectDropdownOption(categoryName);
    }
  
    /**
     * Selects a document type from the document type dropdown
     * @param {string} documentType - The document type to select
     */
    async selectDocumentType(documentType) {
      await this.clickOnDocumentTypeDropdown();
      await this.selectDropdownOption(documentType);
    }
  
    /**
     * Generic method to select from any dropdown
     * @param {string} dropdownText - The placeholder text of the dropdown
     * @param {string} optionText - The option to select
     */
    async selectFromDropdown(dropdownText, optionText) {
      await this.clickOnDropdown(dropdownText);
      await this.selectDropdownOption(optionText);
    }
  
    // ============================================================================
    // Search Methods
    // ============================================================================
  
    /**
     * Enters text in the search input field
     * @param {string} searchText - The text to search for
     */
    async searchDocuments(searchText) {
      console.log(`\n[DocumentLibrary] Searching for: "${searchText}"`);
      const searchField = this.page.locator(this.searchInput);
      await searchField.fill(searchText);
      await this.actions.addSleep(2); // Wait for search results
      console.log(`✓ Searched for: "${searchText}"`);
    }
  
    /**
     * Clears the search input field
     */
    async clearSearch() {
      console.log("\n[DocumentLibrary] Clearing search field");
      const searchField = this.page.locator(this.searchInput);
      await searchField.clear();
      await this.actions.addSleep(1);
      console.log("✓ Search field cleared");
    }
  
    // ============================================================================
    // Data Table Methods
    // ============================================================================
  
    /**
     * Checks if the data table has any rows
     * @returns {boolean} True if data exists, false otherwise
     */
    async hasData() {
      console.log("\n[DocumentLibrary] Checking if data exists in table");
      
      // Check for table rows (excluding header)
      const tableRows = this.page.locator("table tbody tr");
      const rowCount = await tableRows.count();
      
      const hasData = rowCount > 0;
      console.log(`✓ Data exists: ${hasData} (${rowCount} rows found)`);
      return hasData;
    }
  
    /**
     * Checks if "No data found" message is displayed
     * @returns {boolean} True if no data message is shown
     */
    async isNoDataMessageDisplayed() {
      console.log("\n[DocumentLibrary] Checking for 'No data found' message");
      
      const noDataElement = this.page.locator('text="No data found"');
      const noDataExists = await noDataElement.count() > 0;
      
      if (noDataExists) {
        await noDataElement.waitFor({ state: "visible", timeout: 5000 });
      }
      
      console.log(`✓ No data message displayed: ${noDataExists}`);
      return noDataExists;
    }
  
    /**
     * Gets the count of rows in the data table
     * @returns {number} Number of data rows
     */
    async getDataRowCount() {
      const tableRows = this.page.locator("table tbody tr");
      const count = await tableRows.count();
      console.log(`[DocumentLibrary] Table has ${count} data rows`);
      return count;
    }
  
    /**
     * Verifies that data is displayed in the table
     */
    async verifyDataIsDisplayed() {
      console.log("\n[DocumentLibrary] Verifying data is displayed");
      
      const hasData = await this.hasData();
      
      if (!hasData) {
        throw new Error("Expected data to be displayed, but no data found");
      }
      
      console.log("✓ Data is displayed in the table");
    }
  
    /**
     * Verifies that no data message is displayed
     */
    async verifyNoDataIsDisplayed() {
      console.log("\n[DocumentLibrary] Verifying 'No data found' is displayed");
      
      const noDataShown = await this.isNoDataMessageDisplayed();
      
      if (!noDataShown) {
        // Also check if table is empty
        const hasData = await this.hasData();
        if (hasData) {
          throw new Error("Expected no data, but data is displayed");
        }
      }
      
      console.log("✓ No data message is displayed");
    }
  
    /**
     * Verifies data state - either data exists or no data message shown
     * @returns {object} { hasData: boolean, rowCount: number }
     */
    async verifyDataState() {
      console.log("\n[DocumentLibrary] Verifying data state");
      
      const hasData = await this.hasData();
      const rowCount = await this.getDataRowCount();
      
      if (hasData) {
        console.log(`✓ Data found: ${rowCount} rows`);
      } else {
        const noDataShown = await this.isNoDataMessageDisplayed();
        if (noDataShown) {
          console.log("✓ No data found message displayed");
        } else {
          console.log("✓ Table is empty");
        }
      }
      
      return { hasData, rowCount };
    }
  
    // ============================================================================
    // Table Data Interaction Methods
    // ============================================================================
  
    /**
     * Clicks on a document link by file name
     * @param {string} fileName - The file name to click
     */
    async clickOnDocument(fileName) {
      console.log(`\n[DocumentLibrary] Clicking on document: "${fileName}"`);
      const documentLink = this.page.locator(`a:has-text("${fileName}")`);
      await documentLink.click();
      await this.actions.addSleep(2);
      console.log(`✓ Clicked on document: "${fileName}"`);
    }
  
    /**
     * Gets all document names from the table
     * @returns {string[]} Array of document names
     */
    async getAllDocumentNames() {
      const documentCells = this.page.locator("table tbody tr td:nth-child(2)");
      const count = await documentCells.count();
      
      const names = [];
      for (let i = 0; i < count; i++) {
        const name = await documentCells.nth(i).textContent();
        names.push(name.trim());
      }
      
      console.log(`[DocumentLibrary] Found ${names.length} documents`);
      return names;
    }
  
    /**
     * Gets all file names from the table
     * @returns {string[]} Array of file names
     */
    async getAllFileNames() {
      const fileCells = this.page.locator("table tbody tr td:nth-child(3)");
      const count = await fileCells.count();
      
      const names = [];
      for (let i = 0; i < count; i++) {
        const name = await fileCells.nth(i).textContent();
        names.push(name.trim());
      }
      
      console.log(`[DocumentLibrary] Found ${names.length} files`);
      return names;
    }
  
    // ============================================================================
    // Page Header Verification
    // ============================================================================
  
    /**
     * Verifies the page header text
     * @param {string} expectedHeader - Expected header text
     */
    async verifyPageHeader(expectedHeader) {
      console.log(`\n[DocumentLibrary] Verifying page header: "${expectedHeader}"`);
      
      const header = this.page.locator(`h1:has-text("${expectedHeader}"), h2:has-text("${expectedHeader}"), div:has-text("${expectedHeader}")`).first();
      await header.waitFor({ state: "visible", timeout: 10000 });
      
      console.log(`✓ Page header verified: "${expectedHeader}"`);
    }
  }