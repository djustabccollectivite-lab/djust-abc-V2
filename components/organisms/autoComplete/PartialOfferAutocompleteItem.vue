<template lang="html">
    <div class="col-12 pa-0">
        <div class="" style="justify-content: space-between">
            <DjLink :to="`/vendor/${supplierId}`">
                <span class="text-body-1">{{ $t('product.tabs.offers.supplier') }}:{{ supplierName }}</span>
            </DjLink>
            <div class="pl-0">
                <small
                    >sold by
                    {{ offerPrice.itemPerPack > 1 ? 'set (' + offerPrice.itemPerPack + ' units)' : 'item' }}</small
                ><br />
                <DjPrice :price="offerBestPrice" :originPrice="offerBestPrice" :currency="currency" />
                <small
                    v-if="offerPrice.itemPerPack > 1"
                    v-html="
                        '(' +
                        $core.getApp.getFormatPrice(offerBestPrice * offerPrice.itemPerPack, currency) +
                        ' per set)'
                    "
                ></small>
            </div>
        </div>
        <div class="dj-product__shopping_auto d-flex" style="align-items: center; justify-content: space-between">
            <DjQuantity
                @child-quantity="quantityValue"
                :quantityIncrement="quantityPerPack"
                :key="increment"
                :displayTitle="false"
                class="mr-1"
            />
            <DjButtonAddToCart
                v-if="$core.useShop.IsActive()"
                :quantity="quantity"
                :productSupplier="supplierName"
                :productPicture="productImage"
                :offerId="offerId"
                :productName="productName"
                styleB="icon"
            />
            <DjButtonAddToBuyingList
                v-if="$core.useWishlist.IsActive()"
                :quantity="quantity"
                :offerId="offerId"
                :productName="productName"
                styleB="icon"
            />
            <DjButtonAddToQuote
                v-if="$core.useQuote.IsActive()"
                :quantity="quantity"
                :productId="productVariantId"
                :productName="productName"
                styleB="icon"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import DjRating from '@components/atoms/DjRating/DjRating.vue';
import DjPrice from '@components/atoms/DjPrice/DjPrice.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';

import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';

export default {
    name: 'PartialOfferAutocompleteItem',
    components: {
        DjButtonAddToCart,
        DjButtonAddToBuyingList,
        DjButtonAddToQuote,
        DjQuantity,
        DjRating,
        DjPrice,
        DjLink,
    },
    props: {
        offer: {
            type: Object,
            require: true,
            default: () => {},
        },
        offerPrice: {
            type: Object,
            require: true,
            default: () => {},
        },
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
        offerBestPrice() {
            return this.$core.getOffer.getFirstPriceFromOfferPrice(this.offerPrice, this.currency, false);
        },
        offerId() {
            return this.$core.getOffer.getOfferId(this.offerPrice);
        },
        supplierName() {
            return this.$core.getOffer.getOfferSupplierName(this.offer);
        },
        supplierId() {
            return this.$core.getOffer.getOfferSupplierId(this.offer);
        },
        productName() {
            return this.product.name;
        },
        productImage() {
            return this.product.MainImageUrl;
        },
        productId() {
            return this.product.id;
        },
        productVariantId() {
            return this.$core.getOffer.getOfferProductVariantId(this.offer);
        },
    },
    data() {
        return {
            quantity: this.offerPrice.itemPerPack,
            quantityPerPack: this.offerPrice.itemPerPack,
            increment: 1,
        };
    },
    methods: {
        quantityValue(params) {
            this.quantity = params;
        },
    },
};
</script>

<style lang="scss" scoped></style>
