const {test, expect} = require('@playwright/test');

test('Calendar picker',async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const deliveryDate_calendar = page.getByText('Delivery Date').locator('xpath=/following-sibling::*');
    const day = '3';
    const month = '6';
    const year = '1992';
    const calendar_year = deliveryDate_calendar.getByRole('spinbutton').and(deliveryDate_calendar.locator('[name="year"]'));
    const calendar_month = deliveryDate_calendar.getByRole('spinbutton').and(deliveryDate_calendar.locator('[name="month"]'));
    const calendar_day = deliveryDate_calendar.getByRole('spinbutton').and(deliveryDate_calendar.locator('[name="day"]'));
    calendar_year.fill(year);
    calendar_month.fill(month);
    calendar_day.fill(day);
});