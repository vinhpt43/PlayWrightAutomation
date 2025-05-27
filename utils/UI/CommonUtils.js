const fs = require('fs');
const config = require("../../playwright.config.js")

class CommonUtils {

    static goToSinglePageApp(appName) {
        return `https://${appName}.${config.use.environment}arp.mantu.com`;
    }
}

module.exports = { CommonUtils }