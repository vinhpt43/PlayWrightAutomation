const { Given, When, Then } = require('@cucumber/cucumber');
const testData = require('../../../../utils/data/testData');

Given('User has declared efforts', async function () {
    const fakeAR = testData.editDeclarations;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

When('User expands the projects list', async function () {
    await this.activityReportPage.expandProjectsList();
});

Then('Save button is disabled', async function () {
    await this.activityReportPage.verifySaveButtonIsDisabled();
})

Then('Save button is enabled', async function () {
    await this.activityReportPage.verifySaveButtonIsEnabled();
})

When('User edits declared effort number {string}', async function (index) {
    await this.activityReportPage.clickOnDeclaredEffortByIndexOnMonthlyView(index);
    await this.activityReportPage.selectEditDeclarationOption();
});

When('User modifies the effort to {string}', async function (value) {
    await this.activityReportPage.modifyDeclaredEffort(value);
});

When('User cancels edition', async function () {
    await this.activityReportPage.clickOnCancel();
});

When('User hovers on declared effort number {string}', async function (index) {
    await this.activityReportPage.hoverOnDeclaredEffortByIndexOnMonthlyView(index);
});

Then('Status tooltip reads {string}', async function (status) {
    await this.activityReportPage.verifyTooltipStatusIsCorrect(status);
})

When('User hovers on rejected declarations icon', async function () {
    await this.activityReportPage.hoverOnHasRejectedDeclarationsIcon();
});

Then('Tooltip reads {string}', async function (message) {
    await this.activityReportPage.verifyGenericTooltipMessageIsCorrect(message);
})