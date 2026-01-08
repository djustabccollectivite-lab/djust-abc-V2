<template lang="html">
    <DjProductsSlider :title="$t('product.relatedProducts')" :products="products" :displayLine="displayLine" />
</template>

<script>
import DjProductsSlider from '@components/organisms/DjProductsSlider/DjProductsSlider.vue';

export default {
    name: 'DjFeaturedProducts',
    components: { DjProductsSlider },
    props: {
        products: {
            type: Array,
            default: () => [],
        },
        displayLine: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
