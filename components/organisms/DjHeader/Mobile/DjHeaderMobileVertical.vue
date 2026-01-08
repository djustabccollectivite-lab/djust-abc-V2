<template lang="html">
    <header class="header--mobile">
        <div class="header__left">
            <button class="dj-drawer-toggle" @click.prevent="handleOpenMenuDrawer">
                <i class="icon icon-menu"></i>
            </button>
        </div>
        <div class="header__center">
            <a class="dj-logo" href="#">
                <img v-if="headerLogo" :src="`${headerLogo}`" alt="" />
            </a>
        </div>
        <div class="header__right">
            <a class="header__site-link" @click="openCart()" v-if="$core.useShop.IsActive()">
                <i class="icon-cart"></i>
                <span>
                    <i>{{ totalNumberOfProductsInCart }}</i>
                </span>
            </a>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex';
import { handleStickyHeader } from '~/utilities/helpers';
export default {
    name: 'HeaderMobile',
    computed: {
        ...mapState({
            isDrawer: (state) => state.app.isDrawer,
        }),
        totalNumberOfProductsInCart() {
            return this.$core.getCart.getTotalNumberCartItems(this.$store.state.cart.cartItems);
        },
    },
    data() {
        return {
            headerLogo: null,
        };
    },
    async fetch() {
        this.headerLogo = await this.$core.useStoryblok.getLogo();
    },

    methods: {
        handleOpenMenuDrawer() {
            this.$store.commit('app/toggleDrawer', !this.isDrawer);
        },
        openCart() {
            let val = true;
            $nuxt.$emit('opencartmodel', val);
        },
    },
    mounted() {
        window.addEventListener('scroll', handleStickyHeader);
    },
};
</script>

<style lang="scss" scoped></style>
