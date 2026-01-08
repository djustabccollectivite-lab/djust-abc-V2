<template>
    <div>
        <FastCart />
    </div>
</template>

<script>

import FastCart from '@components/pages/fastOrder/fastCart.vue';
export default {
    name: 'fast-cart',
    components: { FastCart },
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
};
</script>

<style></style>
