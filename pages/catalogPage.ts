import { Page, Locator } from '@playwright/test';
import { ProductCard } from '../components/productCard';

export class CatalogPage {
    readonly page: Page;
    readonly inventoryList: Locator;
    readonly productCards: Locator;
    readonly sortDropdown: Locator;
    readonly activeOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.getByTestId('inventory-list');
        this.productCards = page.getByTestId('inventory-item');
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.activeOption = page.getByTestId('active-option');
    }

    async goTo() {
        await this.page.goto('/inventory.html');
    }

    getProductCardByName(name: string): ProductCard {
        const card = this.page.locator('[data-test="inventory-item"]', {
            hasText: name,
        });
        return new ProductCard(card);
    }

    async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        const count = await this.productCards.count();
        const names: string[] = [];
        for (let i = 0; i < count; i++) {
            const card = new ProductCard(this.productCards.nth(i));
            names.push(await card.name.innerText());
        }
        return names;
    }

    async getProductPrices(): Promise<number[]> {
        const count = await this.productCards.count();
        const prices: string[] = [];
        for (let i = 0; i < count; i++) {
            const card = new ProductCard(this.productCards.nth(i));
            prices.push(await card.price.innerText());
        }
        return prices.map((priceText) =>
            parseFloat(priceText.replace('$', ''))
        );
    }
}
