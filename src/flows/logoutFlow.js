import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/BasePage";
import { LoginFlow } from "./loginFlow";
import { PAGE_TITLES } from "../utils/data/metaData";

export class LogoutFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
  }

  // ---------- Logout after login and verify redirect to homepage ----------
  async performLogout(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.homepage.hoverOverAccounAndClickOnLogout();
    await this.verifyPageTitle(PAGE_TITLES.HOME);
  }
}
