const mutations = {
    setCartId(state, payload) {
        state.cartId = payload;
        localStorage.setItem('cartId', state.cartId);
    },

    setCarts(state, payload) {
        state.carts = payload;
    },

    setCartIdToUse(state, cartId) {
        state.cartIdToUse = cartId;
        localStorage.setItem('cartId', state.cartId);
    },

    setCartInformations(state, informations) {
        state.cartInformations = informations;
    },

    setDateDropCustomField(state, customFieldCart) {
        state.dateDropCustomField = customFieldCart;
    },

    setLoading(state, payload) {
        state.load = payload;
    },

    setCartProductDetail(state, informations) {
        state.cartItemsPagination = { page: informations.page, totalElement: informations.totalElement };
        if (informations.page === 0) {
            state.cartItems = informations.cartLines;
        } else {
            const cartItems_ = [...state.cartItems];
            state.cartItems = cartItems_.concat(informations.cartLines);
        }
    },

    setBillingAddressId(state, payload) {
        state.cartBillingAddressId = payload;
    },

    setOrderValidated(state, payload) {
        state.orderValidated = payload;
        localStorage.setItem('orderValidated', payload);
    },

    clearCarts(state) {
        state.cartItems = [];
        state.cartInformations = {};
    },

    resetCarts(state) {
        state.cartId = null;
        state.cartItems = [];
        state.carts = [];
        state.cartIdToUse = null;
        state.cartInformations = {};
        state.cartItemsPagination = {};
        state.cartBillingAddressId = null;
    },
};

export default mutations;
