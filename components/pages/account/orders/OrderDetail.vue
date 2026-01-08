<template>
    <section class="ps-page--my-account">
        <div class="container">
            <BreadCrumb :breadcrumb="breadCrumb" />
        </div>
        <OrderDetailTemplate v-if="order" :order="order" :orderId="orderId" />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import OrderDetailTemplate from '@components/templates/account/orders/orderDetail.vue';

export default {
    name: 'OrderDetailPage',
    components: {
        OrderDetailTemplate,
        BreadCrumb,
    },
    props: {
        orderId: {
            type: String,
            default: '',
        },
    },
    async created() {
        this.order = await this.$core.useOrder.getOrderById(this.orderId);
    },
    data: (context) => {
        return {
            breadCrumb: [
                {
                    text: context.$i18n.t('common.breadscrum.home'),
                    url: '/',
                },
                {
                    text: context.$i18n.t('common.breadscrum.orders'),
                    url: '/account/orders',
                },
                {
                    text: context.$i18n.t('common.breadscrum.orderDetails'),
                },
            ],
            order: null,
        };
    },
};
</script>

<style lang="scss" scoped></style>
