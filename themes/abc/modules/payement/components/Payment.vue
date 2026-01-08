<template>
    <div class="dj-checkout ps-section--shopping">
        <div class="dj-shipping-layout">
            <DjSteps class="hidden-on-mobile" />

            <div class="dj-section__content">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div class="dj-block--shipping">
                            <DjCard headerColor="transparent" :slotHeader="true" classCss="dj-payment-card">
                                <template #title>
                                    <div class="title__h4 dj-payment-title">
                                        {{ $t('checkout.payment.paymentMethods') }}
                                    </div>
                                </template>
                                <div class="dj-payment-methods">
                                    <!-- Adyen Payment Container -->
                                    <template v-if="paymentEnabled">
                                        <v-skeleton-loader
                                            v-if="!adyenInstance"
                                            type="article, list-item-three-line, list-item-three-line"
                                        />
                                        <div class="dj-payment-method-right">
                                            <div id="adyen-container" />
                                        </div>
                                    </template>
                                </div>
                            </DjCard>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <ModuleOrderSummary :shipping="true" :deliveryFees="totalDeliveryFees">
                            <div @click="submitOrder">
                                <DjButton
                                    :text="!isLoading ? 'Valider la commande' : 'En cours de creation'"
                                    shape="button"
                                    variant="contained"
                                    :fullWidth="true"
                                    :isLoading="isLoading"
                                />
                            </div>
                            <v-dialog v-model="dialog" width="500">
                                <div class="bg-white">
                                    <div class="bg-grey text-center py-4 font-700 size-16">
                                        {{ $t('checkout.shipping.chooseYourShippingAddress') }}
                                    </div>
                                    <div class="px-2 pt-6 pb-4 text-center">
                                        {{ $t('checkout.shipping.messageBeforeContinue') }}
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="d-flex justify-content-end px-4 pb-2">
                                        <div @click="dialog = false">
                                            <DjButton text="OK" shape="button" variant="contained" />
                                        </div>
                                    </div>
                                </div>
                            </v-dialog>
                            <div v-if="failedPayment" class="dj-payment-error-card">
                                <div class="dj-payment-error-card-header">
                                    <img
                                        class="dj-payment-error-card-icon"
                                        src="@assets/images/warning-icon.svg"
                                        alt="warning-icon"
                                    />
                                    <span class="dj-payment-error-card-title">{{
                                        $t('checkout.payment.errors.alert.title')
                                    }}</span>
                                </div>
                                <div class="dj-payment-error-card-text">
                                    <span @click="retryPayment">{{ $t('checkout.payment.retry') }}</span>
                                    {{ $t('checkout.payment.errors.alert.description') }}
                                </div>
                            </div>
                        </ModuleOrderSummary>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleOrderSummary from '@modules/payement/components/modules/ModuleOrderSummary.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import { mapGetters, mapState } from 'vuex';
import { AdyenCheckout, Dropin } from '@adyen/adyen-web/auto';
import '@adyen/adyen-web/styles/adyen.css';

