/**
 * Request Consultation Form Data
 */

// Error messages
export const CONSULTATION_ERROR_MESSAGES = {
    FIRST_NAME_REQUIRED: "First Name is required",
    LAST_NAME_REQUIRED: "Last Name is required",
    COMPANY_NAME_REQUIRED: "Enter your Company Name",
    EMAIL_REQUIRED: "Enter your Email Address.",
    EMAIL_INVALID: "Please enter a valid email address.",
    PHONE_REQUIRED: "Enter your Phone Number.",
    PHONE_INVALID: "Please enter a valid phone number.",
    CONTACT_METHOD_REQUIRED: "Please Select Contact Method.",
    QUANTITY_REQUIRED: "Enter desired quantity.",
    QUANTITY_INVALID: "Please enter a valid quantity",
  };
  
  // Valid test data
  export const VALID_FORM_DATA = {
    firstName: "John",
    lastName: "Doe",
    companyName: "Test Marine Inc.",
    email: "john.doe@testmarine.com",
    phone: "(555) 123-4567",
    preferredContactMethod: "EMAIL",
    desiredQuantity: "5",
    message: "This is a test consultation request.",
  };
  
  // Invalid test data for format validation
  export const INVALID_FORM_DATA = {
    email: {
      noAtSymbol: "johndoetest.com",
      noTLD: "johndoe@test",
      consecutiveDots: "john..doe@test.com",
    },
    phone: {
      tooShort: "(123) 45",
      invalid: "(123) 323",
      nonNumeric: "abcdefghij",
    },
    quantity: {
      negative: "-5",
      zero: "0",
    },
  };
  
  // Dropdown options
  export const CONTACT_METHOD_OPTIONS = ["Email", "Phone", "Text"];