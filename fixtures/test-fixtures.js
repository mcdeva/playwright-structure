import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import { loadTestData } from '../utils/dataLoader.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  testData: async ({}, use) => {
    const users = loadTestData('users');
    const products = loadTestData('products');
    await use({ users, products });
  },
});

export { expect } from '@playwright/test';