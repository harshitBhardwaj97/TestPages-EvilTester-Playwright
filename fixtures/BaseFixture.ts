import { test as base } from "@playwright/test";
import HomePage from "../pages/HomePage";
import BasicWebPage from "../pages/BasicWebPage";
import ElementAttributesPage from "../pages/ElementAttributesPage";
import WebDriverPage from "../pages/WebDriverPage";

type Pages = {
  homePage: HomePage;
  basicWebPage: BasicWebPage;
  elementAttributesPage: ElementAttributesPage;
  webDriverPage: WebDriverPage;
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
});
