// This must be relative to .nuxt since it it registered at RUNTIME
import * as wishlistStore from '@/modules/buyingList/store/index.js';

export default async ({ store }) => {
    return await store.registerModule('wishlist', wishlistStore, {
        namespaced: wishlistStore.namespaced,
    });
};
