<template>
    <div class="tab-content" v-if="quotes">
        <div class="title__h3 dj-quote__title">{{ $t('account.quotes.oldQuote') }}</div>
        <v-tabs background-color="tansparent" active-class="order__active" class="tabs__order" v-model="tabs"
            style="overflow: hidden" @change="supplierQuoteTab = 0">
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab v-for="itemQ in quotes" :key="parseInt(itemQ.id)">
                {{ $core.getQuote.getQuoteName(itemQ) }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
            <v-tab-item v-for="item in quotes" :key="parseInt(item.id)">
                <div v-if="item.supplierQuotes.length > 0">
                    <div class="title__h4 dj-section__content_invoices__title">
                        {{ $t('account.quotes.step3') }}
                    </div>
                </div>
                <div v-if="item.supplierQuotes.length > 0">
                    <v-tabs background-color="tansparent" active-class="order__active" class="tabs__order"
                        :value="supplierQuoteTab" style="overflow: hidden" show-arrows
                        v-if="item.supplierQuotes.length > 0">
                        <v-tabs-slider color="transparent"></v-tabs-slider>
                        <v-tab v-for="(supplierD, index) in item.supplierQuotes" :key="parseInt(supplierD.id)"
                            v-model="supplierQuoteTab" @change="updateTabs(index)">
                            {{ supplierD.supplier.name }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items :value="supplierQuoteTab">
                        <v-tab-item v-for="supplier in item.supplierQuotes" :key="parseInt(supplier.id)">
                            <div>
                                <div class="row">
                                    <v-col sm="6" cols="12" class="spacing">
                                        <v-card height="100%">
                                            <v-card-title>
                                                <div class="title__h4 dj-quotes__title">
                                                    {{ $t('account.quotes.statutOfYourquote') }}
                                                </div>
                                            </v-card-title>

                                            <v-card-text class="p-0">
                                                <TimelineQuote :status="supplier.status"></TimelineQuote>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="spacing">
                                        <v-card height="100%">
                                            <v-card-title>
                                                <div class="title__h4">{{ $t('account.quotes.quoteInformations') }}</div>
                                            </v-card-title>

                                            <v-card-text class="p-0">
                                                <ul class="dj-quote__list">
                                                    <li class="dj-quote__list__item">
                                                        <span>{{ $t('account.quotes.createdAt') }}</span>
                                                        <span class="dj-quote__list__item__label">{{
                                                            supplier.createdAt
                                                        }}</span>
                                                    </li>
                                                    <li class="dj-quote__list__item">
                                                        <span>
                                                            {{ $t('account.quotes.masterQuoteName') }}
                                                        </span>
                                                        <span class="dj-quote__list__item__label">{{ item.name }}</span>
                                                    </li>
                                                    <li class="dj-quote__list__item">
                                                        <span> {{ $t('account.quotes.supplierName') }}</span>
                                                        <span class="dj-quote__list__item__label">{{
                                                            supplier.supplier.name
                                                        }}</span>
                                                    </li>
                                                    <li class="dj-quote__list__item">
                                                        <span> {{ $t('account.quotes.NumberOfProducts') }}</span>
                                                        <span class="dj-quote__list__item__label">{{
                                                            supplier.quoteLines.length }}
                                                        </span>
                                                    </li>
                                                    <li class="dj-quote__list__item">
                                                        <span>{{ $t('account.quotes.status') }}</span>
                                                        <span class="dj-quote__list__item__label">
                                                            {{ $core.getQuote.getStatusQuote(supplier.status) }}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col sm="12" cols="12" class="spacing">
                                        <v-card height="100%">
                                            <v-card-title>
                                                <div class="title__h4">{{ $t('account.quotes.listOfProducts') }} :</div>
                                            </v-card-title>
                                            <div class="table-responsive">
                                                <table class="table dj-table--responsive dj-table--shopping-cart">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                {{ $t('account.quotes.product') }}
                                                            </th>
                                                            <th>
                                                                {{ $t('account.quotes.quantity&address') }}
                                                            </th>

                                                            <th>
                                                                {{ $t('account.quotes.quantity') }}
                                                            </th>
                                                            <th>
                                                                {{ $t('account.quotes.uprice') }}
                                                            </th>
                                                            <th class="total">
                                                                {{ $t('account.quotes.tprice') }}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="quoteLine in supplier.quoteLines"
                                                            v-bind:key="quoteLine.id">
                                                            <td data-label="Product">
                                                                <product-table-traitement :sku="$core.getProductVariant.getProductSku(
                                                                    quoteLine.productVariant
                                                                )
                                                                    "></product-table-traitement>
                                                            </td>
                                                            <td data-label="Quantity & Address">
                                                                <div class="dj-product--cart"
                                                                    v-for="dl in quoteLine.quoteDeliveryLines"
                                                                    :key="dl.quantity + Math.random(10)">
                                                                    <div>
                                                                        <span v-if="dl.shippingAddress.fullName">
                                                                            {{ dl.shippingAddress.fullName }}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td data-label="Quantity">
                                                                <div class="dj-product--price">
                                                                    <span class=""> {{ quoteLine.quantity }}</span>
                                                                </div>
                                                            </td>
                                                            <td data-label="Unit Price">
                                                                <div class="dj-product--price">
                                                                    <span class="mt-1" v-if="quoteLine.price === null">
                                                                        {{
                                                                            $t('account.quotes.waitingForTreatment')
                                                                        }}</span>
                                                                    <span v-else v-html="$core.getApp.getFormatPrice(
                                                                                quoteLine.price,
                                                                                currency
                                                                            )
                                                                            "></span>
                                                                </div>
                                                            </td>

                                                            <td data-label="Total Price" class="text-right">
                                                                <div class="dj-product--price">
                                                                    <span class="mt-1" v-if="quoteLine.price === null">
                                                                        {{
                                                                            $t('account.quotes.waitingForTreatment')
                                                                        }}</span>
                                                                    <span class="mt-1 text-h4" v-else v-html="$core.getQuote.getSupplierQuoteLineTotalAmount(
                                                                                quoteLine,
                                                                                currency
                                                                            )
                                                                            "></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr class="total">
                                                            <td colspan="3"></td>
                                                            <td>
                                                                <div class="title__h4 totalLabel">
                                                                    {{ $t('account.quotes.totalproductte') }}
                                                                </div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle">
                                                                <div class="dj-product--price">
                                                                    <span class="mt-1"
                                                                        v-if="supplier.quoteLines.price === null">
                                                                        {{
                                                                            $t('account.quotes.waitingForTreatment')
                                                                        }}</span>
                                                                    <span class="mt-1 text-h4" v-else v-html="$core.getQuote.getSupplierQuoteTotalProductsNoTax(
                                                                                supplier,
                                                                                currency
                                                                            )
                                                                            "></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr class="total">
                                                            <td colspan="3"></td>
                                                            <td>
                                                                <div class="title__h4 totalLabel">
                                                                    {{ $t('account.quotes.totalproducttax') }}
                                                                </div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle">
                                                                <div class="dj-product--price">
                                                                    <span class="mt-1"
                                                                        v-if="supplier.quoteLines.price === null">
                                                                        {{
                                                                            $t('account.quotes.waitingForTreatment')
                                                                        }}</span>
                                                                    <span class="mt-1 text-h4" v-else v-html="$core.getQuote.getSupplierQuoteTotalProductsTax(
                                                                                supplier,
                                                                                currency
                                                                            )
                                                                            "></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr class="total">
                                                            <td colspan="3"></td>
                                                            <td>
                                                                <div class="title__h4 totalLabel">
                                                                    {{ $t('account.quotes.totalshippingte') }}
                                                                </div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle">
                                                                <div class="dj-product--price">
                                                                    <span class="mt-1"
                                                                        v-if="supplier.quoteLines.price === null">
                                                                        {{
                                                                            $t('account.quotes.waitingForTreatment')
                                                                        }}</span>
                                                                    <span class="mt-1 text-h4" v-else v-html="$core.getQuote.getSupplierQuoteTotalShippingNotTax(
                                                                                supplier,
                                                                                currency
                                                                            )
                                                                            "></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr class="total">
                                                            <td colspan="3"></td>
                                                            <td>
                                                                <div class="title__h4 totalLabel">
                                                                    {{ $t('account.quotes.totalshippingtax') }}
                                                                </div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle">
                                                                <div class="dj-product--price">
                                                                    <span class="mt-1"
                                                                        v-if="supplier.quoteLines.price === null">
                                                                        {{
                                                                            $t('account.quotes.waitingForTreatment')
                                                                        }}</span>
                                                                    <span class="mt-1 text-h4" v-else v-html="$core.getQuote.getSupplierQuoteTotalShippingTax(
                                                                                supplier,
                                                                                currency
                                                                            )
                                                                            "></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr class="total">
                                                            <td colspan="3"></td>
                                                            <td>
                                                                <div class="title__h4 totalLabel">
                                                                    {{ $t('account.quotes.totalti') }}
                                                                </div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle">
                                                                <div class="dj-product--price">
                                                                    <span class="mt-1"
                                                                        v-if="supplier.quoteLines.price === null">
                                                                        {{
                                                                            $t('account.quotes.waitingForTreatment')
                                                                        }}</span>
                                                                    <span class="mt-1 text-h4" v-else v-html="$core.getQuote.getSupplierQuoteTotalTax(
                                                                                supplier,
                                                                                currency
                                                                            )
                                                                            "></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </v-card>
                                    </v-col>
                                </div>
                                <div class="d-flex justify-content-end align-items-center">
                                    <button-Refuse-quote v-if="supplier.status === 'WAITING_FOR_CUSTOMER'" styleB="button"
                                        :masterQuoteId="item.id" :supplierQuoteId="supplier.id" class="mr-4" />
                                    <button-Accept-quote v-if="supplier.status === 'WAITING_FOR_CUSTOMER'" styleB="button"
                                        :supplier="supplier" :quoteId="supplier.id" />
                                </div>
                                <hr />
                                <div v-show="supplier.status !== 'EXPIRED'" class="title__h3">Comments</div>
                                <div class="messages" :key="increment" v-show="supplier.status !== 'EXPIRED'">
                                    <div class="message-wrap" v-if="supplier.customerThread">
                                        <template v-for="item in supplier.customerThread.slice().reverse()">
                                            <div class="message-list me" :key="item.id"
                                                v-if="item.name === supplier.customerName">
                                                <div class="msg">
                                                    <p>
                                                        {{ item.message }}
                                                    </p>
                                                </div>
                                                <div class="time">
                                                    {{ item.name }} - {{ dateFormated(item.messageDate) }}
                                                </div>
                                            </div>
                                            <div class="message-list" v-else :key="item.id">
                                                <div class="msg">
                                                    <p>{{ item.message }}</p>
                                                </div>
                                                <div class="time">
                                                    {{ item.name }} - {{ dateFormated(item.messageDate) }}
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="message-footer">
                                        <div class="comments-action">
                                            <v-textarea solo rows="1" v-model="message" hide-details
                                                background-color="#F4F4F4" style="border-radius: 20px"
                                                :label="$t('account.quotes.step3message')"></v-textarea>
                                            <div class="ml-3" @click.prevent="
                                                sendMessage(supplier.id, item.id, supplier.customerName)
                                                ">
                                                <DjButton text="Envoyer" :isDisabled="!message" styleButton="light" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item>
                    </v-tabs-items>
                </div>

                <div class="title__h4">
                    {{ $t('account.quotes.step1') }}
                    <v-btn text large v-on:click="step1 = !step1" class="dj-quote__more">
                        {{ $t('account.quotes.seeDetails') }}
                    </v-btn>
                </div>

                <v-expand-transition>
                    <div v-show="step1">
                        <div class="table-responsive">
                            <table class="table dj-table--responsive dj-table--shopping-cart">
                                <thead>
                                    <tr>
                                        <th>{{ $t('account.quotes.product') }}</th>
                                        <th>
                                            {{ $t('account.quotes.quantity&address') }}
                                        </th>
                                        <th>{{ $t('account.quotes.suppliers') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="quoteLine in item.quoteLines" :key="quoteLine.id">
                                        <td data-label="Product">
                                            <product-table-traitement
                                                :sku="$core.getProductVariant.getProductSku(quoteLine.productVariant)"></product-table-traitement>
                                        </td>
                                        <td data-label="Quantity & Shipping Address">
                                            <div class="dj-product--cart" v-for="dl in $core.getQuote.getDeliveryLinesForProduct(
                                                quoteLine.productVariant.id,
                                                item.supplierQuotes
                                            )" :key="dl.quantity + Math.random(10)">
                                                <div>
                                                    {{ dl.quantity }}
                                                    {{ dl.quantity > 1 ? 'items' : 'item' }}
                                                    - Address :
                                                    {{ dl.shippingAddress.fullName }}
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Suppliers">
                                            <div>
                                                <v-chip small v-for="supplier in $core.getQuote.getSuppliersForProduct(
                                                    quoteLine.productVariant.id,
                                                    item.supplierQuotes
                                                )" :key="supplier.id">
                                                    {{ supplier }}</v-chip>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </v-expand-transition>

                <div class="title__h4">
                    {{ $t('account.quotes.step2') }}
                    <v-btn text large v-on:click="step2 = !step2" class="dj-quote__more">
                        {{ $t('account.quotes.seeDetails') }}
                    </v-btn>
                </div>

                <v-expand-transition>
                    <div v-show="step2">
                        <v-col>
                            <v-text-field :value="$core.getAddress.getFullAddress(item.supplierQuotes[0].billingAddress)"
                                type="text" required height="50px" solo dense readonly hide-details></v-text-field>
                        </v-col>
                    </div>
                </v-expand-transition>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

