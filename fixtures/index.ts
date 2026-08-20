import { test as base } from '@playwright/test';
import { loggedInPage } from './auth';
import { cartWithSingleItem } from './cartItems';
import { checkoutInfo } from './checkoutInfo';
import { cartWithNoItem } from './cartNoItems';
import { checkoutOverview } from './checkoutOverview';
import { completedCheckout } from './completedCheckout';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

type MyFixtures = {
    loggedInPage: LoginPage;
    cartWithNoItem: CartPage;
    cartWithSingleItem: CartPage;
    checkoutInfo: CheckoutInformationPage;
    checkoutOverview: CheckoutOverviewPage;
    completedCheckout: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
    loggedInPage,
    cartWithNoItem,
    cartWithSingleItem,
    checkoutInfo,
    checkoutOverview,
    completedCheckout,
});

export { expect } from '@playwright/test';
