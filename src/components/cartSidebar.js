export class CartSidebar {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  async addRandomQuantityToCartFromListingPage() {
    // Wait for product cards to be visible
    await this.page.waitForSelector("div.virtuoso-grid-item", {
      state: "visible",
    });

    // Get all product cards
    const productCards = await this.page
      .locator("div.border-dark.overflow-hidden.rounded-xl.border.bg-white")
      .all();

    if (productCards.length === 0) {
      throw new Error("No product cards found on the page");
    }

    // Select a random product card
    const randomCard =
      productCards[Math.floor(Math.random() * productCards.length)];

    // Extract product details from the listing card
    const productName = await randomCard
      .locator("a.text-primary.text-xl.leading-tight.font-semibold")
      .first()
      .textContent();
    const productNameText = productName.trim();

    const skuElement = await randomCard
      .locator("div.flex.flex-col.gap-2 > div.text-default.text-sm")
      .first();
    const skuNumber = (await skuElement.textContent())
      .replace("Item:", "")
      .trim();

    const yourPriceElement = await randomCard
      .locator("div.text-primary.text-xl.font-semibold")
      .first();
    const yourPriceText = (await yourPriceElement.textContent())
      .replace("Your Price:", "")
      .trim();
    const unitPrice = parseFloat(yourPriceText.replace(/[$,]/g, ""));

    const tariffElement = await randomCard
      .locator("div.text-default.text-sm.sm\\:min-h-5")
      .first();
    const tariffText = (await tariffElement.textContent())
      .replace("Tariff Amount:", "")
      .trim();
    const unitTariff = parseFloat(tariffText.replace(/[$,]/g, ""));

    // Generate random quantity between 2 and 30
    const randomQuantity = Math.floor(Math.random() * 19) + 2;

    // Calculate totals
    const calculatedSubtotal = (unitPrice * randomQuantity).toFixed(2);
    const calculatedTariff = (unitTariff * randomQuantity).toFixed(2);
    const calculatedTotal = (
      parseFloat(calculatedSubtotal) + parseFloat(calculatedTariff)
    ).toFixed(2);

    // Find and fill quantity input in the random product card
    const quantityInput = await randomCard
      .locator("input[aria-label='Quantity']")
      .first();
    await quantityInput.fill(randomQuantity.toString());
    await addSleep(1);

    // Click Add to Cart button in the random product card
    const addToCartButton = await randomCard
      .locator("button[aria-label='Add to cart']")
      .first();
    await addToCartButton.click();
    await addSleep(2);

    return {
      productName: productNameText,
      sku: skuNumber,
      quantity: randomQuantity,
      yourPrice: yourPriceText,
      calculatedSubtotal,
      calculatedTariff,
      calculatedTotal,
    };
  }

  async verifyCartDetails(expectedCartData) {
    await addSleep(2);

    // Verify cart sidebar is visible
    const cartSidebar = await this.page
      .locator("div[role='dialog'][aria-label='Shopping cart']")
      .first();
    const isCartVisible = await cartSidebar.isVisible();

    if (!isCartVisible) {
      throw new Error("Cart sidebar is not visible");
    }

    // Find cart items
    const cartItems = await this.page
      .locator(
        "div[role='dialog'][aria-label='Shopping cart'] .border-dark.mb-6",
      )
      .all();

    if (cartItems.length === 0) {
      throw new Error("No items found in cart");
    }

    let itemFound = false;

    // Verify product exists in cart
    for (const cartItem of cartItems) {
      const skuElement = await cartItem
        .locator("div.text-default.text-xs.font-semibold.uppercase")
        .first();
      const actualSku = (await skuElement.textContent()).trim();

      if (actualSku === expectedCartData.sku) {
        itemFound = true;

        // Verify Product Name
        const productNameElement = await cartItem
          .locator("div.text-primary.line-clamp-2.text-sm.font-semibold")
          .first();
        const actualProductName = (
          await productNameElement.textContent()
        ).trim();
        if (actualProductName !== expectedCartData.productName) {
          throw new Error(
            `Product name mismatch: Expected "${expectedCartData.productName}" but found "${actualProductName}"`,
          );
        }

        // Verify Quantity
        const quantityElement = await cartItem
          .locator("div.text-primary.text-base")
          .first();
        const actualQuantity = parseInt(
          (await quantityElement.textContent()).replace("QTY:", "").trim(),
        );
        if (actualQuantity !== expectedCartData.quantity) {
          throw new Error(
            `Quantity mismatch: Expected ${expectedCartData.quantity} but found ${actualQuantity}`,
          );
        }

        // Verify Your Price
        const priceElement = await cartItem
          .locator("div.text-primary.text-lg.font-bold span")
          .first();
        const actualPrice = (await priceElement.textContent()).trim();
        if (actualPrice !== expectedCartData.yourPrice) {
          throw new Error(
            `Price mismatch: Expected "${expectedCartData.yourPrice}" but found "${actualPrice}"`,
          );
        }

        console.log(`✓ Cart item verified: ${expectedCartData.sku}`);
        break;
      }
    }

    if (!itemFound) {
      throw new Error(
        `Product with SKU "${expectedCartData.sku}" not found in cart`,
      );
    }

    // Verify Subtotal
    const subtotalElement = await this.page
      .locator(
        "div[role='dialog'] .bg-light .flex.items-center.justify-between",
      )
      .filter({ hasText: "Subtotal" })
      .locator("span.text-default.text-xl.font-medium span")
      .first();
    const actualSubtotal = parseFloat(
      (await subtotalElement.textContent()).replace(/[$,]/g, ""),
    ).toFixed(2);

    if (actualSubtotal !== expectedCartData.calculatedSubtotal) {
      throw new Error(
        `Subtotal mismatch: Expected $${expectedCartData.calculatedSubtotal} but found $${actualSubtotal}`,
      );
    }

    // Verify Tariff
    const tariffElement = await this.page
      .locator(
        "div[role='dialog'] .bg-light .flex.items-center.justify-between",
      )
      .filter({ hasText: "Tariff" })
      .locator("span.text-default.text-xl.font-medium span")
      .first();
    const actualTariff = parseFloat(
      (await tariffElement.textContent()).replace(/[$,]/g, ""),
    ).toFixed(2);

    if (actualTariff !== expectedCartData.calculatedTariff) {
      throw new Error(
        `Tariff mismatch: Expected $${expectedCartData.calculatedTariff} but found $${actualTariff}`,
      );
    }

    // Verify Total
    const totalElement = await this.page
      .locator(
        "div[role='dialog'] .border-dark.flex.items-center.justify-between.border-t.pt-2",
      )
      .locator("span.text-primary.text-xl.font-medium span")
      .first();
    const actualTotal = parseFloat(
      (await totalElement.textContent()).replace(/[$,]/g, ""),
    ).toFixed(2);

    if (actualTotal !== expectedCartData.calculatedTotal) {
      throw new Error(
        `Total mismatch: Expected $${expectedCartData.calculatedTotal} but found $${actualTotal}`,
      );
    }

    console.log("✓ Cart details verified successfully");
    console.log(`  Subtotal: $${actualSubtotal}`);
    console.log(`  Tariff: $${actualTariff}`);
    console.log(`  Total: $${actualTotal}`);

    return true;
  }

  async verifyCartSidebarCalculations() {
    await this.page.waitForSelector(
      "div[role='dialog'][aria-label='Shopping cart']",
      { state: "visible" },
    );

    const cartItems = await this.page
      .locator("div.border-dark.mb-6.flex.gap-4.border-b.pb-6")
      .all();

    if (cartItems.length === 0) {
      throw new Error("No items found in cart sidebar");
    }

    let calculatedSubtotal = 0;
    let calculatedTariff = 0;
    for (const item of cartItems) {
      const sku = await item
        .locator("div.text-default.text-xs.font-semibold.uppercase")
        .textContent();

      // Get Quantity
      const qtyText = await item
        .locator("div.text-primary.text-base")
        .textContent();
      const quantity = parseInt(qtyText.replace("QTY:", "").trim());

      // Get Your Price
      const priceText = await item
        .locator("div.text-primary.text-lg.font-bold span")
        .textContent();
      const unitPrice = parseFloat(priceText.replace(/[$,]/g, ""));

      // Get Tariff Amount (if exists)
      const tariffElements = await item
        .locator("div.text-default.text-sm")
        .count();
      let unitTariff = 0;
      if (tariffElements > 0) {
        const tariffText = await item
          .locator("div.text-default.text-sm span")
          .textContent();
        unitTariff = parseFloat(tariffText.replace(/[$,]/g, ""));
      }

      // Calculate item totals
      const itemSubtotal = unitPrice * quantity;
      const itemTariff = unitTariff * quantity;

      calculatedSubtotal += itemSubtotal;
      calculatedTariff += itemTariff;

      console.log(
        `✓ ${sku}: Qty ${quantity} × $${unitPrice.toFixed(2)} = $${itemSubtotal.toFixed(2)}`,
      );

      console.log(
        `  Tariff: Qty ${quantity} × $${unitTariff.toFixed(2)} = $${itemTariff.toFixed(2)}`,
      );
    }

    // Get displayed Subtotal
    const displayedSubtotal = parseFloat(
      (
        await this.page
          .locator("div.bg-light div.flex.items-center.justify-between")
          .filter({ hasText: "Subtotal" })
          .locator("span span")
          .textContent()
      ).replace(/[$,]/g, ""),
    );

    // Get displayed Tariff
    const displayedTariff = parseFloat(
      (
        await this.page
          .locator("div.bg-light div.flex.items-center.justify-between")
          .filter({ hasText: "Tariff" })
          .locator("span span")
          .textContent()
      ).replace(/[$,]/g, ""),
    );

    // Get displayed Total
    const displayedTotal = parseFloat(
      (
        await this.page
          .locator(
            "div.border-dark.flex.items-center.justify-between.border-t.pt-2",
          )
          .locator("span.text-primary.text-xl.font-medium span")
          .textContent()
      ).replace(/[$,]/g, ""),
    );

    // Calculate expected total
    const calculatedTotal = calculatedSubtotal + calculatedTariff;

    // Verify Subtotal
    if (calculatedSubtotal.toFixed(2) !== displayedSubtotal.toFixed(2)) {
      throw new Error(
        `Subtotal mismatch: Calculated $${calculatedSubtotal.toFixed(2)} but displayed $${displayedSubtotal.toFixed(2)}`,
      );
    }
    console.log(`✓ Subtotal verified: $${displayedSubtotal.toFixed(2)}`);

    // Verify Tariff
    if (calculatedTariff.toFixed(2) !== displayedTariff.toFixed(2)) {
      throw new Error(
        `Tariff mismatch: Calculated $${calculatedTariff.toFixed(2)} but displayed $${displayedTariff.toFixed(2)}`,
      );
    }
    console.log(`✓ Tariff verified: $${displayedTariff.toFixed(2)}`);

    // Verify Total
    if (calculatedTotal.toFixed(2) !== displayedTotal.toFixed(2)) {
      throw new Error(
        `Total mismatch: Calculated $${calculatedTotal.toFixed(2)} but displayed $${displayedTotal.toFixed(2)}`,
      );
    }
    console.log(`✓ Total verified: $${displayedTotal.toFixed(2)}`);

    console.log("✓ All cart sidebar calculations verified successfully");
    return {
      subtotal: calculatedSubtotal,
      tariff: calculatedTariff,
      total: calculatedTotal,
      itemCount: cartItems.length,
    };
  }

  async cartSidebarItemRemove() {
    await this.page.waitForSelector(
      "div[role='dialog'][aria-label='Shopping cart']",
      { state: "visible" },
    );

    const cartItemsBefore = await this.page
      .locator("div.border-dark.mb-6.flex.gap-4.border-b.pb-6")
      .all();

    if (cartItemsBefore.length === 0) {
      throw new Error("No items in cart to test removal");
    }

    const initialItemCount = cartItemsBefore.length;
    console.log(`✓ Initial cart items: ${initialItemCount}`);

    const firstItem = cartItemsBefore[0];
    const productSKU = await firstItem
      .locator("div.text-default.text-xs.font-semibold.uppercase")
      .textContent();
    console.log(`✓ Testing removal of product: ${productSKU.trim()}`);

    // Click the first dustbin icon
    const deleteButton = await firstItem.locator(
      "button[aria-label='Remove item']",
    );
    await deleteButton.click();

    // Verify modal with ActionMethods
    await this.actions.validatePopUpModalWithMessage(
      "Alert",
      "Are you sure you want to remove this item?",
    );
    console.log("✓ Delete confirmation modal verified");

    // Click Cancel button
    const cancelButton = await this.page.locator(
      "button.btn.btn-sm.btn-outline-primary",
    );
    await cancelButton.click();
    console.log("✓ Cancel button clicked");

    // Verify product is still in cart
    const cartItemsAfterCancel = await this.page
      .locator("div.border-dark.mb-6.flex.gap-4.border-b.pb-6")
      .all();

    if (cartItemsAfterCancel.length !== initialItemCount) {
      throw new Error(
        `Product was removed after clicking Cancel. Expected ${initialItemCount} items but found ${cartItemsAfterCancel.length}`,
      );
    }

    // Verify the same product SKU still exists
    const skuStillExists = await this.page
      .locator("div.text-default.text-xs.font-semibold.uppercase")
      .filter({ hasText: productSKU.trim() })
      .count();

    if (skuStillExists === 0) {
      throw new Error(
        `Product ${productSKU.trim()} was removed after clicking Cancel`,
      );
    }
    console.log("✓ Product still in cart after Cancel");

    // Now delete the product for real
    const deleteButtonAgain = await cartItemsAfterCancel[0].locator(
      "button[aria-label='Remove item']",
    );
    await deleteButtonAgain.click();

    // Verify modal again
    await this.actions.validatePopUpModalWithMessage(
      "Alert",
      "Are you sure you want to remove this item?",
    );
    console.log("✓ Delete confirmation modal verified again");

    // Click Yes button
    const yesButton = await this.page
      .locator("button.btn.btn-sm.btn-primary")
      .filter({ hasText: "Yes" });
    await yesButton.click();
    console.log("✓ Yes button clicked");

    await addSleep(1);

    await this.actions.validatePopUpModalWithMessage(
      "Success",
      "Item removed from cart successfully",
    );
    // Verify product is removed
    const cartItemsAfterDelete = await this.page
      .locator("div.border-dark.mb-6.flex.gap-4.border-b.pb-6")
      .all();

    if (cartItemsAfterDelete.length !== initialItemCount - 1) {
      throw new Error(
        `Product was not removed. Expected ${initialItemCount - 1} items but found ${cartItemsAfterDelete.length}`,
      );
    }

    // Verify the SKU no longer exists
    const skuAfterDelete = await this.page
      .locator("div.text-default.text-xs.font-semibold.uppercase")
      .filter({ hasText: productSKU.trim() })
      .count();

    if (skuAfterDelete > 0) {
      throw new Error(
        `Product ${productSKU.trim()} still exists after deletion`,
      );
    }

    console.log(
      `✓ Product ${productSKU.trim()} successfully removed from cart`,
    );
  }

  async NavigateToCartPageAndVerifyDetailsOfSidebarAndCartPage() {
    // Wait for cart sidebar to be visible
    await this.page.waitForSelector(
      "div[role='dialog'][aria-label='Shopping cart']",
      { state: "visible" },
    );

    // Get all sidebar cart items
    const sidebarItems = await this.page
      .locator(
        "div[role='dialog'] div.border-dark.mb-6.flex.gap-4.border-b.pb-6",
      )
      .all();

    if (sidebarItems.length === 0) {
      throw new Error("No items found in cart sidebar");
    }

    // Store sidebar data
    const sidebarData = [];

    for (const item of sidebarItems) {
      const sku = (
        await item
          .locator("div.text-default.text-xs.font-semibold.uppercase")
          .textContent()
      ).trim();
      const qtyText = await item
        .locator("div.text-primary.text-base")
        .textContent();
      const quantity = parseInt(qtyText.replace("QTY:", "").trim());
      const priceText = await item
        .locator("div.text-primary.text-lg.font-bold span")
        .textContent();
      const unitPrice = priceText.replace(/,/g, "").trim();

      let unitTariff = "$0.00";
      const tariffCount = await item
        .locator("div.text-default.text-sm")
        .count();
      if (tariffCount > 0) {
        const tariffText = await item
          .locator("div.text-default.text-sm span")
          .textContent();
        unitTariff = tariffText.replace(/,/g, "").trim();
      }

      const unitPriceNum = parseFloat(unitPrice.replace("$", ""));
      const unitTariffNum = parseFloat(unitTariff.replace("$", ""));
      const subtotal = (unitPriceNum * quantity).toFixed(2);
      const tariffSubtotal = (unitTariffNum * quantity).toFixed(2);

      sidebarData.push({
        sku,
        quantity,
        unitPrice,
        unitTariff,
        subtotal,
        tariffSubtotal,
      });
      console.log(
        `Sidebar - ${sku}: Qty=${quantity}, Price=${unitPrice}, Tariff=${unitTariff}`,
      );
    }

    const sidebarSubtotal = (
      await this.page
        .locator(
          "div[role='dialog'] div.bg-light div.flex.items-center.justify-between",
        )
        .filter({ hasText: "Subtotal" })
        .locator("span span")
        .textContent()
    )
      .replace(/,/g, "")
      .trim();

    const sidebarTariff = (
      await this.page
        .locator(
          "div[role='dialog'] div.bg-light div.flex.items-center.justify-between",
        )
        .filter({ hasText: "Tariff" })
        .locator("span span")
        .textContent()
    )
      .replace(/,/g, "")
      .trim();

    const sidebarTotal = (
      await this.page
        .locator(
          "div[role='dialog'] div.border-dark.flex.items-center.justify-between.border-t.pt-2",
        )
        .locator("span.text-primary.text-xl.font-medium span")
        .textContent()
    )
      .replace(/,/g, "")
      .trim();

    console.log(
      `✓ Sidebar Totals - Subtotal: ${sidebarSubtotal}, Tariff: ${sidebarTariff}, Total: ${sidebarTotal}`,
    );

    // Navigate to cart page
    await this.page.locator("a.btn[title='Go to Cart']").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForSelector("div.divide-dark.divide-y", {
      state: "visible",
    });

    const cartPageItems = await this.page
      .locator("div.divide-dark.divide-y > div.grid.grid-cols-1.items-start")
      .all();

    if (cartPageItems.length !== sidebarData.length) {
      throw new Error(
        `Item count mismatch: Sidebar has ${sidebarData.length} items, Cart page has ${cartPageItems.length} items`,
      );
    }

    // Verify each product
    for (const sidebarItem of sidebarData) {
      let found = false;

      for (const cartItem of cartPageItems) {
        const cartSku = (
          await cartItem
            .locator("div.text-default.text-sm")
            .filter({ hasText: "Item:" })
            .textContent()
        )
          .replace("Item:", "")
          .trim();

        if (cartSku === sidebarItem.sku) {
          found = true;

          // Verify Quantity
          const cartQuantity = parseInt(
            await cartItem.locator("input[aria-label='Quantity']").inputValue(),
          );
          if (cartQuantity !== sidebarItem.quantity) {
            throw new Error(
              `${sidebarItem.sku} - Quantity mismatch: Sidebar=${sidebarItem.quantity}, Cart Page=${cartQuantity}`,
            );
          }

          // Get price section
          const productSection = await cartItem
            .locator(".col-span-1.flex.flex-col.gap-4.md\\:col-span-7")
            .first();
          const priceSections = await productSection
            .locator("div.flex.flex-col.gap-1")
            .all();
          const priceSection = priceSections[priceSections.length - 1];

          // Verify Unit Price
          const cartUnitPrice = (
            await priceSection
              .locator("div.text-primary.text-base.font-semibold span")
              .textContent()
          )
            .replace(/,/g, "")
            .trim();

          if (cartUnitPrice !== sidebarItem.unitPrice) {
            throw new Error(
              `${sidebarItem.sku} - Unit Price mismatch: Sidebar=${sidebarItem.unitPrice}, Cart Page=${cartUnitPrice}`,
            );
          }

          // Verify Unit Tariff - CHECK COUNT FIRST before calling textContent()
          let cartUnitTariff = "$0.00";
          const tariffDivCount = await priceSection
            .locator("div.text-default.text-xs")
            .filter({ hasText: "Tariff" })
            .count();

          if (tariffDivCount > 0) {
            // Only call textContent() if element exists
            const tariffText = await priceSection
              .locator("div.text-default.text-xs")
              .filter({ hasText: "Tariff" })
              .textContent();
            cartUnitTariff = tariffText
              .replace("+", "")
              .replace("Tariff", "")
              .replace(/,/g, "")
              .trim();
          }

          if (cartUnitTariff !== sidebarItem.unitTariff) {
            throw new Error(
              `${sidebarItem.sku} - Unit Tariff mismatch: Sidebar=${sidebarItem.unitTariff}, Cart Page=${cartUnitTariff}`,
            );
          }

          // Verify Subtotal
          const subtotalSection = await cartItem
            .locator(
              ".col-span-1.flex.flex-col.items-start.gap-1.lg\\:col-span-2.lg\\:items-end",
            )
            .first();
          const cartSubtotal = (
            await subtotalSection
              .locator("div.text-primary.text-base.font-semibold span")
              .textContent()
          )
            .replace(/,/g, "")
            .trim();

          const expectedSubtotal = `$${sidebarItem.subtotal}`;
          if (cartSubtotal !== expectedSubtotal) {
            throw new Error(
              `${sidebarItem.sku} - Subtotal mismatch: Sidebar=${expectedSubtotal}, Cart Page=${cartSubtotal}`,
            );
          }

          console.log(
            `✓ ${sidebarItem.sku} - All details match between sidebar and cart page`,
          );
          break;
        }
      }

      if (!found) {
        throw new Error(
          `Product ${sidebarItem.sku} from sidebar not found on cart page`,
        );
      }
    }

    // Verify Order Summary Totals
    const cartPageSubtotal = (
      await this.page
        .locator("div.flex.items-center.justify-between")
        .filter({ hasText: "Subtotal" })
        .locator("span span")
        .first()
        .textContent()
    )
      .replace(/,/g, "")
      .trim();

    const cartPageTariff = (
      await this.page
        .locator("div.flex.items-center.justify-between")
        .filter({ hasText: "Tariff" })
        .locator("span span")
        .first()
        .textContent()
    )
      .replace(/,/g, "")
      .trim();

    const cartPageTotal = (
      await this.page
        .locator(
          "div.text-primary.flex.items-center.justify-between.text-lg.font-medium",
        )
        .filter({ hasText: "Total" })
        .locator("span span")
        .first()
        .textContent()
    )
      .replace(/,/g, "")
      .trim();

    if (sidebarSubtotal !== cartPageSubtotal) {
      throw new Error(
        `Subtotal mismatch: Sidebar=${sidebarSubtotal}, Cart Page=${cartPageSubtotal}`,
      );
    }
    if (sidebarTariff !== cartPageTariff) {
      throw new Error(
        `Tariff mismatch: Sidebar=${sidebarTariff}, Cart Page=${cartPageTariff}`,
      );
    }
    if (sidebarTotal !== cartPageTotal) {
      throw new Error(
        `Total mismatch: Sidebar=${sidebarTotal}, Cart Page=${cartPageTotal}`,
      );
    }

    console.log(
      `✓ Cart Page Totals - Subtotal: ${cartPageSubtotal}, Tariff: ${cartPageTariff}, Total: ${cartPageTotal}`,
    );
    console.log("✓ All totals match between sidebar and cart page");
    console.log(
      "✓ Cart sidebar and cart page verification completed successfully",
    );
  }
}
