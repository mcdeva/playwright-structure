import { Page, TestInfo } from '@playwright/test';

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function takeScreenshotWithDelay(page: Page, testInfo: TestInfo, image: string): Promise<void> {
  await sleep(500);
  const screenshotPath = `./screenshot-results/${image}`;
  await page.screenshot({ path: screenshotPath });
  await testInfo.attach('screenshot', {
    path: screenshotPath,
    contentType: 'image/png',
  });
}
