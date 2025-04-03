import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private baseURL = `http://192.168.9.174:9990/neo`;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = this.baseURL;
  }

  async goto() {
    await this.page.goto(this.baseURL);
  }

  async login(username: string, password: string, branch: string) {
    const usernameElem = await this.page.getByRole("textbox", {
      name: "Username",
    });
    const passwordElem = await this.page.getByRole("textbox", {
      name: "Password",
    });

    await this.page.locator("#branch").click();
    await this.page.getByText(branch).click();
    await usernameElem.click();
    await usernameElem.fill(username);
    await usernameElem.press("Tab");
    await passwordElem.fill(password);
    await this.page.getByRole("button", { name: "login Login" }).click();
  }

  

  async getErrorMessage() {
    return this.page.locator("body");
  }
}
