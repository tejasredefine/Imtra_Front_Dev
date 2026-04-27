import { expect } from "@playwright/test";
import path from "node:path";

export class ActionMethods {
  constructor(page) {
    this.page = page;
  }

  // *********** Common methods for finding elements ****************

  findElementByTagAndText(tagName, text) {
    const locator = this.page.locator(`${tagName}:has-text("${text}")`);
    return locator.first();
  }

  findElementByTagAndTitle(tagName, title) {
    const locator = this.page.locator(`${tagName}[title="${title}"]`);
    return locator.first();
  }

  async getByRole(role, name, options = {}) {
    return this.page.getByRole(role, { name, exact: true, ...options });
  }

  async getByText(text, options = {}) {
    return this.page.getByText(text, options);
  }

  async getByPlaceholder(placeholder) {
    return this.page.getByPlaceholder(placeholder);
  }

  async getByLabel(label) {
    return this.page.getByLabel(label);
  }

  async findLabelByText(text) {
    return this.page.locator(`label:has-text("${text}")`);
  }

  async getByTestId(testId) {
    return this.page.getByTestId(testId);
  }

  async findInputByName(name) {
    return this.page.locator(`input[name="${name}"]`);
  }

  async findInputById(id) {
    return this.page.locator(`input[id="${id}"]`);
  }

  async findButtonByTitle(title) {
    return this.page.locator(`button[title="${title}"]`);
  }

  async findButtonByName(name) {
    return this.page.locator(`button[name="${name}"]`);
  }

  async findButtonByText(text) {
    return this.page.locator(`button:has-text("${text}")`);
  }

  async findLinkByText(linkText) {
    return this.page.locator(`a:has-text("${linkText}")`);
  }

  async findLinkByTitle(title) {
    return this.page.locator(`a[title="${title}"]`);
  }

  async findImageByAlt(altText) {
    return this.page.locator(`img[alt="${altText}"]`);
  }

  async findSpanByText(text) {
    return this.page.locator(`span:has-text("${text}")`);
  }

  async findDivByText(text) {
    return this.page.locator(`div:has-text("${text}")`);
  }

  async findElementByXpath(xpath) {
    return this.page.locator(`xpath=${xpath}`);
  }

  async findListOfElementByXpath(xpath) {
    return this.page.locator(`xpath=${xpath}`).all();
  }

  // =========== FORM HELPERS ==============
  async click(locator, options = {}) {
    await locator.click(options);
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async isSelected(locator) {
    return await locator.isChecked();
  }

  async selectCheckbox(locator) {
    const isChecked = await this.isSelected(locator);
    if (!isChecked) {
      await locator.check();
    }
  }

  async unselectCheckbox(locator) {
    const isChecked = await this.isSelected(locator);
    if (isChecked) {
      await locator.uncheck();
    }
  }

  async selectOption(locator, value) {
    await locator.selectOption(value);
  }

  async hover(locator) {
    await locator.hover();
  }

  async dblclick(locator) {
    await locator.dblclick();
  }

  async rightClick(locator) {
    await locator.click({ button: "right" });
  }

  async focus(locator) {
    await locator.focus();
  }

  async blur(locator) {
    await locator.blur();
  }

  async clearInput(locator) {
    await locator.clear();
  }

  async type(locator, text, options = {}) {
    await locator.pressSequentially(text, options);
  }

  // =============== KEYBOAERD METHODS ===============
  async press(key) {
    await this.page.keyboard.press(key);
  }

  async keyboard(text) {
    await this.page.keyboard.type(text);
  }

  // ================ SCROLL METHODS =================
  async scrollIntoView(locator) {
    await locator.first().scrollIntoViewIfNeeded();
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
  }

  async scrollTo(x, y) {
    await this.page.evaluate(({ x, y }) => window.scrollTo(x, y), { x, y });
  }

  async jsClick(locator) {
    await locator.evaluate((el) => el.click());
  }

  async setValueByJS(locator, value) {
    await locator.evaluate((el, val) => {
      el.value = val;
    }, value);
  }

  // ============== NAVIGATION METHODS ================
  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async reload() {
    await this.page.reload();
  }

  async refreshPage() {
    await this.page.reload();
  }

  async navigateToUrl(url) {
    await this.page.goto(url);
  }

  async clearUrl() {
    await this.page.goto("about:blank");
  }
  // ============= PAGE DETAILS HELPER ===============
  async getLandingPage(url) {
    await this.retryAction(
      async () => {
        await this.page.goto(url);
      },
      3,
      2,
    );
  }

  async getCurrentTabTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async closeCurrentTab() {
    await this.page.close();
  }

  async switchToNewWindow(context) {
    const newPage = await context.waitForEvent("page");
    await newPage.waitForLoadState();
    return newPage;
  }

  async switchToTabByTitle(context, expectedTitle) {
    const pages = context.pages();
    for (const page of pages) {
      const title = await page.title();
      if (title.includes(expectedTitle)) {
        await page.bringToFront();
        return page;
      }
    }
    throw new Error(
      `Window with title containing '${expectedTitle}' not found.`,
    );
  }

  // ============= File Upload ======================
  async uploadFile(locator, filePath) {
    await locator.setInputFiles(filePath);
  }

  async uploadImage(locator, fileName = "test-image.jpg") {
    const filePath = path.join(process.cwd(), "test-data", "images", fileName);
    await locator.setInputFiles(filePath);
  }

  // ================ Wait and Sleep ================
  async waitForVisible(locator) {
    await locator.waitFor({ state: "visible" });
  }

  async waitForHidden(locator) {
    await locator.waitFor({ state: "hidden" });
  }

  async waitForURL(url) {
    await this.page.waitForURL(url);
  }

  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
  }

