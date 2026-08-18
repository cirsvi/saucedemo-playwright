import { Page, Locator } from '@playwright/test';

export class Header {
    readonly burgerMenuButton: Locator;
    readonly logoutLink: Locator;
    readonly cartIcon: Locator;
    readonly cartIconBadge: Locator;

    constructor(page: Page) {
        this.burgerMenuButton = page.getByRole('button', {name: 'Open Menu'});
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
        this.cartIcon = page.getByTestId('shopping-cart-link');
        this.cartIconBadge = page.getByTestId('shopping-cart-badge');
    }

    async openMenu() {
        await this.burgerMenuButton.click();
    }
    async logout(){
        await this.openMenu();
        await this.logoutLink.click();
    }
}