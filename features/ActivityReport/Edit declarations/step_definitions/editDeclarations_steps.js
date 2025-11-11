const { Given, When, Then } = require('@cucumber/cucumber');
const testData = require('../../../../utils/data/testData');

Given('User has declared efforts', async function () {
    const fakeAR = testData.editDeclarations;
    await this.activityReportPage.alterActivityReportResult(fakeAR);
});

Then('Save button is disabled', async function () {
    await this.activityReportPage.verifySaveButtonIsDisabled();
})

Then('Save button is enabled', async function () {
    await this.activityReportPage.verifySaveButtonIsEnabled();
})

When('User edits declared effort of project number {string}', async function (index) {
    await this.activityReportPage.clickOnDeclaredEffortByIndexOnMonthlyView(index);
    await this.activityReportPage.selectEditDeclarationOption();
});

When('User modifies the effort to {string}', async function (value) {
    await this.activityReportPage.modifyDeclaredEffort(value);
});

When('User cancels edition', async function () {
    await this.activityReportPage.clickOnCancel();
});