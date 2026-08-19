import { test, expect } from '../fixtures/index';
import { CatalogPage } from '../pages/catalogPage';
import { Header } from '../components/header';

test.describe('Logout', () => {
    let header: Header;

    test.beforeEach(async ({ page }) => {
        header = new Header(page);
    });

    test('SDQA-52: Successfull logout', async ({ loggedInPage, page }) => {
        await header.logout();

        await expect(page).toHaveURL(/\/$/);
        await expect(loggedInPage.loginButton).toBeVisible();
    });

    test('SDQA-53: Protected pages are inaccessible', async ({
        loggedInPage,
        page,
    }) => {
        await header.logout();

        const catalogPage = new CatalogPage(page);
        await catalogPage.goTo();

        await expect(loggedInPage.errorMessage).toContainText(
            "You can only access '/inventory.html' when you are logged in."
        );
        await expect(page).toHaveURL(/\/$/);
    });
});
