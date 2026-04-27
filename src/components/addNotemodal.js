// components/addNoteModal.js
import { expect } from "@playwright/test";

export class AddNoteModal {
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

    // Product and note selectors
    this.firstProductAddNoteButton = '(//button[contains(., "Add a Note")])[1]';
    this.firstProductEditNoteButton = '(//button[contains(., "Edit Note")])[1]';
    this.firstProductNoteContainer =
      '(//div[contains(@class, "flex flex-1 items-start justify-start gap-2")])[1]';
    this.noteLabel =
      'div.text-xs.font-semibold.tracking-wider.uppercase:has-text("Note:")';
    this.noteText = "div.text-xs.font-medium.tracking-wider";
    this.noteRequiredError = "p.mt-1.text-sm.text-red-600";
  }

  // Notes Popup modal Validation
  async verifyModalOpen(expectedNoteText = "") {
    await this.page.waitForSelector(this.modalContainer, { state: "visible" });
    // Verify modal title
    const titleElement = this.page.locator(this.modalTitle);
    await expect(titleElement).toBeVisible();
    await expect(titleElement).toHaveText("Add a Note");

    // Verify textarea is visible
    const textarea = this.page.locator(this.noteTextarea);
    await expect(textarea).toBeVisible();
    if (expectedNoteText === "") {
      await expect(textarea).toHaveValue("");
    } else {
      await expect(textarea).toHaveValue(expectedNoteText);
    }
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

  async clickOnModalcloseButton() {
    const button = await findElementByXpath(
      "//button[@class='text-primary border-dark relative size-8 cursor-pointer rounded-lg p-1']",
    );
    await click(button);
  }

  async clickFirstProductAddNote() {
    const addNoteButton = this.page.locator(this.firstProductAddNoteButton);
    await expect(addNoteButton).toBeVisible();
    await addNoteButton.click();
    console.log("✓ Clicked on first product's 'Add a Note' button");
  }

  async clickFirstProductEditNote() {
    const editNoteButton = this.page.locator(this.firstProductEditNoteButton);
    await expect(editNoteButton).toBeVisible();
    await editNoteButton.click();
    console.log("✓ Clicked on first product's 'Edit Note' button");
  }

  async verifyNoteDisplayedOnProduct(expectedNoteText) {
    // Wait for the note container to be visible
    const noteContainer = this.page.locator(this.firstProductNoteContainer);
    await expect(noteContainer).toBeVisible({ timeout: 5000 });

    // Verify "Note:" label is present
    const noteLabelElement = noteContainer.locator(this.noteLabel);
    await expect(noteLabelElement).toBeVisible();
    await expect(noteLabelElement).toHaveText("Note:");

    // Verify the note text matches expected
    const noteTextElement = noteContainer.locator(this.noteText);
    await expect(noteTextElement).toBeVisible();
    await expect(noteTextElement).toHaveText(expectedNoteText);

    console.log(`✓ Note verified on product: "${expectedNoteText}"`);
  }

  async verifyEditNoteButtonDisplayed() {
    const editNoteButton = this.page.locator(this.firstProductEditNoteButton);
    await expect(editNoteButton).toBeVisible();
    await expect(editNoteButton).toHaveText("Edit Note");

    // Verify "Add a Note" button is NOT visible
    const addNoteButton = this.page.locator(this.firstProductAddNoteButton);
    await expect(addNoteButton).not.toBeVisible();

    console.log("✓ 'Edit Note' button is displayed instead of 'Add a Note'");
  }

  async verifyNoteRequiredError(errMsg) {
    const errorLocator = this.page.locator(this.noteRequiredError);

    await expect(errorLocator).toBeVisible({ timeout: 5000 });
    await expect(errorLocator).toHaveText(errMsg);
    console.log("✓ Note required error message is displayed");
  }
}
