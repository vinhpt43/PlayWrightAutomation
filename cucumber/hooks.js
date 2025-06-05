const { Before, After, BeforeAll, setDefaultTimeout } = require('@cucumber/cucumber');
const globalSetup = require('../utils/settings/GlobalSetup.js');
const playwrightConfig = require('../playwright.config.js');

setDefaultTimeout(playwrightConfig.timeout);

BeforeAll(async function () {
  await globalSetup();
});

Before(async function() {
    await this.init();
});

After(async function() {
    await this.cleanup();
});