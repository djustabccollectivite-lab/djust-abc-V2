<template>
    <div class="ps-fastorder ps-section--shopping">
        <div class="dj-section__content ps-fastorder__menu">
            <div class="row" v-if="supplierQuote">
                <v-col sm="6" cols="12" class="spacing">
                    <v-card height="100%">
                        <v-card-title>
                            <div class="title__h4 dj-quotes__title">
                                {{ $t('account.quotes.statutOfYourquote') }}
                            </div>
                        </v-card-title>
                        <v-card-text class="p-0">
                            <TimelineQuote :status="supplierQuote.status"></TimelineQuote>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12" class="spacing">
                    <v-card height="100%">
                        <v-card-title>
                            <div class="title__h4">{{ $t('account.quotes.quoteInformations') }}</div>
                        </v-card-title>
                        <v-card-text>
                            <ul class="dj-quote__list">
                                <li class="dj-quote__list__item">
                                    <span>{{ $t('account.quotes.createdAt') }}</span>
                                    <span class="dj-quote__list__item__label"> {{ dateOfQuote }}</span>
                                </li>
                                <li class="dj-quote__list__item">
                                    <span> {{ $t('account.quotes.supplierName') }}</span>
                                    <span class="dj-quote__list__item__label">{{ supplierQuote.supplier.name }}</span>
                                </li>
                                <li class="dj-quote__list__item">
                                    <span v-if="supplierQuote.quoteLines.length > 1">
                                        {{ $t('account.quotes.NumberOfProducts') }}</span
                                    >
                                    <span v-else> {{ $t('account.quotes.NumberOfProduct') }}</span>
                                    <span class="dj-quote__list__item__label"
                                        >{{ supplierQuote.quoteLines.length }}
                                    </span>
                                </li>
                                <li class="dj-quote__list__item">
                                    <span>{{ $t('account.quotes.status') }}</span>
                                    <span class="dj-quote__list__item__label">
                                        {{ $core.getQuote.getStatusQuote(supplierQuote.status) }}
                                    </span>
                                </li>
                                <li class="dj-quote__list__item">
                                    <span> {{ $t('account.quotes.step2') }}</span>
                                    <span class="dj-quote__list__item__label">{{ fullAddress }} </span>
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
                            <table
                                v-if="TestLoading === false"
                                class="table dj-table--responsive dj-table--shopping-cart"
                            >
                                <thead>
                                    <tr>
                                        <th>
                                            <div class="ml-3">
                                                {{ $t('account.quotes.product') }}
                                            </div>
                                        </th>
                                        <th>
                                            <div class="ml-2">
                                                {{ $t('account.quotes.shippingAddress') }}
                                            </div>
                                        </th>

                                        <th>
                                            <div>
                                                {{ $t('account.quotes.quantity') }}
                                            </div>
                                        </th>
                                        <th>
                                            <div class="ml-10">
                                                {{ $t('account.quotes.uprice') }}
                                            </div>
                                        </th>
                                        <th class="total">
                                            <div class="mr-15">
                                                {{ $t('account.quotes.tprice') }}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="quoteLine in supplierQuote.quoteLines" v-bind:key="quoteLine.id">
                                        <td data-label="Product">
                                            <ProductTableTraitement
                                                :sku="$core.getProductVariant.getProductSku(quoteLine.productVariant)"
                                            ></ProductTableTraitement>
                                        </td>
                                        <td data-label="Shipping Address">
                                            <div
                                                class="dj-product--cart"
                                                v-for="quoteDelivery in quoteLine.quoteDeliveryLines"
                                                :key="quoteDelivery.shippingAddress.id"
                                            >
                                                <div>
                                                    <span v-if="quoteDelivery.shippingAddress.fullName">
                                                        {{ quoteDelivery.shippingAddress.fullName }}</span
                                                    >
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Quantity">
                                            <div class="dj-product--price">
                                                <span class="ml-20"> {{ quoteLine.quantity }}</span>
                                            </div>
                                        </td>
                                        <td data-label="Unit Price">
                                            <div class="dj-product--price">
                                                <span class="mt-1" v-if="quoteLine.price === null">
                                                    {{ $t('account.quotes.waitingForTreatment') }}</span
                                                >
                                                <span
                                                    class="ml-10"
                                                    v-else
                                                    v-html="$core.getApp.getFormatPrice(quoteLine.price, currency)"
                                                ></span>
                                            </div>
                                        </td>

                                        <td data-label="Total Price" class="text-right">
                                            <div class="dj-product--price placement">
                                                <span class="mt-1" v-if="quoteLine.price === null">
                                                    {{ $t('account.quotes.waitingForTreatment') }}</span
                                                >
                                                <span
                                                    class="text-h4"
                                                    v-else
                                                    v-html="
                                                        $core.getQuote.getSupplierQuoteLineTotalAmount(
                                                            quoteLine,
                                                            currency
                                                        )
                                                    "
                                                ></span>
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
                                        <td class="placement">
                                            <div class="dj-product--price">
                                                <span class="mt-1" v-if="supplierQuote.quoteLines.price === null">
                                                    {{ $t('account.quotes.waitingForTreatment') }}</span
                                                >
                                                <span
                                                    class="mt-1 text-h4"
                                                    v-else
                                                    v-html="
                                                        $core.getQuote.getSupplierQuoteTotalProductsNoTax(
                                                            supplierQuote,
                                                            currency
                                                        )
                                                    "
                                                ></span>
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
                                        <td class="placement">
                                            <div class="dj-product--price">
                                                <span class="mt-1" v-if="supplierQuote.quoteLines.price === null">
                                                    {{ $t('account.quotes.waitingForTreatment') }}</span
                                                >
                                                <span
                                                    class="mt-1 text-h4"
                                                    v-else
                                                    v-html="
                                                        $core.getQuote.getSupplierQuoteTotalProductsTax(
                                                            supplierQuote,
                                                            currency
                                                        )
                                                    "
                                                ></span>
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
                                        <td class="placement">
                                            <div class="dj-product--price">
                                                <span class="mt-1" v-if="supplierQuote.quoteLines.price === null">
                                                    {{ $t('account.quotes.waitingForTreatment') }}</span
                                                >
                                                <span
                                                    class="mt-1 text-h4"
                                                    v-else
                                                    v-html="
                                                        $core.getQuote.getSupplierQuoteTotalShippingNotTax(
                                                            supplierQuote,
                                                            currency
                                                        )
                                                    "
                                                ></span>
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
                                        <td class="placement">
                                            <div class="dj-product--price">
                                                <span class="mt-1" v-if="supplierQuote.quoteLines.price === null">
                                                    {{ $t('account.quotes.waitingForTreatment') }}</span
                                                >
                                                <span
                                                    class="mt-1 text-h4"
                                                    v-else
                                                    v-html="
                                                        $core.getQuote.getSupplierQuoteTotalShippingTax(
                                                            supplierQuote,
                                                            currency
                                                        )
                                                    "
                                                ></span>
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
                                        <td class="placement">
                                            <div class="dj-product--price">
                                                <span class="mt-1" v-if="supplierQuote.quoteLines.price === null">
                                                    {{ $t('account.quotes.waitingForTreatment') }}</span
                                                >
                                                <span
                                                    class="mt-1 text-h4"
                                                    v-else
                                                    v-html="
                                                        $core.getQuote.getSupplierQuoteTotalTax(supplierQuote, currency)
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </v-col>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import TimelineQuote from '@modules/quote/components/modules/TimelineQuote.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import ProductTableTraitement from '@modules/quote/components/modules/ProductTableTraitement.vue';
import moment from 'moment';

