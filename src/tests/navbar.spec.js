import { test, expect } from "../utils/fixtures/baseFixtures";
import { NavbarFlow } from "../flows/navbarFlow";

test.describe("Navbar Tests", () => {
  let navbarFlow;

  test.beforeEach(async ({ page, actions }) => {
    navbarFlow = new NavbarFlow(page, actions);
  });

  // ============================================================================
  test("@navbar @navbar001 - Check Each Links in Navbar", async () => {
    await navbarFlow.VerifyAllNavbarLinks();
  });

  test("@navbar @navbar002 - Check Each Links Brands Dropdown", async () => {
    await navbarFlow.VerifyAllBrandsDropdownLinks();
  });

  test("@navbar @navbar003 - Check Each Links Thruster Dropdown", async () => {
    await navbarFlow.VerifyAllTrusterDropdownLinks();
  });

  test("@navbar @navbar004 - Check Each Links Anchoring Dropdown", async () => {
    await navbarFlow.VerifyAllAnchoringDropdownLinks();
  });

  test("@navbar @navbar005 - Check Each Lighting & Switching Dropdown", async () => {
    await navbarFlow.VerifyAllLightingSwitchingDropdownLinks();
  });

  test("@navbar @navbar006 - Check Each Wipers & Access Dropdown", async () => {
    await navbarFlow.VerifyAllWipersAccessDropdownLinks();
  });
  test("@navbar @navbar007 - Check Each About Imtra Dropdown", async () => {
    await navbarFlow.VerifyAboutImtraDropdownLinks();
  });
  test("@navbar @navbar008 - Check Each Customer Care Dropdown", async () => {
    await navbarFlow.VerifyCustomerCareDropdownLinks();
  });
});