export default {
    name: 'PaymentModule',
    components: {
        DjButton,
        ModuleOrderSummary,
        DjSteps,
        DjCard,
    },
    data() {
        return {
            order: null,
            isLoading: false,
            currentIPAddress: '',
            errorMsg: '',
            failedPayment: false,
            origin: 'CART',
            originId: null,
            paymentEnabled: this.$config.bankTransfert,
            adyenInstance: null,
            adyenCheckout: null,
            deliveryFeesBySuppliers: {},
            cartItems: [],
            dialog: false,
        };
    },
    computed: {
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
        }),
        ...mapState({
            cartInformations: (state) => state.cart_b2b.cartInformations,
        }),
        totalDeliveryFees() {
            return Object.values(this.deliveryFeesBySuppliers).reduce((acc, value) => acc + value, 0);
        },
        browserInfo() {
            return {
                acceptHeader: '*/*',
                colorDepth: window.screen.colorDepth,
                javaEnabled: false,
                javaScriptEnabled: true,
                language: navigator.language || navigator.userLanguage,
                screenHeight: window.screen.height,
                screenWidth: window.screen.width,
                timeZoneOffset: new Date().getTimezoneOffset(),
                userAgent: navigator.userAgent,
            };
        },
        defaultAdyenConfiguration() {
            return {
                clientKey: this.$config.payment.adyen.clientKey,
                environment: this.$config.payment.adyen.environment,
                locale: 'fr-FR',
                countryCode: 'FR',
                onAdditionalDetails: this.handleAdyenAdditionalDetails,
                onPaymentCompleted: this.handlePaymentCompleted,
                onPaymentFailed: this.handlePaymentFailed,
                onError: this.handleAdyenError,
            };
        },
    },
    async mounted() {
        this.getCurrentIpAddress();

        if (this.$route.query) {
            this.originId = this.$route.query.quoteId;
            this.origin = this.$route.query.origin || 'CART';
            this.supplier = this.$route.query.supplier;
        }

        const cartDetails = await this.$purjus.useCartv2.getLines(this.cart.id);
        this.cartItems = cartDetails.cartLines;
        const productItemsOnly = this.cartItems.filter((item) => item.productVariant.id !== 'FDL');
        this.deliveryFeesBySuppliers =
            await this.$purjus.abc.useAbcDeliveryFeesHelper.getTotalDeliveryFees(productItemsOnly);

        await this.getOrder();

        if (this.paymentEnabled) {
            if (this.$route.query.redirectResult) {
                const checkout = await AdyenCheckout(this.defaultAdyenConfiguration);

                const redirectResult = this.$route.query.redirectResult;
                checkout.submitDetails({ details: { redirectResult } });
                return;
            }

            await this.createOrderAndInitializeAdyen();
        }
    },
    methods: {
        async getOrder() {
            const orderId = this.cart.id;
            const idType = 'CART_ID';

            this.order = await this.$core.useOrder.getCommercialOrderbyid(orderId, idType);
        },
        handleAdyenSubmit(reference) {
            return async (state, _, actions) => {
                try {
                    this.isLoading = true;

                    const result = await this.makePaymentsCall(state.data, reference);

                    if (!result?.resultCode) {
                        actions.reject();
                        return;
                    }

                    // Gestion des refus de paiement
                    const errorMessages = {
                        CANCELLED: 'Votre paiement n’a pas abouti. Veuillez ré-essayer.',
                        ERROR: 'Votre paiement n’a pas abouti. Veuillez ré-essayer.',
                        REFUSED: 'Votre paiement a été refusé. Veuillez contacter votre banque.',
                    };

                    if (['CANCELLED', 'ERROR', 'REFUSED'].includes(result.resultCode)) {
                        this.errorMsg = errorMessages[result.resultCode] || 'Une erreur est survenue.';
                        this.failedPayment = true;
                        actions.reject();
                        return;
                    }

                    if (result.action?.type === 'bankTransfer') {
                        this.handlePaymentCompleted(false);
                    }

                    actions.resolve(result);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error('Payment submission failed:', error);
                    this.$toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
                    actions.reject();
                }
            };
        },
        async getCurrentIpAddress() {
            const ipAddress = await this.$core.useHelper.getIpAddress();

            this.currentIPAddress = ipAddress?.ip ?? '';
        },
        submitOrder() {
            if (this.isLoading) return;
            try {
                this.adyenInstance.submit();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Order submission failed:', error);
                this.$toast.error(this.$t('notification.createOrder.error'));
            }
        },
        async createOrderAndInitializeAdyen() {
            const totalOrderPriceInCents = Math.round(this.order?.orderLogisticPrices?.totalPriceWithTax * 100);

            if (!this.order) {
                this.$toast.error(this.$t('checkout.payment.orderCreationError'));
                return;
            }

            const { adyenPaymentMethods, enableCreditCardStorage } = await this.getPaymentMethods(this.order.reference);

            if (adyenPaymentMethods.storedPaymentMethods?.length > 0) {
                const promises = adyenPaymentMethods.storedPaymentMethods.map((method) =>
                    this.deleteTokenizedPayment(method.id),
                );

                await Promise.all(promises);
            }

            await this.initializeAdyen(this.order.reference, totalOrderPriceInCents, enableCreditCardStorage);
        },
        async initializeAdyen(reference, totalOrder, enableCreditCardStorage) {
            try {
                const cardConfiguration = {
                    hasHolderName: true,
                    holderNameRequired: true,
                    enableStoreDetails: enableCreditCardStorage,
                };

                const { adyenPaymentMethods } = await this.getPaymentMethods(reference);

                const configuration = {
                    amount: {
                        value: totalOrder, // value qui ne sert qu'a filtré les moyens de paiement
                        currency: 'EUR',
                    },
                    paymentMethodsResponse: adyenPaymentMethods,
                    showPayButton: false,
                    onSubmit: this.handleAdyenSubmit(reference),
                    ...this.defaultAdyenConfiguration,
                };

                const bankTransferConfiguration = {
                    showEmailAddress: false,
                };

                const dropinConfiguration = {
                    paymentMethodsConfiguration: {
                        card: cardConfiguration,
                        bankTransfer_IBAN: bankTransferConfiguration,
                    },
                    showStoredPaymentMethods: enableCreditCardStorage,
                    enableStoreDetails: enableCreditCardStorage,
                };

                this.adyenCheckout = await AdyenCheckout(configuration);

                this.adyenInstance = new Dropin(this.adyenCheckout, dropinConfiguration).mount('#adyen-container');
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to initialize Adyen:', error);
                this.$toast.error(this.$t('checkout.payment.adyenInitError'));
            }
        },
        async handleAdyenAdditionalDetails(state, _, actions) {
            try {
                const result = await this.makeDetailsCall(state.data);

                if (!result.resultCode || result.resultCode === 'REFUSED') {
                    actions.reject();
                    return;
                }

                actions.resolve(result);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Additional details handling failed:', error);
                actions.reject();
            }
        },
        async handlePaymentCompleted(showToast = true) {
            try {
                if (showToast) {
                    this.$toast.success(this.$t('checkout.payment.success'));
                }

                const randomHex = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join(
                    '',
                );

                await this.$purjus.useCartv2.createCart(`cart-${randomHex}`);

                this.$store.commit('purjus/cartv2/setCartDetails', {
                    cartDetails: {
                        cartLines: [],
                        page: 0,
                        size: 20,
                        totalElement: 0,
                    },
                });

                this.$store.dispatch('purjus/cartv2/retrieveCarts');

                this.$router.push(this.localePath('/checkout/order-validation?orderCommercialId=' + this.order.id));
            } catch (e) {
                this.$toast.error(this.$t('checkout.payment.error'));
            } finally {
                this.isLoading = false;
            }
        },
        handlePaymentFailed(_result, _component) {
            this.errorMsg = this.$t('checkout.payment.error');
            this.failedPayment = true;
            this.isLoading = false;
        },
        handleAdyenError(error) {
            // eslint-disable-next-line no-console
            console.error('Adyen error:', error);
            this.$toast.error(this.$t('checkout.payment.error'));
        },
        async getPaymentMethods(reference) {
            try {
                const response = await this.$core.usePay.getPaymentMethods({
                    reference,
                    countryCode: 'FR',
                    locale: 'fr-FR',
                });

                if (!response) {
                    throw new Error('Failed to fetch payment methods');
                }

                return {
                    ...response,
                    adyenPaymentMethods: JSON.parse(response.adyenPaymentMethods),
                };
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to get payment methods:', error);
                throw error;
            }
        },
        async makePaymentsCall(paymentMethodData, reference) {
            let browserInfo = paymentMethodData?.browserInfo;

            if (!browserInfo) browserInfo = this.browserInfo;

            try {
                const params = {
                    browserInfo,
                    customerUserIP: this.currentIPAddress, // Replaced by the back office
                    paymentMethodData: paymentMethodData.paymentMethod,
                    reference,
                    storePaymentMethod: true,
                    returnPath: '/checkout/payment',
                    countryCode: 'FR',
                };

                const response = await this.$core.usePay.initPayment(params);

                if (response?.action?.type === 'bankTransfer') {
                    this.$store.commit('pay/setBeneficiary', response.action.beneficiary);
                    this.$store.commit('pay/setIban', response.action.iban);
                    this.$store.commit('pay/setBic', response.action.bic);
                    this.$store.commit('pay/setReference', reference);
                    this.$store.commit('pay/setTotalAmount', response.action.totalAmountValue);
                }

                if (!response) throw new Error('Payment initialization failed');

                return response;
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Payment initialization failed: ', error);
                this.$toast.error(this.$t('checkout.payment.initError'));
            }
        },
        async makeDetailsCall(data) {
            const requestBody = {
                details: data.details,
            };
            const response = await this.$core.usePay.paymentDetailsCall(requestBody);
            if (!response) {
                throw new Error('Network response was not ok');
            }

            return response;
        },
        async deleteTokenizedPayment(storedPaymentId) {
            await this.$core.usePay.deleteTokenizedPayment(storedPaymentId);
        },
        retryPayment() {
            this.$emit('retryPayment');
        },
    },
};
</script>
<style lang="scss">
@import 'themes/abc/modules/payement/assets/adyen.scss';
</style>

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
    .dj-payment-card {
        padding: 0;
        box-shadow: none;

        .dj-shipping-layout {
            background: transparent;
        }

        .dj-payment-title {
            font-family: var(--font-1st);
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            color: #040037;
        }

        .dj-payment-methods {
            border-radius: 8px !important;
            background: #fff !important;
            padding: 0px;
            margin-bottom: 4px;
            gap: 28px;
            width: 100%;

            .dj-payment-method-right {
                padding: 0px;
                gap: 10px;
                width: 100%;
            }
        }

        .payment-condition {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            padding: 0px;
            gap: 14px;

            .condition-text {
                font-family: var(--font-1st);
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 16px;
                color: #000000;
            }
        }
    }
    .dj-payment-error-card {
        display: flex;
        padding: 8px 16px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-top: 24px;
        gap: 8px;
        align-self: stretch;
        border-radius: 5px;
        background: rgba(239, 194, 189, 0.33);
        .dj-payment-error-card-header {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
        }

        .dj-payment-error-card-title {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
            color: #ce4736;
            font-family: var(--font-1st);
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        .dj-payment-error-card-icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
        }

        .dj-payment-error-card-text {
            color: #ce4736;
            font-family: var(--font-1st);
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}

.dj-payment-title {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #040037;
}

.dj-payment-methods {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin-bottom: 4rem;
    gap: 28px;
    width: 100%;

    @media (min-width: 640px) {
        flex-direction: row;
    }
}

.dj-payment-method-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
    width: 100%;
}

.dj-payment-method-right {
    padding: 0px;
    gap: 10px;
    width: 100%;
}

.method-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;
    gap: 20px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
}

.method-block-active {
    border: 2px solid var(--color-primary);
}

.method-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 10px;

    i {
        width: 60px;
        text-align: center;
        height: 42.06px;
        font-size: 20px;
    }
}

.method-text {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
}

.method-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;
}

.payment-condition {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 14px;
}

.condition-text {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
}

.pClass {
    font-size: 12px;
}
</style>
