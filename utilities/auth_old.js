export const state = () => ({
    isLoggedIn: false,
    jwt: null,
    userData: null,
    userName: null,
    userId: null,
    accountId: null,
    displayError: false,
    messageError: '',
    layoutComponentKey: 1,
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setUserDatas(state, payload) {
        state.userData = payload;
    },
    setUserName(state, payload) {
        state.userName = payload;
    },
    setJwt(state, payload) {
        state.jwt = payload;
        //localStorage.setItem('jwt', JSON.stringify(payload))
    },
    setUserId(state, payload) {
        state.userId = payload;
        //localStorage.setItem('userId', JSON.stringify(payload))
    },
    setDisplayError(state, payload) {
        state.displayError = payload;
    },
    setMessageError(state, payload) {
        state.messageError = payload;
    },
    logout(state) {
        (state.jwt = null), (state.userData = null), (state.userId = null), (state.isLoggedIn = false);
    },
};

export const actions = {
    init({ commit, dispatch }) {
        /* localStorage.getItem('jwt') ?
        (commit('setJwt', JSON.parse(localStorage.getItem('jwt') || false)),
        commit('setIsLoggedIn', true ),
        dispatch('cart/getCartDetail', JSON.parse(localStorage.getItem('userId')), JSON.parse(localStorage.getItem('jwt')),{root:true})
        ):
        null
        localStorage.getItem('userId') ?
        commit('setUserId', JSON.parse(localStorage.getItem('userId') || false)) :
        null
        localStorage.getItem('user') ?
        commit('setUserDatas', JSON.parse(localStorage.getItem('user') || false)) :
        null */
        //localStorage.getItem('cart') ?
        //(store.commit('cart/setCart', JSON.parse(localStorage.getItem('cart') || false),  {root:true})
        //store.dispatch('product/getCartProducts', store.getters["cart/getCartItems"],  {root:true})
        //) :
        //null
        //localStorage.getItem('cartId') ?
        //store.commit('cart/setCartId', JSON.parse(localStorage.getItem('cartId') || false), {root:true}) :
        //null
    },

    OLD_setAuthStatus({ commit, state }, payload) {
        commit('setIsLoggedIn', payload);
        const cookieParams = {
            isLoggedIn: state.isLoggedIn,
        };

        this.$cookies.set('auth', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
    },
    async createAccount({}, data) {
        const X = await this.$services.auth
            .APIcreateAccount(data)
            .then((response) => {
                console.log('compte bien créé', response.data);
            })
            .catch((error) => {
                console.log("Erreur avec l'API  de création de compte", error);
            });
    },
    async logout({ commit, dispatch }) {
        commit('logout');
        this.$cookies.remove('auth');
        this.$cookies.remove('jwt');
        this.$cookies.remove('userId');
        this.$cookies.remove('userName');
        dispatch('cart/clearCart', null, { root: true });
        this.$router.push('/');
        this.$router.app.refresh();
    },
    async setAuthStatus({ commit, state, dispatch }, userData) {
        commit('setMessageError', '');
        commit('setDisplayError', false);
        const x = await this.$services.auth
            .login(userData)
            .then((response) => {
                //console.log("j'ai bien la connexion qui est bon", response.data)
                commit('setUserDatas', response.data.user);
                commit('setUserName', response.data.user.firstName);
                this.$router.push('/');
                this.$router.app.refresh();
                this.$cookies.set('userName', response.data.user.firstName, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7,
                });
                commit('setJwt', response.data.jwt);
                this.$cookies.set('jwt', response.data.jwt, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7,
                });
                commit('setUserId', response.data.specificUserId);
                this.$cookies.set('userId', response.data.specificUserId, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7,
                });
                commit('setIsLoggedIn', true);
                const cookieParams = {
                    isLoggedIn: state.isLoggedIn,
                };
                this.$cookies.set('auth', cookieParams, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7,
                });
                dispatch(
                    'cart/getCartDetail',
                    { userId: response.data.specificUserId, jwt: response.data.jwt },
                    { root: true }
                );
                dispatch(
                    'wishlist/getBuyingList',
                    { userId: response.data.specificUserId, jwt: response.data.jwt },
                    { root: true }
                );
                dispatch(
                    'quote/getAllMasterQuotes',
                    { userId: response.data.specificUserId, jwt: response.data.jwt },
                    { root: true }
                );
            })
            .catch((error) => {
                commit('setMessageError', error.response.data.errors[0].message);
                commit('setDisplayError', true);
            });
    },
};
