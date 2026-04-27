import { test, expect } from "../utils/fixtures/baseFixtures";
import { LearningCenterFlow } from "../flows/learningCenterFlow";
import {
  Leaning_Center_articles,
  Learning_Center_categories,
  Learning_Center_Featured_Articles,
} from "../utils/data/learningCenterData";

test.describe("Learning Center Page Tests", () => {
  let learningCenterFlow;

  test.beforeEach(async ({ page, actions }) => {
    learningCenterFlow = new LearningCenterFlow(page, actions);
  });

  // ============================================================================
  test("@learningCenter @learningCenter001 - Navigate to Learning Center Page Via Navbar", async () => {
    await learningCenterFlow.NavigateToLearningCenterPageViaNavbar();
  });

  test("@learningCenter @learningCenter002 - Navigate to Learning Center Page Via Footer", async () => {
    await learningCenterFlow.NavigateToLearningCenterPageViaFooter();
  });

  // Click on Each and Every Article
  for (const key in Leaning_Center_articles) {
    const article = Leaning_Center_articles[key];
    test(`@learningCenter @learningCenter003 @article_${key}- Validate Article: ${article.title}`, async () => {
      await learningCenterFlow.clickOnArticleAndVerifyTheArticleDetailsPage(
        article.title,
        key,
      );
    });
  }

  Learning_Center_categories.forEach((category) => {
    test(`@learningCenter @learningCenter004 @categories @category_${category.replace(/\s+/g, "_")} - Validate Category: ${category}`, async () => {
      await learningCenterFlow.validateCategory(category);
    });
  });

  Learning_Center_Featured_Articles.forEach((featured_articles) => {
    test(`@learningCenter @learningCenter005 @categories @${featured_articles}) - Validate Featured Articles: ${featured_articles}`, async () => {
      await learningCenterFlow.validateFeaturedArticles(featured_articles);
    });
  });

  test(`@learningCenter @learningCenter006: Validate the Sign In button in the article Details page`, async () => {
    await learningCenterFlow.validateSignInButtonInArticlesDetailsPage();
  });
});
