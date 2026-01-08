<template>
    <div class="dj-carousel" v-swiper:featuredProducts="carouselSetting" :style="{ maxWidth: width }">
        <DjCarouselArrows type="simple" />
        <div class="swiper-wrapper">
            <slot />
        </div>
        <!--Carousel controls-->
        <div class="swiper-pagination swiper-pagination-bullets displaynone"></div>
    </div>
</template>

<script>
import { carouselStandard } from '~/utilities/carousel-helpers.js';
import DjCarouselArrows from '@components/atoms/DjCarouselArrows/DjCarouselArrows.vue';

export default {
    name: 'DjSwiper',
    components: { DjCarouselArrows },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
        items: {
            type: Array,
            default: () => [],
        },
        spaceBetweenSlides: {
            type: Number,
            defaut: 0,
        },
        swiperProperties: {
            type: Object,
            default: null,
        },
        width: {
            type: String,
            default: '100%',
        },
    },
    data() {
        return {
            carouselSetting: this.swiperProperties
                ? this.swiperProperties
                : {
                      ...carouselStandard,
                      navigation: {
                          nextEl: '.dj-product-slider .swiper-next',
                          prevEl: '.dj-product-slider .swiper-prev',
                      },
                      spaceBetween: this.spaceBetweenSlides,
                  },
            products: [],
            TestLoading: true,
            nb: 0,
            increment: 1,
        };
    }
};
</script>
<style lang="scss" scoped>
.swiper-container {
    width: 100%;
    height: 100%;
}

.displaynone {
    display: none;
}
</style>
