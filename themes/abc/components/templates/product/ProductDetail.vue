<template>
    <div class="dj-product--detail mb-0">
        <div class="row">
            <div class="col-12 col-lg-6 px-lg-10">
                <DjThumbnail
                    v-if="productPictures"
                    type="default"
                    :images="productPictures"
                    :productInfos="product"
                    :increment="increment"
                />
                <div class="mt-4">
                    <DefaultDescription
                        v-if="productDescription && variantSelected"
                        :product="product"
                        :productDescription="productDescription"
                        :selectedVariant="variantSelected"
                        type="tabs"
                    />
                </div>
            </div>
            <div class="col-12 col-lg-6 px-lg-10">
                <div class="pb-4">
                    <ProductInfos :product="product" :variantSelected="variantSelected" />
                    <div v-if="offers">
                        <BuyingZone :product="product" :offers="offers" @onSelectedOffer="updateProductInformations" />
                    </div>
                    <div v-if="!$auth.loggedIn" class="pt-4">
                        <div @click="goToLogin">
                            <DjButton
                                text="Commander"
                                shape="button"
                                variant="contained"
                                :iconDisplayed="true"
                                icon="cart-small"
                                rounded
                                fullWidth
                                class="pt-20"
                            />
                        </div>
                    </div>
                </div>
                <div v-if="relatedProducts?.length ?? 0 > 0">
                    <h3 class="text-black mb-4">Produits associés</h3>
                    <DjSwiper :swiperProperties="productSwiper">
                        <div v-for="relatedProduct in relatedProducts" :key="relatedProduct?.id" class="swiper-slide">
                            <ProductThumbnailRelated :product="relatedProduct" :line="false" />
                        </div>
                    </DjSwiper>
                </div>
                <div v-if="relatedProductsComponent && $auth.loggedIn" class="mt-4 p-6 bg-grey">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="uppercase m-0 font-weight-bold">
                            {{ relatedProductsComponent.redirect[0].title }}
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="d-flex flex-column gap-2 align-items-start">
                            <div>
                                {{ relatedProductsComponent.redirect[0].description }}
                            </div>
                            <button
                                type="button"
                                class="dj-btn dj-btn--primary mt-2 font-weight-medium px-8 py-3"
                                @click="relatedProductRedirect"
                            >
                                {{ relatedProductsComponent.redirect[0].button_text }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DefaultDescription
            v-if="productDescription && variantSelected"
            :product="product"
            :productDescription="productDescription"
            :selectedVariant="variantSelected"
            type="expansion"
        />
    </div>
</template>

<script>
import DefaultDescription from '@components/organisms/description/DefaultDescription.vue';
import DjThumbnail from '@components/molecules/DjThumbnail/DjThumbnail.vue';
import BuyingZone from '@components/templates/product/modules/BuyingZone.vue';
import ProductInfos from '@components/templates/product/modules/ProductInfos.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import ProductThumbnailRelated from '@components/organisms/productCard/ProductThumbnailRelatedProduct.vue';
import DjSwiper from '@components/molecules/DjSwiper/DjSwiper.vue';

export default {
    name: 'ProductDetail',
    components: {
        ProductInfos,
        DjThumbnail,
        BuyingZone,
        DefaultDescription,
        DjButton,
        DjSwiper,
        ProductThumbnailRelated,
    },
    props: {
        product: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            relatedProductsComponent: null,
            relatedProducts: [],
            productDescription: null,
            productPictures: null,
            variantSelected: null,
            increment: 0,
            offers: null,
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
                        slidesPerView: 3,
                    },
                    1680: {
                        slidesPerView: 2,
                    },
                    1200: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                },
            },
        };
    },
    head() {
        const metaTitle =
            this.$purjus.utils.extractProductCustomFieldValue(this.product, 'Balise_Title') ??
            `${this.productTitle} | ${this.product.brand} | ${this.product?.navigationCategories[0]?.name}`;
        const metaDescription =
            this.$purjus.utils.extractProductCustomFieldValue(this.product, 'Meta_Description') ?? '';
        return {
            title: metaTitle,
            titleTemplate: metaTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: metaDescription,
                },
            ],
        };
    },
    computed: {
        productTitle() {
            return this.$core.getProduct.getProductTitle(this.product);
        },
    },
    async created() {
        this.relatedProductsComponent = await this.$core.useStoryblok.getStoryBlokContent('relatedProducts');
    },
    async mounted() {
        this.clearData();
        this.offers = await this.$core.useOffer.getProductOffers(this.product.sku);
        this.relatedProducts = await this.$core.useProduct.getRelatedProductsById(this.product.sku);
    },
    methods: {
        clearData() {
            this.productPictures = null;
            this.variantSelected = null;
            this.productDescription = '';
        },
        updateProductInformations(offerSelected) {
            if (offerSelected === null) {
                this.productDescription = 'Description non disponible';
                return;
            }
            this.variantSelected = offerSelected;
            this.productDescription = offerSelected?.offerInventory?.variant?.description?.replace(/\n/g, '<br>');
            this.productPictures = offerSelected?.offerInventory?.variant?.productPictures;
            this.increment++; // Permet de mettre à jour les images du swiper au changement d'une option
        },
        relatedProductRedirect() {
            this.$router.push('/cms/contact-us?redirectedFrom=associatedProduct');
        },
        goToLogin() {
            this.$router.push({
                path: '/auth/login',
                query: { sku: this.product.sku, redirect: this.$route.fullPath },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-btn--primary {
    color: black !important;

    &:hover {
        color: white !important;
        background-color: black !important;
    }
}
</style>
