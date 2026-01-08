<template>
    <div class="dj-product__small">
        <div class="dj-product__thumbnail__small">
            <div v-if="image">
                <DjImage :key="Math.random()" :src="image" :alt="name" />
            </div>
        </div>
        <div class="ml-2">
            <nuxt-link :to="'/product/' + sku">
                <div class="dj-product_small_title d-flex align-items-end">
                    <div class="text-black">
                        {{ name }}
                    </div>
                </div>
            </nuxt-link>
            <div class="d-flex pb-1">
                <nuxt-link :to="'/product/' + sku" class="w-full">
                    <span class="text-black">{{ brand }}</span>
                </nuxt-link>
            </div>
            <slot />
        </div>
    </div>
</template>

<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
    name: 'ProductSmall',
    components: { DjImage },
    props: {
        image: {
            type: [String, Object],
            required: false,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: false,
            default: '',
        },
        sku: {
            type: String,
            required: false,
            default: null,
        },
        navigationCategoryName: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-product__small {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    width: 100%;
    max-width: 100%;
    min-width: 245px;
    padding: 5px 0;
    margin: 0;
    > * {
        flex-basis: 100%;
    }
    .dj-product__thumbnail__small {
        min-width: 60px;
        flex-basis: 60px;
    }
}
</style>
