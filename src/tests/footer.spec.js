import { test, expect } from "../utils/fixtures/baseFixtures";
import { FooterFlow } from "../flows/footerFlow";

test.describe("Footer Tests", () => {
  let footerFlow;

  test.beforeEach(async ({ page, actions }) => {
    footerFlow = new FooterFlow(page, actions);
  });

  // ============================================================================
  // Quick Links Section Tests
  // ============================================================================

   test("@footer @footer001 - About IMTRA Link", async () => {
     await footerFlow.VerifyAboutImtraFooterLink();
   });

   test("@footer @footer002 - Learning Center Link", async () => {
     await footerFlow.VerifyLearningCenterFooterLink();
   });

   test("@footer @footer003 - Careers Link", async () => {
     await footerFlow.VerifyCareersFooterLink();
   });

   test("@footer @footer004 - Partners Link", async () => {
     await footerFlow.VerifyPartnersFooterLink();
   });

   test("@footer @footer005 - Contact Link", async () => {
     await footerFlow.VerifyContactFooterLink();
   });

  test("@footer @footer006 - Document Library Link", async () => {
    await footerFlow.VerifyDocumentLibraryFooterLink();
  });

  // // ============================================================================
  // // Dealer & Company Info Section Tests
  // // ============================================================================

   test("@footer @footer007 - Dealer Login Link", async () => {
     await footerFlow.VerifyDealerLoginFooterLink();
   });

   test("@footer @footer008 - Find a Dealer Link", async () => {
     await footerFlow.VerifyFindADealerFooterLink();
   });

   test("@footer @footer009 - Terms & Conditions Link", async () => {
     await footerFlow.VerifyTermsAndConditionsFooterLink();
   });  

   test("@footer @footer010 - Privacy Policy Link", async () => {
     await footerFlow.VerifyPrivacyPolicyFooterLink();
   });

  // // ============================================================================
  // // Social Media Links Tests
  // // ============================================================================

   test("@footer @footer011 - Facebook Social Link", async () => {
     await footerFlow.VerifySocialMediaLink("facebook");
   });

   test("@footer @footer012 - Instagram Social Link", async () => {
     await footerFlow.VerifySocialMediaLink("instagram");
   });

   test("@footer @footer013 - YouTube Social Link", async () => {
     await footerFlow.VerifySocialMediaLink("youtube");
   });

   test("@footer @footer014 - LinkedIn Social Link", async () => {
     await footerFlow.VerifySocialMediaLink("linkedin");
   });

   test("@footer @footer015 - WhatsApp Social Link", async () => {
     await footerFlow.VerifySocialMediaLink("whatsapp");
   });

  // // ============================================================================
  // // Newsletter Subscription Test
  // // ============================================================================

   test("@footer @footer016 - Newsletter Subscription", async () => {
     await footerFlow.VerifyNewsletterSubscription("test@example.com");
   });

  // // ============================================================================
  // // Comprehensive Footer Tests
  // // ============================================================================

   test("@footer @footer017 - All Quick Links in one go", async () => {
     await footerFlow.VerifyAllQuickLinks();
   });

   test("@footer @footer018 - All Dealer & Company Info Links", async () => {
     await footerFlow.VerifyAllDealerCompanyInfoLinks();
   });
  // test("@footer @footer019 - Complete Footer Verification", async () => {
  //   await footerFlow.VerifyAllFooterLinks();
  // });





  // ============================================================================
  // Document Library Extended Tests
  // ============================================================================
 
  test("@footer @footer020 - Document Library - Select Brand Dropdown", async () => {
    // Example: Select a brand and verify data state
    const result = await footerFlow.VerifyDocumentLibraryDropdownSelection(
      "Select brand(s)",
      "Roca" // brand name
    );
  });
 
  test("@footer @footer021 - Document Library - Select Category Dropdown", async () => {
    const result = await footerFlow.VerifyDocumentLibraryDropdownSelection(
      "Select category(ies)",
      "Clearance Items" // category name
    );
  });
 
  test("@footer @footer022 - Document Library - Select Document Type Dropdown", async () => {
    const result = await footerFlow.VerifyDocumentLibraryDropdownSelection(
      "Select document type(s)",
      "BOL" // document type
    );
  });
 
  test("@footer @footer023 - Document Library - Search Documents", async () => {
    const result = await footerFlow.VerifyDocumentLibrarySearch("Installation");
  });
 
  test("@footer @footer024 - Document Library - Multiple Filters", async () => {
    const result = await footerFlow.VerifyDocumentLibraryWithFilters({
      brand: "Roca",      // brand name
      category: "Clearance Items", // category name
    });
  });






});