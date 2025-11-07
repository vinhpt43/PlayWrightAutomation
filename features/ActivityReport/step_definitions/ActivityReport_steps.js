const { Given, When, Then } = require('@cucumber/cucumber');
const testData = require('../../../utils/data/testData');

Given('User is consultant', async function () {
    await this.guardian.impersonate(this.userRoles.CONSULTANT);
});

When('User is on Activity Report page', async function () {
    await this.activityReportPage.goToActivityReport();
});

Then('User sees common view of managee', async function () {
    await this.activityReportPage.verifyCommonViewIsCorrect();
});

Then('User sees Activity Report data in Monthly view', async function () {

    await this.activityReportPage.verifyMonthlyCalendarIsCorrect();
});

Given('User is manager', async function () {
    await this.guardian.impersonate(this.userRoles.MAINMANAGER);
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

Given('User has declared efforts', async function () {
    const fakeAR = testData.editDeclarations;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Then('Submit buttons are disabled', async function () {
    await this.activityReportPage.verifySubmitButtonsAreDisabled();
})

Then('Submit buttons are enabled', async function () {
    await this.activityReportPage.verifySubmitButtonsAreEnabled();
})

Then('Save button is disabled', async function () {
    await this.activityReportPage.verifySaveEditionButtonIsDisabled();
})

Then('Save button is enabled', async function () {
    await this.activityReportPage.verifySaveEditionButtonIsEnabled();
})

When('User inputs {string} in project number {string}', async function (value, index) {
    await this.activityReportPage.inputDeclarationByIndexOnMonthlyView(index, value);
});

When('User edits {string} in project number {string}', async function (value, index) {
    await this.activityReportPage.clickOnDeclaredEffortByIndexOnMonthlyView(index);
	await this.activityReportPage.selectEditDeclarationOption();
	await this.activityReportPage.modifyDeclaredEffort(value);
});

Then('Input has tooltip message {string}', async function (message) {
    await this.activityReportPage.verifyInputTooltipErrorMessageIsCorrect(message);
});

Then('Input has no tooltip', async function () {
    await this.activityReportPage.verifyTooltipErrorMessageNotExist();
});
