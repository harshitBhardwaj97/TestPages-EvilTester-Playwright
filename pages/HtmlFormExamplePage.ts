import { type Page, type Locator } from "@playwright/test";

export default class HtmlFormExamplePage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly textareaInput: Locator;
  readonly chooseFileButton: Locator;
  readonly checkBoxInput: Locator;
  readonly radioInput: Locator;
  readonly multipleSelectTag: Locator;
  readonly selectDropdown: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Basic HTML Form Example",
    });
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.textareaInput = page.locator("//textarea");
    this.chooseFileButton = page.locator("//input[@type='file']");
    this.checkBoxInput = page.locator("//input[@type='checkbox']"); // Can extract checkbox using nth-child
    this.radioInput = page.locator("//input[@type='radio']"); // Can extract radio button using nth-child
    this.multipleSelectTag = page.getByRole("listbox");
    this.selectDropdown = page.locator("//select[@name='dropdown']");
    this.submitButton = page.locator("//input[@type='submit']");
  }

  async enterUsername(username: string) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async enterTextArea(data: string) {
    await this.textareaInput.clear();
    await this.textareaInput.fill(data);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }
}
