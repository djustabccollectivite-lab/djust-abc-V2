const mutations = {
    setHomePage(state, payload) {
        state.homePage = payload;
    },
    setGeneralSettings(state, payload) {
        state.generalSettings = payload;
    },
    setLogo(state, payload) {
        state.logo = payload;
    },
    setBgLogin(state, payload) {
        state.bgLogin = payload;
    },
    setAdsImage(state, payload) {
        state.adsImage = payload;
    },
    setHeader(state, payload) {
        state.header = payload;
    },
    setHomepageimage(state, payload) {
        state.homepageimage = payload;
    },
    setLogoWithColor(state, payload) {
        state.logoWithColor = payload;
    },
    setAuthConfig(state, payload) {
        state.authConfig = payload;
    },
    setRgpdFile(state, payload) {
        state.rgpd = payload;
    },
    setMlFile(state, payload) {
        state.ml = payload;
    },
    setCguFile(state, payload) {
        state.cgu = payload;
    },
    setFooter(state, payload) {
        state.footer = payload;
    }
};

export default mutations;
