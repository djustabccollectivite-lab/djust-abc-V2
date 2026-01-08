<template>
    <div class="dj-logos-slider">
        <DjSwiperBlock :title="block.title" :withlink="false" width="99%">
            <DjSwiper :spaceBetweenSlides="10" :swiperProperties="swiperProperties" width="100%">
                <DjSwiperItem v-for="(logo, index) in block.logos" :key="index">
                    <div class="brand item">
                        <nuxt-link :to="logo.link" v-if="logo.link.substr(0, 1) === '/'">
                            <a><img class="logo-item" :src="logo.image.filename + '/m/0x100'" alt="Djust" /></a>
                        </nuxt-link>
                        <a v-else :href="logo.link">
                            <a><img class="logo-item" :src="logo.image.filename + '/m/0x100'" alt="Djust" /></a>
                        </a>
                    </div>
                </DjSwiperItem>
            </DjSwiper>
        </DjSwiperBlock>
    </div>
</template>

<script>
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';
import DjSwiperItem from '@components/atoms/DjSwiperItem/DjSwiperItem.vue';
import DjSwiperBlock from '@components/organisms/DjSwiperBlock/DjSwiperBlock.vue';

export default {
    name: 'LogosSlider',
    components: { DjSwiper, DjSwiperItem, DjSwiperBlock },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            swiperProperties: {
                slidesPerView: 5,
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
