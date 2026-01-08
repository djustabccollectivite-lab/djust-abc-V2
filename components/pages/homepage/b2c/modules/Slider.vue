<template>
    <DjSwiper :spaceBetweenSlides="40" :swiperProperties="swiperProperties">
        <DjSwiperItem v-for="slide_ in slides" :key="slide_.id">
            <div
                class="dj-banner--djust"
                :style="{
                    backgroundImage:
                        'url(' +
                        $core.useHelper.OptimizeImageStoryblok(slide_.image, '1920x720/smart') +
                        ') no-repeat center center',
                    'background-size': 'cover',
                    'box-shadow': 'none',
                }"
            >
                <div class="dj-banner--djust__img">
                    <img
                        alt="Slider Image"
                        :src="`${$core.useHelper.OptimizeImageStoryblok(
                            slide_.image?.filename ? slide_.image.filename : slide_.image,
                            '1920x720/smart'
                        )} `"
                    />
                </div>

                <div v-if="slide_.titre !== '' && slide_.Button !== ''" class="ps-banner__content">
                    <div v-if="slide_.titre !== ''" v-html="markdownReturn(slide_.titre)"></div>
                    <a
                        v-if="slide_.slideLink"
                        :href="$auth.loggedIn ? (slide_.slideLink ? slide_.slideLink : '/list') : '/auth/login'"
                        target="_blank"
                    >
                        <DjButton v-if="slide_.button" :text="$t(slide_.button)" styleButton="primary" />
                    </a>
                </div>
            </div>
        </DjSwiperItem>
    </DjSwiper>
</template>

<script>
import marked from 'marked';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';
import DjSwiperItem from '@components/atoms/DjSwiperItem/DjSwiperItem.vue';
export default {
    name: 'Slider',
    components: { DjSwiper, DjSwiperItem, DjButton },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            swiperProperties: {
                loop: false,
                slidesPerView: 1,
                spaceBetween: 40,
                autoHeight: true,
                centeredSlides: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 1,
                    },
                    1200: {
                        pagination: false,
                    },
                    1024: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
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
    computed: {
        slides() {
            return this.block ? this.block.slide : [];
        },
    },
    methods: {
        markdownReturn(value) {
            return value ? marked(value) : null;
        },
    },
};
</script>
