import { test, expect } from '../../fixtures/index';

test.describe('Checkout | From Cart Page @checkout-regression', () => {
    test('@smoke SDQA-71: Access from Cart Page', async ({
        cartWithSingleItem,
        page,
    }) => {
        await cartWithSingleItem.proceedToCheckout();
        await expect(page).toHaveURL(/\/checkout-step-one\.html/);
    });

    test.fail(
        'SDQA-72: Checkout button is disabled when cart is empty',
        async ({ cartWithNoItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-124',
            });

            await expect(cartWithNoItem.checkoutButton).toBeDisabled();
            await expect(page).toHaveURL(/\/cart\.html/);
        }
    );
});
