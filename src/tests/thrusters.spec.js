import { test } from "../utils/fixtures/baseFixtures";
import { ListingFlow } from "../flows/listingFlow";
import * as thrusterData from "../utils/data/thrusterData";

test.describe("Thrusters Tests", () => {
    let listingFlow;

    test.beforeEach(async ({ page, actions }) => {
        listingFlow = new ListingFlow(page, actions);
        await listingFlow.navigateToListingPageByNavLinkAndVerify("Thrusters", "Thrusters");
    });

    test("@thrusters @thrusters001 - Navigate to Thrusters Page", async () => {
        console.log("this is already verified in the before each hook");
    });

    test("@thrusters @thrusters002 - Navigate to Category or SubCategory in Thrusters Page", async () => {
        await listingFlow.navigateToCategoryAndAllSubCategoriesInListingPageAndVerify(thrusterData.listingPageCategories.Thrusters);
    });

    test("@thrusters @thrusters003 - Apply Brands Filter in Thrusters Page Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Brands", thrusterData.listingPageBrands);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Brands", thrusterData.listingPageBrands, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters004 - Apply Manufacturer Filter in Thrusters Page Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Manufacturer", thrusterData.listingPageManufacturer, [{ elementIndex: 1, elementName: "Sleipner" }]);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Manufacturer", thrusterData.listingPageManufacturer, [{ elementIndex: 1, elementName: "Sleipner" }], false);
    });

    test("@thrusters @thrusters005 - Apply Thickness (mm) Filter in Thrusters Page Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thickness (mm)", thrusterData.listingPageThickness);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thickness (mm)", thrusterData.listingPageThickness, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters006 - Apply Insulation Color Filter in Thrusters Page Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Insulation Color", thrusterData.listingPageInsulationColor);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Insulation Color", thrusterData.listingPageInsulationColor, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters007 - Apply Reconditioned Filter in Thrusters Page Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Reconditioned", thrusterData.listingPageReconditioned);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Reconditioned", thrusterData.listingPageReconditioned, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters008 - Apply Propeller Options Filter in Thrusters Page Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Propeller Options", thrusterData.listingPagePropellerOptions);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Propeller Options", thrusterData.listingPagePropellerOptions, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters009 - Apply Power Supply Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Power Supply", thrusterData.listingPagePowerSupply);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Power Supply", thrusterData.listingPagePowerSupply, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters010 - Apply Thruster Types Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thruster Types", thrusterData.listingPageThrusterTypes);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thruster Types", thrusterData.listingPageThrusterTypes, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters011 - Apply Thrust Rating Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thrust Rating", thrusterData.listingPageThrustRating);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thrust Rating", thrusterData.listingPageThrustRating, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters012 - Apply Propeller Material Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Propeller Material", thrusterData.listingPagePropellerMaterial);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Propeller Material", thrusterData.listingPagePropellerMaterial, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters013 - Apply Cable Systems Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Cable Systems", thrusterData.listingPageCableSystems);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Cable Systems", thrusterData.listingPageCableSystems, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters014 - Apply Thruster Control Options Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thruster Control Options", thrusterData.listingPageThrusterControlOptions);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Thruster Control Options", thrusterData.listingPageThrusterControlOptions, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters015 - Apply Tunnel Material Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Tunnel Material", thrusterData.listingPageTunnelMaterial, [{ elementIndex: 1, elementName: "Composite" }]);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Tunnel Material", thrusterData.listingPageTunnelMaterial, [{ elementIndex: 1, elementName: "Composite" }], false);
    });

    test("@thrusters @thrusters016 - Apply Tunnel Diameter Filter", async () => {
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Tunnel Diameter", thrusterData.listingPageTunnelDiameter);
        await listingFlow.appliedFiltersInListingPageFilterAndVerify("Tunnel Diameter", thrusterData.listingPageTunnelDiameter, [{ elementIndex: 0, elementName: "" }], false);
    });

    test("@thrusters @thrusters017 - Apply Price Range Filter in Thrusters Page", async () => {
        await listingFlow.applyPriceRangeFilterInListingPageAndVerify("Price Range");
    });

    test("@thrusters @thrusters018 - Apply Sorting Price Low to High in Thrusters Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: Low to High", true);
    });

    test("@thrusters @thrusters019 - Apply Sorting Price High to Low in Thrusters Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: High to Low", false);
    });

    test("@thrusters @thrusters020 - Verify Sorting Product Tag in Thrusters Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("New First");
    });

    test("@thrusters @thrusters021 - Verify Sorting Product Tag in Thrusters Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Best Seller First");
    });

    test("@thrusters @thrusters022 - Verify Sorting Product Tag in Thrusters Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Special Order First");
    });

    test("@thrusters @thrusters023 - Verify Sorting Product Tag in Thrusters Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Non Stock First");
    });

    test("@thrusters @thrusters024 - Verify Sorting Product Tag in Thrusters Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Back Order First");
    });

    test("@thrusters @thrusters025 - Verify Sorting Product Tag in Thrusters Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Sale First");
    });

    test("@thrusters @thrusters026 - Verify Product Tags in Thrusters Page to Details Page", async () => {
        await listingFlow.verifyProductTagsInListingPageToDetailsPage();
    });

    test("@thrusters @thrusters027 - Apply Custom Filters in Thrusters Page", async () => {
        await listingFlow.applyCustomFiltersInListingPageAndVerify(thrusterData.customFilters);
    });
});