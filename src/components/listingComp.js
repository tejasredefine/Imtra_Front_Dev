import { expect } from "@playwright/test";
export class ListingComp {
    constructor(page, actions) {
        this.page = page;
        this.actions = actions;
    }


    async clickOnNavLink(navLink) {
        const navLinkLoc = await this.page.locator(`xpath = //a[text()='${navLink}']`).first();
        await click(navLinkLoc);
    }

    async verifyProductListingPageByTitle(listingTitle) {
        const pageTitle = await this.actions.getText(this.page.locator('h1'));
        expect(pageTitle).toContain(listingTitle);
    }

    async clickCategoryOrSubCategoryInListingPage(categoryOrSubCategory) {
        const categoryOrSubCategoryLoc = await findLinkByText(categoryOrSubCategory);
        await click(categoryOrSubCategoryLoc);
    }

    /**
     * Clicks on the category and all subcategories in the listing page
     * @param {string} category - The category to click on
     * @param {string[]} subCategories - The subcategories to click on
     */
    async clickCategoryAndAllSubCategoriesInListingPageAndVerify(subCategories) {

        for (const [category, subCategoriesArray] of Object.entries(subCategories)) {

            const categoryLoc = this.page.locator(`xpath = //button[text()= '${category}']`).first();
            await categoryLoc.click();
            console.log("Clicked on category:", category);

            await this.actions.addSleep(1);

            await this.verifyCategoryOrSubCategoryInListingPage(category);
            console.log("Verified category:", category);

            for (const subCategory of subCategoriesArray) {

                const subCategoryLoc = this.page.locator(`xpath = //button[text()= '${subCategory}']`).first();
                await subCategoryLoc.click();
                console.log("Clicked on subcategory:", subCategory);

                await this.actions.addSleep(1);

                await this.verifyCategoryOrSubCategoryInListingPage(subCategory);
                console.log("Verified subcategory:", subCategory);
            }

        }
    }

    async verifyCategoryOrSubCategoryInListingPage(categoryOrSubCategoryTitle) {
        const pageTitle = await this.actions.getText(this.page.locator('h1'));
        expect(pageTitle).toContain(categoryOrSubCategoryTitle);
    }

    /**
  * Clicks on all brands in the listing page
  * @param {string[]} brands - The brands to click on
  */
    async clickFilterInListingPageAndVerify(filterOptions, specialFilters = [{ elementIndex: 0, elementName: "" }], isAppliedFilter = true) {
        let filterDropdownLoc;
        let foundSpecial = false;

        for (const filter of filterOptions) {
            foundSpecial = false;

            for (const specialFilter of specialFilters) {
                if (specialFilter.elementIndex > 0 && filter === specialFilter.elementName) {
                    console.log("Clicked on special filter:", specialFilter.elementName);
                    filterDropdownLoc = this.page.locator(`xpath = //span[text()= '${specialFilter.elementName}']/preceding-sibling::input`).nth(specialFilter.elementIndex);
                    await filterDropdownLoc.click();

                    foundSpecial = true;
                    break;
                }
            }

            if (!foundSpecial) {
                console.log("Clicked on normal filter:", filter);
                filterDropdownLoc = this.page.locator(`xpath = //span[text()= '${filter}']/preceding-sibling::input`).first();
                await filterDropdownLoc.click();
            }

            await this.actions.addSleep(2);

            if (isAppliedFilter) {
                await this.verifyFiltersInListingPageFilter(filter);
            }
            else {
                await this.removeAppliedFiltersInListingPageFilter(filter);
            }
        }
    }
    async clickCustomFiltersInListingPageAndVerify(customFilters, isAppliedFilter = true) {
        let filterDropdownLoc;

        for (const filter of customFilters) {
            const { filterName, filterValue } = filter;

            await this.clickFilterDropdown(filterName);
            await this.actions.addSleep(1);

            for (const value of filterValue) {
                filterDropdownLoc = this.page.locator(`xpath = //span[text()= '${value}']/preceding-sibling::input`).first();
                await filterDropdownLoc.click();
                console.log("Applied filter:", value, " under", filterName);

                await this.actions.addSleep(2);

                if (isAppliedFilter) {
                    await this.verifyFiltersInListingPageFilter(value);
                }
                else {
                    await this.removeAppliedFiltersInListingPageFilter(value);
                }
            }
        }
    }

    async verifyFiltersInListingPageFilter(filter) {
        const filterLoc = this.page.locator(`xpath = //span[text()='${filter}']/parent::div`).first();
        const isApplied = await filterLoc.isVisible();
        expect(isApplied).toBeTruthy();
        console.log("Verified applied filter:", filter);
    }

    async removeAppliedFiltersInListingPageFilter(filter) {
        const filterLoc = this.page.locator(`xpath = //span[text()='${filter}']/parent::div`).first();
        const isVisible = await filterLoc.isVisible();
        expect(isVisible).toBeFalsy();
        console.log("Removed applied filter:", filter);
    }

    async clickFilterDropdown(filterName) {
        const filterDropdownLoc = this.page.locator(`xpath = //span[text()='${filterName}']/parent::button`).first();
        await filterDropdownLoc.scrollIntoViewIfNeeded();
        await filterDropdownLoc.click();
    
        await expect(filterDropdownLoc).toHaveAttribute('aria-expanded', 'true');
        await this.actions.addSleep(1);
        console.log("Clicked on filter dropdown:", filterName);
    }

