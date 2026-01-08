<template lang="html">
    <div class="product__section">
        <ProductThumbnail :product="product" class="dj-product-bg" orientation="horizontal" />
        <ProductThumbnail :product="product" class="dj-product--mobile" />
    </div>
</template>
<script>
import { mapState } from 'vuex';
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';

export default {
    components: {
        ProductThumbnail,
    },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {},
        },
        line: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
        productInfos() {
            return this.$core.getThumbnails.getProductFromThumbnail(this.product);
        },
        productImages() {
            return this.$core.getProduct.getProductThumbnails(this.productInfos);
        },
        productBrandName() {
            return this.$core.getProduct.getProductBrand(this.productInfos);
        },
        productTitle() {
            return this.$core.getProduct.getProductTitle(this.productInfos);
        },
        productId() {
            return this.$core.getProduct.getProductId(this.productInfos);
        },
        productSku() {
            return this.$core.getProduct.getProductSku(this.productInfos);
        },
        productVariantId() {
            return this.product.bestOffer?this.$core.getOffer.getOfferProductVariantId(this.product.bestOffer):null;
        },
        rating() {
            return this.$core.getThumbnails.getProductThumbnaiRating(this.product);
        },
        nbReview() {
            return this.$core.getThumbnails.getProductThumbnailNbReviews(this.product);
        },
        offer() {
            return this.$core.getThumbnails.getProductThumbnailBestOffer(this.product);
        },
        productTagsToDisplay() {
            return this.$core.getProduct.getProductTags(this.productInfos);
        },
        isSale() {
            if (this.product.is_sale) {
                return true;
            }
            return false;
        },
        isInPromotion() {
            if (this.product.product.tags.filter((tag) => tag.name === 'promo').length > 0) {
                return true;
            }
            return false;
        },
    },
    data: () => ({
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        quickviewDialog: false,
        isHiding: false,
        quantity: 1,
    }),
    methods: {
        quantityValue(params) {
            this.quantity = params;
        },
    },
};
</script>
<style lang="scss" scoped>
@media (min-width: 640px) {
    .dj-product--mobile {
        display: none !important;
    }
}

@media (max-width: 640px) {
    .product__section {
        text-align: -webkit-center !important;
    }
    .dj-product-bg {
        display: none !important;
    }
    .dj-product--mobile {
        display: flex !important;
        width: auto !important;
    }
}
</style>
