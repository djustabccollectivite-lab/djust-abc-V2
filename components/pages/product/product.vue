<template>
    <div>
        <BreadCrumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="ps-page--product">
            <div class="fullWidth">
                <ProductDetail :product="product" v-if="product" :reviews="reviews" :offersList="offers" />
                <RelatedProducts :products="relatedProducts" v-if="relatedProducts && relatedProducts.length > 0" />
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import RelatedProducts from '@components/organisms/DjFeaturedProducts/DjFeaturedProducts.vue';
import ProductDetail from '@components/templates/product/ProductDetail.vue';
import { defineComponent, useContext, ref, onMounted, onBeforeUnmount, computed, watch } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'product-page',
    components: {
        ProductDetail,
        RelatedProducts,
        BreadCrumb,
    },
    props: {
        sku: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const ctx = useContext();
        const skuProduct = props.sku;
        const product = ref(null);
        const reviews = ref(null);
        const offers = ref(null);
        const variantsProduct = ref(null);
        let productTitle = ref('');
        const locale = ref(ctx.i18n.locale);
        const i18n = ctx.i18n.messages[locale.value];
        const relatedProducts = ref(null);
        let breadCrumb = ref([]);
        let parentCategories = ref(null);
        let category = null;

        const getParentCategoriesBreadcrumb = (cat, indexOfCategories) => {
            let breadcrumb = [];
            if (indexOfCategories === 0) {
                const parent = getParentCategoriesBreadcrumb(cat, 1);
                breadcrumb.push(...parent);
            } else if (null !== cat?.parent?.parent) {
                const parent = getParentCategoriesBreadcrumb(cat.parent, 1);
                breadcrumb.push(...parent);
            }
            breadcrumb.push({
                url: '/list/' + cat.id,
                text: cat.name,
            });
            return breadcrumb;
        };
        const currency = computed(() => {
            return ctx.store.state.app.currency;
        });
        watch(currency, async () => {
            offers.value = await ctx.$core.useOffer.getProductOffers(skuProduct);
        });

        onMounted(async () => {
            variantsProduct.value = await ctx.$core.useProduct.getProductsVariants(skuProduct);
            offers.value = await ctx.$core.useOffer.getProductOffers(skuProduct);
            product.value = await ctx.$core.useProduct.getProductsById(skuProduct);
            relatedProducts.value = await ctx.$core.useProduct.getRelatedProductsById(skuProduct);
            reviews.value = await ctx.$core.useProduct.getProductsReviews(skuProduct);
            if (product?.value?.navigationCategories[0]?.id) {
                category = await ctx.$core.useCategories.getNavigationCategoriesById(
                    product.value.navigationCategories[0]?.id
                );
            }
            const redirectBrand = encodeURIComponent(product.value?.brand);
            const url = redirectBrand ? `/list?filter_brand=${redirectBrand}` : '/list';
            if (category) {
                parentCategories.value = getParentCategoriesBreadcrumb(category, 0);
                parentCategories.value.pop();
                breadCrumb.value = [
                    {
                        text: i18n.common.breadscrum.home,
                        url: '/',
                    },
                    ...parentCategories.value,
                    {
                        text: product.value?.brand ?? null,
                        url,
                    },
                ];
            } else {
                breadCrumb.value = [
                    {
                        text: i18n.common.breadscrum.home,
                        url: '/',
                    },
                    {
                        text: product.value?.brand ?? null,
                        url,
                    },
                ];
            }
            const products = localStorage.getItem('lastProducts')
                ? JSON.parse(localStorage.getItem('lastProducts'))
                : [];
            products.push(skuProduct);
            const products_dedoub = [...new Set(products)];
            if (products_dedoub.length == 6) products_dedoub.shift();
            localStorage.setItem('lastProducts', JSON.stringify(products_dedoub));
        });

        onBeforeUnmount(() => {
            offers.value = null;
            product.value = null;
            reviews.value = null;
            relatedProducts.value = null;
        });
        function head() {
            return {
                titleTemplate: `${productTitle.value} - Djust.io`,
                title: `${productTitle.value} @(${productTitle.value}) - Nuxt.js`,
                meta: [{ hid: 'description', name: 'description', content: 'About our company Nuxt.js ' }],
            };
        }
        return { product, reviews, variantsProduct, breadCrumb, productTitle, offers, relatedProducts, head };
    },
});
</script>

<style lang="scss" scoped>
.fullWidth {
    width: 100% !important;
    max-width: 100% !important;

    @media (max-width: 550px) {
        padding-left: 15px;
        padding-right: 15px;
    }

    padding-left: 30px;
    padding-right: 30px;
}
</style>
