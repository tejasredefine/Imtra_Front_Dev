import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/BasePage";
import { PAGE_TITLES } from "../utils/data/metaData";

export class HomepageFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
  }

  async VerifyTheHeroSection() {
    await this.homepage.clickOnTheNavDosAndVerifyHeroSectioncontent();
    await this.ClickOnButtonByTagAndText("span", "Explore products");
    await this.verifyPageTitle("Recreational Marine | Markets We Serve | Imtra");
    await this.verifyBreadcrumb("Recreational Marine Market");
    await this.verifyPageHeader("div", "Recreational Marine Market");
  }

  async VerifyBringingYouBestSection() {
    await this.ClickOnButtonByTagAndText("a", "Victron");
    await this.verifyPageTitle("Victron");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("p", "Windows, Shades, & Blinds");
    await this.verifyPageTitle("Shades & Blinds");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("span", "LIGHTING & SWITCHING");
    await this.verifyPageTitle("Lighting & Switching");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("span", "THRUSTER");
    await this.verifyPageTitle("Thrusters");
  }

  async VerifyMarketsWeServeSection() {
    await this.ClickOnButtonByTagAndText("a", "RECREATIONAL MARINE");
    await this.verifyPageTitle("Recreational Marine | Markets We Serve | Imtra");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("a", "COMMERCIAL MARINE");
    await this.verifyPageTitle("Commercial Marine Solutions | Markets We Serve | Imtra");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("a", "VANS / RV");
    await this.verifyPageTitle("Van Conversion Equipment | Land-Based Products | Imtra");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("a", "ENERGY");
    await this.verifyPageTitle("Oil Tanker & Gas Carrier Boat Equipment | Energy Industry ");
  }

  async VerifyAboutImtraSection() {
    await this.ClickOnButtonByTagAndText("a", "About IMTRA");
    await this.verifyPageTitle("About Imtra");
  }

  async VerifySeaViewBannerSection() {
    await this.ClickOnButtonByTagAndTitle("a", "Seaview Blinds ");
    await this.verifyPageTitle("Seaview Blinds");
  }

  async VerifyImtraTradeSection() {
    await this.ClickOnButtonByTagAndTitle("a", "Trade Shows & Events");
    await this.verifyPageTitle("Imtra's Trade Shows & Events");
  }

  async VerifyImtraClearanceItemsSection() {
    await this.ClickOnButtonByTagAndTitle("a", "Imtra Clearance Items");
    await this.verifyPageTitle("Clearance Items");
  }

  async VerifyLocateADealerSection() {
    await this.ClickOnButtonByTagAndTitle("a", "Locate a Dealer");
    await this.verifyPageTitle("Locate a Dealer");
  }

  async VerifyVimarBannerSection() {
    await this.ClickOnButtonByTagAndTitle("a", "Vimar");
    await this.verifyPageTitle("Vimar");
  }

  async VerifyBrandPartnerSlider() {
    await this.homepage.clickOnTheSliderLogosOneByOneAndVerifyThePageRedirection();
  }

  async VerifyVideoLibrarySection() {
    await this.ClickOnButtonByTagAndText("a", "Company Overview");
    await this.verifyPageTitle("Video Library | Demos, Installations, & More | Imtra");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("a", "Commercial Overview");
    await this.verifyPageTitle("Video Library | Demos, Installations, & More | Imtra");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("a", "Recreational Overview");
    await this.verifyPageTitle("Video Library | Demos, Installations, & More | Imtra");
    await this.actions.goBack();

    await this.ClickOnButtonByTagAndText("a", "Introducing Zipwake: Comfort & Performance");
    await this.verifyPageTitle("Video Library | Demos, Installations, & More | Imtra");
  }

  async VerifyLatestNewsAndResourceSection() {
    console.log("Test Starting");
    await this.homepage.VerifyLatestNewsAndResourseSectionTesting();
  }
}
