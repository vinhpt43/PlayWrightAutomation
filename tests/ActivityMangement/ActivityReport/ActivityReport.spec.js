const { test } = require('../../../utils/settings/customFixture');
const testData = require('../../../utils/data/testData');

test.only('route API response', async ({ guardian, activityReportPage, userRoles }) => {
	await guardian.impersonate(userRoles.CONSULTANT);
	const fakeAR2 = testData.activityReportData2;
	await activityReportPage.alterActivityReportResult(fakeAR2);
	await activityReportPage.goToActivityReport();
	await activityReportPage.page.pause();
});

// test('use ActivityMangementAPI', async ({ guardian, activityManagementAPI, userRoles }) => {
// 	await guardian.impersonate(userRoles.CONSULTANT);
// 	await activityManagementAPI.getActivityReport(23845, '2025-05-01', '2025-05-07');
// });


// test('Verify the calendar on Monthly view is correct', async ({ activityReportPage, guardian, userRoles }) => {
// 	await guardian.impersonate(userRoles.CONSULTANT);
// 	await activityReportPage.goToActivityReport();
// 	await activityReportPage.verifyMonthlyCalendarIsCorrect();
// });

test.describe('Activity Report', async () => {
	test('Verify default view is correct for consultant who has project', async ({ activityReportPage, guardian, userRoles }) => {
		await test.step('Given user is consultant', async () => {
			await guardian.impersonate(userRoles.CONSULTANT);
		});
		await test.step('When user is on Activity Report page', async () => {
			await activityReportPage.goToActivityReport();
		});
		await test.step('Then user sees Activity Report in Monthly view', async () => {
			await activityReportPage.verifyMonthlyCalendarIsCorrect(true);
		});
	});
});