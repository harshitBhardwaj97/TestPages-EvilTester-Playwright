import { type Page, type Locator } from "@playwright/test";

export default class BasicWebPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly explanation: Locator;
  readonly paragraphOne: Locator;
  readonly paragraphTwo: Locator;
  readonly linkOne: Locator;
  readonly linkTwo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Basic Web Page Example",
    });
    this.explanation = page.locator(".explanation p");
    this.paragraphOne = page.locator("#para1");
    this.paragraphTwo = page.locator("#para2");
    this.linkOne = page.locator("a:has-text('EvilTester.com')");
    this.linkTwo = page.locator("a:has-text('Compendium Developments')");
  }

  async navigateToLinkOne() {
    await this.linkOne.click();
  }

  async navigateToLinkTwo() {
    await this.linkTwo.click();
  }
}
