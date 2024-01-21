import { test as base } from "@playwright/test";
import HomePage from "../pages/HomePage";
import BasicWebPage from "../pages/BasicWebPage";
import ElementAttributesPage from "../pages/ElementAttributesPage";
import WebDriverPage from "../pages/WebDriverPage";
import TableTestPage from "../pages/TableTestPage";
import DynamicTableTestPage from "../pages/DynamicTableTestPage";
import JavascriptAlertsPage from "../pages/JavascriptAlertsPage";

type Pages = {
  homePage: HomePage;
  basicWebPage: BasicWebPage;
  elementAttributesPage: ElementAttributesPage;
  webDriverPage: WebDriverPage;
  tableTestPage: TableTestPage;
  dynamicTableTestPage: DynamicTableTestPage;
  javascriptAlertsPage: JavascriptAlertsPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  basicWebPage: async ({ page }, use) => {
    await use(new BasicWebPage(page));
  },

  elementAttributesPage: async ({ page }, use) => {
    await use(new ElementAttributesPage(page));
  },

  webDriverPage: async ({ page }, use) => {
    await use(new WebDriverPage(page));
  },

  tableTestPage: async ({ page }, use) => {
    await use(new TableTestPage(page));
  },

  dynamicTableTestPage: async ({ page }, use) => {
    await use(new DynamicTableTestPage(page));
  },

  javascriptAlertsPage: async ({ page }, use) => {
    await use(new JavascriptAlertsPage(page));
  },
});
