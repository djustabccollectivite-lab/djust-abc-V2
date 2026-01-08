<template>
    <div class="dj-checkout ps-section--shopping">
        <div class="dj-shipping-layout">
            <DjSteps :steps="steps" />
            <div class="dj-section__content">
                <div class="dj-form--checkout">
                    <div class="dj-form__content">
                        <div class="row">
                            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <FormCheckoutInformation @refresh="refresh" :key="increment" />
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                <ModuleOrderSummary>
                                    <div @click="handleToShipping">
                                        <button-ui
                                            :text="$t('checkout.billing.continueButton')"
                                            styleButton="primary"
                                            :fullWidth="true"
                                        />
                                    </div>
                                    <v-dialog v-model="dialog" width="500">
                                        <v-card>
                                            <v-card-title class="headline grey lighten-2">
                                                {{ $t('checkout.billing.shooseYoutBillingAddress') }}
                                            </v-card-title>
                                            <div class="pa-2">
                                                <p>
                                                    {{ $t('checkout.billing.messageBeforeContinue') }}
                                                </p>
                                            </div>
                                            <v-divider></v-divider>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <a @click="dialog = false"> </a>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </ModuleOrderSummary>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FormCheckoutInformation from '@modules/checkout/components/modules/FormCheckoutInformation.vue';
import ModuleOrderSummary from '@modules/checkout/components/modules/ModuleOrderSummary.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import ButtonUi from '@components/atoms/DjButton/DjButton.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';

export default {
    name: 'Checkout',
    components: { ModuleOrderSummary, FormCheckoutInformation, ButtonUi, DjButton, DjSteps },
    computed: {
        ...mapState({
            billingAddressSelected: (state) => state.cart.cartBillingAddressId,
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
                    status: 'current',
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
    data() {
        return {
            dialog: false,
            increment: 1,
        };
    },
    methods: {
        refresh() {
            this.increment++;
        },
        handleToShipping() {
            if (this.billingAddressSelected === null) {
                this.dialog = true;
            } else {
                this.$core.useCart.addBillingAddress();
                this.$router.push(this.localePath('/checkout/shipping'));
            }
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
}
h1 {
    text-align: center;
}
</style>
