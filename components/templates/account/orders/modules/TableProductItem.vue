<template>
    <div class="product-grid p-2 grid-item">
        <div class="d-flex align-items-center">
            <img :src="productImg" alt="product img" class="mr-2 product-img" />
            <p class="mb-0 order-text-color order-text-font-size">
                {{ productName }}
            </p>
        </div>
        <p class="mb-0 text-center order-text-color order-text-font-size" v-html="orderLogisticUnitPrice" />
        <p class="mb-0 text-center order-text-color order-text-font-size">{{ orderLogistic.quantity }}</p>
        <p
            class="mb-0 text-center order-text-color order-text-font-size"
            v-html="totalOrderLogisticPriceWithoutTax"
        />
    </div>
</template>

<script>
export default {
    name: 'TableProductItem',
    props: {
        orderLogistic: {
            required: true,
            type: Object,
        },
    },
    computed: {
        currency() {
            return this.$store.state.app.currency
        },
        orderLogisticUnitPrice() {
            return this.$core.getOrder.getProductUnitPriceFormated(this.orderLogistic, this.currency);
        },
        totalOrderLogisticPriceWithoutTax() {
            return this.$core.getOrder.getProductTotalPriceHT(this.orderLogistic, this.currency);
        },
        productImg() {
            return this.orderLogistic.orderLogisticLineProductDto.mainImageUrl;
        },
        productName() {
            return this.orderLogistic.orderLogisticLineProductDto.name;
        }
    }
};
</script>