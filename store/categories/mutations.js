const mutations = {
    setCategories(state, payload) {
        state.categories = payload;
    },
    setOriginalActiveCategories (state, payload) {
        state.originalActiveCategories = payload;
    },
};

export default mutations;
