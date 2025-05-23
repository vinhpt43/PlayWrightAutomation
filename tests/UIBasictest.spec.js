const {test, expect, request} = require('@playwright/test');
const fs = require('fs');

test('Get access token', async ()=>{
    const apiContext = await request.newContext();
    const tokenRequest = await apiContext.post("https://auth.mantu.com/oauth/token", {
        data:
        {
            client_id: "9lYCx6zc1CYswwI3lJCVBrqjG21mS79G",
            client_secret: "ixwEgKY9ztSt52X4xozMjbsCWO_m2lKXH_he1U_GeepgQ8H5Q414FZjVsgcc5dqz",
            audience: "erpapi",
            grant_type: "client_credentials"
        },
        headers: { "Content-Type": "application/json" }
    });
    const token = JSON.parse(await tokenRequest.text()).access_token;
    console.log(token);
});

test('Login ARP', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://am.intearp.mantu.com");
    const username_txtbox = page.getByRole('textbox', {name:'username'});
    const continue_btn = page.getByRole('button',{name: 'Continue'});
    const password_txtbox = page.getByRole('textbox',{name:'password'});
    const rememberLogin_checkbox = page.getByText('Remember this device for 30 days');
    await username_txtbox.fill("vphan1@mantu.com");
    await continue_btn.click();
    await password_txtbox.fill("mononoke_43");
    await continue_btn.click();
    await rememberLogin_checkbox.click();
    await continue_btn.click();

    // const targetUrl = 'https://auth.mantu.com/oauth/token';

    // // Listen for network requests
    // page.on('request', request => {
    //     // Check if the request URL matches the target URL
    //     if (request.url() === targetUrl) {
    //         // Log the request method and URL
    //         console.log(`Request: ${request.method()} ${request.url()}`);

    //         // Get the request body
    //         const postData = request.postData();
    //         if (postData) {
    //             console.log(`Request Body: ${postData}`);
    //         }
    //     }
    // });
    await expect(page).toHaveTitle("Forbidden - Activity Management");
    const storageState = await context.storageState();
    fs.writeFileSync('auth.json', JSON.stringify(storageState));
    // console.log(JSON.parse(JSON.stringify(storageState)));
});

test('Go to AM',async ({browser})=>
{
    //chrome - plugins/cookies
    const storageState = JSON.parse(fs.readFileSync('auth.json', 'utf8'));
    const context = await browser.newContext({storageState});
    const page = await context.newPage();
    await page.goto("https://am.intearp.mantu.com");
    await expect(page).toHaveTitle("Forbidden - Activity Management");
    
});

test('Go to Guardian',async ({browser})=>
{
    //chrome - plugins/cookies
    const storageState = JSON.parse(fs.readFileSync('auth.json', 'utf8'));
    const context = await browser.newContext({storageState});
    const page = await context.newPage();
    await page.goto("https://integuardian.o2f-it.com/");
    await expect(page).toHaveTitle("Home Page - INTE Guardian");
    
});

//shorter version of "Browser context Playwright test", no need to initiate browsser and context
test('Page Playwright test',async ({page})=>
{
    await page.goto("https://integuardian.o2f-it.com/");
    //get title
    //console.log(await page.title());
    //await expect(page).toHaveTitle("Google");
    const username_txtbox = page.getByRole('textbox', {name:'username'});
    const continue_btn = page.getByRole('button',{name: 'Continue'});
    const password_txtbox = page.getByRole('textbox',{name:'password'});
    const error_msg = page.getByText('Wrong username or password');
    const fingerprint_msg = page.getByText('Use fingerprint or face recognition to login');
    const rememberLogin_checkbox = page.getByText('Remember this device for 30 days');
    const guardianMenu_btn = page.getByRole('button',{name: 'Tan Vinh PHAN'});
    const impersonate_btn = page.getByRole('button',{name: 'Impersonate'});
    const impersonateUser_txtbox = page.getByPlaceholder('Search user to impersonate');
    const impersonateReason_txtbox = page.getByPlaceholder('e.g., Accessing Invoice for validation tests');
    const assign_btn = page.getByRole('button',{name:'Assign'});
    const notification_msg = page.getByText('Identify assigned successfully');
    await username_txtbox.fill("vphan1@mantu.com");
    await continue_btn.click();
    // await password_txtbox.fill("xxx");
    // await continue_btn.click();
    // await expect(error_msg).toBeVisible();
    // await password_txtbox.clear();
    await password_txtbox.fill("***");
    await continue_btn.click();
    await expect(fingerprint_msg).toBeVisible();
    await rememberLogin_checkbox.click();
    await continue_btn.click();
    await expect(page).toHaveTitle("Home Page - INTE Guardian");
    await guardianMenu_btn.click();
    await impersonate_btn.click();
    await impersonateUser_txtbox.fill("Lehouque Francois");
    await page.getByText('Francois Lehouque').click();
    await impersonateReason_txtbox.fill('duh');
    await assign_btn.click();
    await expect(notification_msg).toBeVisible();
});

