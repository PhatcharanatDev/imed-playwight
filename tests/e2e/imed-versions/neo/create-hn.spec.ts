import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../../pages/login.page";
import { TEST_LOGIN_DATA } from "../../../../constants/test-data";
import { faker } from "@faker-js/faker";

test.describe("Create HN", () => {
  test("Create HN Successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TEST_LOGIN_DATA.REGISTER_USER.username,
      TEST_LOGIN_DATA.REGISTER_USER.password,
      TEST_LOGIN_DATA.REGISTER_USER.branch
    );

    await page.getByRole('link', { name: 'Info' }).click();
    await page.getByRole("combobox", { name: "* Name :" }).click();
    await page.getByRole("combobox", { name: "* Name :" }).fill("นาย");

    await page.locator("#firstName").click();
    await page.locator("#firstName").fill(faker.person.firstName());

    await page.getByRole("textbox", { name: "* Last name :" }).click();
    await page
      .getByRole("textbox", { name: "* Last name :" })
      .fill(faker.person.lastName());
    await page.getByRole("textbox", { name: "DOB :" }).click();
    await page.getByTitle("-02-27").locator("div").click();
    await page.getByRole('button', { name: 'save Update', exact: true }).click();
  });
});
