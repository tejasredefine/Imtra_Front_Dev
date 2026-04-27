import { test } from "../../utils/fixtures/baseFixtures";
import { ShippingCarriersFlow } from "../../flows/MyAccount/shippingCarriersFlow";
import { PAGE_TITLES } from "../../utils/data/metaData";

test.describe("My Account > Shipping Carriers Test", () => {
  let shippingCarrierFlow;

  test.beforeEach(async ({ page, actions }) => {
    shippingCarrierFlow = new ShippingCarriersFlow(page, actions);
  });

  test("@myAccount @shippingCarrier @shippingCarrier001 - Add a Shipping Carrier", async () => {
    await shippingCarrierFlow.AddaShippingCarrier(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@myAccount @shippingCarrier @shippingCarrier002 - Try to delete a default Shipping Carrier", async () => {
    await shippingCarrierFlow.DeleteDefaultShippingCarrier(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@myAccount @shippingCarrier @shippingCarrier003 - Try to delete a non default Shipping Carrier", async () => {
    await shippingCarrierFlow.DeleteNonDefaultShippingCarrier(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@myAccount @shippingCarrier @shippingCarrier004 - Add Default Carrier with inactive status Shipping Carrier", async () => {
    await shippingCarrierFlow.AddDefaultCarrierInactivalyShippingCarrier(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@myAccount @shippingCarrier @shippingCarrier005 - Edit Default Carrier with inactive status Shipping Carrier", async () => {
    await shippingCarrierFlow.EditDefaultCarrierStatusToInacive(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@myAccount @shippingCarrier @shippingCarrier006 - Make Non Default Carrier a Default Carrier", async () => {
    await shippingCarrierFlow.EditNonDefaultCarrierADefaultCarrier(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@myAccount @shippingCarrier @shippingCarrier007 - Test All Validaions", async () => {
    await shippingCarrierFlow.TestValidationsofShippingCarrierModal(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });

  test("@myAccount @shippingCarrier @shippingCarrier008 - Add new Carrier With the same Number", async () => {
    await shippingCarrierFlow.AddNewCarrierWithSameName(
      process.env.EMAIL,
      process.env.PASSWORD,
      PAGE_TITLES.HOME,
    );
  });
});
