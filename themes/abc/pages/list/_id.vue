<template>
    <client-only>
        <ShopByCategoryID />
    </client-only>
</template>

<script>
import ShopByCategoryID from '@components/pages/categoryPage/ShopByCategoryID.vue';

export default {
    name: 'ShopPage',
    auth: process.env.store_type === 'private' ? null : false,
    components: {
        ShopByCategoryID,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition() {
        return 'fadeIn';
    },
};
</script>
