import { test } from "@playwright/test";
import HomePage from "../pages/HomePage";

test("test", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  const loginPage = await homePage.goToLoginPage();
  await loginPage.fillUsername("demo@techmart.com");
  await loginPage.fillPassword("demo123");
  await loginPage.clickLoginButton();
  await homePage.expectLogoutButtonToBeVisible();
});
