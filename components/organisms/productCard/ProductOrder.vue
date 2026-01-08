<template>
  <div class="dj-product--cart">
    <div class="dj-product__thumbnail">
      <DjLink :to="localePath(`/product/${product.sku}`)">
        <DjImage v-if="product.thumbnail" :src="product.thumbnail" :alt="product.name" />
        <DjImage v-else :src="product.mainImageUrl" :alt="product.name" />
      </DjLink>
    </div>

    <div class="dj-product__content_page">
      <DjLink :to="localePath(`/product/${product.sku}`)">
        <DjLink v-if="product.title" class="dj-product__title">{{ product.title }}</DjLink>

        <DjLink v-else class="dj-product__title">{{ product.name }}</DjLink>
      </DjLink>

      <p class="ma-0" v-for="attribut in attributes" :key="attribut.id">
        <strong>{{ attribut.code }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
  components: {
    DjLink,
    DjImage,
  },
  props: {
    product: {
      type: Object,
      require: true,
      default: () => {},
    },
    productVariant: {
      type: Object,
      require: true,
      default: () => {},
    },
    price: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  computed: {
    attributes() {
      return this.productVariant.attributeValues.map((attribut) => {
        return { code: attribut.code, label: attribut.attributeValue };
      });
    },
  },
};
</script>
