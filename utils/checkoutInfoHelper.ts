import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export async function fillAndVerify(
    checkoutInfo: CheckoutInformationPage,
    firstName: string,
    lastName: string,
    zipCode: string
) {
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
) {
    await expect(checkoutInfo.errorMessage).toContainText(message);
    await expect(field).toHaveClass(/error/);
    await expect(page).toHaveURL(/\/checkout-step-one\.html/);
}
