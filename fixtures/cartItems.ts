import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { CatalogPage } from '../pages/catalogPage';

export const cartWithSingleItem = async (
    { page, loggedInPage }: { page: Page; loggedInPage: LoginPage },
    use: (r: CartPage) => Promise<void>
) => {
    // loggedInPage is a dependency, it ensures that user is logged in
    // and is located on catalog page
    const catalogPage = new CatalogPage(page);
    const product = catalogPage.getProductCardByName('Sauce Labs Backpack');
    await product.addToCart();
    const cartPage = new CartPage(page);
    await cartPage.goTo();
    await use(cartPage);
};
