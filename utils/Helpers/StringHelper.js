const { domainToASCII } = require('url');
const { CONFIG } = require('../data/setupData/constants');

class StringHelper {

    static goToSinglePageApp(appName) {
        return `https://${appName}.${CONFIG.ENVIRONMENT}arp.mantu.com`;
    }

    static baseURL() {
        var domain;
        if (CONFIG.ENVIRONMENT === 'inte') {
            domain = CONFIG.ENVIRONMENT;
        }
        else {
            domain = CONFIG.ENVIRONMENT + 'arp';
        }
        return 'https://' + domain + '.mantu.com';
    }
}

module.exports = { StringHelper }