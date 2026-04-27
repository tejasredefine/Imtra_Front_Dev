# 🎭 Playwright IMTRA Frontend Test Automation Framework

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Framework Architecture](#️-framework-architecture)
- [Folder Structure](#-folder-structure)
- [Design Patterns](#-design-patterns)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Writing Tests](#️-writing-tests)
  - [Test Structure](#test-structure)
  - [Flow Structure](#flow-structure)
  - [Page Structure](#page-structure)
  - [Component Structure](#component-structure)
- [Global Action Methods](#-global-action-methods)
  - [Finding Elements](#finding-elements)
  - [Interactions](#interactions)
  - [Assertions](#assertions)
  - [Waits](#waits)
  - [Navigation](#navigation)
- [Running Tests](#-running-tests)
- [Reports](#-reports)
- [Framework Improvements](#-framework-improvements)
- [Coding](#-coding-standards)
- [Acknowledgments](#-acknowledgments)

## 🎯 Overview

This is a **Playwright-based Test Automation Framework** built for testing the IMTRA frontend application. The framework follows industry best practices with a **layered architecture**, implementing the **Page Object Model (POM)** and **Flow-based test design patterns** to ensure:

- ✅ **Reusability**: Component-based approach eliminates duplication, Maximum code reusability
- ✅ **Readability**: Business logic separated from technical implementation
- ✅ **Maintainability**: Clear separation of concerns with layers
- ✅ **Scalability**: Easy to add new tests and pages

## ✨ Key Features

### 🌟 Core Capabilities

| Feature                           | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| 🌍 **Global Action Methods**      | Use action methods anywhere without imports     |
| 📦 **Page Object Model**          | Organized components, pages, and flows          |
| 🔧 **Fixture-Based Architecture** | Automatic setup and teardown                    |
| ⚙️ **Environment Configuration**  | `.env` based configuration management           |
| 📊 **Multiple Report Formats**    | HTML, JSON, and console reports                 |
| 🔄 **Retry Mechanism**            | Configurable retry attempts for stability       |
| 📸 **Screenshot & Video**         | Automatic capture on failure                    |
| 🎯 **Tag-Based Execution**        | Run specific test groups                        |
| 🚀 **Parallel Execution**         | Configurable parallel test runs                 |
| 🎨 **Clean Architecture**         | Layered design for maintainability              |
| 📦 **5-Layer Architecture**      | Test → Flow → Page → Component → Action Methods |

### 🛠️ Technical Features

- **BasePage Pattern** - Common methods inherited by all pages
- **Constants Management** - Single source of truth for test data
- **Dynamic Navigation** - Random product selection for robust testing
- **Modal Validation** - Reusable popup verification methods
- **Breadcrumb Verification** - Automatic page context validation
- **Network Idle Wait** - Smart waits for stable page loads

## 🏗️ Framework Architecture

The framework follows a **5-layer architecture** where each layer has a specific responsibility:

```
┌─────────────────────────────────────────────────────────────────────┐
│                           TEST LAYER                                │
│  - Test Specifications (login.spec.js)                              │
│  - Test cases with describe/test blocks                             │
│  - Uses Flow layer for business logic                               │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           FLOW LAYER                                │
│  - Business Workflows (loginFlow.js)                                │
│  - Orchestrates multiple page interactions                          │
│  - Contains business logic and test workflows                       │
│  - Reusable across multiple test cases                              │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           PAGE LAYER                                │
│  - Page Objects (loginPage.js)                                      │
│  - Page-specific methods and validations                            │
│  - Aggregates components for complete page                          │
│  - Handles page-level assertions and logics                         │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        COMPONENT LAYER                              │
│  - Reusable UI Components (loginPageComp.js, navLinks.js)           │
│  - Represents specific UI sections                                  │
│  - Reusable across multiple pages                                   │
│  - Encapsulates element interactions                                │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      ACTION METHODS LAYER                           │
│  - Playwright Wrappers (ActionMethods.js)                           │
│  - Low-level Playwright API wrappers                                │
│  - 70+ reusable action methods                                      │
│  - Globally available in all files                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
Automation_Imtra_Front/
│
├── 📁 src/                          # Source code directory
│   │
│   ├── 📁 tests/                    # Test specifications
│   │   └── login.spec.js            # Test cases
│   │
│   ├── 📁 flows/                    # Business logic flows
│   │   └── loginFlow.js             # Workflow orchestration
│   │
│   ├── 📁 pages/                    # Page objects
│   │   └── loginPage.js             # Page methods
│   │
│   ├── 📁 components/               # Reusable UI components
│   │   ├── loginPageComp.js         # Component Files
│   │
│   └── 📁 utils/                    # Utility files
│       │
│       ├── 📁 fixtures/             # Playwright fixtures
│       │   └── baseFixtures.js      # Base test fixtures
│       │
│       └── 📁 helpers/              # Helper utilities
│           └── ActionMethods.js     # Action method wrappers
│
├── 📁 reports/                      # Test reports directory
│   ├── 📁 html/                     # HTML test reports
│   │   └── index.html               # Main HTML report
│   │
│   └── 📁 json/                     # JSON test results
│       ├── results.json             # Aggregated results
│       └── 📁 test-results/         # Individual test artifacts
│           ├── screenshots/         # Failure screenshots
│           ├── videos/              # Failure videos
│           └── traces/              # Playwright traces
│
├── 📄 .env                          # Environment variables (DO NOT commit)
├── 📄 .env-sample                   # Sample environment file
├── 📄 .gitignore                    # Git ignore rules
├── 📄 package.json                  # Dependencies and scripts
├── 📄 package-lock.json             # Locked dependencies
├── 📄 playwright.config.js          # Playwright configuration
└── 📄 README.md                     # This documentation
```

---

## 🎨 Design Patterns

### 1. Page Object Model (POM)

Separates test logic from page structure, making tests more maintainable.
**Benefits:**

- Changes in UI require updates in only one place
- Improved code reusability
- Better test readability

### 2. Component-Based Architecture

Reusable UI components are extracted into separate classes to avoid code duplication.

**Benefits:**

- Components can be used across multiple pages
- Single source of truth for UI elements
- Easier maintenance

### 3. Flow Pattern

Complex business workflows are encapsulated in dedicated flow classes.

**Benefits:**

- Tests focus on "what" not "how"
- Business logic is reusable
- Better collaboration between technical and non-technical team members

### 4. Fixture Pattern

Playwright fixtures handle automatic setup and teardown.

**Benefits:**

- Consistent test environment
- Automatic cleanup
- Global action methods injection

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher (comes with Node.js)
- **Git**: For version control

Check versions:

```bash
node --version
npm --version
git --version
```

### Installation

1. **Clone the repository**

```bash
git clone https://redefine-commerce@dev.azure.com/redefine-commerce/imtra/_git/Automation_Imtra_Front
cd Automation_Imtra_Front
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

### Configuration

1. **Create environment file**

```bash
cp  .env
```

2. **Update `.env` with your configuration**

```env
# Application URL
BASE_URL=https://your-imtra-app-url.com

# Test Credentials
EMAIL=test.user@example.com
PASSWORD=SecurePassword123

# Browser Configuration
HEADLESS=false                    # true for headless, false for headed
TIMEOUT=60000                     # Test timeout in milliseconds
RETRY_ATTEMPTS=1                  # Number of retry attempts on failure
WORKERS=1                         # Number of parallel workers
```

3. **Verify configuration**

```bash
npx playwright test --list
```

---

## ✍️ Writing Tests

### Test Structure

Tests are written in the `src/tests/` directory following this pattern:

```javascript
// src/tests/login.spec.js
import { test, expect } from "../utils/fixtures/baseFixtures";
import { LoginFlow } from "../flows/loginFlow";

test.describe("Login Functionality Tests", () => {
  let loginFlow;

  test.beforeEach(async ({ page, actions }) => {
    // Initialize flow before each test
    loginFlow = new LoginFlow(page, actions);
  });

  test("@login @smoke @TC001 - User can login with valid credentials", async () => {
    await loginFlow.performLoginAndVerify(
      process.env.EMAIL,
      process.env.PASSWORD,
      "IMTRA - Innovative Solutions for Recreational Marine",
    );
  });

  test("@login @TC002 - User cannot login with invalid credentials", async () => {
    await loginFlow.performLogin("invalid@email.com", "wrongpassword");
    // Add assertions for error message
    const errorMsg = await getText(await getByText("Invalid credentials"));
    expect(errorMsg).toBe("Invalid credentials");
  });
});
```

**Test Naming Convention:**

```
@[Module] @[testId] - [Description]

Examples:
@login @login001 - User can login with valid credentials
@checkout @checkout045 - User can complete purchase
```

### Flow Structure

Flows orchestrate business logic and are located in `src/flows/`:

```javascript
// src/flows/loginFlow.js
import { LoginPage } from "../pages/loginPage";

export class LoginFlow {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
    this.loginPage = new LoginPage(page, actions);
  }

  /**
   * Performs login with provided credentials
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async performLogin(email, password) {
    await this.loginPage.clickOnLoginIcon();
    await this.loginPage.verifyLoginPageTitle();
    await this.loginPage.enterEmail(email);
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickOnLoginButton();
  }

  /**
   * Performs login and verifies successful redirection
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} expectedTitle - Expected page title after login
   */
  async performLoginAndVerify(email, password, expectedTitle) {
    await this.performLogin(email, password);
    await this.loginPage.verifyRedirecion(expectedTitle);
  }

  /**
   * Performs logout
   */
  async performLogout() {
    // Implement logout logic
  }
}
```

### Page Structure

Pages represent entire web pages and are located in `src/pages/`:

```javascript
// src/pages/loginPage.js
import { LoginPageComponent } from "../components/loginPageComp";
import { NavLinks } from "../components/NavLinks";

export class LoginPage {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
    this.loginPageComponent = new LoginPageComponent(page, actions);
    this.navLinks = new NavLinks(page, actions);
  }

  /**
   * Clicks on the login icon in navigation
   */
  async clickOnLoginIcon() {
    await this.navLinks.clickOnSignInIcon();
  }

  /**
   * Verifies user is on login page
   */
  async verifyLoginPageTitle() {
    await assertTitle("Sign In - IMTRA");
  }

  /**
   * Enters email in login form
   * @param {string} email - User email
   */
  async enterEmail(email) {
    await this.loginPageComponent.enterEmail(email);
  }

  /**
   * Enters password in login form
   * @param {string} password - User password
   */
  async enterPassword(password) {
    await this.loginPageComponent.enterPassword(password);
  }

  /**
   * Clicks the login button
   */
  async clickOnLoginButton() {
    await this.loginPageComponent.clickOnSignInBtn();
  }

  /**
   * Verifies page redirection after action
   * @param {string} title - Expected page title
   */
  async verifyRedirecion(title) {
    await assertTitle(title);
  }
}
```

### Component Structure

Components are reusable UI elements located in `src/components/`:

```javascript
// src/components/loginPageComp.js
export class LoginPageComponent {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  /**
   * Enters email in the email input field
   * @param {string} email - Email address
   */
  async enterEmail(email) {
    const emailField = await findInputById("LoginEmail");
    await fill(emailField, email);
  }

  /**
   * Enters password in the password input field
   * @param {string} password - Password
   */
  async enterPassword(password) {
    const passwordField = await findInputById("LoginPassword");
    await fill(passwordField, password);
  }

  /**
   * Clicks the sign-in button
   */
  async clickOnSignInBtn() {
    const signInBtn = await findButtonByText("SIGN IN");
    await click(signInBtn);
  }
}
```

```javascript
// src/components/navLinks.js
export class NavLinks {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  /**
   * Clicks on the sign-in icon/link in navigation
   */
  async clickOnSignInIcon() {
    const loginIcon = await findLinkByTitle("Sign In");
    await click(loginIcon);
  }

  /**
   * Clicks on the logout link
   */
  async clickOnLogout() {
    const logoutLink = await findLinkByText("Logout");
    await click(logoutLink);
  }
}
```

---

## 🔧 Global Action Methods

The framework provides **70+ action methods** that are globally available without imports, thanks to the fixture-based architecture.

### Finding Elements

```javascript
// By ID
const input = await findInputById("email");
const button = await findButtonById("submitBtn");

// By Name
const field = await findInputByName("username");
const btn = await findButtonByName("submit");

// By Text
const button = await findButtonByText("Login");
const link = await findLinkByText("Sign Up");
const span = await findSpanByText("Welcome");
const div = await findDivByText("Success");

// By Title/Alt
const link = await findLinkByTitle("Home Page");
const image = await findImageByAlt("Company Logo");
const button = await findButtonByTitle("Submit Form");

// By Test ID
const element = await getByTestId("submit-button");

// By Role
const button = await getByRole("button", "Submit");

// By Placeholder
const input = await getByPlaceholder("Enter email");

// By Label
const input = await getByLabel("Email Address");
const label = await findLabelByText("Password");

// By XPath
const element = await findElementByXpath("//button[@class='submit']");
const elements = await findListOfElementByXpath("//li[@class='item']");
```

### Interactions

```javascript
// Click Actions
await click(locator);
await click(locator, { force: true });
await dblclick(locator);
await rightClick(locator);
await jsClick(locator); // JavaScript click

// Input Actions
await fill(locator, "text to fill");
await type(locator, "text to type", { delay: 100 });
await clearInput(locator);
await setValueByJS(locator, "value"); // Set via JavaScript

// Selection Actions
await selectCheckbox(locator);
await unselectCheckbox(locator);
await selectOption(locator, "option-value");

// Hover and Focus
await hover(locator);
await focus(locator);
await blur(locator);

// Scroll Actions
await scrollIntoView(locator);
await scrollToTop();
await scrollToBottom();
await scrollTo(0, 500);

// Keyboard Actions
await press("Enter");
await press("Escape");
await keyboard("text to type");

// File Upload
await uploadFile(locator, "/path/to/file.pdf");
await uploadImage(locator, "test-image.jpg");
```

### Assertions

```javascript
// Visibility Assertions
await isElementVisible(locator);
await isElementHidden(locator);

// Text Assertions
await isElementHasText(locator, "exact text");
await isElementContainsText(locator, "partial text");

// State Assertions
await isElementEnabled(locator);
await isElementDisabled(locator);

// Value Assertions
await assertValue(locator, "expected value");

// Page Assertions
await assertTitle("Expected Page Title");
await assertURL("https://example.com/page");
await assertURL(/\/dashboard$/); // Regex pattern
```

### Waits

```javascript
// Element State Waits
await waitForVisible(locator);
await waitForHidden(locator);

// Navigation Waits
await waitForURL("/dashboard");
await waitForURL(/\/profile/);
await waitForNavigation(); // Wait for network idle

// Selector Wait
await waitForSelector("#element-id");
await waitForSelector(".class-name", { timeout: 5000 });

// Custom Sleep
await addSleep(2); // Wait for 2 seconds
await addSleep(0.5); // Wait for 500ms
```

### Navigation

```javascript
// Navigate to URL
await navigateToUrl("https://example.com");

// Browser Navigation
await goBack();
await goForward();
await reload();
await refreshPage(); // Same as reload

// Clear URL
await clearUrl(); // Navigate to about:blank

// Get Page Details
const title = await getCurrentTabTitle();
const url = await getCurrentUrl();

// Window Management
await closeCurrentTab();
const newPage = await switchToNewWindow(context);
const page = await switchToTabByTitle(context, "Dashboard");
```

### Get Methods

```javascript
// Get Element Properties
const text = await getText(locator);
const value = await getValue(locator);
const attribute = await getAttribute(locator, "href");
const count = await getelementCount(locator);

// Get Element State
const isEnabled = await isEnabled(locator);
const isDisabled = await isDisabled(locator);
const isChecked = await isSelected(locator);
```

### Alert Handling

```javascript
// Wait for Alert
const alert = await getAlert();

// Handle Alert
await handleAlert("accept");
await handleAlert("dismiss");
await handleAlert("accept", "prompt text");
```

### Retry Mechanism

```javascript
// Retry an action up to 3 times with 2-second wait
await retryAction(
  async () => {
    await click(unstableButton);
  },
  3,
  2,
);
```

> **⚠️ Important:** All `find*` and `getBy*` methods are **async** and must be **awaited**!

---

## 🏃 Running Tests

### Basic Execution

```bash
# Run all tests
npx playwright test

# Run all tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test src/tests/login.spec.js

# Run tests in specific browser
npx playwright test --project=chromium
```

### Tag-Based Execution

```bash
# Run tests with specific tag
npx playwright test --grep @login

# Run smoke tests
npx playwright test --grep @smoke

# Run multiple tags (OR condition)
npx playwright test --grep "@login|@smoke"

# Exclude specific tags
npx playwright test --grep-invert @skip
```

### Parallel Execution

```bash
# Run with 4 parallel workers
npx playwright test --workers=4

# Run sequentially (1 worker)
npx playwright test --workers=1
```

### Debug Mode

```bash
# Run in debug mode with Playwright Inspector
npx playwright test --debug

# Debug specific test
npx playwright test src/tests/login.spec.js --debug

# Debug with headed browser
npx playwright test --headed --debug
```

### Advanced Options

```bash
# Run with specific timeout
npx playwright test --timeout=120000

# Run with retries
npx playwright test --retries=2

# Run specific test by title
npx playwright test -g "successful login"

# Run tests and update snapshots
npx playwright test --update-snapshots

# Run with trace
npx playwright test --trace on
```

---

## 📊 Reports

### HTML Report

The HTML report provides a comprehensive view of test execution with:

- Test results summary
- Detailed test steps
- Screenshots and videos
- Error logs and stack traces

### JSON Report

JSON results are available for CI/CD integration and custom reporting.

**Location:**

```
reports/json/results.json
```

**Example JSON Structure:**

```json
{
  "suites": [...],
  "stats": {
    "total": 10,
    "expected": 8,
    "unexpected": 2,
    "skipped": 0
  }
}
```

### Screenshots

Screenshots are automatically captured on test failure.

**Location:**

```
reports/json/test-results/[test-name]/[screenshot-name].png
```

### Videos

Videos are retained only when tests fail.

**Location:**

```
reports/json/test-results/[test-name]/video.webm
```

### Traces

Playwright traces can be viewed for debugging.

**View Trace:**

```bash
npx playwright show-trace reports/json/test-results/[test-name]/trace.zip
```

---

## 🔄 Framework Improvements

### Recommended Enhancements

#### 1. **Enhanced Reporting (Allure)**

```bash
npm install -D allure-playwright
```

```javascript
// playwright.config.js
reporter: [
  ["html"],
  ["allure-playwright"],
  ["json", { outputFile: "reports/json/results.json" }],
];
```

#### 2. **Performance Testing**

```javascript
// src/utils/helpers/performanceHelper.js
export class PerformanceHelper {
  static async measurePageLoad(page) {
    return await page.evaluate(() => {
      const timing = window.performance.timing;
      return {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
        requestTime: timing.responseEnd - timing.requestStart,
      };
    });
  }
}
```

---

## Coding Standards

- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Follow existing folder structure
- Keep functions small and focused
- Write reusable code

### Pull Request Checklist

- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Code reviewed by peer

### Useful Links

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

## 🎉 Acknowledgments

Thanks to all contributors who have helped build and improve this framework.

---
