<template>
    <div class="abc-container">
        <BreadCrumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="row pb-16">
            <div class="col-12 col-md-3">
                <Facets v-if="false === widgetLoading" />
            </div>
            <div class="col-12 col-md-9">
                <ProductList
                    v-if="null !== productThumbnails"
                    :productThumbnails="productThumbnails"
                    :searchWord="keyword"
                />
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Facets from '@components/templates/shop/Facets.vue';
import ProductList from '@components/templates/shop/ProductList.vue';

export default {
    name: 'SearchPage',
    components: {
        Facets,
        ProductList,
        BreadCrumb,
    },
    props: {
        keyword: {
            type: String,
            default: '',
        },
    },
    data(context) {
        return {
            widgetLoading: false,
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
    computed: {
        productThumbnails() {
            return this.$store.state.shop.productThumbnails;
        },
    },
    beforeDestroy() {
        this.$store.commit('shop/initShop');
    },
    async mounted() {
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        currentProductFilters.idType = 'EXTERNAL_ID';
        this.$core.useShop.getFiltredProductListv2(this.$route.params.id, currentProductFilters, 'PRODUCT');
        this.category = this.categoryId
            ? await this.$core.useCategories.getNavigationCategoriesById(this.categoryId, 'EXTERNAL_ID')
            : null;
        this.$store.commit('shop/setCategoryIds', this.categoryId);
        if (!this.categoryId) {
            this.breadcrumbs = [
                {
                    text: this.$i18n.t('common.breadscrum.home'),
                    url: this.localePath('/'),
                },
                {
                    text: 'Liste',
                },
            ];
        }

        const brandName = this.$route.query.filter_brand;
        if (!this.categoryId && brandName) {
            this.breadCrumb = [
                {
                    text: this.$i18n.t('common.breadscrum.home'),
                    url: this.localePath('/'),
                },
                {
                    text: brandName,
                },
            ];
        }

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
