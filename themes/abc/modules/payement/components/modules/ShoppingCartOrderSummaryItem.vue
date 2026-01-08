<template lang="html">
    <p class="dj-block__header d-flex justify-content-between">
        <span>
            {{ productName }}
        </span>
        <span class="ml-2"> {{ quantity }} x <span class="ml-2" v-html="productPrice"></span> </span>
    </p>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'ShoppingCartOrderSummaryItem',
    props: {
        item: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        productName() {
            return this.$core.getCart.getProductName(this.item);
            //return this.$store.getters["cart/getProductName"](this.item)
        },
        quantity() {
            return this.$core.getCart.getQuantity(this.item);
            //return this.$store.getters["cart/getQuantity"](this.item)
        },
        productPrice() {
            return this.$core.getCart.getProductUnitPrice(this.item, this.currency);
            //return this.$store.getters["cart/getProductUnitPrice"](this.item, this.currency)
        },
    },
};
</script>

<style lang="scss" scoped></style>
