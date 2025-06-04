const { Before, After, BeforeAll } = require('@cucumber/cucumber');
const globalSetup = require('../utils/settings/GlobalSetup.js');
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60000); // 60 seconds

BeforeAll(async function () {
  await globalSetup();
});

Before(async function() {
    await this.init();
});

After(async function() {
    await this.cleanup();
});

