import { test, expect } from "../utils/fixtures/baseFixtures";
import { CartFlow } from "../flows/cartFlow";
import { PAGE_TITLES } from "../utils/data/metaData";

test.describe("Cart Tests", () => {
  let cartFlow;

  test.beforeEach(async ({ page, actions }) => {
    cartFlow = new CartFlow(page, actions);
  });

  // ============================================================================
  test("@cart @cart001 - Navigate to Cart Page From Product Details Page", async () => {
    await cartFlow.NavigateToCartPageFromProductDeatailsPage();
  });

  test("@cart @cart002 - Navigate to Cart Page From Cart Icon in Navbar", async () => {
    await cartFlow.NavigateToCartPageFromNavCartIcon(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart003 - Empty Cart Testing", async () => {
    await cartFlow.EmptyCartTesting();
  });

  test("@cart @cart004 - Add product from listing page and Verify it with the sidebar", async () => {
    await cartFlow.CartSidebarDetailsVerificationesting();
  });

  test("@cart @cart005 - Verify Cart Sidebar Items and Totals", async () => {
    await cartFlow.CartSidebarTotalVerificaions(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart006 - Cart Sidebar Items Removal Test", async () => {
    await cartFlow.CartSidebarTotalVerificaions(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart007 - Navigate To Cart Page From Cart Sidebar and Varify the All Details", async () => {
    await cartFlow.NavigateToCartPageAndVerifyAllDeails(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart008 - Navigate To Checkout Page From Cart Sidebar", async () => {
    await cartFlow.NavigateToCheckoutPage(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart009 - Add a Note to any one product, Edit a Note, Try to remove the Note varify Error message.", async () => {
    await cartFlow.NoteFuntionalityTesting(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart010 - Save for Laer Funtionality test Without Login", async () => {
    await cartFlow.SaveForLaterWithoutLogin();
  });

  test("@cart @cart011 - Save for Laer Funtionality test With Login", async () => {
    await cartFlow.SaveForLaterWithLogin(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart012 - Continue Shopping buton Testing", async () => {
    await cartFlow.ContinueShoppingButtonTesing(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@cart @cart013 - Clear All button Testing", async () => {
    await cartFlow.ClearAllButtonTesing();
  });

  test("@cart @cart014 - Single item Removal Test", async () => {
    await cartFlow.SingleItemRemovalTest();
  });

  test("@cart @cart015 - Product Quantity Change Tesing", async () => {
    await cartFlow.ProductQuantityVariationTesting();
  });

  test("@cart @cart016 - Valid Promo Code Tesing", async () => {
    await cartFlow.ValidPromoCodeTesting();
  });

  test("@cart @cart017 - Valid Promo Code Removal", async () => {
    await cartFlow.ValidPromoCodeRemovalTesting();
  });

  test("@cart @cart018 - Invalid Promo Code Removal", async () => {
    await cartFlow.InvalidPromoCodeTesting();
  });

  test("@cart @cart019 - Checkout Now Button Test", async () => {
    await cartFlow.CheckoutNowButtonTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,);
  });

  test("@cart @cart020 - REQUEST BULK CONSULTATION Button Test", async () => {
    await cartFlow.RequestBulkConsultationButtonTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,);
  });
});
