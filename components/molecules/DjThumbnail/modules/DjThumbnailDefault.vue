<template>
    <client-only>
        <div class="dj-product__thumbnail" data-vertical="true">
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
                                    <i class="icon-chevron-left"></i>
                                </span>

                                <div class="swiper-arrow swiper-next">
                                    <i class="icon-chevron-right"></i>
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

export default {
    name: 'DjThumbnailDefault',
    components: {
        DjImage,
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
.ps-wrapper {
    height: 100%;

    .dj-product__gallery {
        height: 100%;

        .dj-carousel {
            height: 100%;

            img {
                width: auto;
                height: 100%;
            }
        }
    }
}
</style>
