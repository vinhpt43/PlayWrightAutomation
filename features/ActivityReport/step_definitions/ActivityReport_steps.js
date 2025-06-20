const { Given, When, Then } = require('@cucumber/cucumber');

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