<template>
    <div class="dj-product__thumbnail">
        <figure>
            <div class="ps-wrapper">
                <div
                    class="dj-product__gallery dj-carousel inside swiper"
                    v-swiper:mySwiper="swiperOptionTop"
                    ref="swiperTop"
                >
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-if="$core.getThumbnails.getProductThumbnailImages(product)">
                            <DjImage :src="$core.getThumbnails.getProductThumbnailImages(product)[0].url" />
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
                </div>
            </div>
        </figure>
    </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default defineComponent({
    name: 'DjThumbnailQuickView',
    components: {
        DjImage,
    },
    props: {
        product: {
            type: Object,
            default: {},
        },
    },
    setup() {
        const swiperOptionTop = ref({
            loop: false,
            loopedSlides: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
        });

        return { swiperOptionTop };
    },
});
</script>
