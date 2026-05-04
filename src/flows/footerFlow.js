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

  async VerifyAboutImtraFooterLink() {
    await this.footerPage.clickOnAboutImtraAndVerify();
  }

  async VerifyLearningCenterFooterLink() {
    await this.footerPage.clickOnLearningCenterAndVerify();
  }

  async VerifyCareersFooterLink() {
    await this.footerPage.clickOnCareersAndVerify();
  }

  async VerifyPartnersFooterLink() {
    await this.footerPage.clickOnPartnersAndVerify();
  }

  async VerifyContactFooterLink() {
    await this.footerPage.clickOnContactAndVerify();
  }

  async VerifyDocumentLibraryFooterLink() {
    await this.footerPage.clickOnDocumentLibraryAndVerify();
  }

  async VerifyAllQuickLinks() {
    await this.footerPage.clickOnAllQuickLinksAndVerify();
  }

  // ============================================================================
  // Dealer & Company Info Section Tests
  // ============================================================================

  async VerifyDealerLoginFooterLink() {
    await this.footerPage.clickOnDealerLoginAndVerify();
  }

  async VerifyFindADealerFooterLink() {
    await this.footerPage.clickOnFindADealerAndVerify();
  }

  async VerifyTermsAndConditionsFooterLink() {
    await this.footerPage.clickOnTermsAndConditionsAndVerify();
  }

  async VerifyPrivacyPolicyFooterLink() {
    await this.footerPage.clickOnPrivacyPolicyAndVerify();
  }

  async VerifyAllDealerCompanyInfoLinks() {
    await this.footerPage.clickOnAllDealerCompanyInfoLinksAndVerify();
  }

  // ============================================================================
  // Newsletter Subscription Tests
  // ============================================================================

  async VerifyNewsletterSubscription(email) {
    await this.footerPage.subscribeToNewsletterWithEmail(email);
    console.log("✓ Newsletter subscription tested");
  }

  // ============================================================================
  // Social Media Links Tests
  // ============================================================================

  async VerifySocialMediaLink(platform) {
    await this.footerPage.clickOnSocialMediaAndVerifyNewTab(platform);
  }

  // ============================================================================
  // Footer Visibility Tests
  // ============================================================================

  async VerifyAllFooterLinksAreVisible() {
    await this.footerPage.verifyAllFooterLinksAreVisible();
  }

  // ============================================================================
  // Complete Footer Verification
  // ============================================================================

  async VerifyAllFooterLinks() {
    console.log("\n[FooterFlow] Starting comprehensive footer verification");
    await this.VerifyAllQuickLinks();
    await this.VerifyAllDealerCompanyInfoLinks();
    console.log("✓ All footer links verified successfully\n");
  }

  // ============================================================================
  // Generic Footer Link Test
  // ============================================================================

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

  async NavigateToDocumentLibrary() {
    await this.footerPage.clickOnDocumentLibraryAndVerify();
    await this.documentLibraryPage.verifyOnDocumentLibraryPage();
  }

  async VerifyDocumentLibraryDropdownSelection(dropdownText, optionText) {
    await this.NavigateToDocumentLibrary();
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

  async VerifyDocumentLibraryBrandSelection(brandName) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.selectBrandAndVerifyData(brandName);
  }

  async VerifyDocumentLibraryCategorySelection(categoryName) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.selectCategoryAndVerifyData(categoryName);
  }

  async VerifyDocumentLibraryDocumentTypeSelection(documentType) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.selectDocumentTypeAndVerifyData(documentType);
  }

  async VerifyDocumentLibraryWithFilters(filters) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.applyFiltersAndVerifyData(filters);
  }

  async VerifyDocumentLibrarySearch(searchText) {
    await this.NavigateToDocumentLibrary();
    return await this.documentLibraryPage.searchAndVerifyData(searchText);
  }
}
