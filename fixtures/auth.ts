import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export const loggedInPage = async (
    { page }: { page: Page },
    use: (r: LoginPage) => Promise<void>
) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await use(loginPage);
};
