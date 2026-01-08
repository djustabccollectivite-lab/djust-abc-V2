<template>
    <DjSwiperBlock :title="block.title" :withlink="true">
        <DjSwiper :spaceBetweenSlides="40" :swiperProperties="swiperProperties">
            <DjSwiperItem style="height=300px" v-for="product in products" :key="product.id">
                <ProductThumbnail :product="product" :line="false" />
            </DjSwiperItem>
        </DjSwiper>
    </DjSwiperBlock>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import DjCarouselArrows from '@components/atoms/DjCarouselArrows/DjCarouselArrows.vue';
import Loading from '@components/atoms/DjLoading/DjLoading.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';
import DjSwiperItem from '@components/atoms/DjSwiperItem/DjSwiperItem.vue';
import DjSwiperBlock from '@components/organisms/DjSwiperBlock/DjSwiperBlock.vue';

export default {
    name: 'FeaturedProducts',
    components: { DjCarouselArrows, ProductThumbnail, Loading, DjSwiper, DjSwiperItem, DjSwiperBlock },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        line() {
            return this.block.data.line === 'true' ? true : false;
        },
    },
    data() {
        return {
            swiperProperties: {
                loop: false,
                slidesPerView: 4,
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
                        slidesPerView: 4,
                    },
                    1366: {
                        slidesPerView: 4,
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
            newwkey: 30928809,
            products: [],
            TestLoading: true,
            nb: 0,
            increment: 1,
            categoryIdsForParams: this.block?.categoriesId,
        };
    },
    watch: {
        auth: function () {
            this.$forceUpdate();
            this.newwkey += 1;
        },
    },
    async created() {
        const params = {
            ategoryIds: this.categoryIdsForParams,
        };
        this.products = await this.$core.useThumbnails.getFeatureProducts(params);

        if (this.products) {
            setTimeout(
                function () {
                    this.TestLoading = false;
                    this.nb = 0;
                    this.increment += 100;
                }.bind(this),
                2000
            );
        }
    },
};
</script>

<style lang="scss" scoped>
.productCaroussel {
    width: 1200px;
    margin: auto;
}
</style>
