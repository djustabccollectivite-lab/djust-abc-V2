<template>
    <OrdersPage />
</template>

<script>
import OrdersPage from '@components/pages/account/orders/Orders.vue';

export default {
    transition: 'zoom',
    middleware: 'auth',
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        OrdersPage,
    },
};
</script>
