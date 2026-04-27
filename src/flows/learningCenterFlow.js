import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/BasePage";
import { LearningCenterPage } from "../pages/learningCenterPage";

export class LearningCenterFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.learningCenterPage = new LearningCenterPage(page, actions);
  }

  async NavigateToLearningCenterPageViaNavbar() {
    await addSleep(1);
    const learningCenterlinkInNavbar = await findElementByXpath(
      "//li//a[text()='Learning Center']",
    );
    await click(learningCenterlinkInNavbar);
    await addSleep(2);
    await this.verifyPageTitle("Learning Center | Imtra - IMTRA");
    await this.verifyPageHeader("strong", "LEARNING CENTER");
  }

  async NavigateToLearningCenterPageViaFooter() {
    scrollTo(0, 5000);
    await addSleep(2);
    scrollTo(0, 8000);
    await addSleep(2);
    scrollTo(0, 10000);
    const learningCenterlinkInNavbar = await findElementByXpath(
      "(//a[text()='Learning Center'])[2]",
    );
    await click(learningCenterlinkInNavbar);
    await addSleep(2);
    await this.verifyPageTitle("Learning Center | Imtra - IMTRA");
    await this.verifyPageHeader("strong", "LEARNING CENTER");
  }

  async clickOnArticleAndVerifyTheArticleDetailsPage(articleTitle, key) {
    // Navigate To the Learning Center Page
    await this.NavigateToLearningCenterPageViaNavbar();
    await addSleep(3);

    // Click On LoadMore button
    await this.learningCenterPage.loadCardsUntilIndex(key);

    // Click on the Artilcle By its title
    const { ArticleTitle } =
      await this.learningCenterPage.clickOnTheArticleByTitle(articleTitle);

    // Verify the Article Details Page
    await this.learningCenterPage.verifyArticleDetailsPage(ArticleTitle);
  }

  async validateCategory(categroy) {
    // Navigate To learning Center page
    await this.NavigateToLearningCenterPageViaNavbar();
    await addSleep(3);

    // click on the category
    await this.learningCenterPage.clickOnTheCategory(categroy);
    await this.learningCenterPage.clickOntheFirstCardAndVerifyCategory(
      categroy,
    );
  }

  async validateFeaturedArticles(featured_articles) {
    await this.NavigateToLearningCenterPageViaNavbar();
    await this.learningCenterPage.clickOnTheFeaturedArticleAndVerifyArticle(
      featured_articles,
    );
  }

  async validateSignInButtonInArticlesDetailsPage() {
    await this.NavigateToLearningCenterPageViaNavbar();
    await this.learningCenterPage.clickOnTheFirstArticleAndValidateTheArticleDetailsPageSignInButton();
  }
}
