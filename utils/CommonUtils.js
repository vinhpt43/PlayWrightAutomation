const fs = require('fs');
const config = require("../playwright.config.js")
// const singlePageDomain = `https://${appName}.${environment}arp.mantu.com`
class CommonUtils {

    constructor(context) {
        this.context = context
        this.accessToken = ""
    }

    async LoginARP(username, password) {
        const context = await this.context;
        const page = await context.newPage();
        const targetUrl = 'https://auth.mantu.com/oauth/token';
        page.on('response', async response => {
            // Check if the response URL matches the target URL
            if (response.url() === targetUrl) {
                // Get the response body
                const responseBody = await response.text();
                this.accessToken = JSON.parse(responseBody).access_token;
            }
        });

        await page.goto("https://am.intearp.mantu.com");
        const username_txtbox = page.getByRole('textbox', { name: 'username' });
        const continue_btn = page.getByRole('button', { name: 'Continue' });
        const password_txtbox = page.getByRole('textbox', { name: 'password' });
        const rememberLogin_checkbox = page.getByText('Remember this device for 30 days');
        await username_txtbox.fill(username);
        await continue_btn.click();
        await password_txtbox.fill(password);
        await continue_btn.click();
        await rememberLogin_checkbox.click();
        await continue_btn.click();

        await page.waitForResponse(response => response.url() === targetUrl && response.status() === 200);

        const storageState = await context.storageState({ path: 'session.json' });
        await page.close();
        // fs.writeFileSync('auth.json', JSON.stringify(storageState));
        return this.accessToken;
    }

    static goToSinglePageApp(appName) {
        return `https://${appName}.${config.use.environment}arp.mantu.com`;
    }
}

module.exports = { CommonUtils }