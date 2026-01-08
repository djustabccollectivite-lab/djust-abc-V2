<template>
    <DjCardProduct>
        <div class="dj-product dj-product-horizontal" :class="isSelected ? 'isSelected' : null">
            <DjRadio :value="product.id" class="mt-5"></DjRadio>

            <div class="dj-product__thumbnail" @mouseover="productImage ? (isHiding = true) : null"
                @mouseout="isHiding = false">
                <div class="dj-product__thumbnail-content">
                    <transition mode="out-in">
                        <DjImage v-if="!isHiding" :src="productImage" :alt="productTitle" />
                        <DjImage v-else :src="productImage" :alt="productTitle" />
                    </transition>
                </div>
            </div>
            <div class="dj-product__infos">
                <div class="dj-product__div__title d-flex align-items-end">
                    <DjLink :to="localePath(`/product/${productSku}`)">
                        <div class="dj-product__title">
                            {{ productTitle }}
                        </div>
                    </DjLink>
                </div>
                <div>
                    <div class="d-flex">
                        <div style="width: 50%" class="dj-product__small-info">marque</div>
                        <DjLink :to="localePath(`/product/${productSku}`)" class="dj-product__small-info_value">
                            {{ productBrandName }}
                        </DjLink>
                    </div>
                    <div class="d-flex">
                        <div style="width: 50%" class="dj-product__small-info">ref fournisseur</div>
                        <DjLink :to="localePath(`/product/${productSku}`)" class="dj-product__small-info_value">
                            {{ productSku }}
                        </DjLink>
                    </div>
                </div>
            </div>
        </div>
    </DjCardProduct>
</template>

<script>
import { mapState } from 'vuex';
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import DjPrice from '@components/atoms/DjPrice/DjPrice.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import DjCardProduct from '@components/molecules/DjCardProduct/DjCardProduct.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjRadio from '@components/atoms/DjRadio/DjRadio.vue';

import DjProductThumbnailInfo from '@components/molecules/DjProductThumbnailInfo/DjProductThumbnailInfo.vue';

export default {
    components: {
        DjRating,
        DjPrice,
        DjLink,
        DjModal,
        DjImage,
        DjCardProduct,
        DjButton,
        DjQuantity,
        DjRadio,
        DjProductThumbnailInfo,
    },
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        },
        product: {
            type: Object,
            require: true,
            default: () => { },
        },
        line: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
        productImage() {
            return this.$core.getProductVariant.getProductMainImage(this.product.orderLogisticLineProductVariantDto);
        },
        productBrandName() {
            return this.$core.getProduct.getProductBrand(this.product.orderLogisticLineProductDto);
        },
        productTitle() {
            return this.product.orderLogisticLineProductDto.name;
        },
        productId() {
            return this.$core.getProduct.getProductId(this.product.orderLogisticLineProductDto);
        },
        productSku() {
            return this.$core.getProduct.getProductSku(this.product.orderLogisticLineProductDto);
        },
    },
    data: () => ({
        isHiding: false,
    }),
};
</script>

<style lang="scss">
.isSelected {
    border-color: var(--color-primary) !important;
    border-width: 2px !important;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
}
</style>
