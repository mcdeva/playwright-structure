import { test, expect } from '../fixtures';
import { EnvConfig } from '../utils/envLoader';
import { LangConfig } from '../utils/localeLoader';
import { takeScreenshotWithDelay } from '../utils/screenshotHelper';

test.describe(`Login Functionality (${LangConfig.currentLang})`, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(EnvConfig.baseURL);
  });

  test(`UI001 should allow a standard user to login successfully`, async ({ page, loginPage, homePage, users }, testInfo) => {
    await test.step('Login', async () => {
      const user = users?.standardUser;
      await loginPage.login(user.username, user.password);
    });
    await test.step('Verify Go To Home Page', async () => {
      await homePage.verifyPage();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      console.log('Login successful for standard user');
    });
    await takeScreenshotWithDelay(page, testInfo, 'UI001.png');
  });

  test('UI002 should show an error message for locked out user', async ({ page, loginPage, users }, testInfo) => {
    await test.step('Login By Locked User', async () => {
      const user = users?.lockedOutUser;
      console.log('Running test: should show an error message for locked out user');
      await loginPage.login(user.username, user.password);
      console.log('Error message verified for locked out user.');
    });
    await takeScreenshotWithDelay(page, testInfo, 'UI002.png');
  });

  test('UI003 should show an error message for invalid credentials', async ({ page, loginPage, users }, testInfo) => {
    await test.step('Login By Invalid Credentials', async () => {
      const user = users?.invalidUser;
      console.log('Running test: should show an error message for invalid credentials');
      await loginPage.login(user.username, user.password);
      await loginPage.verifyCredentialError();
      console.log('Error message verified for invalid credentials.');
    });
    await takeScreenshotWithDelay(page, testInfo, 'UI003.png');
  });

  test('UI004 should display all products', async ({ page, loginPage, homePage, users, products }, testInfo) => {
    await test.step('Login', async () => {
      const user = users?.standardUser;
      await loginPage.login(user.username, user.password);
    });
    await test.step('Verify Inventory', async () => {
      await homePage.verifyInventory(6);
      for (const product of products ?? []) {
        await expect(page.locator(`.inventory_item_name:has-text("${product.name}")`)).toBeVisible();
        await expect(page.locator(`.inventory_item_price:has-text("${product.price}")`)).toBeVisible();
      }
    });
    await takeScreenshotWithDelay(page, testInfo, 'UI004.png');
  })
});