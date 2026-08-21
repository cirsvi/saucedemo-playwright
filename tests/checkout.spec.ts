import { test, expect } from '../fixtures/index';
import { Header } from '../components/header';
import { CUSTOMER } from '../test-data/customer';
import { ERRORS } from '../test-data/errors';
import { CheckoutItemCard } from '../components/checkoutItemCard';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import {
    fillAndVerify,
    expectValidationError,
} from '../utils/checkoutInfoHelper';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Checkout', () => {
    test.describe('From Cart Page', () => {
        test('SDQA-71: Access from Cart Page', async ({
            cartWithSingleItem,
            page,
        }) => {
            await cartWithSingleItem.proceedToCheckout();
            await expect(page).toHaveURL(/\/checkout-step-one\.html/);
        });

        test.fail(
            'SDQA-72: Checkout button is disabled when cart is empty',
            async ({ cartWithNoItem, page }) => {
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-124',
                });

                await expect(cartWithNoItem.checkoutButton).toBeDisabled();
                await expect(page).toHaveURL(/\/cart\.html/);
            }
        );
    });

    test.describe('From Checkout: Your Information Page', () => {
        test('SDQA-74: Cancel from Information Page', async ({
            checkoutInfo,
            page,
        }) => {
            await checkoutInfo.cancelCheckout();
            await expect(page).toHaveURL(/\/cart\.html/);
        });

        test('SDQA-82: Successful checkout with valid information', async ({
            checkoutInfo,
            page,
        }) => {
            await fillAndVerify(
                checkoutInfo,
                CUSTOMER.STANDARD.firstName,
                CUSTOMER.STANDARD.lastName,
                CUSTOMER.STANDARD.zipCode
            );

            await expect(page).toHaveURL(/\/checkout-step-two\.html/);
        });

        test('SDQA-81: Server-side: First name is required input field', async ({
            checkoutInfo,
            page,
        }) => {
            await fillAndVerify(
                checkoutInfo,
                '',
                CUSTOMER.STANDARD.lastName,
                CUSTOMER.STANDARD.zipCode
            );

            await expectValidationError(
                checkoutInfo,
                page,
                ERRORS.FIRST_NAME_REQUIRED,
                checkoutInfo.firstNameInput
            );
        });

        test('SDQA-83: Server-side: Last name is required input field', async ({
            checkoutInfo,
            page,
        }) => {
            await fillAndVerify(
                checkoutInfo,
                CUSTOMER.STANDARD.firstName,
                '',
                CUSTOMER.STANDARD.zipCode
            );

            await expectValidationError(
                checkoutInfo,
                page,
                ERRORS.LAST_NAME_REQUIRED,
                checkoutInfo.lastNameInput
            );
        });

        test('SDQA-84: Server-side: Zip code is required input field', async ({
            checkoutInfo,
            page,
        }) => {
            await fillAndVerify(
                checkoutInfo,
                CUSTOMER.STANDARD.firstName,
                CUSTOMER.STANDARD.lastName,
                ''
            );

            await expectValidationError(
                checkoutInfo,
                page,
                ERRORS.ZIP_CODE_REQUIRED,
                checkoutInfo.zipCodeInput
            );
        });

        test.fail(
            'SDQA-89: Server-side: First name input does not accept special characters',
            async ({ checkoutInfo, page }) => {
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-128',
                });

                await fillAndVerify(
                    checkoutInfo,
                    '@&$^@%',
                    CUSTOMER.STANDARD.lastName,
                    CUSTOMER.STANDARD.zipCode
                );

                await expectValidationError(
                    checkoutInfo,
                    page,
                    ERRORS.FIRST_NAME_SPECIAL_CHARS,
                    checkoutInfo.firstNameInput
                );
            }
        );

        test.fail(
            'SDQA-93: Server-side: Last name input does not accept special characters',
            async ({ checkoutInfo, page }) => {
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-129',
                });

                await fillAndVerify(
                    checkoutInfo,
                    CUSTOMER.STANDARD.firstName,
                    '@&$^@%',
                    CUSTOMER.STANDARD.zipCode
                );

                await expectValidationError(
                    checkoutInfo,
                    page,
                    ERRORS.LAST_NAME_SPECIAL_CHARS,
                    checkoutInfo.lastNameInput
                );
            }
        );

        test.fail(
            'SDQA-94: Server-side: Zip Code input does not accept special characters',
            async ({ checkoutInfo, page }) => {
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-130',
                });

                await fillAndVerify(
                    checkoutInfo,
                    CUSTOMER.STANDARD.firstName,
                    CUSTOMER.STANDARD.lastName,
                    '@&$^@%'
                );

                await expectValidationError(
                    checkoutInfo,
                    page,
                    ERRORS.ZIP_CODE_SPECIAL_CHARS,
                    checkoutInfo.zipCodeInput
                );
            }
        );

        test.fail(
            'SDQA-101: Server-side: First name input really long string',
            async ({ checkoutInfo, page }) => {
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-125',
                });
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-128',
                });

                await fillAndVerify(
                    checkoutInfo,
                    'a'.repeat(200),
                    CUSTOMER.STANDARD.lastName,
                    CUSTOMER.STANDARD.zipCode
                );

                await expectValidationError(
                    checkoutInfo,
                    page,
                    ERRORS.FIRST_NAME_MAX_LEN,
                    checkoutInfo.firstNameInput
                );
            }
        );

        test.fail(
            'SDQA-102: Server-side: Last name input really long string',
            async ({ checkoutInfo, page }) => {
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-126',
                });

                await fillAndVerify(
                    checkoutInfo,
                    CUSTOMER.STANDARD.firstName,
                    'a'.repeat(200),
                    CUSTOMER.STANDARD.zipCode
                );

                await expectValidationError(
                    checkoutInfo,
                    page,
                    ERRORS.LAST_NAME_MAX_LEN,
                    checkoutInfo.lastNameInput
                );
            }
        );

        test.fail(
            'SDQA-103: Server-side: Zip code input really long string',
            async ({ checkoutInfo, page }) => {
                test.info().annotations.push({
                    type: 'bug',
                    description: 'SDQA-127',
                });

                await fillAndVerify(
                    checkoutInfo,
                    CUSTOMER.STANDARD.firstName,
                    CUSTOMER.STANDARD.lastName,
                    'a'.repeat(200)
                );

                await expectValidationError(
                    checkoutInfo,
                    page,
                    ERRORS.ZIP_CODE_MAX_LEN,
                    checkoutInfo.zipCodeInput
                );
            }
        );

        test.fixme('SDQA-112: Mouse interactions on Information Page', async () => {
            // Known bug: no clear UX/UI for mouse interactions
            // Bug: SDQA-131
            // Steps:
            // 1. User clicks on the "First Name" input field field.
            // Expected: The "First Name" input field is selected and has a visible visual highlight.
            // 2. User clicks on the "Last Name" input field field.
            // Expected: The "Last Name" input field is selected and has a visible visual highlight.
            // 3. User clicks on the "Zip/Postal Code" input field field.
            // Expected: The "Zip/Postal Code" input field is selected and has a visible visual highlight.
            // 4. User hovers using mouse over the "<- Cancel" button.
            // Expected: The button changes its appearance by a distinct color; the cursor visibly changes to hand to indicate possible action.
            // 5. User hovers using mouse over the "Continue" button.
            // Expected: The button changes its appearance by a distinct color; the cursor visibly changes to hand to indicate possible action.
        });

        test.fixme('SDQA-113: Tab navigation on Information Page', async () => {
            // Known bug: no clear UX/UI for tab navigation
            // Bug: SDQA-132
            // Steps:
            // 1. User presses the "Tab" key twice.
            // Expected: The cursor/focus moves to the "First Name" field. A visual highlight border appears.
            // 2. User presses the Tab key again (3rd time).
            // Expected: The cursor/focus moves to the "Last Name" field. A visual highlight border appears.
            // 3. User presses the Tab key again (4th time).
            // Expected: The cursor/focus moves to the "Zip/Postal Code" field. A visual highlight border appears.
            // 4. User presses the Tab key again (5th time).
            // Expected: Focus moves to the "<- Cancel" button. The button is visually highlighted.
            // 5. User presses the Tab key again (6th time).
            // Expected: Focus moves to the "Continue" button. The button is visually highlighted.
        });
    });

    test.describe('From Checkout: Overview Page', () => {
        test('SDQA-77: Cancel from Overview Page', async ({
            checkoutOverview,
            page,
        }) => {
            await checkoutOverview.cancleCheckout();
            await expect(page).toHaveURL(/\/inventory\.html/);
        });

        test('SDQA-104: Overview page content', async ({
            checkoutOverview,
        }) => {
            await expect(checkoutOverview.productList).toBeVisible();
            const itemCount = await checkoutOverview.cartItemCards.count();
            await expect(itemCount).toBeGreaterThan(0);

            for (let i = 0; i < itemCount; i++) {
                const item = new CheckoutItemCard(
                    checkoutOverview.cartItemCards.nth(i)
                );
                await expect(item.name).not.toBe('');
                await expect(item.description).not.toBe('');
                await expect(item.price).not.toBe('');
                await expect(item.quantity).toHaveText('1');
            }

            await expect(checkoutOverview.paymentCard).toContainText(
                'SauceCard #31337'
            );
            await expect(checkoutOverview.shippingInfo).toContainText(
                'Free Pony Express Delivery!'
            );

            const subtotal = parseFloat(
                (await checkoutOverview.subtotalPrice.innerText()).replace(
                    'Item total: $',
                    ''
                )
            );
            const tax = parseFloat(
                (await checkoutOverview.taxPrice.innerText()).replace(
                    'Tax: $',
                    ''
                )
            );
            const total = parseFloat(
                (await checkoutOverview.totalPrice.innerText()).replace(
                    'Total: $',
                    ''
                )
            );
            expect(total).toBeCloseTo(subtotal + tax, 2);
        });

        test('SDQA-105: Complete purchase', async ({
            checkoutOverview,
            page,
        }) => {
            await checkoutOverview.finishCheckout();
            await expect(page).toHaveURL(/\/checkout-complete\.html/);

            const checkoutCompletePage = new CheckoutCompletePage(page);
            await expect(checkoutCompletePage.completeHeader).toBeVisible();
            await expect(checkoutCompletePage.completeHeader).toContainText(
                'Thank you for your order!'
            );
        });
    });

    test.describe('From Checkout: Complete Page', () => {
        test('SDQA-106:	Cart is empty after purchase', async ({
            completedCheckout,
            page,
        }) => {
            const header = new Header(page);
            await expect(header.cartIconBadge).not.toBeVisible();
        });

        test('SDQA-108: Return back to homepage after purchase', async ({
            completedCheckout,
            page,
        }) => {
            await completedCheckout.goBackHome();
            await expect(page).toHaveURL(/\/inventory\.html/);
        });

        test('SDQA-109: Generate PDF order receipt', async ({
            completedCheckout,
            page,
        }) => {
            const downloadPDFPromise = page.waitForEvent('download');
            await completedCheckout.generatePDFOrder();
            const download = await downloadPDFPromise;

            const dir = path.join(process.cwd(), 'order-reports');
            fs.mkdirSync(dir, { recursive: true });

            const saveFilename = path.basename(download.suggestedFilename());
            const filePath = path.join(dir, saveFilename);
            await download.saveAs(filePath);

            expect(download.suggestedFilename()).toContain('.pdf');
        });
    });
});
