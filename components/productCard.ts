import { Locator } from '@playwright/test';

export class ProductCard {
    readonly card: Locator;
    readonly image: Locator;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    
    constructor(card: Locator) {
        this.card = card;
        this.image = card.getByRole('img');
        this.name = card.getByTestId('inventory-item-name');
        this.description = card.getByTestId('inventory-item-desc');
        this.price = card.getByTestId('inventory-item-price');
        this.addToCartButton = card.getByRole('button', { name: 'Add to cart' });
        this.removeButton = card.getByRole('button', { name: 'Remove' });
    }

    async addToCart(){
        await this.addToCartButton.click();
    }

    async removeFromCart(){
        await this.removeButton.click();
    }
}