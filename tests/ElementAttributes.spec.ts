import { expect } from "@playwright/test";
import { test } from "../fixtures/BaseFixture";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateToElementAttributesPage();
});

test("Verify the main heading of Element Attributes Page", async ({
  elementAttributesPage,
}) => {
  const expectedMainHeading = "Element Attributes Examples";

  await expect(elementAttributesPage.mainHeading).toBeVisible();

  const actualMainHeading =
    await elementAttributesPage.mainHeading.textContent();

  console.table([
    `actualMainHeading -> ${actualMainHeading}`,
    `expectedMainHeading -> ${expectedMainHeading}`,
  ]);

  expect(expectedMainHeading).toBe(actualMainHeading);
});

test("Verify the current URL and Title of Element Attributes Page", async ({
  page,
}) => {
  const expectedURL =
    "https://testpages.eviltester.com/styled/attributes-test.html";
  const expectedTitle = "Test Page For Element Attributes";

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

test("Verify the first paragraph attributes", async ({
  page,
  elementAttributesPage,
}) => {
  // Wait for js attribute to be added
  await page.waitForFunction(() => {
    return (
      document
        .querySelector("#domattributes")
        ?.getAttribute("original-title") !== null
    );
  });

  console.log(
    "original title attribute added by JS !, now checking for presence of all the attributes"
  );

  const firstParagraphWithAttributes =
    elementAttributesPage.firstParagraphWithAttributes;

  const attributes = ["class", "custom-attrib", "title", "original-title"];

  console.log("The following attributes are present on first paragraph - ");

  for (const attribute of attributes) {
    let attr = await firstParagraphWithAttributes.getAttribute(attribute);
    console.log(`${attribute} : ${attr}`);

    // Assert that the attribute exists
    expect(attr).not.toBeNull();
  }
});

test("Verify dynamic attributes getting added in second paragraph", async ({
  elementAttributesPage,
}) => {
  let nextId = 1;

  const secondParagraphWithDynamicJSAttributes =
    elementAttributesPage.secondParagraphWithDynamicJSAttributes;

  // first of all check it has nextid as 1 originally
  await expect(secondParagraphWithDynamicJSAttributes).toHaveAttribute(
    "nextid",
    nextId.toString()
  );

  /* 
  Now click on add another attribute, 
  and check nextid is changed to 2, 
  and a custom-1 attribute with "value-1" has been added.
  Repeat this for 3 times (nextId will always be 1 less than custom-{nextId})
  */

  for (let i = 1; i < 4; i++) {
    await elementAttributesPage.clickOnAddAnotherAttributeButton();

    expect(
      elementAttributesPage.secondParagraphWithDynamicJSAttributes
    ).toHaveAttribute(`custom-${nextId}`, `value-${nextId}`);

    console.log(
      "Current Nextid attribute -> ",
      await elementAttributesPage.secondParagraphWithDynamicJSAttributes.getAttribute(
        "nextid"
      )
    );
    console.log(
      `After clicking on button, custom-${nextId} -> `,
      await elementAttributesPage.secondParagraphWithDynamicJSAttributes.getAttribute(
        `custom-${nextId}`
      )
    );
    nextId++;
  }
});
