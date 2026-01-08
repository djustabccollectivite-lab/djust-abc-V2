<template>
    <div class="dj-checkout ps-section--shopping">
        <div class="dj-shipping-layout">
            <DjSteps :steps="steps" />
            <div class="dj-section__content">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div class="dj-block--shipping">
                            <div class="dj-block__panel" v-for="cartItem in cartItems" :key="cartItem.id">
                                <shipping-cart-line
                                    v-if="shippingAddress"
                                    :cartItem="cartItem"
                                    :shippingAddress="shippingAddress"
                                    :key="1000 * cartItem.id + increment"
                                />
                            </div>
                            <div class="dj-block__footer">
                                <nuxt-link :to="localePath('/checkout/billing')">
                                    <a>
                                        <i class="icon-arrow-left mr-2"></i>
                                        {{ $t('checkout.shipping.return') }}
                                    </a>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 dj-block--checkout-order">
                        <module-order-summary :shipping="true">
                            <div @click="validAddress()" v-if="$core.usePayement.IsActive()">
                                <DjButton
                                    :text="$t('checkout.shipping.continue')"
                                    :styleButton="'primary'"
                                    :fullWidth="true"
                                    :isDisabled="isPaymentDisable"
                                ></DjButton>
                            </div>
                            <div class="dj-block__footer" @click="dialog = true" v-else>
                                <DjButton :text="'Valider Commande'" styleButton="primary" />
                                <v-dialog v-model="dialog" width="500">
                                    <v-card>
                                        <v-card-title class="headline grey lighten-2">
                                            {{ $t('checkout.shipping.confirmCommand') }}
                                        </v-card-title>
                                        <div class="pa-2">
                                            <p>
                                                {{ $t('cart.confirmCommand') }}
                                            </p>
                                        </div>
                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <a @click="validAddress()">
                                                <DjButton
                                                    :text="$t('checkout.orderValidation.confirmed')"
                                                    styleButton="primary"
                                                    size="small"
                                                    :fullWidth="true"
                                                />
                                            </a>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </module-order-summary>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ShippingCartLine from '@modules/checkout/components/modules/ShippingCartLine.vue';
