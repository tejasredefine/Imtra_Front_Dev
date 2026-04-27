import { BasePage } from "../../pages/BasePage";
import { HomePage } from "../../pages/homePage";
import { LoginFlow } from "../loginFlow";
import { ShippingCarriersPage } from "../../pages/MyAccount/shippingCarriersPage";

export class ShippingCarriersFlow extends BasePage {
  constructor(page, actions) {
    super(page, actions);
    this.page = page;
    this.actions = actions;
    this.homepage = new HomePage(page, actions);
    this.loginFlow = new LoginFlow(page, actions);
    this.shippingCarriersPage = new ShippingCarriersPage(page, actions);
  }

  // ***************** Small Utility Funtion ******************
  async navigateToShippingCarriersTab(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(
      email,
      password,
      expectedTitle,
    );
    await addSleep(2);
    await this.homepage.hoverOverTheAccountIconClickOnWhislist();
    await this.ClickOnButtonByTagAndTitle("a", "Shipping Carriers");
    console.log("Clicked on the Shipping Carriers Tab");
  }

  // --- Test Case For the Adding A Shipping Carrier ----
  async AddaShippingCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.shippingCarriersPage.AddaShippingCarrier();
  }

  // ---- test Case For the trying o delete a default Shipping Carrier -----
  async DeleteDefaultShippingCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await addSleep(2);
    await this.shippingCarriersPage.DeleteDefaultShippingCarrier();
  }

  async DeleteNonDefaultShippingCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await addSleep(2);
    await this.shippingCarriersPage.DeleteNonDefaultShippingCarrier();
  }

  async AddDefaultCarrierInactivalyShippingCarrier(
    email,
    password,
    expectedTitle,
  ) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await addSleep(2);
    await this.shippingCarriersPage.AddDefaultInactiveShippingCarrier();
  }

  async EditDefaultCarrierStatusToInacive(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await addSleep(2);
    await this.shippingCarriersPage.EditDefaultCarrierStatusToInacive();
  }

  async EditNonDefaultCarrierADefaultCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await addSleep(2);
    await this.shippingCarriersPage.EditNonDefaultCarrierADefaultCarrier();
  }

  async TestValidationsofShippingCarrierModal(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await addSleep(2);
    await this.shippingCarriersPage.TestShippingCarrierModalValidations();
  }

  async AddNewCarrierWithSameName(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await addSleep(2);
    await this.shippingCarriersPage.AddNewCarrierWithSameName();
  }
}
