<template>
  <DjLink :to="localePath(`/product/${productSku}`)">
    <div class="dj-product--cart" :class="size === 'standard' ? ' dj-product--cart-standard' : 'dj-product--cart-mobile'">
      <div class="dj-product__thumbnail">
        <component :is="allowProductLink ? 'DjLink' : 'span'" :to="localePath(`/product/${productSku}`)"
          v-if="productImage">
          <DjImage :width="100" :height="100" :src="productImage" :alt="productName" />
        </component>
      </div>
      <div class="dj-product__cart_content">
        <component :is="allowProductLink ? 'DjLink' : 'span'" class="dj-product_cart__title"
          :to="localePath(`/product/${productSku}`)">
          {{ productName }}
        </component>
        <div class="dj-product_cart__supplier" v-if="supplierName">
          {{ $t('product.soldBy') }} :
          <component :is="allowSupplierLink ? 'DjLink' : 'span'" :to="localePath(`/product/${productSku}`)"
            class="dj-product_supplier__link">
            {{ supplierName }}
          </component>
        </div>
        <div v-if="productBrand && productBrand !== 'null'" class="dj-product_cart__brand">
          {{ $t('product.brand') }} :
          {{ productBrand }}
        </div>
        <div v-if="offerQuantityInStock > 0" class="livraison-info">
          <span class="stock-info">
            <i class="icon icon-cube pr-3" style="font-size: 14px"></i>
            {{ $t('product.quantityInStock') }}
          </span>
        </div>
        <div v-else class="livraison-info">
          <span class="stock-info-rupture">
            <i class="icon icon-cube pr-3" style="font-size: 14px"></i>
            {{ $t('product.tabs.offers.outofstock') }}
          </span>
        </div>
      </div>
    </div>
  </DjLink>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
  name: 'ProductCart',
  components: {
    DjLink,
    DjImage,
  },
  props: {
    productSku: {
      type: String,
      default: '',
    },
    productImage: {
      type: Object,
      default: null,
    },
    productPerPack: {
      type: Number,
      default: 1,
    },
    productName: {
      type: String,
      default: 'ProductName',
    },
    productBrand: {
      type: String,
      default: null,
    },
    productNavigationCategoryName: {
      type: String,
      default: null,
    },
    supplierName: {
      type: String,
      default: 'Supplier',
    },
    offerQuantityInStock: {
      type: Number,
      default: 1,
    },
    qte: {
      type: Number,
      default: 1,
    },
    attributs: {
      type: Array,
      default: () => { },
    },
    allowProductLink: {
      type: Boolean,
      default: false,
    },
    allowSupplierLink: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'standard',
      validator: function (value) {
        return ['small', 'standard'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.dj-product--cart {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 32px;

  > * {
    width: 100%;
  }

  .dj-product__cart_content {
    background: transparent !important;
    text-align: left;
    width: 80%;

    a {
      font-size: 1em;
    }

    p {
      font-size: 0.8em;
    }

    .dj-product_cart__title {
      font-family: var(--font-1st);
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #0f1111;
      margin-bottom: 2px;
    }

    .dj-product_cart__brand {
      font-family: var(--font-1st);
      font-style: normal;
      font-weight: 100;
      font-size: 13px;
      line-height: 15px;
      color: rgba(0, 0, 0, 0.75);
      margin-bottom: 2px;
    }

    .dj-product_cart__qte {
      font-family: var(--font-1st);
      font-style: normal;
      font-weight: 100;
      font-size: 13px;
      line-height: 15px;
      color: rgba(0, 0, 0, 0.75);
      margin-bottom: 2px;
    }

    .dj-product_cart__supplier {
      font-family: var(--font-1st);
      font-style: normal;
      font-weight: 100;
      font-size: 13px;
      line-height: 15px;
      color: rgba(0, 0, 0, 0.75);
      margin-bottom: 2px;
    }
  }
}

.dj-product--cart-standard {
  .dj-product__thumbnail {
    max-width: 80px;

    img {
      width: 100%;
      max-width: 80px;
      max-height: 80px;
    }
  }

  .dj-product__content {
    font-size: 0.8em;
  }

  @media screen and (min-width: 480px) {
    .dj-product__thumbnail {
      max-width: 100px;
    }
  }
}

.dj-product--cart-mobile {
  .dj-product__thumbnail {
    max-width: 80px;

    img {
      width: 100%;
      max-width: 50px;
      max-height: 50px;
    }
  }

  .dj-product__content {
    font-size: 0.9em;
  }
}

.livraison-info {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;

  .date {
    margin-left: 2px;
    font-family: var(--font-2nd) !important;
    font-size: 16px;
    line-height: 19.2px;
  }
}

.stock-info {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #3fc62a;
  margin-right: 2px;
}

.stock-info-rupture {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #c62a2a;
  margin-right: 2px;
}
</style>
