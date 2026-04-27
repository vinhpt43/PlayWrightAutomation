const { Commonpage } = require('./Commonpage');
const { Page } = require('playwright');
const { StringHelper } = require('../../utils/Helpers/StringHelper');
const { expect } = require('@playwright/test');
const { DateHelper } = require('../../utils/Helpers/DateHelper');
const { CONFIG, ACTIVITYMANAGEMENTWRAPPER } = require('../../utils/data/setupData/constants');
const ignoreAppAnnouncement = require('../../utils/data/setupData/ignoreAppAnnouncement.json');
const ignoreExpressYourself = require('../../utils/data/setupData/ignoreExpressYourself.json');

class ActivityReportPage extends Commonpage {
    constructor(page) {
        /** @type {Page} */
        super(page);
        //#region Locators

        //#region Buttons
        this.saveAsDraft_button = this.page.getByRole('button', { name: 'Save as draft' });
        this.sendForValidation_button = this.page.getByRole('button', { name: 'Send for validation' });
        this.declareOnBehalf_button = this.page.getByRole('button', { name: 'Declare on behalf' });
        this.activityReport_button = this.page.getByRole('button', { name: 'Activity report' });
        this.save_button = this.page.getByRole('button', { name: 'Save', exact: true });
        this.cancel_button = this.page.getByRole('button', { name: 'Cancel' });
        this.weekly_view = this.page.getByText('Weekly');
        this.month_view = this.page.getByText('Monthly');
        this.editDeclaration_option = this.page.getByText('Edit declaration');
        this.declarationsHistory_option = this.page.getByText('Declarations history');
        this.comment_option = this.page.getByText('Comment');
        this.delete_option = this.page.getByText('Delete');
        this.OtherActivityTypes_combobox = this.page.getByRole('combobox', { name: 'Activity Type', exact: true });
        this.OtherActivityTypes_list = this.page.getByRole('listbox');
        this.add_button = this.page.getByRole('button', { name: 'Add', exact: true });
        this.addActivity_button = this.page.getByRole('button', { name: 'Add Activity', exact: true });
        //#endregion Buttons

        //#region Tables
        this.dataTableMonthlyView = this.page.locator('xpath=//div[@class="flex gap-4 column m-t-4"]/div[2]');
        this.dataTableWeeklyView = this.page.locator('xpath=//div[@class="flex gap-4 column m-t-4"]/div[3]');
        this.calendarHeader_thead = this.page.locator('xpath=//div[@class="flex column"]//thead/tr');
        this.dateOfAllDaysOnCalendar_xpath = '//div[@class="q-px-xs"]';
        this.weekRowsOnCalendar = this.page.locator('xpath=//div[@class="flex column"]//tbody/tr');
        this.dayCellsOfCurrentMonth_td = this.page.locator('xpath=//div[@class="flex column"]//tbody//td[./div[1][(./*)]][./div/div[2][./div[(./*)]]]');
        this.dateOfDayCellsOfCurrentMonth = this.dayCellsOfCurrentMonth_td.locator(this.dateOfAllDaysOnCalendar_xpath);

        this.addOtherActivities_button_xpath = '//button//i[@class="q-icon"]';
        this.addOtherActivities_button = this.dayCellsOfCurrentMonth_td.locator(this.addOtherActivities_button_xpath);

        this.ICOrows_xpath = '//div[contains(@class,"ico")]';
        this.ICOrows = this.page.locator('xpath=' + this.ICOrows_xpath);

        this.projectsGroupOfDayCellsOfCurrentMonth_xpath = '//div[contains(@class,"column items-center")]';
        this.projectsGroupOfDayCellsOfCurrentMonth = this.dayCellsOfCurrentMonth_td.locator('xpath=' + this.projectsGroupOfDayCellsOfCurrentMonth_xpath);

        this.projectsOfDayCellsOfCurrentMonth_xpath = '/div[not(@class="text-bold")]'
        this.projectsOfDayCellsOfCurrentMonth = this.projectsGroupOfDayCellsOfCurrentMonth.locator('xpath=' + this.projectsOfDayCellsOfCurrentMonth_xpath);

        this.dayCellsWithOFF = this.projectsGroupOfDayCellsOfCurrentMonth.locator('xpath=/div[@class="text-bold"]');

        this.declaredEffort_xpath = '/div/div[2]//span';
        this.declaredEffort = this.dayCellsOfCurrentMonth_td.locator('xpath=' + this.declaredEffort_xpath);

        this.totalPerDay_xpath = '/div/div[3]';
        this.totalPerDay = this.dayCellsOfCurrentMonth_td.locator('xpath=' + this.totalPerDay_xpath);

        this.expandProjectsList_button_xpath = 'td[1]//button//i[@class="q-icon"]';
        this.expandProjectsList_button = this.weekRowsOnCalendar.locator('xpath=' + this.expandProjectsList_button_xpath);

        this.hasRejectedDeclarations_icon = this.page.locator('i[class="q-icon text-red"]');
        //#endregion Tables

        //#region Inputs
        this.declarationFieldsMonthlyView = this.dataTableMonthlyView.getByRole('textbox');
        this.declarationFieldsWeeklyView = this.dataTableWeeklyView.getByRole('textbox');
        this.declaredEffortEditField = this.page.getByText('Declared effort').locator('xpath=/following-sibling::label//input');
        //#endregion Inputs

        //#region Tooltips
        this.inputTooltipErrorMessage = this.page.locator('div[role="tooltip"].bg-red');
        this.tooltipStatus = this.page.locator('div[role="tooltip"][style*="background-color"]');
        this.genericTooltip = this.page.locator('div[role="tooltip"]:not([style*="background-color"]):not(.bg-red)');
        //#endregion Tooltips

        //#region Forms
        this.addOtherActivitiesForm = this.page.getByText('Add Other Activities').locator('xpath=//ancestor::div[contains(@id,"q-portal--dialog")]');
        //#endregion Forms

        //#endregion Locators

        //#region Constants
        this.headers = ["Project", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Total"];
        this.noData_text = "You are currently not assigned to a project. Please check with your manager";
        //#endregion Constants
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

        //Ignore express yourself survey
        await this.ignoreExpressYourself();

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

    async ignoreExpressYourself() {
        const url = StringHelper.baseURL() + CONFIG.ACTIVITYMANAGEMENTAPISERVER + '/expressYourself/*';
        this.alterAPIresponse(url, ignoreExpressYourself);
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
                        // TO DO: CHECK IF PROJECT LIST IS EXPANDABLE AND FIND ICO AGAIN
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

    async inputDeclarationByIndexOnMonthlyView(index, value) {
        await this.declarationFieldsMonthlyView.nth(index - 1).fill(value);
    }

    async expandProjectsList() {
        await this.expandProjectsList_button.click();
    }

    async clickOnDeclaredEffortByIndexOnMonthlyView(index) {
        await this.declaredEffort.nth(index - 1).click();
    }

    async hoverOnDeclaredEffortByIndexOnMonthlyView(index) {
        await this.declaredEffort.nth(index - 1).hover();
    }

    async hoverOnHasRejectedDeclarationsIcon() {
        await this.hasRejectedDeclarations_icon.hover();
    }

    async selectEditDeclarationOption() {
        await this.editDeclaration_option.click();
    }

    async selectDeclarationsHistoryOption() {
        await this.declarationsHistory_option.click();
    }

    async selectCommentOption() {
        await this.comment_option.click();
    }

    async selectDeleteOption() {
        await this.delete_option.click();
    }

    async modifyDeclaredEffort(newValue) {
        await this.declaredEffortEditField.fill(newValue);
    }

    async clickOnSaveAsDraft() {
        await this.saveAsDraft_button.click();
    }

    async clickOnSendForValidation() {
        await this.sendForValidation_button.click();
    }

    async clickOnSave() {
        await this.save_button.click();
    }

    async clickOnCancel() {
        await this.cancel_button.click();
    }

    async openAddOtherActivitiesForm() {
        await this.dayCellsOfCurrentMonth_td.hover();
        await this.addOtherActivities_button.click();
    }

    async addEffortForAnActivity(activityType, effort) {
        if (await this.addActivity_button.isEnabled()) {
            this.addActivity_button.click();
        }
        await this.OtherActivityTypes_combobox.click();
        await this.OtherActivityTypes_list.getByText(activityType).click();
        await this.addOtherActivitiesForm.locator('button:has(i.q-icon:has-text("check"))').first().click();
        await this.addOtherActivitiesForm.getByRole('row', { name: activityType }).getByRole('textbox').fill(effort.toString());
    }

    async changeEffortForAnActivity(activityType, effort) {
        await this.addOtherActivitiesForm.getByRole('row', { name: activityType }).getByRole('textbox').fill(effort.toString());
    }

    async clickOnAddButtonInOtherActivitiesForm() {
        await this.add_button.click();
    }
    // #endregion Unit actions

    // #region Integrated actions

    // #endregion Integrated actions

    // #endregion Actions

    // #region Verifications

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

    async verifySubmitButtonsAreDisabled(isManager = false) {
        if (!isManager) {
            await expect(this.saveAsDraft_button).toBeDisabled();
        }
        await expect(this.sendForValidation_button).toBeDisabled();
    }

    async verifySaveButtonIsDisabled() {
        await expect(this.save_button).toBeDisabled();
    }

    async verifySaveButtonIsEnabled() {
        await expect(this.save_button).toBeEnabled();
    }

    async verifyTooltipErrorMessageIsCorrect(message) {
        await expect(this.inputTooltipErrorMessage).toHaveCount(1);
        await expect(this.inputTooltipErrorMessage).toHaveText(message);
    }

    async verifyTooltipErrorMessageNotExist() {
        await expect(this.inputTooltipErrorMessage).not.toBeAttached();
    }

    async verifyTooltipStatusIsCorrect(status) {
        await expect(this.tooltipStatus).toHaveCount(1);
        await expect(this.tooltipStatus).toHaveText(status);
    }

    async verifyGenericTooltipMessageIsCorrect(message) {
        await expect(this.genericTooltip).toHaveCount(1);
        await expect(this.genericTooltip).toHaveText(message);
    }

    async verifyTotalPerDayIsCorrect(manDay, manHour) {
        if (manDay !== null) {
            await expect(this.totalPerDay).toContainText(manDay + ' MD');
        }
        if (manHour !== null) {
            await expect(this.totalPerDay).toContainText(manHour + ' MH');
        }
    }

    async verifyAddOtherActivitiesFormAppears() {
        await expect(this.addOtherActivitiesForm).toBeAttached();
    }

    async verifyAddButtonOnOtherActivitiesFormIsEnabled() {
        await expect(this.add_button).toBeEnabled();
    }

    async verifyAddButtonOnOtherActivitiesFormIsDisabled() {
        await expect(this.add_button).toBeDisabled();
    }

    async verifySelectedActivityIsExcludedFromTheList(activityType) {
        if (await this.addActivity_button.isEnabled()) {
            this.addActivity_button.click();
        }
        await this.OtherActivityTypes_combobox.click();
        await this.OtherActivityTypes_list.getByText(activityType).click();
        // expect (count).toBe(0);
        // await this.page.waitForSelector(this.OtherActivityTypes_list.getByText(activityType),{state: 'detached'});
        await this.OtherActivityTypes_combobox.click();
    }
    // #endregion Unit verifications

    // #region Integrated verifications

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

    // #endregion Integrated verifications

    // #endregion Verifications
}

module.exports = { ActivityReportPage }