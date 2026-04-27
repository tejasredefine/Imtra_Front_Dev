export class LoginPageComponent {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  async enterEmail(email, uniqueid) {
    const emailField = await this.actions.findInputById(uniqueid);
    await this.actions.fill(emailField, email);
  }

  async enterPassword(password) {
    const passwordField = await this.actions.findInputById("LoginPassword");
    await this.actions.fill(passwordField, password);
  }

  async clickOnSignInBtn() {
    const signInBtn = await this.actions.findButtonByText("SIGN IN");
    await this.actions.click(signInBtn);
  }

  async clickOnForgotPassword() {
    const forgotPwd = await this.actions.findLinkByText("Forgot password?");
    await this.actions.click(forgotPwd);
  }

  async clickOnSendLinkBtn() {
    const sendlink = await this.actions.findButtonByText("Send Link");
    await this.actions.click(sendlink);
  }
}
