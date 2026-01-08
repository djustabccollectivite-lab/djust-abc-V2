<template>
  <section aria-labelledby="summary-heading" class="dj-order-summary">
    <h2 id="summary-heading" class="dj-order-summary__title">{{ $t('account.orders.summary') }}</h2>

    <div class="dj-order-summary__content">
      <figure>
        <nuxt-link v-for="product in cartItems" :to="`/product/${$core.getCart.getProductSku(product)}`" :key="product.id"
          class="mb-8 d-flex flex-column">
          <ShoppingCartOrderSummaryItem :item="product" />
        </nuxt-link>
      </figure>

      <div class="dj-order-summary__line">
        <div class="dj-order-summary__label">
          <span>{{ $t('account.orders.totalProductHT') }}</span>
        </div>

        <span class="dj-order-summary__price" v-html="totalAmountOfCart"></span>
      </div>

      <div class="dj-order-summary__line">
        <div class="dj-order-summary__label">
          <span>{{ $t('account.orders.totalShippingHT') }}</span>
        </div>

        <span class="dj-order-summary__price" v-html="totalAmountOfSipping"></span>
      </div>

      <div class="dj-order-summary__line">
        <div class="dj-order-summary__label">
          <span>{{ $t('account.orders.vat') }}</span>
        </div>

        <span class="dj-order-summary__price" v-html="totalTaxOfCart"></span>
      </div>

      <div class="dj-order-summary__line">
        <div class="dj-order-summary__label">
          <span>{{ $t('account.orders.vatShipping') }}</span>
        </div>

        <span class="dj-order-summary__price" v-html="totalShippingTax"></span>
      </div>

      <div class="dj-order-summary__total">
        <span class="dj-order-summary__total-label">{{ $t('account.orders.invoice.totalWithTax') }}</span>

        <span class="dj-order-summary__total-price" v-html="totalAmountOfCartWithTax"></span>
      </div>
    </div>

    <div class="mt-6">
      <slot />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import ShoppingCartOrderSummaryItem from '@modules/checkout/components/modules/ShoppingCartOrderSummaryItem.vue';

export default {
  name: 'ModuleOrderSummary',
  components: { ShoppingCartOrderSummaryItem },
  props: {
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      currency: (state) => state.app.currency,
    }),
    NumberOfProductsInCart() {
      return this.$core.getCart.getTotalNumberCartItems(this.$store.state.cart.cartItems);
    },
    totalAmountOfCart() {
      return this.$core.getCart.getTotalAmountOfCart(this.cartItems, this.currency);
    },
    totalTaxOfCart() {
      return this.$core.getCart.getTaxAmount(this.cartItems, this.currency);
    },
    totalAmountOfCartWithTax() {
      return this.$core.getCart.getTotalAmountOfCartWithTax(this.cartItems, this.currency);
    },
    totalShippingTax() {
      return this.$core.getCart.getShippingTaxAmount(this.cartItems, this.currency);
    },
    totalAmountOfSipping() {
      return this.$core.getCart.getTotalAmountOfSipping(this.cartItems, this.currency);
    },
  },
};
</script>
