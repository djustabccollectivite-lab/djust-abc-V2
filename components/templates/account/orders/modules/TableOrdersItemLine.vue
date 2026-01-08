<template>
    <tr class="mobile">
        <td>
            <product-order
                :product="line.orderLogisticLineProductDto"
                :productVariant="line.orderLogisticLineProductVariantDto"
                :price="line.orderLogisticLinePriceDto"
            />
        </td>
        <td class="price" v-html="productUnitPrice"></td>
        <td>{{ productQuantity }}</td>
        <td class="price" v-html="productTotalPrice"></td>
    </tr>
</template>

<script>
import { mapState } from 'vuex';
import ProductOrder from '@components/organisms/productCard/ProductOrder.vue';

export default {
    components: { ProductOrder },
    props: {
        line: {
            type: Object,
            require: true,
            default: () => {},
        },
        orderLogistic: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        productUnitPrice() {
            return this.$core.getOrder.getProductUnitPrice(this.line, this.currency);
        },
        productTotalPrice() {
            return this.$core.getOrder.getProductTotalPrice(this.line, this.currency);
        },

        productQuantity() {
            return this.$core.getOrder.getQuantity(this.line, this.currency);
        },
    },
};
</script>
<style lang="scss" scoped>
.mobile {
    @media (max-width: 420px) {
        display: flex;
        flex-direction: column;
    }
}
</style>
