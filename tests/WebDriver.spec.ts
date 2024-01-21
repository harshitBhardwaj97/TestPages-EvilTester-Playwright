import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";
import {
  getRandomNumber,
  getDigitsArray,
  getNumToTextForDisplay,
} from "../utils/utils";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToWebDriverPage();
});

test("Verify the main heading of Web Driver Page", async ({
  webDriverPage,
}) => {
  const expectedMainHeading = "Example Page Heading One";

  await expect(webDriverPage.mainHeading).toBeVisible();

  const actualMainHeading = await webDriverPage.mainHeading.textContent();

  console.table([
    `expectedMainHeading -> ${expectedMainHeading}`,
    `actualMainHeading -> ${actualMainHeading}`,
  ]);

  expect(expectedMainHeading).toBe(actualMainHeading);
});

test("Verify the current URL and Title of Web Driver Page", async ({
  page,
}) => {
  const expectedURL =
    "https://testpages.eviltester.com/styled/webdriver-example-page";
  const expectedTitle = "Example Page Title";

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

test("Verify Show as Alert Functionality with Random Numeric Values", async ({
  page,
  webDriverPage,
}) => {
  /*
  First of all generate a random number, say between 1000 and 100000
  then convert it into format 1234 => "one, two, three, four"
  and then enter that number and match it with alert text
  */

  const randomNumber = getRandomNumber(1000, 10000);
  const numArray = getDigitsArray(randomNumber);
  const expectedNumberResult = getNumToTextForDisplay(numArray);
  let actualNumberResult;
  await webDriverPage.enterDataInNumInput(randomNumber.toString());

  page.on("dialog", (dialog) => {
    actualNumberResult = dialog.message();
    dialog.accept();
  });

  await webDriverPage.clickShowAsAlertButton();

  console.table([
    `actualNumberResult -> ${actualNumberResult}`,
    `expectedNumberResult -> ${expectedNumberResult}`,
  ]);

  // Expect Actual and Expected Numbers to match
  expect(actualNumberResult).toBe(expectedNumberResult);
});

test("Verify Show as Para Functionality with Random Numeric Values", async ({
  page,
  webDriverPage,
}) => {
  /*
  First of all generate a random number, say between 1000 and 100000
  then convert it into format 1234 => "one, two, three, four"
  and then enter that number and match the result
  */

  // Originally style attribute should not be present
  expect(await webDriverPage.resultParagraph.getAttribute("style")).toBeNull();

  const randomNumber = getRandomNumber(1000, 10000);
  const numArray = getDigitsArray(randomNumber);
  const expectedNumberResult = getNumToTextForDisplay(numArray);

  await webDriverPage.enterDataInNumInput(randomNumber.toString());

  await webDriverPage.clickShowAsParaButton();

  await expect(webDriverPage.resultParagraph).toBeVisible();

  console.log("Number displayed");

  //Now style attribute should be added
  expect(
    await webDriverPage.resultParagraph.getAttribute("style")
  ).not.toBeNull();

  const actualNumberResult = await webDriverPage.resultParagraph.textContent();

  console.table([
    `actualNumberResult -> ${actualNumberResult}`,
    `expectedNumberResult -> ${expectedNumberResult}`,
  ]);

  // Expect Actual and Expected Numbers to match
  expect(actualNumberResult).toBe(expectedNumberResult);

  // Wait for data-vals attribute to be updated
  await page.waitForFunction(() => {
    return (
      document.querySelector("#message")?.getAttribute("data-vals") !== null &&
      document.querySelector("#message")?.getAttribute("data-vals") != ""
    );
  });

  const dataValAttr = await webDriverPage.resultParagraph.getAttribute(
    "data-vals"
  );

  expect(dataValAttr).toBe(randomNumber.toString());
});

test("Verify Show From Link Functionality", async ({ page, webDriverPage }) => {
  /*
 Click on show for link, and then check for the url
  */

  const expectedURL =
    "https://testpages.eviltester.com/styled/webdriver-example-page?number-entry=123456789";

  await webDriverPage.clickShowFromLink();

  const actualURL = page.url();

  console.table([`actualURL -> ${actualURL}`, `expectedURL -> ${expectedURL}`]);

  // Expect Actual and Expected URLs to match
  expect(actualURL).toBe(expectedURL);

  const expectedNumberResult =
    "one, two, three, four, five, six, seven, eight, nine";

  const actualNumberResult = await webDriverPage.resultParagraph.textContent();

  console.table([
    `actualNumberResult -> ${actualNumberResult}`,
    `expectedNumberResult -> ${expectedNumberResult}`,
  ]);

  // Expect Actual and Expected Numbers to match
  expect(actualNumberResult).toBe(expectedNumberResult);
});

test("Verify Process on Server Functionality", async ({
  page,
  webDriverPage,
}) => {
  /*
  First of all generate a random number, say between 1000 and 100000
  then convert it into format 1234 => "one, two, three, four",
  then enter that number, click on Process on Server and match the result
  */

  const randomNumber = getRandomNumber(1000, 10000);
  const numArray = getDigitsArray(randomNumber);
  const expectedNumberResult = getNumToTextForDisplay(numArray);

  const expectedURL = `https://testpages.eviltester.com/styled/webdriver-example-page?number-entry=${randomNumber}`;

  await webDriverPage.enterDataInNumInput(randomNumber.toString());

  await webDriverPage.clickProcessOnServerButton();

  const actualURL = page.url();

  console.table([`actualURL -> ${actualURL}`, `expectedURL -> ${expectedURL}`]);

  // Expect Actual and Expected URLs to match
  expect(actualURL).toBe(expectedURL);

  const actualNumberResult = await webDriverPage.resultParagraph.textContent();

  console.table([
    `actualNumberResult -> ${actualNumberResult}`,
    `expectedNumberResult -> ${expectedNumberResult}`,
  ]);

  // Expect Actual and Expected Numbers to match
  expect(actualNumberResult).toBe(expectedNumberResult);
});
