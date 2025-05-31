const { test, expect } = require('../../utils/settings/customFixture');
const testData = require('../../utils/data/testData');

test.only('route API response', async ({ guardian, personaData, activityReportPage }) => {
	await guardian.impersonate(personaData.mainManager);
	const fakeAR2 = testData.activityReportData1;
	await activityReportPage.page.route(
		"https://inte.mantu.com/activitymanagement-api/api/v1.0/activityreport?employeeId=*",
		async route => {
			const response = await activityReportPage.page.request.fetch(route.request());
			let body = JSON.stringify(fakeAR2);
			route.fulfill({ response, body });
		}
	);

	await activityReportPage.goToActivityReport();
	await activityReportPage.page.pause();
});

test('use ActivityMangementAPI', async ({ guardian, personaData, activityManagementAPI }) => {
	await guardian.impersonate(personaData.consultant);
	await activityManagementAPI.getActivityReport(23845, '2025-05-01', '2025-05-07');
});


test('Verify the calendar on Monthly view is correct', async ({ activityReportPage, guardian, personaData }) => {
	await guardian.impersonate(personaData.consultant);
	await activityReportPage.goToActivityReport();
	await activityReportPage.verifyMonthlyCalendarIsCorrect();
});