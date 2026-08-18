import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CatalogPage } from '../pages/catalogPage';

test.describe('Login', () => {
    let loginPage : LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
    })

    test('SDQA-3: Input valid credentials', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        
        const catalogPage = new CatalogPage(page);
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(catalogPage.inventoryList).toBeVisible();
    })

    test('SDQA-6: Input invalid credentials', async ({ page }) => {
        await loginPage.login('standard_user1', 'secret_sauce1');
        
        await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
        await expect(loginPage.usernameInput).toHaveClass(/error/);
        await expect(loginPage.passwordInput).toHaveClass(/error/);
        await expect(page).toHaveURL(/\/$/);
    })

    test('SDQA-9: Empty username field', async ({ page }) => {
        await loginPage.login('', 'secret_sauce');
        
        await expect(loginPage.errorMessage).toContainText('Username is required');
        await expect(loginPage.usernameInput).toHaveClass(/error/);
        await expect(page).toHaveURL(/\/$/);
    })


    test('SDQA-10: Empty password field', async ({ page }) => {
        await loginPage.login('standard_user', '');
        
        await expect(loginPage.errorMessage).toContainText('Password is required');
        await expect(loginPage.passwordInput).toHaveClass(/error/);
        await expect(page).toHaveURL(/\/$/);
    })

    test('SDQA-11: Both input fields empty', async ({ page }) => {
        await loginPage.login('', '');
        
        await expect(loginPage.errorMessage).toContainText('Username is required');
        await expect(loginPage.usernameInput).toHaveClass(/error/);
        await expect(loginPage.passwordInput).toHaveClass(/error/);
        await expect(page).toHaveURL(/\/$/);
    })

    test('SDQA-12: Locked out user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        
        await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
        await expect(loginPage.usernameInput).toHaveClass(/error/);
        await expect(loginPage.passwordInput).toHaveClass(/error/);
        await expect(page).toHaveURL(/\/$/);
    })

    test.fail('SDQA-13: Client-side: Username input really long string', async () => {
        test.info().annotations.push({ type: 'bug', description: 'SDQA-121' });

        await loginPage.usernameInput.fill('a'.repeat(200));
        await expect(loginPage.usernameInput).toHaveValue('a'.repeat(50));
    })

    test.fail('SDQA-14: Client-side: Password input really long string', async () => {
        test.info().annotations.push({ type: 'bug', description: 'SDQA-120' });

        await loginPage.passwordInput.fill(('a').repeat(200));
        await expect(loginPage.passwordInput).toHaveValue('a'.repeat(100));
    })

    test.fixme('SDQA-16: Tab navigation', async () => {
        // Known bug: no clear UX/UI for tab navigation
        // Bug: SDQA-118
        // Steps:
        // 1. User presses the "Tab" key once.
        // Expected: The cursor/focus moves to the "Username" field. A visual highlight border appears.
        // 2. User presses the Tab key again (2nd time).
        // Expected: The cursor/focus moves to the "Password" field. A visual highlight border appears.
        // 3. User presses the Tab key again (3rd time).
        // Expected: The cursor/focus moves to the "Login" button. The button is visually highlighted.
    })

    test.fixme('SDQA-18: Mouse interaction', async () => {
        // Known bug: no clear UX/UI for mouse interactions
        // Bug: SDQA-119
        // Steps:
        // 1.User clicks on the "Username" input field field.
        // Expected: The "Username" input field is selected and has a visible visual highlight.
        // 2. User clicks on the "Password" input field field.
        // Expected: The "Password" input field is selected and has a visible visual highlight.
        // 3. User hovers using mouse over the "Login" button.
        // Expected: The button changes its appearance by a distinct color; the cursor visibly changes to hand to indicate possible action.
    })
})