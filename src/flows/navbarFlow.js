import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/BasePage";
import {
  THRUSTERS_DROPDOWN,
  ANCHORING_DROPDOWN,
  LIGHTING_SWITCHING_DROPDOWN,
  WIPERS_ACCESS_DROPDOWN,
} from "../utils/data/navbarData";

// NOTE: NavbarFlow now extends BasePage (was missing in original) to enable
// access to shared helper methods like verifyPageTitle, validateModal, etc.
export class NavbarFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
  }

  async VerifyAllNavbarLinks() {
    await this.homepage.clickOnEachLinksInNavbarAndVerifyPageTitle();
  }

  async VerifyAllBrandsDropdownLinks() {
    await this.homepage.clickOnEachBrandsDropDownLinks();
  }

  async VerifyAllThrusterDropdownLinks() {
    await this.homepage.clickOnDropdownLinks("Thrusters", THRUSTERS_DROPDOWN);
  }

  async VerifyAllAnchoringDropdownLinks() {
    await this.homepage.clickOnDropdownLinks("Anchoring", ANCHORING_DROPDOWN);
  }

  async VerifyAllLightingSwitchingDropdownLinks() {
    await this.homepage.clickOnDropdownLinks("Lighting & Switching", LIGHTING_SWITCHING_DROPDOWN);
  }

  async VerifyAllWipersAccessDropdownLinks() {
    await this.homepage.clickOnDropdownLinks("Wipers & Access", WIPERS_ACCESS_DROPDOWN);
  }

  async VerifyAboutImtraDropdownLinks() {
    await this.homepage.clickOnEachAboutImtraDropDownLinks();
  }

  async VerifyCustomerCareDropdownLinks() {
    await this.homepage.clickOnEachCustomerCareDropDownLinks();
  }
}
