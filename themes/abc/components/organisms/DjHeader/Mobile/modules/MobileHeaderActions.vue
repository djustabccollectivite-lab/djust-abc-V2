<template>
    <div class="d-flex justify-content-end gap-3">
        <nuxt-link
            v-if="isLoggedIn && $core.useWishlist.IsActive()"
            :to="localePath('/buyinglist')"
            class="header__extra"
        >
            <SvgIcon name="heart-circle" />
            <!--<span><i>{{ buyinglistTotal ? buyinglistTotal : 0 }}</i></span>-->
        </nuxt-link>
        <nuxt-link v-if="isLoggedIn" :to="localePath('/quotes')" class="header__extra">
            <SvgIcon name="quote-circle" />
            <!--<span><i>{{ quoteTotal ? quoteTotal : 0 }}</i></span>-->
        </nuxt-link>
        <a v-if="isLoggedIn && $core.useShop.IsActive()" class="header__extra" @click="openCart">
            <SvgIcon name="cart-circle" />
            <!--<span><i>{{ totalNumberOfProductsInCart }}</i></span>-->
        </a>
        <a class="navigation__item" @click.prevent="handleToggleDrawer('menu')">
            <SvgIcon :name="isMenuOpen ? 'close-circle' : 'menu-circle'" />
        </a>
    </div>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import { mapState } from 'vuex';

export default {
    name: 'MobileHeaderActions',
    components: { SvgIcon },
    props: {
        isMenuOpen: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState({
            appDrawer: (state) => state.app.appDrawer,
            currentDrawerContent: (state) => state.app.currentDrawerContent,
        }),
        isLoggedIn() {
            return this.$auth.loggedIn;
        },
        totalNumberOfProductsInCart() {
            return this.$core.getCart.getTotalNumberCartItems(this.$store.state.cart.cartItems);
        },
        buyinglistTotal() {
            return this.$core.getWishlist.getTotal(this.$store.state.wishlist.items);
        },
        quoteTotal() {
            if (this.$core.useQuote.IsActive()) {
                return this.$core.getQuote.getTotal(this.$store.state.quote.quotes);
            }
            return null;
        },
    },
    methods: {
        openCart() {
            $nuxt.$emit('opencartmodel', true);
        },
        handleToggleDrawer(drawer) {
            this.$store.commit('app/setCurrentDrawerContent', drawer);
            this.$store.commit('app/setAppDrawer', !this.appDrawer);
        },
    },
};
</script>
