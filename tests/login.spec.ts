import { test, expect } from '../fixtures';
import { EnvConfig } from '../utils/envLoader';
import { LangConfig } from '../utils/localeLoader';

test.describe(`Login Functionality (${LangConfig.currentLang})`, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(EnvConfig.baseURL);
  });

  test(`should allow a standard user to login successfully`, async ({ page, loginPage, homePage, users }) => {
    const user = users?.standardUser;
    await loginPage.login(user.username, user.password);
    await homePage.verifyPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('Login successful for standard user');
  });

  test('should show an error message for locked out user', async ({ loginPage, users }) => {
    const user = users?.lockedOutUser;
    console.log('Running test: should show an error message for locked out user');
    await loginPage.login(user.username, user.password);
    console.log('Error message verified for locked out user.');
  });

  test('should show an error message for invalid credentials', async ({ loginPage, users }) => {
    const user = users?.invalidUser;
    console.log('Running test: should show an error message for invalid credentials');
    await loginPage.login(user.username, user.password);
    await loginPage.verifyCredentialError();
    console.log('Error message verified for invalid credentials.');
  });

  test('should display all products', async ({ page, loginPage, homePage, users, products }) => {
    const user = users?.standardUser;
    await loginPage.login(user.username, user.password);
    await homePage.verifyInventory(6);
    for (const product of products ?? []) {
      await expect(page.locator(`.inventory_item_name:has-text("${product.name}")`)).toBeVisible();
      await expect(page.locator(`.inventory_item_price:has-text("${product.price}")`)).toBeVisible();
    }
  })
});