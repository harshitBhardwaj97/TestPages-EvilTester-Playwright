import { type Page, type Locator } from "@playwright/test";

export default class FakeAlertsPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly showFakeAlertBoxButton: Locator;
  readonly fakeAlertBoxDialog: Locator;
  readonly dialogText: Locator;
  readonly showModalDialogButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Fake Alert Box Examples",
    });
    this.showFakeAlertBoxButton = page.locator("#fakealert");
    this.showModalDialogButton = page.locator("#modaldialog");
    this.dialogText = page.locator("#dialog-text");
    this.fakeAlertBoxDialog = page.locator("//div[@role='dialog']");
  }

  async clickShowFakeAlertBox() {
    await this.showFakeAlertBoxButton.click();
  }

  async clickShowModalDialogButton() {
    await this.showModalDialogButton.click();
  }
}
