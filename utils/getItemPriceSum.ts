import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutItemCard } from '../components/checkoutItemCard';

export async function getItemPriceSum(
    checkoutOverview: CheckoutOverviewPage
): Promise<string> {
    const itemCount = await checkoutOverview.cartItemCards.count();

    let itemSum = 0;

    for (let i = 0; i < itemCount; i++) {
        const item = new CheckoutItemCard(
            checkoutOverview.cartItemCards.nth(i)
        );
        itemSum += parseFloat((await item.price.innerText()).replace('$', '').trim());
    }
    return itemSum.toFixed(2);
}
