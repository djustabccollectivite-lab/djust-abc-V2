<template>
    <DjSwiperBlock :title="block.title" backgroundColor="#FFF" width="1200px">
        <DjSwiper :spaceBetweenSlides="10" :swiperProperties="swiperProperties" width="1200px">
            <DjSwiperItem v-for="item in items" :key="item.id">
                <div>
                    <DjImage :src="item.Image.filename" />
                    <div class="swipper-text__content" v-html="markdownReturn(item.Text)"></div>
                </div>
            </DjSwiperItem>
        </DjSwiper>
    </DjSwiperBlock>
</template>

<script>
import { carouselFullwidth } from '~/utilities/carousel-helpers.js';
import DjCarouselArrows from '@components/atoms/DjCarouselArrows/DjCarouselArrows.vue';
import Loading from '@components/atoms/DjLoading/DjLoading.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';
import DjSwiperItem from '@components/atoms/DjSwiperItem/DjSwiperItem.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import DjSwiperBlock from '@components/organisms/DjSwiperBlock/DjSwiperBlock';

import marked from 'marked';

export default {
    name: 'Swiper',
    components: { DjCarouselArrows, Loading, DjSwiper, DjSwiperItem, DjImage, DjSwiperBlock },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        line() {
            return this.block.data.line === 'true';
        },
    },
    data() {
        return {
            items: this.block.Swiper_Item,
            carouselSetting: {
                ...carouselFullwidth,
                navigation: {
                    nextEl: '.dj-product-slider .swiper-next',
                    prevEl: '.dj-product-slider .swiper-prev',
                },
            },
            newwkey: 30928809,
            products: [],
            TestLoading: true,
            nb: 0,
            increment: 1,
            swiperProperties: {
                loop: false,
                slidesPerView: 3,
                spaceBetween: 10,
                autoHeight: true,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 3,
                    },
                    1366: {
                        slidesPerView: 3,
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
        };
    },
    methods: {
        markdownReturn(value) {
            return value ? marked(value) : null;
        },
    },
};
</script>

<style lang="scss">
.swipper-text__content {
    position: absolute;
    bottom: 10px;
    left: 10px;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: white !important;
    }
}
</style>
