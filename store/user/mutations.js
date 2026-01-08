const mutations = {
    setAddressBillingList(state, payload) {
        state.addressBillingList = payload;
    },
    setAddressShippingList(state, payload) {
        state.addressShippingList = payload;
    },
    clearAddressShippingList(state) {
        state.addressShippingList = null;
    },
    setOrganisationAddresses(state, payload) {
        state.organisationAddresses = payload;
    },
    setAccountAddresses(state, payload) {
        state.accountAddresses = payload;
    },
};

export default mutations;
