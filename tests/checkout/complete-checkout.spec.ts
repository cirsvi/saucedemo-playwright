import { test, expect } from '../../fixtures/index';
import { Header } from '../../components/header';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Checkout | From Checkout: Complete Page', () => {
    test('@checkout-regression SDQA-106: Cart is empty after purchase', async ({
        completedCheckoutWithOneItem,
        page,
    }) => {
        const header = new Header(page);
        await expect(header.cartIconBadge).not.toBeVisible();
    });

    test('@checkout-regression SDQA-108: Return back to homepage after purchase', async ({
        completedCheckoutWithOneItem,
        page,
    }) => {
        await completedCheckoutWithOneItem.goBackHome();
        await expect(page).toHaveURL(/\/inventory\.html/);
    });

    test('@checkout-regression SDQA-109: Generate PDF order receipt', async ({
        completedCheckoutWithOneItem,
        page,
    }) => {
        const downloadPDFPromise = page.waitForEvent('download');
        await completedCheckoutWithOneItem.generatePDFOrder();
        const download = await downloadPDFPromise;

        const dir = path.join(process.cwd(), 'order_reports');
        fs.mkdirSync(dir, { recursive: true });

        const saveFilename = path.basename(download.suggestedFilename());
        const filePath = path.join(dir, saveFilename);
        await download.saveAs(filePath);

        expect(download.suggestedFilename()).toContain('.pdf');
    });
});
