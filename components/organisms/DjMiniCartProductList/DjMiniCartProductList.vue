<template>
    <div v-if="cartItems.length > 0" class="dj-cart__content">
        <div class="dj-cart__items">
            <template v-if="loading === true">
                <loading />
            </template>
            <div v-else>
                <DjMiniProductCart :product="product" v-for="product in cartItems" :key="product.id" />
            </div>
        </div>
        <div class="dj-cart__footer">
            <div class="title__h3">
                {{ $t('header.miniCart.subTotal') }}
                <strong v-html="totalAmountOfCart"></strong>
            </div>
            <figure>
                <div>
                    <nuxt-link :to="localePath('/checkout/shopping-cart')" class="dj-btn dj-btn--primary">
                        {{ $t('header.miniCart.viewCart') }}
                    </nuxt-link>
                </div>
                <div>
                    <nuxt-link :to="localePath('/checkout/billing')" class="dj-btn dj-btn--primary">
                        {{ $t('header.miniCart.checkout') }}
                    </nuxt-link>
                </div>
            </figure>
        </div>
    </div>
    <div v-else class="dj-cart__content">
        <div class="dj-cart__items no-products">
            {{ $t('header.miniCart.noProduct') }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from '@components/atoms/DjLoading/DjLoading.vue';
import DjMiniProductCart from '@components/organisms/DjMiniProductCart/DjMiniProductCart.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'index',
    components: {
        Loading,
        DjMiniProductCart,
        DjLink,
    },
    computed: {
        ...mapState({
            loading: (state) => state.cart.loading,
            cartItems: (state) => state.cart.cartItems,
            currency: (state) => state.app.currency,
        }),
        totalAmountOfCart() {
            return this.$core.getCart.getTotalAmountOfCart(this.cartItems, this.currency);
            //return this.$store.getters["cart/getTotalAmountOfCart"](this.cartItems, this.currency)
        },
    },
};
</script>
