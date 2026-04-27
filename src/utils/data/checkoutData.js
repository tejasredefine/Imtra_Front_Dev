/** Test data for checkout flows — adjust to match your environment. */
export const checkoutAddress = {
    firstName: "Erasmus",
    lastName: "Todd",
    companyName: "Chandler Bonner Inc",
    streetAddress: "23 West Milton Road",
    address2: "",
    city: "Todd Spencer",
    country: "United States",
    state: "Alabama",
    postalCode: "31565",
    phone: "(185) 945-4244",
};

export const checkoutOrderMeta = {
    jobName: "Ludan House",
    specialInstructions: "Neque odio quisquam",
};

export const PAGE_TITLES = {
    HOME: "Imtra | Boating, Transportation, Energy & Marine Products",
  };

export const creditCardFieldErrorMessages = ["Credit Card Number is required", "Month is required", "Year is required", "Security Code is required"];
  
export const emailErrorMessages = "Email is not valid";
export const passwordErrorMessages = "Password is required";

export const addressErrorMessages = ["First Name is required", "Last Name is required", "Company Name is required", "Street Address is required", "City is required", "Postal Code is required", "Phone number is required"];

export const newAccountErrorMessage = ["First Name is required","Last Name is required","Password is required","Confirm Password is required"];

export const newAccountData = {
    firstName: "Erasmus",
    lastName: "Todd",
    password: "Password@123",
    verifyPassword: "Password@123",
};

export const emptyNewAccountData = {firstName: "", lastName: "", password: "", verifyPassword: ""};

export const newAddressData = {
    firstName: "updated first name",
    lastName: "updated last name",
    companyName: "updated company name",
    streetAddress: "23 West Milton Road",
    address2: "",
    city: "Todd Spencer",
    country: "United States",
    state: "Alabama",
    postalCode: "31565",
    phone: "(185) 945-4244",
};