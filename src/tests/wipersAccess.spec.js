import { test } from "../utils/fixtures/baseFixtures";
import { ListingFlow } from "../flows/listingFlow";
import * as wipersAccessData from "../utils/data/wipersAccessData";

test.describe("Wipers & Access Tests", () => {
    let listingFlow;

    test.beforeEach(async ({ page, actions }) => {
        listingFlow = new ListingFlow(page, actions);
        await listingFlow.navigateToListingPageByNavLinkAndVerify(
            "Wipers & Access",
            "Wipers",
        );
    });

    test("@wipersAccess @wipersAccess001 - Navigate to Wipers & Access Page", async () => {
        console.log("This is already verified in the before each hook");
    });

    test("@wipersAccess @wipersAccess002 - Navigate to Category or SubCategory in Wipers & Access Page", async () => {
        await listingFlow.navigateToCategoryAndAllSubCategoriesInListingPageAndVerify(
            wipersAccessData.listingPageCategories["Wipers & Access"],
        );
    });

    const filterLabel = {
        "Brands": wipersAccessData.listingPageBrands,
        "Insulation Color": wipersAccessData.listingPageInsulationColor,
        "Thickness (mm)": wipersAccessData.listingPageThickness,
        "Finish Filter": wipersAccessData.listingPageFinishFilter,
        "Wiper Series": wipersAccessData.listingPageWiperSeries,
        "Voltage": wipersAccessData.listingPageVoltage,
        "Arm Options": wipersAccessData.listingPageArmOptions,
        "Torque Rating": wipersAccessData.listingPageTorqueRating,
        "Washing Jet Mount Options": wipersAccessData.listingPageWashingJetMountOptions,
        "Washing System Components": wipersAccessData.listingPageWashingSystemComponents,
        "Spare Parts": wipersAccessData.listingPageSpareParts,
        "Control Types": wipersAccessData.listingPageControlTypes,
    };

    const filterSpecialApplicationOverrides = {
        "Finish Filter": [{
            elementIndex: 1,
            elementName: "White",
        }],
    };

    let dynIndex = "003";

    Object.entries(filterLabel).forEach(([key, value]) => {
        test(`@wipersAccess @wipersAccess${dynIndex} - Apply ${key} Filter`, async () => {
            const special = filterSpecialApplicationOverrides[key];

            if (special) {
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(key, value, special);
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(key, value, special, false);
            } else {
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(key, value);
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(
                    key,
                    value,
                    [{ elementIndex: 0, elementName: "" }],
                    false,
                );
            }
        });
        dynIndex = String(Number(dynIndex) + 1).padStart(3, "0");
    });

    test("@wipersAccess @wipersAccess016 - Apply Price Range Filter in Wipers & Access Page", async () => {
        await listingFlow.applyPriceRangeFilterInListingPageAndVerify("Price Range");
    });

    test("@wipersAccess @wipersAccess017 - Apply Sorting Price Low to High in Wipers & Access Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: Low to High", true);
    });

    test("@wipersAccess @wipersAccess018 - Apply Sorting Price High to Low in Wipers & Access Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: High to Low", false);
    });

    test("@wipersAccess @wipersAccess019 - Verify Sorting Product Tag in Wipers & Access Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("New First");
    });

    test("@wipersAccess @wipersAccess020 - Verify Sorting Product Tag in Wipers & Access Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Best Seller First");
    });

    test("@wipersAccess @wipersAccess021 - Verify Sorting Product Tag in Wipers & Access Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Special Order First");
    });

    test("@wipersAccess @wipersAccess022 - Verify Sorting Product Tag in Wipers & Access Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Non Stock First");
    });

    test("@wipersAccess @wipersAccess023 - Verify Sorting Product Tag in Wipers & Access Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Back Order First");
    });

    test("@wipersAccess @wipersAccess024 - Verify Sorting Product Tag in Wipers & Access Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Sale First");
    });

    test("@wipersAccess @wipersAccess025 - Verify Product Tags in Wipers & Access Page to Details Page", async () => {
        await listingFlow.verifyProductTagsInListingPageToDetailsPage();
    });

    test("@wipersAccess @wipersAccess026 - Apply Custom Filters in Wipers & Access Page", async () => {
        await listingFlow.applyCustomFiltersInListingPageAndVerify(wipersAccessData.customFilters);
    });
});
