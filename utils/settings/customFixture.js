const { test: base } = require('@playwright/test');
const { GuardianAPI } = require('../API/GuardianAPI');
const { StringHelper } = require('../Helpers/StringHelper');
const { USER_ROLES } = require('../data/setupData/constants');
const { ActivityReportPage, ValidationPage } = require('../../pages/ActivityManagement');
const { ActivityManagementAPI } = require('../API/ActivityManagementAPI');

exports.test = base.extend({
  guardian: async ({ }, use) => {
    const guardian = await (new GuardianAPI()).init();
    await use(guardian);
    // await guardian.revert();
  },
  userRoles: async ({ }, use) => {
    await use(USER_ROLES);
  },
  StringHelper: async ({ }, use) => {
    await use(StringHelper);
  },
  pageWithContext: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'session.json' });
    const page = await context.newPage();
    await use(page);
    await page.close();
    await context.close();
  },
  activityReportPage: async ({ pageWithContext }, use) => {
    const activityReportPage = new ActivityReportPage(pageWithContext);
    await use(activityReportPage);
  },
  validationPage: async ({ pageWithContext }, use) => {
    const validationPage = new ValidationPage(pageWithContext);
    await use(validationPage);
  },
  activityManagementAPI: async ({ }, use) => {
    const activityManagementAPI = await (new ActivityManagementAPI()).init();
    await use(activityManagementAPI);
  }
});
