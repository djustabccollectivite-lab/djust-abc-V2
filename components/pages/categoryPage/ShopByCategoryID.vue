<template>
    <div class="dj-categories-page">
        <bread-crumb v-if="null !== breadcrumbs" :breadcrumb="breadcrumbs" layout="fullwidth" />
        <div class="dj-layout--shop">
            <div class="dj-layout__left">
                <Facets v-if="widgetLoading === false" />
                <loading v-else />
            </div>
            <div class="dj-layout__right row ma-0 pa-0">
                <ProductList
                    v-if="productThumbnails !== null"
                    :productThumbnails="productThumbnails"
                    :categoryName="categoryName"
                    :class="basket && showMiniBasket ? 'col-12' : 'col-12'"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import ProductList from '@components/templates/shop/ProductList.vue';
import Facets from '@components/templates/shop/Facets.vue';
import DjMiniCartProductList from '@components/organisms/DjMiniCartProductList/DjMiniCartProductList.vue';
import DjCartSidebar from '@components/organisms/DjCartSidebar/DjCartSidebar.vue';
import Loading from '@components/atoms/DjLoading/DjLoading.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
    name: 'ShopByCategoryID',
    components: {
        Loading,
        Facets,
        ProductList,
        BreadCrumb,
        DjMiniCartProductList,
        DjCartSidebar,
        DjIcon,
    },
    props: {
        categoryId: {
            type: String,
            default: '',
        },
        showMiniBasket: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        ...mapState({
            loading: (state) => state.cart.loading,
        }),
        totalElements() {
            if (!this.productThumbnails) {
                return;
            }
            return this.$core.getShop.getTotalElements(this.productThumbnails);
        },
        productThumbnails() {
            return this.$store.state.shop.productThumbnails;
        },
        categoryName() {
            return this.category ? this.category.name : 'Tous';
        },
    },
    data() {
        return {
            widgetLoading: false,
            basket: true,
            category: null,
            breadcrumbs: null,
        };
    },
    methods: {
        addMiniBasket(params) {
            this.basket = params;
        },
        getParentCategoriesBreadcrumb(cat) {
            let breadcrumb = [];
            if (null !== cat?.parent?.parent) {
                const parent = this.getParentCategoriesBreadcrumb(cat.parent);
                breadcrumb.push(...parent);
            }
            breadcrumb.push({
                url: this.localePath('/list/' + cat.id),
                text: cat.name,
            });

            return breadcrumb;
        },
    },
    async created() {
        this.category = this.categoryId
            ? await this.$core.useCategories.getNavigationCategoriesById(this.categoryId)
            : null;
        this.$store.commit('shop/setCategoryIds', this.categoryId);
        this.$store.commit('shop/setFacets', []);
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        this.$core.useShop.getFiltredProductList(this.$route.params.id, currentProductFilters);
        if (this.category) {
            const parentCategories = this.getParentCategoriesBreadcrumb(this.category);
            parentCategories.pop();

            this.breadcrumbs = [
                {
                    text: this._i18n.t('common.breadscrum.home'),
                    url: this.localePath('/'),
                },
                ...parentCategories,
                {
                    text: this.category.name,
                },
            ];
        }

        if (this.productThumbnails) {
            setTimeout(
                function () {
                    this.TestLoading = false;
                }.bind(this),
                150
            );
        }
    },
};
</script>

<style lang="scss" scoped>
.dj-layout--shop {
    @media (min-width: 1024px) {
        padding-left: 10px;
        padding-right: 10px;
    }
}
.dj-categories-page {
    background-color: #ffffff;
}
.dj-categories-page--title {
    font-size: 30px;
    line-height: 35px;
    color: #000;
    margin-bottom: 8px;
}
.dj-categories-page--count {
    font-size: 24px;
    line-height: 28px;
    color: #000;
    margin-bottom: 0;
}
</style>
