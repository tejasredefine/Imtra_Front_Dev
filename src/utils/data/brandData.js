// ============================================================
// brandData.js
// Brand-specific test data — fully separate from navbar data.
// Each key maps directly to a flow method in brandFlow.js.
// Ordered row by row as seen in the UI (left → right, top → bottom).
// ============================================================

export const BRANDS = {
  //======================= Row 1 ===============================================
  SLEIPNER: {
    title: "Sleipner",
    expectedPageTitle: "Sleipner Boat Stabilizers & Thrusters | Imtra - IMTRA",
    expectedBreadcrumb: "Sleipner"
  },
  AUTO_ANCHOR: {
    title: "AutoAnchor",
    expectedPageTitle:"Boat Anchoring Systems | Windlasses, Rodes, Chains, Lines, and More | Imtra - IMTRA",
      expectedBreadcrumb: "Anchoring"
    },
  EXALTO: {
    title: "Exal to wipers",
    expectedPageTitle: "Exalto Wipers | Imtra - IMTRA",
    expectedBreadcrumb: "Exalto Wipers",
  },  
  ACCO: {
    title: "Acco",
    expectedPageTitle: "Acco - IMTRA",
  },
  BECLAWAT: {
    title: "Beclawat",
    expectedPageTitle: "Beclawat Marine Windows - IMTRA",
  },
  BCM: {
    title: "BCM",
    expectedPageTitle: "BCM Lighting Products | Imtra - IMTRA",
  },

  //======================= Row 2 ===============================================
  BESENZONI: {
    title: "Besenzoni",
    expectedPageTitle: "Besenzoni - IMTRA",
  },
  BROXE: {
    title: "Broxe",
    expectedPageTitle: "Broxe - IMTRA",
  },
  DECCA: {
    title: "Decca",
    expectedPageTitle: "Decca Wipers | Imtra - IMTRA",
  },
  DHR: {
    title: "Den Haan Rotterdam (DHR)",
    expectedPageTitle:"Den Haan Rotterdam (DHR) Navigation Lights and Searchlights - IMTRA",
    expectedBreadcrumb: "Den Haan Rotterdam"
  },
  FRENSCH: {
    title: "Frensch Lighting",
    expectedPageTitle: "Frensch - IMTRA",
  },
  FYNSPRAY: {
    title: "Fynspray",
    expectedPageTitle: "Fynspray - IMTRA",
  },

  //======================= Row 3 ===============================================
  IMTRA: {
    title: "Imtra",
    expectedPageTitle: "Imtra - IMTRA",
  },
  IMTRA_MARINE_LIGHTING: {
    title: "Imtra Marine Lighting",
    expectedPageTitle: "Imtra Marine Lighting - IMTRA",
  },
  INTERVOLT: {
    title: "Intervolt",
    expectedPageTitle: "Intervolt - IMTRA",
  },
  ISOVER: {
    title: "Isover Saint-Gobain",
    expectedPageTitle: "Isover | Imtra - IMTRA",
    expectedBreadcrumb: "Isover"
  },
  KINGSTON: {
    title: "Kingston",
    expectedPageTitle: "Kingston - IMTRA",
    expectedBreadcrumb: "Kingston"
  },
  LIBRA: {
    title: "Libra",
    expectedPageTitle: "LibraPlast - IMTRA",
    expectedBreadcrumb: "LibraPlast"
  },

  //======================= Row 4 ===============================================
  LILAAS: {
    title: "Lilaas",
    expectedPageTitle: "Lilaas Controls | Imtra - IMTRA",
    expectedBreadcrumb: "Lilaas Controls"
  },
  LOFRANS: {
    title: "Lofrans",
    expectedPageTitle: "Lofrans Anchor Windlasses & Parts | Imtra - IMTRA",
  },
  LUMISHORE: {
    title: "Lumishore",
    expectedPageTitle: "Lumishore Underwater Lights | Lighting | Imtra - IMTRA",
  },
  MARINEBEAM: {
    title: "Marinebeam",
    expectedPageTitle: "Marinebeam - IMTRA",
  },
  MUIR: {
    title: "Muir windlasses",
    expectedPageTitle: "Muir Windlass, Parts, Kits, and Capstans | Imtra - IMTRA",
    expectedBreadcrumb: "Muir Windlasses"
  },
  NAUTA: {
    title: "Nauta",
    expectedPageTitle: "Nauta Flexible Tanks | Imtra - IMTRA",
  },

  //======================= Row 5 ===============================================
  NORSAP: {
    title: "Norsap",
    expectedPageTitle: "Norsap | Boat Table Pedestals, Helm Chairs, & More | Imtra - IMTRA",
  },
  PREBIT: {
    title: "Prebit",
    expectedPageTitle: "Prebit Yacht & RV Lighting | Imtra - IMTRA",
  },
  ROCA: {
    title: "Roca",
    expectedPageTitle: "Roca Wipers | Imtra - IMTRA",
    expectedBreadcrumb: "Roca Wipers"
  },
  SEAVIEW: {
    title: "Seaview",
    expectedPageTitle: "Seaview - IMTRA",
    expectedBreadcrumb: "Seaview"
  },
  TRANBERG: {
    title: "Tranberg Lighting",
    expectedPageTitle: "Tranberg Lighting - IMTRA",
  },
  VICTRON: {
    title: "Victron",
    expectedPageTitle: "Victron Energy | Imtra - IMTRA",
  },

  //======================= Row 6 ===============================================
  VIMAR: {
    title: "Vimar",
    expectedPageTitle: "Vimar | Lighting | Imtra - IMTRA",
  },
  VISIONX: {
    title: "VisionX",
    expectedPageTitle: "VisionX - IMTRA",
  },
  ZIPWAKE: {
    title: "Zipwake",
    expectedPageTitle: "Zipwake Boat Trim Control System | Imtra - IMTRA",
  },
};

// Flat array version — used by Navbar.js clickOnEachBrandsDropDownLinks()
// to iterate over all brands without changing that method's existing signature.
export const BRANDS_ARRAY = Object.values(BRANDS);
