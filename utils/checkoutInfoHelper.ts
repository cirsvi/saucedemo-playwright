import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { Page, Locator, expect } from '@playwright/test';

export async function fillAndVerify(
    checkoutInfo: CheckoutInformationPage,
    firstName: string,
    lastName: string,
    zipCode: string
): Promise<void> {
    await checkoutInfo.fillInForm(firstName, lastName, zipCode);

    await expect(checkoutInfo.firstNameInput).toHaveValue(firstName);
    await expect(checkoutInfo.lastNameInput).toHaveValue(lastName);
    await expect(checkoutInfo.zipCodeInput).toHaveValue(zipCode);
    await checkoutInfo.continueCheckout();
}

export async function expectValidationError(
    checkoutInfo: CheckoutInformationPage,
    page: Page,
    message: string,
    field: Locator
): Promise<void> {
    await expect(checkoutInfo.errorMessage).toContainText(message);
    await expect(field).toHaveClass(/\berror\b/);
    await expect(page).toHaveURL(/\/checkout-step-one\.html/);
}
