export const actions = {
    async nuxtServerInit({ commit, _state, _dispatch }, context) {
        const env = context.$config.application_env;

        const privateApiKey =
            env === 'preprod' ? process.env.NUXT_ENV_PREPROD_APIKEY : process.env.NUXT_ENV_PROD_APIKEY;

        this.$axios.setHeader('dj-client', 'ACCOUNT');
        this.$axios.setHeader(
            'dj-api-key',
            this.$config.testingPerfEnv || !privateApiKey ? this.$config.apiKey : privateApiKey,
        );

        /* eslint-disable @typescript-eslint/no-unused-vars */
        const jwt = await this.$auth.strategy.token.get();
        const currency = await this.$cookies.get('currency', { parseJSON: true });
        const account = await this.$cookies.get('customerAccountId', { parseJSON: true });
        const zipCode = await this.$cookies.get('customerZipCode', { parseJSON: true });
        const storeId = await this.$cookies.get('storeId', { parseJSON: true });
        const storeViewId = await this.$cookies.get('storeViewId', { parseJSON: true });
        /* eslint-enable @typescript-eslint/no-unused-vars */

        if (currency) commit('app/setCurrency', currency.data);
        if (zipCode) commit('app/setZipCode', zipCode);
    },

    async nuxtClientInit({ commit, _$auth }, context) {
        const env = context.$config.application_env;

        const privateApiKey =
            env === 'preprod' ? process.env.NUXT_ENV_PREPROD_APIKEY : process.env.NUXT_ENV_PROD_APIKEY;

        context.$axios.setHeader('dj-client', 'ACCOUNT');
        context.$axios.setHeader(
            'dj-api-key',
            this.$config.testingPerfEnv || !privateApiKey ? this.$config.apiKey : privateApiKey,
        );

        const jwt = context.$auth.strategy.token.get();
        const currency = this.$cookies.get('currency', { parseJSON: true });
        const account = this.$cookies.get('customerAccountId', { parseJSON: true });
        const currentSupplier = this.$cookies.get('currentSupplierId', { parseJSON: true });
        const organisation = this.$cookies.get('organisationId', { parseJSON: true });
        const zipCode = this.$cookies.get('customerZipCode', { parseJSON: true });
        const storeId = this.$cookies.get('storeId', { parseJSON: true });
        const storeViewId = this.$cookies.get('storeViewId', { parseJSON: true });
        if (account) {
            commit('app/setAccount', account);
            context.$axios.setHeader('customer-account-id', account);
        }
        if (currentSupplier) {
            commit('suppliers/setCurrentSupplier', currentSupplier);
            context.$axios.setHeader('supplier-id', currentSupplier);
        }
        if (organisation) {
            commit('app/setOrganisation', organisation);
            context.$axios.setHeader('organisation-id', organisation);
        }
        if (storeId) {
            commit('app/setStoreId', storeId);
            context.$axios.setHeader('dj-store', storeId);
        }
        if (storeViewId) {
            commit('app/setStoreViewId', storeViewId);
            context.$axios.setHeader('dj-store-view', storeViewId);
        }
        if (context.$auth.loggedIn) {
            context.$purjus.initiatorsInThemeContext.initStore();
            if (context.$config.use_new_cart) {
                const cartsData = await context.$core.useCartB2B.getAllCarts_B2B(
                    ['INIT', 'LOADING', 'ON_GOING'],
                    ['CART'],
                );
                const uniqSessionCartId = context.$core.useCartB2B.getUniqSessionCartV2Id();
                const randomNumber = Math.floor(Math.random() * 1000);
                if (cartsData && cartsData.length === 0) {
                    context.$core.useCartB2B.createNewCart_B2B('cart' + randomNumber);
                } else if (context.$core.useCartB2B.isUniqSessionCartV2Logic) {
                    const isValidLocalStorageValue =
                        context.$core.useCartB2B.isValidLocalStorageValue(uniqSessionCartId);
                    if (uniqSessionCartId && isValidLocalStorageValue) {
                        const lookForCUrrentSessionExistingCart = cartsData?.find(
                            (cart) => cart?.id === uniqSessionCartId,
                        );
                        if (!lookForCUrrentSessionExistingCart?.id) {
                            context.$core.useCartB2B.createNewCart_B2B('cart' + randomNumber);
                        }
                    }
                }
            } else {
                await context.$core.useCart.getCartDetail(context.$auth.strategy.token.get());
            }

            const user = await this.$core.useUser.getUserauthenticated(jwt);
            context.$auth.setUser(user);

            if (account) context.$core.useUser.getCustomerAccountById(account);
            if (currentSupplier) context.$core.useSupplier.getSupplierById(currentSupplier);

            await context.$core.useUser.getUserShippingAddressList();

            if (this.$core.useWishlist.IsActive()) {
                if (context.$config.themeName?.toLowerCase() === 'veja') {
                    // Paginate buying lists
                    await this.$core.useWishlist.getAllBuyingList(this.$auth.strategy.token.get());
                } else {
                    await this.$core.useWishlist.getBuyingList(this.$auth.strategy.token.get());
                }
            }

            if (this.$core.useQuote.IsActive()) {
                await this.$core.useQuote.getAllMasterQuotes(this.$auth.strategy.token.get());
            }
        }

        if (currency) commit('app/setCurrency', currency.data);

        if (zipCode) commit('app/setZipCode', zipCode);
    },
};
