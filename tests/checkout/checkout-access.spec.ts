import { test, expect } from '../../fixtures/index';

test.describe('Checkout | Direct URL access restrictions @regression-expansion', () => {
    test.fail(
        'SDQA-146: Checkout information page is not accessible with empty cart via URL',
        async ({ cartWithNoItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-154',
            });
            await expect(page).toHaveURL(/\/cart\.html/);
            await page.goto('/checkout-step-one.html');
            await expect(page).toHaveURL(/\/cart\.html/);
        }
    );

    test.fail(
        'SDQA-147: Overview page is not accessible without filling in information form',
        async ({ cartWithSingleItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-157',
            });
            await expect(page).toHaveURL(/\/cart\.html/);
            await page.goto('/checkout-step-two.html');
            await expect(page).toHaveURL(/\/checkout-step-one\.html/);
        }
    );

    test.fail(
        'SDQA-148: Complete page is not accessible without completing purchase',
        async ({ loggedInPage, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-156',
            });
            await expect(page).toHaveURL(/\/inventory\.html/);
            await page.goto('/checkout-complete.html');
            await expect(page).toHaveURL(/\/cart\.html/);
        }
    );
});
