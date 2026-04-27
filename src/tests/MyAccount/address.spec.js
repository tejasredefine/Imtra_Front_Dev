import { test } from "../../utils/fixtures/baseFixtures";
import { AddressFlow } from "../../flows/MyAccount/addressFlow";
import { PAGE_TITLES } from "../../utils/data/metaData";

test.describe("My Account > Address Tab Tests", () => {
  let addressFlow;
  
  // Store address names for chained tests
  let addedShippingAddressName = "";
  let addedBillingAddressName = "";
  let editedAddressName = "";

  test.beforeEach(async ({ page, actions }) => {
    addressFlow = new AddressFlow(page, actions);
  });


  // Add Address Tests
  test("@myAccount @addressTab @address001 - Add a Shipping Address", async () => {
    addedShippingAddressName = await addressFlow.AddShippingAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
  });

  test("@myAccount @addressTab @address002 - Add a Billing Address", async () => {
    addedBillingAddressName = await addressFlow.AddBillingAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
  });

  test("@myAccount @addressTab @address003 - Add Combined Address (Shipping + Billing)", async () => {
    await addressFlow.AddCombinedAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
  });

  // Validation Tests
  test("@myAccount @addressTab @address004 - Test All Add Address Validations", async () => {
    await addressFlow.TestAddAddressValidations(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
  });

  test("@myAccount @addressTab @address005 - Add Address Without Selecting Type Shows Error", async () => {
    await addressFlow.AddAddressWithoutType(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
  });

  test("@myAccount @addressTab @address006 - Add Address With Long Text Validations", async () => {
    await addressFlow.LongTextValidation(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
  });

//   // Edit Address Tests
//   test("@myAccount @addressTab @address007 - Edit Address", async () => {
//     // First add an address to edit
//     const addedName = await addressFlow.AddShippingAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
    
//     // Then edit it
//     editedAddressName = await addressFlow.EditAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME,addedName);
//   });

//   test("@myAccount @addressTab @address008 - Test Edit Address Validations", async () => {
//     // First add an address
//     const addedName = await addressFlow.AddShippingAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME);
    
//     // Test validations on edit
//     await addressFlow.TestEditAddressValidations(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME,addedName);
    
//     // Cleanup - delete the address
//     await addressFlow.DeleteNonPrimaryAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME,addedName);
//   });

  // Delete Address Tests
  test("@myAccount @addressTab @address009 - Delete Shipping Address", async () => {
    await addressFlow.DeleteNonPrimaryAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME,"AutoShipping");
  });
  
  // Delete Address Tests
  test("@myAccount @addressTab @address010 - Delete Combined Shipping Address", async () => {
    await addressFlow.DeleteNonPrimaryAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME,"AutoCombined");
  });
  
  // Delete Address Tests
  test("@myAccount @addressTab @address011 - Delete Billing Address", async () => {
    await addressFlow.DeleteBillingAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME,"AutoBilling");
  });


  // Delete Address Tests
  test("@myAccount @addressTab @address012 - Delete Combined Billing Address", async () => {
    await addressFlow.DeleteBillingAddress(process.env.EMAIL,process.env.PASSWORD,PAGE_TITLES.HOME,"AutoCombined");
  });
});