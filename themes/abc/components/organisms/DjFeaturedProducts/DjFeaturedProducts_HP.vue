<template>
    <div v-if="products && 0 < products.length" class="mx-10 mt-10">
        <div class="d-flex justify-space-between align-items-center mb-8">
            <h2 class="font-700 size-24 text-blue">
                {{ block.title }}
            </h2>
            <nuxt-link :to="'/list'">
                <span class="font-500 underline text-black">{{ $t('common.seeAllOffers') }}</span>
            </nuxt-link>
        </div>
        <div class="mt-6 row swiper-container">
            <DjSwiper :swiperProperties="productSwiper">
                <div v-for="product in products" :key="product?.id" class="swiper-slide">
                    <ProductThumbnail :product="product" :line="false" />
                </div>
            </DjSwiper>
        </div>
    </div>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';

export default {
    name: 'FeaturedProducts',
    components: { ProductThumbnail, DjSwiper },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            products: [],
            productSwiper: {
                loop: true,
                autoplay: false,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                },
                breakpoints: {
                    6000: {
                        slidesPerView: 6,
                    },
                    1680: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                },
            },
        };
    },
    async created() {
        const params = {
            size: 50,
            sort: 'createdTime|desc',
        };

        try {
            const listProducts = await this.$core.useThumbnails.getFeatureProductsv2(params);

            for (const product of listProducts) {
                const exists = this.products.some((item) => item.product.id === product.product.id);
                if (exists) {
                    continue;
                }

                if (this.products.length < 6) {
                    this.products.push(product);
                } else {
                    break;
                }
            }

            if (!this.products || this.products.length === 0 || this.products[0] === null) {
                this.$toast.error("Une erreur s'est produite. Produits non disponibles.");
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
            this.$toast.error("Une erreur s'est produite lors de la récupération des produits.");
        }
    },
};
</script>
