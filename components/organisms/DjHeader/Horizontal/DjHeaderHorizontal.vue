<template>
  <header class="header header--standard header--djust-1 full-width" :class="transparent ? 'header--transparent' : null"
    id="headerSticky">

    <div class="header__top" v-if="headerContent && headerContent.showHeaderTop">
      <div class="container">
        <div class="header__top_text">
          <p v-html="headerContent.HeaderTopText"></p>
        </div>
      </div>
    </div>
    <div class="header__content">
      <div class="container full-screen">
        <div @click.prevent="resetSearchBar" class="header__content-left">
          <DjLink v-if="headerLogo !== null" :to="localePath('/')" class="dj-logo">
            <DjImage v-if="headerLogo !== null" :src="`${headerLogo}`" :alt="$config.clientName" />
          </DjLink>
        </div>
        <div class="header__content-center">
          <SearchHeader />
        </div>
        <div @click.prevent="resetSearchBar" class="header__content-right">
          <HeaderActions />
        </div>
      </div>
    </div>
    <nav class="navigation">
      <div class="container full-screen">
        <div class="navigation__left">
          <div class="menu--product-categories">
            <div class="menu__toggle" @click="show()">
              <i class="icon-menu"></i>
              <span> {{ $t('header.shopByDepartment') }}</span>
            </div>
            <div class="menu__content" :class="displayMenu ? 'menu__content__display fullWidth' : null">
              <div class="outside" v-if="displayMenu" @click="closeOverlay"></div>
              <MenuCategories @closeOverlay="closeOverlay" />
            </div>
          </div>
        </div>
        <div @click.prevent="resetSearchBar" class="navigation__right">
          <div class="dj-block--header-hotline inline">
            <ul class="header__top-links">
              <li>
                <nuxt-link :to="localePath('/fastorder/fastOrder')">
                  <i class="icon-cart-plus"></i> {{ $t('header.navigationExtra.fastOrder') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/account/orders')">
                  <i class="icon-truck"></i> {{ $t('header.navigationExtra.trackYourOrder') }}
                </nuxt-link>
              </li>
              <li>
                <LanguageSwicher />
              </li>
              <li>
                <CurrencyDropdown />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="header__bottom" @click.prevent="resetSearchBar"
      v-if="headerContent && headerContent.HeaderBottom.length > 0 && headerContent.showHeaderBottom">
      <HeaderBottomItem v-for="item in headerContent.HeaderBottom" :key="item.id" :text="item.Text" :icon="item.Icon" />
    </div>
  </header>
</template>

<script>
import CurrencyDropdown from '@components/organisms/DjHeader/Horizontal/modules/CurrencyDropdown.vue';
import LanguageSwicher from '@components/organisms/DjHeader/Horizontal/modules/LanguageSwicher.vue';
import SearchHeader from '@components/organisms/DjHeader/Horizontal/modules/SearchHeader.vue';
import HeaderActions from '@components/organisms/DjHeader/Horizontal/modules/HeaderActions.vue';
import HeaderBottomItem from '@components/organisms/DjHeader/Horizontal/modules/HeaderBottomItem.vue';
import MenuCategories from '@components/organisms/menu/MenuCategories.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import { stickyHeader } from '~/utilities/common-helpers';

export default {
  name: 'HeaderB2B',
  components: {
    HeaderActions,
    SearchHeader,
    MenuCategories,
    LanguageSwicher,
    CurrencyDropdown,
    HeaderBottomItem,
    DjImage,
    DjLink,
  },
  mounted() {
    window.addEventListener('scroll', stickyHeader);
  },
  data: () => ({
    headerLogo: null,
    headerContent: null,
    transparent: null,
    displayMenu: false,
  }),
  async created() {
    this.headerLogo = await this.$core.useStoryblok.getLogo();
    this.headerContent = await this.$core.useStoryblok.getHeader();
  },
  methods: {
    show() {
      this.displayMenu = true;
      this.resetSearchBar();
    },
    closeOverlay() {
      this.displayMenu = false;
    },
    resetSearchBar() {
      this.$store.commit('shop/setRq', '');
    },
  },
};
</script>

<style lang="scss" scoped>
.full-screen {
  max-width: 100% !important;
}

.header__bottom {
  padding: 0 !important;
  border-bottom: none;
  background-color: var(--header-bottom-background-color, #8f8d8d71);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
}

.container {
  padding: 0px;
}

.outside {
  width: 500%;
  position: fixed;
  left: 400px;
  opacity: 0.8;
  background: black;
  height: 100%;
}
</style>
