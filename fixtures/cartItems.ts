import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { CatalogPage } from '../pages/catalogPage';
import { PRODUCTS } from '../test-data/products';

export const cartWithSingleItem = async (
    { page, loggedInPage }: { page: Page; loggedInPage: LoginPage },
    use: (r: CartPage) => Promise<void>
) => {
    // loggedInPage is a dependency, it ensures that user is logged in
    // and is located on catalog page
    const catalogPage = new CatalogPage(page);
    const product = catalogPage.getProductCardByName(PRODUCTS.BACKPACK.name);
    await product.addToCart();
    const cartPage = new CartPage(page);
    await cartPage.goTo();
    await use(cartPage);
};
