<template>
    <client-only>
        <div :key="increment" class="dj-product__thumbnail" data-vertical="true">
            <figure>
                <div class="ps-wrapper">
                    <!-- Gallery-->
                    <div class="dj-product__gallery">
                        <div ref="mySwiper" v-swiper:swiperGallery="swiperOptionTop" class="dj-carousel inside swiper">
                            <div class="swiper-wrapper">
                                <div v-for="(image, index) in images" :key="index" class="swiper-slide">
                                    <div v-if="productTagsToDisplay.length > 0" class="dj-product__badge__zone">
                                        <div
                                            v-for="tag in productTagsToDisplay"
                                            :key="tag"
                                            class="dj-product__badge mb-1"
                                        >
                                            {{ tag }}
                                        </div>
                                    </div>

                                    <DjImage :src="image" :height="1000" :width="1000" :alt="productName" />
                                </div>
                            </div>

                            <div class="swiper-nav">
                                <span class="swiper-arrow swiper-prev">
                                    <SvgIcon name="arrow-left" />
                                </span>
                                <div class="swiper-arrow swiper-next">
                                    <SvgIcon name="arrow-right" />
                                </div>
                            </div>

                            <div class="swiper-pagination swiper-pagination-bullets"></div>
                        </div>
                    </div>
                </div>
            </figure>

            <!--Variants-->
            <div class="dj-product__variants">
                <div v-swiper:swiperVariants="swiperOptionThumbs" class="dj-carousel swiper">
                    <div class="swiper-wrapper">
                        <div
                            v-for="(image, index) in images"
                            :key="index"
                            :class="`swiper-slide ${activeSlide === index ? 'active' : ''} `"
                            @click="handleClickSlide(index)"
                        >
                            <DjImage :src="image" :width="100" :height="100" :alt="productName" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'DjThumbnailDefault',
    components: {
        DjImage,
        SvgIcon,
    },
    props: {
        images: {
            type: Array,
            default: () => [],
        },
        productInfos: {
            type: Object,
            default: () => {},
        },
        increment: {
            type: Number,
            default: 0,
        },
    },
    data: (context) => ({
        locale: context.$i18n.localeProperties.code.toUpperCase(),
        swiperOptionTop: {
            loop: false,
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
        },
        swiperOptionThumbs: {
            direction: 'vertical',
            loop: false,
            spaceBetween: 10,
            slidesPerView: 3,
            centeredSlides: false,
            slideToClickedSlide: false,
        },
        activeSlide: 0,
    }),
    computed: {
        productTagsToDisplay() {
            return this.$core.getProduct.getProductTags(this.productInfos);
        },
        productName() {
            return this.productInfos.name[this.locale]
                ? this.productInfos.name[this.locale]
                : this.productInfos.name[Object.keys(this.productInfos.name)[0]];
        },
    },
    methods: {
        handleClickSlide(index) {
            this.activeSlide = index;
            this.swiperVariants.activeIndex = index;
            this.swiperGallery.slideTo(index, 500, false);
        },
    },
};
</script>

<style lang="scss" scoped>
.swiper-wrapper img {
    object-fit: contain;
}

.dj-product__variants {
    max-width: 93px;
}

.dj-carousel {
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
    visibility: visible;
    opacity: 1;
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
