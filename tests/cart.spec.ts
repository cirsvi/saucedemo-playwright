import { test, expect } from '../fixtures/index';
import { CatalogPage } from '../pages/catalogPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import { CartPage } from '../pages/cartPage';
import { Header } from '../components/header';

test.describe('Shopping Cart', () => {
    let catalogPage: CatalogPage;
    let detailsPage: ProductDetailsPage;
    let cartPage: CartPage;
    let header: Header;

    test.beforeEach(async ({ loggedInPage, page }) => {
        header = new Header(page);
    });

    test.describe('From Catalog Page', () => {
        test.beforeEach(async ({ page }) => {
            catalogPage = new CatalogPage(page);
            await catalogPage.goTo();
        });

        test('SDQA-36: Add product from Catalog Page', async () => {
            const product = catalogPage.getProductCardByName(
                'Sauce Labs Backpack'
            );
            await product.addToCart();

            await expect(product.removeButton).toBeVisible();
            await expect(product.addToCartButton).not.toBeVisible();
            await expect(header.cartIconBadge).toContainText('1');
        });

        test('SDQA-41: Remove product from Catalog Page', async () => {
            const product = catalogPage.getProductCardByName(
                'Sauce Labs Backpack'
            );
            await product.addToCart();
            await expect(header.cartIconBadge).toContainText('1');

            await product.removeFromCart();
            await expect(header.cartIconBadge).not.toBeVisible();
            await expect(product.addToCartButton).toBeVisible();
            await expect(product.removeButton).not.toBeVisible();
        });

        test('SDQA-45: Verify "Remove" button appears on Product Details Page after adding from the Catalog Page', async ({
            page,
        }) => {
            const product = catalogPage.getProductCardByName(
                'Sauce Labs Backpack'
            );
            await product.addToCart();
            await expect(product.addToCartButton).not.toBeVisible();
            await expect(product.removeButton).toBeVisible();

            await product.name.click();
            await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+/);

            detailsPage = new ProductDetailsPage(page);
            await expect(detailsPage.removeButton).toBeVisible();
            await expect(detailsPage.addToCartButton).not.toBeVisible();
        });

        test('SDQA-46: Cart state persistence after page refresh', async ({
            page,
        }) => {
            const product = catalogPage.getProductCardByName(
                'Sauce Labs Backpack'
            );
            await product.addToCart();
            await expect(header.cartIconBadge).toContainText('1');

            await page.reload();

            await expect(header.cartIconBadge).toContainText('1');

            const refreshedProduct = catalogPage.getProductCardByName(
                'Sauce Labs Backpack'
            );
            await expect(refreshedProduct.removeButton).toBeVisible();
            await expect(refreshedProduct.addToCartButton).not.toBeVisible();
        });

        test('SDQA-62: Access cart page from Catalog Page', async ({
            page,
        }) => {
            await header.cartIcon.click();
            await expect(page).toHaveURL(/\/cart\.html/);
        });
    });

    test.describe('From Details Product Page', () => {
        test.beforeEach(async ({ page }) => {
            detailsPage = new ProductDetailsPage(page);
            await detailsPage.goTo(4);
        });

        test('SDQA-37: Add product from Product Details Page', async () => {
            await detailsPage.addToCart();

            await expect(detailsPage.addToCartButton).not.toBeVisible();
            await expect(detailsPage.removeButton).toBeVisible();
            await expect(header.cartIconBadge).toContainText('1');
        });

        test('SDQA-43: Remove product from Product Details Page', async () => {
            await detailsPage.addToCart();
            await expect(header.cartIconBadge).toContainText('1');
            await expect(detailsPage.removeButton).toBeVisible();

            await detailsPage.removeFromCart();

            await expect(detailsPage.addToCartButton).toBeVisible();
            await expect(detailsPage.removeButton).not.toBeVisible();
            await expect(header.cartIconBadge).not.toBeVisible();
        });

        test('SDQA-44: Verify "Remove" button appears on Catalog Page after adding from the Product Details Page', async ({
            page,
        }) => {
            await detailsPage.addToCart();
            await expect(header.cartIconBadge).toContainText('1');
            await expect(detailsPage.removeButton).toBeVisible();

            await detailsPage.backToProductsButton.click();

            await expect(page).toHaveURL(/\/inventory\.html/);

            catalogPage = new CatalogPage(page);
            const product = catalogPage.getProductCardByName(
                'Sauce Labs Backpack'
            );
            await expect(product.addToCartButton).not.toBeVisible();
            await expect(product.removeButton).toBeVisible();
        });

        test('SDQA-68: Access cart page from Product Details Page', async ({
            page,
        }) => {
            await header.cartIcon.click();
            await expect(page).toHaveURL(/\/cart\.html/);
        });
    });

    test.describe('From Cart Page', () => {
        test('SDQA-63: View items in cart', async ({ cartWithSingleItem }) => {
            await expect(cartWithSingleItem.productList).toBeVisible();

            const item = cartWithSingleItem.getCartItemCardByName(
                'Sauce Labs Backpack'
            );
            await expect(item.name).toContainText('Sauce Labs Backpack');
            await expect(item.description).toContainText(
                'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
            );
            const quantity = await item.getQuantity();
            expect(quantity).toBe('1');
            await expect(item.price).toContainText('$29.99');
            await expect(item.removeButton).toBeVisible();
        });

        test('SDQA-64: Remove items from cart', async ({
            cartWithSingleItem,
        }) => {
            await expect(cartWithSingleItem.productList).toBeVisible();

            const item = cartWithSingleItem.getCartItemCardByName(
                'Sauce Labs Backpack'
            );

            await item.removeFromCart();
            await expect(
                cartWithSingleItem.getCartItemCardByName('Sauce Labs Backpack')
                    .root
            ).not.toBeVisible();
            await expect(header.cartIconBadge).not.toBeVisible();
        });

        test('SDQA-65: Navigate to the Product Details Page from the cart', async ({
            cartWithSingleItem,
            page,
        }) => {
            await expect(cartWithSingleItem.productList).toBeVisible();

            const item = cartWithSingleItem.getCartItemCardByName(
                'Sauce Labs Backpack'
            );
            const expectedName = await item.name.innerText();
            const expectedDescription = await item.description.innerText();
            const expectedPrice = await item.price.innerText();

            await item.name.click();
            await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+/);

            detailsPage = new ProductDetailsPage(page);

            await expect(detailsPage.name).toContainText(expectedName);
            await expect(detailsPage.description).toContainText(
                expectedDescription
            );
            await expect(detailsPage.price).toContainText(expectedPrice);
        });

        test('SDQA-66: Continue shopping', async ({
            cartWithSingleItem,
            page,
        }) => {
            await cartWithSingleItem.continueShopping();
            await expect(page).toHaveURL(/\/inventory\.html/);
        });
    });
});
