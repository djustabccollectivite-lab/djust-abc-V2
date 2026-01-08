<template>
    <div class="dj-product-list dj-product-slider dj-section--carousel-outside">
        <div class="dj-container">
            <div class="dj-section__header dj-section__header__white">
                <h2>{{ title }}</h2>
            </div>
            <div class="dj-section__content">
                <DjSwiper :watchSlidesProgress="true" :swiperProperties="swiperProperties">
                    <DjSwiperItem v-for="product in products" :key="product.id">
                        <product-thumbnail class="dj-product-slide" :product="product" :line="false" />
                    </DjSwiperItem>
                </DjSwiper>
            </div>
        </div>
    </div>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import DjCarouselArrows from '@components/atoms/DjCarouselArrows/DjCarouselArrows.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';
import DjSwiperItem from '@components/atoms/DjSwiperItem/DjSwiperItem.vue';
import DjSwiperBlock from '@components/organisms/DjSwiperBlock/DjSwiperBlock.vue';
export default {
    name: 'DjRelatedProducts',
    components: { DjCarouselArrows, ProductThumbnail, DjSwiper, DjSwiperItem, DjSwiperBlock },
    props: {
        products: {
            type: Array,
            default: () => [],
        },
        displayLine: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
    },

    computed: {
        line() {
            return this.displayLine ? true : false;
        },
    },
    data() {
        return {
            swiperProperties: {
                navigation: true,
                slidesPerView: 5,
                spaceBetween: 10,
                autoHeight: false,
                navigation: {
                    nextEl: '.dj-product-slider .swiper-next',
                    prevEl: '.dj-product-slider .swiper-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                    clickable: true,
                },
                loop: false,
                speed: 1000,
                autoplay: {
                    delay: 3000,
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 4,
                    },
                    1366: {
                        slidesPerView: 4,
                    },
                    1200: {
                        pagination: false,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                },
            },
            newwkey: 20321,
        };
    },
};
</script>
