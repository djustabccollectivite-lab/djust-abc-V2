<template>
  <Sku :variantSku="variantSku" />
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api';
import Sku from '@/pages/product/_sku';
export default defineComponent({
  name: 'product-page',
  auth: process.env.store_type === 'private' ? null : false,
  transition: 'zoom',
  layout(context) {
    return context.store.state.app.layoutType;
  },
  components: {
    Sku,
  },

  setup() {
    const route = useRoute();
    const variantSku = route.value.params.variantSku;

    function head() {
      return {
        titleTemplate: `${productTitle.value} - Djust.io`,
        title: `${productTitle.value} @(${productTitle.value}) - Nuxt.js`,
        meta: [{ hid: 'description', name: 'description', content: 'About our company Nuxt.js ' }],
      };
    }
    return { variantSku, head };
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
