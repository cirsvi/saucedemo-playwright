import { Locator } from '@playwright/test';

export class BaseProduct {
    readonly root: Locator;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.name = root.getByTestId('inventory-item-name');
        this.description = root.getByTestId('inventory-item-desc');
        this.price = root.getByTestId('inventory-item-price');
    }
}
