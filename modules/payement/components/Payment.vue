<template>
    <div class="dj-checkout ps-section--shopping">
        <div class="dj-shipping-layout">
            <DjSteps :steps="steps" />

            <div class="dj-section__content">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div class="dj-block--shipping">
                            <DjCard headerColor="#FFFFFF">
                                <template #title>
                                    <div class="title__h4 dj-payment-title">
                                        {{ $t('checkout.payment.paymentMethods') }}
                                    </div>
                                </template>

                                <div class="dj-payment-methods">
                                    <div class="dj-payment-method-left">
                                        <div
                                            class="method-block"
                                            :class="selectedMethod == paymentVisa.code ? 'method-block-active' : null"
                                        >
                                            <div class="method-header">
                                                <span class="method-text">
                                                    {{ paymentVisa.title }}
                                                </span>

                                                <div>
                                                    <i class="icon-credit-card"></i>
                                                </div>
                                            </div>

                                            <p class="pClass">({{ $t('checkout.payment.immediate') }})</p>

                                            <div class="method-btn" @click="selectedMethod = paymentVisa.code">
                                                <DjButton
                                                    :text="$t('checkout.payment.choose')"
                                                    :fullWidth="true"
                                                    styleButton="primary"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="bankTransfert" class="dj-payment-method-right">
                                        <div
                                            class="method-block"
                                            :class="
                                                selectedMethod == paymentVirement.code ? 'method-block-active' : null
                                            "
                                        >
                                            <div class="method-header">
                                                <span class="method-text">{{ paymentVirement.title }}</span>

                                                <div>
                                                    <i class="icon-cash-euro"></i>
                                                </div>
                                            </div>

                                            <p class="pClass">({{ $t('checkout.payment.bankTransferDelay') }})</p>

                                            <div class="method-btn" @click="selectedMethod = paymentVirement.code">
                                                <DjButton
                                                    style="border-radius: 4px !important"
                                                    :text="$t('checkout.payment.choose')"
                                                    :fullWidth="true"
                                                    styleButton="primary"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        v-if="bankTransfert && paymentType === 'DUE_DATE'"
                                        class="dj-payment-method-right"
                                    >
                                        <div
                                            class="method-block"
                                            :class="
                                                selectedMethod == paymentVirementDueDate.code
                                                    ? 'method-block-active'
                                                    : null
                                            "
                                        >
                                            <div class="method-header">
                                                <span class="method-text">{{ paymentVirementDueDate.title }}</span>
                                                <div>
                                                    <i class="icon-cash-euro"></i>
                                                </div>
                                            </div>

                                            <p>({{ $t('checkout.payment.dueDate') }})</p>

                                            <div
                                                class="method-btn"
                                                @click="selectedMethod = paymentVirementDueDate.code"
                                            >
                                                <DjButton
                                                    style="border-radius: 4px !important"
                                                    :text="$t('checkout.payment.choose')"
                                                    :fullWidth="true"
                                                    styleButton="primary"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="noPaymentDemo" class="dj-payment-method-right">
                                        <div
                                            class="method-block"
                                            :class="selectedMethod == nopayment.code ? 'method-block-active' : null"
                                        >
                                            <div class="method-header">
                                                <span class="method-text">{{ nopayment.title }}</span>
                                                <div>
                                                    <i class="icon-cash-euro"></i>
                                                </div>
                                            </div>

                                            <p>({{ $t('checkout.payment.immediate') }})</p>

                                            <div class="method-btn" @click="selectedMethod = nopayment.code">
                                                <DjButton
                                                    style="border-radius: 4px !important"
                                                    :text="$t('checkout.payment.choose')"
                                                    :fullWidth="true"
                                                    styleButton="primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="payment-condition">
                                    <v-checkbox v-model="ccv">
                                        <template v-slot:label>
                                            <div class="condition-text">
                                                {{ $t('checkout.payment.iAcceptCgu') }}
                                                <a
                                                    @click.prevent="downloadFile(cgu, 'CGU')"
                                                    href="#"
                                                    style="color: var(--color-primary)"
                                                >
                                                    {{ $t('checkout.payment.cgu') }}
                                                </a>
                                            </div>
                                        </template>
                                    </v-checkbox>
                                </div>
                            </DjCard>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <ModuleQuoteSummary
                            :displayPaymentButton="true"
                            :paymentButtonDisabled="buttonPaymentDisabled || !selectedMethod || !ccv"
                            :shipping="true"
                            v-if="origin === 'SUPPLIER_QUOTE'"
                            :supplier="supplier"
                        >
                            <div @click.once.prevent="submitOrder">
                                <DjButton
                                    :isDisabled="buttonPaymentDisabled || !selectedMethod || !ccv"
                                    :text="$t('checkout.payment.submit')"
                                    :styleButton="'primary'"
                                    :fullWidth="true"
                                />
                            </div>
                        </ModuleQuoteSummary>

                        <ModuleOrderSummary :shipping="true" v-else>
                            <div @click.once.prevent="submitOrder">
                                <DjButton
                                    :isDisabled="buttonPaymentDisabled || !selectedMethod || !ccv"
                                    :text="$t('checkout.payment.submit')"
                                    :styleButton="'primary'"
                                    :fullWidth="true"
                                />
                            </div>
                        </ModuleOrderSummary>

                        <div class="mt-5 p-5">
                            <ModulePromoCode v-if="promoCode" :validPromoCode="promoCode" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleOrderSummary from '@modules/payement/components/modules/ModuleOrderSummary.vue';
