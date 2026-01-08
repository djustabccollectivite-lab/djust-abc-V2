<template>
    <div class="dj-product--cart" v-if="product">
        <DjLink :to="localePath(`/product/${$core.getProduct.getProductSku(product)}`)">
            <ProductSmall
                :image="product ? $core.getProduct.getProductMainImage(product) : null"
                :name="product ? $core.getProduct.getProductTitle(product) : null"
                :brand="product ? $core.getProduct.getProductBrand(product) : null"
                :mpn="product ? $core.getProduct.getProductNpm(product) : null"
                :navigationCategoryName="product ? $core.getProduct.getProductCategory(product) : null"
            />
        </DjLink>
    </div>
</template>

<script>
import ProductSmall from '@components/organisms/productCard/ProductSmall.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'ProductTableTraitement',
    components: {
        ProductSmall,
        DjLink,
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

<style></style>
