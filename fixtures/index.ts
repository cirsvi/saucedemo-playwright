import { test as base } from '@playwright/test';
import { loggedInPage } from './auth';
import { cartWithNoItem, cartWithSingleItem, cartWithTwoItems } from './cart';
import {
    checkoutInfoWithOneItem,
    checkoutOverviewWithOneItem,
    completedCheckoutWithOneItem,
} from './checkoutOneItem';
import {
    checkoutInfoWithTwoItems,
    checkoutOverviewWithTwoItems,
    completedCheckoutWithTwoItems,
} from './checkoutTwoItems';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

type MyFixtures = {
    loggedInPage: LoginPage;
    cartWithNoItem: CartPage;
    cartWithSingleItem: CartPage;
    cartWithTwoItems: CartPage;
    checkoutInfoWithOneItem: CheckoutInformationPage;
    checkoutInfoWithTwoItems: CheckoutInformationPage;
    checkoutOverviewWithOneItem: CheckoutOverviewPage;
    checkoutOverviewWithTwoItems: CheckoutOverviewPage;
    completedCheckoutWithOneItem: CheckoutCompletePage;
    completedCheckoutWithTwoItems: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
    loggedInPage,
    cartWithNoItem,
    cartWithSingleItem,
    cartWithTwoItems,
    checkoutInfoWithOneItem,
    checkoutInfoWithTwoItems,
    checkoutOverviewWithOneItem,
    checkoutOverviewWithTwoItems,
    completedCheckoutWithOneItem,
    completedCheckoutWithTwoItems,
});

export { expect } from '@playwright/test';
