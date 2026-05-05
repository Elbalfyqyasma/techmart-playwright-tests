import { Page, Locator } from "@playwright/test";
import logger from "../utils/LoggerUtil";
export default class LoginPage {
  private readonly usernameInputSelector = "#email";
  private readonly passwordInputSelector = "#passwor";
  private readonly loginButtonSelector = "#Login";
  private readonly loginButton: Locator;

  constructor(private page: Page) {
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    logger.info("LoginPage initialized");
  }

  async navigateToLoginPage() {
    await this.page.goto("/login");
    logger.info("Navigation to Login Page successful");
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
    logger.info("Username filled successfully"); // ✅ reflects function role
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
    logger.info("Password filled successfully"); // ✅ reflects function role
  }

  async clickLoginButton() {
    try {
      await this.loginButton.click();
      logger.info("Login form submitted successfully"); // ✅ reflects function role
    } catch (error) {
      logger.error(`Failed to submit Login form: ${error}`); // ✅
      throw error;
    }
  }
}
