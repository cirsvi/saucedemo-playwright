import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;
    readonly generatePDFOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = this.page.getByTestId('complete-header');
        this.backHomeButton = this.page.getByRole('button', {
            name: 'Back Home',
        });
        this.generatePDFOrderButton = this.page.getByRole('button', {
            name: 'Generate PDF order',
        });
    }

    async generatePDFOrder() {
        await this.generatePDFOrderButton.click();
    }
    async goBackHome() {
        await this.backHomeButton.click();
    }
}
