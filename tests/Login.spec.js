const { test, expect, request } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test("Login ARP", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginARP("username", "password");
}
)