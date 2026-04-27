import { BasePage } from "./BasePage";
import { Navbar } from "../components/Navbar";

export class DealerLocatorPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.navbar = new Navbar(page, actions);
  }

  // ============================================================================
  // Navigation - Using existing Navbar pattern
  // ============================================================================

  /**
   * Navigates to Dealer Locator via Customer Care dropdown
   * Reuses the existing navbar hover pattern
   */
  async navigateToDealerLocator() {
    console.log("\n[DealerLocatorPage] Navigating to Dealer Locator...");

    // Using existing navbar pattern - hover on Customer Care
    const customerCareLink = await findElementByXpath(`(//a[@title='Customer Care'])[1]`);
    await hover(customerCareLink);
    await addSleep(1);

    // Click on "LOCATE A DEALER" - use first() to get only the first matching element
    const locateDealerLink = await findElementByXpath(
      `(//a[@title='Locate A Dealer'])[1]`
    );
    await click(locateDealerLink);
    await addSleep(2);

    // Verify page
    await this.verifyPageTitle("Locate a Dealer");
    console.log("✓ Navigated to Dealer Locator page");
  }

  /**
   * Waits for the page to fully load
   */
  async waitForPageToLoad() {
    await this.page.waitForSelector('text="Find a dealer"', { state: 'visible', timeout: 15000 });
    await this.page.waitForSelector('text="Brands"', { state: 'visible', timeout: 10000 });
    await this.actions.addSleep(2);
    console.log("✓ Dealer Locator page loaded");
  }

  // ============================================================================
  // Checkbox Methods
  // ============================================================================

  /**
   * Clicks on a checkbox by its label text
   * @param {string} labelText - The label text of the checkbox
   */
  async clickCheckbox(labelText) {
    console.log(`[DealerLocatorPage] Clicking checkbox: "${labelText}"`);
    
    const checkbox = this.page.locator(`label:has-text("${labelText}")`).first();
    await checkbox.click();
    await this.actions.addSleep(1);
    
    console.log(`✓ Clicked checkbox: "${labelText}"`);
  }

  /**
   * Clicks on multiple checkboxes
   * @param {string[]} labels - Array of checkbox labels
   */
  async clickMultipleCheckboxes(labels) {
    for (const label of labels) {
      await this.clickCheckbox(label);
    }
  }

  // ============================================================================
  // Input Field Methods
  // ============================================================================

  /**
   * Enters location in the search field and verifies it
   * @param {string} location - Location to search
   */
  async enterLocation(location) {
    console.log(`[DealerLocatorPage] Entering location: "${location}"`);
    
    const locationInput = this.page.locator('input[placeholder*="Where are you"]');
    await locationInput.clear();
    await locationInput.fill(location);
    
    // Press Enter to search
    await locationInput.press('Enter');
    await this.actions.addSleep(2);
    
    // Verify "Showing results near: <location>" text appears
    await this.verifyShowingResultsNear(location);
    
    console.log(`✓ Entered location: "${location}"`);
  }

  /**
   * Verifies "Showing results near: <location>" text
   * @param {string} location - Expected location in the text
   */
  async verifyShowingResultsNear(location) {
    console.log(`[DealerLocatorPage] Verifying "Showing results near: ${location}"...`);
    
    // Wait for the "Showing results near" text to appear
    const showingResultsText = this.page.locator(`text=/Showing results near:/i`);
    await showingResultsText.waitFor({ state: 'visible', timeout: 10000 });
    
    // Get the actual text
    const actualText = await showingResultsText.textContent();
    
    // Verify it contains the location (case-insensitive)
    if (!actualText.toLowerCase().includes(location.toLowerCase())) {
      throw new Error(
        `Location mismatch!\nExpected: "Showing results near: ${location}"\nActual: "${actualText}"`
      );
    }
    
    console.log(`✓ Verified: "${actualText}"`);
  }

  /**
   * Searches dealer by name/keyword
   * @param {string} searchText - Text to search
   */
  async searchDealer(searchText) {
    console.log(`[DealerLocatorPage] Searching dealer: "${searchText}"`);
    
    const searchInput = this.page.locator('input[placeholder*="Search by name or keyword"]');
    await searchInput.clear();
    await searchInput.fill(searchText);
    await this.actions.addSleep(2);
    
    console.log(`✓ Searched dealer: "${searchText}"`);
  }

  // ============================================================================
  // Result Verification Methods
  // ============================================================================

  /**
   * Checks if dealers are found or "No dealers" message is shown
   * Throws error if neither condition is met
   * @returns {object} { hasDealers, message }
   */
  async verifyResultState() {
    console.log("[DealerLocatorPage] Verifying result state...");
    await this.actions.addSleep(2);

    // Check for dealer count "Showing X of Y dealer" or "Showing X of Y dealers" (singular/plural)
    const dealerCount = this.page.locator('text=/Showing \\d+ of \\d+ dealers?/');
    const hasCount = await dealerCount.count() > 0;

    if (hasCount) {
      const text = await dealerCount.textContent();
      console.log(`✓ Dealers found: ${text}`);
      return { hasDealers: true, message: text };
    }

    // Check for "No dealers found" message
    const noDealer = this.page.locator('text="No dealers found. Try adjusting your location or filters."');
    const hasNoDealer = await noDealer.count() > 0;

    if (hasNoDealer) {
      console.log("✓ No dealers found message displayed");
      return { hasDealers: false, message: "No dealers found" };
    }

    // If neither condition is met, throw an error - test should fail
    throw new Error(
      "Verification failed: Neither dealer results nor 'No dealers found' message was displayed"
    );
  }

  /**
   * Verifies that dealers ARE found (asserts hasDealers = true)
   */
  async verifyDealersFound() {
    console.log("[DealerLocatorPage] Verifying dealers are found...");
    await this.actions.addSleep(2);

    // Handle both "dealer" and "dealers"
    const dealerCount = this.page.locator('text=/Showing \\d+ of \\d+ dealers?/');
    await dealerCount.waitFor({ state: 'visible', timeout: 10000 });

    const text = await dealerCount.textContent();
    console.log(`✓ Dealers found: ${text}`);
    return { hasDealers: true, message: text };
  }

  /**
   * Verifies that NO dealers are found (asserts "No dealers" message)
   */
  async verifyNoDealersFound() {
    console.log("[DealerLocatorPage] Verifying no dealers found...");
    await this.actions.addSleep(2);

    const noDealer = this.page.locator('text="No dealers found. Try adjusting your location or filters."');
    await noDealer.waitFor({ state: 'visible', timeout: 10000 });

    console.log("✓ No dealers found message displayed");
    return { hasDealers: false, message: "No dealers found" };
  }

  // ============================================================================
  // Combined Test Methods
  // ============================================================================

  /**
   * Selects checkbox and verifies result
   * @param {string} labelText - Checkbox label
   */
  async selectCheckboxAndVerify(labelText) {
    await this.clickCheckbox(labelText);
    return await this.verifyResultState();
  }

  /**
   * Tests each checkbox one by one (select, verify, deselect)
   * @param {string[]} checkboxLabels - Array of checkbox labels
   */
  async testEachCheckbox(checkboxLabels) {
    const results = [];

    for (const label of checkboxLabels) {
      console.log(`\n--- Testing: ${label} ---`);
      
      await this.clickCheckbox(label);
      const result = await this.verifyResultState();
      results.push({ label, ...result });
      
      // Deselect for next test
      await this.clickCheckbox(label);
      await this.actions.addSleep(1);
    }

    return results;
  }

  /**
   * Applies filters and verifies result
   * @param {object} filters - { location, brands[], categories[] }
   */
  async applyFiltersAndVerify(filters = {}) {
    if (filters.location) {
      await this.enterLocation(filters.location);
    }

    if (filters.brands) {
      await this.clickMultipleCheckboxes(filters.brands);
    }

    if (filters.categories) {
      await this.clickMultipleCheckboxes(filters.categories);
    }

    return await this.verifyResultState();
  }
}