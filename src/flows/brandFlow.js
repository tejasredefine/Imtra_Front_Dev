import { BrandPage } from "../pages/brandPage";
import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/BasePage";
import { BRANDS } from "../utils/data/brandData";
import { PAGE_TITLES } from "../utils/data/metaData";

export class BrandFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.brandPage = new BrandPage(page, actions);
    this.homepage = new HomePage(page, actions);
  }

  // ************* UTILITIES *******************************

  // Navigate to the Brands listing page via the navbar
  async goToBrandsPage() {
    await this.brandPage.clickOnBrandsNavLink();
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }

  // Core reusable method: navigate to Brands page, click a specific brand by title,
  // verify page title and breadcrumb, then return home

  // use this method if title and breadcrumb are the same
  async navigateAndVerifyBrand(brandTitle, expectedPageTitle) {
    await this.goToBrandsPage();
    await this.brandPage.clickBrandByTitle(brandTitle);
    await this.verifyPageTitle(expectedPageTitle);
    await this.brandPage.verifyBrandPageBreadcrumb(brandTitle);
    await this.brandPage.returnToHomePage();
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }

  // use this common method if title and breadcrumb are different
  async navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(brandTitle, expectedPageTitle, expectedBreadcrumb) {
    await this.goToBrandsPage();
    await this.brandPage.clickBrandByTitle(brandTitle);
    await this.verifyPageTitle(expectedPageTitle);
    await this.brandPage.verifyBrandPageBreadcrumb(expectedBreadcrumb);
    await this.brandPage.returnToHomePage();
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }

  //use this common method if there is no breadcrumb its CMS page
  async navigateAndVerifyBrandWithNoBreadcrumb(brandTitle, expectedPageTitle) {
    await this.goToBrandsPage();
    await this.brandPage.clickBrandByTitle(brandTitle);
    await this.verifyPageTitle(expectedPageTitle);
    await this.brandPage.returnToHomePage();
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }

  // ******************************************************

  // ---------- Navigate to Brands page and verify title ----------
  async navigateToBrandsPageAndVerify() {
    await this.goToBrandsPage();
  }

  // ---------- Navigate to Brands page and verify breadcrumb ----------
  async navigateToBrandsPageAndVerifyBreadcrumb() {
    await this.goToBrandsPage();
    await this.brandPage.verifyBrandListingPageBreadcrumb();
  }

  // ---------- Click first brand card and verify page title ----------
  async clickFirstBrandAndVerify() {
    await this.goToBrandsPage();
    const brandName = await this.brandPage.clickFirstBrandCard();
    await this.brandPage.verifyBrandPageTitle("Sleipner Boat Stabilizers & Thrusters | Imtra - IMTRA");
  }

  // ---------- Click first brand card and verify breadcrumb ----------
  async clickFirstBrandAndVerifyBreadcrumb() {
    await this.goToBrandsPage();
    const brandName = await this.brandPage.clickFirstBrandCard();
    await this.brandPage.verifyBrandPageBreadcrumb("Sleipner");
  }

  // ============================================================
  // Individual brand flow methods — one per brand on the page
  // All delegate to the shared navigateAndVerifyBrand() utility
  // ============================================================

  // Row 1

  async verifySleipnerBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(
      BRANDS.SLEIPNER.title,
     BRANDS.SLEIPNER.expectedPageTitle,
      BRANDS.SLEIPNER.expectedBreadcrumb
    );
  }

  async verifyAutoAnchorBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(
      BRANDS.AUTO_ANCHOR.title,
      BRANDS.AUTO_ANCHOR.expectedPageTitle,
      BRANDS.AUTO_ANCHOR.expectedBreadcrumb
    );
  }

  async verifyExaltoBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(
      BRANDS.EXALTO.title,
      BRANDS.EXALTO.expectedPageTitle,
      BRANDS.EXALTO.expectedBreadcrumb
    );
  }

  async verifyAccoBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.ACCO.title,
      BRANDS.ACCO.expectedPageTitle,
    );
  }

  async verifyBeclawatBrandPage() {
    await this.navigateAndVerifyBrandWithNoBreadcrumb(
      BRANDS.BECLAWAT.title,
      BRANDS.BECLAWAT.expectedPageTitle,
    );
  }

  async verifyBCMBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.BCM.title,
      BRANDS.BCM.expectedPageTitle,
    );
  }

  //======================= Row 2 ===============================================

  async verifyBesenzOniBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.BESENZONI.title,
      BRANDS.BESENZONI.expectedPageTitle,
    );
  }

  async verifyBroxeBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.BROXE.title,
      BRANDS.BROXE.expectedPageTitle,
    );
  }

  async verifyDeccaBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.DECCA.title,
      BRANDS.DECCA.expectedPageTitle,
    );
  }

  async verifyDHRBrandPage() {
    await this.navigateAndVerifyBrandWithNoBreadcrumb(
      BRANDS.DHR.title,
      BRANDS.DHR.expectedPageTitle,
      BRANDS.DHR.expectedBreadcrumb
    );
  }

  async verifyFrenschBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.FRENSCH.title,
      BRANDS.FRENSCH.expectedPageTitle,
    );
  }

  async verifyFynsprayBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.FYNSPRAY.title,
      BRANDS.FYNSPRAY.expectedPageTitle,
    );
  }

  //======================= Row 3 ===============================================

  async verifyImtraBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.IMTRA.title,
      BRANDS.IMTRA.expectedPageTitle,
    );
  }

  async verifyImtraMarineLightingBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.IMTRA_MARINE_LIGHTING.title,
      BRANDS.IMTRA_MARINE_LIGHTING.expectedPageTitle,
    );
  }

  async verifyInterVoltBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.INTERVOLT.title,
      BRANDS.INTERVOLT.expectedPageTitle,
    );
  }

  async verifyIsoverBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(
      BRANDS.ISOVER.title,
      BRANDS.ISOVER.expectedPageTitle,
      BRANDS.ISOVER.expectedBreadcrumb
    );
  }

  async verifyKingstonBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.KINGSTON.title,
      BRANDS.KINGSTON.expectedPageTitle,
    );
  }

  async verifyLibraBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.LIBRA.title,
      BRANDS.LIBRA.expectedPageTitle,
    );
  }

  //======================= Row 4 ===============================================

  async verifyLilaasBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(
      BRANDS.LILAAS.title,
      BRANDS.LILAAS.expectedPageTitle,
      BRANDS.LILAAS.expectedBreadcrumb
    );
  }

  async verifyLofransBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.LOFRANS.title,
      BRANDS.LOFRANS.expectedPageTitle,
    );
  }

  async verifyLumishoreBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.LUMISHORE.title,
      BRANDS.LUMISHORE.expectedPageTitle,
    );
  }

  async verifyMarinebeamBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.MARINEBEAM.title,
      BRANDS.MARINEBEAM.expectedPageTitle,
    );
  }

  async verifyMuirBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb  (
      BRANDS.MUIR.title,
      BRANDS.MUIR.expectedPageTitle,
      BRANDS.MUIR.expectedBreadcrumb
    );
  }

  async verifyNautaBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.NAUTA.title,
      BRANDS.NAUTA.expectedPageTitle,
    );
  }

  //======================= Row 5 ===============================================

  async verifyNorsapBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.NORSAP.title,
      BRANDS.NORSAP.expectedPageTitle,
    );
  }

  async verifyPrebitBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.PREBIT.title,
      BRANDS.PREBIT.expectedPageTitle,
    );
  }

  async verifyRocaBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(
      BRANDS.ROCA.title,
      BRANDS.ROCA.expectedPageTitle,
      BRANDS.ROCA.expectedBreadcrumb
    );
  }

  async verifySeaviewBrandPage() {
    await this.navigateAndVerifyBrandWithDifferentTitleAndBreadcrumb(
      BRANDS.SEAVIEW.title,
      BRANDS.SEAVIEW.expectedPageTitle,
      BRANDS.SEAVIEW.expectedBreadcrumb
    );
  }

  async verifyTranbergBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.TRANBERG.title,
      BRANDS.TRANBERG.expectedPageTitle,
    );
  }

  async verifyVictronBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.VICTRON.title,
      BRANDS.VICTRON.expectedPageTitle,
    );
  }

  //======================= Row 6 ===============================================

  async verifyVimarBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.VIMAR.title,
      BRANDS.VIMAR.expectedPageTitle,
    );
  }

  async verifyVisionXBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.VISIONX.title,
      BRANDS.VISIONX.expectedPageTitle,
    );
  }

  async verifyZipwakeBrandPage() {
    await this.navigateAndVerifyBrand(
      BRANDS.ZIPWAKE.title,
      BRANDS.ZIPWAKE.expectedPageTitle,
    );
  }
}
