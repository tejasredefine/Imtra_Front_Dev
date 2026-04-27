export class NavLinks {
  constructor(page, actions) {
    this.page = page;
    this.actions = actions;
  }

  async clickOnSignInIcon() {
    const loginIcon = await findLinkByTitle("Sign In");
    await click(loginIcon);
  }

  async hoverOverTheAccountIcon() {
    const accountIcon = await findElementByXpath("//a[@title='Account']");
    await hover(accountIcon);
    // Wait for dropdown to appear
    await addSleep(1);
    const logoutButton = await findSpanByText("Log Out");
    await click(logoutButton);
  }

  async hoverOverTheAccountIconClickOnWhislist() {
    const accountIcon = await findElementByXpath("//a[@title='Account']");
    await hover(accountIcon);
    // Wait for dropdown to appear
    await addSleep(1);
    const whishlistButton = await findElementByXpath(
      "//span[@class='flex-1' and text()='Wishlist']",
    );
    await click(whishlistButton);
  }

  async clickOnCartIcon() {
    const CartIcon = await findButtonByTitle("Cart");
    await click(CartIcon);
    console.log("Clicked on the Cart Icon");
  }
}
