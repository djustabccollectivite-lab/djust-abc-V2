<template lang="html">
        <section aria-labelledby="summary-heading" class="dj-order-summary">
        <div class="title-block">
            <h2 id="summary-heading" class="title-order-summary">{{ $t('account.orders.summary') }}</h2>
        </div>
        <div class="dj-order-summary-content">
            <figure class="dj-block__items">
                <nuxt-link
                        v-for="(quoteLine, index) in supplier.quoteLines"
                        :to="`/product/${quoteLine.productVariant.id}`"
                        :key="quoteLine.id"
                        class="mb-8 d-flex flex-column"
                    >
                        <ShoppingQuoteOrderSummaryItem :item="quoteLine" />
                    </nuxt-link>
            </figure>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.quotes.totalproductte') }}</span>
                </div>
                <span class="price-text" v-html="totalproductte"></span>
            </div>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.quotes.totalproducttax') }}</span>
                </div>
                <span class="price-text" v-html="totalproducttax"></span> 
            </div>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.quotes.totalshippingte') }}</span>
                </div>
                <span class="price-text" v-html="totalshippingte"></span> 
            </div>
            <div class="order-info">
                <div class="order-detail">
                    <span>{{ $t('account.quotes.totalshippingtax') }}</span>
                </div>
                <span class="price-text" v-html="totalshippingtax"></span> 
            </div>
            <div class="order-total">
                <span class="text">{{ $t('account.quotes.totalti') }}</span>
                <span class="price" v-html="totalti"></span>
            </div>
        </div>
        <div class="mt-6">
            <slot />
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import ShoppingQuoteOrderSummaryItem from '@modules/payement/components/modules/ShoppingQuoteOrderSummaryItem.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'ModuleQuoteSummary',
    components: { ShoppingQuoteOrderSummaryItem, DjButton },
    props: {
        shipping: {
            type: Boolean,
            default: false,
        },
        supplier: {
            type: Object,
            default: {},
        },
        displayPaymentButton: {
            type: Boolean,
            default: false,
        },
        paymentButtonDisabled: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        totalproductte() {
            return this.$core.getQuote.getSupplierQuoteTotalProductsNoTax(this.supplier, this.currency);
        },
        totalproducttax() {
            return this.$core.getQuote.getSupplierQuoteTotalProductsTax(this.supplier, this.currency);
        },
        totalshippingte() {
            return this.$core.getQuote.getSupplierQuoteTotalShippingNotTax(this.supplier, this.currency);
        },
        totalshippingtax() {
            return this.$core.getQuote.getSupplierQuoteTotalShippingTax(this.supplier, this.currency);
        },
        totalti() {
            return this.$core.getQuote.getSupplierQuoteTotalTax(this.supplier, this.currency);
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
            .price-text {
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
