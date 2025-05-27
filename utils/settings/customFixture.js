// fixtures.js
const { test: base, expect } = require('@playwright/test');
const { GuardianAPI } = require('../API/GuardianAPI');
const { StringHelper } = require('../Helpers/StringHelper');
const dataSet = require('../data/testData.json');

exports.test = base.extend({
  guardian: async ({ }, use) => {
    const guardian = await (new GuardianAPI()).init();
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
  StringHelper: async ({ }, use) => {
    await use(StringHelper);
  }
});
exports.expect = expect;