const config = require("../../playwright.config")

class StringHelper {

    static goToSinglePageApp(appName) {
        return `https://${appName}.${config.use.environment}arp.mantu.com`;
    }

    static baseURL()
    {
        return `https://${config.use.environment}.mantu.com`;
    }
}

module.exports = { StringHelper }