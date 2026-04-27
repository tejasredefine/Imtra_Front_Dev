export class HeroBanner {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  async clickNavdotsAndVerifyTheBanner(dotNumber, expectedText) {
    console.log(`\n[HeroBanner] Clicking on navigation dot ${dotNumber}`);
    // Find all navigation dots
    const navDots = await this.page.locator(".swiper-pagination-bullet").all();
    if (navDots.length === 0) {
      throw new Error("No navigation dots found on the page");
    }
    // Click on the specific dot (dotNumber - 1 because array is 0-indexed)
    const targetDot = navDots[dotNumber - 1];
    await targetDot.click();
    console.log(`✓ Clicked on navigation dot ${dotNumber}`);
    // Wait for the slide transition to complete
    await this.actions.addSleep(1);
    // Verify the banner text
    await this.verifyBannerText(expectedText);
    console.log(`✓ Navigation dot ${dotNumber} verified successfully\n`);
  }

  async verifyBannerText(expectedText) {
    // Find the banner text element
    const activeSlide = this.page.locator(".swiper-slide-active");
    const bannerText = activeSlide.locator(".text-xl.text-white").first();
    // Wait for the element to be visible
    await this.actions.waitForVisible(bannerText);
    // Get the text content
    const actualText = await this.actions.getText(bannerText);
    // Clean up the text (remove extra spaces, normalize)
    const cleanActualText = actualText.replace(/\s+/g, " ").trim();
    const cleanExpectedText = expectedText.replace(/\s+/g, " ").trim();
    // Verify the text
    if (
      !cleanActualText.toUpperCase().includes(cleanExpectedText.toUpperCase())
    ) {
      throw new Error(
        `Banner text mismatch:\nExpected: "${cleanExpectedText}"\nActual: "${cleanActualText}"`,
      );
    }
    console.log(`✓ Banner text verified: "${cleanActualText}"`);
  }
}
