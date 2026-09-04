import { test, expect } from '../../fixtures/index';
import { CUSTOMER } from '../../test-data/customer';
import { ERRORS } from '../../test-data/errors';
import {
    fillAndVerify,
    expectValidationError,
} from '../../utils/checkoutInfoHelper';
import { getBackgroundColor } from '../../utils/getBgColor';

test.describe('Checkout | From Checkout: Your Information Page', () => {
    test('@checkout-regression SDQA-74: Cancel from Information Page', async ({
        checkoutInfoWithOneItem,
        page,
    }) => {
        await checkoutInfoWithOneItem.cancelCheckout();
        await expect(page).toHaveURL(/\/cart\.html/);
    });

    test('@smoke @checkout-regression SDQA-82: Successful checkout with valid information', async ({
        checkoutInfoWithOneItem,
        page,
    }) => {
        await fillAndVerify(
            checkoutInfoWithOneItem,
            CUSTOMER.STANDARD.firstName,
            CUSTOMER.STANDARD.lastName,
            CUSTOMER.STANDARD.zipCode
        );

        await expect(page).toHaveURL(/\/checkout-step-two\.html/);
    });

    test('@regression-expansion SDQA-141: Submit checkout information with all fields empty', async ({
        checkoutInfoWithOneItem,
        page,
    }) => {
        await checkoutInfoWithOneItem.continueCheckout();

        await expect(checkoutInfoWithOneItem.errorMessage).toContainText(
            ERRORS.FIRST_NAME_REQUIRED
        );
        await expect(checkoutInfoWithOneItem.firstNameInput).toHaveClass(
            /\berror\b/
        );
        await expect(checkoutInfoWithOneItem.lastNameInput).toHaveClass(
            /\berror\b/
        );
        await expect(checkoutInfoWithOneItem.zipCodeInput).toHaveClass(
            /\berror\b/
        );
        await expect(page).toHaveURL(/\/checkout-step-one\.html/);
    });

    test('@checkout-regression SDQA-81: Server-side: First name is required input field', async ({
        checkoutInfoWithOneItem,
        page,
    }) => {
        await fillAndVerify(
            checkoutInfoWithOneItem,
            '',
            CUSTOMER.STANDARD.lastName,
            CUSTOMER.STANDARD.zipCode
        );

        await expectValidationError(
            checkoutInfoWithOneItem,
            page,
            ERRORS.FIRST_NAME_REQUIRED,
            checkoutInfoWithOneItem.firstNameInput
        );
    });

    test('@checkout-regression SDQA-83: Server-side: Last name is required input field', async ({
        checkoutInfoWithOneItem,
        page,
    }) => {
        await fillAndVerify(
            checkoutInfoWithOneItem,
            CUSTOMER.STANDARD.firstName,
            '',
            CUSTOMER.STANDARD.zipCode
        );

        await expectValidationError(
            checkoutInfoWithOneItem,
            page,
            ERRORS.LAST_NAME_REQUIRED,
            checkoutInfoWithOneItem.lastNameInput
        );
    });

    test('@checkout-regression SDQA-84: Server-side: Zip code is required input field', async ({
        checkoutInfoWithOneItem,
        page,
    }) => {
        await fillAndVerify(
            checkoutInfoWithOneItem,
            CUSTOMER.STANDARD.firstName,
            CUSTOMER.STANDARD.lastName,
            ''
        );

        await expectValidationError(
            checkoutInfoWithOneItem,
            page,
            ERRORS.ZIP_CODE_REQUIRED,
            checkoutInfoWithOneItem.zipCodeInput
        );
    });

    test.fail(
        '@checkout-regression SDQA-89: Server-side: First name input does not accept special characters',
        async ({ checkoutInfoWithOneItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-128',
            });

            await fillAndVerify(
                checkoutInfoWithOneItem,
                '@&$^@%',
                CUSTOMER.STANDARD.lastName,
                CUSTOMER.STANDARD.zipCode
            );

            await expectValidationError(
                checkoutInfoWithOneItem,
                page,
                ERRORS.FIRST_NAME_SPECIAL_CHARS,
                checkoutInfoWithOneItem.firstNameInput
            );
        }
    );

    test.fail(
        '@checkout-regression SDQA-93: Server-side: Last name input does not accept special characters',
        async ({ checkoutInfoWithOneItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-129',
            });

            await fillAndVerify(
                checkoutInfoWithOneItem,
                CUSTOMER.STANDARD.firstName,
                '@&$^@%',
                CUSTOMER.STANDARD.zipCode
            );

            await expectValidationError(
                checkoutInfoWithOneItem,
                page,
                ERRORS.LAST_NAME_SPECIAL_CHARS,
                checkoutInfoWithOneItem.lastNameInput
            );
        }
    );

    test.fail(
        '@checkout-regression SDQA-94: Server-side: Zip Code input does not accept special characters',
        async ({ checkoutInfoWithOneItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-130',
            });

            await fillAndVerify(
                checkoutInfoWithOneItem,
                CUSTOMER.STANDARD.firstName,
                CUSTOMER.STANDARD.lastName,
                '@&$^@%'
            );

            await expectValidationError(
                checkoutInfoWithOneItem,
                page,
                ERRORS.ZIP_CODE_SPECIAL_CHARS,
                checkoutInfoWithOneItem.zipCodeInput
            );
        }
    );

    test.fail(
        '@checkout-regression SDQA-101: Server-side: First name input really long string',
        async ({ checkoutInfoWithOneItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-125',
            });
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-128',
            });

            await fillAndVerify(
                checkoutInfoWithOneItem,
                'a'.repeat(200),
                CUSTOMER.STANDARD.lastName,
                CUSTOMER.STANDARD.zipCode
            );

            await expectValidationError(
                checkoutInfoWithOneItem,
                page,
                ERRORS.FIRST_NAME_MAX_LEN,
                checkoutInfoWithOneItem.firstNameInput
            );
        }
    );

    test.fail(
        '@checkout-regression SDQA-102: Server-side: Last name input really long string',
        async ({ checkoutInfoWithOneItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-126',
            });

            await fillAndVerify(
                checkoutInfoWithOneItem,
                CUSTOMER.STANDARD.firstName,
                'a'.repeat(200),
                CUSTOMER.STANDARD.zipCode
            );

            await expectValidationError(
                checkoutInfoWithOneItem,
                page,
                ERRORS.LAST_NAME_MAX_LEN,
                checkoutInfoWithOneItem.lastNameInput
            );
        }
    );

    test.fail(
        '@checkout-regression SDQA-103: Server-side: Zip code input really long string',
        async ({ checkoutInfoWithOneItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-127',
            });

            await fillAndVerify(
                checkoutInfoWithOneItem,
                CUSTOMER.STANDARD.firstName,
                CUSTOMER.STANDARD.lastName,
                'a'.repeat(200)
            );

            await expectValidationError(
                checkoutInfoWithOneItem,
                page,
                ERRORS.ZIP_CODE_MAX_LEN,
                checkoutInfoWithOneItem.zipCodeInput
            );
        }
    );

    test('@regression-expansion SDQA-139: Closing error message clears message and input highlight', async ({
        checkoutInfoWithOneItem,
    }) => {
        await checkoutInfoWithOneItem.continueCheckout();
        await expect(checkoutInfoWithOneItem.errorMessage).toBeVisible();

        await checkoutInfoWithOneItem.closeError();

        await expect(checkoutInfoWithOneItem.errorMessage).not.toBeVisible();
        await expect(checkoutInfoWithOneItem.firstNameInput).not.toHaveClass(
            /\berror\b/
        );
        await expect(checkoutInfoWithOneItem.lastNameInput).not.toHaveClass(
            /\berror\b/
        );
        await expect(checkoutInfoWithOneItem.zipCodeInput).not.toHaveClass(
            /\berror\b/
        );
    });

    test.fail(
        '@checkout-regression SDQA-112: Mouse interactions on Information Page',
        async ({ checkoutInfoWithOneItem }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-131',
            });

            await checkoutInfoWithOneItem.firstNameInput.click();
            await expect(checkoutInfoWithOneItem.firstNameInput).toBeFocused();
            await expect(checkoutInfoWithOneItem.firstNameInput).not.toHaveCSS(
                'outline-style',
                'none'
            );

            await checkoutInfoWithOneItem.lastNameInput.click();
            await expect(checkoutInfoWithOneItem.lastNameInput).toBeFocused();
            await expect(checkoutInfoWithOneItem.lastNameInput).not.toHaveCSS(
                'outline-style',
                'none'
            );

            await checkoutInfoWithOneItem.zipCodeInput.click();
            await expect(checkoutInfoWithOneItem.zipCodeInput).toBeFocused();
            await expect(checkoutInfoWithOneItem.zipCodeInput).not.toHaveCSS(
                'outline-style',
                'none'
            );

            const standardBgCancel = await getBackgroundColor(
                checkoutInfoWithOneItem.cancelButton
            );
            await checkoutInfoWithOneItem.cancelButton.hover();
            await expect(checkoutInfoWithOneItem.cancelButton).toHaveCSS(
                'cursor',
                'pointer'
            );
            await expect(checkoutInfoWithOneItem.cancelButton).not.toHaveCSS(
                'background-color',
                standardBgCancel
            );

            const standardBgContinue = await getBackgroundColor(
                checkoutInfoWithOneItem.continueButton
            );
            await checkoutInfoWithOneItem.continueButton.hover();
            await expect(checkoutInfoWithOneItem.continueButton).toHaveCSS(
                'cursor',
                'pointer'
            );
            await expect(checkoutInfoWithOneItem.continueButton).not.toHaveCSS(
                'background-color',
                standardBgContinue
            );
        }
    );

    test.fail(
        '@checkout-regression SDQA-113: Tab navigation on Information Page',
        async ({ checkoutInfoWithOneItem, page }) => {
            test.info().annotations.push({
                type: 'bug',
                description: 'SDQA-132',
            });

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expect(checkoutInfoWithOneItem.firstNameInput).toBeFocused();
            await expect(checkoutInfoWithOneItem.firstNameInput).not.toHaveCSS(
                'outline-style',
                'none'
            );

            await page.keyboard.press('Tab');
            await expect(checkoutInfoWithOneItem.lastNameInput).toBeFocused();
            await expect(checkoutInfoWithOneItem.lastNameInput).not.toHaveCSS(
                'outline-style',
                'none'
            );

            await page.keyboard.press('Tab');
            await expect(checkoutInfoWithOneItem.zipCodeInput).toBeFocused();
            await expect(checkoutInfoWithOneItem.zipCodeInput).not.toHaveCSS(
                'outline-style',
                'none'
            );

            const standardBgCancel = await getBackgroundColor(
                checkoutInfoWithOneItem.cancelButton
            );
            await page.keyboard.press('Tab');
            await expect(checkoutInfoWithOneItem.cancelButton).not.toHaveCSS(
                'background-color',
                standardBgCancel
            );

            const standardBgContinue = await getBackgroundColor(
                checkoutInfoWithOneItem.continueButton
            );
            await page.keyboard.press('Tab');
            await expect(checkoutInfoWithOneItem.continueButton).not.toHaveCSS(
                'background-color',
                standardBgContinue
            );
        }
    );
});