  async addSleep(seconds) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  // ============== ASSERTIONS =====================
  async isElementVisible(locator) {
    await expect(locator).toBeVisible();
  }
  async isElementHidden(locator) {
    await expect(locator).toBeHidden();
  }
  async isElementHasText(locator, text) {
    await expect(locator).toHaveText(text);
  }
  async isElementContainsText(locator, text) {
    await expect(locator).toContainText(text);
  }
  async isElementEnabled(locator) {
    await expect(locator).toBeEnabled();
  }
  async isElementDisabled(locator) {
    await expect(locator).toBeDisabled();
  }
  async assertValue(locator, value) {
    await expect(locator).toHaveValue(value);
  }
  async assertURL(url) {
    await expect(this.page).toHaveURL(url);
  }
  async assertTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  // ==================== GET METHODS ====================
  async getText(locator) {
    return await locator.textContent();
  }

  async getValue(locator) {
    return await locator.inputValue();
  }

  async getAttribute(locator, name) {
    return await locator.getAttribute(name);
  }

  async isEnabled(locator) {
    return await locator.isEnabled();
  }

  async isDisabled(locator) {
    return await locator.isDisabled();
  }

  async getelementCount(locator) {
    return await locator.count();
  }

  // *********************** For alerts ******************
  async getAlert() {
    return this.page.waitForEvent("dialog");
  }

