import { Browser, chromium, Page } from "@playwright/test";
import { UI } from "./utils/common-ui";
import { loadDataSite, loadLocale } from "./utils/helper";
import { locator } from "./locators/locator";

const data = loadDataSite()
const locale = loadLocale();

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  const ui = new UI(page);
  await ui.navigateTo(data.url);
  await ui.clickElement(locator.btnAcceptCookie);
  await ui.fillText(locator.txtEmail, data.email);
  await ui.fillText(locator.txtPassword, data.password);
  await ui.clickElement(locator.btnLogin);
  await ui.validateText(locator.lblNotiStack, locale.loginNotiStackMessage);

  await page.context().storageState({ path: "./login-auth.json" });
  await browser.close();
}

export default globalSetup;