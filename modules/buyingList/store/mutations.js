const mutations = {
    setProductToWishlist(state, payload) {
        state.productToWishlist = payload;
    },
    initWishlist(state, payload) {
        state.items = payload.items;
        state.total = payload.total;
    },
    clearWishlist: (state) => {
        state.items = [];
        // state.id = null;
        state.total = 0;
    },
    setWishlist(state, payload) {
        const sortedList = payload;
        sortedList.buyingListItems.sort(function (a, b) {
            return a.id - b.id;
        });
        state.items.push(sortedList);
        state.total = state.items.length;
    },
    setAllWishlist(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            payload[i].buyingListItems.sort(function (a, b) {
                return a.id - b.id;
            });
        }

        state.items = payload;
        state.total = state.items.length;
    },
    setListId(state, payload) {
        state.id = payload;
    },
    setListName(state, payload) {
        state.name = payload;
    },
    addItem(state, payload) {
        state.items.push(payload);
        state.total = state.items.length;
    },
    removeItem(state, payload) {
        const index = state.items.findIndex((item) => item.id === payload.id);
        state.items.splice(index, 1);
        state.total = state.items.length;
    },
    setIsLoading(state, payload) {
        state.loading = payload;
    },
};

export default mutations;
