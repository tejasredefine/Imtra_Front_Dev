import ProductListingPageNavLinks from "../utils/data/navbarData";
import { BasePage } from "../pages/BasePage";
import {
  NAVBAR,
  BRANDS,
  ABOUTIMTRA,
  CUSTOMERCARE,
} from "../utils/data/navbarData";
import { PAGE_TITLES } from "../utils/data/metaData";

export class Navbar extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.navLinks = ProductListingPageNavLinks.links;
  }

  getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  async hoverOnRandomNavLink() {
    const randomLink = this.getRandomItem(this.navLinks);
    const navItem = this.page.locator("li.group", {
      hasText: randomLink,
    });
    await navItem.waitFor({ state: "visible" });
    await navItem.hover();
    console.log(`Hovered on: ${randomLink}`);
    return randomLink;
  }

  async clickRandomSublink() {
    await this.page.waitForSelector('div[role="menu"]', { state: "visible" });
    const sublinks = await this.page
      .locator('div[role="menu"] a')
      .filter({ hasNotText: /Explore/ })
      .all();

    if (sublinks.length === 0) {
      console.log("No sublinks found in the dropdown");
      return null;
    }

    const randomSublink = this.getRandomItem(sublinks); // Select a random sublink
    const linkText = await randomSublink.textContent(); // Get the link text for logging
    await randomSublink.click(); // Click the random sublink
    console.log(`Clicked on sublink: ${linkText.trim()}`);
    return linkText.trim();
  }

  // ==================== MAIN NAVBAR LINKS ====================
  async clickOnEachLinksInNavbarAndVerifyPageTitle() {
    const imtraLogo = await findElementByXpath(`(//img[@title="IMTRA"])[1]`);
    for (const navbar of NAVBAR) {
      const link = await findElementByXpath(
        `//li//a[@title='${navbar.title}']`,
      );
      await click(link);
      await addSleep(2);
      await this.verifyPageTitle(navbar.expectedPageTitle);
      await this.actions.click(imtraLogo);
      await this.verifyPageTitle(PAGE_TITLES.HOME);
    }
  }

  // ==================== BRANDS DROPDOWN ====================
  // Click on Each Sublink in brands nav dropdown
  async clickOnEachBrandsDropDownLinks() {
    const brandLink = await findElementByXpath(`//a[@title='Brands']`);
    const imtraLogo = await findElementByXpath(`(//img[@title="IMTRA"])[1]`);
    for (const brands of BRANDS) {
      await brandLink.hover();
      const link = await findElementByXpath(
        `(//a[@title="${brands.title}"]//img[@alt="${brands.title}"])[1]`,
      );
      await click(link);
      await addSleep(2);
      await this.verifyPageTitle(brands.expectedPageTitle);
      await this.actions.click(imtraLogo);
      await this.verifyPageTitle(PAGE_TITLES.HOME);
    }
  }

  // ==================== GENERIC DROPDOWN (Thrusters, Anchoring, etc.) ====================
  async clickOnEachDropdownLinks(dropdownTitle, dropdownData) {
    const dropdownLink = await findElementByXpath(
      `(//a[@title='${dropdownTitle}'])[1]`,
    );

    for (let i = 0; i < dropdownData.length; i++) {
      const item = dropdownData[i];
      await hover(dropdownLink);
      const link = await findElementByXpath(
        `//div[@class='py-8']//a[@title='${item.title}']`,
      );
      await click(link);
      await addSleep(2);
      await this.verifyPageTitle(item.expectedPageTitle);
    }
  }
  // ==================== ABOUT IMTRA DROPDOWN ====================
  async clickOnEachAboutImtraDropDownLinks() {
    const Link = await findElementByXpath(`(//a[@title='About IMTRA'])[1]`);
    for (const aboutImtra of ABOUTIMTRA) {
      await Link.hover();
      const link = await findElementByXpath(
        `//div[@class='col-span-12 lg:col-span-4 grid grid-cols-3 max-lg:gap-y-9 lg:gap-8 items-start']//a[@title="${aboutImtra.title}"]`,
      );
      await click(link);
      await addSleep(2);
      await this.verifyPageTitle(aboutImtra.expectedPageTitle);
    }
  }

  // ==================== CUSTOMER CARE DROPDOWN ====================
  async clickOnEachCustomerCareDropDownLinks() {
    const Link = await findElementByXpath(`(//a[@title='Customer Care'])[1]`);
    for (const cc of CUSTOMERCARE) {
      await Link.hover();
      const link = await findElementByXpath(
        `//div[@class='flex flex-col gap-6 lg:py-8']//a[@title="${cc.title}"]`,
      );
      await click(link);
      await addSleep(2);
      await this.verifyPageTitle(cc.expectedPageTitle);
    }
  }
}
