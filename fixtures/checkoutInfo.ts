import { Page } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';

export const checkoutInfo  = async (
    { page, cartWithSingleItem }: { page: Page; cartWithSingleItem: CartPage },
    use: (r: CheckoutInformationPage) => Promise<void>
) => {
    // cartItems is a dependency, it ensures that user is logged in and has items
    await cartWithSingleItem.proceedToCheckout();
    const checkoutInfoPage = new CheckoutInformationPage(page);
    await use(checkoutInfoPage);
};