import ButtonAcceptQuote from '@modules/quote/components/modules/ButtonAcceptQuote.vue';
import ButtonRefuseQuote from '@modules/quote/components/modules/ButtonRefuseQuote.vue';
import ShippingQuoteLine from '@modules/quote/components/modules/ShippingQuoteLine.vue';

import ProductTableTraitement from '@modules/quote/components/modules/ProductTableTraitement.vue';
import PaymentQuote from '@modules/quote/components/PayementQuote.vue';
import TimelineQuote from '@modules/quote/components/modules/TimelineQuote.vue';
import moment from 'moment';

export default {
    name: 'TraitementQuote',
    components: {
        ProductTableTraitement,
        ButtonAcceptQuote,
        ShippingQuoteLine,
        DjButton,
        ButtonRefuseQuote,
        PaymentQuote,
        TimelineQuote,
        DjIcon,
    },
    props: {
        item: {
            type: Object,
            require: false,
            default: () => { },
        },
        quotes: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            step1: false,
            step2: false,
            step3: true,
            tabs: null,
            supplierQuoteTab: 0,
            value: null,
            product: {},
            nbLines: 0,
            baddress: '',
            skus: [],
            dialog: false,
            addressSelected: {},
            billingAdress: 'null',
            message: null,
            increment: 0,
            refresh: 0,
        };
    },

    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
            suppliers: (state) => state.quote.suppliers,
        }),
    },
    methods: {
        dateFormated(date) {
            return moment(String(date)).format('DD/MM/YYYY hh:mm');
        },
        async sendMessage(supplierQuoteId, masterQuoteId, username) {
            const request = {
                message: this.message,
                username: username,
            };
            await this.$core.useQuote.sendMessageFromSupplierQuote(supplierQuoteId, masterQuoteId, request);
            this.increment++;
            this.message = '';
            //this.$nuxt.$emit("refresh")
        },
        updateTabs(id) {
            this.supplierQuoteTab = id;
        },
    },
};
</script>

