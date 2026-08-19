import { Page, Locator } from '@playwright/test';
import { CartItemCard } from '../components/cartItemCard';

export class CartPage {
    readonly page: Page;
    readonly productList: Locator;
    readonly cartItemCards: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.getByTestId('cart-list');
        this.cartItemCards = page.getByTestId('inventory-item');
        this.continueShoppingButton = page.getByRole('button', {
            name: 'Continue Shopping',
        });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async goTo() {
        await this.page.goto('/cart.html');
    }

    getCartItemCardByName(name: string): CartItemCard {
        const card = this.page
            .getByTestId('inventory-item')
            .filter({ has: this.page.getByTestId('inventory-item-name') })
            .filter({ hasText: name });
        return new CartItemCard(card);
    }

    async removeItem(name: string) {
        const item = this.getCartItemCardByName(name);
        await item.removeFromCart();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