import ModuleQuoteSummary from '@modules/payement/components/modules/ModuleQuoteSummary.vue';
import ModulePromoCode from '@modules/payement/components/modules/ModulePromoCode.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'Payment',
    components: {
        DjButton,
        ModuleOrderSummary,
        ModuleQuoteSummary,
        ModulePromoCode,
        DjSteps,
        DjCard,
    },
    data() {
        return {
            origin: 'CART',
            originId: null,
            ccv: false,
            cgu: null,
            supplier: {},
            buttonPaymentDisabled: false,
            bankTransfert: this.$config.bankTransfert,
            noPaymentDemo: this.$config.noPaymentDemo,
            account: null,
            promoCode: null,
            paymentType: '',
            paymentVisa: {
                id: 1,
                title: this.$t('checkout.payment.creditCard'),
                code: 'CREDIT_CARD',
            },
            paymentVirement: {
                id: 2,
                title: this.$t('checkout.payment.bankTransfer'),
                code: 'BANK_WIRE',
            },
            paymentVirementDueDate: {
                id: 3,
                title: this.$t('checkout.payment.bankTransfer'),
                code: 'BANK_WIRE_ON_DUE_DATE',
            },
            noPayment: {
                id: 3,
                title: this.$t('checkout.payment.bankTransfer'),
                code: 'NO_PAYMENT',
            },
            selectedMethod: null,
            paymentProvider: ''
        };
    },
    computed: {
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
                    status: 'complete',
                },
                {
                    id: '04',
                    name: this.$t('checkout.breadcrumb.paymentHeading'),
                    description: this.$t('checkout.breadcrumb.paymentDescription'),
                    href: '/checkout/payment',
                    status: 'current',
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
    async created() {
        if (this.$route.query) {
            this.originId = this.$route.query.quoteId;
            this.origin = this.$route.query.origin ? this.$route.query.origin : 'CART';
            this.supplier = this.$route.query.supplier;
        }
        this.cgu = await this.$core.useStoryblok.getCguFile();
        this.account = await this.$core.useUser.getCustomerAccount();
        this.paymentType = this.account.paymentType;
        this.promoCode = this.account.customFieldValues.filter(
            (customField) => customField.customField.externalId === 'codepromo_client'
        )[0]?.value.value;
    },
    methods: {
        async submitOrder() {
            if (this.$config.webhelp && this.$store.state.cart.cartItems.length !== 0) {
                this.buttonPaymentDisabled = true;
                //With webhelp
                const result1 = await this.$core.useCart.createOrderWithPayment(
                    this.origin,
                    this.originId,
                    this.selectedMethod
                );
                if (result1 && this.selectedMethod === 'CREDIT_CARD') {
                    const result2 = await this.$core.useOrder.getPaymentUrl(result1.id, this.selectedMethod, this.paymentProvider);
                    window.location.href = result2;
                } else if (
                    (result1 && this.selectedMethod === 'BANK_WIRE') ||
                    this.selectedMethod === 'BANK_WIRE_ON_DUE_DATE'
                ) {
                    this.$router.push(
                        this.localePath('/checkout/order-validation?returnType=succes&orderCommercialId=' + result1.id)
                    );
                } else {
                    this.$toast.error(this.$t('notification.createOrder.error'));
                    this.buttonPaymentDisabled = false;
                }
            } else {
                //Without Webhelp
                if (this.$store.state.cart.cartItems.length !== 0 || this.$store.state.quote.selectedQuote) {
                    const result = await this.$core.useCart.createOrder(this.origin, this.originId);
                    this.buttonPaymentDisabled = true;

                    if (result) {
                        this.$router.push(this.localePath('/checkout/order-validation'));
                    } else {
                        this.buttonPaymentDisabled = true;
                        this.$notify({
                            group: 'error',
                            title: '',
                            text: result,
                        });
                    }
                } else {
                    this.$toast.error(this.$t('cart.emptyCart'));
                    this.$router.push(this.localePath('/'));
                }
            }
        },
        downloadFile(url, filename) {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'media-type',
            };
            const proxyUrl = 'https://s3.amazonaws.com/';
            const cleanedUrl = url ? url.replace('https://', '') : null;
            const UrlWithProxy = proxyUrl + cleanedUrl;
            fetch(UrlWithProxy, { headers: headers, method: 'GET' }).then(function (t) {
                return t.blob().then((b) => {
                    let a = document.createElement('a');
                    a.href = URL.createObjectURL(b);
                    a.setAttribute('download', filename);
                    a.click();
                });
            });
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
