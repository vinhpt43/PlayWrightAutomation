const { Given, When, Then } = require('@cucumber/cucumber');
const playwrightConfig = require('../../../playwright.config');

Given('User is consultant', async function () {
    await this.guardian.impersonate(this.personaData.consultant);
});

When('User is on Activity Report page', async function () {
    await this.activityReportPage.goToActivityReport();
});

Then('User sees Activity Report in Monthly view', async function () {
    await this.activityReportPage.verifyMonthlyCalendarIsCorrect();
});

Given('User is manager', async function () {
    await this.guardian.impersonate(this.personaData.mainManager);
});