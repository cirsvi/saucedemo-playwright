import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;
    readonly errorCloseButton: Locator;

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
        this.errorCloseButton = page.getByTestId('error-button');
    }

    async fillInForm(
        firstName: string,
        lastName: string,
        zipCode: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async cancelCheckout(): Promise<void> {
        await this.cancelButton.click();
    }

    async continueCheckout(): Promise<void> {
        await this.continueButton.click();
    }

    async closeError(): Promise<void> {
        await this.errorCloseButton.click();
    }
}
