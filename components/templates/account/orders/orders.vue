<template>
    <DjAccountLayout :idAccountLink="accountLayoutCommandes">
        <div class="ps-page__content">
            <div class="dj-section--account-setting">
                <DjCard
                    :title="$t('account.orders.title')"
                    headerColor="var(--color-secondary)"
                    class="mb-2 rounded-lg"
                >
                    <v-tabs
                        background-color="tansparent"
                        center-active
                        active-class="order__active"
                        class="mb-3 tabs__order overflow-hidden"
                        v-model="tabs"
                    >
                        <v-tabs-slider color="transparent" />

                        <v-tab class="border mr-2">
                            <DjLink class="color text-h6">{{ $t('account.orders.allYourOrders') }}</DjLink>
                        </v-tab>

                        <v-tab class="border mr-2" tag="li" v-if="ordersWithIncident && ordersWithIncident.length > 0">
                            <DjLink class="color list-item text-h6">
                                {{ $t('account.orders.myOrdersWithIncident') }}
                            </DjLink>
                        </v-tab>

                        <v-tab class="border mr-2" v-if="isApprobateur">
                            <DjLink class="color text-h6">{{ $t('account.orders.myOrdersToApprove') }}</DjLink>
                        </v-tab>

                        <v-tab class="border mr-2" v-if="!isApprobateur">
                            <DjLink class="color text-h6">{{ $t('account.orders.myOrdersWaitingForApproval') }}</DjLink>
                        </v-tab>
                        <v-tab class="border mr-2">
                            <DjLink class="color text-h6">{{ $t('account.quotes.waitingForTreatment') }}</DjLink>
                        </v-tab>
                        <v-tab tag="li" class="border mr-2">
                            <DjLink class="color list-item text-h6">{{ $t('account.orders.myOrdersShipped') }}</DjLink>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <div class="tab-content">
                                <div class="dj-section__content_invoices">
                                    <TableOrders
                                        v-if="orders"
                                        :orders="orders"
                                        :key="increment"
                                        :tab="2"
                                        :validation="true"
                                        :reasonList="reasonList"
                                        @reload-orders="getAllOrders()"
                                    />

                                    <p class="text-h4 mt-5 text-center" v-else>
                                        {{ $t('account.orders.noOrders') }}
                                    </p>
                                </div>
                            </div>
                        </v-tab-item>
                        <v-tab-item v-if="ordersWithIncident && ordersWithIncident.length > 0">
                            <div class="tab-content">
                                <div class="dj-section__content_invoices">
                                    <TableOrders
                                        v-if="orders && ordersWithIncident && ordersWithIncident.length > 0"
                                        :orders="ordersWithIncident"
                                        :key="increment + 5"
                                        :tab="1"
                                        :reasonList="reasonList"
                                        @reload-orders="getAllOrders()"
                                    />
                                    <p class="text-h4 mt-5 text-center" v-else>
                                        {{ $t('account.orders.noOrders') }}
                                    </p>
                                </div>
                            </div>
                        </v-tab-item>

                        <v-tab-item v-if="isApprobateur">
                            <div class="tab-content">
                                <div class="dj-section__content_invoices">
                                    <TableOrders
                                        v-if="orders && ordersToApprove && ordersToApprove.length > 0"
                                        :orders="ordersToApprove"
                                        :validation="true"
                                        :key="increment + 2"
                                        :tab="3"
                                        :reasonList="reasonList"
                                        @reload-orders="getAllOrders()"
                                    />

                                    <p class="text-h4 mt-5 text-center" v-else>
                                        {{ $t('account.orders.noOrdersToApprove') }}
                                    </p>
                                </div>
                            </div>
                        </v-tab-item>

                        <v-tab-item v-if="!isApprobateur">
                            <div class="tab-content">
                                <div class="dj-section__content_invoices">
                                    <TableOrders
                                        v-if="orders && ordersWaitingToApprove && ordersWaitingToApprove.length > 0"
                                        :orders="ordersWaitingToApprove"
                                        :key="increment + 3"
                                        :nameApprobateur="nameOfApprobateur"
                                        :tab="4"
                                        :reasonList="reasonList"
                                        @reload-orders="getAllOrders()"
                                    />

                                    <p class="text-h4 mt-5 text-center" v-else>
                                        {{ $t('account.orders.noOrdersWaitingForApproval') }}
                                    </p>
                                </div>
                            </div>
                        </v-tab-item>
                        <v-tab-item>
                            <div class="tab-content">
                                <div class="dj-section__content_invoices">
                                    <TableOrders
                                        v-if="orders && ordersInTreatment && ordersInTreatment.length > 0"
                                        :orders="ordersInTreatment"
                                        :key="increment + 5"
                                        :tab="6"
                                        :reasonList="reasonList"
                                        @reload-orders="getAllOrders()"
                                    />

                                    <p class="text-h4 mt-5 text-center" v-else>
                                        {{ $t('account.orders.noOrders') }}
                                    </p>
                                </div>
                            </div>
                        </v-tab-item>
                        <v-tab-item>
                            <div class="tab-content">
                                <div class="dj-section__content_invoices">
                                    <TableOrders
                                        v-if="orders && ordersShipped && ordersShipped.length > 0"
                                        :orders="ordersShipped"
                                        :key="increment + 4"
                                        :tab="5"
                                        :reasonList="reasonList"
                                        @reload-orders="getAllOrders()"
                                    />

                                    <p class="text-h4 mt-5 text-center" v-else>
                                        {{ $t('account.orders.noOrdersShipped') }}
                                    </p>
                                </div>
                            </div>
                        </v-tab-item>
                        <DjPagination
                            class="pagination__order"
                            :currentPage="page"
                            :lastPage="totalPages"
                            @prevPagination="prevPagination"
                            @nextPagination="nextPagination"
                            @moveToPage="moveToPage"
                        />
                    </v-tabs-items>
                </DjCard>
            </div>
        </div>
    </DjAccountLayout>
