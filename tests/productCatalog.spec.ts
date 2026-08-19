import { test, expect } from '../fixtures/index';
import { CatalogPage } from '../pages/catalogPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import { Header } from '../components/header';
import { ProductCard } from '../components/productCard';
import { isSortedAscending, isSortedDescending } from '../utils/sorting';
import { PRODUCTS } from '../test-data/products';

test.describe('Product Catalog', () => {
    let catalogPage: CatalogPage;

    test.beforeEach(async ({ loggedInPage, page }) => {
        catalogPage = new CatalogPage(page);
        await catalogPage.goTo();
    });

    test('SDQA-22: View product catalog', async ({ page }) => {
        const header = new Header(page);
        await expect(header.cartIcon).toBeVisible();

        const count = await catalogPage.productCards.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const card = new ProductCard(catalogPage.productCards.nth(i));

            await expect(card.image).toBeVisible();
            await expect(card.name).toBeVisible();
            await expect(card.description).toBeVisible();
            await expect(card.price).toBeVisible();
            await expect(card.addToCartButton).toBeVisible();
        }

        await expect(catalogPage.sortDropdown).toHaveValue('az');
        const productNames = await catalogPage.getProductNames();
        expect(isSortedAscending(productNames)).toBe(true);
    });

    test('SDQA-23: Sort products by price (low to high)', async ({ page }) => {
        await expect(catalogPage.sortDropdown).toBeVisible();
        await catalogPage.selectSortOption('lohi');
        const productPrices = await catalogPage.getProductPrices();

        await expect(catalogPage.sortDropdown).toHaveValue('lohi');
        expect(isSortedAscending(productPrices)).toBe(true);
    });

    test('SDQA-24: Sort products by price (high to low)', async ({ page }) => {
        await expect(catalogPage.sortDropdown).toBeVisible();
        await catalogPage.selectSortOption('hilo');
        const productPrices = await catalogPage.getProductPrices();

        await expect(catalogPage.sortDropdown).toHaveValue('hilo');
        expect(isSortedDescending(productPrices)).toBe(true);
    });

    test('SDQA-25: Sort products by name (A to Z) | Default option', async ({
        page,
    }) => {
        await expect(catalogPage.sortDropdown).toBeVisible();
        await expect(catalogPage.sortDropdown).toHaveValue('az');

        const productNames = await catalogPage.getProductNames();
        expect(isSortedAscending(productNames)).toBe(true);

        await catalogPage.selectSortOption('az');
        await expect(catalogPage.sortDropdown).toHaveValue('az');
        const updatedNames = await catalogPage.getProductNames();
        expect(isSortedAscending(updatedNames)).toBe(true);
    });

    test('SDQA-26: Sort products by name (Z to A)', async ({ page }) => {
        await expect(catalogPage.sortDropdown).toBeVisible();
        await catalogPage.selectSortOption('za');
        const productNames = await catalogPage.getProductNames();

        await expect(catalogPage.sortDropdown).toHaveValue('za');
        expect(isSortedDescending(productNames)).toBe(true);
    });

    test.fail(
        'SDQA-27: Refresh page preserves applied sort',
        async ({ page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-123',
            });

            await expect(catalogPage.sortDropdown).toBeVisible();
            await catalogPage.selectSortOption('hilo');
            const productPrices = await catalogPage.getProductPrices();

            await expect(catalogPage.sortDropdown).toHaveValue('hilo');
            expect(isSortedDescending(productPrices)).toBe(true);

            await page.reload();

            await expect(catalogPage.sortDropdown).toHaveValue('hilo');
            const updatedPrices = await catalogPage.getProductPrices();
            expect(isSortedDescending(updatedPrices)).toBe(true);
        }
    );

    test('SDQA-28: Navigate to product details page', async ({ page }) => {
        const product = catalogPage.getProductCardByName(
            PRODUCTS.BACKPACK.name
        );
        const expectedName = await product.name.innerText();
        const expectedDescription = await product.description.innerText();
        const expectedPrice = await product.price.innerText();
        const expectedImage = (await product.image.getAttribute('src'))!;

        await product.image.click();

        const detailsPage = new ProductDetailsPage(page);

        await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+/);
        await expect(detailsPage.name).toHaveText(expectedName);
        await expect(detailsPage.description).toHaveText(expectedDescription);
        await expect(detailsPage.price).toHaveText(expectedPrice);
        await expect(detailsPage.image).toHaveAttribute('src', expectedImage);
    });
});
