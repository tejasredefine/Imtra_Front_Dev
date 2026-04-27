import { test, expect } from "../utils/fixtures/baseFixtures";
import { LogoutFlow } from "../flows/logoutFlow";
import { PAGE_TITLES } from "../utils/data/metaData";

test.describe("Logout Tests", () => {
  let logoutFlow;

  test.beforeEach(async ({ page, actions }) => {
    logoutFlow = new LogoutFlow(page, actions);
  });

  // ============================================================================
  test("@logout @logout001 - Successful Logout", async () => {
    await logoutFlow.performLogout(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });
});