</template>

<script>
import TableOrders from '@components/templates/account/orders/modules/TableOrders.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjPagination from '@components/atoms/DjPagination/DjPagination.vue';

export default {
    name: 'OrdersTemplate',
    components: { TableOrders, DjAccountLayout, DjLink, DjCard, DjButton, DjPagination },
    data: () => ({
        tabs: 0,
        increment: 1,
        accountLayoutCommandes: 'Commandes',
        ordersWithIncident: null,
        orders: null,
        totalPages: 0,
        page: 0,
        isApprobateur: false,
        ordersToApprove: null,
        nameOfApprobateur: null,
        reasonList: null,
    }),
    computed: {
        ordersWaitingToApprove() {
            return this.orders?.length > 0
                ? this.orders.filter(
                      (order) =>
                          order.status === 'WAITING_CUSTOMER_APPROVAL' &&
                          this.$auth.user.id === order.customerUserSnapshot.id
                  )
                : null;
        },
        ordersInTreatment() {
            const result =
                this.orders?.length > 0
                    ? this.orders.filter((order) => order.status === 'WAITING_SUPPLIER_APPROVAL')
                    : null;
            let orderWaitingShipment =
                this.orders?.length > 0 ? this.orders.filter((order) => order.status === 'WAITING_SHIPMENT') : null;
            if (orderWaitingShipment?.length > 0) {
                orderWaitingShipment.forEach((element) => {
                    result.push(element);
                });
            }
            return result;
        },
        ordersShipped() {
            let shipAndCompletOrder = this.$core.getOrder.getOrdersShipped(this.orders);
            let orderComplet = this.$core.getOrder.getOrdersCompleted(this.orders);
            if (orderComplet?.length > 0) {
                orderComplet.forEach((element) => {
                    shipAndCompletOrder.push(element);
                });
            }
            return shipAndCompletOrder;
        },
    },
    async created() {
        this.reasonList = await this.$core.useOrder.APIgetAllReasonTypes();
        await this.getAllOrders();
        this.$root.$on('reloadOrderToValidate', async () => {
            try {
                await this.getAllOrders();
                this.increment++;
            } catch (error) {}
        });
    },
    watch: {
        orders: {
            handler: 'increase',
            deep: true,
        },
    },
    methods: {
        increase() {
            this.increment += 1;
        },
        async getAllOrders() {
            try {
                let param = {
                    size: 100,
                    page: this.page,
                    locale: this.$i18n.locale,
                };
                const dataOrdersList = await this.$core.useUser.getCustomerAccountOrders(param);
                this.totalPages = dataOrdersList.totalPages;
                const dataOrdersListWithIncident = await this.$core.useOrder.getOrdersListWithIncident();
                const undesiredStatus = new Set(['DRAFT_ORDER', 'DRAFT_ORDER_ON_HOLD', 'CREATING']);
                this.orders = dataOrdersList.content.filter((item) => !undesiredStatus.has(item.status));
                this.ordersWithIncident = dataOrdersListWithIncident.filter(
                    (item) => !undesiredStatus.has(item.status)
                );
                this.ordersToApprove =
                    this.orders?.length > 0
                        ? this.orders.filter((order) => order.status === 'WAITING_CUSTOMER_APPROVAL')
                        : null;
                let approbateur = await this.$core.useOrder.getOrderApprovers(element.id);

                if (approbateur) {
                    this.nameOfApprobateur = approbateur[0]?.customerUser?.email;
                    if (
                        approbateur[0]?.customerUser?.email === this.$auth.user.email ||
                        approbateur[1]?.customerUser?.email === this.$auth.user.email
                    ) {
                        this.isApprobateur = true;
                        return;
                    }
                }
            } catch (error) {}
        },

        prevPagination() {
            if (this.page === 0) return;
            --this.page;
            this.getAllOrders();
        },
        nextPagination() {
            if (this.page === this.totalPages) return;
            ++this.page;
            this.getAllOrders();
        },
        moveToPage(page) {
            this.page = page;
            this.getAllOrders();
        },
    },
};
</script>
