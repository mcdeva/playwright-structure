import { test, expect } from '../fixtures/test-fixtures.js';
import { getMessage, loadLanguage } from '../utils/localeLoader.js';
import { envConfig } from '../utils/envLoader.js';

const lang = process.env.TEST_LANG || 'en';
loadLanguage(lang);

test.describe(`Login Functionality (${lang})`, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(envConfig.baseURL);
  });

  test(`should allow a standard user to login successfully`, async ({ page, loginPage, homePage, testData }) => {
    const user = testData.users.standardUser;
    await loginPage.login(user.username, user.password);
    await expect(homePage.title).toBeVisible();
    await expect(homePage.title).toHaveText(getMessage('homePage.productTitle'));
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('Login successful for standard user');
  });

  test('should show an error message for locked out user', async ({ loginPage, testData }) => {
    const user = testData.users.lockedOutUser;
    console.log('Running test: should show an error message for locked out user');
    await loginPage.login(user.username, user.password);
    await expect(loginPage.errorMessage).toHaveText(getMessage('loginPage.lockedOutUserError'));
    console.log('Error message verified for locked out user.');
  });

  test('should show an error message for invalid credentials', async ({ loginPage, testData }) => {
    const user = testData.users.invalidUser;
    console.log('Running test: should show an error message for invalid credentials');
    await loginPage.login(user.username, user.password);
    await expect(loginPage.errorMessage).toHaveText(getMessage('loginPage.invalidCredentialsError'))
    console.log('Error message verified for invalid credentials.');
  });

  test('should display all products', async ({ page, loginPage, homePage, testData }) => {
    const user = testData.users.standardUser;
    await loginPage.login(user.username, user.password);
    await expect(homePage.inventoryItems).toHaveCount(6);

    for (const product of testData.products) {
      await expect(page.locator(`.inventory_item_name:has-text("${product.name}")`)).toBeVisible();
      await expect(page.locator(`.inventory_item_price:has-text("${product.price}")`)).toBeVisible();
    }
  })
});