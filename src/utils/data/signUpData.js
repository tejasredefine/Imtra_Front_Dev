/**
 * Sign Up Page Data - Complete Test Scenarios
 */

// Error messages
export const SIGNUP_ERROR_MESSAGES = {
    // Email errors
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Please enter a valid email address",
    EMAIL_MAX_LENGTH: "Email exceeds the maximum limit of 200 characters",
    EMAIL_ALREADY_EXISTS: "Customer account with this email already exists",
  
    // Username errors
    USERNAME_REQUIRED: "Username is required",
    USERNAME_INVALID: "Username can only contain letters, numbers, and underscores",
    USERNAME_MIN_LENGTH: "Username must be at least 3 characters",
    USERNAME_MAX_LENGTH: "Username exceeds the maximum limit of 50 characters",
  
    // Password errors
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
    PASSWORD_NO_NUMBER: "Password must contain at least one number",
    PASSWORD_NO_LOWERCASE: "Password must contain at least one lowercase letter",
    PASSWORD_NO_UPPERCASE: "Password must contain at least one uppercase letter",
    PASSWORD_NO_SPECIAL: "Password must contain at least one special character",
    PASSWORDS_MUST_MATCH: "Passwords must match",
  
    // Other field errors
    CONFIRM_PASSWORD_REQUIRED: "Confirm Password is required",
    FIRST_NAME_REQUIRED: "First Name is required",
    LAST_NAME_REQUIRED: "Last Name is required",
    PHONE_REQUIRED: "Phone number is required",
    PHONE_INVALID: "Please enter a valid phone number (e.g., (555) 123-4567 or 5551234567)",
    ADDRESS_REQUIRED: "Address is required",
    ADDRESS_MAX_LENGTH: "Address exceeds the maximum limit of 100 characters",
    CITY_REQUIRED: "City is required",
    POSTAL_CODE_REQUIRED: "Postal Code is required",
    POSTAL_CODE_MAX_LENGTH: "Postal Code exceeds the maximum limit of 10 characters",
  };
  
  // Checkbox labels
  export const SIGNUP_CHECKBOXES = [
    "I represent a registered business",
    "Receive our newsletter",
    "Receive Special Offers",
  ];

  // Registered user data (from env)
  export const REGISTERED_USER = {
    email: process.env.EMAIL,
    phone: "(134) 123-1231",
    username: "nikhil_shimpi",
  };
  
  // ============================================================================
  // EMAIL TEST DATA
  // ============================================================================
  export const EMAIL_TEST_DATA = {
    valid: "test@example.com",
    consecutiveDots: "test..email@example.com",
    veryLong: "a".repeat(200) + "@test.com", // 200+ chars
    missingDomain: "test@",
    missingTLD: "test@example",
    noAtSymbol: "testexample.com",
    differentCasing: process.env.EMAIL?.toUpperCase(), // Same email, different case
  };
  
  // ============================================================================
  // USERNAME TEST DATA
  // ============================================================================
  export const USERNAME_TEST_DATA = {
    valid: "testuser123",
    empty: "",
    minLength: "ab", // Less than 3 chars
    onlySpaces: "   ",
    maxLength: "a".repeat(51), // More than 50 chars
    unicode: "tëst_üsér",
    specialChars: "test@user!",
    withSpaces: "automation test",
  };
  
  // ============================================================================
  // PASSWORD TEST DATA
  // ============================================================================
  export const PASSWORD_TEST_DATA = {
    valid: "Test@123",
    empty: "",
    belowMinLength: "Te@1", // Less than 8 chars
    onlySpaces: "        ",
    noNumber: "TestPass@",
    noLowercase: "TESTPASS@123",
    noUppercase: "testpass@123",
    noSpecialChar: "TestPass123",
  };
  
  // ============================================================================
  // PHONE TEST DATA
  // ============================================================================
  export const PHONE_TEST_DATA = {
    valid: "1234567890",
    nonNumeric: "abcdefghij",
    invalid: "(123) 323",
    tooShort: "12345",
  };
  
  // ============================================================================
  // OTHER FIELD TEST DATA
  // ============================================================================
  export const OTHER_FIELD_TEST_DATA = {
    firstName: { valid: "John" },
    lastName: { valid: "Doe" },
    address: { valid: "123 Test Street", maxLength: "A".repeat(101) },
    city: { valid: "New York" },
    postalCode: { valid: "10001", maxLength: "12345678901" },
    companyName: { valid: "Test Company Inc." },
  };