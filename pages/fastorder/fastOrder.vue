<template>
    <FastOrderPage />
</template>

<script>
import FastOrderPage from '@components/pages/fastOrder/fastOrder.vue';
export default {
    name: 'fast-order',
    components: { FastOrderPage },
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
};
</script>

<style></style>
