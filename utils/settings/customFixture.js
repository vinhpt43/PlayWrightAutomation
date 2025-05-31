const { test: base } = require('@playwright/test');
const { GuardianAPI } = require('../API/GuardianAPI');
const { StringHelper } = require('../Helpers/StringHelper');
const dataSet = require('../data/testData.json');
const { ActivityReportPage, ValidationPage } = require('../../pages/ActivityManagement');

exports.test = base.extend({
  guardian: async ({ }, use) => {
    const guardian = await (new GuardianAPI()).init();
    await use(guardian);
    await guardian.revert();
  },
  dataSet: async ({ }, use) => {
    await use(dataSet);
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
  }
});
