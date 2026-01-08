<template lang="html">
    <v-navigation-drawer class="positionFixed" v-model="drawer" width="100%" absolute temporary>
        <panel-shopping-cart v-if="currentDrawerContent === 'cart'" />
        <panel-categories v-if="currentDrawerContent === 'categories'" />
        <panel-menu v-if="currentDrawerContent === 'menu'" />
        <panel-search v-if="currentDrawerContent === 'search'" />
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import PanelShoppingCart from '@components/organisms/DjHeader/Mobile/modules/PanelShoppingCart.vue';
import PanelCategories from '@components/organisms/DjHeader/Mobile/modules/PanelCategories.vue';
import PanelMenu from '@components/organisms/DjHeader/Mobile/modules/PanelMenu.vue';
import PanelSearch from '@components/organisms/DjHeader/Mobile/modules/PanelSearch.vue';

export default {
    name: 'MobileDrawer',
    components: { PanelSearch, PanelMenu, PanelCategories, PanelShoppingCart },
    computed: {
        ...mapState({
            appDrawer: (state) => state.app.appDrawer,
            currentDrawerContent: (state) => state.app.currentDrawerContent,
        }),
        drawer: {
            get() {
                return this.appDrawer;
            },
            set(newValue) {
                return newValue;
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.positionFixed {
    position: fixed;
    z-index: 99999;
}
</style>
