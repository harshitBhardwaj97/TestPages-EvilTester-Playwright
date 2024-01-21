import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToTableTestPage();
});

test("Verify the main heading of Table Test Page", async ({
  tableTestPage,
}) => {
  const expectedMainHeading = "HTML TABLE Tag";
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
  const expectedURL = "https://testpages.eviltester.com/styled/tag/table.html";
  const expectedTitle = "Table HTML Tag";

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

test("Verify the table rows count and data", async ({
  page,
  tableTestPage,
}) => {
  const expectedTableData = [
    { Name: "Name", Amount: "Amount" },
    { Name: "Alan", Amount: "12" },
    { Name: "Bob", Amount: "23" },
    { Name: "Aleister", Amount: "33.3" },
    { Name: "Douglas", Amount: "42" },
  ];

  const expectedRowCount = expectedTableData.length;

  const actualRowCount = await tableTestPage.tableRows.count();

  console.table([
    `actualRowCount -> ${actualRowCount}`,
    `expectedRowCount -> ${expectedRowCount}`,
  ]);

  expect(actualRowCount).toBe(expectedRowCount);

  for (let i = 0; i < 5; i++) {
    const name = await page.evaluate(
      (rowIndex) =>
        rowIndex === 0
          ? document.querySelector(
              `table#mytable tbody tr:nth-child(${
                rowIndex + 1
              }) th:nth-child(1)`
            )?.textContent
          : document.querySelector(
              `table#mytable tbody tr:nth-child(${
                rowIndex + 1
              }) td:nth-child(1)`
            )?.textContent,
      i
    );

    const amount = await page.evaluate(
      (rowIndex) =>
        rowIndex === 0
          ? document.querySelector(
              `table#mytable tbody tr:nth-child(${
                rowIndex + 1
              }) th:nth-child(2)`
            )?.textContent
          : document.querySelector(
              `table#mytable tbody tr:nth-child(${
                rowIndex + 1
              }) td:nth-child(2)`
            )?.textContent,
      i
    );

    console.log(`Row ${i + 1} content -> ${name} , ${amount}`);

    // Verify each row against the expected data
    expect(name).toBe(expectedTableData[i].Name);
    expect(amount).toBe(expectedTableData[i].Amount);
  }
});
