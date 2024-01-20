import { type Page, type Locator } from "@playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly basicWebPageExampleLink: Locator;
  readonly elementAttributesPageLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basicWebPageExampleLink = page.locator("#basicpagetest");
    this.elementAttributesPageLink = page.locator("#elementattributestest");
  }

  async navigateToBasicWebPage() {
    await this.page.goto("/");
    await this.basicWebPageExampleLink.click();
  }

  async navigateToElementAttributesPage() {
    await this.page.goto("/");
    await this.elementAttributesPageLink.click();
  }
}
