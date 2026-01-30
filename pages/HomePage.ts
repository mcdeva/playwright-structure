import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LangConfig } from '../utils/localeLoader';

export class HomePage {
  constructor(public readonly page: Page) { }

  private get main() {
    return {
      lblTitle: this.page.locator('.app_logo'),
      icnCartIcon: this.page.locator('.shopping_cart_link'),
      lblInventoryItems: this.page.locator('.inventory_item'),
    };
  }

  async getTitleText() {
    return await this.main.lblTitle.textContent();
  }

  async getNumberOfItems() {
    return await this.main.icnCartIcon.count();
  }

  async navigateToCart() {
    await this.main.lblInventoryItems.click();
  }

  async verifyPage() {
    await expect(this.main.lblTitle).toBeVisible();
    await expect(this.main.lblTitle).toHaveText(LangConfig.homePage.productTitle);
  }

  async verifyInventory(item: number) {
    await expect(this.main.lblInventoryItems).toHaveCount(item);
  }
}