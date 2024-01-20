import { type Page, type Locator } from "@playwright/test";

export default class ElementAttributesPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly firstParagraphWithAttributes: Locator;
  readonly secondParagraphWithDynamicJSAttributes: Locator;
  readonly addAnotherAttributeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Element Attributes Examples",
    });
    this.firstParagraphWithAttributes = page.locator("#domattributes");
    this.secondParagraphWithDynamicJSAttributes = page.locator("#jsattributes");
    this.addAnotherAttributeButton = page.getByRole("button", {
      name: "Add Another Attribute",
    });
  }

  async clickOnAddAnotherAttributeButton() {
    await this.addAnotherAttributeButton.click();
  }
}
