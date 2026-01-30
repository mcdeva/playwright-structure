import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { loadDataFile } from './utils/dataLoader.js';

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  products: any[] | null;
  users: Record<string, any> | null;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
  },
	homePage: async ({ page }, use) => {
    await use(new HomePage(page));
	},

  products: [async ({ }, use) => {
    const rawData = loadDataFile('products');
    const products = rawData as any[] | null;
    await use(products);
  }, { scope: 'worker' }],
  users: [async ({ }, use) => {
    const users = loadDataFile('users');
    await use(users);
  }, { scope: 'worker' }],
});

export { expect } from '@playwright/test';