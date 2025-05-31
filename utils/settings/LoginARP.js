const dataSet = JSON.parse(JSON.stringify(require('../data/setupData/loginData.json')));
const { chromium } = require('playwright')
const fs = require('fs');
const path = require('path');

async function loginARP() {
    //Init browser
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();

    //Declare web objects
    const username_txtbox = page.getByRole('textbox', { name: 'username' });
    const continue_btn = page.getByRole('button', { name: 'Continue' });
    const password_txtbox = page.getByRole('textbox', { name: 'password' });
    const rememberLogin_checkbox = page.getByText('Remember this device for 30 days');

    const targetUrl = 'https://auth.mantu.com/oauth/token';
    page.on('response', async response => {
        // Check if the response URL matches the target URL
        if (response.url() === targetUrl) {
            // Get the response body
            const responseBody = await response.text();
            //Store the access token to access_token.json
            fs.writeFileSync(path.join(__dirname, '../data/setupData/access_token.json'), JSON.stringify({ access_token: JSON.parse(responseBody).access_token }));
        }
    });

    //Fill in username and password and proceed to log in
    await page.goto("https://am.intearp.mantu.com");
    await username_txtbox.fill(dataSet.username);
    await continue_btn.click();
    await password_txtbox.fill(dataSet.password);
    await continue_btn.click();
    await rememberLogin_checkbox.click();
    await continue_btn.click();

    //Wait for token api to get access token after logging in
    await page.waitForResponse(response => response.url() === targetUrl && response.status() === 200);

    //Save session context for all later tests
    await page.context().storageState({ path: 'session.json' });
    await page.close();
}
module.exports = { loginARP };