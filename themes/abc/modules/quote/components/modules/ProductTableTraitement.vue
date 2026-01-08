<template>
    <div v-if="product">
        <nuxt-link :to="localePath(`/product/${$core.getProduct.getProductSku(product)}`)">
            <ProductSmall
                :image="product ? $core.getProduct.getProductMainImage(product) : null"
                :name="product ? $core.getProduct.getProductTitle(product) : null"
                :brand="product ? $core.getProduct.getProductBrand(product) : null"
                :mpn="product ? $core.getProduct.getProductNpm(product) : null"
            />
        </nuxt-link>
    </div>
</template>

<script>
import ProductSmall from '@components/organisms/productCard/ProductSmall.vue';

export default {
    name: 'ProductTableTraitement',
    components: {
        ProductSmall,
    },
    props: {
        sku: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            product: null,
        };
    },
    async created() {
        this.product = this.sku ? await this.$core.useProduct.getProductsBySku(this.sku) : null;
    },
    computed: {
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
    },
};
</script>
