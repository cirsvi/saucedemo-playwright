import { Page } from '@playwright/test';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

export const completedCheckout = async (
    {
        page,
        checkoutOverview,
    }: { page: Page; checkoutOverview: CheckoutOverviewPage },
    use: (r: CheckoutCompletePage) => Promise<void>
) => {
    await checkoutOverview.finishCheckout();
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
};
