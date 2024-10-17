import type { Page } from 'playwright';
import * as ui from "../../asset/common-ui";
import { loadLocale } from '../../utils/locale-helper';

export class Search {
  readonly page: Page;
  locale: any;

  constructor(page: Page) {
    this.page = page;
    this.locale = loadLocale('th');
  }

  async verifySearchSelbookingPage() {
    await ui.validateText(this.page, '#txt-where-plan-self', this.locale.welcomeMessage)
    await ui.validateContainsText(this.page, '#txt-where-plan-self', "Where");
    await ui.captureScreenshot(this.page, "welcome-page.png");
  }
}