// components/addNoteModal.js
import { expect } from "@playwright/test";

export class QuoteNoteModal {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;

    // Modal selectors
    this.modalContainer =
      "div.relative.max-h-screen.overflow-y-auto.rounded-lg.bg-white.shadow";
    this.modalTitle = "div.text-center.text-lg.font-normal.uppercase";
    this.noteTextarea = "textarea#note";
    this.cancelButton = 'button:has-text("Cancel")';
    this.closeButton = 'button[aria-label="Close modal"]';
  }

  async verifyModalOpen() {
    await this.page.waitForSelector(this.modalContainer, { state: "visible" });
    // Verify modal title
    const titleElement = this.page.locator(this.modalTitle);
    await expect(titleElement).toBeVisible();
    await expect(titleElement).toHaveText("Add Cart to Quote");

    // Verify textarea is visible
    const textarea = this.page.locator(this.noteTextarea);
    await expect(textarea).toBeVisible();
  }

  // Add some Text in the Note
  async fillNote(noteText) {
    const textarea = this.page.locator(this.noteTextarea);
    await textarea.clear();
    await textarea.fill(noteText);
    console.log(`✓ Filled note: "${noteText}"`);
  }

  // Save the Note.
  async clickSave() {
    const saveBtn = await findElementByXpath("//button[text()='Save']");
    await click(saveBtn);
  }

  // cancel note addiion or change
  async clickCancel() {
    const cancelBtn = await findElementByXpath("//button[text()='Cancel']");
    await cancelBtn.click();
  }

  async clickOnFirstQuoteInTheTable() {
    const firstQuote = await findElementByXpath("(//td//a)[1]");
    await click(firstQuote);
    console.log("Clicked on the First Quote in the List");
  }

  async getAllCartProductDetails() {
    const cartItems = await this.page
      .locator(
        "div.divide-dark.divide-y > div.grid.grid-cols-1.items-start.gap-2.p-4",
      )
      .all();

    console.log(`Total cart items found: ${cartItems.length}`);
    const cartDetails = [];

    for (const item of cartItems) {
      // ===== Product Name =====
      const name = await item
        .locator("a.text-primary.line-clamp-2.text-base.font-semibold")
        .textContent()
        .then((t) => t?.trim() || "");

      // ===== SKU / Item Number =====
      const skuRaw = await item
        .locator("div.text-default.text-sm")
        .first()
        .textContent()
        .then((t) => t?.trim() || "");
      const sku = skuRaw.replace("Item: ", "").trim();

      // ===== Note (optional - only some products have it) =====
      let note = null;
      const noteContainer = item.locator(
        "div.flex.flex-1.items-start.justify-start.gap-2",
      );
      const noteExists = await noteContainer.isVisible();
      if (noteExists) {
        note = await noteContainer
          .locator(
            "div.text-default.mb-1\\.5.text-xs.font-medium.tracking-wider",
          )
          .textContent()
          .then((t) => t?.trim() || null);
      }

      // ===== Quantity =====
      const quantityInput = item.locator("input[aria-label='Quantity']");
      const quantityStr = await quantityInput.getAttribute("value");
      const quantity = parseInt(quantityStr) || 0;

      // ===== Unit Price =====
      // Unit price is in the PRICE column (first price block, first span)
      const priceSpans = await item
        .locator("div.text-primary.text-base.font-semibold span")
        .all();
      const unitPriceRaw = await priceSpans[0]
        .textContent()
        .then((t) => t?.trim() || "$0.00");
      const unitPrice = parseFloat(unitPriceRaw.replace(/[$,]/g, "")) || 0;

      // ===== Subtotal =====
      // Subtotal is the second price block (SUBTOTAL column)
      const subtotalRaw =
        priceSpans.length > 1
          ? await priceSpans[1].textContent().then((t) => t?.trim() || "$0.00")
          : unitPriceRaw;
      const subtotal = parseFloat(subtotalRaw.replace(/[$,]/g, "")) || 0;

      // ===== Unit Tariff (bonus - if exists) =====
      let unitTariff = null;
      const tariffElements = await item
        .locator("div.text-default.text-xs")
        .all();
      if (tariffElements.length > 0) {
        const tariffText = await tariffElements[0]
          .textContent()
          .then((t) => t?.trim() || "");
        const match = tariffText.match(/\$([0-9,.]+)/);
        if (match) {
          unitTariff = parseFloat(match[1].replace(/,/g, "")) || null;
        }
      }

      const productData = {
        name,
        sku,
        note,
        quantity,
        unitPrice,
        subtotal,
        unitTariff,
      };

      console.log("Product Details:", JSON.stringify(productData, null, 2));
      cartDetails.push(productData);
    }

    console.log(`✓ Extracted details for ${cartDetails.length} cart items`);
    return cartDetails;
  }

  async getQuoteProductDetails() {
    const quoteItems = await this.page
      .locator(
        "div.divide-dark.divide-y > div.grid.grid-cols-1.items-start.gap-1\\.5",
      )
      .all();

    console.log(`Total quote items found: ${quoteItems.length}`);
    const quoteDetails = [];

    for (const item of quoteItems) {
      // ===== Product Name =====
      const name = await item
        .locator("div.text-primary.line-clamp-2.text-base.font-medium")
        .textContent()
        .then((t) => t?.trim() || "");

      // ===== SKU =====
      const skuRaw = await item
        .locator("div.text-default.text-sm")
        .first()
        .textContent()
        .then((t) => t?.trim() || "");
      const sku = skuRaw.replace("Item: ", "").trim();

      // ===== Quantity — displayed as "QTY : 4" text, not an input =====
      const qtyRaw = await item
        .locator("div.text-default.text-xs.font-medium")
        .textContent()
        .then((t) => t?.trim() || "QTY : 0");
      const quantity = parseInt(qtyRaw.replace("QTY :", "").trim()) || 0;

      // ===== Note — optional, sits in div.text-default.mt-1.text-xs =====
      let note = null;
      const noteLocator = item.locator("div.text-default.mt-1.text-xs");
      const noteExists = await noteLocator.isVisible().catch(() => false);
      if (noteExists) {
        const noteText = await noteLocator
          .textContent()
          .then((t) => t?.trim() || "");
        if (noteText) note = noteText;
      }

      // ===== Unit Price =====
      const unitPriceRaw = await item
        .locator("div.text-primary.text-base.font-semibold")
        .first()
        .textContent()
        .then((t) => t?.trim() || "$0.00");
      const unitPrice = parseFloat(unitPriceRaw.replace(/[$,]/g, "")) || 0;

      // ===== Subtotal — last col, lg:col-span-2 =====
      const subtotalRaw = await item
        .locator("div.lg\\:col-span-2 div.text-primary.text-base.font-semibold")
        .textContent()
        .then((t) => t?.trim() || "$0.00");
      const subtotal = parseFloat(subtotalRaw.replace(/[$,]/g, "")) || 0;

      const productData = { name, sku, quantity, note, unitPrice, subtotal };
      console.log("Quote Product:", JSON.stringify(productData, null, 2));
      quoteDetails.push(productData);
    }

    console.log(`✓ Extracted details for ${quoteDetails.length} quote items`);
    return quoteDetails;
  }

  async VerifyQuoteAndCartData(cartData, quoteData) {
    console.log("========== Verifying Cart vs Quote Data ==========");

    if (cartData.length !== quoteData.length) {
      throw new Error(
        `Item count mismatch! Cart has ${cartData.length} items, Quote has ${quoteData.length} items`,
      );
    }

    // Sort both arrays by SKU so order doesn't matter
    const sortBySku = (a, b) => a.sku.localeCompare(b.sku);
    const sortedCart = [...cartData].sort(sortBySku);
    const sortedQuote = [...quoteData].sort(sortBySku);

    for (let i = 0; i < sortedCart.length; i++) {
      const cart = sortedCart[i];
      const quote = sortedQuote[i];

      console.log(`\n--- Verifying item: ${cart.sku} ---`);

      // ===== Name =====
      if (cart.name !== quote.name) {
        throw new Error(
          `[${cart.sku}] Name mismatch!\n  Cart:  "${cart.name}"\n  Quote: "${quote.name}"`,
        );
      }
      console.log(`✓ Name matched: "${cart.name}"`);

      // ===== SKU =====
      if (cart.sku !== quote.sku) {
        throw new Error(
          `SKU mismatch!\n  Cart:  "${cart.sku}"\n  Quote: "${quote.sku}"`,
        );
      }
      console.log(`✓ SKU matched: "${cart.sku}"`);

      // ===== Quantity =====
      if (cart.quantity !== quote.quantity) {
        throw new Error(
          `[${cart.sku}] Quantity mismatch!\n  Cart:  ${cart.quantity}\n  Quote: ${quote.quantity}`,
        );
      }
      console.log(`✓ Quantity matched: ${cart.quantity}`);

      // ===== Unit Price =====
      if (cart.unitPrice !== quote.unitPrice) {
        throw new Error(
          `[${cart.sku}] Unit price mismatch!\n  Cart:  $${cart.unitPrice}\n  Quote: $${quote.unitPrice}`,
        );
      }
      console.log(`✓ Unit price matched: $${cart.unitPrice}`);

      // ===== Subtotal =====
      if (cart.subtotal !== quote.subtotal) {
        throw new Error(
          `[${cart.sku}] Subtotal mismatch!\n  Cart:  $${cart.subtotal}\n  Quote: $${quote.subtotal}`,
        );
      }
      console.log(`✓ Subtotal matched: $${cart.subtotal}`);

      // ===== Note (only check if cart had a note) =====
      if (cart.note !== null) {
        if (cart.note !== quote.note) {
          throw new Error(
            `[${cart.sku}] Note mismatch!\n  Cart:  "${cart.note}"\n  Quote: "${quote.note}"`,
          );
        }
        console.log(`✓ Note matched: "${cart.note}"`);
      }
    }

    console.log("\n✅ All cart items verified successfully against quote!");
  }

  async clickRandomPendingEyeButton() {
    const pendingEyeButtons = await this.page
      .locator("//tr[.//span[normalize-space()='Pending']]//td[last()]//button")
      .all();

    const count = pendingEyeButtons.length;
    console.log(`Pending rows found: ${count}`);

    if (count === 0) {
      throw new Error("No Pending quotes found");
    }

    const randomIndex = Math.floor(Math.random() * count);

    await pendingEyeButtons[randomIndex].click();

    console.log(`Clicked Eye button for Pending row at index: ${randomIndex}`);
  }

  async clickOnModalcloseButton() {
    const button = await findElementByXpath(
      "//button[@class='text-primary border-dark relative size-8 cursor-pointer rounded-lg p-1']",
    );
    await click(button);
  }

  async validateErrorMessage(errMsg) {
    const errorLocator = await findElementByXpath("//p");
    const actualMessage = await getText(errorLocator);

    if (actualMessage !== errMsg) {
      throw new Error(
        `❌ Error message mismatch.\nExpected: "${errMsg}"\nGot: "${actualMessage}"`,
      );
    }

    console.log(`✓ Error message verified: "${errMsg}"`);
  }
}
