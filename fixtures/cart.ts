import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { CatalogPage } from '../pages/catalogPage';
import { PRODUCTS } from '../test-data/products';

export const cartWithNoItem = async (
    { page, loggedInPage }: { page: Page; loggedInPage: LoginPage },
    use: (r: CartPage) => Promise<void>
) => {
    const cartPage = new CartPage(page);
    await cartPage.goTo();
    await use(cartPage);
};

export const cartWithSingleItem = async (
    { page, loggedInPage }: { page: Page; loggedInPage: LoginPage },
    use: (r: CartPage) => Promise<void>
) => {
    const catalogPage = new CatalogPage(page);
    const product = catalogPage.getProductCardByName(PRODUCTS.BACKPACK.name);
    await product.addToCart();
    const cartPage = new CartPage(page);
    await cartPage.goTo();
    await use(cartPage);
};

export const cartWithTwoItems = async (
    { page, loggedInPage }: { page: Page; loggedInPage: LoginPage },
    use: (r: CartPage) => Promise<void>
) => {
    const catalogPage = new CatalogPage(page);
    const product_1 = catalogPage.getProductCardByName(PRODUCTS.BACKPACK.name);
    await product_1.addToCart();
    const product_2 = catalogPage.getProductCardByName(
        PRODUCTS.BIKE_LIGHT.name
    );
    await product_2.addToCart();

    const cartPage = new CartPage(page);
    await cartPage.goTo();
    await use(cartPage);
};
