const { test, expect }  = require('@playwright/test');
const { LoginPage }     = require('../page_object/Login_page');
const { USERS, MESSAGES, URLS } = require('../page_object/Users');

test.describe('Q1 — Locked Out User Login Validation', () => {

  test(
    'locked_out_user should see error message and stay on login page',
    {
      annotation: [
        { type: 'Feature',  description: 'Login' },
        { type: 'Story',    description: 'Locked out user cannot login' },
        { type: 'Severity', description: 'critical' },
      ],
    },
    async ({ page }) => {

      const loginPage = new LoginPage(page);

      await test.step('Open saucedemo login page', async () => {
        await loginPage.goto();
        await expect(page).toHaveTitle('Swag Labs');
      });

      await test.step('Enter locked_out_user username and password', async () => {
        await loginPage.enterUsername(USERS.locked.username);
        await loginPage.enterPassword(USERS.locked.password);
      });

      await test.step('Click the Login button', async () => {
        await loginPage.clickLogin();
      });

      await test.step('Verify error message container is visible', async () => {
        await expect(loginPage.errorContainer).toBeVisible({ timeout: 10_000 });
      });

      await test.step('Verify exact error message text', async () => {
        const actualMsg = await loginPage.getErrorMessage();
        console.log(`  Actual error: "${actualMsg}"`);
        await expect(loginPage.errorContainer).toContainText(MESSAGES.lockedError);
      });

      await test.step('Verify error styling applied to username and password inputs', async () => {
        await expect(loginPage.usernameInput).toHaveClass(/input_error/);
        await expect(loginPage.passwordInput).toHaveClass(/input_error/);
      });

      await test.step('Verify dismiss  button is visible on error banner', async () => {
        await expect(loginPage.errorDismissBtn).toBeVisible();
      });

      await test.step('Verify user remains on the login page', async () => {
        await expect(page).toHaveURL(URLS.login);
        await expect(loginPage.loginButton).toBeVisible();
      });

      await test.step('Click × and verify error banner disappears', async () => {
        await loginPage.dismissError();
        await expect(loginPage.errorContainer).toBeHidden();
      });

    }
  );

});