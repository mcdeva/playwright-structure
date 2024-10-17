import { test, expect } from '@playwright/test';
import * as ui from "../../asset/common-ui";
import * as data from "../../config/QA.json";

test.use({ storageState: './login-auth.json' });

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('test', async ({ page }) => {
  await ui.navigateTo(page, data.urlSelfBooking);
  await ui.validateText(page, '#txt-where-plan-self', 'Where is your plan today ?')
  await ui.captureScreenshot(page, "welcome-page.png");
});