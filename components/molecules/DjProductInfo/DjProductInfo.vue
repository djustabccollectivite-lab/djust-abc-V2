<template lang="html">
    <div class="dj-product__info">
        <h1>{{ productTitle }}</h1>
        <DjLink :to="'/vendor/' + supplier.id" class="dj-product--supplier">
            {{ supplier.name }}
        </DjLink>
        <div class="dj-product__meta">
            <p>
                {{ $t('product.brand') }}:
                <DjLink to="/list" class="ml-2 text-capitalize">
                    {{ brandName }}
                </DjLink>
            </p>
            <!-- <div class="dj-product__rating">
                <DjRating :nb="Number(totalRating)" />
                <span v-if="reviews">({{reviews.length}} {{ $t('product.review') }})</span>
            </div> -->
        </div>
        <slot></slot>
    </div>
</template>

<script>
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

import { defineComponent, useContext, ref } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'DjProductInfo',
    components: {
        DjLink,
        DjRating,
    },
    props: {
        productTitle: {
            type: String,
            default: '',
        },
        brandName: {
            type: String,
            default: '',
        },
        totalRating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Array,
            default: [],
        },
        supplier: {
            type: Object,
            default: '',
        },
    },
    setup(props) {
        const ctx = useContext();

        return {};
    },
});
</script>

<style lang="scss" scoped></style>
