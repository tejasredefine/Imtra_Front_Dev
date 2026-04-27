import { expect } from "@playwright/test";

export class CheckoutComp {
    constructor(page, actions) {
        this.page = page;
        this.actions = actions;
    }

    async fillCreateAccountForm(data = { firstName, lastName, password, verifyPassword }) {
        await this.page.locator("#firstName").fill(data.firstName);
        await this.page.locator("#CreatePassword").fill(data.lastName);
        await this.page.locator("#password").fill(data.password);
        await this.page.locator("#confirmPassword").fill(data.verifyPassword ?? data.password);
    }

    async expectFieldError(partialMessage) {
        await expect(
            this.page.getByText(new RegExp(partialMessage, "i")).first(),
        ).toBeVisible({ timeout: 8000 });
    }

    async fillShippingAddress(data) {
        await this.page.locator("#ShippingFirstName-Shipping").fill(data.firstName);
        await this.page.locator("#ShippingLastName-Shipping").fill(data.lastName);
        const company = this.page.locator("#ShippingCompanyName-Shipping");
        if (await company.isVisible().catch(() => false)) {
            await company.fill(data.companyName);
        }
        await this.page.getByLabel(/street address/i).fill(data.streetAddress);
        const a2 = this.page.getByLabel(/address 2/i);
        if (data.address2 && (await a2.isVisible().catch(() => false))) {
            await a2.fill(data.address2);
        }
        await this.page.getByLabel(/^city/i).fill(data.city);
        await this.page.getByLabel(/^country/i).selectOption({ label: data.country });
        await this.page.getByLabel(/state\/region/i).selectOption({ label: data.state });
        await this.page.getByLabel(/postal code/i).fill(data.postalCode);
        const phone = this.page.getByLabel(/phone number/i);
        if (await phone.isVisible().catch(() => false)) {
            await phone.fill(data.phone);
        }
    }

    async fillJobNameAndInstructions(jobName, instructions) {
        const job = this.page.getByLabel(/job name/i);
        if (await job.isVisible().catch(() => false)) {
            await job.fill(jobName);
            console.log(`✓ Job name filled: "${jobName}"`);
        }
        const si = this.page.getByLabel(/special delivery instructions/i);
        if (await si.isVisible().catch(() => false)) {
            await si.fill(instructions);
            console.log(`✓ Special delivery instructions filled: "${instructions}"`);
        }
    }

    async selectFirstOrderContactIfPresent() {
        const dd = this.page.getByLabel(/order contact name/i);
        if (!(await dd.isVisible().catch(() => false))) return;
        await dd.click();
        const opt = this.page.locator('[role="option"]').first();
        if (await opt.isVisible().catch(() => false)) {
            await opt.click();
        }
    }

    async expectPlaceOrderDisabled() {
        const btn = this.page.getByRole("button", { name: /place order/i });
        await expect(btn).toBeDisabled();
    }

    async clickContinueInSection(sectionName) {
        const section = this.page.getByText(sectionName, { exact: false }).first();
        await section.scrollIntoViewIfNeeded().catch(() => { });
        await this.page.getByRole("button", { name: /^continue$/i }).last().click();
    }
    async updateOrAddShippingAddressInModal(data) {
        await this.page.locator("#ShippingFirstName").fill(data.firstName);
        await this.page.locator("#ShippingLastName").fill(data.lastName);
        const company = this.page.locator("#ShippingCompanyName");
        if (await company.isVisible().catch(() => false)) {
            await company.fill(data.companyName);
        }
        await this.page.getByLabel(/street address/i).fill(data.streetAddress);
        const a2 = this.page.getByLabel(/address 2/i);
        if (data.address2 && (await a2.isVisible().catch(() => false))) {
            await a2.fill(data.address2);
        }
        await this.page.getByLabel(/^city/i).fill(data.city);
        await this.page.getByLabel(/^country/i).selectOption({ label: data.country });
        await this.page.getByLabel(/state\/region/i).selectOption({ label: data.state });
        await this.page.getByLabel(/postal code/i).fill(data.postalCode);
        const phone = this.page.getByLabel(/phone number/i);
        if (await phone.isVisible().catch(() => false)) {
            await phone.fill(data.phone);
        }
    }
}
