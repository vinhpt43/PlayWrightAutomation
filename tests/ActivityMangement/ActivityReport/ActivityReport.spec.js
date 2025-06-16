const { test } = require('../../../utils/settings/customFixture');
const testData = require('../../../utils/data/testData');

// test.only('route API response', async ({ guardian, activityReportPage, userRoles }) => {
// 	await guardian.impersonate(userRoles.CONSULTANT);
// 	const fakeAR2 = testData.activityReportData1;
// 	await activityReportPage.page.route(
// 		"https://inte.mantu.com/activitymanagement-api/api/v1.0/activityreport?employeeId=*",
// 		async route => {
// 			const response = await activityReportPage.page.request.fetch(route.request());
// 			let body = JSON.stringify(fakeAR2);
// 			route.fulfill({ response, body });
// 		}
// 	);
// 	await activityReportPage.goToActivityReport();
// 	await activityReportPage.page.pause();
// });

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
	test('Verify the calendar on Monthly view is correct', async ({ activityReportPage, guardian, userRoles }) => {
		await test.step('Given user is consultant', async () => {
			await guardian.impersonate(userRoles.CONSULTANT);
		});
		await test.step('When user is on Activity Report page', async () => {
			await activityReportPage.goToActivityReport();
		});
		await test.step('Then user sees Activity Report in Monthly view', async () => {
			await activityReportPage.verifyMonthlyCalendarIsCorrect();
		});
	});
});