<template>
    <OrderDetailPage :orderId="orderId" />
</template>

<script>
import OrderDetailPage from '@components/pages/account/orders/OrderDetail.vue';

export default {
    transition: 'zoom',
    middleware: 'auth',
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        OrderDetailPage,
    },
    asyncData({ params }) {
        const orderId = params.id;
        return { orderId };
    },
};
</script>

