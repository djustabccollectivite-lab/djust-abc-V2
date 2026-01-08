<template>
    <div class="dj-categories-page">
        <bread-crumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="dj-layout--shop">
            <div class="dj-layout__left">
                <Facets v-if="widgetLoading === false" />
            </div>
            <div class="dj-layout__right">
                <ProductList
                    v-if="productThumbnails !== null"
                    :productThumbnails="productThumbnails"
                    @listView="addMiniBasket"
                    :class="basket"
                    :searchWord="keyword"
                />
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import ProductList from '@components/templates/shop/ProductList.vue';
import Facets from '@components/templates/shop/Facets.vue';
import DjMiniCartProductList from '@components/organisms/DjMiniCartProductList/DjMiniCartProductList.vue';
import Loading from '@components/atoms/DjLoading/DjLoading.vue';

export default {
    name: 'SearchPage',
    components: {
        Loading,
        Facets,
        ProductList,
        BreadCrumb,
        DjMiniCartProductList,
    },
    props: {
        keyword: {
            type: String,
            default: '',
        },
    },
    computed: {
        productThumbnails() {
            return this.$store.state.shop.productThumbnails;
        },
    },

    data(context) {
        return {
            widgetLoading: false,
            basket: true,
            breadCrumb: [
                {
                    text: context.$i18n.t('common.breadscrum.home'),
                    url: context.localePath('/'),
                },
                {
                    text: context.$i18n.t('common.breadscrum.searchResult'),
                },
            ],
        };
    },
    methods: {
        addMiniBasket(params) {
            this.basket = params;
        },
    },
    created() {
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        this.$core.useShop.getFiltredProductList(this.$route.params.id, currentProductFilters);
    },
    beforeDestroy() {
        this.$store.commit('shop/initShop');
    },
};
</script>

<style lang="scss" scoped>
.dj-layout--shop {
    @media (min-width: 1024px) {
        padding-left: 60px;
        padding-right: 60px;
    }
}
.dj-categories-page {
    background-color: #ffffff;
}
</style>
