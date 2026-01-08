<template>
    <div v-if="cartLine" class="d-flex justify-space-between align-items-center">
        <div class="product-info">
            <ProductCart
                class="w-100"
                :productSku="productSku"
                :productImage="productImage"
                :productName="productName"
                :supplierName="supplierName"
                :productBrand="productBrandName"
                :productPerPack="productPerPack"
                :offerQuantityInStock="offerQuantityInStock"
                :productExternalId="productExternalId"
                :isOnQuote="false"
                :isDesktop="true"
                size="small"
            />
            <div class="d-flex justify-space-between align-items-center mt-1">
                <div class="m-auto">
                    <DjQuantity
                        :quantityIncrement="productPerPack"
                        :displayTitle="false"
                        :showIncrement="true"
                        :buttonRound="true"
                        :quantityValue="parseInt(quantity)"
                        :class="stockWarning ? 'stockWarning' : null"
                        @child-quantity="quantityValue"
                    ></DjQuantity>
                </div>
                <div class="d-flex flex-column">
                    <div class="text-black font-700 size-16 text-right lh-1 mb-1" v-html="productUnitPrice"></div>
                    <div class="text-grey-6 size-14 text-right lh-1">
                        éco-part. <span v-html="productEcoParticipation"></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="quantity !== null && productUnitPrice">
            <div class="remove-item d-flex justify-content-end align-items-start">
                <div class="pointer" @click="handleRemoveProductFromCart">
                    <SvgIcon name="cross-black" class="mt-6" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ProductCart from '@components/organisms/productCard/ProductCart.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'DjMiniProductCart',
    components: {
        ProductCart,
        DjQuantity,
        SvgIcon,
    },
    props: {
        cartLine: {
            type: Object,
            required: true,
            default: () => {},
        },
        quantityUpdate: {
            type: Number,
            required: true,
            default: 1,
        },
        ecoTaxPrices: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    emits: ['refreshLines'],
    data() {
        return {
            quantity: this.cartLine.quantity,
            load: this.$store.state.cart.load,
        };
    },
    watch: {
        quantityUpdate() {
            this.quantity = this.quantityUpdate;
        },
    },
    computed: {
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
        }),
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        productUnitPrice() {
            return this.$purjus.utils.formatPrice(this.cartLine.offer.totalPrice.priceWithoutTax, this.currency);
        },
        productEcoParticipation() {
            if (this.ecoTaxPrices === null) {
                return 0;
            }
            const ecotaxPrice = this.ecoTaxPrices.find(
                (ecoTaxPrice) => ecoTaxPrice.offerPriceId === this.cartLine.offer.offerPriceId,
            );
            return this.$purjus.utils.formatPrice(ecotaxPrice?.ecoParticipation, this.currency);
        },
        stockWarning() {
            return !!(this.$config.checkStock && this.quantity > this.offerQuantityInStock);
        },
        productId() {
            return this.cartLine.productVariant.id;
        },
        productExternalId() {
            return this.cartLine.productVariant.id;
        },
        productSku() {
            return this.cartLine.productVariant.skuProduct;
        },
        productImage() {
            return this.cartLine.productVariant.imageLink;
        },
        productBrandName() {
            return this.cartLine.productVariant.brand;
        },
        productName() {
            return this.cartLine.productVariant.name;
        },
        supplierName() {
            return this.cartLine.supplier.name;
        },
        productPerPack() {
            return this.cartLine.offer.itemPerPack;
        },
        offerQuantityInStock() {
            return this.cartLine.offer.stock;
        },
        offerPriceExternalId() {
            return this.cartLine.offer.offerPriceId;
        },
        mpn() {
            return this.cartLine.offer.offerPriceId;
        },
    },
    methods: {
        async handleRemoveProductFromCart() {
            await this.$purjus.useCartv2.deleteLines(this.cart.id, [this.cartLine.offer.offerPriceId]);
            this.$emit('refreshLines');
        },
        quantityValue(params) {
            this.quantity = params;
            this.load = true;
            this.$purjus.useCartv2
                .modifyLines(this.cart.id, [
                    {
                        offerPriceId: this.offerPriceExternalId,
                        quantity: this.quantity,
                        updateAction: 'REPLACE_QUANTITY',
                    },
                ])
                .then(() => {
                    this.$store.dispatch('purjus/cartv2/retrieveCarts');
                    this.$emit('refreshLines');
                    this.load = false;
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.remove-item {
    height: 110px;
}

.product-info {
    width: 380px;
}
</style>
