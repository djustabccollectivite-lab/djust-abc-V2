<template>
    <div class="abc-container">
        <BreadCrumb v-if="null !== breadcrumbs" :breadcrumb="breadcrumbs" layout="fullwidth" />
        <div class="row pb-16">
            <div class="col-12 col-md-3">
                <Facets />
            </div>
            <div class="col-12 col-md-9">
                <ProductList
                    v-if="null !== productThumbnails"
                    :productThumbnails="productThumbnails"
                    :category="category"
                    :categoryName="categoryName"
                />
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import ProductList from '@components/templates/shop/ProductList.vue';
import Facets from '@components/templates/shop/Facets.vue';
import { slugify } from '~/purjus/helpers/common/urlHelper';
import { findCurrentCategoryExternalId } from '~/purjus/helpers/common/categoriesHelper';

export default {
    name: 'ShopByCategoryID',
    components: {
        Facets,
        ProductList,
        BreadCrumb,
    },
    data() {
        return {
            category: null,
            breadcrumbs: null,
        };
    },
    computed: {
        productThumbnails() {
            return this.$store.state.shop.productThumbnails;
        },
        categoryName() {
            return this.category ? this.category.name : 'Tous';
        },
    },
    async mounted() {
        const categoriesList = await this.$core.useCategories.getCategoriesList();
        const currentCategoryId = findCurrentCategoryExternalId(categoriesList, this.$route.params.id);
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        currentProductFilters.idType = 'EXTERNAL_ID';
        await this.$core.useShop.getFiltredProductListv2(currentCategoryId, currentProductFilters, 'PRODUCT');
        this.category = currentCategoryId
            ? await this.$core.useCategories.getNavigationCategoriesById(currentCategoryId, 'EXTERNAL_ID')
            : null;
        this.$store.commit('shop/setCategoryIds', currentCategoryId);
        if (this.category) {
            const parentCategories = this.getParentCategoriesBreadcrumb(this.category);
            parentCategories.pop();

            this.breadcrumbs = [
                {
                    text: this.$i18n.t('common.breadscrum.home'),
                    url: this.localePath('/'),
                },
                ...parentCategories,
                {
                    text: this.category.name,
                },
            ];
        } else if (this.$route.params.id) {
            this.$router.push({
                path: '/search',
                query: {
                    filter_brand: this.$route.params.id.toUpperCase(),
                },
            });
        }
    },
    methods: {
        getParentCategoriesBreadcrumb(cat) {
            const breadcrumb = [];
            if (cat.parent.parent !== null) {
                const parent = this.getParentCategoriesBreadcrumb(cat.parent);
                breadcrumb.push(...parent);
            }
            breadcrumb.push({
                url: this.localePath('/list/' + cat.externalId),
                text: cat.name,
            });

            return breadcrumb;
        },
    },
};
</script>
