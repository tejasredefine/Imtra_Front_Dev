import { Navbar } from "../components/Navbar";
import { NavLinks } from "../components/navLinks";
import { HeroBanner } from "../components/heroBanner";
import { BasePage } from "./BasePage";
import { BRANDS } from "../utils/data/metaData";

export class HomePage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.navbar = new Navbar(page, actions);
    this.navLinks = new NavLinks(page, actions);
    this.heroBanner = new HeroBanner(page, actions);
  }

  // ==================== Navigation Methods ====================
  // ---------- Click On the Quote Link in Navbar ---------------
  async clickOnTheQuote() {
    const button = await this.actions.findLinkByTitle("Quote");
    await this.actions.click(button);
  }

  // --------- Hover Over any one Navlink randomaly -------------
  async hoverOvernavlinkrandomly() {
    await this.navbar.hoverOnRandomNavLink();
  }

  // -------- click on the any one link on the nav dropdown ----
  async clickOnTheOneSublinkInSubNavDropdown() {
    this.selectedSublink = await this.navbar.clickRandomSublink();
    return this.selectedSublink;
  }

  // ------ Verify the Produc Deatails Page Redirection from produc listing page
  async verifyPageRedirectionToProductListingPage() {
    if (!this.selectedSublink) {
      throw new Error(
        "No sublink was selected. Call clickOnTheOneSublinkInSubNavDropdown() first.",
      );
    }
    await this.actions.verifyProductListingPage(this.selectedSublink);
  }

  // --------- Hover Over he Account Icon in Navbar and click on he logout button from the dropdown
  async hoverOverAccounAndClickOnLogout() {
    await this.navLinks.hoverOverTheAccountIcon();
  }

  async hoverOverTheAccountIconClickOnWhislist() {
    await this.navLinks.hoverOverTheAccountIconClickOnWhislist();
  }

  // ==================== Hero Banner ====================
  // ------- Click on the Hero Banner Links One by One and verify the conent ---------
  async clickOnTheNavDosAndVerifyHeroSecioncontent() {
    await this.heroBanner.clickNavdotsAndVerifyTheBanner(
      1,
      "INNOVATIVE SOLUTION FOR RECREATIONAL MARINE.",
    );
    await this.heroBanner.clickNavdotsAndVerifyTheBanner(
      2,
      "BUILT ON EXPERIENCE DRIVEN BY INNOVATION.",
    );
    await this.heroBanner.clickNavdotsAndVerifyTheBanner(
      3,
      "POWERING THE FUTURE OF MARINE INNOVATION.",
    );
    await this.heroBanner.clickNavdotsAndVerifyTheBanner(
      4,
      "WHERE MARINE EXPERTISE MEETS MODERN INNOVATION.",
    );
    await this.heroBanner.clickNavdotsAndVerifyTheBanner(
      1,
      "INNOVATIVE SOLUTION FOR RECREATIONAL MARINE.",
    );
  }

  // ==================== Brand Slider ====================
  async clickOnTheSliderLogosOneByOneAndVerifyThePageRedirection() {
    for (const brand of BRANDS) {
      // Locate image dynamically based on title
      const image = this.page.locator(
        `//a[@class="image-link w-full"]//img[contains(@class, 'max-h-20 max-w-full') and @title='${brand.imageTitle}']`,
      );
      // Click the brand image
      await image.click();
      await this.actions.addSleep(2);
      await this.verifyPageTitle(brand.expectedPageTitle);
      await this.actions.goBack();
    }
  }

  // ==================== Latest News ====================
  async VerifyLatestNewsAndResourseSectionTesting() {
    await this.actions.scrollTo(0, 5000);
    await addSleep(3);
    const links = await this.page.locator(
      `//a[@target="_blank" and @class='text-primary line-clamp-2 h-12 text-base font-semibold']`,
    );
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const linkTitle = (await link.textContent())?.trim();

      console.log(`[${i + 1}/${count}] Checking: ${linkTitle}`);

      // ✅ CORRECT: Click and capture new page together
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        link.click(),
      ]);

      // Wait for new page to load
      await newPage.waitForLoadState();

      // ✅ Verify header on NEW page (not original page)
      const header = newPage.locator(`div:has-text("${linkTitle}")`).first();
      await header.waitFor({ state: "visible" });

      console.log(`✓ Header found on new page`);

      // Close the new tab
      await newPage.close();
    }

    console.log(`✓ All ${count} links verified`);
  }

  // ==================== Navbar Dropdown Methods ====================
  async clickOnEachLinksInNavbarAndVerifyPageTitle() {
    await this.navbar.clickOnEachLinksInNavbarAndVerifyPageTitle();
  }

  async clickOnEachBrandsDropDownLinks() {
    await this.navbar.clickOnEachBrandsDropDownLinks();
  }

  async clickOnDropdownLinks(dropdownTitle, dropdownData) {
    await this.navbar.clickOnEachDropdownLinks(dropdownTitle, dropdownData);
  }
  async clickOnEachThrustersDropDownLinks() {
    await this.navbar.clickOnEachThrustersDropDownLinks();
  }

  async clickOnEachAboutImtraDropDownLinks() {
    await this.navbar.clickOnEachAboutImtraDropDownLinks();
  }

  async clickOnEachCustomerCareDropDownLinks() {
    await this.navbar.clickOnEachCustomerCareDropDownLinks();
  }

  // ================ Feaured Product Method =====================
  async clickOnAnyProductRandomalyInFeaturedProductSlider() {
    await this.page.waitForSelector(
      "//a[@class='text-primary line-clamp-4 h-24 text-xl leading-tight font-semibold']",
      { state: "attached" },
    );
    const productLinks = await findListOfElementByXpath(
      "//a[@class='text-primary line-clamp-4 h-24 text-xl leading-tight font-semibold']",
    );

    if (productLinks.length === 0) {
      throw new Error("No Featured product Found on homepage");
    }
    const randomIndex = Math.floor(Math.random() * productLinks.length);
    const randomProduct = productLinks[randomIndex];
    const productName = await getText(randomProduct);
    await click(randomProduct);
    return productName;
  }
}
