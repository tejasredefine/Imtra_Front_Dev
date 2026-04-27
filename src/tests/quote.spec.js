import { test } from "../utils/fixtures/baseFixtures";
import { QuoteFlow } from "../flows/quoteFlow";
import { PAGE_TITLES } from "../utils/data/metaData";

test.describe("Quote Test", () => {
  let quoteFlow;

  test.beforeEach(async ({ page, actions }) => {
    quoteFlow = new QuoteFlow(page, actions);
  });

  test("@Quote @Quote001 - Add a Quote", async () => {
    await quoteFlow.AddaQuoteWhithoutLogin();
  });

  test("Quote @Quote002 - Quote Icon Testing without Login ", async () => {
    await quoteFlow.ClickOnQuoteWithoutlogin();
  });

  test("Quote @Quote003 - Quote Icon Testing After Login ", async () => {
    await quoteFlow.ClickOnQuoteAfterlogin(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote004 - Add Some Product to the Quote", async () => {
    await quoteFlow.AddtoQuote(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote005 - Convert Quote to Cart", async () => {
    await quoteFlow.ConvertQuoteToCart(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote006 - Try To Delete an Item Converted From the Quote", async () => {
    await quoteFlow.DeleteItemInCartConvertedFromTheQuote(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote007 - Varify That Cart Items Converted to Quote Automatically when Quote converted to Cart", async () => {
    await quoteFlow.CartItemAutoConvertToQuoteUponAddingTheQuotetoCart(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote008 - Try to decrease the Quantity items from the cart which is added from the quote", async () => {
    await quoteFlow.TrytoDecreaseItemQuantityConvertedFromQuotetoCart(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote009 - Add New Ptoduct To the Cart converted from the quote and try to decrease it's quantity and Delete it", async () => {
    await quoteFlow.AddNewProductToCartConvertedFromQuoteAndTryToDecreaseItsQuantityAndRemoveIt(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote010 - Test clear All Button in Cart which is converted from the Quote", async () => {
    await quoteFlow.ClearAllButtonTestConvertedFromTheCart(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("Quote @Quote011 - Status Dropdown Test - Pending", async () => {
    await quoteFlow.StatusDropDownTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
      "Pending",
    );
  });

  test("Quote @Quote012 - Status Dropdown Test - Converted to Cart", async () => {
    await quoteFlow.StatusDropDownTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
      "Converted to Cart",
    );
  });

  test("Quote @Quote013 - Note Modal Validation Message Test", async () => {
    await quoteFlow.NoteModalValidationMessageTest(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });
});
