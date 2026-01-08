<template>
  <div class="navigation__right">
    <div class="header__actions mt-2">
      <a class="header__extra" @click="openCart" v-if="$core.useShop.IsActive()">
        <i class="icon-cart"></i>
        <span>
          <i>{{ totalNumberOfProductsInCart }}</i>
        </span>
      </a>
      <HeaderUserArea />
    </div>
  </div>
</template>

<script>
import HeaderUserArea from '@components/organisms/DjHeader/Horizontal/modules/HeaderUserArea.vue';

export default {
  name: 'MobileHeaderActions',
  components: { HeaderUserArea },
  computed: {
    totalNumberOfProductsInCart() {
      return this.$core.getCart.getTotalNumberCartItems(this.$store.state.cart.cartItems);
    },
  },
  methods: {
    openCart() {
      $nuxt.$emit('opencartmodel', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-cart {
  color: black;
}
</style>
