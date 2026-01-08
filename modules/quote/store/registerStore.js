// This must be relative to .nuxt since it it registered at RUNTIME
import * as quoteStore from '@/modules/quote/store/index.js';

export default async ({ store }) => {
    return await store.registerModule('quote', quoteStore, {
        namespaced: quoteStore.namespaced,
    });
};
