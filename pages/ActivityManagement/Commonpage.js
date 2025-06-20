class Commonpage {

    constructor(page) {
        this.page = page;
    }

    async alterAPIresponse(url, alteredResponse) {
        await this.page.route(url,
            async route => {
                const response = await this.page.request.fetch(route.request());
                let body = JSON.stringify(alteredResponse);
                route.fulfill({ response, body });
            }
        );
    }
}

module.exports = { Commonpage };