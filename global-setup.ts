import { Browser, chromium, Page } from "@playwright/test";
import * as ui from "./asset/common-ui";
import * as data from "./config/QA.json";

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await ui.navigateTo(page, data.url);
  await ui.clickElement(page, '#btn-cookie-save-all');
  await ui.fillText(page, '[data-testid="txt-email"]', 'rukpong.r@arcadiaapm.com');
  await ui.fillText(page, '[data-testid="txt-password"]', 'Tmp1234!');
  await ui.clickElement(page, '#btn-login');
  await ui.validateText(page, '#notistack-snackbar', 'Login successfully');

  await page.context().storageState({ path: "./login-auth.json"})
  await browser.close();
}

export default globalSetup;