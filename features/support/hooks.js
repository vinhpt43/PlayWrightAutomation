const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const globalSetup = require('../../utils/settings/GlobalSetup.js');
const playwrightConfig = require('../../playwright.config.js');
const { chromium } = require('playwright');

let browser;
let context;

setDefaultTimeout(playwrightConfig.timeout);

BeforeAll(async function () {
  await globalSetup();
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({ storageState: 'session.json' });
});

Before(async function () {
  this.browser = browser;
  this.context = context;
  await this.init();
});

After(async function () {
  await this.cleanup();
});

AfterAll(async function () {
  await context.close();
  await browser.close();
})