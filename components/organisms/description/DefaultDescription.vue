<template>
    <div class="dj-product__content_page">
        <v-tabs class="dj-tab-list" show-arrows color="">
            <v-tab :ripple="false" v-if="productDescription" tag="li" color="">
                <h2 class="list-item tab_title">{{ $t('product.tabs.description') }}</h2>
            </v-tab>
            <v-tab :ripple="false" tag="li" v-if="productSpecifications && displaySpecifications">
                <h2 class="list-item tab_title">{{ $t('product.tabs.specifications') }}</h2>
            </v-tab>
            <v-tab :ripple="false" tag="li" v-if="productAttributes && displayAttributes">
                <h2 class="list-item tab_title">{{ $t('product.tabs.attributes') }}</h2>
            </v-tab>
            <v-tab :ripple="false" tag="li" v-if="productShipping && productShipping !== null">
                <h2 class="list-item tab_title">{{ $t('checkout.shipping.shippingDetail') }}</h2>
            </v-tab>
            <v-tab :ripple="false" tag="li" v-if="displayReview && displayCustomerReview">
                <h2 v-if="rating && rating.length > 0" class="list-item">
                    {{ $t('product.tabs.reviews.tabName') }} ({{ rating ? rating.length : null }}
                    {{ $t('product.tabs.reviews.review') }})
                </h2>
                <h2 v-else class="list-item tab_title">{{ $t('product.tabs.reviews.tabName') }}</h2>
            </v-tab>
            <v-tab v-if="nbOffers > 1 && displayOtherOffers" :ripple="false" tag="li">
                <h2 class="list-item tab_title">{{ $t('product.tabs.offers.tabName') }}</h2>
            </v-tab>
            <v-tab-item v-if="productDescription">
                <div class="tab-content">
                    <PartialDescription :description="productDescription" />
                </div>
            </v-tab-item>
            <v-tab-item v-if="displaySpecifications">
                <div class="tab-content" v-if="productSpecifications">
                    <PartialSpecification :specifications="productSpecifications" />
                </div>
            </v-tab-item>
            <v-tab-item v-if="displayAttributes">
                <div class="tab-content" v-if="productAttributes">
                    <PartialAttributes :attributes="productAttributes" />
                </div>
            </v-tab-item>
            <v-tab-item v-if="productShipping && productShipping !== null">
                <div class="tab-content">
                    <PartialShipping :description="productShipping" />
                </div>
            </v-tab-item>
            <v-tab-item v-if="displayReview">
                <div class="tab-content">
                    <PartialReview :reviews="rating" :productSku="product.sku" />
                </div>
            </v-tab-item>
            <v-tab-item v-if="nbOffers > 1 && displayOtherOffers">
                <div class="tab-content">
                    <PartialOffer v-if="product && offers" :product="product" :offers="offers" />
                </div>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import PartialDescription from '@components/organisms/description/modules/PartialDescription.vue';
import PartialSpecification from '@components/organisms/description/modules/PartialSpecification.vue';
import PartialAttributes from '@components/organisms/description/modules/PartialAttributes.vue';
import PartialReview from '@components/organisms/description/modules/PartialReview.vue';
import PartialOffer from '@components/organisms/description/modules/PartialOffer.vue';
import PartialShipping from '@components/organisms/description/modules/PartialShipping.vue';
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'DefaultDescription',
    components: {
        PartialAttributes,
        PartialOffer,
        PartialReview,
        PartialSpecification,
        PartialDescription,
        PartialShipping,
    },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {},
        },
        offers: {
            type: Array,
            require: true,
            default: () => [],
        },
        reviews: {
            type: Array,
            require: false,
            default: () => [],
        },
        displaySpecifications: {
            type: Boolean,
            required: false,
            default: true,
        },
        displayAttributes: {
            type: Boolean,
            required: false,
            default: true,
        },
        displayReview: {
            type: Boolean,
            required: false,
            default: true,
        },
        displayOtherOffers: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        ...mapState({
            variantToDisplay: (state) => state.offers.variantToDisplay,
        }),
    },
    setup(props) {
        const ctx = useContext();
        const nbOffers = computed(() => (props.offers ? props.offers.length : 0));
        const rating = computed(() => ctx.$core.getProduct.getRatingProduct(ctx.store.state.product));
        const productDescription = computed(() => ctx.$core.getProduct.getProductDescription(props.product));
        const productSpecifications = computed(() => ctx.$core.getProduct.getProductSpecifications(props.product));
        const productAttributes = computed(() => ctx.$core.getProduct.getProductAttributes(props.product));
        const productShipping = computed(() => ctx.$core.getOffer.getDeliveryDates(props.offers));
        const displayCustomerReview = ctx.$config.customerReviewIsActive;

        return {
            nbOffers,
            rating,
            productDescription,
            productSpecifications,
            productAttributes,
            displayCustomerReview,
            productShipping,
        };
    },
});
</script>

<style lang="scss" scoped>
.tab_title {
    font-size: 18px !important;
    margin: 0;
}
.tab-content {
    padding-top: 30px;
}

a.list-item {
    position: relative;
    display: block;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    text-transform: none;
    @media screen and (min-width: 992px) {
        font-size: 20px;
    }
}

.v-tabs-slider {
    background-color: rgb(82, 82, 82);
}
</style>
