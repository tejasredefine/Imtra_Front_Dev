export class Footer {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  /**
   * Scrolls to the footer section of the page
   * Uses multiple scroll attempts to ensure footer is reached
   */
  async scrollToFooter() {
    console.log("\n[Footer] Scrolling to footer section");
    
    // First, try to locate the footer element
    const footer = this.page.locator("footer");
    
    // Check if footer exists
    const footerExists = await footer.count() > 0;
    
    if (footerExists) {
      // Scroll the footer into view
      await footer.scrollIntoViewIfNeeded();
      await this.actions.addSleep(1);
      console.log("✓ Scrolled to footer using scrollIntoViewIfNeeded");
    } else {
      // Fallback: scroll to absolute bottom multiple times
      await this.scrollToAbsoluteBottom();
    }
    
    // Additional wait for any lazy-loaded content
    await this.actions.addSleep(1);
  }

  /**
   * Scrolls to footer by finding specific footer text/element
   */
  async scrollToFooterByText() {
    console.log("\n[Footer] Scrolling to footer by locating footer content");
    
    // Try to find a known footer element (like "Quick Links" heading or copyright text)
    const footerIndicators = [
      this.page.locator('text="Quick Links"'),
      this.page.locator('text="Subscribe to our newsletter"'),
      this.page.locator('text="Copyright"'),
      this.page.locator('footer'),
    ];
    
    for (const indicator of footerIndicators) {
      const exists = await indicator.count() > 0;
      if (exists) {
        await indicator.first().scrollIntoViewIfNeeded();
        await this.actions.addSleep(1);
        console.log("✓ Scrolled to footer element");
        return;
      }
    }
    
    // Final fallback - aggressive scroll
    await this.scrollToAbsoluteBottom();
  }

  /**
   * Aggressively scrolls to the absolute bottom of the page
   */
  async scrollToAbsoluteBottom() {
    console.log("\n[Footer] Scrolling to absolute bottom");
    
    let previousHeight = 0;
    let currentHeight = await this.page.evaluate(() => document.body.scrollHeight);
    
    // Keep scrolling until we can't scroll anymore (handles lazy loading)
    while (previousHeight !== currentHeight) {
      previousHeight = currentHeight;
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await this.actions.addSleep(1);
      currentHeight = await this.page.evaluate(() => document.body.scrollHeight);
    }
    
    console.log("✓ Reached absolute bottom of page");
  }

  /**
   * Clicks on a footer link by its text
   * @param {string} linkText - The visible text of the link to click
   */
  async clickOnFooterLink(linkText) {
    console.log(`\n[Footer] Clicking on footer link: "${linkText}"`);
    
    // Scroll to footer first to ensure links are visible
    await this.scrollToFooterByText();
    
    // Find the footer link by text - try multiple selectors
    let footerLink = this.page.locator(`footer a:has-text("${linkText}")`);
    
    // Check if found in footer tag
    let linkCount = await footerLink.count();
    
    if (linkCount === 0) {
      // Try finding by exact text match anywhere in lower part of page
      footerLink = this.page.locator(`a:has-text("${linkText}")`).last();
    }

    // Wait for the link to be visible
    await footerLink.waitFor({ state: "visible", timeout: 10000 });
    
    // Click the link
    await footerLink.click();
    
    console.log(`✓ Clicked on footer link: "${linkText}"`);
    
    // Wait for navigation to complete
    await this.actions.addSleep(2);
  }

  /**
   * Clicks on a Quick Links section link
   * @param {string} linkText - The visible text of the link
   */
  async clickOnQuickLink(linkText) {
    console.log(`\n[Footer] Clicking on Quick Link: "${linkText}"`);
    await this.scrollToFooterByText();
    
    const quickLink = this.page.locator(`a:has-text("${linkText}")`).last();
    
    await quickLink.waitFor({ state: "visible", timeout: 10000 });
    await quickLink.click();
    
    console.log(`✓ Clicked on Quick Link: "${linkText}"`);
    await this.actions.addSleep(2);
  }

  /**
   * Clicks on a Dealer & Company Info section link
   * @param {string} linkText - The visible text of the link
   */
  async clickOnDealerCompanyLink(linkText) {
    console.log(`\n[Footer] Clicking on Dealer & Company Info link: "${linkText}"`);
    await this.scrollToFooterByText();
    
    const dealerLink = this.page.locator(`a:has-text("${linkText}")`).last();
    
    await dealerLink.waitFor({ state: "visible", timeout: 10000 });
    await dealerLink.click();
    
    console.log(`✓ Clicked on Dealer & Company Info link: "${linkText}"`);
    await this.actions.addSleep(2);
  }

  /**
   * Subscribes to newsletter with given email
   * @param {string} email - Email address to subscribe
   */
  async subscribeToNewsletter(email) {
    console.log(`\n[Footer] Subscribing to newsletter with email: "${email}"`);
    await this.scrollToFooterByText();
    
    const emailInput = this.page.locator('input[placeholder*="email" i]').last();
    await emailInput.fill(email);
    
    const subscribeBtn = this.page.locator('button:has-text("SUBSCRIBE")');
    await subscribeBtn.click();
    
    console.log(`✓ Subscribed to newsletter`);
    await this.actions.addSleep(2);
  }

  /**
   * Clicks on a social media icon
   * @param {string} platform - The social media platform (facebook, instagram, youtube, linkedin, whatsapp)
   */
  async clickOnSocialMediaIcon(platform) {
    console.log(`\n[Footer] Clicking on ${platform} social icon`);
    await this.scrollToFooterByText();
    
    const socialIconSelectors = {
      facebook: 'a[href*="facebook"]',
      instagram: 'a[href*="instagram"]',
      youtube: 'a[href*="youtube"]',
      linkedin: 'a[href*="linkedin"]',
      whatsapp: 'a[href*="whatsapp"]',
    };
    
    const iconSelector = socialIconSelectors[platform.toLowerCase()];
    if (!iconSelector) {
      throw new Error(`Unknown social media platform: ${platform}`);
    }
    
    const socialIcon = this.page.locator(iconSelector).last();
    await socialIcon.click();
    
    console.log(`✓ Clicked on ${platform} social icon`);
    await this.actions.addSleep(2);
  }

  /**
   * Verifies that a specific footer link is visible
   * @param {string} linkText - The text of the link to verify
   */
  async verifyFooterLinkIsVisible(linkText) {
    console.log(`\n[Footer] Verifying footer link is visible: "${linkText}"`);
    await this.scrollToFooterByText();
    
    const footerLink = this.page.locator(`a:has-text("${linkText}")`).last();
    
    await footerLink.waitFor({ state: "visible", timeout: 10000 });
    console.log(`✓ Footer link "${linkText}" is visible`);
  }

  /**
   * Gets the contact phone number from footer
   * @returns {string} Phone number text
   */
  async getContactPhone() {
    await this.scrollToFooterByText();
    const phoneElement = this.page.locator('footer').getByText(/\d{3}-\d{3}-\d{4}/);
    const phoneText = await phoneElement.textContent();
    return phoneText.trim();
  }

  /**
   * Gets the contact email from footer
   * @returns {string} Email address
   */
  async getContactEmail() {
    await this.scrollToFooterByText();
    const emailElement = this.page.locator('a[href^="mailto:"]').last();
    const emailText = await emailElement.textContent();
    return emailText.trim();
  }
}