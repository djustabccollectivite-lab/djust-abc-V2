<template>
    <tr>
        <td data-label="Product">
            <ProductCart
                :productId="$core.getCart.getProductId(cartLine)"
                :productSku="$core.getCart.getProductSku(cartLine)"
                :productImage="$core.getCart.getProductImage(cartLine)"
                :productName="$core.getCart.getProductName(cartLine)"
                :supplierName="$core.getCart.getSupplierName(cartLine)"
                :productBrand="$core.getCart.getProductBrand(cartLine)"
                :attributs="$core.getCart.getProductAttributes(cartLine)"
                :offerQuantityInStock="$core.getCart.getOfferStock(cartLine)"
                :productPerPack="$core.getCart.getProductPerPack(cartLine)"
            />
        </td>
        <td data-label="Prix" class="price" v-html="productUnitPrice"></td>
        <td data-label="Quantité">
            <div class="form-group--number">
                <dj-quantity
                    @child-quantity="quantityValue"
                    :quantityIncrement="$core.getCart.getProductPerPack(cartLine)"
                    :quantityValue="quantity"
                    :showIncrement="true"
                    :key="increment"
                    :displayTitle="false"
                    :class="stockWarning ? 'stockWarning' : null"
                    :isDisabled="load"
                />
            </div>
            <p v-if="stockWarning">pas assez en stock</p>
        </td>
        <td data-label="Total" v-html="productTotalPrice"></td>
        <td data-label="Action">
            <a href="#" @click.prevent="handleRemoveProductFromCart">
                <i class="icon-cross"></i>
            </a>
        </td>
    </tr>
</template>

<script>
import { mapState } from 'vuex';
import ProductCart from '@components/organisms/productCard/ProductCart.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';

export default {
    name: 'TableShoppingCartItem',
    components: { ProductCart, DjQuantity },
    props: {
        cartLine: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    created() {
        if (this.load === true) {
            setTimeout(
                function () {
                    this.load = this.$store.commit('cart/setLoading', false);
                }.bind(this),
                600
            );
        }
    },
    data() {
        return {
            quantity: this.$core.getCart.getQuantity(this.cartLine),
            increment: 1,
            load: this.$store.state.cart.load,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        productUnitPrice() {
            return this.$core.getCart.getProductUnitPrice(this.cartLine, this.currency);
        },
        productTotalPrice() {
            return this.$core.getCart.getProductTotalPrice(this.cartLine, this.currency);
        },
        stock() {
            return this.$core.getOffer.getOfferStock(this.cartLine);
        },
        stockWarning() {
            return this.$config.checkStock && this.quantity > this.stock;
        },
    },
    methods: {
        handleRemoveProductFromCart() {
            this.$core.useCart.removeProductFromCart(this.cartLine);
        },
        quantityValue(params) {
            this.quantity = params;
        },
    },
    watch: {
        async quantity() {
            this.load = true;
            this.$store.commit('cart/setLoading', true);
            const checkStockControlIsOk = this.$config.checkStock
                ? this.quantity > this.stock || this.quantity < this.cartLine.offerInventory.minOrderQuantity
                    ? false
                    : true
                : true;
            if (!checkStockControlIsOk) {
                this.$toast.error(this.$t('notification.product.stockError'));
                this.quantity = await this.$core.getCart.getQuantity(this.cartLine);
            } else {
                const newCartLine = [
                    {
                        offerPriceId: this.cartLine.offerPrice.id,
                        quantity: this.quantity,
                        deliveryLines: [],
                    },
                ];
                await this.$core.useCart.updateCartLines(newCartLine);
            }
        },
    },
};
</script>

<style lang="scss">
.stockWarning {
    .form-group--number {
        .quantity-value {
            color: red;
        }
    }
}
</style>
