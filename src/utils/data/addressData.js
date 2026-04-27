  // ADDRESS TYPE OPTIONS (Checkboxes)
  export const ADDRESS_TYPES = {
    DEFAULT_ADDRESS: "Default Address",
    COMMERCIAL_ADDRESS: "Commercial Address",
    THIRD_PARTY_ADDRESS: "Third Party Address",
  };
  
  // ADDITIONAL OPTIONS (Checkboxes)
  export const ADDITIONAL_OPTIONS = {
    BILLING_ADDRESS: "Billing Address",
    SHIPPING_ADDRESS: "Shipping Address",
  };
  
  // VALID TEST DATA
  export const VALID_ADDRESS_DATA = {
    // For adding new shipping address
    shippingAddress: {
      firstName: "AutoShipping",
      lastName: "Test",
      address1: "123 Test Street",
      address2: "Suite 100",
      companyName: "Test Company LLC",
      city: "New York",
      postalCode: "10001",
      phone: "(555) 123-4567",
      addressType: "Commercial Address",
      isShipping: true,
      isBilling: false,
    },
    // For adding new billing address
    billingAddress: {
      firstName: "AutoBilling",
      lastName: "Test",
      address1: "456 Billing Ave",
      address2: "Floor 2",
      companyName: "Billing Corp",
      city: "Los Angeles",
      postalCode: "90001",
      phone: "(555) 987-6543",
      addressType: "Third-Party Address",
      isShipping: false,
      isBilling: true,
    },
    // For adding combined address (both shipping and billing)
    combinedAddress: {
      firstName: "AutoCombined",
      lastName: "Test",
      address1: "789 Combined Blvd",
      address2: "Unit 5",
      companyName: "Combined Inc",
      city: "Chicago",
      postalCode: "60601",
      phone: "(555) 456-7890",
      addressType: "Commercial Address",
      isShipping: true,
      isBilling: true,
    },
    // For editing address
    editedAddress: {
      firstName: "Updated",
      lastName: "Address",
      address1: "999 Updated Lane",
      address2: "Apt 10",
      companyName: "Updated Company",
      city: "Miami",
      postalCode: "33101",
      phone: "(555) 111-2222",
    },
  };
  
  // ============================================================================
  // INVALID TEST DATA (For validation testing)
  // ============================================================================
  
  export const INVALID_ADDRESS_DATA = {
    emptyFields: {
      firstName: "",
      lastName: "",
      address1: "",
      companyName: "",
      city: "",
      postalCode: "",
      phone: "",
    },

    longValues: {
      firstName: "A".repeat(60),
      lastName: "B".repeat(60),
      address1: "C".repeat(240),
      companyName: "D".repeat(150),
      city: "E".repeat(150),
      phone: "(555) 123"
    },
  };

  // EXPORT DEFAULT
  export default {
    ADDRESS_TYPES,
    ADDITIONAL_OPTIONS,
    VALID_ADDRESS_DATA,
    INVALID_ADDRESS_DATA,
  };