    async applyRandomlyPriceRangeFilter() {
        const slider = this.page.locator('[data-testid="element"]');
        const lowerThumb = slider.locator('[data-lower="true"]');
        const upperThumb = slider.locator('[data-upper="true"]');

        const sliderBox = await slider.boundingBox();
        if (!sliderBox) throw new Error('Slider not found');

        // ---- STEP 1: RANDOM POSITIONS ----
        const minX = sliderBox.x + 30; // avoid extreme left
        const maxX = sliderBox.x + sliderBox.width - 30; // avoid extreme right

        const randomMinX = Math.random() * (maxX - minX) + minX;
        const randomMaxX = Math.random() * (maxX - minX) + minX;

        console.log("Random Min X:", randomMinX);
        console.log("Random Max X:", randomMaxX);

        // Ensure min < max
        const finalMinX = Math.min(randomMinX, randomMaxX);
        const finalMaxX = Math.max(randomMinX, randomMaxX);

        // ---- STEP 2: MOVE UPPER THUMB ----
        const upperBox = await upperThumb.boundingBox();
        const upperStartX = upperBox.x + upperBox.width / 2;
        const upperStartY = upperBox.y + upperBox.height / 2;

        await this.page.mouse.move(upperStartX, upperStartY);
        await this.page.mouse.down();
        await this.page.mouse.move(finalMaxX, upperStartY, { steps: 20 });
        await this.page.mouse.up();

        await this.actions.addSleep(2);

        // ---- STEP 3: MOVE LOWER THUMB ----
        const lowerBox = await lowerThumb.boundingBox();
        const lowerStartX = lowerBox.x + lowerBox.width / 2;
        const lowerStartY = lowerBox.y + lowerBox.height / 2;

        await this.page.mouse.move(lowerStartX, lowerStartY);
        await this.page.mouse.down();
        await this.page.mouse.move(finalMinX, lowerStartY, { steps: 20 });
        await this.page.mouse.up();

        // ---- STEP 4: WAIT FOR UPDATE ----
        await this.page.waitForTimeout(800);

        // ---- STEP 5: GET ACTUAL VALUES ----
        const minValue = Number(await lowerThumb.getAttribute('aria-valuenow'));
        const maxValue = Number(await upperThumb.getAttribute('aria-valuenow'));

        console.log('Selected Range:', minValue, '-', maxValue);
        await this.actions.addSleep(2);

        // ---- STEP 6: VALIDATE FIRST 5 PRODUCTS ----
        const products = this.page.locator('xpath = //div[@data-testid="virtuoso-item-list"]//div[contains(text(),"Your Price:")]'); // update selector
        const count = await products.count();
        console.log(`Total products: ${count}`);

        const randomLoopCount = Math.floor(Math.random() * count);
        console.log(`Random loop count: ${randomLoopCount}`);

        for (let i = 0; i < randomLoopCount; i++) {

            // select random 5 product cards from the list
            const randomProduct = Math.floor(Math.random() * count);
            console.log(`Random product: ${randomProduct}`);

            const priceText = await products.nth(randomProduct).innerText();
            const price = Number(priceText.replace(/[^0-9.]/g, ''));
            console.log(`Product price: ${price}`);

            if (price < minValue || price > maxValue) {
                throw new Error(
                    `❌ Product price: ${price} is outside the price range ${minValue}-${maxValue}`
                );
            }
            console.log(`✅ Product price: ${price} is within the price range ${minValue}-${maxValue}`);
        }
    }

    async clickSortByOptionInListingPage() {
        const sortingDropdownLoc = this.page.locator(`xpath = //span[text()='Sort By : ']`);
        await sortingDropdownLoc.click();
    }

    async applySortingInListingPage(sortingOption) {
        const sortingDropdownLoc = this.page.locator(`xpath = //button[text()='${sortingOption}']/parent::li`);
        await sortingDropdownLoc.click();
        const productLoader = this.page.getByTestId("products-grid-skeleton");
        await productLoader.waitFor({ state: 'hidden' });
    }

    async extractPrice(text) {
        if (!text) return null;

        // Remove everything except digits, dot, and comma
        const cleaned = text.replace(/[^0-9.,]/g, '');

        if (!cleaned) return null;

        // Remove commas (thousands separators)
        const normalized = cleaned.replace(/,/g, '');

        const value = parseFloat(normalized);

        return isNaN(value) ? null : value;
    }

    async verifySortingPriceInListingPage(isLowToHigh = true) {
        const products = this.page.locator('xpath = //div[@data-testid="virtuoso-item-list"]//div[contains(text(),"Your Price:")]'); // update selector
        const count = await products.count();
        console.log(`Total products: ${count}`);

        for (let i = 0; i < count - 1; i++) {
            const prevPrice = await this.extractPrice(await products.nth(i).innerText());
            const nextPrice = await products.nth(i + 1).innerText();
            if (isLowToHigh && prevPrice > nextPrice) {
                throw new Error(`Sorting is not working as expected in low to high order`);
            }
            else if (!isLowToHigh && prevPrice < nextPrice) {
                console.log(`${prevPrice} ${nextPrice}`, prevPrice < nextPrice);
                await this.actions.addSleep(2);
                throw new Error(`Sorting is not working as expected in high to low order`);
            }
            console.log(`Sorting is working as expected previous price: ${prevPrice} and next price: ${nextPrice}`);
        }
    }

    async verifySortingProductTagInListingPage(TagName) {
        const tagNameUppercase = TagName.replace(" First", "").toUpperCase();
        const productTags = this.page.locator(`xpath = //div[text()='${tagNameUppercase}']`);

        const count = await productTags.count();
        console.log(`Total product tags: ${count}`);

        if (count > 0) {
            for (let i = 0; i < count; i++) {
                const isVisible = await productTags.nth(i).isVisible();
                expect(isVisible).toBeTruthy();
                console.log(`Product tag: ${productTags} is visible`);
            }
        }
        else {
            throw new Error(`No Product Tag found for ${TagName} sorting option`)
        }
    }

}