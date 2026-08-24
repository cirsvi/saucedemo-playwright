import { Page } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import { CUSTOMER } from '../test-data/customer';

export const checkoutInfoWithTwoItems = async (
    { page, cartWithTwoItems }: { page: Page; cartWithTwoItems: CartPage },
    use: (r: CheckoutInformationPage) => Promise<void>
) => {
    await cartWithTwoItems.proceedToCheckout();
    const checkoutInfoPage = new CheckoutInformationPage(page);
    await use(checkoutInfoPage);
};

export const checkoutOverviewWithTwoItems = async (
    {
        page,
        checkoutInfoWithTwoItems,
    }: { page: Page; checkoutInfoWithTwoItems: CheckoutInformationPage },
    use: (r: CheckoutOverviewPage) => Promise<void>
) => {
    await checkoutInfoWithTwoItems.fillInForm(
        CUSTOMER.STANDARD.firstName,
        CUSTOMER.STANDARD.lastName,
        CUSTOMER.STANDARD.zipCode
    );
    await checkoutInfoWithTwoItems.continueCheckout();
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
};

export const completedCheckoutWithTwoItems = async (
    {
        page,
        checkoutOverviewWithTwoItems,
    }: { page: Page; checkoutOverviewWithTwoItems: CheckoutOverviewPage },
    use: (r: CheckoutCompletePage) => Promise<void>
) => {
    await checkoutOverviewWithTwoItems.finishCheckout();
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
};
