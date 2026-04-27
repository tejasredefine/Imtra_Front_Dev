import { BasePage } from "./BasePage";
import { CartSidebar } from "../components/cartSidebar";
import { NavLinks } from "../components/navLinks";
import { AddNoteModal } from "../components/addNotemodal";
import { Whislist } from "../components/wishlist";

export class CartPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.cartSidebar = new CartSidebar(page, actions);
    this.navLinks = new NavLinks(page, actions);
    this.addNoteModal = new AddNoteModal(page, actions);
    this.wishlist = new Whislist(page, actions);
  }

  async verifyCartSidebarCalculations() {
    await this.cartSidebar.verifyCartSidebarCalculations();
  }

  async cartSidebarItemRemove() {
    await this.cartSidebar.cartSidebarItemRemove();
  }

  async NavigateToCartPageAndVerifyDetailsOfSidebarAndCartPage() {
    await this.cartSidebar.NavigateToCartPageAndVerifyDetailsOfSidebarAndCartPage();
  }

  async clickOnCartIconinNavbar() {
    await this.navLinks.clickOnCartIcon();
  }

  async clickOnAddToCartAndVerifyTheCartDetails() {
    const cartData =
      await this.cartSidebar.addRandomQuantityToCartFromListingPage();
    await this.cartSidebar.verifyCartDetails(cartData);
  }

  async EmptyCartSidebarTesting(pageTitle) {
    await this.page.waitForSelector(
      "div[role='dialog'][aria-label='Shopping cart']",
      { state: "visible" },
    );
    const startShoppingButton = await this.page.locator(
      "a.btn.btn-sm.btn-primary[title='Start Shopping']",
    );
    const isButtonVisible = await startShoppingButton.isVisible();
    if (!isButtonVisible) {
      throw new Error("Start Shopping button is not visible");
    }
    console.log("✓ Start Shopping button is visible");
    await startShoppingButton.click();
    await this.verifyPageTitle(pageTitle);
  }

  async verifyProductInCartIsMarkedAsWishlist(productName) {
    // Wait for cart items to load
    await this.page.waitForSelector("div.divide-dark.divide-y", {
      state: "visible",
    });

    // Get all cart item rows
    const cartItems = await this.page
      .locator("div.divide-dark.divide-y > div.grid.grid-cols-1.items-start")
      .all();

    if (cartItems.length === 0) {
      throw new Error("No items found in cart");
    }

    // Find the cart item with matching product name
    let matchingItem = null;
    for (const item of cartItems) {
      const itemProductName = await item
        .locator("a.text-primary.line-clamp-2.text-base.font-semibold")
        .first()
        .textContent();

      if (itemProductName.trim() === productName.trim()) {
        matchingItem = item;
        break;
      }
    }

    if (!matchingItem) {
      throw new Error(`Product "${productName}" not found in cart`);
    }

    console.log(`✓ Product "${productName}" found in cart`);

    // Check if the wishlist button is marked (filled icon)
    const wishlistButton = matchingItem
      .locator("button")
      .filter({ hasText: /Save for later|Saved for later/ })
      .first();

    // Get the SVG element inside the button
    const wishlistSvg = wishlistButton.locator("svg").first();

    // Check if the SVG has fill="#0C2E4A" (marked as wishlist)
    const fillAttribute = await wishlistSvg.getAttribute("fill");

    if (fillAttribute === "#0C2E4A") {
      console.log(
        `✓ Product "${productName}" is marked as wishlist (Saved for later)`,
      );
      return true;
    } else if (fillAttribute === "none") {
      throw new Error(
        `Product "${productName}" is NOT marked as wishlist. Expected filled icon but found empty icon.`,
      );
    } else {
      throw new Error(
        `Unexpected wishlist icon state for product "${productName}". Fill attribute: ${fillAttribute}`,
      );
    }
  }

  async addANote(testNote) {
    await this.addNoteModal.clickFirstProductAddNote();
    await this.addNoteModal.verifyModalOpen();
    await this.addNoteModal.fillNote(testNote);
    await this.addNoteModal.clickSave();
    await this.validateModal("Success", "Note added to item successfully");
    await addSleep(1);
    await this.addNoteModal.clickOnModalcloseButton();
    await this.addNoteModal.verifyNoteDisplayedOnProduct(testNote);
  }

  async editNote(testNote, oldtestNote) {
    await this.addNoteModal.clickFirstProductEditNote();
    await this.addNoteModal.verifyModalOpen(oldtestNote);
    await this.addNoteModal.fillNote(testNote);
    await this.addNoteModal.clickCancel();
    await this.addNoteModal.verifyNoteDisplayedOnProduct(oldtestNote);
    await this.addNoteModal.clickFirstProductEditNote();
    await this.addNoteModal.verifyModalOpen(oldtestNote);
    await this.addNoteModal.fillNote(testNote);
    await this.addNoteModal.clickSave();
    await this.validateModal("Success", "Note added to item successfully");
    await addSleep(1);
    await this.addNoteModal.clickOnModalcloseButton();
    await this.addNoteModal.verifyNoteDisplayedOnProduct(testNote);
  }

  async tryToDeleteNote(oldtestNote) {
    await this.addNoteModal.clickFirstProductEditNote();
    await this.addNoteModal.verifyModalOpen(oldtestNote);
    await this.addNoteModal.fillNote(" ");
    await this.addNoteModal.clickSave();
    await this.addNoteModal.verifyNoteRequiredError("Note is required");
    await this.addNoteModal.clickCancel();
  }

  async tryToAddMoreThan500LettersInANote(oldtestNote) {
    await this.addNoteModal.clickFirstProductEditNote();
    await this.addNoteModal.verifyModalOpen(oldtestNote);
    await this.addNoteModal.fillNote(
      "Lorem Isupum Lo n hedoro niturm Lorem Isuputm putin were gojo hedoro nitoredorurmLorem Isoredortm putin wro niturmLorem IsupniturmLorem Isuputmgojo heedoro nm Isudutin were gojo hedoro niturmLorem Isuputm putin were gojo hedoro niem were gojo he Isuputm putin were gojo hedoro niturmLorem Isuputm putin were gojo hedoro niturmLorem Isuputm putin were gojo hedoro niturmLoedoro n Isuputm putin werputm putin were gojo hero niturmLorem Isuputm putin were gojo hedoro niedoro n pe gojo heddkkhhuaouieklol",
    );
    await this.addNoteModal.clickSave();
    await this.addNoteModal.verifyNoteRequiredError(
      "Note exceeds the maximum limit of 500 characters",
    );
  }

  async clickOnSaveForLaterButtonAndVerifyitIntheWhislistPage() {
    await this.wishlist.clickOnSaveForLaterButtonAndVerifyitIntheWhislistPage();
  }

  async VerifyClearAllButtonFuntionality() {
    const clearAllButton = await findElementByXpath(
      "//button[text()='CLEAR ALL']",
    );
    await click(clearAllButton);
    await this.validateModal(
      "Confirm",
      "Are you sure you want to clear all items from your cart?",
    );
    await this.ClickOnButtonByTagAndText("span", "Cancel");
    const productCards = await findElementByXpath(
      "//div[contains(@class, 'grid-cols-12') and .//a[contains(@href, '/product/')]]",
    );
    if (productCards.length === 0) {
      throw new Error(
        "Products should still be present in cart after clicking Cancel on Clear All",
      );
    }

    console.log(
      `✅ Verified: ${productCards.length} products are still in the cart after Cancel`,
    );

    await click(clearAllButton);
    await this.validateModal(
      "Confirm",
      "Are you sure you want to clear all items from your cart?",
    );

    // Click Yes/Confirm this time
    await this.ClickOnButtonByTagAndText("button", "Yes");

    await this.validateModal("Success", "Cart cleared successfully");
    await this.addNoteModal.clickOnModalcloseButton();
    await this.ClickOnButtonByTagAndText("a", "START SHOPPING");
    await addSleep(2);
  }

  async DeleteSingleItem() {
    const deleteIcon = await findElementByXpath("//button[@title='Remove']");
    click(deleteIcon);
    await this.validateModal(
      "Alert",
      "Are you sure you want to remove this item?",
    );
    await this.ClickOnButtonByTagAndText("span", "Cancel");

    const productCards = await findElementByXpath(
      "//div[contains(@class, 'grid-cols-12') and .//a[contains(@href, '/product/')]]",
    );
    if (productCards.length === 0) {
      throw new Error(
        "Products should still be present in cart after clicking Cancel",
      );
    }
    click(deleteIcon);
    await this.validateModal(
      "Alert",
      "Are you sure you want to remove this item?",
    );
    await this.ClickOnButtonByTagAndText("button", "Yes");
    await this.validateModal("Success", "Item removed from cart successfully");
  }

  // ==== Cart Quaniy change and Calculaion Verification Test ==========
  async verifyTheQuantityChangeActions() {   // ← Also fixed spelling: Varify → Verify

    // Get Cart Item and Product name
    const cartItem = await findElementByXpath('//div[@class="divide-dark divide-y"]/div');
    const productName = await getText(cartItem.locator("a.text-primary.line-clamp-2").first());
    console.log(`Product: ${productName}`);

    // === Extract Unit Price and Unit Tariff (More Robust) ===
    const priceSpans = await cartItem.locator("div.text-primary.text-base.font-semibold span").all();
    const unitPrice = parseFloat((await getText(priceSpans[0])).replace(/[$,]/g, "")) || 0;

    // Robust unit tariff extraction
    let unitTariff = 0;
    const tariffElements = await cartItem.locator('div.text-default.text-xs, span.text-default').all();

    for (const el of tariffElements) {
      const text = await getText(el);
      const match = text.match(/\$([0-9.]+)/);
      if (match) {
        unitTariff = parseFloat(match[1]);
        console.log(`✅ Unit Tariff found: $${unitTariff} | Text: "${text.trim()}"`);
        break;
      }
    }

    if (unitTariff === 0) {
      console.log("⚠️ No unit tariff found in item row");
    }

    console.log(`Unit Price: $${unitPrice} | Unit Tariff: $${unitTariff}`);

    // Get initial quantity
    const quantityInput = cartItem.locator('input[type="number"][id^="cart-quantity-"]');
    const initialQty = parseInt(await getAttribute(quantityInput, "value"));
    console.log(`Initial Quantity: ${initialQty}`);

    // Increase quantity
    const increaseBtn = await findElementByXpath("(//button[@aria-label='Increase quantity'])[1]");
    await click(increaseBtn);
    await addSleep(2);   // wait for UI to update

    const newQty = parseInt(await getAttribute(quantityInput, "value"));
    console.log(`New Quantity: ${newQty}`);



  }

  async GetUnitPriceAndTarrifIncreaseQuantityAndCalculateTotals() {
    // === Extract Unit Price ===
    const unitPriceLocator = await findElementByXpath("(//div[@class='text-primary text-base font-semibold']//span)[1]");
    const unitPriceText = await getText(unitPriceLocator);
    const unitPrice = parseFloat(unitPriceText.replace(/[$,]/g, "")) || 0;
    console.log(`Unit Price = $${unitPrice}`);

    // === Extract Unit Tariff with 5-second wait ===
    let unitTariff = 0;
    try {
      const unitTariffLocator = await findElementByXpath(
        "(//div[@class='text-default text-xs']//span)[1]",
        { timeout: 5000 }
      );
      const unitTariffText = await getText(unitTariffLocator);
      unitTariff = parseFloat(unitTariffText.replace(/[$,]/g, "")) || 0;
    } catch (error) {
      unitTariff = 0;
    }
    console.log(`Unit Tariff = $${unitTariff}`);

    // === Increase Quantity ===
    const increaseBtn = await findElementByXpath("(//button[@aria-label='Increase quantity'])[1]");
    await click(increaseBtn);
    await addSleep(2);   // wait for UI update

    // === Get Updated Quantity (Correct way for input field) ===
    const quantityInput = await findElementByXpath("(//input[@aria-label='Quantity'])[1]");
    const quantityStr = await getAttribute(quantityInput, "value");
    const quantity = parseInt(quantityStr) || 1;
    console.log(`Quantity after increase = ${quantity}`);

    // === Calculate Expected Values ===
    const calculatedSubtotal = quantity * unitPrice;
    const calculatedTariff = quantity * unitTariff;
    const calculatedTotal = calculatedSubtotal + calculatedTariff;

    console.log(`Calculated Subtotal = $${calculatedSubtotal}`);
    console.log(`Calculated Tariff   = $${calculatedTariff}`);
    console.log(`Calculated Total    = $${calculatedTotal}`);

    return { quantity, calculatedSubtotal, calculatedTariff, calculatedTotal };
  }

  async VarifyCardSubtotals(calculatedSubtotal, calculatedTariff) {
    console.log("==================================================");
    // === Extract Unit Price ===
    const PriceSubtotalLocator = await findElementByXpath("(//div[@class='text-primary text-base font-semibold']//span)[2]");
    const PriceSubtotalText = await getText(PriceSubtotalLocator);
    const PriceSubtotal = parseFloat(PriceSubtotalText.replace(/[$,]/g, "")) || 0;
    console.log(`Price Subtotal = $${PriceSubtotal}`);

    // === Extract Unit Tariff with 5-second wait ===
    let TariffSubTotal = 0;
    try {
      const TariffSubTotalLocator = await findElementByXpath(
        "(//div[@class='text-default text-xs']//span)[2]",
        { timeout: 5000 }
      );
      const TariffSubTotalText = await getText(TariffSubTotalLocator);
      TariffSubTotal = parseFloat(TariffSubTotalText.replace(/[$,]/g, "")) || 0;
    } catch (error) {
      TariffSubTotal = 0;
    }
    console.log(`Tariff Subtotal = $${TariffSubTotal}`);

    if (PriceSubtotal !== calculatedSubtotal) {
      throw new Error(`Price Subtotal mismatch! Expected: $${calculatedSubtotal}, Actual: $${PriceSubtotal}`);
    }

    if (TariffSubTotal !== calculatedTariff) {
      throw new Error(`Tariff Subtotal mismatch! Expected: $${calculatedTariff}, Actual: $${TariffSubTotal}`);
    }
    console.log("✓ All subtotals verified successfully!");
  }

  async VarifyOrderSummary(calculatedSubtotal, calculatedTariff, calculatedTotal) {
    console.log("=========== Order Summary Varification ===========");
    // ========= Order SubTotal ===========
    const OrderSubtotalLocator = await findElementByXpath("//div[@class='text-default flex items-center justify-between text-sm font-semibold']//span//span");
    const OrderSubtotalText = await getText(OrderSubtotalLocator);
    const OrderSubtotal = parseFloat(OrderSubtotalText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Subtotal = $${OrderSubtotal}`);

    // ========= Order Tariff ===========
    const OrderTariffLocator = await findElementByXpath("//div[@class='text-default flex items-center justify-between text-sm']//span//span");
    const OrderTariffText = await getText(OrderTariffLocator);
    const OrderTariff = parseFloat(OrderTariffText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Tariff = $${OrderTariff}`);

    // ========= Order Tariff ===========
    const OrderTotalLocator = await findElementByXpath("//div[@class='text-primary flex items-center justify-between text-lg font-medium']//span//span");
    const OrderTotalText = await getText(OrderTotalLocator);
    const OrderTotal = parseFloat(OrderTotalText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Total = $${OrderTotal}`);

    if (OrderSubtotal !== calculatedSubtotal) {
      throw new Error(`Order Subtotal mismatch! Expected: $${calculatedSubtotal}, Actual: $${OrderSubtotal}`);
    }

    if (OrderTariff !== calculatedTariff) {
      throw new Error(`Order Tariff  mismatch! Expected: $${calculatedTariff}, Actual: $${OrderTariff}`);
    }

    if (OrderTotal !== calculatedTotal) {
      throw new Error(`Order Total mismatch! Expected: $${calculatedTotal}, Actual: $${OrderTotal}`);
    }
    console.log("✓ All Values verified successfully!");
  }

  // == Get Order Summary From The Order summary Section ==
  async GetOrderSummaryBeforeAppliyingPromoCode() {

    console.log("=== Order Summary Before Promo Code Addition ===");

    // ========= Order SubTotal ===========
    const OrderSubtotalLocator = await findElementByXpath("//div[@class='text-default flex items-center justify-between text-sm font-semibold']//span//span");
    const OrderSubtotalText = await getText(OrderSubtotalLocator);
    const OrderSubtotal = parseFloat(OrderSubtotalText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Subtotal = $${OrderSubtotal}`);

    // ========= Order Tariff ===========
    const OrderTariffLocator = await findElementByXpath("//div[@class='text-default flex items-center justify-between text-sm']//span//span");
    const OrderTariffText = await getText(OrderTariffLocator);
    const OrderTariff = parseFloat(OrderTariffText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Tariff = $${OrderTariff}`);

    // ========= Order Tariff ===========
    const OrderTotalLocator = await findElementByXpath("//div[@class='text-primary flex items-center justify-between text-lg font-medium']//span//span");
    const OrderTotalText = await getText(OrderTotalLocator);
    const OrderTotal = parseFloat(OrderTotalText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Total = $${OrderTotal}`);

    return { OrderSubtotal, OrderTariff, OrderTotal }
  }

  // Enter Promo code in the Order summary Section and Verify the Discount Value
  async EnterPromoCodeAndReturnDiscount(promocode, percentage, OrderSubtotal) {
    const input = await findInputByName("promo-code");
    await fill(input, promocode);
    const Button = await findElementByXpath("//button[text()='APPLY']");
    await click(Button);

    await addSleep(1);  // Wait for Modal To Open
    await this.validateModal("Success", "Promo code applied successfully");
    await this.addNoteModal.clickOnModalcloseButton();

    // ========= Get Discount ===========
    const DiscountLocator = await findElementByXpath("//span[@class='text-green-600']");
    const DiscountText = await getText(DiscountLocator);
    const Discount = parseFloat(DiscountText.replace(/[$,-]/g, "")).toFixed(2) || 0;
    console.log(`Displayed Discount = ${Discount}`);

    // ======= Calculate Discount =========
    const calculatedDiscount = ((parseFloat(OrderSubtotal) * parseFloat(percentage)) / 100).toFixed(2);
    console.log("Calculated Discount", calculatedDiscount);

    if (Discount !== calculatedDiscount) {
      throw new Error(`Discout Amount Mismatched Expected: $${calculatedDiscount} Got: $${Discount}`)
    }
    console.log("Discount Verified");

    return Discount;
  }

  async ValidateOrderSummary(discountAmount, OrderSubtotal, OrderTariff) {
    const calculatedTotal = Number(
      (parseFloat(OrderSubtotal) - parseFloat(discountAmount) + parseFloat(OrderTariff)).toFixed(2)
    );
    console.log("Calculated Total=", calculatedTotal);

    // ========= Order Tariff ===========
    const OrderTotalLocator = await findElementByXpath("//div[@class='text-primary flex items-center justify-between text-lg font-medium']//span//span");
    const OrderTotalText = await getText(OrderTotalLocator);
    const OrderTotal = Number(OrderTotalText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Total After the promocode application = $${OrderTotal}`);

    if (calculatedTotal !== OrderTotal) {
      throw new Error(`Total Mismatched Expected: $${calculatedTotal}, Recieved: $${OrderTotal}`)
    }
    console.log("Total Varified");
  }

  async RemovePromoCode(OrderTotalBeforePromocodeAddition) {
    const removeButton = await findElementByXpath("//button[text()='Remove']");
    await click(removeButton);
    console.log("Remove Button Clicked");
    await this.validateModal("Success", "Promo code removed successfully");
    await this.addNoteModal.clickOnModalcloseButton();

    const OrderTotalLocator = await findElementByXpath("//div[@class='text-primary flex items-center justify-between text-lg font-medium']//span//span");
    const OrderTotalText = await getText(OrderTotalLocator);
    const OrderTotal = Number(OrderTotalText.replace(/[$,]/g, "")) || 0;
    console.log(`Order Total After the promocode application = $${OrderTotal}`);

    if (OrderTotalBeforePromocodeAddition !== OrderTotal) {
      throw new Error(`Total Mismatched Expected: $${OrderTotalBeforePromocodeAddition}, Recieved: $${OrderTotal}`)
    }
  }

  async AddInvalidPromocodeTest() {
    const input = await findInputByName("promo-code");
    await fill(input, "InvalidePromocode");
    const Button = await findElementByXpath("//button[text()='APPLY']");
    await click(Button);

    await addSleep(1);  // Wait for Modal To Open
    await this.validateModal("Error", "Promo code not found");
  }
}
