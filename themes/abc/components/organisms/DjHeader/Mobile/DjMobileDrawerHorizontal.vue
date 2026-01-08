<template>
    <v-navigation-drawer class="positionFixed" v-model="drawer" width="100%" absolute temporary>
        <panel-shopping-cart v-if="'cart' === currentDrawerContent" />
        <panel-menu v-if="'menu' === currentDrawerContent" />
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import PanelShoppingCart from '@components/organisms/DjHeader/Mobile/modules/PanelShoppingCart.vue';
import PanelMenu from '@components/organisms/DjHeader/Mobile/modules/PanelMenu.vue';

export default {
    name: 'MobileDrawer',
    components: { PanelMenu, PanelShoppingCart },
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
