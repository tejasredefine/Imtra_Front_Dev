import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/BasePage";
import { LearningCenterPage } from "../pages/learningCenterPage";
import { PAGE_TITLES } from "../utils/data/metaData";

export class LearningCenterFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.learningCenterPage = new LearningCenterPage(page, actions);
  }

  async NavigateToLearningCenterPageViaNavbar() {
    await this.actions.addSleep(1);
    const learningCenterLinkInNavbar = await findElementByXpath(
      "//li//a[text()='Learning Center']"
    );
    await click(learningCenterLinkInNavbar);
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Learning Center | Imtra - IMTRA");
    await this.verifyPageHeader("strong", "LEARNING CENTER");
  }

  async NavigateToLearningCenterPageViaFooter() {
    await this.actions.scrollTo(0, 5000);
    await this.actions.addSleep(2);
    await this.actions.scrollTo(0, 8000);
    await this.actions.addSleep(2);
    await this.actions.scrollTo(0, 10000);
    const learningCenterLinkInFooter = await findElementByXpath(
      "(//a[text()='Learning Center'])[2]"
    );
    await click(learningCenterLinkInFooter);
    await this.actions.addSleep(2);
    await this.verifyPageTitle("Learning Center | Imtra - IMTRA");
    await this.verifyPageHeader("strong", "LEARNING CENTER");
  }

  async clickOnArticleAndVerifyTheArticleDetailsPage(articleTitle, key) {
    await this.NavigateToLearningCenterPageViaNavbar();
    await this.actions.addSleep(3);

    await this.learningCenterPage.loadCardsUntilIndex(key);

    const { ArticleTitle } =
      await this.learningCenterPage.clickOnTheArticleByTitle(articleTitle);

    await this.learningCenterPage.verifyArticleDetailsPage(ArticleTitle);
  }

  async validateCategory(category) {
    await this.NavigateToLearningCenterPageViaNavbar();
    await this.actions.addSleep(3);
    await this.learningCenterPage.clickOnTheCategory(category);
    await this.learningCenterPage.clickOntheFirstCardAndVerifyCategory(category);
  }

  async validateFeaturedArticles(featured_articles) {
    await this.NavigateToLearningCenterPageViaNavbar();
    await this.learningCenterPage.clickOnTheFeaturedArticleAndVerifyArticle(featured_articles);
  }

  async validateSignInButtonInArticlesDetailsPage() {
    await this.NavigateToLearningCenterPageViaNavbar();
    await this.learningCenterPage.clickOnTheFirstArticleAndValidateTheArticleDetailsPageSignInButton();
  }
}
