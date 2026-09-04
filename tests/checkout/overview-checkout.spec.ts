import { test, expect } from '../../fixtures/index';
import { CheckoutItemCard } from '../../components/checkoutItemCard';
import { CheckoutCompletePage } from '../../pages/checkoutCompletePage';
import { getItemPriceSum } from '../../utils/getItemPriceSum';

test.describe('Checkout | From Checkout: Overview Page', () => {
    test('@checkout-regression SDQA-77: Cancel from Overview Page', async ({
        checkoutOverviewWithOneItem,
        page,
    }) => {
        await checkoutOverviewWithOneItem.cancleCheckout();
        await expect(page).toHaveURL(/\/inventory\.html/);
    });

    test('@checkout-regression SDQA-104: Overview page content', async ({
        checkoutOverviewWithTwoItems,
    }) => {
        await expect(checkoutOverviewWithTwoItems.productList).toBeVisible();
        const itemCount =
            await checkoutOverviewWithTwoItems.cartItemCards.count();
        await expect(itemCount).toBeGreaterThan(0);

        for (let i = 0; i < itemCount; i++) {
            const item = new CheckoutItemCard(
                checkoutOverviewWithTwoItems.cartItemCards.nth(i)
            );
            await expect(item.name).not.toBe('');
            await expect(item.description).not.toBe('');
            await expect(item.price).not.toBe('');
            await expect(item.quantity).toHaveText('1');
        }

        await expect(checkoutOverviewWithTwoItems.paymentCard).toContainText(
            'SauceCard #31337'
        );
        await expect(checkoutOverviewWithTwoItems.shippingInfo).toContainText(
            'Free Pony Express Delivery!'
        );

        await expect(checkoutOverviewWithTwoItems.subtotalPrice).toBeVisible();
        await expect(checkoutOverviewWithTwoItems.taxPrice).toBeVisible();
        await expect(checkoutOverviewWithTwoItems.totalPrice).toBeVisible();
    });

    test('@regression-expansion SDQA-143: Subtotal (item total) amount is calculated correctly', async ({
        checkoutOverviewWithTwoItems,
    }) => {
        await expect(checkoutOverviewWithTwoItems.productList).toBeVisible();
        const expectedSubtotal = await getItemPriceSum(
            checkoutOverviewWithTwoItems
        );
        await expect(checkoutOverviewWithTwoItems.subtotalPrice).toHaveText(
            `Item total: $${expectedSubtotal}`
        );
    });

    test('@regression-expansion SDQA-144: Tax amount is calculated correctly', async ({
        checkoutOverviewWithTwoItems,
    }) => {
        const expectedSubtotal = parseFloat(
            await getItemPriceSum(checkoutOverviewWithTwoItems)
        );
        const expectedTax = (expectedSubtotal * 0.08).toFixed(2);
        await expect(checkoutOverviewWithTwoItems.taxPrice).toHaveText(
            `Tax: $${expectedTax}`
        );
    });

    test('@regression-expansion SDQA-145: Total amount is calculated correctly', async ({
        checkoutOverviewWithTwoItems,
    }) => {
        await expect(checkoutOverviewWithTwoItems.productList).toBeVisible();

        const expectedSubtotal = parseFloat(
            await getItemPriceSum(checkoutOverviewWithTwoItems)
        );
        const expectedTax = parseFloat((expectedSubtotal * 0.08).toFixed(2));
        const expectedTotal = (expectedSubtotal + expectedTax).toFixed(2);
        await expect(checkoutOverviewWithTwoItems.totalPrice).toHaveText(
            `Total: $${expectedTotal}`
        );
    });

    test('@smoke @checkout-regression SDQA-105: Complete purchase', async ({
        checkoutOverviewWithTwoItems,
        page,
    }) => {
        await checkoutOverviewWithTwoItems.finishCheckout();
        await expect(page).toHaveURL(/\/checkout-complete\.html/);

        const checkoutCompletePage = new CheckoutCompletePage(page);
        await expect(checkoutCompletePage.completeHeader).toBeVisible();
        await expect(checkoutCompletePage.completeHeader).toContainText(
            'Thank you for your order!'
        );
    });
});
