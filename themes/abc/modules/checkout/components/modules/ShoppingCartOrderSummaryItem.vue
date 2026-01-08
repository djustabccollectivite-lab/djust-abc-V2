<template>
    <div class="d-flex justify-content-between align-items-center">
        <div>
            <span class="font-700">{{ productName }}</span> - <span v-html="quantity + ' x ' + productPrice"></span>
            <div v-if="brandName">
                Marque : <span class="font-700">{{ brandName }}</span>
            </div>
            <div>
                Réf : <span class="font-700">{{ externalId }}</span>
            </div>
        </div>
        <div class="font-700 size-16" v-html="productPriceTotal"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ShoppingCartOrderSummaryItem',
    props: {
        cartLine: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        productName() {
            return this.cartLine.productVariant.name;
        },
        externalId() {
            return this.cartLine.productVariant.id;
        },
        brandName() {
            return this.cartLine.productVariant.brand;
        },
        quantity() {
            return this.cartLine.quantity;
        },
        productPrice() {
            return this.$purjus.utils.formatPrice(this.cartLine.offer.totalPrice.priceWithoutTax, this.currency);
        },
        productPriceTotal() {
            return this.$purjus.utils.formatPrice(
                this.cartLine.offer.totalPrice.priceWithoutTax * this.quantity,
                this.currency,
            );
        },
        supplierName() {
            return this.cartLine.supplier.name;
        },
    },
};
</script>
