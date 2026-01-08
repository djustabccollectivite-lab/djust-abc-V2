<template>
    <div v-if="localStore && products && 0 < products.length" class="mx-10 mt-10 mb-16">
        <div class="d-flex justify-space-between align-items-center mb-8">
            <h2 class="font-700 size-24 text-blue">
                {{ block.title }}
            </h2>
        </div>
        <div class="mt-6 row swiper-container">
            <DjSwiper :swiperProperties="productSwiper">
                <div v-for="product in products" :key="product?.id" class="swiper-slide">
                    <ProductThumbnail :product="product" :line="false" />
                </div>
            </DjSwiper>
        </div>
    </div>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';

export default {
    name: 'LastSeenProducts',
    components: { ProductThumbnail, DjSwiper },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            products: [],
            localStore: JSON.parse(localStorage.getItem('lastProducts')),
            productSwiper: {
                loop: false,
                autoplay: false,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                },
                breakpoints: {
                    6000: {
                        slidesPerView: 6,
                    },
                    1680: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                },
            },
        };
    },
    async mounted() {
        if (this.localStore) {
            this.products = await this.$core.useThumbnails.getFeatureProductsv2({
                productSku: this.localStore,
                aggregation: 'PRODUCT',
            });
        }
    },
};
</script>
