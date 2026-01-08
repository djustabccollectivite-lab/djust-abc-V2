<template>
    <div class="dj-section--shopping dj-shopping-cart">
        <div class="dj-shipping-layout">
            <DjSteps :steps="steps" />
            <div class="row justify-content-end">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div v-for="supplier in suppliersList" :key="supplier.id">
                        <DjCard padding="0px" headerColor="#FFFFFFF">
                            <table-shopping-cart v-if="cartItems && cartItems.length > 0"
                                :cartLines="cartItemsBySuppliers[supplier]"
                                :supplier="suppliersList.length > 1 ? supplier : null" :key="increment" />
                            <p class="text-h4" v-else>{{ $t('cart.emptyCart') }}</p>
                        </DjCard>
                    </div>
                </div>
            </div>
            <div class="d-flex column justify-content-between pa-4">
                <div class="ps-section__cart-actions" @click="handleBackToShop">
                    <button-ui :text="$t('cart.backToShopButton')" styleButton="secondary" icon="icon-arrow-left"
                        iconPosition="left" iconDisplayed fullWidth />
                </div>
                <div class="dj-block--shopping-total">
                    <div class="title__h4 d-flex justify-content-between align-items-center ma-0">
                        <span class="mr-4">{{ $t('cart.total') }} :</span> <span v-html="totalAmountOfCart"></span>
                    </div>
                </div>
                <div @click="handleToBilling">
                    <button-ui :text="$t('cart.ProceedToCheckoutButton')" styleButton="primary" icon="icon-arrow-right"
                        iconPosition="right" iconDisplayed fullWidth />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import TableShoppingCart from '@modules/checkout/components/modules/TableShoppingCart.vue';
import ButtonUi from '@components/atoms/DjButton/DjButton.vue';
import ShoppingCartOrderSummaryItem from '@modules/checkout/components/modules/ShoppingCartOrderSummaryItem.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';

export default {
    name: 'ShoppingCart',
    components: { TableShoppingCart, ButtonUi, ShoppingCartOrderSummaryItem, DjCard, DjSteps },
    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            currency: (state) => state.app.currency,
        }),
        totalAmountOfCart() {
            return this.$core.getCart.getTotalAmountOfCart(this.cartItems, this.currency);
        },
        cartItemsBySuppliers() {
            return this.$core.getCart.getCartItemsBySuppliers(this.cartItems);
        },
        suppliersList() {
            return this.$core.getCart.getSuppliersList(this.cartItems);
        },
        steps() {
            return [
                {
                    id: '01',
                    name: this.$t('checkout.breadcrumb.basketHeading'),
                    description: this.$t('checkout.breadcrumb.basketDescription'),
                    href: '/checkout/shopping-cart',
                    status: 'current',
                },
                {
                    id: '02',
                    name: this.$t('checkout.breadcrumb.billingHeading'),
                    description: this.$t('checkout.breadcrumb.billingDescription'),
                    href: '/checkout/billing',
                    status: 'upcoming',
                },
                {
                    id: '03',
                    name: this.$t('checkout.breadcrumb.shippingHeading'),
                    description: this.$t('checkout.breadcrumb.shippingDescription'),
                    href: '/checkout/shipping',
                    status: 'upcoming',
                },
                {
                    id: '04',
                    name: this.$t('checkout.breadcrumb.paymentHeading'),
                    description: this.$t('checkout.breadcrumb.paymentDescription'),
                    href: '/checkout/payment',
                    status: 'upcoming',
                },
                {
                    id: '05',
                    name: this.$t('checkout.breadcrumb.confirmationHeading'),
                    description: this.$t('checkout.breadcrumb.confirmationDescription'),
                    href: '/checkout/order-validation',
                    status: 'upcoming',
                },
            ];
        },
    },
    methods: {
        handleToBilling() {
            this.$core.useCart.checkCartStock(this.cartItems)
                ? this.$router.push(this.localePath('/checkout/billing'))
                : this.$toast.error(this.$t('notification.product.stockError'));
        },
        handleBackToShop() {
            this.$router.push(this.localePath('/'));
        },
    },
    data() {
        return {
            increment: 1,
        };
    },
    watch: {
        cartItems: {
            handler() {
                this.increment += 1;
            },
            deep: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-shipping-layout {
    width: 100%;
    background: #ffffff;
    margin-left: auto;
    margin-right: auto;
    padding-top: 24px;
    padding-bottom: 24px;

    @media (min-width: 640px) {
        padding-left: 24px;
        padding-right: 24px;
    }

    @media (min-width: 1024px) {
        padding-left: 48px;
        padding-right: 48px;
    }

    .column {
        @media (max-width: 740px) {
            flex-direction: column;
        }
    }
}
</style>
