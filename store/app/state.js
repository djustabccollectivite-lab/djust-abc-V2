import { $themeConfig } from '@/themeConfig';
const state = () => ({
    appDrawer: false,
    currentDrawerContent: null,
    currency: process.env.NUXT_ENV_CURRENCY ? process.env.NUXT_ENV_CURRENCY : 'EUR',
    isDirty: false,
    isDrawer: false,
    isSearch: false,
    layoutType: $themeConfig.layout_type,
    account: null,
    organisation: null,
    search: false,
    zipCode: null,
    storeId: null,
    storeViewId: null,
});

export default state;
