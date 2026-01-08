<template lang="html">
    <DjCard title="Essentials" link="/list" linkText="View All Products">
        <DjSwiper :spaceBetweenSlides="40" :swiperProperties="swiperProperties">
            <DjSwiperItem v-for="product in products" :key="product.id">
                <ProductThumbnail :product="product" :line="false" />
            </DjSwiperItem>
        </DjSwiper>
    </DjCard>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';
import DjSwiperItem from '@components/atoms/DjSwiperItem/DjSwiperItem.vue';
import DjSwiperBlock from '@components/organisms/DjSwiperBlock/DjSwiperBlock.vue';
export default {
    components: { ProductThumbnail, DjCard, DjSwiper, DjSwiperItem, DjSwiperBlock },
    props: {
        products: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            model: null,
            loading: true,
            swiperProperties: {
                loop: false,
                slidesPerView: 1,
                spaceBetween: 40,
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
                        slidesPerView: 1,
                    },
                    1366: {
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
        columns() {
            if (this.$vuetify.breakpoint.xl) {
                return 4;
            }

            if (this.$vuetify.breakpoint.lg) {
                return 3;
            }

            if (this.$vuetify.breakpoint.md) {
                return 2;
            }

            return 1;
        },
    },
    async fetch() {
        setTimeout(
            function () {
                this.loading = false;
            }.bind(this),
            250
        );
    },
};
</script>