import ModuleOrderSummary from '@modules/checkout/components/modules/ModuleOrderSummary.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';
export default {
    name: 'Shipping',
    components: { ModuleOrderSummary, ShippingCartLine, DjButton, DjLink, DjSteps },
    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            shippingAddress: (state) => state.user.addressShippingList,
            isPaymentDisable() {
                return (
                    this.cartItems.some((cartItem) => {
                        const totalDeliveryQuantity = cartItem.deliveryLines.reduce((total, deliveryLine) => {
                            return total + deliveryLine.quantity;
                        }, 0);
                        return totalDeliveryQuantity !== cartItem.quantity;

                    }) ||
                    this.cartItems.some((cartItem) => this.$core.getCart.getOfferStock(cartItem) <= 0) ||
                    this.cartItems.some(
                        (cartItem) =>
                            cartItem.offerInventory.externalSource === 'MIRAKL' &&
                            cartItem.deliveryLines.some((deliveryLine) => deliveryLine.selectedShippingType === null)
                    )
                );
            },
        }),
        steps() {
            return [
                {
                    id: '01',
                    name: this.$t('checkout.breadcrumb.basketHeading'),
                    description: this.$t('checkout.breadcrumb.basketDescription'),
                    href: '/checkout/shopping-cart',
                    status: 'complete',
                },
                {
                    id: '02',
                    name: this.$t('checkout.breadcrumb.billingHeading'),
                    description: this.$t('checkout.breadcrumb.billingDescription'),
                    href: '/checkout/billing',
                    status: 'complete',
                },
                {
                    id: '03',
                    name: this.$t('checkout.breadcrumb.shippingHeading'),
                    description: this.$t('checkout.breadcrumb.shippingDescription'),
                    href: '/checkout/shipping',
                    status: 'current',
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

    data() {
        return {
            dialog: false,
            increment: 1,
        };
    },

    methods: {
        async validAddress() {
            if (this.$core.usePayement.IsActive()) {
                let validationAddress = true;
                this.$store.state.cart.cartItems.forEach((item) => {
                    item.deliveryLines.forEach((deliveryLine) => {
                        if (deliveryLine.addressId === null) {
                            validationAddress = false;
                        }
                    });
                });
                let validationQuantity = true;
                let validationStock = true;
                this.$store.state.cart.cartItems.forEach((item) => {
                    item.deliveryLines.forEach((deliveryLine) => {
                        if (deliveryLine.quantity <= 0) {
                            validationQuantity = false;
                        }
                        if (deliveryLine.quantity > item.offerInventory.stock) {
                            validationStock = false;
                        }
                    });
                });

                if (validationAddress && validationQuantity && validationStock) {
                    this.$core.useCart.validAddress();
                    this.$router.push(this.localePath('/checkout/payment'));
                } else
                    this.$toast.error(
                        validationAddress
                            ? this.$t('checkout.shipping.alertMessageQuantity')
                            : this.$t('checkout.shipping.alertMessageAddress')
                    );
            } else {
                let origin = 'CART';
                let originId = this.$store.state.cart.cartId;
                await this.$core.useCart.validAddress().then(async () => {
                    const submit = await this.$core.useCart.createOrder(origin, originId);
                    if (submit) {
                        this.$router.push(this.localePath('/checkout/order-validation'));
                    } else {
                        this.$toast.error(this.$t('notification.shipping.errorOrder'));
                    }
                });
            }
        },
    },
    watch: {
        cartItems: {
            handler() {
                this.increment += 1;
            },
            deep: true,
        },
    },
    beforeMount() {
        this.$core.useUser.getUserShippingAddressList();
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
}
.bg-white {
    background-color: #ffffff;
}
.dj-shipping {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 4rem;
    padding-bottom: 6rem;
    max-width: 42rem;

    @media (min-width: 640px) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

    @media (min-width: 1024px) {
        padding-left: 2rem;
        padding-right: 2rem;
        max-width: 80rem;
    }
    .dj-shipping--content {
        margin-top: 3rem;
        @media (min-width: 1024px) {
            display: grid;
            align-items: flex-start;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            column-gap: 3rem;
        }
        @media (min-width: 1280px) {
            column-gap: 4rem;
        }
    }
    .dj-shipping-left {
        @media (min-width: 1024px) {
            grid-column: span 7 / span 7;
        }
        .list-products {
            border-top-width: 1px;
            border-bottom-width: 1px;
            border-color: #e5e7eb;
            .item-product {
                display: flex;
                padding-top: 1.5rem;
                padding-bottom: 1.5rem;

                @media (min-width: 640px) {
                    padding-top: 2.5rem;
                    padding-bottom: 2.5rem;
                }
                .product-image {
                    flex-shrink: 0;
                    img {
                        object-fit: cover;
                        object-position: center;
                        width: 6rem;
                        height: 6rem;
                        border-radius: 0.375rem;

                        @media (min-width: 640px) {
                            width: 12rem;
                            height: 12rem;
                        }
                    }
                }
                .product-info {
                    display: flex;
                    margin-left: 1rem;
                    flex-direction: column;
                    flex: 1 1 0%;
                    justify-content: space-between;

                    @media (min-width: 640px) {
                        margin-left: 1.5rem;
                    }
                    .product-info-content {
                        position: relative;
                        padding-right: 2.25rem;
                        @media (min-width: 640px) {
                            display: grid;
                            padding-right: 0;
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                            column-gap: 1.5rem;
                        }
                        .product-title {
                            display: flex;
                            justify-content: space-between;
                            h3,
                            .title__h3 {
                                font-size: 0.875rem;
                                line-height: 1.25rem;
                                a {
                                    color: #374151;
                                    font-weight: 500;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
