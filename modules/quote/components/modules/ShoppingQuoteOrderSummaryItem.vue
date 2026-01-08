<template lang="html">
    <p class="dj-block__header d-flex justify-content-between">
        <span>
            {{ productName }}
        </span>
        <span class="ml-2">
            {{ item.quantity }} x
            <span class="ml-2" v-html="$core.getOffer.getFormatedPrice(item.price, currency)"></span>
        </span>
    </p>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'ShoppingQuoteOrderSummaryItem',
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
            return this.$core.getProductVariant.getProductTitle(this.item.productVariant);
        },
    },
};
</script>

<style lang="scss" scoped></style>
