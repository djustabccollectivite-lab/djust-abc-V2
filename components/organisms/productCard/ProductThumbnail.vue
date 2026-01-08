<template>
    <DjCardProduct>
        <div class="dj-product" :class="orientationDisplay">
            <div class="dj-product__thumbnail">
                <div class="dj-product__thumbnail-content">
                    <DjLink :href="localePath(`/product/${productSku}`)" v-if="orientation == 'vertical'">
                        <transition mode="out-in">
                            <DjImage :width="400" :height="400" :src="mainImage" />
                        </transition>
                    </DjLink>
                    <DjLink :href="localePath(`/product/${productSku}`)" v-else>
                        <transition mode="out-in">
                            <DjImage v-if="mainImage" :width="100" :height="100" :src="mainImage" :alt="productTitle" />
                        </transition>
                    </DjLink>
                </div>
                <div v-if="productTagsToDisplay" class="dj-product__badge__zone">
                    <div v-for="tag in productTagsToDisplay" class="dj-product__badge mb-1" :key="tag">{{ tag }}</div>
                </div>
            </div>
            <DjProductThumbnailInfo
                :productTitle="productVariantTitle ?? productTitle"
                :brandName="productBrandName"
                :productSku="productSku"
                :rating="rating"
                :nbReview="nbReview"
            />
            <DjProductThumbnailActions
                v-if="itemPrice"
                :itemPrice="itemPrice"
                :quantityPerPack="quantityPerPack"
                :offerId="offerId"
                :productVariantId="productVariantId"
                :productName="productTitle"
            />
            <DjModal v-model="quickviewDialog" width="1200">
                <div class="dj-dialog">
                    <DjLink class="dj-dialog__close" @click.prevent="quickviewDialog = false">
                        <i class="icon icon-cross"></i>
                    </DjLink>
                    <product-quickview :product="product" />
                </div>
            </DjModal>
        </div>
    </DjCardProduct>
</template>

<script>
import { mapState } from 'vuex';
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import DjPrice from '@components/atoms/DjPrice/DjPrice.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';

import DjCardProduct from '@components/molecules/DjCardProduct/DjCardProduct.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';

import DjProductThumbnailInfo from '@components/molecules/DjProductThumbnailInfo/DjProductThumbnailInfo.vue';
import DjProductThumbnailActions from '@components/molecules/DjProductThumbnailActions/DjProductThumbnailActions.vue';

export default {
    components: {
        DjRating,
        DjButtonAddToCart,
        DjButtonAddToBuyingList,
        DjButtonAddToQuote,
        DjPrice,
        DjLink,
        DjModal,
        DjImage,
        DjCardProduct,
        DjButton,
        DjQuantity,
        DjProductThumbnailInfo,
        DjProductThumbnailActions,
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
        orientation: {
            type: String,
            default: 'vertical',
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
        productPictures() {
            return this.$core.getProduct.getProductPictures(this.productInfos);
        },
        productBrandName() {
            return this.$core.getProduct.getProductBrand(this.productInfos);
        },
        productTitle() {
            return this.$core.getProduct.getProductTitle(this.productInfos);
        },
        productVariantTitle() {
            return this.$core.getThumbnails.getProductBestOfferName(this.product);
        },
        productId() {
            return this.$core.getProduct.getProductId(this.productInfos);
        },
        productSku() {
            return this.$core.getProduct.getProductSku(this.productInfos);
        },
        productVariantId() {
            return this.product.bestOffer ? this.$core.getOffer.getOfferProductVariantId(this.product.bestOffer) : null;
        },
        rating() {
            return this.$core.getThumbnails.getProductThumbnaiRating(this.product);
        },
        nbReview() {
            return this.$core.getThumbnails.getProductThumbnailNbReviews(this.product);
        },
        itemPrice() {
            return this.product.bestOffer
                ? this.$core.getOffer.getFirstPriceFromOfferPrice(this.product.bestOffer.offerPrice)
                : null;
        },
        quantityPerPack() {
            return this.product.bestOffer
                ? this.$core.getOffer.getOfferItemPerPack(this.product.bestOffer.offerPrice)
                : null;
        },
        offerId() {
            return this.product.bestOffer ? this.$core.getOffer.getOfferId(this.product.bestOffer.offerPrice) : null;
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
        orientationDisplay() {
            return this.orientation === 'vertical' ? ' dj-product-vertical' : 'dj-product-horizontal';
        },
        mainImage() {
            let productsPics = this.$core.getProduct.getProductPictures(this.productInfos);
            return productsPics.length > 1 ? productsPics.find((media) => media.isMain == true) : productsPics[0];
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
