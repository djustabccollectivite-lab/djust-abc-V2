<template>
    <div v-swiper:featuredProducts="swiperProperties" class="dj-carousel">
        <!-- Carousel navigation -->
        <div class="swiper-nav">
            <div class="swiper-arrow swiper-prev simple">
                <SvgIcon name="arrow-left" />
            </div>
            <div class="swiper-arrow swiper-next simple">
                <SvgIcon name="arrow-right" />
            </div>
        </div>
        <!--Carousel Content-->
        <div class="swiper-wrapper">
            <slot />
        </div>
        <!-- Carousel pagination -->
        <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'DjSwiper',
    components: { SvgIcon },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
        swiperProperties: {
            type: Object,
            default: null,
        },
    },
};
</script>

<style lang="scss">
.dj-carousel {
    width: 100%;
    margin: 10px;
    border: 2px solid var(--color-black);
    border-radius: 8px;
    @media screen and (min-width: 960px) {
        margin: 0;
        border: none;
    }
}

@media screen and (min-width: 960px) {
    .swiper-pagination {
        display: none;
    }
}
.dj-carousel .swiper-arrow {
    background-color: rgba(255, 255, 255, 0.5) !important;
    border-radius: 50%;
    @media screen and (min-width: 960px) {
        background-color: transparent !important;
    }
}

.dj-carousel .swiper-pagination-bullets {
    background-color: rgba(153, 153, 153, 0.5);
    border-radius: 20px;
}

.dj-carousel .swiper-pagination-bullet {
    background-color: var(--color-black);
}

.dj-carousel .swiper-pagination-bullet-active {
    background-color: var(--color-primary);
}
</style>
