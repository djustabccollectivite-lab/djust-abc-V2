<template>
    <div class="d-flex" :class="showRadioBtn && isSelected ? 'offerChoice selected' : showRadioBtn ? 'offerChoice' : null">
        <v-radio :value="offerPrice.id" class="mt-5" :style="showRadioBtn ? null : 'display:none'"> </v-radio>
        <DjBuyingZonePrice :offerPrice="offerPrice" :offer="offer" :product="product" />
    </div>
</template>
<script>
import DjBuyingZonePrice from '@components/molecules/DjOfferSelector/modules/DjBuyingZonePrice.vue';
import DjRadio from '@components/atoms/DjRadio/DjRadio.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'DjOfferSelector',
    components: {
        DjCard,
        DjRadio,
        DjBuyingZonePrice,
    },
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        },
        offerPrice: {
            type: [Object, Array],
            default: () => { },
        },
        product: {
            type: Object,
            require: true,
            default: () => { },
        },
        offer: {
            type: Object,
            default: () => { },
        },
        showRadioBtn: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
<style lang="scss">
.offerChoice {
    border: 1px solid #d3d2d6;
    border-radius: 4px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        border: 1px solid var(--color-primary);
    }

    &.selected {
        border: 2px solid var(--color-primary);
    }
}
</style>
