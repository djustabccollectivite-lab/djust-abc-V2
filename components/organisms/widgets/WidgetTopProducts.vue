<template>
    <div class="dj-card dj-block--categories-box">
        <div class="dj-block__header">
            <div class="title__h4">{{ title }}</div>
        </div>

        <div class="dj-card__content">
            <div class="dj-carousel" v-swiper:carouselBestSeller="carouselSetting">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="product in products" :key="product.id">
                        <product-thumbnail :product="product" />
                    </div>
                </div>
                <div class="swiper-nav">
                    <span class="swiper-arrow swiper-prev"><i class="icon-chevron-left"></i></span>
                    <div class="swiper-arrow swiper-next">
                        <i class="icon-chevron-right"></i>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
        </div>

        <div class="dj-card__footer">
            <a class="dj-card__morelink" href="/list">
                View Full Products
                <i class="icon icon-chevron-right"></i>
            </a>
        </div>
    </div>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';

export default {
    name: 'WidgetTopProducts',
    components: { ProductThumbnail },
    props: {
        products: {
            type: Array,
            default: [],
        },
        title: {
            type: String,
            default: 'All Products',
        },
    },
    data() {
        return {
            carouselSetting: {
                loop: false,
                slidesPerView: 4,
                spaceBetween: 1,
                scrollbar: {
                    draggable: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: false,
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 4,
                    },
                    1366: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                },
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.demo {
    box-shadow: 0 !important;
    border-radius: 0 !important;
    border-radius: 0 !important;
    background-color: white;
    border: 0 !important;
    padding: 3px !important;
    overflow: hidden;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
}
</style>
