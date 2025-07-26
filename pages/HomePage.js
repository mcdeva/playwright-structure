export default class HomePage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.app_logo');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async getTitleText() {
    return await this.title.textContent();
  }

  async getNumberOfItems() {
    return await this.inventoryItems.count();
  }

  async navigateToCart() {
    await this.cartIcon.click();
  }
}