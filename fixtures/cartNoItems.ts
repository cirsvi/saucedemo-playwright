import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';

export const cartWithNoItem = async (
    { page, loggedInPage }: { page: Page; loggedInPage: LoginPage },
    use: (r: CartPage) => Promise<void>
) => {
    // loggedInPage is a dependency, it ensures that user is logged in
    const cartPage = new CartPage(page);
    await cartPage.goTo();
    await use(cartPage);
};
