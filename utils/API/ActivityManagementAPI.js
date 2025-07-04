const { request } = require('@playwright/test')
const fs = require('fs');
const path = require('path');
const { StringHelper } = require('../Helpers/StringHelper');
const { CONFIG, ACTIVITYMANAGEMENTWRAPPER } = require('../data/setupData/constants')

class ActivityManagementAPI {

    constructor() {
        const tokenData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/setupData/access_token.json')));
        this.baseURL = StringHelper.baseURL() + CONFIG.ACTIVITYMANAGEMENTAPISERVER;
        this.headers = {
            "authorization": "Bearer " + tokenData.access_token,
            "content-type": "application/json"
        };
    }

    async init() {
        this.apiContext = await request.newContext();
        return this;
    }

    async getActivityReport(employeeId, startDate, endDate) {
        const queryParams = new URLSearchParams({
            employeeId: employeeId,
            startDate: startDate,
            endDate: endDate
        });

        const urlWithParams = `${this.baseURL + ACTIVITYMANAGEMENTWRAPPER.ACTIVITYREPORT}?${queryParams.toString()}`;

        const response = await (await this.apiContext.get(urlWithParams, { headers: this.headers })).text();

        // console.log(response);
        return response;
    }
}
module.exports = { ActivityManagementAPI };