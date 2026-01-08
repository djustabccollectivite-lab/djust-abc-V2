<template lang="html">
    <ShopByCategoryID :categoryId="categoryId" />
</template>

<script>
import ShopByCategoryID from '@components/pages/categoryPage/ShopByCategoryID.vue';

export default {
    name: 'ShopPage',
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
    async asyncData({ params }) {
        const categoryId = String(params.id);
        return { categoryId };
    },
};
</script>

<style lang="scss" scoped></style>
