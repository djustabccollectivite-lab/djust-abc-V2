<template lang="html">
    <OrderDetailPage :orderId="orderId" />
</template>

<script>
import OrderDetailPage from '@components/pages/account/orders/OrderDetail.vue';

export default {
    components: {
        OrderDetailPage,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    middleware: 'auth',
    transition: 'zoom',
    asyncData({ params }) {
        const orderId = params.id;
        return { orderId };
    },
};
</script>

<style lang="scss" scoped></style>
