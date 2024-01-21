import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToJavascriptAlertsPage();
});

test("Verify the main heading of Javascript Alerts Page", async ({
  javascriptAlertsPage,
}) => {
  const expectedMainHeading = "Alert Box Examples";
  const actualMainHeading =
    await javascriptAlertsPage.mainHeading.textContent();

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
    "https://testpages.eviltester.com/styled/alerts/alert-test.html";
  const expectedTitle = "Test Page For JavaScript Alerts";

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

test("Verify the Alert Functionality", async ({
  page,
  javascriptAlertsPage,
}) => {
  const expectedAlertMessage = "I am an alert box!";

  const expectedAlertAcceptMessage =
    "You triggered and handled the alert dialog";

  const dialogPromise = new Promise((resolve) => {
    page.on("dialog", (dialog) => {
      console.log("Alert Message displayed successfully.");
      const actualAlertMessage = dialog.message();

      expect(actualAlertMessage).toBe(expectedAlertMessage);

      dialog.accept();
      resolve(actualAlertMessage);
    });
  });

  await javascriptAlertsPage.clickShowAlertBoxButton();

  const actualAlertMessage = await dialogPromise;

  const actualAlertAcceptMessage =
    await javascriptAlertsPage.alertExplanation.textContent();

  expect(actualAlertAcceptMessage).toBe(expectedAlertAcceptMessage);

  console.table([
    `actualAlertMessage -> ${actualAlertMessage}`,
    `expectedAlertMessage -> ${expectedAlertMessage}`,
    `actualAlertAcceptMessage -> ${actualAlertAcceptMessage}`,
    `expectedAlertAcceptMessage -> ${expectedAlertAcceptMessage}`,
  ]);
});

test("Verify Confirm OK Functionality", async ({
  page,
  javascriptAlertsPage,
}) => {
  const expectedConfirmMessage = "I am a confirm alert";

  const expectedConfirmOKCombination = {
    booleanValue: "true",
    explanation: "You clicked OK, confirm returned true.",
  };

  page.on("dialog", async (dialog) => {
    console.log("Confirm Alert opened");

    const actualConfirmMessage = dialog.message();
    console.table([
      `actualConfirmMessage -> ${actualConfirmMessage}`,
      `expectedConfirmMessage -> ${expectedConfirmMessage}`,
    ]);

    expect(actualConfirmMessage).toBe(expectedConfirmMessage);

    dialog.accept();
  });

  await javascriptAlertsPage.clickShowConfirmBoxButton();

  const actualConfirmOKCombination = {
    booleanValue: await javascriptAlertsPage.confirmBoolean.textContent(),
    explanation: await javascriptAlertsPage.confirmExplanation.textContent(),
  };

  console.log(
    await javascriptAlertsPage.confirmBoolean.textContent(),
    await javascriptAlertsPage.confirmExplanation.textContent()
  );

  expect(actualConfirmOKCombination).toEqual(expectedConfirmOKCombination);
});

test("Verify Confirm Dismiss Functionality", async ({
  page,
  javascriptAlertsPage,
}) => {
  const expectedConfirmMessage = "I am a confirm alert";

  const expectedConfirmCancelCombination = {
    booleanValue: "false",
    explanation: "You clicked Cancel, confirm returned false.",
  };

  page.on("dialog", async (dialog) => {
    console.log("Confirm Alert opened");

    const actualConfirmMessage = dialog.message();
    console.table([
      `actualConfirmMessage -> ${actualConfirmMessage}`,
      `expectedConfirmMessage -> ${expectedConfirmMessage}`,
    ]);

    expect(actualConfirmMessage).toBe(expectedConfirmMessage);

    dialog.dismiss();
  });

  await javascriptAlertsPage.clickShowConfirmBoxButton();

  const actualConfirmCancelCombination = {
    booleanValue: await javascriptAlertsPage.confirmBoolean.textContent(),
    explanation: await javascriptAlertsPage.confirmExplanation.textContent(),
  };

  console.log(
    await javascriptAlertsPage.confirmBoolean.textContent(),
    await javascriptAlertsPage.confirmExplanation.textContent()
  );

  expect(actualConfirmCancelCombination).toEqual(
    expectedConfirmCancelCombination
  );
});

test("Verify Prompt OK Functionality", async ({
  page,
  javascriptAlertsPage,
}) => {
  const randomSalt = Math.random().toString(36).substring(7);
  const textToEnter = `PromptOK_${randomSalt}`;

  page.on("dialog", async (dialog) => {
    console.log("Prompt Box opened");
    await dialog.accept(textToEnter);
  });

  await javascriptAlertsPage.clickShowPromptBoxButton();

  const actualText = await javascriptAlertsPage.promptReturn.textContent();

  const expectedPromptOKCombination = {
    returnValue: textToEnter,
    explanation: `You clicked OK. 'prompt' returned  ${textToEnter}`,
  };

  const actualPromptOKCombination = {
    returnValue: await javascriptAlertsPage.promptReturn.textContent(),
    explanation: await javascriptAlertsPage.promptExplanation.textContent(),
  };

  console.table([
    `expectedReturn -> ${textToEnter}`,
    `actualReturn -> ${await javascriptAlertsPage.promptReturn.textContent()}`,
    `expectedExplanation -> You clicked OK. 'prompt' returned ${textToEnter}`,
    `actualExplanation -> ${await javascriptAlertsPage.promptExplanation.textContent()}`,
  ]);

  expect(actualPromptOKCombination).toEqual(expectedPromptOKCombination);
});

test("Verify Prompt Cancel Functionality", async ({
  page,
  javascriptAlertsPage,
}) => {
  page.on("dialog", async (dialog) => {
    console.log("Prompt Box opened");
    await dialog.dismiss();
  });

  await javascriptAlertsPage.clickShowPromptBoxButton();

  const expectedText = "You clicked Cancel. 'prompt' returned null";

  const actualText = await javascriptAlertsPage.promptExplanation.textContent();

  console.table([
    `expectedText -> ${expectedText}`,
    `actualText -> ${actualText}`,
  ]);

  expect(actualText).toEqual(expectedText);
});
