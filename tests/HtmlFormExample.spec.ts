import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";
import path from "path";
import { getCheckBoxValue, getRadioButtonValue } from "../utils/utils";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToHtmlFormExamplePage();
});

test("Verify the main heading of Html Form Example Page", async ({
  htmlFormExamplePage,
}) => {
  const expectedMainHeading = "Basic HTML Form Example";

  await expect(htmlFormExamplePage.mainHeading).toBeVisible();

  const actualMainHeading = await htmlFormExamplePage.mainHeading.textContent();

  console.table([
    `actualMainHeading -> ${actualMainHeading}`,
    `expectedMainHeading -> ${expectedMainHeading}`,
  ]);

  expect(expectedMainHeading).toBe(actualMainHeading);
});

test("Verify the current URL and Title of Html Form Example Page", async ({
  page,
}) => {
  const expectedURL =
    "https://testpages.eviltester.com/styled/basic-html-form-test.html";
  const expectedTitle = "HTML Form Elements";

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

test("Verify correct data is displayed after submitting the form", async ({
  page,
  htmlFormExamplePage,
}) => {
  /*
  First of fill the form completely, 
  click on submit button and verify the submitted data matches
  */

  const randomSalt = Math.random().toString(36).substring(7);

  const expectedUsername = `username_${randomSalt}`;
  const expectedPassword = `password_${randomSalt}`;
  const expectedTextareaContent = `textarea_${randomSalt}`;
  const selectedCheckBox = getCheckBoxValue(0);
  const selectedRadioButton = getRadioButtonValue(2);
  const expectedFileName = "Xpath-cheat-sheet.png";
  const expectedDropdownValue = "dd6";
  const filePath = path.join(__dirname, "resources", expectedFileName);
  const expectedSubmitURL =
    "https://testpages.eviltester.com/styled/the_form_processor.php";

  console.table([
    `expectedUsername -> ${expectedUsername}`,
    `expectedPassword -> ${expectedPassword}`,
    `expectedTextareaContent -> ${expectedTextareaContent}`,
    `selectedCheckBox -> ${selectedCheckBox}`,
    `selectedRadioButton -> ${selectedRadioButton}`,
    `expectedFileName -> ${expectedFileName}`,
    `expectedSubmitURL -> ${expectedSubmitURL}`,
  ]);

  await htmlFormExamplePage.enterUsername(expectedUsername);
  await htmlFormExamplePage.enterPassword(expectedPassword);
  await htmlFormExamplePage.enterTextArea(expectedTextareaContent);
  await htmlFormExamplePage.chooseFileButton.setInputFiles(filePath);
  await htmlFormExamplePage.checkBoxInput.nth(2).uncheck();
  await htmlFormExamplePage.checkBoxInput.nth(0).check();
  await htmlFormExamplePage.radioInput.nth(2).check();
  await htmlFormExamplePage.multipleSelectTag.selectOption([
    "Selection Item 1",
    "Selection Item 2",
  ]);
  await htmlFormExamplePage.selectDropdown.selectOption({
    value: expectedDropdownValue,
  });
  await htmlFormExamplePage.clickSubmitButton();

  const actualSubmitURL = page.url();

  expect(actualSubmitURL).toBe(expectedSubmitURL);

  const actualUsername = await page.locator("#_valueusername").textContent();
  const actualPassword = await page.locator("#_valuepassword").textContent();
  const actualTextareaContent = await page
    .locator("#_valuecomments")
    .textContent();
  const actualFileName = await page.locator("#_valuefilename").textContent();
  const actualCheckBox = await page.locator("#_valuecheckboxes0").textContent();
  const actualRadioButton = await page.locator("#_valueradioval").textContent();
  const actualDropdown = await page.locator("#_valuedropdown").textContent();
  const actualMultiSelectList = page.locator(
    "//div[@id='_multipleselect']/ul/li"
  );

  // Performing the assertions
  expect(actualUsername).toBe(expectedUsername);
  expect(actualPassword).toBe(expectedPassword);
  expect(actualTextareaContent).toBe(expectedTextareaContent);
  expect(actualFileName).toBe(expectedFileName);
  expect(actualCheckBox).toBe(selectedCheckBox);
  expect(actualRadioButton).toBe(selectedRadioButton);
  expect(actualDropdown).toBe(expectedDropdownValue);

  console.table([
    `actualUsername -> ${actualUsername}`,
    `actualPassword -> ${actualPassword}`,
    `actualTextareaContent -> ${actualTextareaContent}`,
    `actualFileName -> ${actualFileName}`,
    `actualCheckBox -> ${actualCheckBox}`,
    `actualRadioButton -> ${actualRadioButton}`,
    `actualDropdown -> ${actualDropdown}`,
  ]);

  // Specify the expected list items
  const expectedListItems = ["ms1", "ms2"];

  // Iterate through the actual list items and compare with expected values
  for (let i = 0; i < expectedListItems.length; i++) {
    const actualListItem = await actualMultiSelectList.nth(i).textContent();
    console.table([
      `actualListItem -> ${actualListItem}`,
      `expectedListItem -> ${expectedListItems[i]}`,
    ]);
    expect(actualListItem).toBe(expectedListItems[i]);
  }
});
