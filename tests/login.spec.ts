import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CatalogPage } from '../pages/catalogPage';
import { getBackgroundColor } from '../utils/getBgColor';
import { ERRORS } from '../test-data/errors';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
    });

    test('@smoke @login-regression SDQA-3: Input valid credentials', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');

        const catalogPage = new CatalogPage(page);
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(catalogPage.inventoryList).toBeVisible();
    });

    test('@login-regression SDQA-6: Input invalid credentials', async ({ page }) => {
        await loginPage.login('standard_user1', 'secret_sauce1');

        await expect(loginPage.errorMessage).toContainText(
            ERRORS.INVALID_CREDENTIALS
        );
        await expect(loginPage.usernameInput).toHaveClass(/\berror\b/);
        await expect(loginPage.passwordInput).toHaveClass(/\berror\b/);
        await expect(page).toHaveURL(/\/$/);
    });

    test('@login-regression SDQA-9: Empty username field', async ({ page }) => {
        await loginPage.login('', 'secret_sauce');

        await expect(loginPage.errorMessage).toContainText(
            ERRORS.USERNAME_REQUIRED
        );
        await expect(loginPage.usernameInput).toHaveClass(/\berror\b/);
        await expect(page).toHaveURL(/\/$/);
    });

    test('@login-regression SDQA-10: Empty password field', async ({ page }) => {
        await loginPage.login('standard_user', '');

        await expect(loginPage.errorMessage).toContainText(
            ERRORS.PASSWORD_REQUIRED
        );
        await expect(loginPage.passwordInput).toHaveClass(/\berror\b/);
        await expect(page).toHaveURL(/\/$/);
    });

    test('@login-regression SDQA-11: Both input fields empty', async ({ page }) => {
        await loginPage.login('', '');

        await expect(loginPage.errorMessage).toContainText(
            ERRORS.USERNAME_REQUIRED
        );
        await expect(loginPage.usernameInput).toHaveClass(/\berror\b/);
        await expect(loginPage.passwordInput).toHaveClass(/\berror\b/);
        await expect(page).toHaveURL(/\/$/);
    });

    test('@login-regression SDQA-12: Locked out user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');

        await expect(loginPage.errorMessage).toContainText(
            ERRORS.LOCKED_OUT_USER
        );
        await expect(loginPage.usernameInput).toHaveClass(/\berror\b/);
        await expect(loginPage.passwordInput).toHaveClass(/\berror\b/);
        await expect(page).toHaveURL(/\/$/);
    });

    test.fail(
        '@login-regression SDQA-13: Client-side: Username input really long string',
        async () => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-121',
            });

            await loginPage.usernameInput.fill('a'.repeat(200));
            await expect(loginPage.usernameInput).toHaveValue('a'.repeat(50));
        }
    );

    test.fail(
        '@login-regression SDQA-14: Client-side: Password input really long string',
        async () => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-120',
            });

            await loginPage.passwordInput.fill('a'.repeat(200));
            await expect(loginPage.passwordInput).toHaveValue('a'.repeat(100));
        }
    );

    test.fail('@login-regression SDQA-16: Tab navigation', async ({ page }) => {
        test.info().annotations.push({
            type: 'bug',
            description: 'SDQA-118',
        });

        await page.keyboard.press('Tab');
        await expect(loginPage.usernameInput).toBeFocused();
        await expect(loginPage.usernameInput).not.toHaveCSS(
            'outline-style',
            'none'
        );

        await page.keyboard.press('Tab');
        await expect(loginPage.passwordInput).toBeFocused();
        await expect(loginPage.passwordInput).not.toHaveCSS(
            'outline-style',
            'none'
        );
        const normalBg = await getBackgroundColor(loginPage.loginButton);
        await page.keyboard.press('Tab');
        await expect(loginPage.loginButton).toBeFocused();
        await expect(loginPage.loginButton).not.toHaveCSS('background-color', normalBg);
    });

    test.fail('@login-regression SDQA-18: Mouse interaction', async () => {
        test.info().annotations.push({
            type: 'bug',
            description: 'SDQA-119',
        });

        await loginPage.usernameInput.click();
        await expect(loginPage.usernameInput).toBeFocused();
        await expect(loginPage.usernameInput).not.toHaveCSS(
            'outline-style',
            'none'
        );

        await loginPage.passwordInput.click();
        await expect(loginPage.passwordInput).toBeFocused();
        await expect(loginPage.passwordInput).not.toHaveCSS(
            'outline-style',
            'none'
        );

        const normalBg = await getBackgroundColor(loginPage.loginButton);
        await loginPage.loginButton.hover();
        await expect(loginPage.loginButton).toHaveCSS('cursor', 'pointer');
        await expect(loginPage.loginButton).not.toHaveCSS('background-color', normalBg);
    });

    test('@regression-expansion SDQA-137: Closing error message clears message and input highlight', async () => {
        await loginPage.login('standard_user1', 'secret_sauce1');
        await expect(loginPage.errorMessage).toBeVisible();

        await loginPage.closeError();

        await expect(loginPage.usernameInput).not.toHaveClass(/\berror\b/);
        await expect(loginPage.passwordInput).not.toHaveClass(/\berror\b/);
        await expect(loginPage.errorMessage).not.toBeVisible();
    });
});
