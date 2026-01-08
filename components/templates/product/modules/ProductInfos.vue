<template>
  <div class="dj-product__info">
    <h1>{{ productTitle }}</h1>

    {{ $t('product.supplier') }}: &nbsp;

    <DjLink :to="'/vendor/' + supplier.id" class="dj-product--supplier" v-if="supplier">
      {{ supplier.name }}
    </DjLink>

    <div class="dj-product__meta" v-if="brandName">
      <p>
        {{ $t('product.brand') }}:

        <DjLink to="/list" class="ml-2 text-capitalize">
          {{ brandName }}
        </DjLink>
      </p>
    </div>

    <ProductVariantAttributes :attributes="attributes" :offerToDisplay="offerToDisplay"
      v-if="attributes && attributes.length > 0" />
  </div>
</template>

<script>
import ProductVariantAttributes from '@components/templates/product/modules/ProductVariantAttributes.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DjProductFullDetail',
  components: {
    ProductVariantAttributes,
    DjLink,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    offer: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const ctx = useContext();
    const totalRating = computed(() => ctx.$core.getProduct.getRatingProduct(ctx.store.state.product.reviews));
    const productTitle = computed(() =>
      ctx.$core.getProductVariant.getProductTitle(props.offer?.variant)
        ? ctx.$core.getProductVariant.getProductTitle(props.offer.variant)
        : ctx.$core.getProduct.getProductTitle(props.product)
    );
    const brandName = computed(() => ctx.$core.getProduct.getProductBrand(props.product));
    const attributes = computed(() => ctx.$core.getProduct.getAttributes(ctx.store.state.product.attributes));
    const reviews = computed(() => ctx.$core.getProduct.getReviews(ctx.store.state.product.reviews));
    const offers = computed(() => ctx.$core.getOffer.getOffersToDisplay(ctx.store.state.offers));
    const offerToDisplay = computed(() => {
      return offers.value ? ctx.$core.getOffer.getBestOfferFromList(offers.value) : null;
    });
    const supplier = computed(() => offerToDisplay.value?.supplier ?? null);
    return {
      totalRating,
      productTitle,
      brandName,
      attributes,
      reviews,
      offerToDisplay,
      supplier,
    };
  },
});
</script>
