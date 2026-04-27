// ============================================================
// searchData.js
// Search module test data — fully separate from other data files.
// Covers: keyword search, SKU search, brand filter search,
// autocomplete, product card validation, add-to-cart from search.
// ============================================================

// ==================== PAGE TITLES ====================
export const SEARCH_PAGE_TITLE = "Search Results";

// ==================== SEARCH KEYWORDS ====================
// General small keywords — trigger autocomplete and search results
export const SEARCH_KEYWORDS = {
  CABLE: "cable",
  WIPER: "wiper",
  ANCHOR: "anchor",
  LIGHT: "light",
  THRUSTER: "thruster",
  CHAIN: "chain",
  SWITCH: "switch",
  WINDLASS: "windlass",
  PROPELLER: "propeller",
  TUNNEL: "tunnel",
};

// ==================== SKU / ITEM NUMBER SEARCHES ====================
// Real SKU from screenshot: SM61320-20M (S-Link Cable Backbone, 20M)
export const SEARCH_SKUS = [
  {
    sku: "SM61320-20M",
    expectedProductName: "5-Link Cable Backbone, 20M (65.6 ft)",
    expectedBrand: "SLEIPNER",
    expectedItemNumber: "SM61320-20M",
    expectedListPrice: "$239.00",
    expectedYourPrice: "$239.00",
    expectedTariffAmount: "$59.75",
    expectedStockStatus: "In Stock",
  },
];

// ==================== BRAND FILTER OPTIONS ====================
// All brand names as they appear in the brand dropdown on the search bar
// (screenshot Image 3 — dropdown values in uppercase)
export const SEARCH_BRAND_FILTERS = [
  { dropdownValue: "ALL BRANDS", brandId: "" },
  { dropdownValue: "SLEIPNER", brandId: "308" },
  { dropdownValue: "AUTOANCHOR", brandId: "" },
  { dropdownValue: "EXAL TO WIPERS", brandId: "" },
  { dropdownValue: "ACCO", brandId: "" },
  { dropdownValue: "BECLAWAT", brandId: "" },
  { dropdownValue: "BCM", brandId: "" },
  { dropdownValue: "BESENZONI", brandId: "" },
  { dropdownValue: "BROXE", brandId: "" },
  { dropdownValue: "DECCA", brandId: "" },
  { dropdownValue: "DEN HAAN ROTTERDAM (DHR)", brandId: "" },
  { dropdownValue: "FRENSCH LIGHTING", brandId: "" },
  { dropdownValue: "FYNSPRAY", brandId: "" },
  { dropdownValue: "IMTRA", brandId: "" },
  { dropdownValue: "IMTRA MARINE LIGHTING", brandId: "" },
  { dropdownValue: "INTERVOLT", brandId: "" },
  { dropdownValue: "ISOVER SAINT-GOBAIN", brandId: "" },
  { dropdownValue: "KINGSTON", brandId: "" },
  { dropdownValue: "LIBRA", brandId: "" },
  { dropdownValue: "LILAAS", brandId: "" },
];

// ==================== AUTOCOMPLETE KEYWORDS ====================
// Keywords that should trigger the autocomplete dropdown
// (screenshots Image 4 and Image 5)
export const AUTOCOMPLETE_KEYWORDS = {
  CABLE: {
    keyword: "cable",
    expectedSuggestions: [
      "2 Wiper Control, Roca Switch and Cable Only",
      "Cable Assembly, Y-Cable Special Connect Footswitch/Other Controls",
      "Cable Ends Only (Pair), 4-Wire To Make One Cable Length",
    ],
  },
  WIPER: {
    keyword: "wiper",
    expectedSuggestions: [
      "2 Wiper Control, Roca Switch and Cable Only",
      "3 Wiper Dynamic Control for W10/ W12",
      "CT41 Compact, Full-Function Electronic Wiper Control Switch for One Wiper, 12/24V",
    ],
  },
};

// ==================== PRODUCT CARD FIELDS ====================
// Fields expected on every product card in search results
export const PRODUCT_CARD_FIELDS = {
  BRAND: "brand",
  NAME: "name",
  ITEM_NUMBER: "itemNumber",
  LIST_PRICE: "listPrice",
  YOUR_PRICE: "yourPrice",
  TARIFF_AMOUNT: "tariffAmount",
  STOCK_STATUS: "stockStatus",
};

// ==================== ADD TO CART TEST DATA ====================
export const ADD_TO_CART_DATA = {
  DEFAULT_QUANTITY: 1,
  CUSTOM_QUANTITY: 3,
  SEARCH_KEYWORD: "cable",
};
