<template>
    <div class="p-2 bg-grey d-flex flex-column justify-content-between">
        <div v-if="(isLoggedIn && !hasNoPrice) || (priceVisibilityStatus && !hasNoPrice)" class="dj-price">
            <div class="d-flex align-items-center">
                <div class="text-grey-4 font-500 size-18" v-html="itemPriceValue"></div>
                <div class="text-grey-6 ml-1">HT l'unité</div>
            </div>
            <div v-if="ecoTax.show" class="text-grey-6">
                (Dont éco-participation
                <span v-html="ecoTax.value"></span> HT)
            </div>
        </div>
        <div v-else class="dj-price" style="flex-grow: 1"></div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2">
            <DjQuantity
                :quantityIncrement="minimumOrder"
                :displayTitle="false"
                :quantityValue="quantity"
                :showIncrement="showIncrement"
                size="small"
                @child-quantity="quantityValue"
            />
            <DjButtonAddToQuote
                :quantity="quantity"
                :productId="productVariantId"
                :productName="productName"
                shape="icon"
                variant="light"
            />
            <DjButtonAddToCart
                :quantity="quantity"
                :offerId="offerExternalId"
                :minOrderQuantity="minimumOrder"
                shape="icon"
                variant="light"
                :isDisabled="onOrder || hasNoPrice"
            />
            <DjButtonAddToBuyingList
                :offerId="offerId"
                :productId="productVariantId"
                :productName="productName"
                :quantity="quantity"
                shape="icon"
                variant="light"
            />
        </div>
    </div>
</template>

<script>
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import { mapState } from 'vuex';

export default {
    name: 'DjProductThumbnailActions',
    components: {
        DjQuantity,
        DjButtonAddToCart,
        DjButtonAddToBuyingList,
        DjButtonAddToQuote,
    },
    props: {
        itemPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        minimumOrder: {
            type: Number,
            required: true,
            default: 1,
        },
        offerId: {
            type: String,
            required: true,
            default: null,
        },
        offerExternalId: {
            type: String,
            required: true,
            default: null,
        },
        productVariantId: {
            type: String,
            required: true,
            default: null,
        },
        productName: {
            type: String,
            required: false,
            default: '',
        },
        showIncrement: {
            type: Boolean,
            required: false,
            default: true,
        },
        offer: {
            type: Object,
            default: () => {},
        },
        priceVisibilityStatus: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            quantity: 1,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        onOrder() {
            if (this.offer?.offer) {
                const onQuote = this.$purjus.utils.extractOfferCustomFieldValuev2(this.offer.offer, 'devis');
                if (onQuote !== null) {
                    return onQuote === 'TRUE';
                }
            } else if (this.offer?.bestOffer) {
                const onQuote = this.$purjus.utils.extractOfferCustomFieldValue(this.offer.bestOffer, 'devis');
                if (onQuote !== null) {
                    return onQuote[0] === 'TRUE';
                }
            }
            return null;
        },
        itemPriceValue() {
            return this.$purjus.utils.formatPrice(this.itemPrice, this.currency);
        },
        ecoTax() {
            const ecoTaxValue =
                this.$purjus.utils.extractOfferCustomFieldValue(
                    this.offer.offer ?? this.offer.bestOffer,
                    'ecoparticipation',
                ) ?? 0;
            return {
                show: ecoTaxValue !== 0,
                value: this.$purjus.utils.formatPrice(ecoTaxValue, this.currency),
            };
        },
        stock() {
            return this.$core.getOffer.getOfferStock(this.offer.offer);
        },
        isLoggedIn() {
            return this.$auth.loggedIn;
        },
        hasNoPrice() {
            return this.itemPrice === 0;
        },
    },
    mounted() {
        this.quantity = this.minimumOrder;
    },
    methods: {
        quantityValue(params) {
            this.quantity = params;
        },
    },
};
</script>
