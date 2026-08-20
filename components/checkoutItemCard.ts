import { Locator } from '@playwright/test';
import { BaseProduct } from "./baseProduct";

export class CheckoutItemCard extends BaseProduct{
     readonly quantity: Locator;

    constructor(card: Locator) {
        super(card);
        this.quantity = card.getByTestId('item-quantity');
    }
}