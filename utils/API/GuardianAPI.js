const { request } = require('@playwright/test');
const { CONFIG } = require("../data/setupData/constants");
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

class GuardianAPI {

    constructor() {
        const tokenData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/setupData/access_token.json')));
        this.baseURL = "https://guardian.o2f-it.com/api/v1";
        this.headers = {
            "authorization": "Bearer " + tokenData.access_token,
            "X-Guardian-Tenant": CONFIG.ENVIRONMENT
        };
    }

    async init() {
        this.apiContext = await request.newContext();
        return this;
    }

    async impersonate(employee) {
        const employeeName = JSON.parse(JSON.stringify(employee,null,2)).name;

        const queryParams = new URLSearchParams({
            onlyActiveUsers: 'true',
            Query: employeeName,
            RowsPerPage: 1
        });

        const urlWithParams = `${this.baseURL + "/secured-users"}?${queryParams.toString()}`;

        const response = await (await this.apiContext.get(urlWithParams, { headers: this.headers })).text();

        await this.apiContext.post(this.baseURL + "/identities/assign-to-user/" + JSON.parse(response).items[0].securedUserId + "?reason=auto", { headers: this.headers });
    }

    async revert() {
        await this.apiContext.post(this.baseURL + "/identities/revert/", { headers: this.headers });
    }
}

module.exports = { GuardianAPI }