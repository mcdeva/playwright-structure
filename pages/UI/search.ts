import type { Page } from 'playwright';
import { UI } from "../../utils/common-ui";
import { loadLocale } from '../../utils/helper';
import { locator } from "../../locators/locator";

export class Search {
  page: Page;
  locale: any;
  ui: UI;

  constructor(page: Page) {
    this.page = page;
    this.locale = loadLocale();
    this.ui = new UI(page);
  }

  async verifySearchSelbookingPage() {
    await this.ui.validateText(locator.lblWelcome, this.locale.welcomeMessage)
    await this.ui.validateContainsText(locator.lblWelcome, "Where");
    await this.ui.captureScreenshot("welcome-page.png");
  }
}