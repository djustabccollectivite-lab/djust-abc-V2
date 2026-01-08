<template v-if="offer && product">
    <DjCard class="Onhover">
        <div class="row d-flex pa-2">
            <div class="col-7 row ma-0">
                <div class="col-4">
                    <p class="text-h4">{{ $t('product.tabs.offers.supplier') }}</p>
                    <DjLink :to="`/vendor/${offerVendorId}`">
                        {{ $t('product.tabs.offers.name') }} : <strong> {{ offerVendor }}</strong>
                    </DjLink>
                    <p class="mb-2">{{ $t('product.tabs.offers.rating') }}:
                        <DjRating :nb="4" />
                    </p>
                </div>
                <div class="col-8">
                    <div v-if="offer" class="col-12 pa-0">
                        <VRadioGroup dense v-model="offerSelected" v-for="offerPrice in offerPrices" :key="offerPrice.id"
                            class="d-flex flex-row mt-0">
                            <DjOfferSelector :isSelected="offerSelected == offerPrice.id || offerPrices.length == 1"
                                :offer="offer" :offerPrice="offerPrice" :showRadioBtn="offerPrices.length > 1">
                            </DjOfferSelector>
                        </VRadioGroup>
                    </div>
                    <div v-else class="col-12 pa-0">
                        <DjAlert type="warning" outlined> {{ $t('product.noOffer') }} </DjAlert>
                    </div>
                </div>
            </div>
            <div class="col-5 dj-product__price-right">
                <div class="dj-product__shopping">
                    <div class="d-flex" v-if="$core.useShop.IsActive()">
                        <DjQuantity @child-quantity="quantityValue" :quantityIncrement="quantityPerPack" :key="increment"
                            :displayTitle="false" :showIncrement="true" class="quantity_to_cart" />
                        <DjButtonAddToCart :quantity="quantity" :offerId="offerSelected" :productName="productTitle"
                            :productPicture="productImage" :productSupplier="offerVendor"
                            class="button_to_cart flex-fill" />
                    </div>
                    <DjButtonAddToBuyingList v-if="$core.useWishlist.IsActive()" :quantity="quantity"
                        :offerId="offerSelected" :productName="productTitle" />
                    <DjButtonAddToQuote v-if="$core.useQuote.IsActive()" :quantity="quantity" :productId="productVariantId"
                        :productName="productTitle" />
                </div>
            </div>
        </div>
    </DjCard>
</template>

<script>
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjAlert from '@components/atoms/DjAlert/DjAlert.vue';
import DjRadioGroup from '@components/atoms/DjRadioGroup/DjRadioGroup.vue';
import DjRadio from '@components/atoms/DjRadio/DjRadio.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjOfferSelector from '@components/molecules/DjOfferSelector/DjOfferSelector.vue';

export default {
    name: 'PartialOffer',
    components: {
        DjRating,
        DjRadio,
        DjRadioGroup,
        DjButtonAddToCart,
        DjButtonAddToBuyingList,
        DjButtonAddToQuote,
        DjQuantity,
        DjAlert,
        DjCard,
        DjOfferSelector,
        DjLink,
    },
    props: {
        offer: {
            type: Object,
            require: true,
            default: () => { },
        },
        product: {
            type: Object,
            require: true,
            default: () => { },
        },
    },
    computed: {
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
        offerVendor() {
            return this.$core.getOffer.getOfferSupplierName(this.offer);
        },
        offerVendorId() {
            return this.$core.getOffer.getOfferSupplierId(this.offer);
        },
        offerQuantityInStock() {
            return this.$core.getOffer.getOfferStock(this.offer);
        },
        offerPrices() {
            return this.$core.getOffer.getOfferPrices(this.offer);
        },
        productVariantId() {
            return this.$core.getOffer.getOfferProductVariantId(this.offer);
        },
        productTitle() {
            return this.$core.getProduct.getProductTitle(this.product);
        },
        productImage() {
            return this.$core.getProduct.getProductMainImage(this.product);
        },
    },
    data() {
        return {
            quantity: this.offer.offerPrices[0].itemPerPack,
            quantityPerPack: this.offer.offerPrices[0].itemPerPack,
            offerSelected: this.offer.offerPrices[0].id,
            increment: 1,
        };
    },
    methods: {
        quantityValue(params) {
            this.quantity = params;
        },
    },
    watch: {
        offerSelected: {
            handler: function (value) {
                const offerSelected = this.offer.offerPrices.find((offerPrice) => offerPrice.id === value);
                this.quantityPerPack = offerSelected.itemPerPack;
                this.quantity = offerSelected.itemPerPack;
                this.increment += 1;
            },
        },
        offerPrices() {
            (this.quantity = this.offerPrices[0].itemPerPack),
                (this.quantityPerPack = this.offerPrices[0].itemPerPack),
                (this.offerSelected = this.offerPrices[0].id),
                (this.increment += 1);
        },
    },
};
</script>

<style lang="scss" scoped>
.Onhover {
    &:hover {
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
}
</style>
