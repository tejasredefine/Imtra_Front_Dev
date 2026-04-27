import { test, expect } from "../utils/fixtures/baseFixtures";
import { BrandFlow } from "../flows/brandFlow";

test.describe("Brand Page Tests", () => {
  let brandFlow;

  test.beforeEach(async ({ page, actions }) => {
    brandFlow = new BrandFlow(page, actions);
  });

  // ============================================================================
  test("@brand @brand001 - Navigate to Brands page via Navbar and verify page title", async () => {
    await brandFlow.navigateToBrandsPageAndVerify();
  });

  // // ============================================================================
  // test("@brand @brand002 - Verify breadcrumb on Brands listing page", async () => {
  //   await brandFlow.navigateToBrandsPageAndVerifyBreadcrumb();
  // });

  // ============================================================================
  test("@brand @brand003 - Click on first brand card and verify redirection", async () => {
    await brandFlow.clickFirstBrandAndVerify();
  });

  // ============================================================================
  test("@brand @brand004 - Click on first brand card and verify breadcrumb", async () => {
    await brandFlow.clickFirstBrandAndVerifyBreadcrumb();
  });

  // ============================================================================
  // Individual brand tests — one test per brand visible on the Brands page
  // Row 1: Sleipner | Auto Anchor | Exalto | Peerless (Acco) | Beclawat | BCM
  // ============================================================================

  test("@brand @brand005 - Verify Sleipner brand page title and breadcrumb", async () => {
    await brandFlow.verifySleipnerBrandPage();
  });

  // ============================================================================
  test("@brand @brand006 - Verify Auto Anchor brand page title and breadcrumb", async () => {
    await brandFlow.verifyAutoAnchorBrandPage();
  });

  // ============================================================================
  test("@brand @brand007 - Verify Exalto Wipers brand page title and breadcrumb", async () => {
    await brandFlow.verifyExaltoBrandPage();
  });

  // ============================================================================
  test("@brand @brand008 - Verify Acco brand page title and breadcrumb", async () => {
    await brandFlow.verifyAccoBrandPage();
  });

  // ============================================================================
  test("@brand @brand009 - Verify Beclawat brand page title", async () => {
    await brandFlow.verifyBeclawatBrandPage();
  });

  // ============================================================================
  test("@brand @brand010 - Verify BCM brand page title and breadcrumb", async () => {
    await brandFlow.verifyBCMBrandPage();
  });

  // ============================================================================
  // Row 2: Besenzoni | Broxe | Decca | DHR | Frensch Lighting | Fynspray
  // ============================================================================

  test("@brand @brand011 - Verify Besenzoni brand page title and breadcrumb", async () => {
    await brandFlow.verifyBesenzOniBrandPage();
  });

  // ============================================================================
  test("@brand @brand012 - Verify Broxe brand page title and breadcrumb", async () => {
    await brandFlow.verifyBroxeBrandPage();
  });

  // ============================================================================
  test("@brand @brand013 - Verify Decca brand page title and breadcrumb", async () => {
    await brandFlow.verifyDeccaBrandPage();
  });

  // ============================================================================
  test("@brand @brand014 - Verify Den Haan Rotterdam (DHR) brand page title and breadcrumb", async () => {
    await brandFlow.verifyDHRBrandPage();
  });

  // ============================================================================
  test("@brand @brand015 - Verify Frensch Lighting brand page title and breadcrumb", async () => {
    await brandFlow.verifyFrenschBrandPage();
  });

  // ============================================================================
  test("@brand @brand016 - Verify Fynspray brand page title and breadcrumb", async () => {
    await brandFlow.verifyFynsprayBrandPage();
  });

  // ============================================================================
  // Row 3: Imtra | Imtra Marine Lighting | InterVolt | Isover | Kingston | Libra
  // ============================================================================

  test("@brand @brand017 - Verify Imtra brand page title and breadcrumb", async () => {
    await brandFlow.verifyImtraBrandPage();
  });

  // ============================================================================
  test("@brand @brand018 - Verify Imtra Marine Lighting brand page title and breadcrumb", async () => {
    await brandFlow.verifyImtraMarineLightingBrandPage();
  });

  // ============================================================================
  test("@brand @brand019 - Verify InterVolt brand page title and breadcrumb", async () => {
    await brandFlow.verifyInterVoltBrandPage();
  });

  // ============================================================================
  test("@brand @brand020 - Verify Isover Saint-Gobain brand page title and breadcrumb", async () => {
    await brandFlow.verifyIsoverBrandPage();
  });

  // ============================================================================
  test("@brand @brand021 - Verify Kingston brand page title and breadcrumb", async () => {
    await brandFlow.verifyKingstonBrandPage();
  });

  // ============================================================================
  test("@brand @brand022 - Verify Libra brand page title and breadcrumb", async () => {
    await brandFlow.verifyLibraBrandPage();
  });

  // ============================================================================
  // Row 4: Lilaas | Lofrans | Lumishore | Marinebeam | Muir | Nauta
  // ============================================================================

  test("@brand @brand023 - Verify Lilaas brand page title and breadcrumb", async () => {
    await brandFlow.verifyLilaasBrandPage();
  });

  // ============================================================================
  test("@brand @brand024 - Verify Lofrans brand page title and breadcrumb", async () => {
    await brandFlow.verifyLofransBrandPage();
  });

  // ============================================================================
  test("@brand @brand025 - Verify Lumishore brand page title and breadcrumb", async () => {
    await brandFlow.verifyLumishoreBrandPage();
  });

  // ============================================================================
  test("@brand @brand026 - Verify Marinebeam brand page title and breadcrumb", async () => {
    await brandFlow.verifyMarinebeamBrandPage();
  });

  // ============================================================================
  test("@brand @brand027 - Verify Muir Windlasses brand page title and breadcrumb", async () => {
    await brandFlow.verifyMuirBrandPage();
  });

  // ============================================================================
  test("@brand @brand028 - Verify Nauta brand page title and breadcrumb", async () => {
    await brandFlow.verifyNautaBrandPage();
  });

  // ============================================================================
  // Row 5: Norsap | Prebit | Roca | Seaview | Stahl Tranberg | Victron Energy
  // ============================================================================

  test("@brand @brand029 - Verify Norsap brand page title and breadcrumb", async () => {
    await brandFlow.verifyNorsapBrandPage();
  });

  // ============================================================================
  test("@brand @brand030 - Verify Prebit brand page title and breadcrumb", async () => {
    await brandFlow.verifyPrebitBrandPage();
  });

  // ============================================================================
  test("@brand @brand031 - Verify Roca brand page title and breadcrumb", async () => {
    await brandFlow.verifyRocaBrandPage();
  });

  // ============================================================================
  test("@brand @brand032 - Verify Seaview brand page title and breadcrumb", async () => {
    await brandFlow.verifySeaviewBrandPage();
  });

  // ============================================================================
  test("@brand @brand033 - Verify Tranberg Lighting brand page title and breadcrumb", async () => {
    await brandFlow.verifyTranbergBrandPage();
  });

  // ============================================================================
  test("@brand @brand034 - Verify Victron Energy brand page title and breadcrumb", async () => {
    await brandFlow.verifyVictronBrandPage();
  });

  // ============================================================================
  // Row 6: Vimar | VisionX | Zipwake
  // ============================================================================

  test("@brand @brand035 - Verify Vimar brand page title and breadcrumb", async () => {
    await brandFlow.verifyVimarBrandPage();
  });

  // ============================================================================
  test("@brand @brand036 - Verify VisionX brand page title and breadcrumb", async () => {
    await brandFlow.verifyVisionXBrandPage();
  });

  // ============================================================================
  test("@brand @brand037 - Verify Zipwake brand page title and breadcrumb", async () => {
    await brandFlow.verifyZipwakeBrandPage();
  });
});
