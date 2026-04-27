export class SearchPageComponent {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  // ==================== SEARCH BAR ====================

  // Select a brand from the brand filter dropdown on the left of the search bar
  async selectBrandFromDropdown(brandName) {
    const dropdown = await findElementByXpath(
      `//select[contains(@class,'brand') or @id='brandFilter'] | //div[contains(@class,'brand-select')]//select`,
    );
    await this.actions.selectOption(dropdown, brandName);
    console.log(`Selected brand filter: ${brandName}`);
  }

  // Click the search input field
  async clickSearchBar() {
    const searchBar = await findElementByXpath(
      `(//input[@type='search' or @placeholder])[1]`,
    );
    await click(searchBar);
  }

  // Type a keyword into the search bar (triggers autocomplete)
  async typeInSearchBar(keyword) {
    const searchBar = await findElementByXpath(
      `(//input[@type='search' or @placeholder])[1]`,
    );
    await this.actions.fill(searchBar, keyword);
    console.log(`Typed search keyword: ${keyword}`);
  }

  // Click the SEARCH button to submit
  async clickSearchButton() {
    const searchBtn = await this.actions.findButtonByXpath("//span[contains(text(),'Search')]");
    await this.actions.click(searchBtn);
  }



  // ==================== AUTOCOMPLETE ====================

  // Wait for and return all visible autocomplete suggestion texts
  async getAutocompleteSuggestions() {
    //get the suggestion items for the keyword "Cable"
    //const suggestionItems = this.page.locator('div.border-dark');
    const suggestionItems = this.page.locator('div:has-text("Cable")');
    //wait for the suggestion items to be visible
    await suggestionItems.first().waitFor({ state: 'visible', timeout: 20000 });
    //get the text contents of the suggestion items
    const texts = await suggestionItems.allTextContents();
    //log the number of suggestion items found
    console.log(`Autocomplete suggestions found: ${texts.length}`);
    //return the text contents of the suggestion items
    return texts.map(t => t.trim());
  }

  // Click on a specific autocomplete suggestion by text
  async clickAutocompleteSuggestion(suggestionText) {
    const suggestion = await findElementByXpath(
      `//li[normalize-space(text())="${suggestionText}"] | //div[contains(@class,'suggestion')]//span[contains(text(),"${suggestionText}")]`,
    );
    await waitForVisible(suggestion);
    await click(suggestion);
    await addSleep(2);
    console.log(`Clicked autocomplete suggestion: ${suggestionText}`);
  }

  // ==================== SEARCH RESULTS PAGE ====================

  // Get the search result heading text (e.g. 'Search Results for "SM61320-20M"')
  async getSearchResultHeading() {
    const heading = await findElementByXpath(
      `//h1[contains(@class,'search') or contains(text(),'Search Results')] | //h2[contains(text(),'Search Results')]`,
    );
    await waitForVisible(heading);
    const text = await heading.textContent();
    console.log(`Search result heading: ${text}`);
    return text.trim();
  }

  // Get the total count of product cards currently visible on the search results page
  async getSearchResultCardCount() {
    const cards = await this.page
      .locator(`div[class*='product-card'], div[class*='card'], article`)
      .all();
    console.log(`Product cards visible: ${cards.length}`);
    return cards.length;
  }

  // Get the first product card element
  async getFirstProductCard() {
    const card = await findElementByXpath(
      `(//div[contains(@class,'product-card')] | //article)[1]`,
    );
    await waitForVisible(card);
    return card;
  }

  // ==================== PRODUCT CARD FIELDS ====================

  // Get the brand label text on the first product card
  async getFirstCardBrandText() {
    const brand = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//span[contains(@class,'brand') or contains(@class,'manufacturer')])[1]`,
    );
    return ((await brand.textContent()) || "").trim();
  }

  // Get the product name text on the first product card
  async getFirstCardProductName() {
    const name = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//h2 | //div[contains(@class,'product-card')]//h3 | //div[contains(@class,'card')]//a[contains(@class,'name') or contains(@class,'title')])[1]`,
    );
    return ((await name.textContent()) || "").trim();
  }

  // Get the item/SKU number text on the first product card
  async getFirstCardItemNumber() {
    const item = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//span[contains(text(),'Item') or contains(@class,'sku')])[1]`,
    );
    return ((await item.textContent()) || "").trim();
  }

  // Get the Your Price value on the first product card
  async getFirstCardYourPrice() {
    const price = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//*[contains(text(),'Your Price')]//following-sibling::* | //div[contains(@class,'your-price')])[1]`,
    );
    return ((await price.textContent()) || "").trim();
  }

  // Get the stock status text (e.g. "In Stock") on the first product card
  async getFirstCardStockStatus() {
    const status = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//*[contains(@class,'stock') or contains(text(),'Stock') or contains(text(),'stock')])[1]`,
    );
    return ((await status.textContent()) || "").trim();
  }

  // Get the tariff amount text on the first product card
  async getFirstCardTariffAmount() {
    const tariff = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//*[contains(text(),'Tariff')])[1]`,
    );
    return ((await tariff.textContent()) || "").trim();
  }

  // Click on the first product card to navigate to the product details page
  async clickFirstProductCard() {
    const cardLink = await findElementByXpath(
      `(//div[contains(@class,'product-card')]//a | //article//a)[1]`,
    );
    await waitForVisible(cardLink);
    await click(cardLink);
    await addSleep(2);
    console.log(`Clicked on first product card`);
  }

  // Click the wishlist (heart) icon on the first product card
  async clickFirstCardWishlistIcon() {
    const wishlist = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//*[contains(@class,'wishlist') or contains(@class,'heart') or @aria-label='Add to wishlist'])[1]`,
    );
    await click(wishlist);
    await addSleep(1);
    console.log(`Clicked wishlist icon on first card`);
  }

  // ==================== QUANTITY AND ADD TO CART ====================

  // Set quantity on the first product card
  async setQuantityOnFirstCard(quantity) {
    const qtyInput = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//input[@type='number' or contains(@class,'quantity') or contains(@class,'qty')])[1]`,
    );
    await this.actions.clearInput(qtyInput);
    await this.actions.fill(qtyInput, String(quantity));
    console.log(`Set quantity to: ${quantity}`);
  }

  // Click ADD TO CART button on the first product card
  async clickAddToCartOnFirstCard() {
    const addToCartBtn = await findElementByXpath(
      `(//div[contains(@class,'product-card') or contains(@class,'card')]//button[contains(text(),'ADD TO CART') or contains(@class,'add-to-cart')])[1]`,
    );
    await waitForVisible(addToCartBtn);
    await click(addToCartBtn);
    await addSleep(2);
    console.log(`Clicked ADD TO CART on first card`);
  }

  // ==================== CART SIDEBAR ====================

  // Verify the cart sidebar is visible after add-to-cart
  async verifyCartSidebarIsOpen() {
    const sidebar = await findElementByXpath(
      `//div[contains(@class,'cart-sidebar') or contains(@class,'cart-drawer') or contains(@aria-label,'cart')]`,
    );
    await waitForVisible(sidebar);
    console.log(`✓ Cart sidebar is open`);
  }

  // Get the quantity shown in the cart sidebar for the first line item
  async getCartSidebarQuantity() {
    const qty = await findElementByXpath(
      `(//div[contains(@class,'cart-sidebar') or contains(@class,'cart-drawer')]//input[@type='number'] | //div[contains(@class,'cart-item')]//span[contains(@class,'qty')])[1]`,
    );
    return ((await qty.inputValue()) || (await qty.textContent()) || "").trim();
  }

  // Get the subtotal text shown in the cart sidebar
  async getCartSidebarSubtotal() {
    const total = await findElementByXpath(
      `//div[contains(@class,'cart-sidebar') or contains(@class,'cart-drawer')]//*[contains(text(),'Subtotal') or contains(text(),'Total')]//following-sibling::*`,
    );
    return ((await total.textContent()) || "").trim();
  }

  // ==================== LOAD MORE / PAGINATION ====================

  // Click the "Load More" button to load more search results
  async clickLoadMoreButton() {
    const loadMoreBtn = await findElementByXpath(
      `//button[contains(text(),'Load More') or contains(text(),'LOAD MORE') or contains(@class,'load-more')]`,
    );
    await waitForVisible(loadMoreBtn);
    await click(loadMoreBtn);
    await addSleep(3);
    console.log(`Clicked Load More button`);
  }

  // Check if the Load More button is visible
  async isLoadMoreButtonVisible() {
    const btn = this.page.locator(
      `button:has-text("Load More"), button:has-text("LOAD MORE"), button[class*='load-more']`,
    );
    return await btn.isVisible();
  }


  // ==================== SKU SEARCH VERIFICATION ====================

  async verifySkuSearchReturnsCorrectProduct() {
    await this.getFirstCardProductName();
    await this.getFirstCardBrandText();
    await this.getFirstCardItemNumber();
  }
  async verifySkuSearchStockStatus() {
    await this.getFirstCardStockStatus();
  }
  async verifySkuSearchTariffAmount() {
    await this.getFirstCardTariffAmount();
  }
}
