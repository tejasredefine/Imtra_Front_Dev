import { expect } from "@playwright/test";
export class ShippingCarriersModal {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  async validateAddCarrierModal(Title) {
    const modalTitle = this.page.locator("#add-carrier-modal-title");
    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toHaveText(Title);
    console.log("The Modal opend");
  }

  async selectCarrierName() {
    await this.page.locator("#order_shipping_carrier_name").click();
    await addSleep(2);
    await this.page.waitForSelector('[id^="react-select"][id$="-listbox"]', {
      state: "visible",
    });
    const options = await this.page.locator('[role="option"]').all();
    if (options.length > 0) {
      await options[0].click();
      // Or for random: await options[Math.floor(Math.random() * options.length)].click();
    }
    console.log("The Carrier Name has been Selected");
  }

  async selectShippingMethods(count = 2) {
    const selectedIndices = new Set();
    for (let i = 0; i < count; i++) {
      await this.page.locator("#selected_shipping_methods").click();
      await addSleep(2);
      await this.page.waitForSelector('[id^="react-select"][id$="-listbox"]', {
        state: "visible",
      });
      const options = await this.page.locator('[role="option"]').all();
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * options.length);
      } while (selectedIndices.has(randomIndex));

      selectedIndices.add(randomIndex);
      await options[randomIndex].click();
      await this.page.waitForTimeout(300);
    }
  }

  async fillAccountNumber(accNum) {
    await this.page.fill("#carrier_account_number", accNum);
  }

  async selectStatus(status) {
    await this.page.selectOption("#status", status);
  }

  async setAsDefaultCarrier(enable = true) {
    const checkbox = this.page.locator("#default_carrier_ind");
    const isChecked = await checkbox.isChecked();

    if (enable && !isChecked) await checkbox.check();
    if (!enable && isChecked) await checkbox.uncheck();
  }

  async submitCarrierForm() {
    const button = await findElementByXpath(
      "(//button[text()='Add Carrier'])[2]",
    );
    await click(button);
  }

  async validateFieldErrorMessage(fieldId, expectedError) {
    // Find the error <p> that is a sibling within the same parent container as the field's label
    const errorLocator = this.page.locator(
      `label[for="${fieldId}"] + * p.mt-1.text-sm.text-red-600,
     label[for="${fieldId}"] ~ p.mt-1.text-sm.text-red-600`,
    );

    await expect(errorLocator).toBeVisible({ timeout: 5000 });
    await expect(errorLocator).toHaveText(expectedError);
    console.log(`✓ Error verified for field "${fieldId}": "${expectedError}"`);
  }
}
