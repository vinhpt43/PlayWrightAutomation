const GlobalVariables = require('../utils/GlobalVariables');
const dataSet = JSON.parse(JSON.stringify(require('../utils/testData.json')));

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username_txtbox = page.getByRole('textbox', { name: 'username' });
        this.continue_btn = page.getByRole('button', { name: 'Continue' });
        this.password_txtbox = page.getByRole('textbox', { name: 'password' });
        this.rememberLogin_checkbox = page.getByText('Remember this device for 30 days');
    }

    async loginARP() {
        const targetUrl = 'https://auth.mantu.com/oauth/token';
        this.page.on('response', async response => {
            // Check if the response URL matches the target URL
            if (response.url() === targetUrl) {
                // Get the response body
                const responseBody = await response.text();
                //Store the access token to GlobalVariables
                GlobalVariables.set('access_token',JSON.parse(responseBody).access_token);
            }
        });

        //Fill in username and password and proceed to log in
        await this.page.goto("https://am.intearp.mantu.com");
        await this.username_txtbox.fill(dataSet.username);
        await this.continue_btn.click();
        await this.password_txtbox.fill(dataSet.password);
        await this.continue_btn.click();
        await this.rememberLogin_checkbox.click();
        await this.continue_btn.click();

        //Wait for token api to get access token after logging in
        await this.page.waitForResponse(response => response.url() === targetUrl && response.status() === 200);

        //Save session context for all later tests
        await this.page.context().storageState({path: 'session.json' });
        await this.page.close();
    }
}
module.exports = {LoginPage};