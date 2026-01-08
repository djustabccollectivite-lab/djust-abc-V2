<template lang="html">
    <div class="dj-vendor-store">
        <div class="dj-section__container">
            <div class="dj-section__left">
                <VendorProfile :supplier="supplier" />
            </div>
            <div class="dj-section__right">
                <ProductList v-if="products !== null" :supplierName="supplier.name" :productThumbnails="productsList" />
            </div>
        </div>
    </div>
</template>

<script>
import VendorProfile from '@components/templates/vendor/modules/VendorProfile.vue';
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import ProductList from '@components/templates/shop/ProductList.vue';

export default {
    name: 'VendorStoreTemplate',
    components: { VendorProfile, ProductThumbnail, ProductList },
    props: {
        supplier: {
            type: Object,
            default: () => {},
        },
        supplierId: {
            type: String,
        },
    },
    data() {
        return {
            bestSellerItems: null,
            products: null,
            swiperOption: {
                loop: false,
                slidesPerView: 4,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.dj-carousel__next',
                    prevEl: '.dj-carousel__prev',
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                },
            },
        };
    },
    async created() {
        this.$store.commit('shop/setCategoryIds', null);
        const params = { supplierName: this.supplier.name };
        this.products = await this.$core.useShop.getProductList(params);
    },
    computed: {
        productsList() {
            return this.$store.state.shop.productThumbnails;
        },
    },
};
</script>

<style lang="scss" scoped></style>
