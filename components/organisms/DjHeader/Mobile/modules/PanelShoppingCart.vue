<template lang="html">
    <div class="dj-panel--sidebar">
        <div class="dj-panel__header">
            <div class="title__h3">Shopping Cart</div>
            <a href="#" class="dj-panel__close" @click.prevent="handleClosePanel">
                <i class="icon icon-cross" style="color: white"></i>
            </a>
        </div>
        <div class="dj-panel__content">
            <div class="dj-cart--mobile">
                <div class="dj-cart__content">
                    <div v-if="cartProducts !== null" class="dj-cart__items">
                        <DjMiniProductCart v-for="product in cartItems" :key="product.id" :product="product" />
                    </div>
                    <div v-else class="dj-cart__items">
                        <span>No Product.</span>
                    </div>
                </div>
                <div v-if="cartProducts !== null" class="dj-cart__footer">
                    <div class="title__h3">
                        Sub Total:<strong>${{ cart.amount }}</strong>
                    </div>
                    <figure>
                        <div>
                            <DjLink to="/account/checkout">
                                <DjButton :text="'Checkout'" :fullWidth="true" styleButton="primary" />
                            </DjLink>
                        </div>
                    </figure>
                </div>
                <div v-else class="dj-cart__footer">
                    <DjLink to="/list">
                        <DjButton :text="'Shop now'" :fullWidth="true" styleButton="primary" />
                    </DjLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjMiniProductCart from '@components/organisms/DjMiniProductCart/DjMiniProductCart.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'PanelShoppingCart',
    components: { DjMiniProductCart, DjLink, DjButton },
    computed: {
        ...mapState({
            cart: (state) => state.cart,
            cartProducts: (state) => state.cart.cartItems,
        }),
    },
    methods: {
        handleClosePanel() {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        },
        handleRemoveProductFromCart(product) {
            this.$core.useCart.removeProductFromCart(product);
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-cart--mobile {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    > * {
        flex-basis: 100%;
        height: 100%;
    }
    figure {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin: 0 -5px;
        > div {
            flex-basis: 50%;
            padding: 0 5px;
            .dj-btn {
                padding: 12px 25px;
                text-align: center;
                width: 100%;
            }
        }
    }

    .dj-cart__content {
        max-height: calc(100% - 100px);
        overflow-y: auto;
    }

    .dj-cart__footer {
        padding: 10px 0;
        max-height: 100px;
        width: 100%;
        border-top: 1px solid #e1e1e1;
        h3,
        .title__h3 {
            display: block;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;

            strong {
                float: right;
                //color: var(--color-danger);
            }
        }
    }
}

.dj-panel__content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: calc(100% - 50px);
}
</style>
