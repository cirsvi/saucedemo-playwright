import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;
    readonly image: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByTestId('inventory-item-name');
        this.description = page.getByTestId('inventory-item-desc');
        this.price = page.getByTestId('inventory-item-price');
        this.image = page.locator('.inventory_details_img');
        this.addToCartButton = page.getByRole('button', {
            name: 'Add to cart',
        });
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.backToProductsButton = page.getByRole('button', {
            name: 'Back to products',
        });
    }

    async goTo(id: number): Promise<void> {
        await this.page.goto(`inventory-item.html?id=${id}`);
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async removeFromCart(): Promise<void> {
        await this.removeButton.click();
    }

    async goBackToProducts(): Promise<void> {
        await this.backToProductsButton.click();
    }
}
