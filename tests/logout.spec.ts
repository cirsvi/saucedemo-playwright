import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CatalogPage } from '../pages/catalogPage';
import { Header } from '../components/header';

test.describe('Logout', () => {
    let loginPage: LoginPage;
    let header: Header;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('standard_user', 'secret_sauce');

        header = new Header(page);
    })

    test('SDQA-52: Successfull logout', async ({ page }) => {
        await header.logout();

        await expect(page).toHaveURL(/\/$/);
        await expect(loginPage.loginButton).toBeVisible();
    })

    test('SDQA-53: Protected pages are inaccessible', async ({ page }) => {
        await header.logout();

        const catalogPage = new CatalogPage(page);
        await catalogPage.goTo();

        await expect(loginPage.errorMessage).toContainText("You can only access '/inventory.html' when you are logged in.")
        await expect(page).toHaveURL(/\/$/);
    })
})