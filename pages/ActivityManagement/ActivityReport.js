const { Commonpage } = require('./Commonpage');
const { Page } = require('playwright');
const { StringHelper } = require('../../utils/Helpers/StringHelper');
const { expect } = require('@playwright/test');
const { DateHelper } = require('../../utils/Helpers/DateHelper');
const { CONFIG, ACTIVITYMANAGEMENTWRAPPER } = require('../../utils/data/setupData/constants');
const  ignoreAppAnnouncement  = require('../../utils/data/setupData/ignoreAppAnnouncement.json');

class ActivityReportPage extends Commonpage {
    constructor(page) {
        /** @type {Page} */
        super(page);
        //#region Locators

        //#region Button
        this.weekly_view = this.page.getByText('Weekly');
        this.month_view = this.page.getByText('Monthly');
        this.saveAsDraft_button = this.page.getByRole('button', { name: 'Save as draft' });
        this.sendForValidation_button = this.page.getByRole('button', { name: 'Send for validation' });
        this.declareOnBehalf_button = this.page.getByRole('button', { name: 'Declare on behalf' });
        this.activityReport_button = this.page.getByRole('button', { name: 'Activity report' });
        //#endregion

        //#region Tables
        this.dataTableMonthlyView = this.page.locator('xpath=//div[@class="flex gap-4 column m-t-4"]/div[2]');
        this.dataTableWeeklyView = this.page.locator('xpath=//div[@class="flex gap-4 column m-t-4"]/div[3]');
        this.calendarHeader_thead = this.page.locator('xpath=//div[@class="flex column"]//thead/tr');
        this.dateOfAllDaysOnCalendar_xpath = '//div[@class="q-px-xs"]';
        this.weekRowsOnCalendar = this.page.locator('xpath=//div[@class="flex column"]//tbody/tr');
        this.dayCellsOfCurrentMonth_td = this.page.locator('xpath=//div[@class="flex column"]//tbody//td[./div[1][(./*)]][./div/div[2][./div[(./*)]]]');
        this.dateOfDayCellsOfCurrentMonth = this.dayCellsOfCurrentMonth_td.locator(this.dateOfAllDaysOnCalendar_xpath);

        this.ICOrows_xpath = '//div[contains(@class,"ico")]';
        this.ICOrows = this.page.locator('xpath=' + this.ICOrows_xpath);

        this.projectsGroupOfDayCellsOfCurrentMonth_xpath = '//div[contains(@class,"column items-center")]';
        this.projectsGroupOfDayCellsOfCurrentMonth = this.dayCellsOfCurrentMonth_td.locator('xpath=' + this.projectsGroupOfDayCellsOfCurrentMonth_xpath);

        this.projectsOfDayCellsOfCurrentMonth_xpath = '/div[not(@class="text-bold")]'
        this.projectsOfDayCellsOfCurrentMonth = this.projectsGroupOfDayCellsOfCurrentMonth.locator('xpath=' + this.projectsOfDayCellsOfCurrentMonth_xpath);

        this.dayCellsWithOFF = this.projectsGroupOfDayCellsOfCurrentMonth.locator('xpath=/div[@class="text-bold"]');
        //#endregion

        //#region Input
        this.declarationFieldsMonthlyView = this.dataTableMonthlyView.getByRole('textbox');
        this.declarationFieldsWeeklyView = this.dataTableWeeklyView.getByRole('textbox');
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

        //Ignore app announcement
        await this.ignoreAppAnnouncement();

        //Go to AM
        await this.page.goto(StringHelper.goToSinglePageApp('am'));

        //Wait for activity report loads successfully
        await responsePromise;
    }

    async alterActivityReportResult(alteredResponse) {
        const url = StringHelper.baseURL() + CONFIG.ACTIVITYMANAGEMENTAPISERVER + ACTIVITYMANAGEMENTWRAPPER.ACTIVITYREPORT + '?employeeId=*';
        this.alterAPIresponse(url, alteredResponse);
    }

    async ignoreAppAnnouncement() {
        const url = StringHelper.baseURL() + '/messageHub-api/api/v1.0/public/app-announcements?*';
        this.alterAPIresponse(url, ignoreAppAnnouncement);
    }

    async inputFirstICOField() {
        // gets all weeks on the calendar
        const weeks = this.weekRowsOnCalendar;
        await this.dataTableMonthlyView.waitFor();
        try {
            const weeksCount = await weeks.count();
            if (weeksCount === 0) {
                throw new Error("The employee has nothing to declare");
            }
            // loop through each week
            for (let i = 0; i <= weeksCount; i++) {
                // locate the ICO in the week
                try {
                    if (i === weeksCount) {
                        let error = new Error("The employee has no ICO to declare");
                        error.isFinal = true;
                        throw error;
                    }
                    const ICOrow = this.weekRowsOnCalendar.nth(i).locator(this.ICOrows_xpath);
                    const icoCount = await ICOrow.count();
                    if (icoCount === 0) {
                        continue;
                    }
                    else {
                        const ICOrowIndex = await ICOrow.evaluate(el => {
                            // Get all children of the parent
                            const siblings = Array.from(el.parentNode.children);
                            // Find the index of the current element among all siblings
                            return siblings.indexOf(el);
                        });
                        // come back to the tr node of the week
                        const theWeek = ICOrow.locator('xpath=/ancestor::tr');
                        // locate the day cell
                        const days = theWeek.locator(this.projectsGroupOfDayCellsOfCurrentMonth_xpath);

                        const daysCount = await days.count();
                        // loop through each day
                        for (let j = 0; j <= daysCount; j++) {
                            try {
                                const targetInput = days.nth(j).locator('xpath=/div').nth(ICOrowIndex).getByRole('textbox');
                                const targetInputCount = await targetInput.count();
                                if (i === weeksCount - 1 && j === daysCount) {
                                    let error = new Error("ICO has no empty fields to declare");
                                    error.isFinal = true;
                                    throw error;
                                }
                                if (targetInputCount === 0) {
                                    continue;
                                }
                                else {
                                    await targetInput.first().fill('0'); // Fill and exit
                                    return; // Exit the function
                                }
                            }
                            catch (error) { throw error; }
                        }
                    }
                }
                catch (error) {
                    if (error.isFinal) {
                        throw error;
                    }
                    else {
                        console.error("Error: " + error.message); continue;
                    }
                }
            }
        }
        catch (error) { throw error }
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
        const firstDay = firstWeek.locator(this.dateOfAllDaysOnCalendar_xpath).nth(index - 1);
        await expect(firstDay).toHaveText('01');
    }

    async verifySubmitButtonsAreEnabled(isManager = false) {
        if (!isManager) {
            await expect(this.saveAsDraft_button).toBeEnabled();
        }
        await expect(this.sendForValidation_button).toBeEnabled();
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