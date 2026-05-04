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

  // ---- Shared: navigate to Shipping Carriers tab after login ----
  async navigateToShippingCarriersTab(email, password, expectedTitle) {
    await this.loginFlow.LoginAndVerifyRedirection(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.homepage.hoverOverTheAccountIconClickOnWhislist();
    await this.ClickOnButtonByTagAndTitle("a", "Shipping Carriers");
    console.log("Clicked on the Shipping Carriers Tab");
  }

  // ---- Add a Shipping Carrier ----
  async AddaShippingCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.shippingCarriersPage.AddaShippingCarrier();
  }

  // ---- Try to delete the default Shipping Carrier ----
  async DeleteDefaultShippingCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.shippingCarriersPage.DeleteDefaultShippingCarrier();
  }

  // ---- Delete a non-default Shipping Carrier ----
  async DeleteNonDefaultShippingCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.shippingCarriersPage.DeleteNonDefaultShippingCarrier();
  }

  // ---- Add a default carrier that is inactive ----
  async AddDefaultCarrierInactivelyShippingCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.shippingCarriersPage.AddDefaultInactiveShippingCarrier();
  }

  // ---- Edit default carrier status to inactive ----
  async EditDefaultCarrierStatusToInactive(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.shippingCarriersPage.EditDefaultCarrierStatusToInacive();
  }

  // ---- Set a non-default carrier as the default ----
  async EditNonDefaultCarrierAsDefaultCarrier(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.shippingCarriersPage.EditNonDefaultCarrierADefaultCarrier();
  }

  // ---- Test modal validations ----
  async TestValidationsOfShippingCarrierModal(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.shippingCarriersPage.TestShippingCarrierModalValidations();
  }

  // ---- Add carrier with duplicate name ----
  async AddNewCarrierWithSameName(email, password, expectedTitle) {
    await this.navigateToShippingCarriersTab(email, password, expectedTitle);
    await this.actions.addSleep(2);
    await this.shippingCarriersPage.AddNewCarrierWithSameName();
  }
}
