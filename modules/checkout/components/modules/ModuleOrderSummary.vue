<template>
    <section aria-labelledby="summary-heading" class="dj-order-summary">
        <div class="title-block">
            <h2 id="summary-heading" class="title-order-summary">{{ $t('account.orders.summary') }}</h2>
        </div>
        <div class="dj-order-summary-content">
            <figure class="dj-block__items">
                <nuxt-link
                    v-for="(product, index) in cartItems"
                    :to="`/product/${$core.getCart.getProductSku(product)}`"
                    :key="product.id"
                    class="mb-8 d-flex flex-column"
                >
                    <ShoppingCartOrderSummaryItem :item="product" />
                </nuxt-link>
            </figure>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.orders.totalProductHT') }}</span>
                </div>
                <span class="price-text" v-html="totalAmountOfCart"></span>
            </div>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.orders.totalShippingHT') }}</span>
                </div>
                <span class="price-text" v-html="totalAmountOfSipping"></span>
            </div>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.orders.vat') }}</span>
                </div>
                <span class="price-text" v-html="totalTaxOfCart"></span>
            </div>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.orders.vatShipping') }}</span>
                </div>
                <span class="price-text" v-html="totalShippingTax"></span>
            </div>
            <div class="order-total">
                <span class="text">{{ $t('account.orders.invoice.totalWithTax') }}</span>
                <span class="price" v-html="totalAmountOfCartWithTax"></span>
            </div>
        </div>
        <div class="mt-6">
            <slot />
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import ShoppingCartOrderSummaryItem from '@modules/checkout/components/modules/ShoppingCartOrderSummaryItem.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
export default {
    name: 'ModuleOrderSummary',
    components: { ShoppingCartOrderSummaryItem, DjIcon, DjCard },
    props: {
        shipping: {
            type: Boolean,
            default: () => false,
        },
    },
    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            currency: (state) => state.app.currency,
        }),
        NumberOfProductsInCart() {
            return this.$core.getCart.getTotalNumberCartItems(this.$store.state.cart.cartItems);
        },
        totalAmountOfCart() {
            return this.$core.getCart.getTotalAmountOfCart(this.cartItems, this.currency);
        },
        totalTaxOfCart() {
            return this.$core.getCart.getTaxAmount(this.cartItems, this.currency);
        },
        totalAmountOfCartWithTax() {
            return this.$core.getCart.getTotalAmountOfCartWithTax(this.cartItems, this.currency);
        },
        totalShippingTax() {
            return this.$core.getCart.getShippingTaxAmount(this.cartItems, this.currency);
        },
        totalAmountOfSipping() {
            return this.$core.getCart.getTotalAmountOfSipping(this.cartItems, this.currency);
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-order-summary {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-top: 4rem;
    background: #ffffff;
    box-shadow: 0px 2px 4px 1px rgba(105, 105, 105, 0.25);
    border-radius: 20px;

    @media (min-width: 640px) {
        padding: 1.5rem;
    }

    @media (min-width: 1024px) {
        padding: 2rem;
        margin-top: 0;
        grid-column: span 5 / span 5;
    }
    .title-block {
        //border-bottom:0.2px solid #4D4D4F;
        padding-bottom: 48px;
        .title-order-summary {
            font-family: var(--font-1st);
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 21px;
            color: #1c1c1c;
            text-align: center;
        }
    }

    .dj-order-summary-content {
        margin-top: 1.5rem;
        margin-top: 1rem;
        .order-info {
            margin-top: 17px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid;
            border-color: #e5e7eb;
            border-spacing: 5px;
            .order-detail {
                font-family: var(--font-1st);
                font-style: normal;
                font-weight: 100;
                font-size: 13px;
                line-height: 15px;
                color: #1c1c1c;
                display: flex;
                align-items: center;
                .title-text {
                    margin-left: 0.5rem;
                    color: #9ca3af;
                    flex-shrink: 0;
                    .icon {
                        font-size: 12px;
                    }
                }
            }
            .price-text{
                font-family: var(--font-2nd) !important;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                color: #1c1c1c;
            }
        }
        .order-total {
            margin-top: 48px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid;
            border-color: #e5e7eb;
            border-spacing: 5px;
            .text {
                font-family: var(--font-1st);
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 19px;
                color: var(--color-secondary);
            }
            .price {
                font-family: var(--font-2nd) !important;
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                line-height: 26px;
                color: var(--color-secondary);
            }
        }
    }
    .button-checkout {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #4f46e5;
        color: #ffffff;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 500;
        width: 100%;
        border-radius: 0.375rem;
        border-width: 1px;
        border-color: transparent;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
}
</style>
