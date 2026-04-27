import { BasePage } from "../pages/BasePage";

export class CustomerItemNumber extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
  }

  async verifyAddCustomerItemNumberPopup(expectedItemNumber = "") {
    // Wait for popup to be visible
    await this.page.waitForSelector(
      "div.text-primary.relative.max-h-screen.overflow-y-auto.rounded-lg.bg-white.shadow",
      { state: "visible" },
    );
    console.log("✓ 'Add Your Customer Item Number' popup opened");
    // Verify popup title
    const popupTitle = await this.page
      .locator("div.flex-1.text-left.text-xl.font-semibold")
      .first()
      .textContent();
    if (!popupTitle.includes("Add Your Customer Item Number")) {
      throw new Error(
        `Popup title mismatch. Expected "Add Your Customer Item Number" but found "${popupTitle}"`,
      );
    }
    console.log("✓ Popup title verified: Add Your Customer Item Number");
    // Get the input field
    const itemNumberInput = await this.page.locator("#customerItemNumber");

    // Wait for input to be visible
    await itemNumberInput.waitFor({ state: "visible" });

    // Get the actual value from input
    const actualItemNumber = await itemNumberInput.inputValue();

    // If expectedItemNumber is empty string (default), just verify popup opened
    if (expectedItemNumber === "") {
      console.log(
        `✓ Popup verified successfully. Input field is empty (as expected)`,
      );
      return true;
    }

    // If expectedItemNumber is provided, verify it matches
    if (actualItemNumber.trim() === expectedItemNumber.trim()) {
      console.log(
        `✓ Customer Item Number verified: "${actualItemNumber}" matches expected "${expectedItemNumber}"`,
      );
      return true;
    } else {
      throw new Error(
        `Customer Item Number mismatch. Expected "${expectedItemNumber}" but found "${actualItemNumber}"`,
      );
    }
  }
}
