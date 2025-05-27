// fixtures.js
const { test: base, expect } = require('@playwright/test');
const { GuardianUtils } = require('./GuardianUtils');
const { CommonUtils } = require('./CommonUtils');
const dataSet = require('./testData.json');

exports.test = base.extend({
  guardian: async ({ }, use) => {
    const guardian = await (new GuardianUtils()).init();
    await use(guardian);
    await guardian.revert();
  },
  page: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'session.json' });
    const page = await context.newPage();
    await use(page);
    await page.close();
    await context.close();
  },
  dataSet: async ({ }, use) => {
    await use(dataSet);
  },
  CommonUtils: async ({ }, use) => {
    await use(CommonUtils);
  }
});
exports.expect = expect;