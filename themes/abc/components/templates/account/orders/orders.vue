<template>
    <DjAccountLayout :idAccountLink="accountLayoutCommandes">
        <div class="shadow rounded-extra-lg">
            <div class="d-flex align-items-center bg-black navigation-header pl-6">
                <span class="text-white font-700 size-24">
                    {{ $t('account.orders.title') }}
                </span>
            </div>
            <div v-if="isLoading" class="d-flex justify-content-center align-items-center loading-content">
                <v-progress-circular :size="30" :width="3" indeterminate></v-progress-circular>
            </div>
            <div v-else class="p-5">
                <v-select
                    v-model="selectedStatus"
                    :items="status"
                    item-text="text"
                    item-value="id"
                    outlined
                    class="w-full"
                    @input="handleChangeStatus"
                />
                <TableOrders
                    v-if="orders && 0 < orders.length"
                    :orders="orders"
                    :validation="true"
                    :reasonList="reasonList"
                    @reload-orders="getOrders()"
                />
                <p v-else class="text-h4 mt-5 text-center">
                    {{ $t('account.orders.noOrders') }}
                </p>
            </div>
            <v-pagination
                v-if="1 < totalPages"
                v-model="currentPage"
                color="var(--color-primary)"
                total-visible="8"
                :length="totalPages"
                class="pb-10"
                @input="handleChangePagination"
            />
        </div>
    </DjAccountLayout>
</template>

<script>
import TableOrders from '@components/templates/account/orders/modules/TableOrders.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';

export default {
    name: 'OrdersTemplate',
    components: { TableOrders, DjAccountLayout },
    data() {
        return {
            status: [
                {
                    id: null,
                    text: 'TOUS',
                },
                {
                    id: 'WAITING_SUPPLIER_APPROVAL',
                    text: 'ATTENTE CONFIRMATION',
                },
                {
                    id: 'WAITING_SHIPMENT',
                    text: 'COMMANDE CONFIRMÉE',
                },
                {
                    id: 'DECLINED_BY_SUPPLIER',
                    text: 'TERMINÉE',
                },
            ],
            selectedStatus: null,
            isLoading: true,
            reasonList: [],
            subReasonList: [],
            accountLayoutCommandes: 'Commandes',
            orders: null,
            currentPage: 1,
            totalPages: 0,
        };
    },
    async created() {
        await this.getOrders();
        this.reasonList = await this.$core.useOrder.APIgetAllReasonTypes();
    },
    methods: {
        async getOrders() {
            try {
                this.isLoading = true;
                const orders = await this.$purjus.useOrders.getLogisticOrders(this.$store.state.app.account, 20, 40, {
                    sort: 'created_at,desc',
                    page: this.currentPage - 1,
                    logisticStatus: this.selectedStatus ? [this.selectedStatus] : null,
                });
                this.orders = orders.content;
                this.totalPages = orders.totalPages;
                this.isLoading = false;
            } catch (error) {}
        },
        handleChangePagination() {
            this.getOrders();
        },
        handleChangeStatus() {
            this.currentPage = 1;
            this.getOrders();
        },
    },
};
</script>

<style lang="scss" scoped>
.rounded-extra-lg {
    border-radius: 24px;
}

.loading-content {
    height: 500px;
}

::v-deep .theme--light.v-pagination .v-pagination__item {
    color: var(--color-black);
    font-weight: 700;
    font-size: 18px;
}
</style>
