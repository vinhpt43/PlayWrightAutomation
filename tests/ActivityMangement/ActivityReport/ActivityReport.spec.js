const { test } = require('../../../utils/settings/customFixture');
const testData = require('../../../utils/data/testData');
const { DateHelper } = require('../../../utils/Helpers/DateHelper');

// test.only('route API response', async ({ guardian, activityReportPage, userRoles }) => {
// 	await guardian.impersonate(userRoles.CONSULTANT.name);
// 	const fakeAR2 = testData.activityReportData2;
// 	await activityReportPage.alterActivityReportResult(fakeAR2);
// 	await activityReportPage.goToActivityReport();
// 	await activityReportPage.page.pause();
// });

// test('use ActivityMangementAPI', async ({ guardian, activityManagementAPI, userRoles }) => {
// 	await guardian.impersonate(userRoles.CONSULTANT.name);
// 	console.log(await activityManagementAPI.getActivityReport(userRoles.CONSULTANT.id, DateHelper.getFirstDayOfCurrentMonth(), DateHelper.getLastDayOfCurrentMonth()));
// });


// test('Verify the calendar on Monthly view is correct', async ({ activityReportPage, guardian, userRoles }) => {
// 	await guardian.impersonate(userRoles.CONSULTANT.name);
// 	await activityReportPage.goToActivityReport();
// 	await activityReportPage.verifyMonthlyCalendarIsCorrect();
// });

test.describe('Activity Report', async () => {
	test('Verify default view is correct for consultant who has project', async ({ activityReportPage, guardian, userRoles }) => {
		await test.step('Given user is consultant', async () => {
			await guardian.impersonate(userRoles.CONSULTANT.name);
		});
		await test.step('When user is on Activity Report page', async () => {
			await activityReportPage.goToActivityReport();
		});
		// await test.step('Then user sees Activity Report in Monthly view', async () => {
		// 	await activityReportPage.verifyMonthlyCalendarIsCorrect(true);
		// });
		await test.step('And user input first field', async () => {
				await activityReportPage.inputFirstICOField();
				// await activityReportPage.page.pause();
		});
		await test.step('Then submit buttons are enabled', async () => {
			await activityReportPage.verifySubmitButtonsAreEnabled();
			console.log(DateHelper.getLastDayOfCurrentMonth());
			console.log(DateHelper.getNumberOfDaysOfCurrentMonth());
		});
	});
});