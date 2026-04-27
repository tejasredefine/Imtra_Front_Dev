import { BasePage } from "../pages/BasePage";
import { NavLinks } from "./navLinks";
import { expect } from "../utils/fixtures/baseFixtures";
export class Whislist extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.navLinks = new NavLinks(page, actions);

    this.saveForLaterButton = 'button:has-text("Save for later")';
    this.cartProductTitle =
      "a.text-primary.line-clamp-2.text-base.font-semibold";
    this.wishlistProductTitles =
      "#wishlist-products-grid a.text-primary.text-xl.leading-tight.font-semibold";
    this.wishlistProductCard = "#wishlist-products-grid > div"; // Each product card
    this.removeFromWishlistButton = 'button[aria-label="Remove from wishlist"]';
  }

  async verifyProductInWishlist(expectedProductName) {
    await addSleep(2);

    // Get all product cards in wishlist page
    const wishlistProductCards = await this.page
      .locator(
        "#wishlist-products-grid div.border-dark.overflow-hidden.rounded-xl.border.bg-white",
      )
      .all();

    if (wishlistProductCards.length === 0) {
      throw new Error("No products found in wishlist");
    }

    // Check if the expected product is in the wishlist
    let productFound = false;

    for (const card of wishlistProductCards) {
      const productName = await card
        .locator("a.text-primary.text-xl.leading-tight.font-semibold")
        .first()
        .textContent();

      if (productName.trim() === expectedProductName.trim()) {
        productFound = true;
        console.log(`✓ Product found in wishlist: ${expectedProductName}`);

        // Verify the wishlist button shows "Remove from wishlist"
        const removeButton = await card
          .locator("button[aria-label='Remove from wishlist']")
          .first();

        const isRemoveButtonVisible = await removeButton.isVisible();

        if (!isRemoveButtonVisible) {
          throw new Error(
            `Remove from wishlist button not visible for product: ${expectedProductName}`,
          );
        }

        break;
      }
    }

    if (!productFound) {
      throw new Error(`Product "${expectedProductName}" not found in wishlist`);
    }

    return productFound;
  }

  async clickOnSaveForLaterButtonAndVerifyitIntheWhislistPage() {
    // 1. Capture the product name BEFORE clicking
    const productTitleLocator = this.page
      .locator(this.cartProductTitle)
      .first();
    await expect(productTitleLocator).toBeVisible({ timeout: 5000 });

    const productName = (await productTitleLocator.textContent()).trim();
    console.log(`✓ Captured product from cart: "${productName}"`);

    // 2. Click the first "Save for later" button
    const saveForLaterBtn = this.page.locator(this.saveForLaterButton).first();
    await expect(saveForLaterBtn).toBeVisible();
    await saveForLaterBtn.click();
    console.log(`✓ Clicked "Save for later" on product: "${productName}"`);

    // 3. Navigate to Wishlist page
    await this.navLinks.hoverOverTheAccountIconClickOnWhislist();
    await this.verifyPageTitle("Wishlist");

    // 4. Verify the SAME product is now in Wishlist
    const wishlistTitles = this.page.locator(this.wishlistProductTitles);

    // Wait for at least one product to appear in wishlist
    await expect(wishlistTitles.first()).toBeVisible({ timeout: 10000 });
    // Check that our product appears (exact text match)
    const matchingProduct = wishlistTitles.filter({ hasText: productName });
    await expect(matchingProduct).toHaveCount(1);

    console.log(
      `✓ Product "${productName}" successfully verified in Wishlist page`,
    );

    // 5. NEW: Remove the product from Wishlist
    // Find the wishlist card that contains our product
    const productCard = this.page.locator(this.wishlistProductCard).filter({
      hasText: productName,
    });

    await expect(productCard).toBeVisible({ timeout: 5000 });

    // Click the remove icon (heart / X button) inside that card
    const removeButton = productCard.locator(this.removeFromWishlistButton);
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    console.log(`✓ Clicked remove icon on wishlist product: "${productName}"`);
    await this.validateModal(
      "Success",
      "Product removed from wishlist successfully",
    );
  }
}
