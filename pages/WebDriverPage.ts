import { type Page, type Locator } from "@playwright/test";

export default class WebDriverPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly para1: Locator; // A paragraph of text
  readonly para2: Locator; // Another paragraph of text
  readonly mainList: Locator;
  readonly numInput: Locator;
  readonly showAsAlertButton: Locator;
  readonly showAsParaButton: Locator;
  readonly showFromLink: Locator;
  readonly processOnServerButton: Locator;
  readonly resultParagraph: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Example Page Heading One",
    });
    this.para1 = page.locator("#para1");
    this.para2 = page.locator("#para2");
    this.mainList = page.locator("#main-example-list");
    this.numInput = page.locator("#numentry");
    this.showAsAlertButton = page.getByRole("button", {
      name: "Show as Alert",
    });
    // this.showAsAlertButton = page.locator("#show-as-alert");
    this.showAsParaButton = page.getByRole("button", { name: "Show as Para" });
    this.showFromLink = page.locator("#clickable-link");
    this.resultParagraph = page.locator("#message");
    this.processOnServerButton = page.locator("#submit-to-server");
  }

  async enterDataInNumInput(data: string) {
    await this.numInput.fill(data);
  }

  async clickShowAsParaButton() {
    await this.showAsParaButton.click();
  }

  async clickShowAsAlertButton() {
    await this.showAsAlertButton.click();
  }

  async clickShowFromLink() {
    await this.showFromLink.click();
  }

  async clickProcessOnServerButton() {
    await this.processOnServerButton.click();
  }
}
