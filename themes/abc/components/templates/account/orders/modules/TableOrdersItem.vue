<template>
    <div v-if="isDesktop" class="order-block mb-4">
        <div class="bg-grey-2 d-flex align-items-center px-4 py-2 gap-6 order-header">
            <table class="table inline-block mb-0">
                <thead>
                    <tr>
                        <th class="border-top-0 border-bottom-0 text-center">
                            {{ $t('account.orders.invoice.OrderPlaced') }}
                        </th>
                        <!-- <th class="border-top-0 border-bottom-0 text-center">
                            {{ $t('account.orders.invoice.soldBy') }}
                        </th> -->
                        <th class="border-top-0 border-bottom-0 text-center">
                            {{ $t('account.orders.invoice.total') }}
                        </th>
                        <th class="border-top-0 border-bottom-0 text-center">
                            {{ $t('account.orders.invoice.totalWithTax') }}
                        </th>
                        <th class="border-top-0 border-bottom-0 text-center">
                            {{ $t('account.orders.invoice.dispatchTop') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">{{ orderDateFormated }}</td>
                        <!-- <td class="text-center">{{ order.supplierSnapshot.name }}</td> -->
                        <td class="text-center" v-html="totalOrderPrice"></td>
                        <td class="text-center" v-html="totalOrderPriceWithTax"></td>
                        <td class="text-center">
                            <v-menu bottom offset-y open-on-hover>
                                <template #activator="{ on, attrs }">
                                    <div
                                        v-bind="attrs"
                                        class="d-flex justify-content-center align-items-center gap-1"
                                        v-on="on"
                                    >
                                        {{ order.shippingAddressSnapshot?.label }}
                                        <SvgIcon name="arrow-down-small" />
                                    </div>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-title>
                                            {{ order.shippingAddressSnapshot?.address }} <br />{{
                                                order.shippingAddressSnapshot?.zipcode
                                            }}
                                            {{ order.shippingAddressSnapshot?.city }}
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="font-700 d-flex flex-column gap-1">
                <div>
                    {{ $t(`account.orderTracking.order`) }}:
                    <nuxt-link :to="'/account/orders/' + order.id">
                        <span class="text-primary">#{{ order.orderCommercialReference }}</span>
                    </nuxt-link>
                </div>
                <div class="size-10">{{ orderStatusFr }}</div>
                <div class="size-10">Ref. commande: {{ referenceOrder ?? 'Non renseigné' }}</div>
            </div>
        </div>
        <div class="px-2 py-4">
            <table class="table mb-0">
                <thead>
                    <tr>
                        <th class="uppercase border-top-0">{{ $t('account.orders.invoice.product') }}</th>
                        <th class="text-center uppercase border-top-0">{{ $t('account.orders.invoice.price') }}</th>
                        <th class="text-center uppercase border-top-0">{{ $t('account.orders.invoice.quantity') }}</th>
                        <th class="text-center uppercase border-top-0">{{ $t('account.orders.invoice.amount') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item in order.lines">
                        <TableOrdersItemLine v-if="item" :key="item.id" :line="item" />
                    </template>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="order-block mb-4">
        <div class="bg-grey-2 d-flex align-items-baseline justify-content-center px-4 py-2 gap-6 order-header">
            <div class="font-700 d-flex flex-column text-center">
                <div class="font-700 size-18">
                    {{ $t(`account.orderTracking.order`) }}:
                    <nuxt-link :to="'/account/orders/' + order.id">
                        <span class="text-primary">#{{ order.orderCommercialReference }}</span>
                    </nuxt-link>
                </div>
                <div class="size-10">{{ orderStatusFr }}</div>
            </div>
        </div>
        <div class="p-4">
            <div class="d-flex align-items-center gap-4 mb-2">
                <div class="property-label">{{ $t('account.orders.invoice.OrderPlaced') }}</div>
                <div class="font-700 size-16">{{ orderDateFormated }}</div>
            </div>
            <div class="d-flex align-items-center gap-4 mb-2">
                <div class="property-label">{{ $t('account.orders.invoice.soldBy') }}</div>
                <div class="font-700 size-16">{{ order.supplierSnapshot.name }}</div>
            </div>
            <div class="d-flex align-items-center gap-4 mb-2">
                <div class="property-label">{{ $t('account.orders.invoice.total') }}</div>
                <div class="font-700 size-16" v-html="totalOrderPrice"></div>
            </div>
            <div class="d-flex align-items-center gap-4 mb-2">
                <div class="property-label">{{ $t('account.orders.invoice.totalWithTax') }}</div>
                <div class="font-700 size-16" v-html="totalOrderPriceWithTax"></div>
            </div>
            <div class="d-flex align-items-center gap-4 mb-4">
                <div class="property-label">{{ $t('account.orders.invoice.dispatchTop') }}</div>
                <div>
                    <v-menu bottom offset-y open-on-hover>
                        <template #activator="{ on, attrs }">
                            <div
                                v-bind="attrs"
                                class="d-flex justify-content-center align-items-center gap-1 font-700 size-16"
                                v-on="on"
                            >
                                {{ order.shippingAddressSnapshot.label }}
                                <SvgIcon name="arrow-down-small" />
                            </div>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    {{ order.shippingAddressSnapshot.address }} <br />{{
                                        order.shippingAddressSnapshot.zipcode
                                    }}
                                    {{ order.shippingAddressSnapshot.city }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <nuxt-link :to="'/account/orders/' + order.id">
                <DjButton
                    text="Voir les détails"
                    :iconDisplayed="false"
                    shape="button"
                    variant="contained"
                    :fullWidth="true"
                />
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import TableOrdersItemLine from '@components/templates/account/orders/modules/TableOrdersItemLine.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

import { mapState } from 'vuex';
import moment from 'moment';

export default {
    name: 'TableOrder',
    components: {
        TableOrdersItemLine,
        SvgIcon,
        DjButton,
    },
    props: {
        order: {
            type: Object,
            default: () => {},
        },
        isDesktop: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            reason: { claimReasonType: 'INCIDENT_OPEN' },
            subreason: null,
            message: null,
            reviewMessage: null,
            orderItemSelected: null,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        isDisabled() {
            if (this.reason && this.reason.claimReasonType === 'ORDER_MESSAGING') {
                if (!this.subreason || !this.message) {
                    return true;
                }
            } else if (
                ['INCIDENT_OPEN', 'REFUND', 'OFFER_MESSAGING', 'CANCELATION'].includes(this.reason?.claimReasonType)
            ) {
                if (!this.subreason || !this.orderItemSelected || !this.message) {
                    return true;
                }
            }
            return false;
        },
        referenceOrder() {
            return this.$purjus.utils.extractOrderCustomFieldValue(this.order, 'REF_COMMANDE');
        },
        orderStatusFr() {
            switch (this.order.status) {
                case 'WAITING_SUPPLIER_APPROVAL':
                    return 'ATTENTE CONFIRMATION';
                case 'WAITING_SHIPMENT':
                    return `COMMANDE CONFIRMÉE`;
                case 'DECLINED_BY_SUPPLIER':
                    return 'TERMINÉ';
                default:
                    return this.order.status;
            }
        },
        isDisabledforReview() {
            return !this.reviewMessage;
        },
        // TODO passer en getter
        totalOrderPrice() {
            return this.$core.useHelper.formatCurrencyAuto(
                this.order.orderLogisticPrices.totalProductWithoutTax,
                this.currency,
            );
        },
        totalOrderPriceWithTax() {
            return this.$core.useHelper.formatCurrencyAuto(
                this.order.orderLogisticPrices.totalOrderPrice,
                this.currency,
            );
        },
        // TODO passer en getter
        orderDateFormated() {
            return moment(String(this.order.createdAt)).format('DD/MM/YYYY hh:mm');
        },
        numberStatus() {
            let answer = '';
            switch (this.order.status) {
                case 'ORDER_CREATED':
                    answer = [
                        {
                            number: 1,
                            name: 'CREATED',
                            class: 'active',
                        },
                        {
                            number: 2,
                            name: 'CREATED',
                            statut: 'inactive',
                        },
                        {
                            number: 3,
                            name: 'CREATED',
                            statut: 'inactive',
                        },
                    ];
                    break;
                case 'WAITING_CUSTOMER_APPROVAL':
                    answer = 2;
                    break;
                case 'WAITING_SUPPLIER_APPROVAL':
                    answer = 3;
                    break;
                case 'DECLINED_BY_CUSTOMER':
                    answer = 2;
                    break;
                case 'PREPARED':
                    answer = 4;
                    break;
                case 'WAITING_SHIPMENT':
                    answer = 4;
                    break;
                case 'SHIPPED':
                    answer = 5;
                    break;
                case 'COMPLETED':
                    answer = 6;
                    break;
                default:
                    answer = 'error';
            }
            return answer;
        },
    },
};
</script>

<style lang="scss" scoped>
.property-label {
    min-width: 100px;
}

.order-block {
    border: 1px solid rgba(153, 153, 153, 0.33);
    border-radius: 16px;
    overflow: hidden;
}

.order-header {
    border-bottom: 1px solid var(--color-grey-nuance-6);
}

@media (max-width: 420px) {
    .mobileFlex {
        display: flex;
        flex-direction: column;
    }
    .flexRow {
        display: flex;
        flex-direction: row;
    }
}

.dj-section-invoice__content {
    @media (max-width: 850px) {
        display: flex;
        flex-direction: column;
    }
}
.problemOrder {
    @media (max-width: 500px) {
        display: flex;
        font-size: 13px;
        width: 65px;
        height: 60px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
.mobile {
    @media (max-width: 850px) {
        max-width: 100% !important;
        width: 100% !important;
    }
}
</style>
