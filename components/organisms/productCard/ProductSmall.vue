<template>
  <div class="dj-product__small">
    <div class="dj-product__thumbnail__small">
      <div v-if="image">
        <DjImage :src="image" :alt="name" />
      </div>
    </div>
    <div class="dj-product__small_info">
      <DjLink :to="`/product/${sku}`">
        <div class="dj-product_small_title d-flex align-items-end">
          <div class="dj-product__title">
            {{ name }}
          </div>
        </div>
      </DjLink>

      <div>
        <div class="d-flex pb-1" v-if="brand !== 'null' ">
          <DjLink :to="`/product/${sku}`" class="dj-product__small_info_text" style="width: 100%">
            {{ brand }}
          </DjLink>
        </div>
        <div class="d-flex pb-1">
          <div style="width: 100%" class="dj-product__small_info_text">
            livraison entre <span class="date">2 et 4 jours</span>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
  name: 'ProductSmall',
  components: { DjLink, DjImage },
  props: {
    image: {
      type: String | Object,
      require: false,
    },
    name: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: false,
    },
    sku: {
      type: String,
      require: false,
    },
    navigationCategoryName: {
      type: String,
      require: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.dj-product__small_info {
  margin-left: 10px;

  .dj-product_small_title {
    height: 35px;
    margin-top: 0px;

    .dj-product__title {
      font-family: var(--font-1st);
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      padding-bottom: 5px;
      color: #000000;

      &:hover {
        color: var(--color-primary);
        text-decoration: underline;
      }
    }
  }

  .dj-product__small_info_text {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 100;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }
}

.date {
  font-family: var(--font-2nd) !important;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.06px;
}

.dj-product__small {
  border-right: none !important;
  margin: 0px;
  margin-right: 0px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  width: 100%;
  max-width: 100%;
  min-width: 245px;
  padding: 5px 0px;

  >* {
    flex-basis: 100%;
  }

  .dj-product__thumbnail__small {
    min-width: 60px;
    flex-basis: 60px;

    img {
      max-height: 60px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .dj-product__content {
    margin: 0;
    display: block;
    line-height: 1.2em;
    padding-bottom: 5px;
    padding-left: 20px;
    color: var(--color-body-2);
    --max-lines: 2;
    max-height: calc(1.2em * var(--max-lines));
    overflow: hidden;
    padding-right: 1rem;

    .dj-product__title {
      font-size: 12px;
      font-weight: 700;
    }

    .dj-product__brand {
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>
