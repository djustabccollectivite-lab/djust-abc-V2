<template>
  <header class="header header--mobile" :class="transparent ? 'header--transparent' : null">
    <div class="navigation--mobile">
      <div class="navigation__left">
        <nuxt-link to="/" class="dj-logo">
          <img v-if="headerLogo" :src="`${headerLogo}`" :alt="headerLogo.alt" />
        </nuxt-link>
      </div>
      <mobile-header-actions />
    </div>
  </header>
</template>

<script>

import MobileHeaderActions from '@components/organisms/DjHeader/Mobile/modules/MobileHeaderActions.vue';
export default {
  name: 'HeaderMobile',
  components: { MobileHeaderActions },
  data: () => ({
    headerLogo: null,
    altLogo: null,
    transparent: null,
  }),
  async created() {
    this.headerLogo = await this.$core.useStoryblok.getLogo();

  },
};
</script>

<style lang="scss" scoped>
.dj-logo {
  max-width: 50px;
}
</style>
