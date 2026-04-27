import { test, expect } from "../utils/fixtures/baseFixtures";
import { LoginFlow } from "../flows/loginFlow";
import {
  PAGE_TITLES,
  MODAL_TYPES,
  ERROR_MESSAGES,
} from "../utils/data/metaData";

test.describe("Login Tests", () => {
  let loginFlow;

  test.beforeEach(async ({ page, actions }) => {
    loginFlow = new LoginFlow(page, actions);
  });

  // ============================================================================
  test("@login @login001 - Successful Login with Valid Credenials", async () => {
    await loginFlow.LoginAndVerifyRedirection(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  // ============================================================================
  test("@login @login002 - Successful Login with Valid Credenials Quote Link", async () => {
    await loginFlow.PerformLoginFromQuote(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  // ============================================================================
  test("@login @login003 - Successful Login with Valid Credenials from Product Deails Page", async () => {
    await loginFlow.performLoginFromProductDetailsPage(
      process.env.EMAIL,
      process.env.PASSWORD,
    );
  });

  // ============================================================================
  test("@login @login004 - Successful Login with Valid Credenials from Product Deails Page (Customer Review section) Link", async () => {
    await loginFlow.performLoginFromProductDetailsPageCustomerReview(
      process.env.EMAIL,
      process.env.PASSWORD,
    );
  });

  // ============================================================================
  test("@login @login005 - Login with the wrong email", async () => {
    await loginFlow.performLoginWithWrongEmailPassword(
      "test@ga.com",
      process.env.PASSWORD,
      MODAL_TYPES.ERROR,
      ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
    );
  });

  // ============================================================================
  test("@login @login006 - Login with the wrong password", async () => {
    await loginFlow.performLoginWithWrongEmailPassword(
      process.env.EMAIL,
      "Aabra ka dabra",
      MODAL_TYPES.ERROR,
      ERROR_MESSAGES.INVALID_CREDENTIALS,
    );
  });

  // ============================================================================
  test("@login @login007 - Forgot Password  with Right Email address", async () => {
    await loginFlow.performForgotpassword(
      process.env.EMAIL,
      MODAL_TYPES.SUCCESS,
      ERROR_MESSAGES.PASSWORD_RESET_SENT,
    );
  });

  // ============================================================================
  test("@login @login008 - Forgot Password  with Unregistered Email address", async () => {
    await loginFlow.performForgotpassword(
      "test@ga.com",
      MODAL_TYPES.ERROR,
      ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
    );
  });
});
