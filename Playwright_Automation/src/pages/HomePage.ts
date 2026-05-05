import { Page, Locator, expect } from "@playwright/test";
import LoginPage from "./loginPage";
import { error } from "node:console";
import logger from "../utils/LoggerUtil";

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
    try {
      await this.loginButton.click();
      logger.info("Navigation to Login Page successful"); // ✅ only runs if click succeeded
    } catch (error) {
      logger.error(`Failed to navigate to Login Page: ${error}`); // ✅ only runs if click failed
      throw error;
    }
    return new LoginPage(this.page);
  }

  // 2. Simplifier expectLogoutButtonToBeVisible
  async expectLogoutButtonToBeVisible() {
    await expect(this.logoutButton).toBeVisible({ timeout: 15000 });
  }
}
