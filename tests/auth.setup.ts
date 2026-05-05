import { test as setup, expect } from '../fixtures';
import { EnvConfig } from '../utils/envLoader';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page, loginPage }) => {
  await loginPage.goto(EnvConfig.baseURL);
  const username = EnvConfig.adminUser.username;
  const password = EnvConfig.adminUser.password;
  await loginPage.login(username, password);
  await page.context().storageState({ path: authFile });
});
