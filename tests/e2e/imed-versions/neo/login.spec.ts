import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../../pages/login.page";
import { TEST_LOGIN_DATA } from "../../../../constants/test-data";

test.describe("Login", () => {
  test("User can login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TEST_LOGIN_DATA.VALID_USER.username,
      TEST_LOGIN_DATA.VALID_USER.password,
      TEST_LOGIN_DATA.VALID_USER.branch
    );

    // รอให้ accessToken ถูกเซ็ตใน sessionStorage
    await page.waitForFunction(
      () => sessionStorage.getItem("accessToken") !== null,
      { timeout: 5000 }
    );

    const accessToken = await page.evaluate(() =>
      sessionStorage.getItem("accessToken")
    );

    // ตรวจสอบว่า accessToken ถูกเซ็ตใน sessionStorage
    await expect(accessToken).not.toBeNull();
  });

  test("User can login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TEST_LOGIN_DATA.INVALID_USER.username,
      TEST_LOGIN_DATA.INVALID_USER.password,
      TEST_LOGIN_DATA.INVALID_USER.branch
    );

    // ตรวจสอบว่า Error message แสดงขึ้นมา
    await expect(await loginPage.getErrorMessage()).toContainText(
      "กรุณาตรวจสอบชื่อผู้ใช้/รหัสผ่านให้ถูกต้อง"
    );
  });
});
