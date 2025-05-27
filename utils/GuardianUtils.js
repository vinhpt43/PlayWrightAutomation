const { CommonUtils } = require("./CommonUtils.js")
const config = require("../playwright.config.js")

class GuardianUtils {

    constructor(apiContext, accessToken) {
        this.apiContext = apiContext;
        this.baseURL = "https://guardian.o2f-it.com/api/v1";
        this.headers = {
            "authorization": "Bearer " + accessToken,
            "X-Guardian-Tenant": config.use.environment
        };
    }

    async impersonate(employeeName) {

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

module.exports = { GuardianUtils }