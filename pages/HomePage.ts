import { type Page, type Locator } from "@playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly basicWebPageExampleLink: Locator;
  readonly elementAttributesPageLink: Locator;
  readonly webDriverExamplePageLink: Locator;
  readonly tableTestPageLink: Locator;
  readonly dynamicTableTestPageLink: Locator;
  readonly javascirptAlertsPageLink: Locator;
  readonly fakeAlertsPageLink: Locator;
  readonly htmlFormExamplePageLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basicWebPageExampleLink = page.locator("#basicpagetest");
    this.elementAttributesPageLink = page.locator("#elementattributestest");
    this.webDriverExamplePageLink = page.locator("#webdriverexamplepage");
    this.tableTestPageLink = page.locator("#tablestest");
    this.dynamicTableTestPageLink = page.locator("#dynamictablestest");
    this.javascirptAlertsPageLink = page.locator("#alerttest");
    this.fakeAlertsPageLink = page.locator("#fakealerttest");
    this.htmlFormExamplePageLink = page.locator("#htmlformtest");
  }

  async navigateToBasicWebPage() {
    await this.page.goto("/");
    await this.basicWebPageExampleLink.click();
  }

  async navigateToElementAttributesPage() {
    await this.page.goto("/");
    await this.elementAttributesPageLink.click();
  }

  async navigateToWebDriverPage() {
    await this.page.goto("/");
    await this.webDriverExamplePageLink.click();
  }

  async navigateToTableTestPage() {
    await this.page.goto("/");
    await this.tableTestPageLink.click();
  }

  async navigateToDynamicTableTestPage() {
    await this.page.goto("/");
    await this.dynamicTableTestPageLink.click();
  }

  async navigateToJavascriptAlertsPage() {
    await this.page.goto("/");
    await this.javascirptAlertsPageLink.click();
  }

  async navigateToFakeAlertsPage() {
    await this.page.goto("/");
    await this.fakeAlertsPageLink.click();
  }

  async navigateToHtmlFormExamplePage() {
    await this.page.goto("/");
    await this.htmlFormExamplePageLink.click();
  }
}
