import { Page } from '@playwright/test';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CUSTOMER } from '../test-data/customer';

export const checkoutOverview = async (
    {
        page,
        checkoutInfo,
    }: { page: Page; checkoutInfo: CheckoutInformationPage },
    use: (r: CheckoutOverviewPage) => Promise<void>
) => {
    // chechkoutInfo is a dependency, it ensures that user is logged in, has items, and is located on Checkout Information page
    await checkoutInfo.fillInForm(
        CUSTOMER.STANDARD.firstName,
        CUSTOMER.STANDARD.lastName,
        CUSTOMER.STANDARD.zipCode
    );
    await checkoutInfo.continueCheckout();
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
};
