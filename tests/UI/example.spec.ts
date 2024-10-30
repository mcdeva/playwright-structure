import { test, expect } from '@playwright/test';
import { UI } from "../../utils/common-ui";
import * as data from "../../data/QA.json";
import { Search } from "../../pages/UI/search";
import { locator } from '../../locators/locator';

test.use({ storageState: './login-auth.json' });

test('test', async ({ page }) => {
  const ui = new UI(page);
  await ui.navigateTo(data.urlSelfBooking);
  const search = new Search(page);
  await search.verifySearchSelbookingPage();
  await ui.clickElement(locator.ddlLeavingFrom);
  await ui.typeText(locator.txtLeavingFrom, '12345');
  await ui.captureScreenshot('test-type-text.png');
});