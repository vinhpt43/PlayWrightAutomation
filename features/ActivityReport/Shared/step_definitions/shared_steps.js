const { Given, When, Then } = require('@cucumber/cucumber');
const testData = require('../../../../utils/data/testData');

Given('User is consultant', async function () {
    await this.guardian.impersonate(this.userRoles.CONSULTANT);
});

When('User is on Activity Report page', async function () {
    await this.activityReportPage.goToActivityReport();
});

Given('User is manager', async function () {
    await this.guardian.impersonate(this.userRoles.MAINMANAGER);
});

Then('Input has tooltip message {string}', async function (message) {
    await this.activityReportPage.verifyTooltipErrorMessageIsCorrect(message);
});

Then('Input has no tooltip', async function () {
    await this.activityReportPage.verifyTooltipErrorMessageNotExist();
});