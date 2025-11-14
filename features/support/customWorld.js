const { setWorldConstructor } = require('@cucumber/cucumber');
const { GuardianAPI } = require('../../utils/API/GuardianAPI');
const { USER_ROLES } = require('../../utils/data/setupData/constants');
const { ActivityReportPage, ValidationPage } = require('../../pages/ActivityManagement');
const { ActivityManagementAPI } = require('../../utils/API/ActivityManagementAPI');
const { StringHelper } = require('../../utils/Helpers/StringHelper');
const { chromium } = require('playwright');

class CustomWorld {
    async init() {
        this.guardian = await (new GuardianAPI()).init();
        this.userRoles = USER_ROLES;
        this.stringHelper = StringHelper;

        this.page = await this.context.newPage();

        this.activityReportPage = new ActivityReportPage(this.page);
        this.validationPage = new ValidationPage(this.page);
        this.activityManagementAPI = await (new ActivityManagementAPI()).init();
    }

    async cleanup() {
        await this.page.close();
        // await this.guardian.revert();
    }
}

setWorldConstructor(CustomWorld);