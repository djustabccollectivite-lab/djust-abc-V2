<template>
    <ShopByCategoryID />
</template>

<script>
import ShopByCategoryID from '@components/pages/categoryPage/ShopByCategoryID.vue';

export default {
    name: 'AllProductsPage',
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        ShopByCategoryID,
    },
    transition() {
        return 'fadeIn';
    },
};
</script>