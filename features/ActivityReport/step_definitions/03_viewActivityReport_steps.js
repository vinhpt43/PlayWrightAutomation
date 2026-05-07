const { Given, When, Then } = require('@cucumber/cucumber');
const testData = require('../../../utils/data/testData');
const { updateDateOfTrackingOfTestData } = require('../../../utils/settings/AdaptTestData');
Given('User has a full day PH', async function () {
    const fakeAR = testData.PHfullDay;
    updateDateOfTrackingOfTestData(fakeAR);
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has a PHO', async function () {
    const fakeAR = testData.PHO;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has a half day PH', async function () {
    const fakeAR = testData.PHhalfDay;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Given('User has a weekend', async function () {
    const fakeAR = testData.Weekend;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Then('The day appears as {string}', async function (label) {
    await this.activityReportPage.verifyDayHasCorrectLabel(label);
});

When('User hovers on declared effort number {string}', async function (index) {
    await this.activityReportPage.hoverOnDeclaredEffortByIndexOnMonthlyView(index);
});

Then('Status tooltip reads {string}', async function (status) {
    await this.activityReportPage.verifyTooltipStatusIsCorrect(status);
});

When('User hovers on rejected declarations icon', async function () {
    await this.activityReportPage.hoverOnHasRejectedDeclarationsIcon();
});

Then('Tooltip reads {string}', async function (message) {
    await this.activityReportPage.verifyGenericTooltipMessageIsCorrect(message);
});

Then('User cannot input effort', async function () {
    await this.activityReportPage.verifyDeclarationFieldNotExist();
});

Then('User can input effort', async function () {
    await this.activityReportPage.verifyDeclarationFieldExist();
});





