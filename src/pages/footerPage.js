import { Footer } from "../components/Footer";
import { BasePage } from "./BasePage";
import FooterLinksData from "../utils/data/footerData";

export class FooterPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.footer = new Footer(page, actions);
    this.footerData = FooterLinksData;
  }

  // ============================================================================
  // Quick Links Section Methods
  // ============================================================================

  /**
   * Click on About IMTRA link and verify redirection
   */
  async clickOnAboutImtraAndVerify() {
    const linkData = this.footerData.quickLinks.find(
      (link) => link.linkText === "About IMTRA"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Learning Center link and verify redirection
   */
  async clickOnLearningCenterAndVerify() {
    const linkData = this.footerData.quickLinks.find(
      (link) => link.linkText === "Learning Center"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Careers link and verify redirection
   */
  async clickOnCareersAndVerify() {
    const linkData = this.footerData.quickLinks.find(
      (link) => link.linkText === "Careers"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Partners link and verify redirection
   */
  async clickOnPartnersAndVerify() {
    const linkData = this.footerData.quickLinks.find(
      (link) => link.linkText === "Partners"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Contact link and verify redirection
   */
  async clickOnContactAndVerify() {
    const linkData = this.footerData.quickLinks.find(
      (link) => link.linkText === "Contact"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Document Library link and verify redirection
   */
  async clickOnDocumentLibraryAndVerify() {
    const linkData = this.footerData.quickLinks.find(
      (link) => link.linkText === "Document Library"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
    await this.verifyPageHeader("div", linkData.expectedHeader);
  }

  /**
   * Click on all Quick Links one by one and verify each redirection
   */
  async clickOnAllQuickLinksAndVerify() {
    for (const linkData of this.footerData.quickLinks) {
      await this.footer.clickOnFooterLink(linkData.linkText);
      await this.verifyPageTitle(linkData.expectedPageTitle);
      await this.actions.goBack();
    }
    console.log("✓ All Quick Links clicked and verified");
  }

  // ============================================================================
  // Dealer & Company Info Section Methods
  // ============================================================================

  /**
   * Click on Dealer Login link and verify redirection
   */
  async clickOnDealerLoginAndVerify() {
    const linkData = this.footerData.dealerCompanyInfo.find(
      (link) => link.linkText === "Dealer Login"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Find a Dealer link and verify redirection
   */
  async clickOnFindADealerAndVerify() {
    const linkData = this.footerData.dealerCompanyInfo.find(
      (link) => link.linkText === "Find a Dealer"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Terms & Conditions link and verify redirection
   */
  async clickOnTermsAndConditionsAndVerify() {
    const linkData = this.footerData.dealerCompanyInfo.find(
      (link) => link.linkText === "Terms & Conditions"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on Privacy Policy link and verify redirection
   */
  async clickOnPrivacyPolicyAndVerify() {
    const linkData = this.footerData.dealerCompanyInfo.find(
      (link) => link.linkText === "Privacy Policy"
    );
    await this.footer.clickOnFooterLink(linkData.linkText);
    await this.verifyPageTitle(linkData.expectedPageTitle);
  }

  /**
   * Click on all Dealer & Company Info links one by one and verify each redirection
   */
  async clickOnAllDealerCompanyInfoLinksAndVerify() {
    for (const linkData of this.footerData.dealerCompanyInfo) {
      await this.footer.clickOnFooterLink(linkData.linkText);
      await this.verifyPageTitle(linkData.expectedPageTitle);
      await this.actions.goBack();
    }
    console.log("✓ All Dealer & Company Info links clicked and verified");
  }

  // ============================================================================
  // Generic Methods
  // ============================================================================

  /**
   * Generic method to click any footer link by text and verify page title
   * @param {string} linkText - The visible text of the link
   * @param {string} expectedPageTitle - Expected page title after click
   */
  async clickOnFooterLinkAndVerifyPageTitle(linkText, expectedPageTitle) {
    await this.footer.clickOnFooterLink(linkText);
    await this.verifyPageTitle(expectedPageTitle);
  }

  /**
   * Generic method to click any footer link by text, verify page title and header
   * @param {string} linkText - The visible text of the link
   * @param {string} expectedPageTitle - Expected page title after click
   * @param {string} expectedHeader - Expected header text on the page
   */
  async clickOnFooterLinkAndVerifyPageTitleAndHeader(linkText, expectedPageTitle, expectedHeader) {
    await this.footer.clickOnFooterLink(linkText);
    await this.verifyPageTitle(expectedPageTitle);
    await this.verifyPageHeader("div", expectedHeader);
  }

  // ============================================================================
  // Newsletter Subscription Methods
  // ============================================================================

  /**
   * Subscribe to newsletter with email
   * @param {string} email - Email address to subscribe
   */
  async subscribeToNewsletterWithEmail(email) {
    await this.footer.subscribeToNewsletter(email);
  }

  // ============================================================================
  // Social Media Methods
  // ============================================================================

  /**
   * Click on social media icon and verify new tab opens
   * @param {string} platform - Social media platform name
   */
  async clickOnSocialMediaAndVerifyNewTab(platform) {
    const socialData = this.footerData.socialMedia.find(
      (social) => social.platform === platform.toLowerCase()
    );

    if (!socialData) {
      throw new Error(`Unknown social media platform: ${platform}`);
    }

    const context = this.page.context();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      this.footer.clickOnSocialMediaIcon(platform),
    ]);

    await newPage.waitForLoadState();

    const newPageUrl = newPage.url();
    if (!newPageUrl.includes(socialData.expectedUrl)) {
      throw new Error(
        `Social media URL mismatch:\nExpected URL to contain: "${socialData.expectedUrl}"\nActual URL: "${newPageUrl}"`
      );
    }

    console.log(`✓ ${platform} link verified: ${newPageUrl}`);
    await newPage.close();
  }

  // ============================================================================
  // Footer Visibility Verification Methods
  // ============================================================================

  /**
   * Verify all footer links are visible
   */
  async verifyAllFooterLinksAreVisible() {
    // Verify Quick Links
    for (const linkData of this.footerData.quickLinks) {
      await this.footer.verifyFooterLinkIsVisible(linkData.linkText);
    }

    // Verify Dealer & Company Info links
    for (const linkData of this.footerData.dealerCompanyInfo) {
      await this.footer.verifyFooterLinkIsVisible(linkData.linkText);
    }

    console.log("✓ All footer links are visible");
  }
}