<style lang="scss" scoped>
.spacing {
    padding-top: 13px !important;
    padding-bottom: 13px !important;
    padding-left: 13px !important;
    padding-right: 13px !important;
}

.comments-action {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.dj-quote {
    &__title {
        font-size: 18px;
        line-height: 24px;
        font-weight: 500;
        margin-bottom: 16px;
    }

    &__more {
        color: var(--color-primary) !important;
        text-transform: none;
        letter-spacing: normal;
        font-size: 16px;
        line-height: 24px;
        text-decoration: underline;

        &:before {
            display: none;
        }
    }

    &__list {
        list-style: none;
        font-size: 16px;
        line-height: 24px;

        &__item {
            margin: 4px 0;
            display: flex;
            gap: 15px;

            span {
                color: var(--color-body-2);

                &.dj-quote__list__item__label {
                    color: var(--color-body);
                }
            }
        }
    }
}

.dj-table--shopping-cart {
    border-collapse: separate;
    border-spacing: 0 16px;

    td {
        border: 0;
        text-align: left;
    }

    thead tr th {
        text-align: left;
        padding: 0 8px;
        color: var(--color-body-2);
        font-size: 12px;
        line-height: 24px;
        font-weight: 500;

        &.total {
            text-align: right;
        }
    }

    tbody tr.total {
        box-shadow: none;

        td {
            padding: 10px;
            vertical-align: middle;

            .totalLabel {
                text-transform: uppercase;
                font-size: 12px;
                color: var(--color-body-2);
                margin-bottom: 0;
            }
        }
    }

    tbody tr:not(.total) {
        box-shadow: none;

        td {
            background: var(--background-global);
            padding: 8px;
            vertical-align: middle;

            &:first-child {
                border-radius: 8px 0 0 8px;
            }

            &:nth-last-child(2) {
                position: relative;
                padding: 8px 16px;

                &:before {
                    content: '';
                    background: radial-gradient(#d9d9d9, #d9d9d9 2px, transparent 3px, transparent);
                    background: radial-gradient(var(--color-grey), var(--color-grey) 2px, transparent 3px, transparent);
                    background-size: 100% 13px;
                    width: 13px;
                    height: calc(100% - 6px);
                    position: absolute;
                    right: -4px;
                    top: -2px;
                }
            }

            &:last-child {
                border-radius: 0 8px 8px 0;
                position: relative;
                padding: 8px 16px;

                &:before {
                    top: -8px;
                }

                &:after {
                    bottom: -8px;
                }

                &:before,
                &:after {
                    content: '';
                    width: 16px;
                    height: 16px;
                    background: #ffffff;
                    position: absolute;
                    border-radius: 50%;
                    left: -10px;
                }
            }
        }
    }
}

.messages {
    //box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
}

//message wrap
.message-wrap {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    padding: 15px;
    overflow: auto;
    max-height: 300px;

    &::before {
        content: '';
        margin-bottom: auto;
    }

    //msg list
    .message-list {
        align-self: flex-start;
        max-width: 70%;
        margin-bottom: 10px;

        &.me {
            align-self: flex-end;

            .msg {
                border: 1px solid var(--color-secondary);
                border-radius: 20px;
                color: #1c1c1c;
            }

            .time {
                text-align: right;
                color: var(--color-secondary);
            }
        }

        .msg {
            border: 1px solid var(--color-primary);
            border-radius: 20px;
            color: #1c1c1c;
            box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
            padding: 10px;
            margin-bottom: 5px;

            p {
                margin-bottom: 0;
            }
        }

        .time {
            text-align: left;
            font-weight: 700;
            color: var(--color-primary);
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 8px;
        }
    }
}

//msg footer
.message-footer {
    padding: 10px;
    //height: 60px;
    margin-bottom: 10px;
}
</style>
