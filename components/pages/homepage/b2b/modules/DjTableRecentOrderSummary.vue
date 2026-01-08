<template lang="html">
    <div>
        <table class="dj-table--order">
            <thead>
                <tr>
                    <th scope="col" class="first">COMMANDE</th>
                    <th scope="col" class="dj-table-th">QUANTITE</th>
                    <th scope="col" class="dj-table-th">TOTAL TTC</th>
                    <th scope="col" class="dj-table-last-th">LOGISTIQUE</th>
                    <th scope="col">PAIEMENT</th>
                </tr>
            </thead>
            <tbody class="section section-step" v-for="(order, Orderindex) in orders" :key="Orderindex">
                <tr>
                    <td>
                        <div class="firstCol">
                            <DjLink :to="'/account/orders/' + order.id">
                                {{ order.id }}
                            </DjLink>
                        </div>
                        <div class="secondCol">
                            <span>
                                <div>Quantity: 4</div>
                            </span>
                            <span>
                                <div v-html="'Prix: ' + $core.getOrder.getTotalOrder(order, currency)"></div>
                            </span>
                        </div>
                    </td>
                    <td :class="[Orderindex === 0 ? '' : 'dj-table--td', 'dj-table--td-hidden']">
                        <div>4</div>
                    </td>
                    <td :class="[Orderindex === 0 ? '' : 'dj-product__price dj-table--td ', 'dj-product__price dj-table--td-hidden']">
                        <div class="dj-product__price" v-html="$core.getOrder.getTotalOrder(order, currency)"></div>
                    </td>
                    <td :class="[Orderindex === 0 ? '' : 'dj-table--td', 'dj-table--last']">
                        <div>
                            <DjBadge :class="$core.useHelper.orderBadgeClass[order.status]">{{ order.status }}</DjBadge>
                        </div>
                    </td>
                    <td :class="[Orderindex === 0 ? '' : 'dj-table--td', 'dj-table--last']">
                        <div>
                            <DjBadge :class="$core.useHelper.paymentBadgeClass[order.paymentStatus]">{{
                                order.paymentStatus
                            }}</DjBadge>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DjBadge from '@components/atoms/DjBadge/DjBadge.vue';
import DjTable from '@components/organisms/DjTable/DjTable.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'TableRecentOrderSummary',
    components: {
        DjBadge,
        DjLink,
        DjTable,
    },
    computed: {
        currency() {
            return this.$store.state.app.currency;
        },
    },

    props: {
        orders: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-table--order {
    min-width: 100%;
    border-top-width: 1px;
    //border-color: #d1d5db;
    border-collapse: separate; // 1
    border-spacing: 0px 13px;
    .first {
        padding-top: 13px;
        padding-bottom: 13px;
        padding-right: 0.75rem;
        padding-left: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14.4px;
        color: #1c1c1c;
        text-align: left;
        @media (min-width: 640px) {
            padding-left: 13px;
        }
    }
    th:last-child {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 13px;
        padding-bottom: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #1c1c1c;
        text-align: center;
    }
    .dj-table-last-th {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 13px;
        padding-bottom: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #1c1c1c;
        text-align: center;
    }
    .dj-table-th {
        display: none;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 13px;
        padding-bottom: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #1c1c1c;
        text-align: center;
        @media (min-width: 1024px) {
            display: table-cell;
        }
    }
}
.section {
    border-top: 1em solid transparent;
}

.section-step {
    border-radius: 8px; // 1
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 0 1px #e5e5e5; // 1
    height: 73px;
}
.borderNone {
    border-top-width: 1px;
    border-color: transparent;
}
.borderActive {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 0.75rem;
    padding-left: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;

    @media (min-width: 640px) {
        padding-left: 1.5rem;
    }
}

.firstCol {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #1c1c1c;
    padding-left: 13px;
}

.secondCol {
    display: flex;
    margin-top: 0.25rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #1c1c1c;
    padding-left: 13px;
    display: flex;
    flex-direction: column;

    @media (min-width: 640px) {
        display: block;
    }

    @media (min-width: 1024px) {
        display: none;
    }
}

.hideOnMobile {
    position: absolute;
    right: 0;
    left: 1.5rem;
    background-color: #e5e7eb;
    height: 1px;
}
.dj-table--td {
    border-top-width: 1px;
    border-color: #e5e7eb;
    text-align: center;
}
.dj-table--td-hidden {
    display: none;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 13px;
    padding-bottom: 13px;
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #1c1c1c;
    @media (min-width: 1024px) {
        display: table-cell;
    }
}
.dj-table--last {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 13px;
    padding-bottom: 13px;
    text-align: center;

    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
}
</style>
