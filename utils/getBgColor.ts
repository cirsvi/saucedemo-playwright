import { Locator } from '@playwright/test';

export async function getBackgroundColor(locator: Locator): Promise<string> {
    return locator.evaluate(el => getComputedStyle(el).backgroundColor);
}
