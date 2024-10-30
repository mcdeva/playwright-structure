import type { Page } from 'playwright';

export class UI {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // action
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async goBack() {
    await this.page.goBack();
  }

  // Press for each the character in the text.
  async typeText(selector: string, text: string) {
    const elementHandle = this.page.locator(selector);
    if (elementHandle) {
      await this.clickElement(selector);
      await elementHandle.pressSequentially(text, { delay: 50 });
    } else {
      throw new Error(`Element with selector: \`${selector}\` not found.`);
    }
  }

  async fillText(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async clearText(selector: string) {
    await this.page.fill(selector, '');
  }

  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  async checkedElement(selector: string) {
    await this.page.check(selector);
  }

  async uncheckedElement(selector: string) {
    await this.page.uncheck(selector);
  }

  async hoverElement(selector: string) {
    await this.page.hover(selector);
  }

  async scrollToElement(selector: string): Promise<void> {
    const elementHandle = this.page.locator(selector);
    if (elementHandle) {
      await elementHandle.scrollIntoViewIfNeeded();
    } else {
      throw new Error(`Element with selector: \`${selector}\` not found.`);
    }
  }

  async pressKeyArrowRight(page: Page) {
    await page.keyboard.press('ArrowRight');
  }

  async pressKeyArrowLeft(page: Page) {
    await page.keyboard.press('ArrowLeft');
  }

  // get
  async getText(selector: string): Promise<string> {
    const elementHandle = this.page.locator(selector);
    const textContent = await elementHandle.textContent();
    return textContent ?? '';
  }

  async getAttribute(selector: string, attribute: string): Promise<string> {
    const element = this.page.locator(selector);
    const value = await element.getAttribute(attribute);
    return value ?? '';
  }

  // wait
  // time unit millisecond - default 500 ms
  async sleep(timeout: number=500) {
    await this.page.waitForTimeout(timeout);
  }

  // time unit millisecond - default 500 ms
  async waitForPageLoad(timeout: number=500) {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  // time unit millisecond - default 5000 ms
  async waitElement(selector: string, timeout: number=5000) {
  await this.page.waitForSelector(selector, { timeout });
  }

  // validate
  async validateText(selector: string, expectedText: string) {
    const actualText = await this.page.textContent(selector);
    if (actualText !== expectedText) {
      throw new Error(`Validation failed: Expected element \`${selector}\` text: \`${expectedText}\`, but got: \`${actualText}\`.`);
    }
  }

  async validateContainsText(selector: string, expectedText: string) {
    const actualText = await this.page.textContent(selector);
    if (!actualText?.includes(expectedText)) {
      throw new Error(`Validation failed: Expected text: \`${expectedText}\` contains in element: \`${selector}\`. Actual text: \`${actualText}\`.`);
    }
  }

  async validateMatchRegex(selector: string, regex: RegExp) {
    const actualText = await this.getText(selector);
    const match = await this.isMatchRegex(selector, regex);
    if (!match) {
      throw new Error(`Validation failed: Expected element \`${selector}\` is match regex: \`${regex}\`. Actual text: \`${actualText}\`.`);
    }
  }

  async validateValue(selector: string, expectedValue: string) {
    const actualValue = await this.getAttribute(selector, 'value');
    if (actualValue !== expectedValue) {
      throw new Error(`Validation failed: Expected element \`${selector}\` value: \`${expectedValue}\`, but got \`${actualValue}\`.`);
    }
  }

  async validatePlaceholder(selector: string, expectedPlaceholder: string) {
    const actualPlaceholder = await this.getAttribute(selector, 'placeholder');
    if (actualPlaceholder !== expectedPlaceholder) {
      throw new Error(`Validation failed: Expected element \`${selector}\` placeholder: \`${expectedPlaceholder}\`, but got \`${actualPlaceholder}\`.`);
    }
  }

  async validateAttribute(selector: string, attribute: string, expectedValue: string) {
    const actualValue = await this.getAttribute(selector, attribute);
    if (actualValue !== expectedValue) {
      throw new Error(`Validation failed: Expected element \`${selector}\` with attribute: \`${attribute}\` value: \`${expectedValue}\`, but got \`${actualValue}\`.`);
    }
  }

  async validateUrl(expectUrl: string) {
    const actualUrl = this.page.url();
    if (actualUrl !==  expectUrl) {
      throw new Error(`Validation failed: Expected URL: \`${expectUrl}\`, but got: \`${actualUrl}\`.`)
    }
  }

  async validateVisible(selector: string) {
    const isVisible = await this.isElementVisible(selector);
    if (!isVisible) {
      throw new Error(`Validation failed: \`${selector}\` is invisible.`);
    }
  }

  async validateInvisible(selector: string) {
    const isVisible = await this.isElementVisible(selector);
    if (isVisible) {
      throw new Error(`Validation failed: \`${selector}\` is visible.`);
    }
  }

  async validateEnabled(selector: string) {
    const isEnabled = await this.isElementEnabled(selector);
    if (!isEnabled) {
      throw new Error(`Validation failed: \`${selector}\` is state: disabled.`);
    }
  }

  async validateDisabled(selector: string) {
    const isEnabled = await this.isElementEnabled(selector);
    if (isEnabled) {
      throw new Error(`Validation failed: \`${selector}\` is state: enabled.`);
    }
  }

  async validateChecked(selector: string) {
    const isChecked = await this.isElementChecked(selector);
    if (!isChecked) {
      throw new Error(`Validation failed: \`${selector}\` is state: unchecked.`);
    }
  }

  async validateUnchecked(selector: string) {
    const isChecked = await this.isElementChecked(selector);
    if (isChecked) {
      throw new Error(`Validation failed: \`${selector}\` is state: checked.`);
    }
  }

  // check state
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async isElementChecked(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isChecked();
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }

  async isMatchRegex(selector: string, regex: RegExp): Promise<boolean> {
    const elementHandle = this.page.locator(selector);
    if (elementHandle) {
      const text = await elementHandle.textContent();
      return regex.test(text ?? '');
    } else {
      throw new Error(`Element with selector: \`${selector}\` not found.`);
    }
  }

  // capture screenshot
  async captureScreenshot(image: string = 'screenshot.png') {
    await this.sleep();
    const path = `./screenshot/${image}`;
    await this.page.screenshot({ path, fullPage: true });
  }
}