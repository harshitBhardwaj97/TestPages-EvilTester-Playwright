import { type Page, type Locator } from "@playwright/test";

export default class TableTestPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "HTML TABLE Tag",
    });
    this.table = page.locator("#mytable");
    this.tableRows = page.locator("//table[@id='mytable']//tr");
  }
}
