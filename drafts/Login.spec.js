const { test} = require('@playwright/test');
const { LoginPage } = require('./LoginPage');

test("Login ARP", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginARP();
}
)