import { BasePage } from "./BasePage";
import { QuoteNoteModal } from "../components/quoteNoteModal";
import { CartPage } from "./cartPage";
import { HomePage } from "./homePage";
import { error } from "node:console";

export class QuotePage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.quoteNoteModal = new QuoteNoteModal(page, actions);
    this.cartPage = new CartPage(page, actions);
    this.homepage = new HomePage(page, actions);
  }

  async AddaQuote() {
    // Step 1: Capture cart data BEFORE converting
    const cartData = await this.quoteNoteModal.getAllCartProductDetails();
    console.log(`Captured ${cartData.length} items from cart`);

    // Step 2: Fill note and submit
    await this.quoteNoteModal.verifyModalOpen();
    await this.quoteNoteModal.fillNote("This Quote is for Testing Purpose.");
    await this.quoteNoteModal.clickSave();
    await addSleep(2);

    // Step 3: Navigate to quote details
    await this.verifyPageTitle("IMTRA - Quotes");
    console.log("Redirected To the Quote Page");
    await addSleep(4);
    await this.quoteNoteModal.clickOnFirstQuoteInTheTable();
    await addSleep(2);
    await this.verifyPageTitle("IMTRA - Quote Details");

    // Step 4: Capture quote data and verify against cart data
    const quoteData = await this.quoteNoteModal.getQuoteProductDetails();
    await this.quoteNoteModal.VerifyQuoteAndCartData(cartData, quoteData);
  }

  async ConvertQuoteToCart() {
    // Step 1: Redirect to the Quote Details Page
    await addSleep(2);
    await this.quoteNoteModal.clickRandomPendingEyeButton();
    await addSleep(2);
    await this.verifyPageTitle("IMTRA - Quote Details");

    // Step 2: Get All the Quote Details and Click on the Conver To Cart Button
    const quoteData = await this.quoteNoteModal.getQuoteProductDetails();
    await this.ClickOnButtonByTagAndText("button", "Convert to Cart");
    await this.validateModal(
      "Success",
      `Added ${quoteData.length} item(s) to cart.`,
    );
    await this.quoteNoteModal.clickOnModalcloseButton();

    // Step 3: Navigate to the Cart Page
    await this.cartPage.clickOnCartIconinNavbar();
    await this.ClickOnButtonByTagAndText("a", "Go To Cart");
    await addSleep(2);
    await this.verifyPageTitle("Cart - IMTRA");

    // step 4: get Cart Data and Verify
    const cartData = await this.quoteNoteModal.getAllCartProductDetails();
    console.log(`Captured ${cartData.length} items from cart`);
    await this.quoteNoteModal.VerifyQuoteAndCartData(cartData, quoteData);
  }

  async ClickOnDeleteAndVerify() {
    const button = await findElementByXpath("(//button[@title='Remove'])[1]");
    await click(button);
    await this.validateModal(
      "Alert",
      "Are you sure you want to remove this item?",
    );
    await this.ClickOnButtonByTagAndText("Button", "yes");
    await addSleep(1);
    await this.validateModal(
      "Error",
      "Items from quotes cannot be deleted. Please contact sales to modify the quote.",
    );
  }

  async GetCartItemAndConverNewQuoteToCartAndSeeTheCartItemConvertedToQuote() {
    // Step 1: Get Cart Data Before Converting The Quote to Cart
    const cartData = await this.quoteNoteModal.getAllCartProductDetails();
    console.log(`Captured ${cartData.length} items from cart`);

    // Step 2: Navigate to Quote Page
    await this.homepage.clickOnTheQuote();
    await addSleep(3);
    await this.verifyPageTitle("IMTRA - Quotes");

    // Step 3: Convert any pending Quote to Cart
    await this.quoteNoteModal.clickRandomPendingEyeButton();
    await addSleep(2);
    await this.verifyPageTitle("IMTRA - Quote Details");
    await this.ClickOnButtonByTagAndText("button", "Convert to Cart");
    await this.quoteNoteModal.clickOnModalcloseButton();
    await this.homepage.clickOnTheQuote();
    await addSleep(2);

    // step 4: Check the first Quote and Verify the details
    await reload();
    await this.quoteNoteModal.clickOnFirstQuoteInTheTable();
    await addSleep(2);
    await this.verifyPageTitle("IMTRA - Quote Details");
    const quoteData = await this.quoteNoteModal.getQuoteProductDetails();
    await this.quoteNoteModal.VerifyQuoteAndCartData(cartData, quoteData);
  }

  async clickOnMinusIconInCartItems() {
    await addSleep(1);
    const plusButton = await findElementByXpath(
      "(//button[@aria-label='Increase quantity'])[1]",
    );
    await click(plusButton);
    console.log("Increase Button Clicked");
    await addSleep(3); // Wait for the api hit and Ui updation
    const minusButton = await findElementByXpath(
      "(//button[@aria-label='Decrease quantity'])[1]",
    );
    await click(minusButton);
    console.log("Decrease Button Clicked");
    await this.validateModal(
      "Error",
      "Items from quotes cannot have their quantity decreased. Please contact sales.",
    );
    console.log(
      "The Error Popup Appeared with the message: Items from quotes cannot have their quantity decreased. Please contact sales.",
    );
  }

  async ClickOnTheDecreasebuttonofNewlyAddedProductAndClickOnDeleteButtonOfNewlyAddedProduct(
    productName,
  ) {
    await addSleep(1);
    const productList = await findElementByXpath(
      "//div[contains(@class,'divide-dark')]/div",
    );
    const count = await productList.count();
    if (count === 0) {
      throw new Error("Cart is empty – no products found.");
    }

    for (let i = 0; i < count; i++) {
      const product = productList.nth(i);
      // product name element inside each block
      const nameLocator = product.locator(
        "a.text-primary.text-base.font-semibold",
      );

      const name = (await nameLocator.textContent())?.trim();

      if (name === productName) {
        console.log(`✓ Product found: ${productName}`);

        const plusBtn = product.locator(
          "button[aria-label='Increase quantity']",
        );
        await plusBtn.click(); // Increase the Quantity First
        console.log("Increase Button Clicked");
        await addSleep(3);

        const minusBtn = product.locator(
          "button[aria-label='Decrease quantity']",
        );
        await minusBtn.click(); // Try To Decrease Quantity
        await addSleep(3);
        console.log("Decrease Button Clicked");

        // delete button
        const deleteBtn = product.locator("button[aria-label='Remove item']");
        await deleteBtn.click();
        await addSleep(3);

        await this.validateModal(
          "Alert",
          "Are you sure you want to remove this item?",
        );
        await this.ClickOnButtonByTagAndText("button", "Yes");
        await addSleep(1);
        await this.validateModal(
          "Success",
          "Item removed from cart successfully",
        );
        console.log(`${productName} Deleted Successfully`);
        i = count;
      }
    }
  }

  async selectOptionFromDorpdownandVerifyStatus(allowedStatuse) {
    // Select the Status From DropDown
    await this.page.selectOption("#quote-status-filter", allowedStatuse);
    await addSleep(3); // Wait for the api hit and Ui updation
    const rows = this.page.locator("tbody tr");
    const rowCount = await rows.count();
    if (rowCount === 0) {
      throw new Error(`No quote found with the status ${allowedStatuse}`);
    }

    // Check each and Every Quote Item Status
    for (let i = 0; i < rowCount; i++) {
      const statusLocator = rows.nth(i).locator("td span");
      const status = (await statusLocator.textContent())?.trim();

      if (!allowedStatuse.includes(status)) {
        throw new Error(
          `❌ Invalid status found at row ${i + 1}: "${status}" (allowed: ${allowedStatuse})`,
        );
      }
    }
  }

  async clickOnAddToQuoteButtonAndValidateValidationMessages() {
    //Click on the Add to Quote button and verify the message
    await this.ClickOnButtonByTagAndText("button", "ADD TO QUOTE");
    await this.quoteNoteModal.verifyModalOpen();
    await this.quoteNoteModal.clickSave();

    await this.quoteNoteModal.validateErrorMessage("Note is required");
    await addSleep(1);

    await this.quoteNoteModal.fillNote(
      "This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Purpose.This Quote is for Testing Whrigandfiam laviosa furrrs furrs",
    );
    await this.quoteNoteModal.validateErrorMessage(
      "Note exceeds the maximum limit of 500 characters",
    );
  }
}
