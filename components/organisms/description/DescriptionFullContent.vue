<template lang="html">
    <div class="dj-product__content_page">
        <div class="title__h3 dj-product__heading">{{ $t('product.tabs.description') }}</div>
        <partial-description :description="productDescription" class="dj-product__content_page" />
        <div v-if="productSpecifications.length > 0" class="title__h3 dj-product__heading">
            {{ $t('product.tabs.specifications') }}
        </div>
        <partial-specification
            v-if="productSpecifications.length > 0"
            :specifications="productSpecifications"
            class="dj-product__content_page"
        />
        <div v-if="productAttributes.length > 0" class="title__h3 dj-product__heading">{{ $t('product.tabs.attributes') }}</div>
        <partial-attributes
            v-if="productAttributes.length > 0"
            :attributes="productAttributes"
            class="dj-product__content_page"
        />
        <div class="title__h3 dj-product__heading">{{ $t('product.tabs.reviews.tabName') }}</div>
        <partial-review :review="rating" :productSku="product.sku" class="dj-product__content_page" />
        <div v-if="nbOffers > 1" class="title__h3 dj-product__heading">{{ $t('product.tabs.offers.tabName') }}</div>
        <div v-if="!catalogMode && nbOffers > 1" class="dj-block--questions-answers">
            <partial-offer
                v-if="product && offers"
                :product="product"
                :offers="offers"
                class="dj-product__content_page"
            />
        </div>
    </div>
</template>

<script>
import PartialDescription from '@components/organisms/description/modules/PartialDescription.vue';
import PartialSpecification from '@components/organisms/description/modules/PartialSpecification.vue';
import PartialAttributes from '@components/organisms/description/modules/PartialAttributes.vue';
import PartialReview from '@components/organisms/description/modules/PartialReview.vue';
import PartialOffer from '@components/organisms/description/modules/PartialOffer.vue';
import { defineComponent, ref, useContext, computed } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'DescriptionFullContent',
    components: {
        PartialOffer,
        PartialReview,
        PartialSpecification,
        PartialDescription,
        PartialAttributes,
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
    setup(props) {
        const ctx = useContext();
        const nbOffers = computed(() => props.offers.length);
        const rating = computed(() => ctx.$core.getProduct.getRatingProduct(ctx.store.state.product));
        const locale = ctx.i18n.localeProperties.code.toUpperCase();
        const productDescription = computed(() => ctx.$core.getProduct.getProductDescription(props.product));
        const productSpecifications = computed(() => ctx.$core.getProduct.getProductSpecifications(props.product));
        const productAttributes = computed(() => ctx.$core.getProduct.getProductAttributes(props.product));
        const catalogMode = ref(process.env.catalog_mode == 'true' ? true : false);

        return { nbOffers, rating, productDescription, productSpecifications, catalogMode, productAttributes };
    },
});
</script>

<style lang="scss" scoped>
.dj-product__content_page .dj-product__heading {
    color: var(--color-text-title);
    margin-bottom: 10px;
}
.dj-product__content_page .dj-product__content_page {
    margin-bottom: 50px;
}
</style>
