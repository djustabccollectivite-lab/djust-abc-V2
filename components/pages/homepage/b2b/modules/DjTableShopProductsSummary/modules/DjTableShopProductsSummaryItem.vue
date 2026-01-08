<template>
    <DjTableRow>
        <DjTableData>
            <ProductCart
                :productSku="$core.getProduct.getProductSku(this.productInfos)"
                :productImage="$core.getProduct.getProductThumbnails(this.productInfos)[0].url"
                :productName="$core.getProduct.getProductTitle(this.productInfos)"
                :productBrand="$core.getProduct.getProductBrand(this.productInfos)"
                :supplierName="$core.getOffer.getOfferSupplierName(this.product.bestOffer)"
                :productPerPack="$core.getOffer.getOfferItemPerPack(this.product.bestOffer.offerPrice)"
            />
        </DjTableData>
        <DjTableData>
            <i class="icon-3d-rotate"></i> <strong>{{ stock }}</strong>
        </DjTableData>
        <DjTableData>
            <DjPrice
                :price="offer.price"
                :originPrice="offer.discrountPrice"
                :currency="currency"
                class="mr-2 priceText"
            />
        </DjTableData>
        <DjTableData>
            <DjProductThumbnailActions
                :itemPrice="offer.price"
                :quantityPerPack="quantityPerPack"
                :offerId="offer.id"
                :productVariantId="productVariantId"
                :productName="productTitle"
            />
        </DjTableData>
    </DjTableRow>
</template>

<script>
import { mapState } from 'vuex';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjPrice from '@components/atoms/DjPrice/DjPrice.vue';
import DjTable from '@components/organisms/DjTable/DjTable.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import ProductCart from '@components/organisms/productCard/ProductCart.vue';
import DjProductThumbnailActions from '@components/molecules/DjProductThumbnailActions/DjProductThumbnailActions.vue';

export default {
    name: 'TableShopProductsSummaryItem',
    components: {
        DjButtonAddToCart,
        DjButtonAddToBuyingList,
        DjButtonAddToQuote,
        DjRating,
        DjQuantity,
        DjPrice,
        DjTable,
        DjLink,
        ProductCart,
        DjProductThumbnailActions,
    },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {},
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
            return this.$core.getProductVariant.getProductId(this.product.bestOffer.offerInventory.variant);
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
        supplierName() {
            return this.$core.getOffer.getOfferSupplierName(this.product.bestOffer);
        },
        supplierId() {
            return this.$core.getOffer.getOfferSupplierId(this.product.bestOffer);
        },
        stock() {
            return this.$core.getOffer.getOfferStock(this.product.bestOffer);
        },
        quantityPerPack() {
            return this.$core.getOffer.getOfferItemPerPack(this.product.bestOffer?this.product.bestOffer.offerPrice:null);
        },
    },
    data() {
        return {
            quantity: this.product.bestOffer.offerPrice.itemPerPack,
        };
    },
    methods: {
        quantityValue(params) {
            this.quantity = params;
        },
    },
};
</script>

<style>
.dj-product__title {
    font-size: 12px !important;
    font-weight: 500 !important;
}
.dj-product__vendor {
    font-size: 14px !important;
}

.priceText {
    font-size: 18px;
    font-weight: 500;
}

.largeIcon {
    width: 50px !important;
    background: black;
    color: white !important;
    align-items: center;
    display: flex;
    flex-flow: row;
    border-radius: 4px;
    flex-direction: column;
}
</style>
