import { BrandPageComponent } from "../components/brandPageComp";
import { BasePage } from "./BasePage";

export class BrandPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.brandPageComponent = new BrandPageComponent(page, actions);
  }

  // Step: "user clicks on Brands in the navbar"
  async clickOnBrandsNavLink() {
    await this.brandPageComponent.clickBrandsNavLink();
  }

  // Step: "user clicks on a specific brand card by its title attribute"
  async clickBrandByTitle(brandTitle) {
    await this.brandPageComponent.clickBrandCardByTitle(brandTitle);
  }

  // Step: "user clicks on the first brand card on the Brands listing page"
  // Returns the brand name so the caller can use it for verification
  async clickFirstBrandCard() {
    return await this.brandPageComponent.clickFirstBrandCard();
  }

  // Step: "verify the page title contains the brand name"
  async verifyBrandPageTitle(brandName) {
    await this.verifyPageTitle(brandName);
  }

  // Step: "verify breadcrumb on the Brands listing page"
  async verifyBrandListingPageBreadcrumb() {
    await this.actions.verifyBreadcrumb("Brands");
  }

  // Step: "verify breadcrumb on an individual brand page contains the brand name"
  async verifyBrandPageBreadcrumb(brandName) {
    await this.actions.verifyBreadcrumb(brandName);
  }

  // Step: "click the IMTRA logo to return to the homepage"
  async returnToHomePage() {
    await this.brandPageComponent.clickImtraLogo();
  }
}
