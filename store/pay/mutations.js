const mutations = {
    setBeneficiary(state, payload) {
        state.beneficiary = payload;
    },
    setIban(state, payload) {
        state.iban = payload;
    },
    setBic(state, payload) {
        state.bic = payload;
    },
    setReference(state, payload) {
        state.reference = payload;
    },
    setType(state, payload) {
        state.type = payload;
    },
    setTotalAmount(state, payload) {
        state.totalAmount = payload;
    },
    setResetPayData(state) {
        state.beneficiary = null;
        state.iban = null;
        state.bic = null;
        state.reference = null;
        state.type = null;
        state.totalAmount = null;
    },
};

export default mutations;
