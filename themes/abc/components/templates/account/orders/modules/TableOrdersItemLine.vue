<template>
    <tr>
        <td>
            <product-order
                :product="line.orderLogisticLineProductDto"
                :productVariant="line.orderLogisticLineProductVariantDto"
                :price="line.orderLogisticLinePriceDto"
                :mpnVariantProduct="mpnVariantProduct"
            />
        </td>
        <td class="price text-center vertical-center font-700">
            <div v-html="isDeliveryFee ? productQuantity : productUnitPrice"></div>
        </td>
        <td class="text-center vertical-center font-700">{{ isDeliveryFee ? 1 : productQuantity }}</td>
        <td v-if="!isDeliveryFee" class="price text-center vertical-center font-700">
            <div v-html="productTotalPrice"></div>
            <div class="font-400 text-grey-6">Dont éco-part. <span v-html="totalEcoTax"></span></div>
        </td>
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
            required: true,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        isDeliveryFee() {
            return this.line.orderLogisticLineProductVariantDto.externalId === 'FDL';
        },
        productUnitPrice() {
            return this.$core.getOrder.getProductUnitPrice(this.line, this.currency);
        },
        productTotalPrice() {
            return this.$core.getOrder.getProductTotalPrice(this.line, this.currency);
        },
        mpnVariantProduct() {
            return this.line?.orderLogisticLineProductVariantDto?.mpn;
        },
        productQuantity() {
            return this.$core.getOrder.getQuantity(this.line, this.currency);
        },
        totalEcoTax() {
            const totalAmountEcoPart =
                this.line.customFieldValues.find(
                    (customField) => customField.customField.externalId === 'TOTAL_ECOPART',
                )?.value ?? 0;
            return this.$purjus.utils.formatPrice(totalAmountEcoPart, this.currency);
        },
    },
};
</script>