test('Practice', async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const menu = page.getByRole('combobox');
    // const userType_radiobtn = page.getByRole('radio',{name:'User'});
    const userType_radiobtn = page.getByLabel('User', {exact:true});
    const adminType_radiobtn = page.getByRole('radio',{name:'Admin'});
    const okay_btn = page.getByRole('button',{name:'Okay'});
    const agree_checkbox = page.getByLabel('I agree to the terms and conditions');
    const advert_link = page.getByText('Free Access to InterviewQues/ResumeAssistance/Material');
    // const username_txtbox = page.getByRole('textbox',{name:'username'});
    const username_txtbox = page.getByLabel('Username');
    await menu.selectOption({label:'Consultant'});
    await userType_radiobtn.click();
    await okay_btn.click();
    // await expect(adminType_radiobtn).toBeChecked();
    
    await agree_checkbox.check();
    await expect(agree_checkbox).toBeChecked();
    // await page.pause();
    await expect(advert_link).toHaveClass('blinkingText');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        advert_link.click()
    ]);
    const highlighted_txt = newPage.getByText('Please email us at mentor@rahulshettyacademy.com with below template to receive response');
    await expect(highlighted_txt).toHaveClass('im-para red');
    await username_txtbox.fill('blah');
    // await page.pause();
});

test('Practice locator', async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client');
    const username_txtbox = page.locator('#userEmail');
    const password_txtbox = page.locator('#userPassword');
    const login_btn = page.getByRole('button',{name:'Login'});
    await username_txtbox.fill('anshika@gmail.com');
    await password_txtbox.fill('Iamking@000');
    await login_btn.click();
    const product = page.locator('.card-body').getByText('zara coat 3');
    // const product = products.getByText('zara coat 3');
    const productCart = product.locator('xpath=/ancestor::*[@class="card-body"]').getByRole('button',{name:'Add To Cart'});
    // await expect(productName).toBeVisible();
    await productCart.click();
    const cart_btn = page.getByText('  Cart ', {exact:true});
    const orders_btn = page.getByText('  ORDERS', {exact:true});
    await cart_btn.click();
    const myCart = page.locator('.cart');
    await expect(myCart.getByText('zara coat 3')).toBeVisible();
    
    const checkOut_btn = page.getByRole('button',{name:'Checkout'});
    await checkOut_btn.click();
    const expiryMonth_combobox = page.getByRole('combobox').first();
    const expiryYear_combobox = page.getByRole('combobox').last();
    await expiryMonth_combobox.selectOption('03');
    await expiryYear_combobox.selectOption('04');
    const cvvCode_textbox = page.getByText('CVV code').locator('xpath=/parent::*').getByRole('textbox');
    await cvvCode_textbox.fill('123');
    const country_listbox = page.getByPlaceholder('Select Country');
    // await page.pause();
    await country_listbox.pressSequentially('ind',{delay:100});
    await country_listbox.locator('xpath=/following-sibling::*').getByText('India',{exact:true}).click();
    const placeOrder_btn = page.getByText('Place order');
    await placeOrder_btn.click();
    const orderSuccess = page.getByText('Thankyou for the order');
    await expect(orderSuccess).toBeVisible();

    const orderNumber = (await orderSuccess.locator('xpath=/ancestor::tbody').locator('label').last().textContent()).replace(/[/s|]+/g, '');
    // console.log(orderNumber.replace(/[/s|]+/g, ''));
    await orders_btn.click();
    const vieworder_btn = page.getByText(orderNumber).locator('xpath=/parent::*').getByRole('button',{name:'view'});
    await vieworder_btn.click();
});