import { type Page, type Locator } from "@playwright/test";

export default class DynamicTableTestPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly idInput: Locator;
  readonly captionInput: Locator;
  readonly tableCaption: Locator;
  readonly tableDataButton: Locator;
  readonly refreshTableButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Dynamic HTML TABLE Tag",
    });
    this.table = page.locator("//table");
    this.tableRows = page.locator("//table//tr");
    this.idInput = page.locator("#tableid");
    this.captionInput = page.locator("input#caption");
    this.tableCaption = page.locator("//caption");
    this.tableDataButton = page.locator("//summary[text()='Table Data']");
    this.refreshTableButton = page.locator("#refreshtable");
  }

  async clickTableDataButton() {
    await this.tableDataButton.click();
  }

  async clickRefreshTableButton() {
    await this.refreshTableButton.click();
  }

  async enterId(id: string) {
    this.idInput.clear();
    this.idInput.fill(id);
  }

  async enterCaption(caption: string) {
    this.captionInput.clear();
    this.captionInput.fill(caption);
  }
}
