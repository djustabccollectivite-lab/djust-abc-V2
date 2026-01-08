<template>
    <div v-if="product" class="abc-container">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <ProductDetail :product="product" />
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import ProductDetail from '@components/templates/product/ProductDetail.vue';

export default {
    name: 'ProductPage',
    components: {
        ProductDetail,
        BreadCrumb,
    },
    props: {
        sku: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            product: null,
            productTitle: null,
            relatedProducts: null,
            breadCrumb: [],
            parentCategories: null,
        };
    },
    async mounted() {
        this.product = await this.$core.useProduct.getProductsById(this.sku);
        if (!this.product) {
            this.$toast.error("Une erreur s'est produite. Produits non disponibles.");
        } else {
            this.updateBreadcrumbs();
            this.updateLocalStorage();
        }
    },
    methods: {
        getParentCategoriesBreadcrumb(cat, indexOfCategories) {
            const breadcrumb = [];
            if (indexOfCategories === 0) {
                const parent = this.getParentCategoriesBreadcrumb(cat, 1);
                breadcrumb.push(...parent);
            } else if (cat.parent.parent !== null) {
                const parent = this.getParentCategoriesBreadcrumb(cat.parent, 1);
                breadcrumb.push(...parent);
            }
            breadcrumb.push({
                url: '/list/' + cat.externalId,
                text: cat.name,
            });

            return breadcrumb;
        },
        async updateBreadcrumbs() {
            let category = null;

            if (this.product?.navigationCategories[0]?.id) {
                category = await this.$core.useCategories.getNavigationCategoriesById(
                    this.product.navigationCategories[0]?.id,
                );
            }
            const redirectBrand = encodeURIComponent(this.product?.brand);
            const url = redirectBrand ? `/list?filter_brand=${redirectBrand}` : '/list';
            if (category) {
                this.parentCategories = this.getParentCategoriesBreadcrumb(category, 0);
                this.parentCategories.pop();
                this.breadCrumb = [
                    {
                        text: this.$t('common.breadscrum.home'),
                        url: '/',
                    },
                    ...this.parentCategories,
                    {
                        text: this.product?.brand ?? null,
                        url,
                    },
                ];
            } else {
                this.breadCrumb = [
                    {
                        text: this.$t('common.breadscrum.home'),
                        url: '/',
                    },
                    {
                        text: this.product?.brand ?? null,
                        url,
                    },
                ];
            }
        },
        updateLocalStorage() {
            const products = localStorage.getItem('lastProducts')
                ? JSON.parse(localStorage.getItem('lastProducts'))
                : [];
            products.push(this.sku);
            const productsNewSet = [...new Set(products)];
            if (productsNewSet.length === 7) {
                productsNewSet.shift();
            }
            localStorage.setItem('lastProducts', JSON.stringify(productsNewSet));
        },
    },
};
</script>
