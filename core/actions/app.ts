export default (context: any) => ({
    changeCurrency(payload: any) {
        context.store.commit('app/setCurrency', payload);
        const cookieParams = {
            data: context.store.state.app.currency,
        };

        context.$cookies.set('currency', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
    },
    changeStore(storeId: string, storeViewId: string) {
        // update the cookies
        context.$cookies.set('storeId', storeId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        context.$cookies.set('storeViewId', storeViewId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        // update the store
        context.store.commit('app/setStoreId', storeId);
        context.store.commit('app/setStoreViewId', storeViewId);

        // modify the Api Header
        context.$axios.setHeader('dj-store', storeId);
        context.$axios.setHeader('dj-store-view', storeViewId);
    },
});
