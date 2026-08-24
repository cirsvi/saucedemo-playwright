import { Page } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import { CUSTOMER } from '../test-data/customer';

export const checkoutInfoWithOneItem = async (
    { page, cartWithSingleItem }: { page: Page; cartWithSingleItem: CartPage },
    use: (r: CheckoutInformationPage) => Promise<void>
) => {
    await cartWithSingleItem.proceedToCheckout();
    const checkoutInfoPage = new CheckoutInformationPage(page);
    await use(checkoutInfoPage);
};

export const checkoutOverviewWithOneItem = async (
    {
        page,
        checkoutInfoWithOneItem,
    }: { page: Page; checkoutInfoWithOneItem: CheckoutInformationPage },
    use: (r: CheckoutOverviewPage) => Promise<void>
) => {
    await checkoutInfoWithOneItem.fillInForm(
        CUSTOMER.STANDARD.firstName,
        CUSTOMER.STANDARD.lastName,
        CUSTOMER.STANDARD.zipCode
    );
    await checkoutInfoWithOneItem.continueCheckout();
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
};

export const completedCheckoutWithOneItem = async (
    {
        page,
        checkoutOverviewWithOneItem,
    }: { page: Page; checkoutOverviewWithOneItem: CheckoutOverviewPage },
    use: (r: CheckoutCompletePage) => Promise<void>
) => {
    await checkoutOverviewWithOneItem.finishCheckout();
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
};
