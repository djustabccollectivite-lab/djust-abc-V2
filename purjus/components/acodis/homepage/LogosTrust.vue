<template>
    <div class="mt-10 mx-10 pb-10">
        <h2 class="font-700 size-24">{{ block.title }}</h2>
        <DjSwiper :spaceBetweenSlides="10" :swiperProperties="swiperProperties" width="100%">
            <DjSwiperItem v-for="(logo, index) in block.logos" :key="index">
                <div class="brand">
                    <nuxt-link v-if="logo.link.substr(0, 1) === '/'" :to="logo.link">
                        <img
                            class="logo-item"
                            :src="`${logo.image.filename}/m/0x100`"
                            :alt="logo.image.name ? logo.image.name : `logo partenaire n°${index}`"
                        />
                    </nuxt-link>
                    <a v-else :href="logo.link">
                        <img
                            class="logo-item"
                            :src="`${logo.image.filename}/m/0x100`"
                            :alt="logo.image.name ? logo.image.name : `logo partenaire n°${index}`"
                        />
                    </a>
                </div>
            </DjSwiperItem>
        </DjSwiper>
    </div>
</template>

<script>
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';
import DjSwiperItem from '@components/atoms/DjSwiperItem/DjSwiperItem.vue';

export default {
    name: 'LogosTrust',
    components: { DjSwiper, DjSwiperItem },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            swiperProperties: {
                slidesPerView: 8,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                },
                loop: false,
                speed: 1000,
                autoplay: {
                    delay: 3000,
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 5,
                    },

                    768: {
                        slidesPerView: 3,
                    },

                    480: {
                        slidesPerView: 2,
                    },
                },
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.dj-logos-slider {
    padding: 20px 40px;
}
.brand {
    text-align: center;
}
</style>
