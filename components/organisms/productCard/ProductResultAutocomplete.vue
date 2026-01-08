<template>
    <div class="dj-product dj-product--search-result dj-product--autocomplete d-flex align-items-center">
        <div class="dj-product__thumbnail__small">
            <nuxt-link v-if="product.mainImageUrl" :to="localePath(`/product/${product.sku}`)">
                <img :src="`${product.mainImageUrl}`" alt="djust" />
            </nuxt-link>
        </div>
        <div class="dj-product__content_page">
            <nuxt-link :to="localePath(`/product/${product.sku}`)" class="dj-product__title">
                {{ product.name }}
            </nuxt-link>
            <div v-if="product.navigationCategoryName" class="dj-product__rating">
                <span>{{ product.navigationCategoryName[0] }}</span>
            </div>
        </div>
        <div v-if="addOption" @mouseover="viewOffers">
            <DjButton
                :textDisplayed="false"
                :iconDisplayed="true"
                icon="icon-arrow-right"
                iconPosition="right"
                size="small"
            />
        </div>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import Rating from '@components/atoms/DjRating/DjRating.vue';
import { mapState } from 'vuex';

export default {
    name: 'ProductResult',
    components: { Rating, DjButton },
    props: {
        product: {
            type: Object,
            require: true,
            default: {},
        },
        addOption: {
            type: Boolean,
            require: false,
            default: true,
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
    },
    data() {
        return {
            selected: false,
            offers: [],
        };
    },
    methods: {
        selectProduct() {
            this.selected = true;
        },
        async viewOffers() {
            const result = await this.$core.useOffer.getProductOffers(this.product.sku);
            this.offers = result;
        },
        async hideOffers() {
            this.offers = [];
        },
        destroyOffers() {
            this.offers = [];
        },
    },
    watch: {
        offers: function () {
            // Emit this information to the parents component
            this.$emit('product-offers', { product: this.product, offers: this.offers });
        },
    },
    
};
</script>
