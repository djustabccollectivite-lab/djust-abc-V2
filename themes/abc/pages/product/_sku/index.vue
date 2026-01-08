<template>
    <client-only>
    <Product :sku="skuProduct" />
    </client-only>
</template>

<script>
import Product from '@components/pages/product/product.vue';

export default {
    name: 'ProductPage',
    auth: process.env.store_type === 'private' ? null : false,
    transition: 'zoom',
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        Product,
    },
    computed: {
        skuProduct() {
            return this.$route.params.sku
        }
    },
};
</script>
