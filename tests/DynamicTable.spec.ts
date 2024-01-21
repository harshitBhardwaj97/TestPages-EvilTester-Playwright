import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToDynamicTableTestPage();
});

test("Verify the main heading of Table Test Page", async ({
  tableTestPage,
}) => {
  const expectedMainHeading = "Dynamic HTML TABLE Tag";
  const actualMainHeading = await tableTestPage.mainHeading.textContent();

  console.table([
    `actualMainHeading -> ${actualMainHeading}`,
    `expectedMainHeading -> ${expectedMainHeading}`,
  ]);

  expect(expectedMainHeading).toBe(actualMainHeading);
});

test("Verify the current URL and Title of Table Test Page", async ({
  page,
}) => {
  const expectedURL =
    "https://testpages.eviltester.com/styled/tag/dynamic-table.html";
  const expectedTitle = "Table HTML Tag - JavaScript Created";

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

test("Verify the dynamic Id functionality of Table", async ({
  dynamicTableTestPage,
}) => {
  const expectedIdBefore = "dynamictable";

  const actualIdBefore = await dynamicTableTestPage.table.getAttribute("id");

  console.table([
    `actualIdBefore -> ${actualIdBefore}`,
    `expectedIdBefore -> ${expectedIdBefore}`,
  ]);

  expect(actualIdBefore).toBe(expectedIdBefore);

  /*
  Now change the id, click on refresh table and then verify Id has been changed
  */

  const randomSalt = Math.random().toString(36).substring(7);

  const expectedIdAfter = `changedId_${randomSalt}`;

  await dynamicTableTestPage.clickTableDataButton();

  await dynamicTableTestPage.enterId(expectedIdAfter);

  await dynamicTableTestPage.clickRefreshTableButton();

  const actualIdAfter = await dynamicTableTestPage.table.getAttribute("id");

  console.table([
    `actualIdAfter -> ${actualIdAfter}`,
    `expectedIdAfter -> ${expectedIdAfter}`,
  ]);

  expect(actualIdAfter).toBe(expectedIdAfter);
});

test("Verify the dynamic caption functionality of Table", async ({
  dynamicTableTestPage,
}) => {
  const expectedCaptionBefore = "Dynamic Table";

  const actualCaptionBefore =
    await dynamicTableTestPage.tableCaption.textContent();

  console.table([
    `actualCaptionBefore -> ${actualCaptionBefore}`,
    `expectedCaptionBefore -> ${expectedCaptionBefore}`,
  ]);

  expect(actualCaptionBefore).toBe(expectedCaptionBefore);

  /*
  Now change the caption, click on refresh table, and then verify caption has been changed
  */

  const randomSalt = Math.random().toString(36).substring(7);

  const expectedCaptionAfter = `changedCaption_${randomSalt}`;

  await dynamicTableTestPage.clickTableDataButton();

  await dynamicTableTestPage.enterCaption(expectedCaptionAfter);

  await dynamicTableTestPage.clickRefreshTableButton();

  const actualCaptionAfter =
    await dynamicTableTestPage.tableCaption.textContent();

  console.table([
    `actualCaptionAfter -> ${actualCaptionAfter}`,
    `expectedCaptionAfter -> ${expectedCaptionAfter}`,
  ]);

  expect(actualCaptionAfter).toBe(expectedCaptionAfter);
});
