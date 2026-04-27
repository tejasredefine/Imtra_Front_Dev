import { test, expect } from "../utils/fixtures/baseFixtures";
import { ProductDetailsFlow } from "../flows/productDetailsPageFlow";
import { PAGE_TITLES } from "../utils/data/metaData";
import { LoginFlow } from "../flows/loginFlow";

test.describe("Product Details Tests", () => {
  let productDetailsFlow;
  let loginFlow;

  test.beforeEach(async ({ page, actions }) => {
    productDetailsFlow = new ProductDetailsFlow(page, actions);
    loginFlow = new LoginFlow(page, actions);
  });

  // ============================================================================
  test("@productDetails @productDetails001 - Navigate to Product Deails Page From Homepage Feaure Product Section", async () => {
    await productDetailsFlow.NavigateToProductDetailsPageFromHomepageFeaturedProductSection();
  });

  test("@productDetails @productDetails002 - Navigate to Product Details Page from Navbar", async () => {
    await productDetailsFlow.NavigateToProductDetailsPageFromNavbar();
  });

  test("@productDetails @productDetails003 - Navigate to Product Details Page From Seach Page", async () => {
    await productDetailsFlow.NavigateToProductDetailsPageFromSearchPage();
  });

  test("@productDetails @productDetails004 - Navigate to Product Details Page From Cart Page", async () => {
    await productDetailsFlow.NavigateToProductDetailsPageFromCartPage();
  });

  test("@productDetails @productDetails005 - Whislist test Without Login", async () => {
    await productDetailsFlow.WhislistFuntionalityTesingWithouLogin();
  });

  test("@productDetails @productDetails006 - Whislist test With Login", async () => {
    await productDetailsFlow.WhislistFuntionalityTesingWithLogin(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails007 - Whislist testing With Login in cart", async () => {
    await productDetailsFlow.WhislistFuntionalityTesingWithCarPage(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails008 - Add Your Customer Item Number Test without Login", async () => {
    await productDetailsFlow.AddYourCustomerItemNumberTestingWhithoutLogin();
  });

  test("@productDetails @productDetails009 - Add Your Customer Item Number Test with blank Nummber", async () => {
    await productDetailsFlow.AddYourCustomerItemNumberTestingWithBlankNumber(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails010 - Add Your Customer Item Number Test with valid Number", async () => {
    await productDetailsFlow.AddYourCustomerItemNumberTestingWithValidNumber(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails011 - Add Your Customer Item Number Test with Invalid Number", async () => {
    await productDetailsFlow.AddYourCustomerItemNumberTestingWithInvalidNumber(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails012 - Add Your Customer Item Number Test with Edit Number", async () => {
    await productDetailsFlow.EditYourCustomerItemNumberTestingWithValidNumber(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails013 - Remove Customer Item Number Test", async () => {
    await productDetailsFlow.RemoveCustomerItemNumbeTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails014 - Cancel Edit Customer Item Number Test", async () => {
    await productDetailsFlow.CancelCustomerItemNumbeTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails014 - Cancel Add Customer Item Number Test", async () => {
    await productDetailsFlow.CancelAddCustomerItemNumbeTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails015 - Verify Add To Cart Funtionality", async () => {
    await productDetailsFlow.AddToCartFuntionalityTest();
  });

  test("@productDetails @productDetails016 - Request consultation Test", async () => {
    await productDetailsFlow.VerifyRequestConsultationButton();
  });

  test("@productDetails @productDetails017 - Important Warning Link Test", async () => {
    await productDetailsFlow.ImportantWarningSectionTest();
  });

  test("@productDetails @productDetails018 - Customer Review Section Without Login", async () => {
    await loginFlow.performLoginFromProductDetailsPageCustomerReview(
      process.env.EMAIL,
      process.env.PASSWORD,
    );
  });

  test("@productDetails @productDetails019 - Customer Review Section With Login", async () => {
    await productDetailsFlow.PerformWriteAReview(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@productDetails @productDetails020 - Customer Review Section Error message Validation", async () => {
    await productDetailsFlow.ValidaeErrorMessagesOnTheWriteAReviewPage(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });
});
