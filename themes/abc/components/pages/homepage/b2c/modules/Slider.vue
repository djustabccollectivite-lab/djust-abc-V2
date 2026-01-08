<template>
    <DjSwiper :swiperProperties="swiperProperties">
        <div v-for="slide_ in slides" :key="slide_.id" class="swiper-slide">
            <component
                :is="'' !== slide_.slideLink ? 'a' : 'picture'"
                :href="'' !== slide_.slideLink ? slide_.slideLink : undefined"
            >
                <img
                    :alt="slide_.image?.alt"
                    :src="`${$core.useHelper.OptimizeImageStoryblok(
                        slide_.image?.filename ?? slide_.image,
                        '1920x360/smart',
                    )} `"
                />
            </component>
        </div>
    </DjSwiper>
</template>

<script>
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';

export default {
    name: 'Slider',
    components: { DjSwiper },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            swiperProperties: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 40,
                autoHeight: true,
                centeredSlides: true,
                autoplay: {
                    delay: 8000,
                    disableOnInteraction: true,
                },
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
            return this.block?.slide ?? [];
        },
    },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: var(--color-white);

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
</style>
