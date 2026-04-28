import { Page, Locator, expect } from "@playwright/test";
import LoginPage from "./loginPage";

export default class HomePage {
  private readonly loginButton: Locator;
  private readonly logoutButton: Locator;

  constructor(private page: Page) {
    this.loginButton = this.page.getByRole("link", { name: "Login" });
    this.logoutButton = this.page.getByRole("button", { name: "Logout" });
  }

  async navigateToHomePage() {
    await this.page.goto("/");
  }

  async goToLoginPage(): Promise<LoginPage> {
    await this.loginButton.click();
    return new LoginPage(this.page);
  }

  // 2. Simplifier expectLogoutButtonToBeVisible
  async expectLogoutButtonToBeVisible() {
    await expect(this.logoutButton).toBeVisible({ timeout: 15000 });
  }
}
