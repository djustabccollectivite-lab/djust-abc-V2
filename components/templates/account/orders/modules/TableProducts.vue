<template>
    <section class="border-top px-2 py-3">
        <header class="d-flex flex-row align-items-center justify-content-between">
            <p class="mb-0 font-weight-bold order-text-color">
                {{ $t('account.orders.orderProductTitle').toUpperCase() }}
            </p>
            <p class="mb-0 font-weight-bold order-text-color">
                {{ $t('account.orders.deliveryTo').toUpperCase() }} "{{ addressName }}"
            </p>
        </header>
        <article class="order-dropdown-body">
            <div class="mr-auto product-list">
                <div class="product-grid p-2 border-bottom">
                    <p class="mb-0 text-center font-weight-bold order-text-color">
                        {{ $t('account.orders.orderProductsTable.productName').toUpperCase() }}
                    </p>
                    <p class="mb-0 text-center font-weight-bold order-text-color">
                        {{ $t('account.orders.orderProductsTable.price').toUpperCase() }}
                    </p>
                    <p class="mb-0 text-center font-weight-bold order-text-color">
                        {{ $t('account.orders.orderProductsTable.quantity').toUpperCase() }}
                    </p>
                    <p class="mb-0 text-center font-weight-bold order-text-color">
                        {{ $t('account.orders.orderProductsTable.totalPrice').toUpperCase() }}
                    </p>
                </div>
                <template v-if="products.length <= 4">
                    <TableProductItem
                        v-for="(orderLogistic, indexOrderLogistic) in products"
                        :key="indexOrderLogistic"
                        :orderLogistic="orderLogistic"
                    />
                </template>
                <template v-else>
                    <TableProductItem v-for="n in 4" :key="n" :orderLogistic="products[n - 1]" />
                    <div class="d-flex justify-content-center align-items-center mt-3">
                        <DjLink :to="'/account/orders/' + orderId" class="font-weight-bold text-wrap">
                            <DjButton :text="$t('account.orders.seeMore')"/>
                        </DjLink>
                    </div>
                </template>
            </div>
            <div class="d-flex flex-column align-items-stretch order-data">
                <div class="mb-1">
                    <div class="d-flex flex-row align-tiems-center justify-content-between">
                        <p class="mb-0">{{ $t('account.address.address') }}</p>
                        <p class="mb-0">{{ address }}</p>
                    </div>
                    <div class="d-flex flex-row align-tiems-center justify-content-between">
                        <p class="mb-0">{{ $t('account.address.city') }}</p>
                        <p class="mb-0">{{ zipcode }} {{ city }}</p>
                    </div>
                    <div class="d-flex flex-row align-tiems-center justify-content-between">
                        <p class="mb-0">{{ $t('account.address.country') }}</p>
                        <p class="mb-0">{{ country }}</p>
                    </div>
                </div>
                <div v-if="needConfirm" @click="confirmDelivery">
                    <DjButton
                        :fullWidth="true"
                        styleButton="primary"
                        :text="$t('account.orders.invoice.buttons.confirmDelivery')"
                    />
                </div>
                <template v-if="needValidate">
                    <div @click="validateOrder">
                        <DjButton
                            :fullWidth="true"
                            styleButton="primary"
                            :text="$t('account.orders.invoice.buttons.validateOrder')"
                        />
                    </div>
                    <div @click="refuseOrder">
                        <DjButton
                            :fullWidth="true"
                            styleButton="primary"
                            :text="$t('account.orders.invoice.buttons.refuseOrder')"
                        />
                    </div>
                </template>
                <div v-if="canDeclareIncident" @click="openClaimModal">
                    <DjButton
                        :fullWidth="true"
                        styleButton="outline"
                        :text="$t('account.orders.invoice.buttons.problemWithOrder')"
                    />
                </div>
                <div v-if="canWriteReview" @click="writeReview">
                    <DjButton
                        :fullWidth="true"
                        styleButton="outline"
                        :text="$t('account.orders.invoice.buttons.writeProductReview')"
                    />
                </div>
            </div>
        </article>
    </section>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import TableProductItem from '@components/templates/account/orders/modules/TableProductItem.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'TableProduct',
    components: {
        DjButton,
        TableProductItem,
        DjLink,
    },
    props: {
        shippingAddress: {
            required: true,
            type: Object,
        },
        products: {
            required: true,
            type: [],
        },
        status: {
            required: true,
            type: String,
        },
        orderId: {
            required: true,
            type: String,
        },
    },
    computed: {
        needConfirm() {
            return this.status === 'SHIPPED';
        },
        needValidate() {
            return this.status === 'WAITING_CUSTOMER_APPROVAL';
        },
        canDeclareIncident() {
            return ['WAITING_SHIPMENT', 'SHIPPED', 'COMPLETED'].includes(this.status);
        },
        canWriteReview() {
            return this.status === 'COMPLETED';
        },
        addressName() {
            return this.shippingAddress.fullName.toUpperCase();
        },
        address() {
            return this.shippingAddress.address;
        },
        city() {
            return this.shippingAddress.city;
        },
        zipcode() {
            return this.shippingAddress.zipcode;
        },
        country() {
            return this.shippingAddress.country;
        },
    },
    methods: {
        confirmDelivery() {
            this.$emit('confirmDelivery');
        },
        validateOrder() {
            this.$emit('validateOrder');
        },
        refuseOrder() {
            this.$emit('refuseOrder');
        },
        openClaimModal() {
            this.$emit('openClaimModal');
        },
        writeReview() {
            this.$emit('writeReview');
        },
    },
};
</script>
