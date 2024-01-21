import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToFakeAlertsPage();
});

test("Verify the main heading of Fake Alerts Page", async ({
  fakeAlertsPage,
}) => {
  const expectedMainHeading = "Fake Alert Box Examples";
  const actualMainHeading = await fakeAlertsPage.mainHeading.textContent();

  console.table([
    `actualMainHeading -> ${actualMainHeading}`,
    `expectedMainHeading -> ${expectedMainHeading}`,
  ]);

  expect(expectedMainHeading).toBe(actualMainHeading);
});

test("Verify the current URL and Title of Fake Alerts Page", async ({
  page,
}) => {
  const expectedURL =
    "https://testpages.eviltester.com/styled/alerts/fake-alert-test.html";
  const expectedTitle = "Fake Alerts";

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

test("Verify Fake Alert Box Functionality", async ({
  page,
  fakeAlertsPage,
}) => {
  // First of all verify that active class is not present on the dialog box
  let classList = await fakeAlertsPage.fakeAlertBoxDialog.getAttribute("class");

  expect(classList?.includes("active")).toBe(false);
  console.log("active class not present originally ");

  /*
  Now click on show alert box, and then verify that active attribute has been added
  */

  await fakeAlertsPage.clickShowFakeAlertBox();

  // The dialog box is visible
  await page.waitForSelector(
    "div[role='dialog'][aria-modal='true'].dialog.active"
  );

  // Also check that "I am a fake alert box!" is displayed
  const expectedFakeAlertText = "I am a fake alert box!";
  const actualFakeAlertText = await fakeAlertsPage.dialogText.textContent();

  console.table([
    `actualFakeAlertText -> ${actualFakeAlertText}`,
    `expectedFakeAlertText -> ${expectedFakeAlertText}`,
  ]);

  expect(actualFakeAlertText).toBe(expectedFakeAlertText);

  // Now once again get the classList
  classList = await fakeAlertsPage.fakeAlertBoxDialog.getAttribute("class");

  // Check if the "active" class is present
  const isDialogActive = classList?.includes("active") ?? false;
  expect(isDialogActive).toBe(true);
  console.log("active class added ");
});

test("Verify Modal Dialog Functionality", async ({ page, fakeAlertsPage }) => {
  // First of all verify that active class is not present on the dialog box
  let classList = await fakeAlertsPage.fakeAlertBoxDialog.getAttribute("class");

  expect(classList?.includes("active")).toBe(false);
  console.log("active class not present originally ");

  /*
  Now click on show modalDialog button, and then verify that active attribute has been added
  */

  await fakeAlertsPage.clickShowModalDialogButton();

  // The dialog box is visible
  await page.waitForSelector(
    "div[role='dialog'][aria-modal='true'].dialog.active"
  );

  // Also check that "I am a modal div!!" is displayed
  const expectedModalDialogText = "I am a modal div!";
  const actualModalDialogText = await fakeAlertsPage.dialogText.textContent();

  console.table([
    `actualModalDialogText -> ${actualModalDialogText}`,
    `expectedModalDialogText -> ${expectedModalDialogText}`,
  ]);

  expect(actualModalDialogText).toBe(expectedModalDialogText);

  // Now once again get the classList
  classList = await fakeAlertsPage.fakeAlertBoxDialog.getAttribute("class");

  // Check if the "active" class is present
  const isDialogActive = classList?.includes("active") ?? false;
  expect(isDialogActive).toBe(true);
  console.log("active class added ");
});
