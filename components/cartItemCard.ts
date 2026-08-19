import { Locator } from '@playwright/test';
import { BaseProduct } from './baseProduct';

export class CartItemCard extends BaseProduct {
    readonly quantity: Locator;

    constructor(card: Locator) {
        super(card);
        this.quantity = card.getByTestId('item-quantity');
    }

    async getQuantity(): Promise<string> {
        return await this.quantity.innerText();
    }
}
