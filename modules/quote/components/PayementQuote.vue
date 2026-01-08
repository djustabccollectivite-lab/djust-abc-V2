<template>
    <div class="dj-checkout ps-section--shopping">
        <div class="container">
            <div class="dj-section__header">
                <h1>{{ $t('checkout.payment.title') }} {{}}</h1>
            </div>
            <div class="dj-section__content">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div class="dj-block--shipping">
                            <div class="title__h4">
                                {{ $t('checkout.payment.billingAddress') }}
                            </div>
                            <div class="dj-block__panel">
                                <figure>
                                    {{ billingAdress }}
                                </figure>
                            </div>
                            <div class="title__h4">{{ $t('checkout.payment.shippingMethods') }}</div>
                            <div class="dj-block__panel">
                                <figure>
                                    <small>
                                        {{ $t('checkout.payment.internationalShipping') }}
                                    </small>
                                    <strong>$20.00</strong>
                                </figure>
                            </div>
                            <div class="title__h4">{{ $t('checkout.payment.paymentMethods') }}</div>
                            <payment-methods origin="SUPPLIER_QUOTE" :originId="quoteId" />
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <module-quote-summary :shipping="true" :supplier="supplier" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleQuoteSummary from '@modules/payement/components/modules/ModuleQuoteSummary.vue';
import PaymentMethods from '@modules/payement/components/modules/PaymentMethods.vue';
export default {
    name: 'PaymentQuote',
    components: { PaymentMethods, ModuleQuoteSummary },
    props: {
        supplier: {
            type: Object,
            default: () => {},
        },
        quoteId: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            billingAdress: '',
        };
    },
    created() {
        this.billingAdress = this.$core.getAddress.getFullAddress(this.supplier.billingAddress);
    },
};
</script>

<style lang="scss" scoped></style>
