<template>
    <tr v-if="isDesktop" class="shadow rounded">
        <td data-label="Product">
            <ProductCart
                :productSku="productSku"
                :productImage="productImage"
                :productName="productName"
                :supplierName="supplierName"
                :productPerPack="productPerPack"
                :productExternalId="productExternalId"
                :productBrand="productBrandName"
                :isOnQuote="false"
                :isDesktop="true"
            />
        </td>
        <td data-label="Prix" class="price">
            <div class="font-700 size-16 text-black" v-html="productUnitPrice"></div>
            <div v-if="resultEcoTax" class="text-grey-6">dont éco-part {{ resultEcoTax }} €</div>
        </td>
        <td data-label="Quantité">
            <DjQuantity
                :quantityIncrement="productPerPack"
                :quantityValue="quantity"
                :showIncrement="true"
                :displayTitle="false"
                @child-quantity="quantityValue"
            />
        </td>
        <td data-label="Total" class="font-700 size-16 text-black" v-html="productTotalPrice"></td>
        <td data-label="Action">
            <span class="pointer" @click="handleRemoveProductFromCart">
                <SvgIcon name="cross-black" />
            </span>
        </td>
    </tr>
    <div v-else class="p-2 shadow rounded mb-4">
        <div class="row align-items-center">
            <ProductCart
                :productSku="productSku"
                :productImage="productImage"
                :productName="productName"
                :supplierName="supplierName"
                :productPerPack="productPerPack"
                :productExternalId="productExternalId"
                :productBrand="productBrandName"
                :isOnQuote="false"
                :isDesktop="false"
                class="col-10"
            />
            <div class="col-2 text-center">
                <span class="pointer" @click="handleRemoveProductFromCart">
                    <SvgIcon name="cross-black" />
                </span>
            </div>
        </div>
        <div class="d-flex justify-space-between mt-2">
            <div data-label="Prix">
                <div>Prix HT :</div>
                <div class="font-700 size-16 text-black" v-html="productUnitPrice"></div>
                <div v-if="ecoTax" class="">dont éco-part. {{ ecoTax }} €</div>
            </div>
            <div class="d-flex justify-content-center" data-label="Quantité">
                <DjQuantity
                    :quantityIncrement="productPerPack"
                    :quantityValue="parseInt(quantity)"
                    :showIncrement="true"
                    :displayTitle="false"
                    @child-quantity="quantityValue"
                />
            </div>
            <div>
                <div class="text(center">Total :</div>
                <div data-label="Total" class="font-700 size-16 text-black" v-html="productTotalPrice"></div>
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
    name: 'TableShoppingCart',
    components: { ProductCart, DjQuantity, SvgIcon },
    props: {
        cartLine: {
            type: Object,
            required: true,
            default: () => {},
        },
        isDesktop: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    emits: ['refreshLines'],
    data() {
        return {
            quantity: this.cartLine.quantity,
            load: this.$store.state.cart.load,
            resultEcoTax: null,
        };
    },
    computed: {
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
        }),
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        ecoTax() {
            const cartItemsStorage = JSON.parse(sessionStorage.getItem('cartItems'));
            const offer = cartItemsStorage.find((item) => item.offerPriceId === this.cartLine.offer.offerPriceId);
            return offer?.ecoParticipation ?? 0;
        },
        productUnitPrice() {
            return this.$purjus.utils.formatPrice(this.cartLine.offer.totalPrice.priceWithoutTax, this.currency);
        },
        productTotalPrice() {
            return this.$purjus.utils.formatPrice(
                this.cartLine.offer.totalPrice.priceWithoutTax * this.quantity,
                this.currency,
            );
        },
        stock() {
            return this.cartLine.offer.stock;
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
        productName() {
            return this.cartLine.productVariant.name;
        },
        productBrandName() {
            return this.cartLine.productVariant.brand;
        },
        supplierName() {
            return this.cartLine.supplier.name;
        },
        productPerPack() {
            return this.cartLine.offer.itemPerPack;
        },
        offerPriceExternalId() {
            return this.cartLine.offer.offerPriceId;
        },
    },
    created() {
        if (this.load === true) {
            setTimeout(
                function () {
                    this.load = this.$store.commit('cart/setLoading', false);
                }.bind(this),
                600,
            );
        }
        this.resultEcoTax = this.ecoTax;
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
                    this.load = false;
                });
        },
    },
};
</script>

<style lang="scss" scoped>
td {
    padding: 20px 10px;
    text-align: center;
}
</style>
