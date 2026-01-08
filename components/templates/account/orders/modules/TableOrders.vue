<template>
    <div v-if="orders.length !== 0">
        <div class="table-repsonsive block-order">
            <div class="border-top border-bottom mb-4 mt-6 d-grid align-items-center justify-content-start">
                <p
                    v-for="(col, index) in tableHeaders"
                    :key="index"
                    class="mb-0 text-center font-weight-bold text-wrap"
                >
                    {{ col }}
                </p>
                <div />
            </div>
            <div class="items-container">
                <TableOrdersItem
                    v-for="order in orders"
                    :key="order.id"
                    :order="order"
                    @reload-orders="$emit('reload-orders')"
                    :validation="validation"
                    :reasonList="reasonList"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TableOrdersItem from '@components/templates/account/orders/modules/TableOrdersItem.vue';

export default {
    name: 'TableOrders',
    components: {
        TableOrdersItem,
    },
    async created() {
        this.reasonList = await this.$core.useOrder.APIgetAllReasonTypes();
    },
    data(context) {
        return {
            reasonList: [],
            tableHeaders: [
                context.$i18n.t('account.orders.orderListHeaders.orderId').toUpperCase(),
                context.$i18n.t('account.orders.orderListHeaders.orderDate').toUpperCase(),
                context.$i18n.t('account.orders.orderListHeaders.nbrProduct').toUpperCase(),
                context.$i18n.t('account.orders.orderListHeaders.total').toUpperCase(),
                context.$i18n.t('account.orders.orderListHeaders.shipmentTracking').toUpperCase(),
                context.$i18n.t('account.orders.orderListHeaders.paymentTracking').toUpperCase(),
            ],
        };
    },
    props: {
        orders: {
            type: Array,
            default: [],
        },
        validation: {
            type: Boolean,
            defaut: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.block-order {
    margin-bottom: 10px;
}

.d-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(10rem, 1fr));
    gap: 10px;
    padding: 20px;
}

.items-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
}
</style>
