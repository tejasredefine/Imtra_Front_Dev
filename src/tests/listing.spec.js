import { test, expect } from "../utils/fixtures/baseFixtures";
import { ListingFlow } from "../flows/listingFlow";
import { PAGE_TITLES } from "../utils/data/metaData";

test.describe("ListingPage Tests", () => {
  let listingpageFlow;

  test.beforeEach(async ({ page, actions }) => {
    listingpageFlow = new ListingFlow(page, actions);
  });

  // ============================================================================
  test("@listing @listing001 - Navigate to clearance Item Listing Page From Homepage", async () => {
    await listingpageFlow.NavigateToClearanceItemListingPage();
  });

  test("@listing @listing002 - Navigae to Vimar Listing Page From the Homepage", async () => {
    await listingpageFlow.NavigateToVimarListingPage();
  });

  test("@listing @listing003 - Varify the Product listing page Search Filter funtionality", async () => {
    await listingpageFlow.VerifyTheSerachFilterFuntionality();
  });

  test("@listing @listing004 - Varify the Product listing page Brands Filter funtionality", async () => {
    await listingpageFlow.VerifyBrandsFiltersFuntionality();
  });

  test("@listing @listing005 - Varify the Product listing page Category Filter funtionality", async () => {
    await listingpageFlow.navigateToCategoryAndAllSubCategoriesInListingPageAndVerifyDynamically();
  });

  test("@listing @listing006 - Varify the Product listing page Category Filter funtionality", async () => {
    await listingpageFlow.navigaeToProductDetailsPage();
  });

  test("@listing @listing007 - Varify whislist funtionality whithout login", async () => {
    await listingpageFlow.VerifyWhislistfunionalityWithoutLogin();
  });

  test("@listing @listing008 - Varify whislist funtionality with login", async () => {
    await listingpageFlow.VerifyWhislistfunionalityWithLogin(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@listing @listing009 - Varify Add to Cart Funtionality", async () => {
    await listingpageFlow.VerifyAddToCartFunctionality();
  });
});
