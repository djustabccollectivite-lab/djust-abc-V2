import { $themeConfig } from '@/themeConfig';
const mutations = {
    setAppDrawer(state, payload) {
        state.appDrawer = payload;
    },

    setCurrentDrawerContent(state, payload) {
        state.currentDrawerContent = payload;
    },

    setCurrency(state, payload) {
        state.currency = payload;
    },

    setIsDirty(state, payload) {
        state.isDirty = payload;
    },

    toggleDrawer(state, payload) {
        state.isDrawer = payload;
    },

    toggleSearch(state, payload) {
        state.isSearch = payload;
    },

    setLayoutType(state, payload) {
        $themeConfig.layout_type = payload;
        state.layoutType = payload;
    },

    setAccount(state, payload) {
        state.account = payload;
    },

    setOrganisation(state, payload) {
        state.organisation = payload;
    },

    setSearch(state, payload) {
        state.search = payload;
    },

    setZipCode(state, payload) {
        state.zipCode = payload;
    },

    setStoreId(state, payload) {
        state.storeId = payload;
    },

    setStoreViewId(state, payload) {
        state.storeViewId = payload;
    },
};

export default mutations;
