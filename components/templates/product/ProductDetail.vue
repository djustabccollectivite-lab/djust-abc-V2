<template>
    <div class="dj-product--detail dj-product--full-content">
        <div class="dj-product__top">
            <div class="dj-product__header justify-content-between">
                <div class="product__info__left">
                    <DjThumbnail
                        type="default"
                        :images="variantToDisplay?.productPictures ?? productPictures"
                        :productInfos="product"
                        :key="increment"
                        :increment="increment"
                    />

                    <Description
                        :product="product"
                        :offers="offers"
                        type="tabs"
                        :displayReview="false"
                        :displayOtherOffers="false"
                        :displaySpecifications="false"
                        :reviews="reviews"
                        :key="increment + 1"
                    />
                </div>

                <div class="product__info__right">
                    <div class="section-product pt-4 pb-4">
                        <ProductInfos :product="product" :offer="offers" />
                        <BuyingZone v-if="offerToDisplay" :product="product" :offer="offerToDisplay" :main="true" />

                        <div v-else class="title__h5 pt-4">{{ $t('product.noOffer') }}</div>
                    </div>

                    <OtherOffers
                        v-if="offers && offers.length > 1"
                        :offers="offers"
                        :product="product"
                        class="section-product"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Description from '@components/organisms/description/Description.vue';
import DjThumbnail from '@components/molecules/DjThumbnail/DjThumbnail.vue';
import BuyingZone from '@components/templates/product/modules/BuyingZone.vue';
import OtherOffers from '@components/templates/product/modules/OtherOffers.vue';
import ProductInfos from '@components/templates/product/modules/ProductInfos.vue';
import { mapState } from 'vuex';

export default {
    name: 'ProductDetail',
    components: {
        ProductInfos,
        DjThumbnail,
        BuyingZone,
        OtherOffers,
        Description,
    },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {},
        },
        reviews: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
    data: () => ({
        catalogMode: process.env.catalog_mode === 'true' ? true : false,
        increment: 1,
    }),
    computed: {
        ...mapState({
            offers: (state) => state.offers.offersToDisplay,
            variantToDisplay: (state) => state.offers.variantToDisplay,
        }),
        offerToDisplay() {
            return this.offers ? this.$core.getOffer.getBestOfferFromList(this.offers) : null;
        },
        productPictures() {
            return this.$core.getProduct.getProductPictures(this.product);
        },
    },
    async created() {
        this.$nuxt.$on('findOfferIdToDisplay', async (val) => {
            await this.$core.useOffer.findOfferIdToDisplay(val);
            this.increment++;
        });
        this.$nuxt.$on('findVariantIdToDisplay', async (val) => {
            await this.$core.useOffer.findVariantIdToDisplay(val);
            this.increment++;
        });
    },
    beforeDestroy() {
        this.$nuxt.$off('findOfferIdToDisplay');
    },
};
</script>

<style lang="scss" scoped>
.section-product {
    background: #ffffff;
    border-radius: 20px;
}
</style>
