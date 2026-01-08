export default (axios: any) => ({
    APIgetHomePage() {
        return axios.get(`${process.env.CMSUrl}/homepages/`);
    },

    APIgetContentPage(page: any) {
        return axios.get(`${process.env.CMSUrl}/contents/` + page);
    },
});
