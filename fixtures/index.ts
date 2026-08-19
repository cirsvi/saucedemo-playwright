import { test as base } from '@playwright/test';
import { loggedInPage } from './auth';
import { cartWithSingleItem } from './cartItems';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';

type MyFixtures = {
    loggedInPage: LoginPage;
    cartWithSingleItem: CartPage;
};

export const test = base.extend<MyFixtures>({
    loggedInPage,
    cartWithSingleItem,
});

export { expect } from '@playwright/test';
