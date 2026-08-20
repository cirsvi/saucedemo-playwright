import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.zipCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.continueButton = this.page.getByRole('button', {
            name: 'Continue',
        });
        this.errorMessage = this.page.getByTestId('error');
    }

    async fillInForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async continueCheckout() {
        await this.continueButton.click();
    }
}
