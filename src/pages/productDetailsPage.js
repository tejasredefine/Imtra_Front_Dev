import { BasePage } from "./BasePage";
import { CustomerItemNumber } from "../components/cusomerItemNumberModal";

export class ProductDetailsPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.customerItemNumber = new CustomerItemNumber(page, actions);
  }

  async clickOnTheAddYourcustomerItemNumberLink() {
    const button = await this.actions.findButtonByText(
      "Add Your Customer Item Number",
    );
    await this.actions.click(button);
  }

  async clickOnTheEditYourcustomerItemNumberLink() {}

  async clickOnRequestConsultationLink() {
    const button = await this.actions.findButtonByText(
      "Add Your Customer Item Number",
    );
    await this.actions.click(button);
  }

  async clickOnTheLoginButtonInTheCustomerReviewSection() {
    const button = await this.actions.findLinkByTitle("Login");
    await this.actions.click(button);
  }

  async clickOnWhislistIcon() {
    const button = await this.actions.findElementByXpath(
      "//button[@class='absolute top-4 right-4 flex size-6 items-center justify-center transition-opacity hover:opacity-70 z-10']",
    );
    await click(button);
  }

  async removeFromWhislist() {
    const button = await this.actions.findElementByXpath(
      "//button[@class='absolute top-4 right-4 flex size-6 items-center justify-center transition-opacity hover:opacity-70 ']",
    );
    await click(button);
    await this.validateModal(
      "Success",
      "Product removed from wishlist successfully",
    );
  }

  async clickOnAddToCart() {
    this.ClickOnButtonByTagAndText("span", "ADD TO CART");
  }

  async verifyAddCustomerItemNumberPopup(itemNumber) {
    await this.customerItemNumber.verifyAddCustomerItemNumberPopup(itemNumber);
  }

  async enterItemNumberAndSave(itemNumber) {
    const input = await findInputById("customerItemNumber");
    await clearInput(input);
    await fill(input, itemNumber);
    const button = await findButtonByText("Save");
    await click(button);
  }

  async EditCustomerNumberLinkWillNotVisible() {
    // Check if the button exists in DOM
    const button = this.page.locator("button", {
      hasText: "Edit Your Customer Item Number",
    });
    const isVisible = await button.isVisible().catch(() => false);
    if (isVisible) {
      throw new Error(
        "'Edit Your Customer Item Number' link is visible but should NOT be visible",
      );
    }
  }

  async verifyItemNumberAddition(expectedText) {
    // Get the element
    const element = await this.actions.findElementByXpath(
      "//div[@class='flex flex-wrap items-center gap-2 lg:justify-between']//div[@class='text-default text-sm']",
    );

    const actualText = await this.actions.getText(element);

    // Verify expected text is contained in actual text
    if (!actualText.includes(expectedText)) {
      throw new Error(
        `Text validation failed. Expected text "${expectedText}" to be contained in "${actualText}"`,
      );
    }

    console.log(
      `✓ Text verified: "${expectedText}" is contained in "${actualText}"`,
    );
    return actualText;
  }

  async verifyCustomerItemNumberErrorMessage(expectedErrorMessage) {
    // Wait for error message to be visible
    await this.page.waitForSelector("p.mt-1.text-sm.text-red-600", {
      state: "visible",
    });

    // Get the error message element
    const errorElement = await this.page
      .locator("p.mt-1.text-sm.text-red-600")
      .first();

    // Get the actual error message text
    const actualErrorMessage = await errorElement.textContent();

    // Verify error message matches expected
    if (actualErrorMessage !== expectedErrorMessage) {
      throw new Error(
        `Error message mismatch. Expected: "${expectedErrorMessage}" but found: "${actualErrorMessage}"`,
      );
    }

    console.log(`✓ Error message verified: "${actualErrorMessage}"`);
    return true;
  }

  async enterItemNumberAndCancel(itemNumber) {
    const input = await findInputById("customerItemNumber");
    await clearInput(input);
    await fill(input, itemNumber);
    const button = await findButtonByText("Cancel");
    await click(button);
  }

  async addRandomQuantityToCartFromDetailsPage() {
    // Wait for product details to be visible
    await this.page.waitForSelector(
      "div.border-dark.flex.flex-col.gap-4.overflow-hidden.rounded-xl.border.bg-white.p-6.shadow-sm",
      { state: "visible" },
    );

    // Extract Product Name
    const productNameElement = await this.actions.findElementByXpath(
      "//div[@class='text-primary text-xl leading-tight font-semibold lg:text-2xl']//h1",
    );
    const productName = (await productNameElement.textContent()).trim();

    // Extract SKU
    const skuElement = await this.actions.findElementByXpath(
      "//div[@class='text-default text-sm' and contains(text(), 'SKU:')]",
    );
    const sku = (await skuElement.textContent()).replace("SKU:", "").trim();

    // Extract Your Price
    const yourPriceElement = await this.actions.findElementByXpath(
      "//div[@class='text-primary text-lg font-semibold lg:text-2xl']",
    );
    const yourPriceText = (await yourPriceElement.textContent())
      .replace("Your Price:", "")
      .trim();
    const unitPrice = parseFloat(yourPriceText.replace(/[$,]/g, ""));

    // Extract Tariff Amount
    const tariffElement = await this.actions.findElementByXpath(
      "//div[@class='text-default text-lg' and contains(text(), 'Tariff Amount:')]",
    );
    const tariffText = (await tariffElement.textContent())
      .replace("Tariff Amount:", "")
      .replace("(Excluded From Pricing)", "")
      .trim();
    const unitTariff = parseFloat(tariffText.replace(/[$,]/g, ""));

    // Generate random quantity between 2 and 5
    const randomQuantity = Math.floor(Math.random() * 5) + 2;

    // Calculate totals
    const calculatedSubtotal = (unitPrice * randomQuantity).toFixed(2);
    const calculatedTariff = (unitTariff * randomQuantity).toFixed(2);
    const calculatedTotal = (
      parseFloat(calculatedSubtotal) + parseFloat(calculatedTariff)
    ).toFixed(2);

    // Find and fill quantity input
    const quantityInput = await this.page
      .locator("input[aria-label='Quantity']")
      .first();
    await quantityInput.fill(randomQuantity.toString());

    console.log(`✓ Product: ${productName}`);
    console.log(`✓ SKU: ${sku}`);
    console.log(`✓ Quantity: ${randomQuantity}`);
    console.log(`✓ Unit Price: ${yourPriceText}`);
    console.log(`✓ Unit Tariff: ${tariffText}`);

    // Click Add to Cart button
    const addToCartButton = await this.actions.getByRole(
      "button",
      "Add to cart",
    );
    await this.actions.click(addToCartButton);

    // Wait for cart to update
    await this.page.waitForTimeout(2000);

    return {
      productName: productName,
      sku: sku,
      quantity: randomQuantity,
      yourPrice: yourPriceText,
      unitTariff: tariffText,
      calculatedSubtotal,
      calculatedTariff,
      calculatedTotal,
    };
  }

  async verifyCartDetailsOnCartPage(expectedCartData) {
    // Wait for cart page to load
    await this.page.waitForSelector("div.divide-dark.divide-y", {
      state: "visible",
    });

    // Get all cart items
    const cartItems = await this.page
      .locator("div.divide-dark.divide-y > div.grid.grid-cols-1.items-start")
      .all();

    if (cartItems.length === 0) {
      throw new Error("No items found in cart");
    }

    // Find the cart item matching the SKU
    let cartItem = null;
    for (const item of cartItems) {
      const actualSku = (
        await item
          .locator("div.text-default.text-sm")
          .filter({ hasText: "Item:" })
          .first()
          .textContent()
      )
        .replace("Item:", "")
        .trim();
      if (actualSku === expectedCartData.sku) {
        cartItem = item;
        break;
      }
    }

    if (!cartItem) {
      throw new Error(
        `Product with SKU "${expectedCartData.sku}" not found in cart`,
      );
    }

    // Verify Product Name
    const actualProductName = (
      await cartItem
        .locator("a.text-primary.line-clamp-2.text-base.font-semibold")
        .first()
        .textContent()
    ).trim();
    if (actualProductName !== expectedCartData.productName) {
      throw new Error(
        `Product name mismatch: Expected "${expectedCartData.productName}" but found "${actualProductName}"`,
      );
    }
    console.log(`✓ Product Name verified: ${actualProductName}`);

    // Verify Quantity
    const actualQuantity = parseInt(
      await cartItem
        .locator("input[aria-label='Quantity']")
        .first()
        .inputValue(),
    );
    if (actualQuantity !== expectedCartData.quantity) {
      throw new Error(
        `Quantity mismatch: Expected ${expectedCartData.quantity} but found ${actualQuantity}`,
      );
    }
    console.log(`✓ Quantity verified: ${actualQuantity}`);

    // Get the main product section (col-span-7) that contains price and subtotal
    const productSection = await cartItem
      .locator(".col-span-1.flex.flex-col.gap-4.md\\:col-span-7.lg\\:flex-row")
      .first();

    // Verify Price (last flex-col gap-1 in product section)
    const priceDivs = await productSection
      .locator("div.flex.flex-col.gap-1")
      .all();
    const priceSection = priceDivs[priceDivs.length - 1]; // Last section has price and tariff

    const actualPrice = (
      await priceSection
        .locator("div.text-primary.text-base.font-semibold span")
        .first()
        .textContent()
    ).trim();
    if (actualPrice !== expectedCartData.yourPrice) {
      throw new Error(
        `Price mismatch: Expected "${expectedCartData.yourPrice}" but found "${actualPrice}"`,
      );
    }
    console.log(`✓ Price verified: ${actualPrice}`);

    // Verify Tariff (in price section, filter for text containing "Tariff")
    const tariffText = (
      await priceSection
        .locator("div.text-default.text-xs")
        .filter({ hasText: "Tariff" })
        .textContent()
    )
      .replace("+", "")
      .replace("Tariff", "")
      .trim();
    if (tariffText !== expectedCartData.unitTariff) {
      throw new Error(
        `Tariff mismatch: Expected "${expectedCartData.unitTariff}" but found "${tariffText}"`,
      );
    }
    console.log(`✓ Tariff verified: ${tariffText}`);

    // Verify Subtotal (col-span-2 section)
    const subtotalSection = await cartItem
      .locator(
        ".col-span-1.flex.flex-col.items-start.gap-1.lg\\:col-span-2.lg\\:items-end",
      )
      .first();
    const actualSubtotal = (
      await subtotalSection
        .locator("div.text-primary.text-base.font-semibold span")
        .first()
        .textContent()
    )
      .trim()
      .replace(/,/g, "");
    const expectedSubtotal = `$${expectedCartData.calculatedSubtotal}`;
    if (actualSubtotal !== expectedSubtotal) {
      throw new Error(
        `Subtotal mismatch: Expected "${expectedSubtotal}" but found "${actualSubtotal}"`,
      );
    }
    console.log(`✓ Subtotal verified: ${actualSubtotal}`);

    // Verify Order Summary
    const orderSummarySubtotal = (
      await this.page
        .locator("div.flex.items-center.justify-between")
        .filter({ hasText: "Subtotal" })
        .locator("span span")
        .first()
        .textContent()
    )
      .trim()
      .replace(/,/g, "");
    const orderSummaryTariff = (
      await this.page
        .locator("div.flex.items-center.justify-between")
        .filter({ hasText: "Tariff" })
        .locator("span span")
        .first()
        .textContent()
    )
      .trim()
      .replace(/,/g, "");
    const orderSummaryTotal = (
      await this.page
        .locator(
          "div.text-primary.flex.items-center.justify-between.text-lg.font-medium",
        )
        .filter({ hasText: "Total" })
        .locator("span span")
        .first()
        .textContent()
    )
      .trim()
      .replace(/,/g, "");

    if (orderSummarySubtotal !== `$${expectedCartData.calculatedSubtotal}`) {
      throw new Error(
        `Order Summary Subtotal mismatch: Expected "$${expectedCartData.calculatedSubtotal}" but found "${orderSummarySubtotal}"`,
      );
    }
    if (orderSummaryTariff !== `$${expectedCartData.calculatedTariff}`) {
      throw new Error(
        `Order Summary Tariff mismatch: Expected "$${expectedCartData.calculatedTariff}" but found "${orderSummaryTariff}"`,
      );
    }
    if (orderSummaryTotal !== `$${expectedCartData.calculatedTotal}`) {
      throw new Error(
        `Order Summary Total mismatch: Expected "$${expectedCartData.calculatedTotal}" but found "${orderSummaryTotal}"`,
      );
    }

    console.log(
      `✓ Order Summary verified - Subtotal: ${orderSummarySubtotal}, Tariff: ${orderSummaryTariff}, Total: ${orderSummaryTotal}`,
    );
    console.log("✓ All cart details verified successfully on Cart Page");
    return true;
  }

  async ImportantWarningSecionTest() {
    const link = await findLinkByText("www.P65Warnings.ca.gov");
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      await click(link),
    ]);

    await addSleep(2);
    const newPageTitle = await newPage.title();
    if (!newPageTitle.includes("Proposition 65 Warnings Website")) {
      throw new Error(
        `Expected title to contain "Proposition 65 Warnings Website" but found "${newPageTitle}"`,
      );
    }
    console.log(`✓ New tab verified: ${newPageTitle}`);
  }

  async clickOnWriteAReviewAndVerifyPageRedirection() {
    await scrollTo(0, 800);
    await scrollTo(0, 300);
    const button = await this.actions.findLinkByTitle("Write a review");
    const title = await findElementByXpath("//h1");
    const productName = await getText(title);
    await this.actions.click(button);
    await addSleep(2);
    await this.verifyPageHeader("a", productName);
  }

  async AddaReviewDetailsTestCases() {
    // Wait for review form to be visible
    await this.page.waitForSelector("form", { state: "visible" });

    const reviewData = {
      description: "This is testing data please remove, reject or delete it.",
      headline: "This is testing data please remove, reject or delete it.",
      rating: 4, // Rate 4 out of 5 stars
    };

    // Step 1: Select star rating
    const starButton = await this.page.locator(
      `button[aria-label='Rate ${reviewData.rating} out of 5 stars']`,
    );
    await starButton.click();
    console.log(`✓ Selected ${reviewData.rating} star rating`);

    // Step 2: Fill description
    const descriptionField = await this.page.locator("#description");
    await descriptionField.fill(reviewData.description);
    console.log("✓ Description filled");

    // Step 3: Fill headline
    const headlineField = await this.page.locator("#headline");
    await headlineField.fill(reviewData.headline);
    console.log("✓ Headline filled");

    // Step 4: Click CLEAR button
    const clearButton = await this.page.locator("button[name='CLEAR']");
    await clearButton.click();
    console.log("✓ Clear button clicked");

    // Step 5: Verify all fields are cleared
    const descriptionValue = await descriptionField.inputValue();
    const headlineValue = await headlineField.inputValue();

    if (descriptionValue !== "") {
      throw new Error(`Description not cleared. Found: "${descriptionValue}"`);
    }
    if (headlineValue !== "") {
      throw new Error(`Headline not cleared. Found: "${headlineValue}"`);
    }
    console.log("✓ All fields cleared successfully");

    // Step 6: Verify stars are reset (all should be gray/unfilled)
    const filledStars = await this.page
      .locator("svg.fill-yellow-400, svg.fill-yellow-500")
      .count();
    if (filledStars > 0) {
      throw new Error(`Stars not cleared. Found ${filledStars} filled stars`);
    }
    console.log("✓ Star rating cleared");

    // Step 7: Fill form again
    await starButton.click();
    await descriptionField.fill(reviewData.description);
    await headlineField.fill(reviewData.headline);
    console.log("✓ Form filled again after clear");

    // Step 8: Click Submit button
    const submitButton = await this.page.locator("button[name='Submit']");
    await submitButton.click();
    console.log("✓ Submit button clicked");

    await this.validateModal("Success", "Review submitted successfully");
  }

  async ValidateErrorMessageReviewDetailsPage() {
    await this.page.waitForSelector("form", { state: "visible" });

    // ========== Test 1: Click Submit without filling anything =================
    await this.page.locator("button[name='Submit']").click();
    let descError = await this.page
      .locator("p.mt-1.text-sm.text-red-600")
      .filter({ hasText: "Description is required" })
      .textContent();
    let headError = await this.page
      .locator("p.mt-1.text-sm.text-red-600")
      .filter({ hasText: "Headline is required" })
      .textContent();

    if (!descError.includes("Description is required")) {
      throw new Error("Expected 'Description is required' error not found");
    }
    if (!headError.includes("Headline is required")) {
      throw new Error("Expected 'Headline is required' error not found");
    }
    console.log("✓ Required field errors verified");

    // ========= Test 2: Add only 3 characters in description ====================
    await this.page.locator("#description").fill("abc");
    await this.page.locator("#headline").fill("xyz");
    await this.page.locator("button[name='Submit']").click();

    // Verify "Description must be at least 15 characters long"
    descError = await this.page
      .locator("p.mt-1.text-sm.text-red-600")
      .filter({ hasText: "at least 15 characters" })
      .textContent();
    headError = await this.page
      .locator("p.mt-1.text-sm.text-red-600")
      .filter({ hasText: "at least 5 characters" })
      .textContent();

    if (!descError.includes("at least 15 characters")) {
      throw new Error("Expected 'at least 15 characters' error not found");
    }
    if (!headError.includes("at least 5 characters")) {
      throw new Error("Expected 'at least 5 characters' error not found");
    }
    console.log("✓ Minimum length error verified");

    // =========== Test 3: Add more than 1000 characters in description and more than 200 in headline ==================
    const longDescription = "A".repeat(1001);
    const longHeadline = "B".repeat(201);

    await this.page.locator("#description").fill(longDescription);
    await this.page.locator("#headline").fill(longHeadline);
    await this.page.locator("button[name='Submit']").click();
    await this.page.waitForTimeout(500);

    descError = await this.page
      .locator("p.mt-1.text-sm.text-red-600")
      .filter({ hasText: "must not exceed 1000 characters" })
      .textContent();
    headError = await this.page
      .locator("p.mt-1.text-sm.text-red-600")
      .filter({ hasText: "must not exceed 200 characters" })
      .textContent();

    if (!descError.includes("must not exceed 1000 characters")) {
      throw new Error(
        "Expected 'must not exceed 1000 characters' error not found",
      );
    }

    if (!headError.includes("must not exceed 200 characters")) {
      throw new Error(
        "Expected 'must not exceed 200 characters' error not found",
      );
    }
    console.log("✓ Description and Heading max length error verified");
  }
}