export default {
    name: 'SupplierQuoteComponent',
    components: {
        ProductTableTraitement,
        DjButton,
        TimelineQuote,
        DjIcon,
    },
    props: {
        supplierQuote: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            products: [],
            TestLoading: true,
        };
    },
    async created() {
        this.products = await this.$core.useThumbnails.getFeatureProducts({ productSku: this.skus });

        if (this.products) {
            setTimeout(
                function () {
                    this.TestLoading = false;
                }.bind(this),
                150
            );
        }
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
        fullAddress() {
            const fullAddress = this.supplierQuote.billingAddress;
            let name = fullAddress.fullName;
            let country = fullAddress.country;
            let address = fullAddress.address;
            let zipcode = fullAddress.city;
            return `${name} - ${address},  ${country} ${zipcode}`;
        },
        dateOfQuote() {
            if (this.locale === 'FR') {
                moment.locale('fr');
                return moment(String(this.supplierQuote.createdAt)).format('dddd D MMMM YYYY');
            } else {
                moment.locale('en');
                return moment(String(this.supplierQuote.createdAt)).format('dddd, D MMMM YYYY');
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.spacing {
    padding-top: 13px !important;
    padding-bottom: 13px !important;
    padding-left: 13px !important ;
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
.placement {
    vertical-align: middle !important;
    text-align-last: center;
}
</style>
