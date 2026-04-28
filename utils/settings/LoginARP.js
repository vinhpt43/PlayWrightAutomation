const { LOGIN } = require('../data/setupData/constants');
const { chromium } = require('playwright')
const fs = require('fs');
const path = require('path');

async function loginARP() {
    //Check if a storageState has already existed
    const hasStorage = fs.existsSync('session.json');

    //Init browser
    let browser;
    let context;
    let page;
    let isLoggedIn;
    let tokenExpired;

    tokenExpired = await checkTokenExpired();

    if (hasStorage) {
        browser = await chromium.launch({ headless: true });
        context = await browser.newContext({ storageState: 'session.json' });
        page = await context.newPage();
        console.log('Checking authentication session validity ...')
        isLoggedIn = await checkIsLoggedIn(page);
        if (isLoggedIn && !tokenExpired) {
            console.log("Tests starting ...");
        }
        else {
            console.log("Session expired!");
        }
    }
    if (!hasStorage || !isLoggedIn || tokenExpired) {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();
        console.log("Performing log in action");
        await inputCredentials(page);
    }

    //Close
    await page.close();
    await context.close();
    await browser.close();
}

async function checkIsLoggedIn(page) {
    // const page = await context.newPage();
    const guardianHeader = page.getByText('TEST ENVIRONMENT', { exact: true });
    //Go to any ARP app to open login portal
    await page.goto("https://guardian.o2f-it.com/INTE/index", { waitUntil: 'networkidle' });
    return await guardianHeader.isVisible().catch(() => false);
}

async function checkTokenExpired() {
    const tokenData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/setupData/access_token.json')));
    return Date.now() - 30000 >= tokenData.expiry;
}

async function inputCredentials(page) {
    //Declare web objects
    const microsoft_username_txtbox = page.getByPlaceholder('Email, phone, or Skype');
    const next_btn = page.getByRole('button', { name: 'Next' });
    // const username_txtbox = page.getByRole('textbox', { name: 'username' });
    // const continue_btn = page.getByRole('button', { name: 'Continue' });
    // const password_txtbox = page.getByRole('textbox', { name: 'password' });
    // const rememberLogin_checkbox = page.getByText('Remember this device for 30 days');
    const showAgain_checkbox = page.getByText("Don't show this again");
    const yes_btn = page.getByRole('button', { name: 'Yes' });

    const targetUrl = 'https://login.microsoftonline.com/ce57ebe3-a63d-4708-b5cf-c274b48bd26c/oauth2/v2.0/token';//'https://auth.mantu.com/oauth/token';
    page.on('response', async response => {
        // Check if the response URL matches the target URL
        if (response.url() === targetUrl) {
            // Get the response body
            const responseBody = await response.text();
            //Store the access token to access_token.json to use for impersonation with Guardian
            fs.writeFileSync(path.join(__dirname, '../data/setupData/access_token.json'), JSON.stringify({ access_token: JSON.parse(responseBody).access_token, expiry: Date.now() + JSON.parse(responseBody).expires_in * 1000 }));
        }
    });

    //Go to any ARP app to open login portal
    await page.goto("https://guardian.o2f-it.com/INTE/index");

    //Fill in username in Microsoft interface
    await microsoft_username_txtbox.fill(LOGIN.USERNAME);
    await next_btn.click();
    //Fill in username and password and proceed to log in
    // await username_txtbox.fill(LOGIN.USERNAME);
    // await continue_btn.click();
    // await rememberLogin_checkbox.click();
    // await continue_btn.click();
    await showAgain_checkbox.click();
    await yes_btn.click();

    //Wait for token api to get access token after logging in
    await page.waitForResponse(async response => {
        if (!response.url().startsWith(targetUrl) || response.status() !== 200) {
            return false;
        }

        const bodyText = await response.text();

        let body;
        try {
            body = JSON.parse(bodyText);
        } catch (e) {
            console.log('Failed to parse JSON:', e, 'bodyText:', bodyText);
            return false;
        }

        //filter only the token request that Guardian can use
        return body.scope?.includes('api://guardianapi/Contributor');
    });

    //Save session context for all later tests
    await page.context().storageState({ path: 'session.json' });

}
module.exports = { loginARP };
// module.exports =  loginARP ;