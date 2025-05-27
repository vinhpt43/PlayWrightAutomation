const {test} = require ('@playwright/test');

test("handle Java popup", async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // page.on('dialog',dialog => dialog.accept());
    // const confirm_btn = page.getByRole('button',{name:'Confirm'});
    // await confirm_btn.click();
    const iframe = page.frame('iframe-name');
    const Practice_tab = iframe.getByRole('link',{name:'All Access plan'});
    await Practice_tab.click();
    const numberOfSubscribers = await iframe.getByText(' Happy Subscibers!').locator('span').textContent();
    console.log(numberOfSubscribers);
});