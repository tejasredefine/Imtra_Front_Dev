import { expect } from "@playwright/test";
import { BasePage } from "../BasePage";
import { AddNoteModal } from "../../components/addNotemodal";
import { ShippingCarriersModal } from "../../components/shippingCarriersModal";

export class ShippingCarriersPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.addNoteModal = new AddNoteModal(page, actions);
    this.shippingCarriersModal = new ShippingCarriersModal(page, actions);
  }

  // ********** Small Utility *****************
  async generate3CharCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 3; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async clickOnDeleteButtonOfShippingCarrier(isDefault = false) {
    const grid = this.page.locator(
      "div.grid.w-full.grid-cols-1.items-start.gap-6",
    );
    const cards = grid.locator("div.border-dark");

    const cardCount = await cards.count();
    if (cardCount === 0) {
      throw new Error("No shipping carrier cards found on the page");
    }

    let targetIndex = -1;
    const nonDefaultIndexes = [];

    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const defaultBadgeCount = await card
        .locator("span:has-text('Default')")
        .count();
      const isDefaultCard = defaultBadgeCount > 0;

      if (isDefault && isDefaultCard) {
        targetIndex = i;
        break;
      }

      if (!isDefault && !isDefaultCard) {
        nonDefaultIndexes.push(i);
      }
    }

    if (isDefault && targetIndex === -1) {
      throw new Error("No default shipping carrier card found to delete");
    }

    if (!isDefault && nonDefaultIndexes.length === 0) {
      throw new Error(
        "No non-default shipping carrier card available to delete",
      );
    }

    if (!isDefault) {
      const randomIdx = Math.floor(Math.random() * nonDefaultIndexes.length);
      targetIndex = nonDefaultIndexes[randomIdx];
    }

    const targetCard = cards.nth(targetIndex);
    const deleteButton = targetCard.getByRole("button", {
      name: "Delete Carrier",
      exact: true,
    });

    await this.actions.click(deleteButton);
  }

  async clickEditOnDefaultCarrier() {
    const defaultCard = this.page
      .locator("div.border-dark.flex.min-h-px.min-w-px.grow.flex-col")
      .filter({
        has: this.page.locator("span.bg-primary", { hasText: "Default" }),
      });

    await expect(defaultCard).toBeVisible();
    console.log("✓ Default carrier card found");

    await defaultCard.locator("button[aria-label='Edit Carrier']").click();

    console.log("✓ Clicked Edit on Default Carrier");
  }
  // ***************************************

  async AddaShippingCarrier() {
    const randomCode = await this.generate3CharCode();
    const accountNumber = `Testing - ${randomCode}`;

    await this.ClickOnButtonByTagAndText("button", "Add Carrier");
    await this.shippingCarriersModal.validateAddCarrierModal("Add Carrier");
    // Add data in carrier
    await this.shippingCarriersModal.selectCarrierName();
    await this.shippingCarriersModal.selectShippingMethods();
    await this.shippingCarriersModal.fillAccountNumber(accountNumber);
    await this.shippingCarriersModal.selectStatus("Active");
    await this.shippingCarriersModal.setAsDefaultCarrier(true);
    await this.shippingCarriersModal.submitCarrierForm();
    await this.validateModal("Success", "Carrier added successfully");
  }

  async DeleteDefaultShippingCarrier() {
    await this.verifyPageTitle("Account Carriers ");
    await addSleep(2);
    await this.clickOnDeleteButtonOfShippingCarrier(true);
    await this.validateModalPartially(
      "Confirm",
      "Are you sure you want to delete carrier",
    );
    await this.ClickOnButtonByTagAndText("button", "Yes");
    await addSleep(1);
    await validatePopUpModalWithMessage(
      "Error",
      "Default carrier cannot be deleted.",
      1,
    );
  }

  async DeleteNonDefaultShippingCarrier() {
    await this.verifyPageTitle("Account Carriers ");
    await addSleep(2);
    await this.clickOnDeleteButtonOfShippingCarrier(false);
    await this.validateModalPartially(
      "Confirm",
      "Are you sure you want to delete carrier",
    );
    await this.ClickOnButtonByTagAndText("button", "Yes");
    console.log("Clicked on the Yes button");
    await addSleep(2);
    await this.validateModal("Success", "Carrier deleted successfully");
  }

  async AddDefaultInactiveShippingCarrier() {
    const randomCode = await this.generate3CharCode();
    const accountNumber = `Testing - ${randomCode}`;

    await this.ClickOnButtonByTagAndText("button", "Add Carrier");
    await this.shippingCarriersModal.validateAddCarrierModal("Add Carrier");
    // Add data in carrier
    await this.shippingCarriersModal.selectCarrierName();
    await this.shippingCarriersModal.selectShippingMethods();
    await this.shippingCarriersModal.fillAccountNumber(accountNumber);
    await this.shippingCarriersModal.selectStatus("Inactive");
    await this.shippingCarriersModal.setAsDefaultCarrier(true);
    await this.shippingCarriersModal.submitCarrierForm();
    await this.validateModal("Error", "Default carrier cannot be inactive");
  }

  async EditDefaultCarrierStatusToInacive() {
    await this.clickEditOnDefaultCarrier();
    await this.shippingCarriersModal.selectStatus("Inactive");
    await this.ClickOnButtonByTagAndText("button", "Update Carrier");
    await this.validateModal("Error", "Default carrier cannot be inactive");
  }

  async EditNonDefaultCarrierADefaultCarrier() {
    const randomCode = await this.generate3CharCode();
    const accountNumber = `Testing - ${randomCode}`;

    // ===== Step 1: Add a new carrier (Non Default) =====
    await this.ClickOnButtonByTagAndText("button", "Add Carrier");
    await this.shippingCarriersModal.validateAddCarrierModal("Add Carrier");
    // Add data in carrier
    await this.shippingCarriersModal.selectCarrierName();
    await this.shippingCarriersModal.selectShippingMethods();
    await this.shippingCarriersModal.fillAccountNumber(accountNumber);
    await this.shippingCarriersModal.selectStatus("Active");
    await this.shippingCarriersModal.setAsDefaultCarrier(false);
    await this.shippingCarriersModal.submitCarrierForm();
    await this.validateModal("Success", "Carrier added successfully");
    await this.addNoteModal.clickOnModalcloseButton();

    // ===== Step 2: Find the card with that account number and click Edit =====
    const targetCard = this.page
      .locator("div.border-dark.flex.min-h-px.min-w-px.grow.flex-col")
      .filter({
        has: this.page.locator("div.text-default.text-sm", {
          hasText: `Account: ${accountNumber}`,
        }),
      });

    await expect(targetCard).toBeVisible();
    console.log(`✓ Found carrier card with account: ${accountNumber}`);

    await targetCard.locator("button[aria-label='Edit Carrier']").click();
    console.log("✓ Clicked Edit on the target carrier card");

    // ===== Step 3: Set it as Default in the Edit Modal =====
    await this.shippingCarriersModal.validateAddCarrierModal("Edit Carrier");
    await this.shippingCarriersModal.setAsDefaultCarrier(true);
    await this.ClickOnButtonByTagAndText("button", "Update Carrier");
    await this.validateModal("Success", "Carrier updated successfully");
  }

  async TestShippingCarrierModalValidations() {
    await this.ClickOnButtonByTagAndText("button", "Add Carrier");
    await this.shippingCarriersModal.validateAddCarrierModal("Add Carrier");
    await this.shippingCarriersModal.submitCarrierForm();
    await this.shippingCarriersModal.validateFieldErrorMessage(
      "selected_shipping_methods",
      "Please select at least one shipping method",
    );
    await this.shippingCarriersModal.validateFieldErrorMessage(
      "carrier_account_number",
      "Account number is required",
    );
    await this.shippingCarriersModal.fillAccountNumber(
      "vdvweqq2343432vdvweqq2343432vdvweqq2343432vdvweqq2343432vdvweqq2343432vdvweqq2358dvvwveeveeeve2343432",
    );
    await this.shippingCarriersModal.validateFieldErrorMessage(
      "carrier_account_number",
      "Account number must not exceed 100 characters",
    );
  }

  async AddNewCarrierWithSameName() {
    const randomCode = await this.generate3CharCode();
    const accountNumber = `Testing - ${randomCode}`;

    // ============= Step 1: Add a new carrier  =============
    await this.ClickOnButtonByTagAndText("button", "Add Carrier");
    await this.shippingCarriersModal.validateAddCarrierModal("Add Carrier");
    // Add data in carrier
    await this.shippingCarriersModal.selectCarrierName();
    await this.shippingCarriersModal.selectShippingMethods();
    await this.shippingCarriersModal.fillAccountNumber(accountNumber);
    await this.shippingCarriersModal.selectStatus("Active");
    await this.shippingCarriersModal.setAsDefaultCarrier(false);
    await this.shippingCarriersModal.submitCarrierForm();
    await this.validateModal("Success", "Carrier added successfully");
    await this.addNoteModal.clickOnModalcloseButton();

    // ===== Step 2: Add a New Carrier With Same Account Number ====
    await this.ClickOnButtonByTagAndText("button", "Add Carrier");
    await this.shippingCarriersModal.validateAddCarrierModal("Add Carrier");
    // Add data in carrier
    await this.shippingCarriersModal.selectCarrierName();
    await this.shippingCarriersModal.selectShippingMethods();
    await this.shippingCarriersModal.fillAccountNumber(accountNumber);
    await this.shippingCarriersModal.selectStatus("Active");
    await this.shippingCarriersModal.setAsDefaultCarrier(false);
    await this.shippingCarriersModal.submitCarrierForm();
    await this.validateModal(
      "Error",
      "A carrier with this account number and carrier name already exists.",
    );
  }
}
