import { type Page, type Locator } from "@playwright/test";

export default class JavascriptAlertsPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly showAlertBoxButton: Locator;
  readonly alertExplanation: Locator;
  readonly showConfirmBoxButton: Locator;
  readonly confirmBoolean: Locator;
  readonly confirmExplanation: Locator;
  readonly showPromptBoxButton: Locator;
  readonly promptReturn: Locator;
  readonly promptExplanation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Alert Box Examples",
    });
    this.showAlertBoxButton = page.getByRole("button", {
      name: "Show alert box",
    });
    this.alertExplanation = page.locator("#alertexplanation");
    this.confirmBoolean = page.locator("#confirmreturn");
    this.confirmExplanation = page.locator("#confirmexplanation");
    this.promptReturn = page.locator("#promptreturn");
    this.promptExplanation = page.locator("#promptexplanation");
    this.showConfirmBoxButton = page.getByRole("button", {
      name: "Show confirm box",
    });
    this.showPromptBoxButton = page.getByRole("button", {
      name: "Show prompt box",
    });
  }

  async clickShowAlertBoxButton() {
    await this.showAlertBoxButton.click();
  }

  async clickShowConfirmBoxButton() {
    await this.showConfirmBoxButton.click();
  }

  async clickShowPromptBoxButton() {
    await this.showPromptBoxButton.click();
  }
}
