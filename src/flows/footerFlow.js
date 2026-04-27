import { FooterPage } from "../pages/FooterPage";
import { DocumentLibraryPage } from "../pages/DocumentLibraryPage";
import { BasePage } from "../pages/BasePage";

export class FooterFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.footerPage = new FooterPage(page, actions);
    this.documentLibraryPage = new DocumentLibraryPage(page, actions);
  }

  // ============================================================================
  // Quick Links Section Tests
  // ============================================================================

  /**
   * Verify About IMTRA link in footer
   */
  async VerifyAboutImtraFooterLink() {
    await this.footerPage.clickOnAboutImtraAndVerify();
  }

  /**
   * Verify Learning Center link in footer
   */
  async VerifyLearningCenterFooterLink() {
    await this.footerPage.clickOnLearningCenterAndVerify();
  }

  /**
   * Verify Careers link in footer
   */
  async VerifyCareersFooterLink() {
    await this.footerPage.clickOnCareersAndVerify();
  }

  /**
   * Verify Partners link in footer
   */
  async VerifyPartnersFooterLink() {
    await this.footerPage.clickOnPartnersAndVerify();
  }

  /**
   * Verify Contact link in footer
   */
  async VerifyContactFooterLink() {
    await this.footerPage.clickOnContactAndVerify();
  }

  /**
   * Verify Document Library link in footer
   */
  async VerifyDocumentLibraryFooterLink() {
    await this.footerPage.clickOnDocumentLibraryAndVerify();
  }

  /**
   * Verify all Quick Links in footer (with navigation back)
   */
  async VerifyAllQuickLinks() {
    await this.footerPage.clickOnAllQuickLinksAndVerify();
  }

  // ============================================================================
  // Dealer & Company Info Section Tests
  // ============================================================================

  /**
   * Verify Dealer Login link in footer
   */
  async VerifyDealerLoginFooterLink() {
    await this.footerPage.clickOnDealerLoginAndVerify();
  }

  /**
   * Verify Find a Dealer link in footer
   */
  async VerifyFindADealerFooterLink() {
    await this.footerPage.clickOnFindADealerAndVerify();
  }

  /**
   * Verify Terms & Conditions link in footer
   */
  async VerifyTermsAndConditionsFooterLink() {
    await this.footerPage.clickOnTermsAndConditionsAndVerify();
  }

  /**
   * Verify Privacy Policy link in footer
   */
  async VerifyPrivacyPolicyFooterLink() {
    await this.footerPage.clickOnPrivacyPolicyAndVerify();
  }

  /**
   * Verify all Dealer & Company Info links in footer (with navigation back)
   */
  async VerifyAllDealerCompanyInfoLinks() {
    await this.footerPage.clickOnAllDealerCompanyInfoLinksAndVerify();
  }

  // ============================================================================
  // Newsletter Subscription Tests
  // ============================================================================

  /**
   * Test newsletter subscription
   * @param {string} email - Email to subscribe with
   */
  async VerifyNewsletterSubscription(email) {
    await this.footerPage.subscribeToNewsletterWithEmail(email);
    console.log("✓ Newsletter subscription tested");
  }

  // ============================================================================
  // Social Media Links Tests
  // ============================================================================

  /**
   * Verify social media icon click opens correct URL
   * @param {string} platform - Social media platform name
   */
  async VerifySocialMediaLink(platform) {
    await this.footerPage.clickOnSocialMediaAndVerifyNewTab(platform);
  }

  // ============================================================================
  // Footer Visibility Tests
  // ============================================================================

  /**
   * Verify all footer links are visible on the page
   */
  async VerifyAllFooterLinksAreVisible() {
    await this.footerPage.verifyAllFooterLinksAreVisible();
  }

  // ============================================================================
  // Complete Footer Verification
  // ============================================================================

  /**
   * Verify all footer links (comprehensive test)
   */
  async VerifyAllFooterLinks() {
    console.log("\n[FooterFlow] Starting comprehensive footer verification");

    // Verify all Quick Links
    await this.VerifyAllQuickLinks();

    // Verify all Dealer & Company Info links
    await this.VerifyAllDealerCompanyInfoLinks();

    console.log("✓ All footer links verified successfully\n");
  }

  // ============================================================================
  // Generic Test Method
  // ============================================================================

  /**
   * Generic method to test any footer link
   * @param {string} linkText - The text of the link to click
   * @param {string} expectedPageTitle - Expected page title
   * @param {string} expectedHeader - Optional expected header
   */
  async VerifyFooterLinkByText(linkText, expectedPageTitle, expectedHeader = null) {
    if (expectedHeader) {
      await this.footerPage.clickOnFooterLinkAndVerifyPageTitleAndHeader(
        linkText,
        expectedPageTitle,
        expectedHeader
      );
    } else {
      await this.footerPage.clickOnFooterLinkAndVerifyPageTitle(linkText, expectedPageTitle);
    }
  }



  // ============================================================================
  // Document Library Extended Tests
  // ============================================================================
 
  /**
   * Navigate to Document Library and verify page
   */
  async NavigateToDocumentLibrary() {
    await this.footerPage.clickOnDocumentLibraryAndVerify();
    await this.documentLibraryPage.verifyOnDocumentLibraryPage();
  }
 
  /**
   * Document Library - Select dropdown and verify data state
   * Generic method that works for any dropdown
   * @param {string} dropdownText - The dropdown placeholder text (e.g., "Select brand(s)")
   * @param {string} optionText - The option to select
   */
  async VerifyDocumentLibraryDropdownSelection(dropdownText, optionText) {
    // First navigate to Document Library
    await this.NavigateToDocumentLibrary();
 
    // Select from dropdown and get data state
    const result = await this.documentLibraryPage.selectFromDropdownAndVerifyData(
      dropdownText,
      optionText
    );
 
    if (result.hasData) {
      console.log(`✓ Data found after selecting "${optionText}": ${result.rowCount} rows`);
    } else {
      console.log(`✓ No data found after selecting "${optionText}"`);
    }
 
    return result;
  }
 
  /**
   * Document Library - Select brand and verify data
   * @param {string} brandName - Brand to select
   */
  async VerifyDocumentLibraryBrandSelection(brandName) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.selectBrandAndVerifyData(brandName);
  }
 
  /**
   * Document Library - Select category and verify data
   * @param {string} categoryName - Category to select
   */
  async VerifyDocumentLibraryCategorySelection(categoryName) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.selectCategoryAndVerifyData(categoryName);
  }
 
  /**
   * Document Library - Select document type and verify data
   * @param {string} documentType - Document type to select
   */
  async VerifyDocumentLibraryDocumentTypeSelection(documentType) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.selectDocumentTypeAndVerifyData(documentType);
  }
 
  /**
   * Document Library - Apply multiple filters and verify data
   * @param {object} filters - { brand, category, documentType }
   */
  async VerifyDocumentLibraryWithFilters(filters) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.applyFiltersAndVerifyData(filters);
  }
 
  /**
   * Document Library - Search and verify data
   * @param {string} searchText - Text to search
   */
  async VerifyDocumentLibrarySearch(searchText) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.searchAndVerifyData(searchText);
  }

}