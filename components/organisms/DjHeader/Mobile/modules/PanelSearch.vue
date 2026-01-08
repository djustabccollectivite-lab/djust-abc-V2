<template>
  <div class="dj-panel--sidebar" id="panel-search">
    <div class="dj-panel__header">
      <div class="title__h3">Search</div>

      <a href="#" class="dj-panel__close" @click.prevent="handleClosePanel">
        <i class="icon icon-cross" style="color: white"></i>
      </a>
    </div>

    <div class="navigation__content">
      <div class="ps-panel__search-results">
        <SearchHeader />
      </div>
    </div>
  </div>
</template>

<script>
import SearchHeader from '@components/organisms/DjHeader/Horizontal/modules/SearchHeader.vue';

export default {
  name: 'PanelSearch',
  components: { SearchHeader },
  methods: {
    handleClosePanel() {
      this.$store.commit('app/setCurrentDrawerContent', null);
      this.$store.commit('app/setAppDrawer', false);
    },
  },
};
</script>

<style lang="scss" scoped>
#panel-search {
  .navigation__content {
    margin-top: 15px;
    padding: 10px;
  }
}

.dj-form--search-mobile {
  input {
    height: 40px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 0;
  }

  button {
    min-width: 40px;
    height: 40px;
    background-color: #000;
    border: none;

    i {
      color: #ffffff;
    }
  }
}
</style>
