<template lang="html">
    <header class="header--dashboard">
        <div class="header__left">
            <div class="title__h3">{{ title }}</div>
            <p>{{ description }}</p>
        </div>
        <div class="header__center">
            <form-header-search />
        </div>
        <div class="header__right header__actions">
            <a class="header__site-link header__extra" @click="openCart()" v-if="$core.useShop.IsActive()">
                <i class="icon-cart"></i>
                <span>
                    <i>{{ totalNumberOfProductsInCart }}</i>
                </span>
            </a>
            <nuxt-link
                :to="localePath('/quotes')"
                class="header__site-link header__extra"
                v-if="$core.useQuote.IsActive()"
            >
                <i class="icon-papers"></i>
                <span>
                    <i>{{ quoteTotal ? quoteTotal : 0 }}</i>
                </span>
            </nuxt-link>
            <nuxt-link
                :to="localePath('/buyinglist')"
                class="header__site-link header__extra"
                v-if="$core.useWishlist.IsActive()"
            >
                <i class="icon-heart"></i>
                <span>
                    <i>{{ buyinglistTotal ? buyinglistTotal : 0 }}</i>
                </span>
            </nuxt-link>
        </div>
    </header>
</template>

<script>
import FormHeaderSearch from '@components/organisms/DjHeader/Vertical/modules/FormHeaderSearch.vue';
export default {
    name: 'HeaderDashboard',
    components: { FormHeaderSearch },
    props: {
        title: {
            type: String,
            default: () => 'Dashboard',
        },
        description: {
            type: String,
            default: () => 'User Account B2B',
        },
    },
    computed: {
        buyinglistTotal() {
            return this.$core.getWishlist.getTotal(this.$store.state.wishlist.items);
        },
        quoteTotal() {
            if (this.$core.useQuote.IsActive()) {
                return this.$core.getQuote.getTotal(this.$store.state.quote.quotes);
            }
            return null;
        },
        totalNumberOfProductsInCart() {
            return this.$core.getCart.getTotalNumberCartItems(this.$store.state.cart.cartItems);
        },
    },
    methods: {
        openCart() {
            let val = true;
            $nuxt.$emit('opencartmodel', val);
        },
    },
};
</script>

<style lang="scss" scoped></style>
