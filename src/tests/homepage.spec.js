import { test, expect } from "../utils/fixtures/baseFixtures";
import { HomepageFlow } from "../flows/homepageFlow";

test.describe("Homepage Tests", () => {
  let homepageFlow;

  test.beforeEach(async ({ page, actions }) => {
    homepageFlow = new HomepageFlow(page, actions);
  });

  // ============================================================================
  test("@homepage @homepage001 - Hero Section", async () => {
    await homepageFlow.VerifyTheHeroSecion();
  });

  test("@homepage @homepage002 - Bringing you Best Secion", async () => {
    await homepageFlow.VerifyBringingYouBestSection();
  });

  test("@homepage @homepage003 - MARKETS WE SERVE", async () => {
    await homepageFlow.VerifyMarketsWeServeSection();
  });

  test("@homepage @homepage004 - About Imtra", async () => {
    await homepageFlow.VerifyAboutImtraSecion();
  });

  test("@homepage @homepage005 - Seaview Blinds", async () => {
    await homepageFlow.VerifySeaViewBannerSecion();
  });

  test("@homepage @homepage006 - Imtra Trade and Events", async () => {
    await homepageFlow.VerifyImtraTradeSecion();
  });

  test("@homepage @homepage007 - Imtra Clearance Items", async () => {
    await homepageFlow.VerifyImtraClearanceItemsSecion();
  });

  test("@homepage @homepage008 - Locate a Dealer", async () => {
    await homepageFlow.VerifyLocateADealerSecion();
  });

  test("@homepage @homepage009 - Vimar Banner", async () => {
    await homepageFlow.VerifyVimarBannerSecion();
  });

  //   test("@homepage @homepage010 - FEATURED PRODUCTS slider", async () => {
  //   });

  test("@homepage @homepage011 - Brand Parener Slider", async () => {
    await homepageFlow.VerifyBrandParnerSlider();
  });

  test("@homepage @homepage012 - Video Library Section", async () => {
    await homepageFlow.VerifyVideoLibrarySecion();
  });

  test("@homepage @homepage013 - LATEST NEWS & RESOURCE", async () => {
    await homepageFlow.VerifyLaestNewsAndResourceSection();
  });
});
