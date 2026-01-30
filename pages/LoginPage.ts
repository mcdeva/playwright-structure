import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LangConfig } from '../utils/localeLoader';

export class LoginPage {
  constructor(public readonly page: Page) { }

  private get main() {
    return {
      tbxUsernameField: this.page.getByPlaceholder('Username'),
      tbxPasswordField: this.page.getByPlaceholder('Password'),
      btnButton: this.page.getByRole('button', { name: 'Login' }),
      errorMessage: this.page.locator('[data-test="error"]'),
    };
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.main.tbxUsernameField.fill(username);
    await this.main.tbxPasswordField.fill(password);
    await this.main.btnButton.click();
  }

  async verifyErrorMessage() {
    await expect(this.main.errorMessage).toHaveText(LangConfig.loginPage.lockedOutUserError);
  }

  async verifyCredentialError() {
    await expect(this.main.errorMessage).toHaveText(LangConfig.loginPage.invalidCredentialsError);
  }
}