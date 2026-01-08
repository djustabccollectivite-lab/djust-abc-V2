<template>
    <div class="dj-product__infos">
        <div class="dj-product__div__title d-flex align-items-end">
            <div class="dj-product__title">
                {{ productTitle }}
            </div>
        </div>
        <div>
            <div class="d-flex">
                <div style="width: 50%" class="dj-product__small-info">
                    {{ $t('common.brand') }}
                </div>
                <DjLink :to="localePath(`/product/${productSku}`)" class="dj-product__small-info_value">
                    {{ brandName }}
                </DjLink>
            </div>
            <div class="d-flex">
                <div style="width: 50%" class="dj-product__small-info">
                    {{ $t('common.supplierRef') }}
                </div>
                <DjLink :to="localePath(`/product/${productSku}`)" class="dj-product__small-info_value">
                    {{ productSku }}
                </DjLink>
            </div>
        </div>
        <div v-if="rating" class="dj-product__rating dj-product__div__rating">
            <DjRating :nb="rating" />
            <span v-if="nbReview">{{ nbReview }}</span>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'DjProductThumbnailInfo',
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
        nbReview: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        productSku: {
            type: String,
            default: 'EZ08232HK',
        },
    },
});
</script>
