import type { Page } from 'playwright';

export async function navigateTo(page: Page, url: string) {
  await page.goto(url);
}

export async function goBack(page: Page) {
  await page.goBack();
}

export async function clickElement(page: Page, selector: string) {
  await page.click(selector);
}

export async function scrollToElement(page: Page, selector: string): Promise<void> {
  const elementHandle = await page.$(selector);
  if (elementHandle) {
    await elementHandle.scrollIntoViewIfNeeded();
  } else {
    throw new Error(`Element with selector: \`${selector}\` not found.`);
  }
}

export async function fillText(page: Page, selector: string, text: string) {
  await page.fill(selector, text);
}

export async function getText(page: Page, selector: string): Promise<string> {
  const elementHandle = await page.$(selector);
  if (elementHandle) {
    const textContent = await elementHandle.textContent();
    return textContent?.trim() || '';
  } else {
    throw new Error(`Element with selector: \`${selector}\` not found.`);
  }
}

export async function captureScreenshot(page: Page, image: string = 'screenshot.png') {
  await waitTime(page);
  const path = `./screenshot/${image}`;
  await page.screenshot({ path, fullPage: true });
}

export async function waitForLoadPage(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

// unit millisecond - default 500 ms
export async function waitTime(page: Page, timeout: number=500) {
  await page.waitForTimeout(timeout);
}

// unit millisecond - default 5000 ms
export async function waitElement(page: Page, selector: string, timeout: number=5000) {
  await page.waitForSelector(selector, { timeout });
}

// unit millisecond - default 5000 ms
export async function waitUrl(page: Page, expectUrl: string, timeout: number=5000) {
  await page.waitForURL(expectUrl, { timeout });
}

// validate
export async function validateText(page: Page, selector: string, expectText: string) {
  const actualText = await page.textContent(selector);
  if (actualText !== expectText) {
    throw new Error(`Validation failed: Expected text: \`${expectText}\`, but got \`${actualText}\`.`);
  }
}

export async function validateUrl(page: Page, expectUrl: string) {
  const actualUrl = page.url();
  if (actualUrl !==  expectUrl) {
    throw new Error(`Validation failed: Expected URL: \`${expectUrl}\`, but got: \`${actualUrl}\`.`)
  }
}

export async function validateVisible(page: Page, selector: string) {
  const isVisible = isElementVisible(page, selector);
  if (!isVisible) {
    throw new Error(`Validation failed: ${selector} is invisible.`);
  }
}

// check state
export async function isElementVisible(page: Page, selector: string): Promise<boolean> {
  return await page.isVisible(selector);
}