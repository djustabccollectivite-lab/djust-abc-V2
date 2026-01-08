const mutations = {
    setCurrentSupplier(state, payload) {
        state.currentSupplier = payload;
    },
    setSuppliers (state, payload) {
        state.suppliers = payload
    }
};

export default mutations;
