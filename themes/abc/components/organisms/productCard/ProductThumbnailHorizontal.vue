<template>
    <div class="card-product">
        <div class="p-2 thumbnail-horizontal">
            <div class="d-flex align-items-center gap-4">
                <a :href="localePath(`/product/${productSku}?variantId=${product?.offer?.id}`)">
                    <transition mode="out-in">
                        <DjImage v-if="mainImage" :width="100" :height="100" :src="mainImage" :alt="productTitle" />
                    </transition>
                </a>
                <div class="text-ellipsis">
                    <DjProductThumbnailInfo
                        :productTitle="productVariantTitle ? productVariantTitle : productTitle"
                        :brandName="productBrandName"
                        :productSku="productSku"
                        :productExID="product.product.externalId"
                        :offer="product"
                    />
                    <div v-if="shippingTime" class="shipping-time bg-primary rounded px-2 fit-content font-700 mb-1">
                        {{ shippingTime }}
                    </div>
                    <div>
                        <div
                            v-if="onOrder || itemPrice === 0 || (!logIn && !priceVisibilityStatus)"
                            class="bg-black rounded px-2 fit-content text-white font-700 mb-1"
                        >
                            Sur devis
                        </div>
                    </div>
                </div>
            </div>
            <DjProductThumbnailActions
                class="thumbnail-horizontal-actions rounded"
                :quantityPerPack="quantityPerPack"
                :minimumOrder="quantityPerPack"
                :itemPrice="itemPrice"
                :offerId="offerId"
                :offerExternalId="offerExternalId"
                :productVariantId="productVariantId"
                :productName="productTitle"
                :offer="product"
                :priceVisibilityStatus="priceVisibilityStatus"
            />
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import DjProductThumbnailInfo from '@components/molecules/DjProductThumbnailInfo/DjProductThumbnailInfo.vue';
import DjProductThumbnailActions from '@components/molecules/DjProductThumbnailActions/DjProductThumbnailActions.vue';

export default {
    components: {
        DjImage,
        DjProductThumbnailInfo,
        DjProductThumbnailActions,
    },
    props: {
        product: {
            type: Object,
            required: true,
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
    data: () => ({
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        isHiding: false,
        quantity: 1,
    }),
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
        logIn() {
            return this.$auth.loggedIn;
        },
        productInfos() {
            return this.$core.getThumbnails.getProductFromThumbnail(this.product);
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
            return this.product.variant ? this.$core.getOffer.getOfferVariantId(this.product) : null;
        },
        itemPrice() {
            if (this.product.offerPrice) {
                return this.product.offerPrice.unitPrice;
            } else {
                return this.product.bestOffer
                    ? this.$core.getOffer.getFirstPriceFromOfferPrice(this.product.bestOffer.offerPrice)
                    : null;
            }
        },
        quantityPerPack() {
            return this.product.offerPrice ? this.$core.getOffer.getOfferItemPerPack(this.product.offerPrice) : null;
        },
        offerId() {
            return this.product.offerPrice ? this.$core.getOffer.getOfferId(this.product.offerPrice) : null;
        },
        offerExternalId() {
            return this.product.offerPrice?.externalId;
        },
        mainImage() {
            const productsPics = this.$core.getProductVariant.getProductPictures(this.product.variant);
            let mainImage;
            if (productsPics.length > 1) {
                mainImage = productsPics.find((media) => media.main === true);
                if (!mainImage) {
                    mainImage = productsPics[0];
                }
            } else {
                mainImage = productsPics[0];
            }
            return mainImage?.url;
        },
        shippingTime() {
            if (this.product.offer) {
                return this.$purjus.utils.extractOfferCustomFieldValuev2(this.product.offer, 'delais_livraison');
            }
            return null;
        },
        onOrder() {
            if (this.product.offer) {
                const onQuote = this.$purjus.utils.extractOfferCustomFieldValuev2(this.product.offer, 'devis');
                if (onQuote !== null) {
                    return onQuote === 'TRUE';
                }
            } else if (this.product.bestOffer) {
                const onQuote = this.$purjus.utils.extractOfferCustomFieldValue(this.product.bestOffer, 'devis');
                if (onQuote !== null) {
                    return onQuote[0] === 'TRUE';
                }
            }
            return null;
        },
        priceVisibilityStatus() {
            return this.product.attributes.find((el) => el.externalId === 'Visibilité_Prix')?.value === 'Oui';
        },
    },
    methods: {
        quantityValue(params) {
            this.quantity = params;
        },
    },
};
</script>

<style lang="scss" scoped>
.card-product {
    width: 100%;
    border-radius: var(--radius-product-thumbnail);
    background-color: var(--background-product-thumbnail);
    box-shadow: var(--shadow-thumbnail);
}

.thumbnail-horizontal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    @media screen and (min-width: 960px) {
        display: flex;
        flex-direction: row;
    }
}

.thumbnail-horizontal-actions {
    width: 100%;
    @media screen and (min-width: 960px) {
        width: 230px;
    }
}

.shipping-time {
    color: black;
}
.acodis .shipping-time {
    color: white;
}
</style>
