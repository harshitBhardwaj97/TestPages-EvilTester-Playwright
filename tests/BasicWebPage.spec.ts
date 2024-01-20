import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToBasicWebPage();
});

test("Verify the current URL and Title", async ({ page }) => {
  const expectedURL =
    "https://testpages.eviltester.com/styled/basic-web-page-test.html";
  const expectedTitle = "Basic Web Page Title";

  const actualURL = page.url();

  const actualTitle = await page.title();

  console.table([
    `actualTitle -> ${actualTitle}`,
    `expectedTitle -> ${expectedTitle}`,
    `actualUrl -> ${actualURL}`,
    `expectedURL -> ${expectedURL}`,
  ]);

  expect(actualTitle).toBe(expectedTitle);

  expect(actualURL).toBe(expectedURL);
});

test("Verify the main heading", async ({ basicWebPage }) => {
  const expectedHeading = "Basic Web Page Example";

  const actualHeading = await basicWebPage.mainHeading.innerText();

  await expect(basicWebPage.mainHeading).toBeVisible();

  console.table([
    `actualHeading -> ${actualHeading}`,
    `expectedHeading -> ${expectedHeading}`,
  ]);

  expect(actualHeading).toBe(expectedHeading);
});

test("Verify the explanation paragraph", async ({ basicWebPage }) => {
  const expectedText =
    "Very simple web pages have a structure illustrated by this page. And elements can have id and class attributes for styling and locating";

  const actualText = await basicWebPage.explanation.innerText();

  await expect(basicWebPage.explanation).toBeVisible();

  console.table([
    `actualParagraph -> ${actualText}`,
    `expectedParagraph -> ${expectedText}`,
  ]);

  expect(actualText).toContain(expectedText);
});

test("Verify link one is working", async ({ page, basicWebPage }) => {
  const expectedLinkOneURL = "https://www.eviltester.com/";

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    basicWebPage.navigateToLinkOne(),
  ]);

  await newPage.bringToFront();
  const actualLinkOneURL = await newPage.url();

  console.table([
    `actualLinkOne -> ${actualLinkOneURL}`,
    `expectedLinkOne -> ${expectedLinkOneURL}`,
  ]);

  await expect(newPage).toHaveURL(expectedLinkOneURL);
});

test("Verify link two is working", async ({ page, basicWebPage }) => {
  const expectedLinkTwoURL = "https://compendiumdev.co.uk/";

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    basicWebPage.navigateToLinkTwo(),
  ]);

  await newPage.bringToFront();
  const actualLinkTwoURL = await newPage.url();

  console.table([
    `actualLinkTwo -> ${actualLinkTwoURL}`,
    `expectedLinkTwo -> ${expectedLinkTwoURL}`,
  ]);

  await expect(newPage).toHaveURL(expectedLinkTwoURL);
});
