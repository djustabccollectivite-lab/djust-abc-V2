<template>
    <div class="card-product h-full">
        <div class="p-2 d-flex flex-column gap-2 h-full">
            <div class="stickers">
                <div class="sticker-container">
                    <div v-if="shippingTime" class="bg-primary rounded px-2 fit-content font-700 mb-1 shipping-time">
                        {{ shippingTime }}
                    </div>
                    <div
                        v-if="onOrder || itemPrice === 0 || (!logIn && !priceVisibilityStatus)"
                        class="bg-black rounded px-2 fit-content text-white font-700 mb-1"
                    >
                        Sur devis
                    </div>
                </div>
            </div>

            <a :href="localePath(`/product/${productSku}?variantId=${product?.offer?.id}`)">
                <transition mode="out-in">
                    <DjImage v-if="product" :width="310" :height="310" :src="product.variant" :alt="productTitle" />
                </transition>
            </a>
            <DjProductThumbnailInfo
                :productTitle="productTitle"
                :brandName="productBrandName"
                :nbReview="nbReview"
                :productSku="productSku"
                :productReference="productReference"
                :offer="product"
                class="flex-grow-1"
            />
            <DjProductThumbnailActions
                v-if="itemPrice !== null"
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
        productId() {
            return this.$core.getProduct.getProductId(this.productInfos);
        },
        productSku() {
            return this.$core.getProduct.getProductSku(this.productInfos);
        },
        productMpn() {
            return this.$core.getProduct.getProductNpm(this.productInfos);
        },
        productReference() {
            return this.product.product.externalId;
        },
        productVariantId() {
            return this.product.variant ? this.$core.getOffer.getOfferVariantId(this.product) : null;
        },
        rating() {
            return this.$core.getThumbnails.getProductThumbnaiRating(this.product);
        },
        nbReview() {
            return this.$core.getThumbnails.getProductThumbnailNbReviews(this.product);
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
            return this.product.offerPrice.externalId;
        },
        productTagsToDisplay() {
            return this.$core.getProduct.getProductTags(this.productInfos);
        },
        productRefCiale() {
            const ref = this.product.product.attributeValues.find(
                (attr) => attr.attribute.externalId === 'Manu_RefCiale',
            );
            return ref ? ref.value : null;
        },
        mainImage() {
            return this.product.variant;
        },
        shippingTime() {
            if (this.product.offer) {
                return this.$purjus.utils.extractOfferCustomFieldValuev2(this.product.offer, 'delais_livraison');
            } else if (this.product.bestOffer) {
                return this.$purjus.utils.extractOfferCustomFieldValue(this.product.bestOffer, 'delais_livraison');
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

.stickers {
    position: absolute;
    z-index: 2;
}

.sticker-container {
    position: relative;
    top: 5px;
    left: 5px;
}

.shipping-time {
    color: black;
}
.acodis .shipping-time {
    color: white;
}
</style>
