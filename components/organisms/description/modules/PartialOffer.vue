<template>
    <div v-if="offers">
        <div v-for="offer in offers" :key="offer.id" class="ma-0 mt-2 mb-4 dj-product__price-right">
            <PartialOfferDetailOffer :offer="offer" :product="product" />
        </div>
    </div>
</template>

<script>
import PartialOfferDetailOffer from '@components/organisms/description/modules/PartialOfferDetailOffer.vue';
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'PartialOffer',
    components: {
        PartialOfferDetailOffer,
    },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {},
        },
        offers: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
});
</script>

<style lang="scss" scoped></style>
