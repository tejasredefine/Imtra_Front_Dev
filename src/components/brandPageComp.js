export class BrandPageComponent {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  // Click the "Brands" link in the top navbar
  async clickBrandsNavLink() {
    const brandsLink = await findElementByXpath(`//li//a[@title='Brands']`);
    await click(brandsLink);
    this.page.mouse.move(0, 20); // this is for move mouse from locator to avoid overlap with the link
    console.log("Clicked on Brands link");
  }

  // Click a specific brand card by matching the image alt/title attribute
  async clickBrandCardByTitle(brandTitle) {
    const brandCard = await findElementByXpath(
      `(//div[contains(@class,'grid')]//a[contains(@href,'/brands/')]//img[@alt="${brandTitle}"])[1]`,
    );
    await waitForVisible(brandCard);
    console.log(`Clicking on brand card: ${brandTitle}`);
    await click(brandCard);
    await addSleep(2);
  }

  // Click the first brand card on the Brands listing page
  // Returns the brand name (alt text) so the caller can use it for verification
  async clickFirstBrandCard() {
    const firstBrandCard = await findElementByXpath(
      `(//div[contains(@class,'grid')]//a[contains(@href,'/brands/')])[1]`,
    );
    await waitForVisible(firstBrandCard);

    // Capture brand name from image alt attribute before clicking
    const brandImage = await findElementByXpath(
      `(//div[contains(@class,'grid')]//a[contains(@href,'/brands/')]//img)[1]`,
    );
    const brandName = await brandImage.getAttribute("alt");
    console.log(`Clicking on first brand card: ${brandName}`);

    await click(firstBrandCard);
    await addSleep(2);
    return brandName;
  }

  // Click the IMTRA logo to return to the homepage
  async clickImtraLogo() {
    const imtraLogo = await findElementByXpath(`(//img[@title="IMTRA"])[1]`);
    await click(imtraLogo);
  }
}
