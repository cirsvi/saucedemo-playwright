import { Locator } from '@playwright/test';
import { BaseProduct } from './baseProduct';

export class CartItemCard extends BaseProduct {
    readonly quantity: Locator;
    readonly removeButton: Locator;

    constructor(card: Locator) {
        super(card);
        this.quantity = card.getByTestId('item-quantity');
        this.removeButton = card.getByRole('button', { name: 'Remove' });
    }

    async getQuantity(): Promise<string> {
        return await this.quantity.innerText();
    }

    async removeFromCart() {
        await this.removeButton.click();
    }
}
