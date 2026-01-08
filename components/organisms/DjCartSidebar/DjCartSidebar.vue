<template>
    <div id="cart_side" class="add_to_cart right" :class="{ openSide: openCart }">
        <DjLink href="javascript:void(0)" class="overlay" @click="closeCart()"></DjLink>
        <div class="cart-inner">
            <div class="cart_top">
                <div class="title__h3">{{ $t('cart.shoppingCart') }}</div>
                <div class="close-cart" @click="closeCart(openCart)">
                    <DjLink href="javascript:void(0)" class="btn-close" @click="closeCart(openCart)">
                        <i class="icon-arrow-right" aria-hidden="true"></i>
                    </DjLink>
                </div>
            </div>
            <div class="cart_media" v-if="cartItems.length">
                <ul class="cart_product">
                    <DjMiniProductCart
                        class="pb-3"
                        :cartLine="product"
                        v-for="product in cartItems"
                        :key="`${product.offerPrice.id} - ${increment}`"
                    />
                </ul>

                <ul class="cart_total">
                    <li>
                        <div class="total borderTotaltop">
                            <div class="title__h5">
                                <span>{{ $t('account.orders.shipping') }}</span>
                            </div>
                            <div class="title__h5">
                                <span>{{ $t('account.orders.included') }}</span>
                            </div>
                        </div>

                        <div class="total borderTotalBottom">
                            <div class="title__h5 totalcolor">
                                {{ $t('header.miniCart.subTotal') }}
                            </div>

                            <div class="totalcolor">
                                <span v-html="totalAmountOfCart"></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="buttons">
                            <div>
                                <div class="mb-4 mt-1" @click="checkout()">
                                    <DjButton
                                        :fullWidth="true"
                                        :text="$t('header.miniCart.checkout')"
                                        styleButton="primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <div @click="viewCart()">
                                    <DjButton
                                        :fullWidth="true"
                                        :text="$t('header.miniCart.viewCart')"
                                        styleButton="secondary"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div @click="clearBasket()" class="nuxt-link-active">
                                <DjLink class="clear-basket">{{ $t('header.miniCart.clearBasket') }}</DjLink>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-sm-12 empty-cart-cls text-left" v-if="!cartItems.length">
                <div class="title__h4 mt-3">
                    <strong @click="clearBasket()">{{ $t('cart.emptyCart') }}</strong>
                </div>
                <div @click="closeCart(openCart)">
                    <DjButton :text="$t('cart.backToShopButton')" styleButton="primary" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DjMiniProductCart from '@components/organisms/DjMiniProductCart/DjMiniProductCart.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import { mapState } from 'vuex';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    components: { DjMiniProductCart, DjLink, DjButton },
    props: ['openCart'],
    data() {
        return {
            loading: false,
            increment: 0,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
            cartItems: (state) => state.cart.cartItems,
        }),
        totalAmountOfCart() {
            this.increment++;
            return this.$core.getCart.getTotalAmountOfCart(this.cartItems, this.currency);
        },
    },
    methods: {
        closeCart() {
            this.$emit('closeCart', true);
        },
        viewCart() {
            this.$emit('closeCart', true);
            this.$router.push(this.localePath('/checkout/shopping-cart'));
        },
        checkout() {
            this.$emit('closeCart', true);
            this.$router.push(this.localePath('/checkout/billing'));
        },
        handleRemoveProductFromCart(product) {
            this.$core.useCart.removeProductFromCart(product);
        },
        clearBasket() {
            this.$core.useCart
                .deleteCart()
                .then((result) => {
                    result == 'succes'
                        ? this.$toast.success(this.$t('header.miniCart.clearSucessful'))
                        : '';
                    this.$store.commit('cart/clearCart');
                })
                .catch((err) => {
                    this.$toast.error(this.$t('header.miniCart.clearError') + err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.clear-basket {
    color: #999;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
.totalcolor {
    color: black !important;
}
</style>
