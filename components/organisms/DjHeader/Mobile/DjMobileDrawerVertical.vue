<template lang="html">
    <v-navigation-drawer v-model="drawer" width="50%" absolute temporary>
        <div class="ps-panel--menu-sidebar">
            <div class="dj-panel__header">
                <a class="dj-drawer__close" @click="handleCloseDrawer" style="float: right">
                    <i class="icon-cross-circle"></i>
                </a>
            </div>
            <div class="dj-panel__content">
                <ul class="menu">
                    <li v-for="(item, index) in menuItems" :key="index" class="pl-2">
                        <nuxt-link :to="item.url">
                            <a v-if="item.text === 'Logout'" @click.prevent="handleLogout">
                                <i :class="item.icon"></i>
                                {{ item.text }}
                            </a>
                            <a v-else>
                                <i :class="item.icon"></i>
                                {{ item.text }}
                            </a>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-panel__footer"></div>
        </div>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'DjMobileDrawerVertical',
    computed: {
        ...mapState({
            isDrawer: (state) => state.app.isDrawer,
        }),
        drawer: {
            get() {
                return this.isDrawer;
            },
            set(newValue) {
                return newValue;
            },
        },
    },
    data() {
        return {
            menuItems: [
                {
                    text: 'Dashboard',
                    url: '/',
                    icon: 'icon-home',
                },
                {
                    text: 'Orders',
                    url: '/account/orderscts',
                    icon: 'icon-bag2',
                },
                {
                    text: 'Quotes',
                    url: '/quotes',
                    icon: 'icon-papers',
                },
                {
                    text: 'BuyingList',
                    url: '/buyinglist',
                    icon: 'icon-heart',
                },
                {
                    text: 'Shop',
                    url: '/list',
                    icon: 'icon-store',
                },
                {
                    text: 'Addresses',
                    url: '/account/addresses',
                    icon: 'icon-map',
                },
                {
                    text: 'Settings',
                    url: '/account/addresses',
                    icon: 'icon-cog',
                },
                {
                    text: 'Logout',
                    url: '/',
                    icon: 'icon-lock',
                },
            ],
        };
    },
    methods: {
        handleCloseDrawer() {
            this.$store.commit('app/toggleDrawer', false);
        },
        async handleLogout() {
            await this.$auth
                .logout({ params: { refresh_token: this.$auth.strategy.refreshToken.get() } })
                .then((result) => {
                    this.$auth.$storage.setUniversal('user', false, true);
                    this.$store.commit('quote/clearQuotes');
                    this.$store.commit('wishlist/clearWishlist');
                    this.$store.commit('cart/clearCart');

                    this.$config.store_type === 'private'
                        ? this.$router.push(this.localePath('/login'))
                        : this.$router.push(this.localePath('/'));
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
