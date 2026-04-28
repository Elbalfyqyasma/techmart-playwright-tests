import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  private readonly usernameInputSelector = "#email";
  private readonly passwordInputSelector = "#password";
  private readonly loginButtonSelector = "#Login";
  // ✅ Avec getByRole (Locator)
  private readonly loginButton: Locator;

  constructor(private page: Page) {
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }

  async navigateToLoginPage() {
    await this.page.goto("/login");
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click().catch((error) => {
      console.error(`eroor clicking login button: ${error}`);
      throw error;
    });
  }
}
