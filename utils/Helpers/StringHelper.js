const { CONFIG } = require('../data/setupData/constants');

class StringHelper {

    static goToSinglePageApp(appName) {
        return `https://${appName}.${CONFIG.ENVIRONMENT}arp.mantu.com`;
    }

    static baseURL()
    {
        return `https://${CONFIG.ENVIRONMENT}arp.mantu.com`;
    }
}

module.exports = { StringHelper }