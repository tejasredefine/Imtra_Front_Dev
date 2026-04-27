/**
 * MyAccount Module Data
 * Contains all test data for all tabs in MyAccount section
 */

// ============================================================================
// PROFILE TAB DATA
// ============================================================================

// Error Messages for Profile Tab
export const PROFILE_ERROR_MESSAGES = {
    FIRST_NAME_REQUIRED: "First Name is required",
    LONG_FIRST_NAME_REQUIRED: "First Name exceeds the maximum limit of 35 characters.",
    LAST_NAME_REQUIRED: "Last Name is required",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Please enter a valid email address",
    PHONE_REQUIRED: "Primary Phone Number is required",
    CURRENT_PASSWORD_REQUIRED: "Current Password is required",
    NEW_PASSWORD_REQUIRED: "Password is required",
    CONFIRM_PASSWORD_REQUIRED: "Confirm Password is required",
    PASSWORDS_DO_NOT_MATCH: "Passwords don't match",
    INCORRECT_CURRENT_PASSWORD: "Current password is incorrect",
  };
  
  // Valid test data for Profile
  export const VALID_PROFILE_DATA = {
    firstName: "nikhil",
    longFirstname: "nikhilsdadasdsdasdasdasdasdasdasdasdasd",
    lastName: "shimpi",
    email: "Nikhils@redefinesolutions.com",
    primaryPhone: "(134) 123-1231",
    primaryExtension: "123",
    primaryPhoneType: "Primary",
    secondaryPhone: "(555) 987-6543",
    secondaryExtension: "456",
    secondaryPhoneType: "Secondary",
  };
  
  // Invalid test data for validation
  export const INVALID_PROFILE_DATA = {
    email: {
      noAtSymbol: "invalidemail.com",
      noTLD: "test@domain",
      empty: "",
    },
    firstName: {
      empty: "",
    },
    lastName: {
      empty: "",
    },
  };
  
  // Communication Preferences checkboxes
  export const COMMUNICATION_PREFERENCES = [
    "Receive order confirmations",
    "Receive shipping notifications",
    "Receive Copy Of Invoices",
    "Receive Copy Of Statements",
    "Receive Copy Of Payment Confirmations",
  ];
  
  // Password test data
  export const PASSWORD_TEST_DATA = {
    valid: {
      currentPassword: process.env.PASSWORD || "Test@123",
      newPassword: "NewTest@456",
      confirmPassword: "NewTest@456",
    },
    wrongCurrentPassword: {
      currentPassword: "WrongPassword@123",
      newPassword: "NewTest@456",
      confirmPassword: "NewTest@456",
    },
    mismatchedPasswords: {
      currentPassword: process.env.PASSWORD,
      newPassword: "NewTest@456",
      confirmPassword: "DifferentPass@789",
    },
  };
  
  // ============================================================================
  // COMPANY SETTINGS TAB DATA
  // ============================================================================
  
  export const COMPANY_SETTINGS_ERROR_MESSAGES = {
    COMPANY_NAME_REQUIRED: "Company Name is required",
    INVOICING_EMAIL_REQUIRED: "Invoicing Email is required",
    STREET_ADDRESS_REQUIRED: "Street Address is required",
    CITY_REQUIRED: "City is required",
    STATE_REQUIRED: "State is required",
    POSTAL_CODE_REQUIRED: "Postal Code is required",
  };
  
  export const VALID_COMPANY_DATA = {
    companyName: "Test Company Inc.",
    invoicingEmail: "invoices@testcompany.com",
    primaryPhone: "(555) 111-2222",
    secondaryPhone: "(555) 333-4444",
    streetAddress: "123 Main Street",
    addressLine2: "Suite 100",
    city: "New Bedford",
    state: "Massachusetts",
    postalCode: "02740",
    country: "United States",
  };
  
  // ============================================================================
  // USER LOGIN TAB DATA
  // ============================================================================
  
  // Error Messages for User Login Tab
  export const USER_LOGIN_ERROR_MESSAGES = {
    USERNAME_REQUIRED: "Username must be at least 3 characters",
    FIRST_NAME_REQUIRED: "First name is required",
    LAST_NAME_REQUIRED: "Last name is required",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Please enter a valid email address",
    EMAIL_ALREADY_EXISTS:  "Customer account with this email already exists",
    PHONE_REQUIRED: "Enter your Phone Number.",
    ADDRESS_REQUIRED: "Address is required",
  };
  
  // User permissions checkboxes (visible directly on user card)
  export const USER_PERMISSIONS = [
    "Accounts Payable (A/P)",
    "Edit Account Data",
    "Edit Account Logins",
    "Pay Invoices",
    "Place Orders",
  ];
  
  // User communication preferences checkboxes (in Add/Edit User form)
  export const USER_COMMUNICATION_PREFERENCES = [
    "Receive order confirmations",
    "Receive shipping notifications",
    "Receive Copy Of Invoices",
    "Receive Copy Of Statements",
    "Receive Copy Of Payment Confirmations",
  ];
  
  // Test data for User Login tab
  export const USER_LOGIN_TEST_DATA = {
    // Valid new user data for Add User test
    validNewUser: {
      username: "autotest_user",
      firstName: "AutoTest",
      lastName: "UserOne",
      email: "autotest_user@redefinesolutions.com",
      phone: "(123) 456-7890",
    },
    // Updated user data for Edit User test
    updatedUser: {
      firstName: "UpdatedFirst",
      lastName: "UpdatedLast",
    },
    // Existing user for search test
    existingUser: {
      partialName: "nikhil",
      fullName: "nikhil shimpi",
    },
    // Duplicate user data (existing email)
    duplicateUser: {
      username: "duplicate_test",
      firstName: "Duplicate",
      lastName: "Test",
      email: "Nikhils@redefinesolutions.com", // Already exists
      phone: "(123) 456-7890",
    },
    // Address to select (from dropdown)
    address: "345 Park Ave, Waltham, Massachusetts 02451",
  };
  
  // ============================================================================
  // ADDRESS TAB DATA (Future)
  // ============================================================================
  
  export const ADDRESS_ERROR_MESSAGES = {
    ADDRESS_REQUIRED: "Address is required",
    CITY_REQUIRED: "City is required",
    STATE_REQUIRED: "State is required",
    POSTAL_CODE_REQUIRED: "Postal Code is required",
    PHONE_REQUIRED: "Phone is required",
  };
  
  export const VALID_ADDRESS_DATA = {
    firstName: "John",
    lastName: "Doe",
    companyName: "Test Company",
    address1: "456 Oak Avenue",
    address2: "Building B",
    city: "Boston",
    state: "Massachusetts",
    postalCode: "02101",
    country: "United States",
    phone: "(555) 999-0000",
  };
  
  export const ADDRESS_TYPES = {
    SHIPPING: "Shipping Address",
    BILLING: "Billing Address",
  };
  
  // ============================================================================
  // ORDERS TAB DATA (Future)
  // ============================================================================
  
  export const ORDER_STATUS_OPTIONS = [
    "All Status",
    "Open",
    "Invoiced",
    "Shipped",
    "Cancelled",
  ];
  
  export const DATE_RANGE_OPTIONS = [
    "Last 7 Days",
    "Last Month",
    "Last 3 Months",
    "Last Year",
    "Custom Range",
  ];
  
  // ============================================================================
  // COMMON TAB LIST
  // ============================================================================
  
  export const MY_ACCOUNT_TABS = [
    "Profile",
    "Company Settings",
    "User Login",
    "Address",
    "Orders",
    "Returns",
    "Quotes",
    "Shipping Carriers",
    "Tax",
    "Wishlist",
  ];
  
  // ============================================================================
  // EXPORT DEFAULT
  // ============================================================================
  
  export default {
    PROFILE_ERROR_MESSAGES,
    VALID_PROFILE_DATA,
    INVALID_PROFILE_DATA,
    COMMUNICATION_PREFERENCES,
    PASSWORD_TEST_DATA,
    COMPANY_SETTINGS_ERROR_MESSAGES,
    VALID_COMPANY_DATA,
    USER_LOGIN_ERROR_MESSAGES,
    USER_PERMISSIONS,
    USER_COMMUNICATION_PREFERENCES,
    USER_LOGIN_TEST_DATA,
    ADDRESS_ERROR_MESSAGES,
    VALID_ADDRESS_DATA,
    ADDRESS_TYPES,
    ORDER_STATUS_OPTIONS,
    DATE_RANGE_OPTIONS,
    MY_ACCOUNT_TABS,
  };