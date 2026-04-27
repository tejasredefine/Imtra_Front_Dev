import { test } from "../utils/fixtures/baseFixtures";
import { ListingFlow } from "../flows/listingFlow";
import * as anchoringData from "../utils/data/anchoringData";
import { isArray } from "util";

test.describe("Anchoring Tests", () => {
    let listingFlow;

    test.beforeEach(async ({ page, actions }) => {
        listingFlow = new ListingFlow(page, actions);
        await listingFlow.navigateToListingPageByNavLinkAndVerify("Anchoring", "Anchoring");
    });

    test("@anchoring @anchoring001 - Navigate to Anchoring Page", async () => {
        console.log("This is already verified in the before each hook");
    });

    test("@anchoring @anchoring002 - Navigate to Category or SubCategory in Anchoring Page", async () => {
        await listingFlow.navigateToCategoryAndAllSubCategoriesInListingPageAndVerify(anchoringData.listingPageCategories.Anchoring);
    });

    const filterLabel = {
        "Brands": anchoringData.listingPageBrands,
        "LED Color": anchoringData.listingPageLedColor,
        "Manufacturer": anchoringData.listingPageManufacturer,
        "Chain Size": anchoringData.listingPageChainSize,
        "Input Voltage Range": anchoringData.listingPageVoltageRange,
        "Control": anchoringData.listingPageControl,
        "Rope size": anchoringData.listingPageRopeSize,
        "Amp Draw": anchoringData.listingPageAmpDraw,
        "Primary Signal": anchoringData.listingPagePrimarySignal,
        "Finish Filter": anchoringData.listingPageFinishFilter,
        "Motor Wattage Range": anchoringData.listingPageMotorWattageRange,
        "Switching Series": anchoringData.listingPageSwitchingSeries,
        "Reconditioned": anchoringData.listingPageReconditioned,
        "Type Approval": anchoringData.listingPageTypeApproval,
        "Chair Base Type": anchoringData.listingPageChairBaseType,
        "Chair Height Adjustment Type": anchoringData.listingPageChairHeightAdjustmentType,
        "Chair Pedestal Type": anchoringData.listingPageChairPedestalType,
        "Footrest Type": anchoringData.listingPageFootrestType,
        "Armrest Size": anchoringData.listingPageArmrestSize,
        "Deck Rail Type": anchoringData.listingPageDeckRailType,
        "Table Pedestal Type": anchoringData.listingPageTablePedestalType,
        "Table Mounting Type": anchoringData.listingPageTableMountingType,
        "Table Base Type": anchoringData.listingPageTableBaseType,
        "Table Base Finish": anchoringData.listingPageTableBaseFinish,
        "Table Height - Min": anchoringData.listingPageTableHeightMin,
        "Table Height - Max": anchoringData.listingPageTableHeightMax,
        "Light Size Range": anchoringData.listingPageLightSizeRange,
        "Vimar Type": anchoringData.listingPageVimarType,
        "Density": anchoringData.listingPageDensity,
        "Thickness (mm)": anchoringData.listingPageThickness,
        "Insulation Color": anchoringData.listingPageInsulationColor,
        "Number of Modules": anchoringData.listingPageNumberOfModules,
        "Stroke Length": anchoringData.listingPageStrokeLength,
        "Propeller Options": anchoringData.listingPagePropellerOptions,
        "Trim Ring (Bezel) Finish": anchoringData.listingPageTrimRingBezelFinish,
        "Power Supply": anchoringData.listingPagePowerSupply,
        "Wiper Series": anchoringData.listingPageWiperSeries,
        "Thruster Types": anchoringData.listingPageThrusterTypes,
        "Thrust Rating": anchoringData.listingPageThrustRating,
        "Pedestal Type": anchoringData.listingPagePedestalType,
        "Windlass Style": anchoringData.listingPageWindlassStyle,
        "Propeller Material": anchoringData.listingPagePropellerMaterial,
        "Shape": anchoringData.listingPageShape,
        "Voltage": anchoringData.listingPageVoltage,
        "Rode Configuration": anchoringData.listingPageRodeConfiguration,
        "Arm Options": anchoringData.listingPageArmOptions,
        "Cable Systems": anchoringData.listingPageCableSystems,
        "Torque Rating": anchoringData.listingPageTorqueRating,
        "Thruster Control Options": anchoringData.listingPageThrusterControlOptions,
        "Washing Jet Mount Options": anchoringData.listingPageWashingJetMountOptions,
        "Tunnel Material": anchoringData.listingPageTunnelMaterial,
        "Tunnel Diameter": anchoringData.listingPageTunnelDiameter,
        "Pedestal Finish": anchoringData.listingPagePedestalFinish,
        "Washing System Components": anchoringData.listingPageWashingSystemComponents,
        "Mounting Style": anchoringData.listingPageMountingStyle,
        "Spare Parts": anchoringData.listingPageSpareParts,
        "Footswitch Options": anchoringData.listingPageFootswitchOptions,
        "Control Types": anchoringData.listingPageControlTypes,
        "Remote Control Modes": anchoringData.listingPageRemoteControlModes,
        "Dimmability": anchoringData.listingPageDimmability,
        "Anchor Roller Types": anchoringData.listingPageAnchorRollerTypes,
        "Windlass Parts": anchoringData.listingPageWindlassParts,
    };

    const filterSpecialApplicationOverrides = {
        "Propeller Material": [{
            elementIndex: 1,
            elementName: "Bronze",
        }],
        "Tunnel Material": [{
            elementIndex: 1,
            elementName: "Composite",
        }],
        "Manufacturer": [{
            elementIndex: 1,
            elementName: "Imtra",
        }],
        "Trim Ring (Bezel) Finish": [{
            elementIndex: 1,
            elementName: "Satin Steel",
        }, {
            elementIndex: 2,
            elementName: "White",
        }, {
            elementIndex: 2,
            elementName: "Polished Stainless Steel",
        },{
            elementIndex: 1,
            elementName: "Brushed Stainless Steel",
        }],
        "Insulation Color": [{
            elementIndex: 1,
            elementName: "White",
        }],
        "Pedestal Type": [{
            elementIndex: 1,
            elementName: "Hydraulic",
        }, {
            elementIndex: 1,
            elementName: "Manual",
        }],
        "Table Pedestal Type": [{
            elementIndex: 1,
            elementName: "Fixed Height",
        },{
            elementIndex: 1,
            elementName: "Adjustable - Manual",
        }],
        "Table Base Finish": [{
            elementIndex: 1,
            elementName: "Polished Stainless Steel",
        },{
            elementIndex: 1,
            elementName: "White Powder Coated",
        }],
        "Table Height - Max": [{
            elementIndex: 1,
            elementName: "10.8-14.9\"",
        },
        {
            elementIndex: 1,
            elementName: "20.0-24.9\"",
        },
        {
            elementIndex: 1,
            elementName: "25.0-29.9\"",
        },
        {
            elementIndex: 1,
            elementName: "30.0-35.4\"",
        }],
        "Shape": [{
            elementIndex: 1,
            elementName: "PVD Brass",
        }],
        "Rope size": [{
            elementIndex: 1,
            elementName: "5/8 in.",
        }, {
            elementIndex: 1,
            elementName: "1/2 in.",
        }],
        "Finish Filter": [{
            elementIndex: 1,
            elementName: "Blue",
        }, {
            elementIndex: 1,
            elementName: "Red",
        }],
        "Pedestal Finish": [{
            elementIndex: 1,
            elementName: "Silver",
        }],
        "Voltage": [{
            elementIndex: 1,
            elementName: "12V",
        },{
            elementIndex: 1,
            elementName: "24V",
        }],
    };

    let dynIndex = "003";

    Object.entries(filterLabel).forEach(([key, value]) => {
        test(`@anchoring @anchoring${dynIndex} - Apply ${key} Filter`, async () => {

            const special = filterSpecialApplicationOverrides[key];

            if (special) {
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(key, value, special);
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(key, value, special, false);
            } else {
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(key, value);
                await listingFlow.appliedFiltersInListingPageFilterAndVerify(key, value, [{ elementIndex: 0, elementName: "" }], false);
            }
        });
        dynIndex = String(Number(dynIndex) + 1).padStart(3, '0');
    });


    test("@anchoring @anchoring065 - Apply Price Range Filter in Anchoring Page", async () => {
        await listingFlow.applyPriceRangeFilterInListingPageAndVerify("Price Range");
    });

    test("@anchoring @anchoring066 - Apply Sorting Price Low to High in Anchoring Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: Low to High", true);
    });

    test("@anchoring @anchoring067 - Apply Sorting Price High to Low in Anchoring Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: High to Low", false);
    });

    test("@anchoring @anchoring068 - Verify Sorting Product Tag in Anchoring Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("New First");
    });

    test("@anchoring @anchoring069 - Verify Sorting Product Tag in Anchoring Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Best Seller First");
    });

    test("@anchoring @anchoring070 - Verify Sorting Product Tag in Anchoring Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Special Order First");
    });

    test("@anchoring @anchoring071 - Verify Sorting Product Tag in Anchoring Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Non Stock First");
    });

    test("@anchoring @anchoring072 - Verify Sorting Product Tag in Anchoring Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Back Order First");
    });

    test("@anchoring @anchoring073 - Verify Sorting Product Tag in Anchoring Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Sale First");
    });

    test("@anchoring @anchoring074 - Verify Product Tags in Anchoring Page to Details Page", async () => {
        await listingFlow.verifyProductTagsInListingPageToDetailsPage();
    });

    test("@anchoring @anchoring075 - Apply Custom Filters in Anchoring Page", async () => {
        await listingFlow.applyCustomFiltersInListingPageAndVerify(anchoringData.customFilters);
    });
});