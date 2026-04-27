import { test } from "../utils/fixtures/baseFixtures";
import { ListingFlow } from "../flows/listingFlow";
import * as lightingSwitchingData from "../utils/data/lightingSwitchingData";

test.describe("Lighting & Switching Tests", () => {
    let listingFlow;

    test.beforeEach(async ({ page, actions }) => {
        listingFlow = new ListingFlow(page, actions);
        await listingFlow.navigateToListingPageByNavLinkAndVerify(
            "Lighting & Switching",
            "Lighting & Switching",
        );
    });

    test("@lightingSwitching @lightingSwitching001 - Navigate to Lighting & Switching Page", async () => {
        console.log("This is already verified in the before each hook");
    });

    test("@lightingSwitching @lightingSwitching002 - Navigate to Category or SubCategory", async () => {
        await listingFlow.navigateToCategoryAndAllSubCategoriesInListingPageAndVerify(
            lightingSwitchingData.listingPageCategories["Lighting & Switching"],
        );
    });

    const filterLabel = {
        "Brands": lightingSwitchingData.listingPageBrands,
        "LED Color": lightingSwitchingData.listingPageLedColor,
        "Manufacturer": lightingSwitchingData.listingPageManufacturer,
        "Chain Size": lightingSwitchingData.listingPageChainSize,
        "Input Voltage Range": lightingSwitchingData.listingPageVoltageRange,
        "Control": lightingSwitchingData.listingPageControl,
        "Rope size": lightingSwitchingData.listingPageRopeSize,
        "Amp Draw": lightingSwitchingData.listingPageAmpDraw,
        "Primary Signal": lightingSwitchingData.listingPagePrimarySignal,
        "Finish Filter": lightingSwitchingData.listingPageFinishFilter,
        "Motor Wattage Range": lightingSwitchingData.listingPageMotorWattageRange,
        "Switching Series": lightingSwitchingData.listingPageSwitchingSeries,
        "Reconditioned": lightingSwitchingData.listingPageReconditioned,
        "Type Approval": lightingSwitchingData.listingPageTypeApproval,
        "Chair Base Type": lightingSwitchingData.listingPageChairBaseType,
        "Chair Height Adjustment Type": lightingSwitchingData.listingPageChairHeightAdjustmentType,
        "Chair Pedestal Type": lightingSwitchingData.listingPageChairPedestalType,
        "Footrest Type": lightingSwitchingData.listingPageFootrestType,
        "Armrest Size": lightingSwitchingData.listingPageArmrestSize,
        "Deck Rail Type": lightingSwitchingData.listingPageDeckRailType,
        "Table Pedestal Type": lightingSwitchingData.listingPageTablePedestalType,
        "Table Mounting Type": lightingSwitchingData.listingPageTableMountingType,
        "Table Base Type": lightingSwitchingData.listingPageTableBaseType,
        "Table Base Finish": lightingSwitchingData.listingPageTableBaseFinish,
        "Table Height - Min": lightingSwitchingData.listingPageTableHeightMin,
        "Table Height - Max": lightingSwitchingData.listingPageTableHeightMax,
        "Light Size Range": lightingSwitchingData.listingPageLightSizeRange,
        "Vimar Type": lightingSwitchingData.listingPageVimarType,
        "Density": lightingSwitchingData.listingPageDensity,
        "Thickness (mm)": lightingSwitchingData.listingPageThickness,
        "Facing": lightingSwitchingData.listingPageFacing,
        "Insulation Color": lightingSwitchingData.listingPageInsulationColor,
        "Number of Modules": lightingSwitchingData.listingPageNumberOfModules,
        "Stroke Length": lightingSwitchingData.listingPageStrokeLength,
        "Propeller Options": lightingSwitchingData.listingPagePropellerOptions,
        "Trim Ring (Bezel) Finish": lightingSwitchingData.listingPageTrimRingBezelFinish,
        "Power Supply": lightingSwitchingData.listingPagePowerSupply,
        "Wiper Series": lightingSwitchingData.listingPageWiperSeries,
        "Thruster Types": lightingSwitchingData.listingPageThrusterTypes,
        "Thrust Rating": lightingSwitchingData.listingPageThrustRating,
        "Pedestal Type": lightingSwitchingData.listingPagePedestalType,
        "Windlass Style": lightingSwitchingData.listingPageWindlassStyle,
        "Propeller Material": lightingSwitchingData.listingPagePropellerMaterial,
        "Shape": lightingSwitchingData.listingPageShape,
        "Voltage": lightingSwitchingData.listingPageVoltage,
        "Rode Configuration": lightingSwitchingData.listingPageRodeConfiguration,
        "Arm Options": lightingSwitchingData.listingPageArmOptions,
        "Cable Systems": lightingSwitchingData.listingPageCableSystems,
        "Torque Rating": lightingSwitchingData.listingPageTorqueRating,
        "Thruster Control Options": lightingSwitchingData.listingPageThrusterControlOptions,
        "Washing Jet Mount Options": lightingSwitchingData.listingPageWashingJetMountOptions,
        "Tunnel Material": lightingSwitchingData.listingPageTunnelMaterial,
        "Tunnel Diameter": lightingSwitchingData.listingPageTunnelDiameter,
        "Pedestal Finish": lightingSwitchingData.listingPagePedestalFinish,
        "Washing System Components": lightingSwitchingData.listingPageWashingSystemComponents,
        "Mounting Style": lightingSwitchingData.listingPageMountingStyle,
        "Spare Parts": lightingSwitchingData.listingPageSpareParts,
        "Footswitch Options": lightingSwitchingData.listingPageFootswitchOptions,
        "Control Types": lightingSwitchingData.listingPageControlTypes,
        "Remote Control Modes": lightingSwitchingData.listingPageRemoteControlModes,
        "Dimmability": lightingSwitchingData.listingPageDimmability,
        "Anchor Roller Types": lightingSwitchingData.listingPageAnchorRollerTypes,
        "Windlass Parts": lightingSwitchingData.listingPageWindlassParts,
    };

    const filterSpecialApplicationOverrides = {
        "Finish Filter": [
            {
                elementIndex: 1,
                elementName: "Red"
            }, {
                elementIndex: 1,
                elementName: "Blue"
            }
        ],
        "Manufacturer": [
            {
                elementIndex: 1,
                elementName: "BCM"
            }, {
                elementIndex: 1,
                elementName: "Sleipner"
            }, {
                elementIndex: 1,
                elementName: "Vimar"
            }, {
                elementIndex: 1,
                elementName: "Imtra"
            }, {
                elementIndex: 1,
                elementName: "Prebit"
            }
        ],
        "Rope size": [
            {
                elementIndex: 1,
                elementName: "1/2 in."
            }, {
                elementIndex: 1,
                elementName: "5/8 in."
            }
        ],
        "Table Pedestal Type": [
            {
                elementIndex: 1,
                elementName: "Adjustable - Manual"
            }, {
                elementIndex: 1,
                elementName: "Fixed Height"
            }
        ],
        "Table Base Finish": [
            {
                elementIndex: 1,
                elementName: "Polished Stainless Steel"
            }, {
                elementIndex: 1,
                elementName: "White Powder Coated"
            }
        ],
        "Table Height - Max": [
            {
                elementIndex: 1,
                elementName: "10.8-14.9\""
            }, {
                elementIndex: 1,
                elementName: "20.0-24.9\""
            }, {
                elementIndex: 1,
                elementName: "25.0-29.9\""
            }, {
                elementIndex: 1,
                elementName: "30.0-35.4\""
            }
        ],
        "Insulation Color": [
            {
                elementIndex: 1,
                elementName: "White"
            }
        ],
        "Trim Ring (Bezel) Finish": [
            {
                elementIndex: 2,
                elementName: "Polished Stainless Steel"
            }, {
                elementIndex: 2,
                elementName: "White"
            }, {
                elementIndex: 1,
                elementName: "Brushed Stainless Steel"
            }, {
                elementIndex: 1,
                elementName: "Satin Steel"
            }
        ],
        "Pedestal Type": [
            {
                elementIndex: 1,
                elementName: "Hydraulic"
            }, {
                elementIndex: 1,
                elementName: "Manual"
            }
        ],
        "Propeller Material": [
            {
                elementIndex: 1,
                elementName: "Bronze"
            }
        ],
        "Shape": [
            {
                elementIndex: 1,
                elementName: "PVD Brass"
            }
        ],
        "Voltage": [
            {
                elementIndex: 1,
                elementName: "12V"
            }, {
                elementIndex: 1,
                elementName: "24V"
            }
        ],
        "Tunnel Material": [
            {
                elementIndex: 1,
                elementName: "Composite"
            }
        ],
        "Pedestal Finish": [
           {
                elementIndex: 1,
                elementName: "Silver"
            }
        ]
    };

    let dynIndex = "001";

    Object.entries(filterLabel).forEach(([key, value]) => {
        test(`@lightingSwitching @lightingSwitching${dynIndex} - Apply ${key} Filter`, async () => {

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


    test("@lightingSwitching @lightingSwitching066 - Apply Price Range Filter in Lighting & Switching Page", async () => {
        await listingFlow.applyPriceRangeFilterInListingPageAndVerify("Price Range");
    });

    test("@lightingSwitching @lightingSwitching067 - Apply Sorting Price Low to High in Lighting & Switching Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: Low to High", true);
    });

    test("@lightingSwitching @lightingSwitching068 - Apply Sorting Price High to Low in Lighting & Switching Page", async () => {
        await listingFlow.applySortingPriceInListingPageAndVerify("Price: High to Low", false);
    });

    test("@lightingSwitching @lightingSwitching069 - Verify Sorting Product Tag in Lighting & Switching Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("New First");
    });

    test("@lightingSwitching @lightingSwitching070 - Verify Sorting Product Tag in Lighting & Switching Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Best Seller First");
    });

    test("@lightingSwitching @lightingSwitching071 - Verify Sorting Product Tag in Lighting & Switching Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Special Order First");
    });

    test("@lightingSwitching @lightingSwitching072 - Verify Sorting Product Tag in Lighting & Switching Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Non Stock First");
    });

    test("@lightingSwitching @lightingSwitching073 - Verify Sorting Product Tag in Lighting & Switching Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Back Order First");
    });

    test("@lightingSwitching @lightingSwitching074 - Verify Sorting Product Tag in Lighting & Switching Page", async () => {
        await listingFlow.applySortingProductTagInListingPageAndVerify("Sale First");
    });

    test("@lightingSwitching @lightingSwitching075 - Verify Product Tags in Lighting & Switching Page to Details Page", async () => {
        await listingFlow.verifyProductTagsInListingPageToDetailsPage();
    });

    test("@lightingSwitching @lightingSwitching076 - Verify Product Tags in Lighting & Switching Page to Details Page", async () => {
        await listingFlow.verifyProductTagsInListingPageToDetailsPage();
    });

    test("@lightingSwitching @lightingSwitching077 - Apply Custom Filters in Lighting & Switching Page", async () => {
        await listingFlow.applyCustomFiltersInListingPageAndVerify(lightingSwitchingData.customFilters);
    });
});

