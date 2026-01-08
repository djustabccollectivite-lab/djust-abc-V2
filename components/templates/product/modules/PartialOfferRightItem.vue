<template>
    <div class="cols-12" v-if="product">
        <div class="col-12 pa-0">
            <DjCard classCss="shadow2xl" headerColor="#FFFFFFF">
                <div class="pl-3 pt-4">
                    {{ $t('product.tabs.offers.supplier') }}:
                    <DjLink :to="`/vendor/${offerVendorId}`" class="dj-product--supplier">
                        <strong> {{ offerVendor }}</strong>
                    </DjLink>
                </div>
                <BuyingZone :offer="offer" :product="product" />
            </DjCard>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import BuyingZone from '@components/templates/product/modules/BuyingZone.vue';

export default {
    name: 'PartialOfferRightItem',
    components: {
        DjLink,
        DjCard,
        BuyingZone,
    },
    props: {
        offer: {
            type: Object,
            require: true,
            default: () => {},
        },
        product: {
            type: Object,
            require: false,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        offerVendor() {
            return this.$core.getOffer.getOfferSupplierName(this.offer);
        },
        offerVendorId() {
            return this.$core.getOffer.getOfferSupplierId(this.offer);
        },
        offerPrices() {
            return this.$core.getOffer.getOfferPrices(this.offer);
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
        offerSelected(value) {
            const offerSelected = this.offer.offerPrices.find((offerPrice) => offerPrice.id === value);
            this.quantityPerPack = offerSelected.itemPerPack;
            this.increment += 1;
        },
    },
};
</script>

<style lang="scss" scoped>
.shadow2xl {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
