import { test } from "@playwright/test";
import HomePage from "../pages/HomePage";
import { decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";

test("test", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  const loginPage = await homePage.goToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));
  await loginPage.clickLoginButton();
  await homePage.expectLogoutButtonToBeVisible();
});
