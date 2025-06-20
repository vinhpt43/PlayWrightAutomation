const { Commonpage } = require('./Commonpage');
const { Page } = require('playwright');
const { StringHelper } = require('../../utils/Helpers/StringHelper');
const { expect } = require('@playwright/test');
const { DateHelper } = require('../../utils/Helpers/DateHelper');
const { CONFIG, ACTIVITYMANAGEMENTWRAPPER } = require('../../utils/data/setupData/constants');

class ActivityReportPage extends Commonpage{
    constructor(page) {
        /** @type {Page} */
        super(page);
        //#region locators

        //#region button
        this.weekly_view = this.page.getByText('Weekly');
        this.month_view = this.page.getByText('Monthly');
        this.saveAsDraft_button = this.page.getByRole('button', { name: 'Save as draft' });
        this.sendForValidation_button = this.page.getByRole('button', { name: 'Send for validation' });
        this.declareOnBehalf_button = this.page.getByRole('button', { name: 'Declare on behalf' });
        this.activityReport_button = this.page.getByRole('button', { name: 'Activity report' });
        //#endregion

        //#region tables
        this.calendarHeader_thead = this.page.locator('xpath=//div[@class="flex column"]//thead/tr');
        this.dateOfAllDaysOnCalendar = '//div[@class="q-px-xs"]';
        this.dayCellsOfCurrentMonth_td = this.page.locator('xpath=//div[@class="flex column"]//tbody//td[./div[1][(./*)]][./div/div[2][./div[(./*)]]]');
        this.dateOfDayCellsOfCurrentMonth = this.dayCellsOfCurrentMonth_td.locator(this.dateOfAllDaysOnCalendar);
        this.weekRowsOnCalendar = this.page.locator('xpath=//div[@class="flex column"]//tbody/tr');
        this.dataTableMonthlyView = this.page.locator('xpath=//div[@class="flex gap-4 column m-t-4"]/div[2]');
        this.dataTableWeeklyView = this.page.locator('xpath=//div[@class="flex gap-4 column m-t-4"]/div[3]');
        //#endregion
        
        //#endregion

        //#region Constants
        this.headers = ["Project", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Total"];
        this.noData_text = "You are currently not assigned to a project. Please check with your manager";
        //#endregion
    }

    // #region Actions

    // #region Unit actions
    async goToActivityReport() {
        const urlPart = CONFIG.ACTIVITYMANAGEMENTAPISERVER + ACTIVITYMANAGEMENTWRAPPER.ACTIVITYREPORT + '?';
        const responsePromise = this.page.waitForEvent('response', response =>
            response.url().includes(urlPart) && response.status() === 200
        );
        await this.page.goto(StringHelper.goToSinglePageApp('am'));
        //Wait for activity report loads successfully
        await responsePromise;
    }

    async alterActivityReportResult(alteredResponse) {
        const urlPart = StringHelper.baseURL() + CONFIG.ACTIVITYMANAGEMENTAPISERVER + ACTIVITYMANAGEMENTWRAPPER.ACTIVITYREPORT + '?employeeId=*';
        this.alterAPIresponse(urlPart,alteredResponse);
    }
    // #endregion

    // #region Integrated actions

    // #endregion

    // #endregion

    // #region Verification

    // #region Unit verifications

    async verifyCommonComponentsExist() {
        await expect(this.saveAsDraft_button).toBeVisible();
        await expect(this.sendForValidation_button).toBeVisible();
        await expect(this.weekly_view).toBeVisible();
        await expect(this.month_view).toBeVisible();
        await expect(this.activityReport_button).toBeVisible();
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

    // #endregion

    // #region Integrated verification

    async verifyCommonViewIsCorrect(isManager = false) {
        await this.verifyCommonComponentsExist();
        if (isManager) { await expect(this.declareOnBehalf_button).toBeVisible() }
        else {
            await expect(this.declareOnBehalf_button).toBeHidden();
        }
    }

    async verifyMonthlyCalendarIsCorrect(hasData = true) {
        if (hasData) {
            await this.verifyCalendarHeaderIsCorrect();
            await this.verifyNumberOfDaysPresentInCurrentMonthIsCorrect();
            await this.verifyDatesAreSequencial();
            await this.verifyFirstDateIsCorrect();
        }
        else { await expect(this.dataTableMonthlyView).toHaveText(this.noData_text); }
    }

    // #endregion

    // #endregion
}

module.exports = { ActivityReportPage }