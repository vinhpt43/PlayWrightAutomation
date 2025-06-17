const { Page } = require('playwright');
const { StringHelper } = require('../../utils/Helpers/StringHelper');
const { expect } = require('@playwright/test');
const { DateHelper } = require('../../utils/Helpers/DateHelper');
const { CONFIG, ACTIVITYMANAGEMENTWRAPPER } = require('../../utils/data/setupData/constants');

class ActivityReportPage {
    constructor(page) {
        /** @type {Page} */
        this.page = page
        this.weekly_view = this.page.getByText('Weekly');
        this.month_view = this.page.getByText('Monthly');
        this.saveAsDraft_button = this.page.getByRole('button', { name: 'Save as draft' });
        this.sendForValidation_button = this.page.getByRole('button', { name: 'Send for validation' });
        this.activityReport_button = this.page.getByRole('button', { name: 'Activity report' });
        this.calendarHeader_thead = this.page.locator('xpath=//div[@class="flex column"]//thead/tr');
        this.dateOfAllDaysOnCalendar = '//div[@class="q-px-xs"]';
        this.dayCellsOfCurrentMonth_td = this.page.locator('xpath=//div[@class="flex column"]//tbody//td[./div[1][(./*)]][./div/div[2][./div[(./*)]]]');
        this.dateOfDayCellsOfCurrentMonth = this.dayCellsOfCurrentMonth_td.locator(this.dateOfAllDaysOnCalendar);
        this.weekRowsOnCalendar = this.page.locator('xpath=//div[@class="flex column"]//tbody/tr');
        this.headers = ["Project", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Total"];
    }

    async goToActivityReport() {
        const urlPart = CONFIG.ACTIVITYMANAGEMENTAPISERVER + ACTIVITYMANAGEMENTWRAPPER.ACTIVITYREPORT+'?';
        const responsePromise = this.page.waitForEvent('response', response =>
            response.url().includes(urlPart) && response.status() === 200
        );
        await this.page.goto(StringHelper.goToSinglePageApp('am'));
        await responsePromise;
    }

    async verifyWeeklyViewExist() {
        await expect(this.weekly_view).toBeVisible();
        await expect(this.month_view).toBeVisible();
        await expect(this.saveAsDraft_button).toBeVisible();
        await expect(this.sendForValidation_button).toBeVisible();
        await expect(this.activityReport_button).toBeVisible();
    }

    async verifyMonthlyCalendarIsCorrect() {
        await this.verifyCalendarHeaderIsCorrect();
        await this.verifyNumberOfDaysPresentInCurrentMonthIsCorrect();
        await this.verifyDatesAreSequencial();
        await this.verifyFirstDateIsCorrect();
    }

    async verifyCalendarHeaderIsCorrect() {
        for (let i = 0; i < this.headers.length; i++) {
            await expect(this.calendarHeader_thead.locator('th').nth(i)).toHaveText(this.headers[i])
        }
    }

    async verifyNumberOfDaysPresentInCurrentMonthIsCorrect() {
        expect(await this.dayCellsOfCurrentMonth_td.count()).toBe(DateHelper.getNumberOfDaysOfCurrentMonth());
    }

    async verifyDatesAreSequencial() {
        for (let i = 1; i < DateHelper.getNumberOfDaysOfCurrentMonth(); i++) {
            await expect(this.dateOfDayCellsOfCurrentMonth.nth(i - 1)).toHaveText(String(i).padStart(2, '0'));
        }
    }

    async verifyFirstDateIsCorrect() {
        const firstDayOfCurrentMonth = DateHelper.getDayOfADate(DateHelper.getFirstDayOfCurrentMonth());
        const index = this.headers.indexOf(firstDayOfCurrentMonth);
        const firstWeek = this.weekRowsOnCalendar.first();
        const firstDay = firstWeek.locator(this.dateOfAllDaysOnCalendar).nth(index - 1);
        await expect(firstDay).toHaveText('01');
    }
}

module.exports = { ActivityReportPage }