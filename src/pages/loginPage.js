import { LoginPageComponent } from "../components/loginPageComp";
import { NavLinks } from "../components/navLinks";

export class LoginPage {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
    this.loginPageComponent = new LoginPageComponent(page, actions);
    this.navLinks = new NavLinks(page, actions);
  }

  // Step: "user click on login icon in navbar"
  async clickOnLoginIcon() {
    await this.navLinks.clickOnSignInIcon();
  }

  // Step: "the user enters a valid email"
  async enterEmail(email, uniqueid) {
    await this.loginPageComponent.enterEmail(email, uniqueid);
  }

  // Step: "the user enters a valid password"
  async enterPassword(password) {
    await this.loginPageComponent.enterPassword(password);
  }

  // Step: "clicks on the SIGN IN button"
  async clickOnLoginButton() {
    await this.loginPageComponent.clickOnSignInBtn();
  }

  async clickOnForgotPassword() {
    await this.loginPageComponent.clickOnForgotPassword();
  }

  async verifyForgotPassword() {
    await assertTitle("Forgot Password - Reset Your Account | IMTRA");
  }

  async clickOnSendlink() {
    await this.loginPageComponent.clickOnSendLinkBtn();
  }

  async ValidateTheMessageAndType(type, message) {
    await this.actions.validatePopUpModalWithMessage(type, message);
  }
}
