import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class LearningCenterPage extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
  }

  async loadCardsUntilIndex(targetIndex) {
    while (true) {
      // Get all visible article cards
      const cards = await this.page
        .locator(
          "div.flex.flex-col.overflow-hidden.rounded-xl.bg-white.shadow-sm",
        )
        .all();
      const visibleCount = cards.length;

      console.log(
        `Currently loaded: ${visibleCount} articles, Target: ${targetIndex}`,
      );

      // If target card is already visible → stop
      if (visibleCount >= parseInt(targetIndex)) {
        console.log(`Target article ${targetIndex} is now visible`);
        return;
      }

      // Check if load more button exists & is enabled
      const loadMoreBtn = this.page.locator('button:has-text("LOAD MORE")');

      if (await loadMoreBtn.isVisible()) {
        await loadMoreBtn.click();
        console.log("Clicked LOAD MORE button");
        await this.page.waitForLoadState("networkidle");
        await addSleep(3); // wait for cards to render
      } else {
        throw new Error(
          `Cannot reach article index ${targetIndex}. Only ${visibleCount} articles loaded and no LOAD MORE button available.`,
        );
      }
    }
  }

  async clickOnTheArticleByTitle(articleTitle) {
    // Decode HTML entities in the title if needed
    const decodedTitle = articleTitle.replace(/&amp;/g, "&");

    // Find the card containing this title
    const cardSelector = `a.text-base.font-semibold[title="${decodedTitle}"]`;
    const titleLink = this.page.locator(cardSelector).first();

    if (!(await titleLink.isVisible())) {
      throw new Error(
        `Article "${articleTitle}" not found even after loading more.`,
      );
    }

    // Get the parent card container
    const card = titleLink
      .locator(
        'xpath=ancestor::div[contains(@class, "flex flex-col overflow-hidden rounded-xl")]',
      )
      .first();

    await scrollIntoView(card);
    await addSleep(0.5);
    // Extract title (already have it, but getting from DOM for verification)
    const actualTitle = await titleLink.textContent();

    // Extract date - it's the div with class "text-default mt-auto text-xs"
    const dateDiv = card.locator("div.text-default.mt-auto.text-xs").first();
    const date = await dateDiv.textContent();

    console.log("Article Card Details:", {
      title: actualTitle.trim(),
    });

    // Click on the title link
    await titleLink.click();
    await this.page.waitForLoadState("networkidle");

    return {
      ArticleTitle: actualTitle.trim(),
    };
  }

  async verifyArticleDetailsPage(title) {
    const articleTitleLocator = await findElementByXpath(
      "//div[@class='text-primary mb-6 text-xl font-bold lg:text-3xl']",
    );
    await expect(articleTitleLocator).toHaveText(title);
  }

  async clickOnTheCategory(category) {
    const Category = await findElementByXpath(
      `//div[@id='story-categories-listing']//a[text()="${category}"]`,
    );
    await click(Category);
    await addSleep(3);
  }

  async clickOntheFirstCardAndVerifyCategory(category) {
    const firstCard = await findElementByXpath(
      "(//div[@class='flex grow flex-col gap-1.5 p-6']//a)[1]",
    );
    await click(firstCard);
    await addSleep(2);

    const categoriesList = await findElementByXpath(
      "//div[@class='flex flex-row items-start gap-2']//div[@class='flex max-w-[calc(100%-80px)] flex-wrap items-center gap-1']",
    );
    let categoriesText = await getText(categoriesList);
    let categoriesArray = categoriesText
      .split(",") // split by comma
      .map((c) => c.trim()) // trim spaces/newlines
      .filter((c) => c.length); // remove empty strings

    console.log("Extracted Categories:", categoriesArray);
    // Validate category exists
    if (!categoriesArray.includes(category)) {
      throw new Error(
        `Expected category '${category}' NOT found in ${categoriesArray}`,
      );
    }

    console.log(`✔ Category '${category}' found successfully.`);
  }

  async clickOnTheFeaturedArticleAndVerifyArticle(featured_articles) {
    const FeaturedArticle = await findElementByXpath(
      `//span[text()='${featured_articles}']`,
    );
    await click(FeaturedArticle);
    console.log(`Clicked on the ${featured_articles} Link`);
    await addSleep(2); // wait for the page redirection and Ui changes
    const Header = await findElementByXpath(
      "//div[@class='text-primary mb-6 text-xl font-bold lg:text-3xl']",
    );
    await expect(Header).toHaveText(featured_articles);
  }

  async clickOnTheFirstArticleAndValidateTheArticleDetailsPageSignInButton() {
    const firstCard = await findElementByXpath(
      "(//div[@class='flex grow flex-col gap-1.5 p-6']//a)[1]",
    );
    const title = await getText(firstCard);
    await click(firstCard);
    console.log("Clicked on the Card with the title", title);
    await addSleep(3);
    const Header = await findElementByXpath(
      "//div[@class='text-primary mb-6 text-xl font-bold lg:text-3xl']",
    );
    await expect(Header).toHaveText(title);

    // Click On the Sign In button and Verify Redirection
    const SignInButton = await findElementByXpath("//a[text()='Sign in']");
    await click(SignInButton);
    console.log("Clicked on the Sign in Button");
    await addSleep(3);
    await this.verifyPageTitle("Sign In - IMTRA");
  }
}
