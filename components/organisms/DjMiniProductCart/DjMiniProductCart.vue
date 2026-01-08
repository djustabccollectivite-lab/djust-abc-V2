<template v-if="cartLine">
    <div class="dj-mini-product-cart">
        <div class="product-info">
            <ProductCart
                class="w-100"
                :productId="$core.getCart.getProductId(cartLine)"
                :productSku="$core.getCart.getProductSku(cartLine)"
                :productImage="$core.getCart.getProductImage(cartLine)"
                :productName="$core.getCart.getProductName(cartLine)"
                :supplierName="$core.getCart.getSupplierName(cartLine)"
                :attributs="$core.getCart.getProductAttributes(cartLine)"
                :productPerPack="$core.getCart.getProductPerPack(cartLine)"
                :offerQuantityInStock="$core.getCart.getOfferStock(cartLine)"
                size="small"
            />
            <div class="qte-price">
                <div class="qteclass">
                    <DjQuantity
                        @child-quantity="quantityValue"
                        :quantityIncrement="$core.getCart.getProductPerPack(cartLine)"
                        :displayTitle="false"
                        :showIncrement="true"
                        :buttonRound="true"
                        :quantityValue="quantity"
                        :class="stockWaring ? 'stockWarning' : null"
                    ></DjQuantity>
                </div>
                <div class="priceclass"><span v-html="productUnitPrice"></span></div>
            </div>
        </div>
        <div v-if="quantity !== null && productUnitPrice" class="productPrice" style="list-style-type: none">
            <div class="remove-item">
                <DjLink class="dj-product__remove" @click="handleRemoveProductFromCart(cartLine)">
                    <i class="icon-cross"></i>
                </DjLink>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import ProductCart from '@components/organisms/productCard/ProductCart.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';

export default {
    name: 'DjMiniProductCart',
    components: {
        DjLink,
        ProductCart,
        DjQuantity,
    },
    props: {
        cartLine: {
            type: Object,
            required: true,
            default: () => {},
        },
        deletable: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            quantity: this.$core.getCart.getQuantity(this.cartLine),
            load: this.$store.state.cart.load,
        };
    },
    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            currency: (state) => state.app.currency,
        }),
        productUnitPrice() {
            return this.$core.getCart.getProductUnitPrice(this.cartLine, this.currency);
        },
        stock() {
            return this.$core.getOffer.getOfferStock(this.cartLine);
        },
        stockWaring() {
            return this.$config.checkStock && this.quantity > this.stock ? true : false;
        },
    },
    methods: {
        handleRemoveProductFromCart(cartLine) {
            this.$core.useCart.removeProductFromCart(cartLine);
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
                const succes = await this.$core.useCart.updateCartLines(newCartLine);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.remove-item {
    height: 110px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}
@media (min-width: 640px) {
    .dj-mini-product-cart {
        // height: 160px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .productPrice {
            width: 30px;
            li {
                font-size: 1rem;
            }
        }
        .dj-product__remove {
            font-size: 18px;
            width: 20px;
            padding-right: 10px;
        }
    }
    .qte-price {
        display: flex;
        justify-content: space-between;
    }
    .qteclass {
        margin-left: 135px;
        margin-right: 5px;
    }
    .priceclass {
        font-size: 18px;
        margin-left: 95px;
        line-height: 1.25;
    }
}
@media (max-width: 640px) {
    .dj-mini-product-cart {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .productPrice {
            width: 30px;
            li {
                font-size: 1rem;
            }
        }
        .dj-product__remove {
            font-size: 18px;
            width: 20px;
            padding-right: 10px;
        }
    }
    .qte-price {
        display: flex;
        justify-content: space-between;
    }
    .qteclass {
        margin-left: 145px;
    }
    .priceclass {
        font-size: 18px;
        line-height: 1.25;
    }
}
@media (max-width: 330px) {
    .qteclass {
        margin-left: 10px;
    }
}
.product-info {
    width: 380px;
}
</style>
