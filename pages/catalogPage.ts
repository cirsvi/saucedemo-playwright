import {Page, Locator} from "@playwright/test";

export class CatalogPage {
    readonly page: Page;
    readonly inventoryList: Locator;

    constructor(page: Page){
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
    }
}
 