  async handleAlert(action = "accept", promptText = "") {
    this.page.once("dialog", async (dialog) => {
      if (action === "accept") {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });
  }

  // ================= SPECIAL METHODS ====================
  async verifyProductListingPage(expectedText) {
    await this.addSleep(3);
    // 1. Verify page title contains the expected text
    const pageTitle = await this.getCurrentTabTitle();
    if (!pageTitle.toLowerCase().includes(expectedText.toLowerCase())) {
      throw new Error(
        `Page title "${pageTitle}" does not contain "${expectedText}"`,
      );
    }
    console.log(`✓ Page title verified: ${pageTitle}`);

    // 2. Verify H1 header
    const h1Element = this.page.locator("h1").first();
    await this.waitForVisible(h1Element);
    const h1Text = await this.getText(h1Element);

    if (!h1Text.toLowerCase().includes(expectedText.toLowerCase())) {
      throw new Error(
        `H1 header "${h1Text}" does not contain "${expectedText}"`,
      );
    }
    console.log(`✓ H1 header verified: ${h1Text}`);

    // 3. Verify breadcrumb
    const breadcrumbContainer = this.page.locator(
      'div[itemtype="https://schema.org/BreadcrumbList"]',
    );
    await this.waitForVisible(breadcrumbContainer);

    const breadcrumbItems = await breadcrumbContainer
      .locator('span[itemprop="name"]')
      .allTextContents();

    const breadcrumbText = breadcrumbItems.join(" > ");

    if (!breadcrumbText.toLowerCase().includes(expectedText.toLowerCase())) {
      throw new Error(
        `Breadcrumb "${breadcrumbText}" does not contain "${expectedText}"`,
      );
    }
    console.log(`✓ Breadcrumb verified: ${breadcrumbText}`);

    console.log(
      `✓ Product listing page verified successfully for: ${expectedText}`,
    );
  }

  async verifyProductDetailsPage(expectedProductName) {
    await this.addSleep(3);
    // 1. Verify H1 header matches product name
    const h1Element = this.page.locator("h1").first();
    await this.waitForVisible(h1Element);
    const h1Text = await this.getText(h1Element);

    if (!h1Text.toLowerCase().includes(expectedProductName.toLowerCase())) {
      throw new Error(
        `H1 header "${h1Text}" does not contain "${expectedProductName}"`,
      );
    }
    console.log(`✓ H1 header verified: ${h1Text}`);

    // 2. Verify breadcrumb contains product name
    const breadcrumbContainer = this.page.locator(
      'div[itemtype="https://schema.org/BreadcrumbList"]',
    );
    await this.waitForVisible(breadcrumbContainer);

    const breadcrumbItems = await breadcrumbContainer
      .locator('span[itemprop="name"]')
      .allTextContents();

    const breadcrumbText = breadcrumbItems.join(" > ");

    if (
      !breadcrumbText.toLowerCase().includes(expectedProductName.toLowerCase())
    ) {
      throw new Error(
        `Breadcrumb "${breadcrumbText}" does not contain "${expectedProductName}"`,
      );
    }
    console.log(`✓ Breadcrumb verified: ${breadcrumbText}`);

    console.log(
      `✓ Product details page verified successfully for: ${expectedProductName}`,
    );
  }

  async validatePopUpModalWithMessage(type, message, index = 0) {
    // Wait for modal to appear
    const modal = this.page
      .locator(
        "div.relative.max-h-screen.overflow-y-auto.rounded-lg.bg-white.shadow",
      )
      .nth(index);
    await this.waitForVisible(modal);

    // 1. Verify modal type (Success, Error, Warning, Info, etc.)
    const modalHeader = modal.locator(
      "div.text-center.text-lg.font-semibold.uppercase",
    );
    await this.waitForVisible(modalHeader);
    const headerText = await this.getText(modalHeader);

    if (!headerText.toLowerCase().includes(type.toLowerCase())) {
      throw new Error(
        `Modal type mismatch. Expected to contain: "${type}", Found: "${headerText}"`,
      );
    }
    console.log(`✓ Modal type verified: ${headerText}`);

    // 2. Verify modal message
    let modalMessage = "";
    if ((await modal.locator("div.p-4").count()) > 0) {
      modalMessage = modal.locator("div.p-4 div.mb-4.text-center");
    } else {
      modalMessage = modal.locator("div.p-6 div.mb-4.text-center");
    }
    await this.waitForVisible(modalMessage);
    const messageText = await this.getText(modalMessage);

    if (!messageText.toLowerCase().includes(message.toLowerCase())) {
      throw new Error(
        `Modal message mismatch. Expected to contain: "${message}", Found: "${messageText}"`,
      );
    }
    console.log(`✓ Modal message verified: ${messageText}`);

    console.log(
      `✓ Pop-up modal validated successfully - Type: ${type}, Message: ${message}`,
    );
  }
  // ************** verify bredcrum methods ************************

  async verifyBreadcrumb(text) {
    const breadcrumbSpan = this.page
      .locator(
        `div[itemtype="https://schema.org/BreadcrumbList"] span[itemprop="name"]`,
      )
      .filter({ hasText: new RegExp(`^${text.trim()}$`) });
    await this.waitForVisible(breadcrumbSpan);
    const count = await breadcrumbSpan.count();
    if (count === 0) {
      throw new Error(`❌ Breadcrumb with text "${text}" not found`);
    }
  }

  async validatePopUpModalWithMessagePartially(type, message) {
    const modal = this.page.locator(
      "div.relative.max-h-screen.overflow-y-auto.rounded-lg.bg-white.shadow",
    );
    await this.waitForVisible(modal);

    // 1. Verify modal type (Success, Error, Warning, Info, etc.)
    const modalHeader = modal.locator(
      "div.text-center.text-lg.font-semibold.uppercase",
    );
    await this.waitForVisible(modalHeader);
    const headerText = await this.getText(modalHeader);

    if (headerText.toLowerCase() !== type.toLowerCase()) {
      throw new Error(
        `Modal type mismatch. Expected: "${type}", Found: "${headerText}"`,
      );
    }
    console.log(`✓ Modal type verified: ${headerText}`);

    // 2. Verify modal message
    let modalMessage = "";
    if ((await modal.locator("div.p-4").count()) > 0) {
      modalMessage = modal.locator("div.p-4 div.mb-4.text-center");
    } else {
      modalMessage = modal.locator("div.p-6 div.mb-4.text-center");
    }
    await this.waitForVisible(modalMessage);
    const messageText = await this.getText(modalMessage);

    if (!messageText.toLowerCase().includes(message.toLowerCase())) {
      throw new Error(
        `Modal message mismatch. Expected to contain: "${message}", Found: "${messageText}"`,
      );
    }
    console.log(`✓ Modal message verified: ${messageText}`);

    console.log(
      `✓ Pop-up modal validated successfully - Type: ${type}, Message: ${message}`,
    );
  }

  // ************** verify bredcrum methods ************************

  async verifyBreadcrumb(text) {
    const breadcrumbSpan = this.page
      .locator(
        `div[itemtype="https://schema.org/BreadcrumbList"] span[itemprop="name"]`,
      )
      .filter({ hasText: new RegExp(`^${text.trim()}$`) });
    await this.waitForVisible(breadcrumbSpan);
    const count = await breadcrumbSpan.count();
    if (count === 0) {
      throw new Error(`❌ Breadcrumb with text "${text}" not found`);
    }
  }

  // for click search bar button
  async clickSearchBarButton(locator) {
    await locator.click();
  }
}
