const mutations = {
    setOffers(state, payload) {
        state.offers = payload;
    },
    setOffersToDisplay(state, payload) {
        state.offersToDisplay = payload;
    },
    setVariantToDisplay(state, payload) {
        state.variantToDisplay = payload;
    },
    setVariantListToDisplay(state, payload) {
        state.variantListToDisplay = payload;
    },
    clearOffers(state) {
        state.offers = [];
        state.offersToDisplay = null;
        state.variantToDisplay = null;
    },
};

export default mutations;
