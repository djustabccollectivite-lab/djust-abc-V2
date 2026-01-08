<template>
    <div v-if="quotes" class="tab-content">
        <div class="title__h3 dj-quote__title">{{ $t('account.quotes.pendingQuote') }}</div>
        <v-tabs
            v-model="tabsToShow"
            background-color="tansparent"
            center-active
            active-class="order__active"
            class="tabs__order"
            style="overflow: hidden"
        >
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab v-for="quote in quotes" :key="quote.id">
                {{ $core.getQuote.getQuoteName(quote) }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabsToShow">
            <v-tab-item v-for="(quote, indexOfTab) in quotes" :key="quote.id">
                <div class="dj-section__content_invoices">
                    <div class="title__h4 dj-section__content_invoices__title">1. {{ $t('account.quotes.step1') }}</div>
                    <v-expand-transition>
                        <div class="table-responsive">
                            <table v-if="TestLoading === false" class="table dj-table--responsive dj-table--quotes">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{{ $t('account.quotes.product') }}</th>
                                        <th>{{ $t('account.quotes.suppliers') }}</th>
                                        <th>{{ $t('account.quotes.quantity') }}</th>
                                        <th>{{ $t('account.quotes.shippingAddress') }}</th>
                                        <th>{{ $t('account.quotes.actions') }}</th>
                                    </tr>
                                </thead>
                                <tbody
                                    v-for="(quoteLine, index) in $core.getQuote.getMasterQuoteLines(quote)"
                                    :key="index"
                                >
                                    <TableQuoteLineItem
                                        :key="index"
                                        :quoteLine="quoteLine"
                                        :indexOfTab="indexOfTab"
                                        :item="quote"
                                    />
                                </tbody>
                            </table>
                            <loading v-else />
                        </div>
                    </v-expand-transition>
                    <div class="title__h4 dj-section__content_invoices__title">2. {{ $t('account.quotes.step2') }}</div>
                    <v-expand-transition>
                        <v-select
                            v-model="selectedBillingAddress"
                            :items="billingAddress"
                            label="Billing Address"
                            item-text="name"
                            item-value="id"
                            solo
                        ></v-select>
                    </v-expand-transition>
                    <div class="title__h4 dj-section__content_invoices__title">
                        3. {{ $t('account.quotes.step3Creation') }}
                    </div>
                    <v-expand-transition>
                        <v-textarea
                            v-model="comments"
                            solo
                            name="input-7-4"
                            :label="$t('account.quotes.step3message')"
                        ></v-textarea>
                    </v-expand-transition>
                </div>
                <div class="d-flex justify-end align-item-center">
                    <ButtonDeleteQuote :MasterquoteId="quote.id" styleB="button" class="mr-4" />
                    <ButtonValidateQuote
                        styleB="button"
                        :billingAddress="selectedBillingAddress"
                        :masterquote="quote"
                        :comments="comments"
                    />
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonValidateQuote from '@modules/quote/components/modules/ButtonValidateQuote.vue';
import ButtonDeleteQuote from '@modules/quote/components/modules/ButtonDeleteQuote.vue';
import TableQuoteLineItem from '@modules/quote/components/modules/TableQuoteLineItem.vue';
import Loading from '@components/atoms/DjLoading/DjLoading.vue';

export default {
    name: 'CreationQuote',
    components: {
        ButtonValidateQuote,
        ButtonDeleteQuote,
        TableQuoteLineItem,
        Loading,
    },
    props: {
        item: {
            type: Object,
            require: false,
            default: () => {},
        },
        quotes: {
            type: Array,
            default: () => [],
        },
        quoteToShow: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            step1: false,
            step2: false,
            step3: false,
            skus: [],
            products: [],
            masterQuotes: [],
            selectedBillingAddress: '',
            TestLoading: true,
            comments: '',
            tabsToShow: 0,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        shippingAddress() {
            return this.$store.state.user.addressShippingList;
        },
        billingAddress() {
            if (this.$store.state.user.addressBillingList) {
                const map = this.$store.state.user.addressBillingList.map((res) => ({
                    name: this.$core.getAddress.getFullAddress(res),
                    id: res.id,
                }));
                return map;
            }
            return null;
        },
    },
    async created() {
        this.tabsToShow = this.quoteToShow;
        await this.$core.useUser.getUserBillingAddressList();
        await this.$core.useUser.getUserShippingAddressList();
        if (this.billingAddress) {
            this.selectedBillingAddress = this.billingAddress[0]?.id;
        }
        this.products = await this.$core.useThumbnails.getFeatureProducts({ productSku: this.skus });
        if (this.products) {
            setTimeout(
                function () {
                    this.TestLoading = false;
                }.bind(this),
                150,
            );
        }
    },
    methods: {
        findProduct(QuoteLine) {
            if (QuoteLine) {
                return this.products.find(
                    (e) => e.product.sku === this.$core.getProductVariant.getProductSku(QuoteLine.productVariant),
                );
            } else {
                return null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.ps-fastorder .dj-section__content {
    padding: 20px;
    background-color: #fff;
}

.fast-order__form .row label {
    display: none;
}

.fast-order__form .row:first-child label {
    display: block;
}

.quote-enter-active,
.quote-leave-active {
    transition: opacity 0.5s;
}
.quote-enter,
.quote-leave-active {
    opacity: 0;
}

.v-input::v-deep {
    .v-input__control .v-input__slot {
        box-shadow: none !important;
        background: var(--background-global);
        border-radius: 8px;
        padding: 12px 16px !important;
        .v-select__selections {
            line-height: normal;
            .v-select__selection--comma {
                margin: 0;
                font-size: 16px;
                line-height: 24px;
            }
        }
    }
}

.dj-table--quotes::v-deep {
    border-collapse: separate;
    border-spacing: 0 16px;
    td {
        border: 0;
    }
    thead tr th {
        text-align: left;
        padding: 0 8px;
        color: var(--color-body-2);
        font-size: 12px;
        line-height: 24px;
        font-weight: 500;
    }
    tbody tr {
        box-shadow: none;
        overflow: hidden;
        border: 0;
        td {
            background: var(--background-global);
            padding: 16px;
            vertical-align: inherit;
            border-top: 0;
            @media (min-width: 768px) {
                padding: 8px;
            }
            .v-text-field.v-text-field--solo .v-input__control {
                min-height: 32px;
                input {
                    padding: 0;
                }
            }
            .v-input__slot {
                margin: 0;
                box-shadow: none !important;
                border-radius: 16px;
                border: 1px solid var(--color-grey);
                background: transparent !important;
                font-size: 14px;
                line-height: 16px;
                padding: 0 16px !important;
            }
            .v-text-field__details {
                display: none;
            }
            .dj-product__small {
                padding: 0;
            }
            .dj-btn {
                font-size: 14px;
                line-height: 16px;
                &.dj-btn--light {
                    background: transparent;
                    &:hover {
                        color: var(--color-primary);
                    }
                }
            }
            &:first-child {
                border-radius: 8px 8px 0 0;
                width: 100%;
                display: flex;
                @media (min-width: 768px) {
                    width: 30px;
                    border-radius: 8px 0 0 8px;
                    display: table-cell;
                }
            }
            &:nth-last-child(2) {
                position: relative;
                padding: 8px 16px;
                &:before {
                    content: '';
                    background: radial-gradient(#d9d9d9, #d9d9d9 2px, transparent 3px, transparent);
                    background: radial-gradient(var(--color-grey), var(--color-grey) 2px, transparent 3px, transparent);
                    position: absolute;
                    width: calc(100% - 4px);
                    height: 10px;
                    background-size: 10px 100%;
                    max-width: 100%;
                    bottom: -4px;
                    z-index: 1;
                    right: -12px;
                    @media (min-width: 768px) {
                        background-size: 100% 10px;
                        width: 10px;
                        height: calc(100% - 4px);
                        right: -4px;
                        top: -2px;
                    }
                }
            }
            &:last-child {
                border-radius: 0 8px 8px 0;
                position: relative;
                padding: 16px;
                @media (min-width: 768px) {
                    padding: 8px 16px;
                }
                &:before {
                    left: -8px;
                    @media (min-width: 768px) {
                        top: -8px;
                    }
                }
                &:after {
                    right: -8px;
                    @media (min-width: 768px) {
                        bottom: -8px;
                    }
                }
                &:before,
                &:after {
                    content: '';
                    width: 16px;
                    height: 16px;
                    background: #ffffff;
                    position: absolute;
                    border-radius: 50%;
                    top: -10px;
                    z-index: 2;
                    @media (min-width: 768px) {
                        left: -10px;
                    }
                }
            }
        }
    }
}
</style>
