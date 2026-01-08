<template lang="html">
    <div class="dj-order-product-summary">
        <span class="dj-supplier-name">{{ supplierName }}</span>
        <span class="dj-productQte">
            <span class="dj-block--checkout-order--name">
                {{ productName }} - <span class="ml-2 qtePrice" v-html="quantity + ' x ' + productPrice"></span>
            </span>
            <span class="ml-2 dj-productTotal" v-html="productPriceTotal"></span>
        </span>
    </div>
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
        },
        quantity() {
            return this.$core.getCart.getQuantity(this.item);
        },
        productPrice() {
            return this.$core.getCart.getProductUnitPrice(this.item, this.currency);
        },
        productPriceTotal() {
            return this.$core.getCart.getProductTotalPrice(this.item, this.currency);
        },
        supplierName() {
            return this.$core.getCart.getSupplierName(this.item);
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-productQte {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dj-productTotal {
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #1c1c1c;
    *  > {
            font-family: var(--font-2nd) !important;

    }
}
.dj-block--checkout-order--price * > {
    min-width: 100px;
    color: var(--color-body);
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}
.dj-block--checkout-order--name {
    line-height: 1.2em;
    font-size: 0.9em;
}
.dj-supplier-name {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #4d4d4f;
}
.qtePrice {
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #1c1c1c;
}
.dj-order-product-summary {
    //padding: 5px;
    &:hover {
        //box-shadow: 0px 2px 4px 1px rgba(105, 105, 105, 0.25);
        //border-radius: 20px;
    }
}
</style>
