<template>
    <div class="navigation--list">
        <div class="navigation__content">
            <a class="navigation__item" @click.prevent="handleOpenDrawer('search')">
                <i class="icon-magnifier"></i>
                <span>Search</span>
            </a>

            <a class="navigation__item" v-if="filtrePoductList" @click.prevent="openFilters">
                <i class="icon-equalizer"></i>
                <span>Filtre</span>
            </a>

            <a class="navigation__item" @click.prevent="handleOpenDrawer('categories')">
                <i class="icon-list4"></i>
                <span>Categories</span>
            </a>

            <nuxt-link class="navigation__item" :to="localePath('/quotes')" v-if="$core.useQuote.IsActive()">
                <i class="icon-papers"></i>
                <span>Quotes</span>
            </nuxt-link>

            <a class="navigation__item" v-if="$core.useShop.IsActive()" @click.prevent="openCart">
                <i class="icon-bag2"></i>
                <span>Cart</span>
            </a>
        </div>
        <DjModal v-model="filtersModal" width="700">
            <Facets />
        </DjModal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import Facets from '@components/templates/shop/Facets.vue';

export default {
    name: 'NavigationList',
    components: {
        DjModal,
        Facets,
    },
    computed: {
        ...mapState({
            appDrawer: (state) => state.app.appDrawer,
        }),
    },
    data: () => ({
        drawer: true,
        filtrePoductList: false,
        filtersModal: false,
    }),
    methods: {
        async loadCartProducts() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            const queries = [];
            cookieCart.cartItems.forEach((item) => {
                queries.push(item.id);
            });
            if (queries.length > 0) {
                await this.$core.useProduct.getCartProducts(queries);
            }
        },
        openCart() {
            $nuxt.$emit('opencartmodel', true);
        },
        handleOpenDrawer(drawer) {
            if (drawer === 'cart') {
                this.loadCartProducts();
            }
            this.$store.commit('app/setCurrentDrawerContent', drawer);
            this.$store.commit('app/setAppDrawer', !this.appDrawer);
        },
        openFilters() {
            this.filtersModal = true;
        },
    },
    created() {
        this.$watch(
            '$route',
            (to) => {
                this.filtrePoductList = false;
                if (to.path.includes('/list') || to.path === '/search') {
                    this.filtrePoductList = true;
                }
            },
            { immediate: true }
        );
    },
    watch: {
        $route(to) {
            this.filtrePoductList = false;
            if (to.path.includes('/list') || to.path === '/search') {
                this.filtrePoductList = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.navigation--list .navigation__item {
    text-align: center;
}

// Une classe qui correspond a une div dans le composant Facets

.factes {
    margin-top: 0 !important;
}
.v-dialog:not(.v-dialog--fullscreen) {
    height: 70%;
}
</style>
