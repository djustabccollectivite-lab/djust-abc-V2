<template>
  <Product :sku="skuProduct" :variantSku="variantSku" />
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api';
import Product from '@components/pages/product/product.vue';
export default defineComponent({
  name: 'product-page',
  auth: process.env.store_type === 'private' ? null : false,
  transition: 'zoom',
  layout(context) {
      return context.store.state.app.layoutType;
  },
  components: {
      Product,
  },

  setup() {
      const route = useRoute();
      const skuProduct = route.value.params.sku;
      const variantSku = route.value.params.variantSku;

      function head() {
          return {
              titleTemplate: `${productTitle.value} - Djust.io`,
              title: `${productTitle.value} @(${productTitle.value}) - Nuxt.js`,
              meta: [{ hid: 'description', name: 'description', content: 'About our company Nuxt.js ' }],
          };
      }
      return { skuProduct, variantSku, head };
  },
});
</script>

<style lang="scss" scoped>
.fullWidth {
  width: 100% !important;
  max-width: 100% !important;
  padding-left: 30px;
  padding-right: 30px;
}
</style>
