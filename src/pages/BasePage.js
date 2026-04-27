// src/pages/basePage.js
import { ActionMethods } from "../utils/helpers/ActionMethods";
export class BasePage {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  // ********** Common Page Validation Methods ****************
  async verifyPageTitle(expectedTitle) {
    await this.actions.assertTitle(expectedTitle);
    console.log(`✓ Page title verified: "${expectedTitle}"`);
  }

  async verifyBreadcrumb(text) {
    // Locate the span inside breadcrumb with exact text match
    const breadcrumbSpan = this.page
      .locator(
        `div[itemtype="https://schema.org/BreadcrumbList"] span[itemprop="name"]`,
      )
      .filter({ hasText: new RegExp(`^${text.trim()}$`) });

    await this.actions.waitForVisible(breadcrumbSpan);
    const count = await breadcrumbSpan.count();
    if (count === 0) {
      throw new Error(`❌ Breadcrumb with text "${text}" not found`);
    }
    console.log(`✓ Breadcrumb with text "${text}" found`);
    return breadcrumbSpan;
  }

  async verifyPageHeader(tagName, text) {
    const header = await this.actions.findElementByTagAndText(tagName, text);
    await this.actions.waitForVisible(header);
    console.log(`✓ Page header <${tagName}> verified: "${text}"`);
  }

  async verifyProductListingPage(title) {
    await this.actions.verifyProductListingPage(title);
  }
  // **********************************************************

  // Common modal validation
  async validateModal(type, message, index) {
    await this.actions.validatePopUpModalWithMessage(type, message);
  }

  async validateModalPartially(type, message) {
    await this.actions.validatePopUpModalWithMessagePartially(type, message);
  }

  // Common Element Button Locaor
  async ClickOnButtonByTagAndText(tagName, text) {
    const button = await this.actions.findElementByTagAndText(tagName, text);
    await this.actions.click(button);
  }

  async ClickOnButtonByTagAndTitle(tagName, title) {
    const button = await this.actions.findElementByTagAndTitle(tagName, title);
    await this.actions.click(button);
  }
}
