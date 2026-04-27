const { Given, When, Then } = require('@cucumber/cucumber');
const testData = require('../../../../utils/data/testData');

Then('User sees common view of managee', async function () {
    await this.activityReportPage.verifyCommonViewIsCorrect();
});

Then('User sees Activity Report data in Monthly view', async function () {

    await this.activityReportPage.verifyMonthlyCalendarIsCorrect();
});

Then('User sees common view of manager', async function () {
    await this.activityReportPage.verifyCommonViewIsCorrect(isManager = true);
});

Then('User sees no Activity Report data in Monthly view', async function () {
    await this.activityReportPage.verifyMonthlyCalendarIsCorrect(hasData = false);
});

Given('User has only one MD project', async function () {
    const fakeAR = testData.oneMDproject;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has only one MH project', async function () {
    const fakeAR = testData.oneMHproject;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has two MD projects', async function () {
    const fakeAR = testData.twoMDprojects;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has two MH projects', async function () {
    const fakeAR = testData.twoMHprojects;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has one MD and one MH projects', async function () {
    const fakeAR = testData.oneMDoneMHprojects;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has one MD project with ICO', async function () {
    const fakeAR = testData.oneMDprojectWithICO;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Then('Submit buttons are disabled', async function () {
    await this.activityReportPage.verifySubmitButtonsAreDisabled();
})

Then('Submit buttons are enabled', async function () {
    await this.activityReportPage.verifySubmitButtonsAreEnabled();
})

When('User inputs {string} in project number {string}', async function (value, index) {
    await this.activityReportPage.inputDeclarationByIndexOnMonthlyView(index, value);
});

When('User clicks on Add Other Activities button', async function () {
    await this.activityReportPage.openAddOtherActivitiesForm();
})

Then('Add Other Activities form appears', async function () {
    await this.activityReportPage.verifyAddOtherActivitiesFormAppears();
})

When('User adds {string} MH for {string}', async function (effort, activityType) {
    await this.activityReportPage.addEffortForAnActivity(activityType, effort);
});

When('User changes effort to {string} MH for {string}', async function (effort, activityType) {
    await this.activityReportPage.changeEffortForAnActivity(activityType, effort);
});

Then('Add button is enabled in Other Activities modal', async function () {
    await this.activityReportPage.verifyAddButtonOnOtherActivitiesFormIsEnabled();
});

Then('Add button is disabled in Other Activities modal', async function () {
    await this.activityReportPage.verifyAddButtonOnOtherActivitiesFormIsDisabled();
});

Then('Type {string} is not found in Activity Type anymore', async function (activityType) {
    await this.activityReportPage.verifySelectedActivityIsExcludedFromTheList(activityType);
});