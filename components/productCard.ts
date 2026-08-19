import { Locator } from '@playwright/test';
import { BaseProduct } from './baseProduct';

export class ProductCard extends BaseProduct {
    readonly image: Locator;
    readonly addToCartButton: Locator;

    constructor(card: Locator) {
        super(card);
        this.image = card.getByRole('img');
        this.addToCartButton = card.getByRole('button', {
            name: 'Add to cart',
        });
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}
