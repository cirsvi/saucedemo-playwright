import { Page, Locator } from '@playwright/test';
import { CheckoutItemCard } from '../components/checkoutItemCard';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly productList: Locator;
    readonly cartItemCards: Locator;
    readonly paymentCard: Locator;
    readonly shippingInfo: Locator;
    readonly subtotalPrice: Locator;
    readonly taxPrice: Locator;
    readonly totalPrice: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.getByTestId('cart-list');
        this.cartItemCards = page.getByTestId('inventory-item');
        this.paymentCard = page.getByTestId('payment-info-value');
        this.shippingInfo = page.getByTestId('shipping-info-value');
        this.subtotalPrice = page.getByTestId('subtotal-label');
        this.taxPrice = page.getByTestId('tax-label');
        this.totalPrice = page.getByTestId('total-label');
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    }

    getCartItemCardByName(name: string): CheckoutItemCard {
        const card = this.page
            .getByTestId('inventory-item')
            .filter({ has: this.page.getByTestId('inventory-item-name') })
            .filter({ hasText: name });
        return new CheckoutItemCard(card);
    }

    async cancleCheckout() {
        await this.cancelButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
