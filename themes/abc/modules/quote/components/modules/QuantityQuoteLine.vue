<template>
    <v-text-field v-if="line" v-model.number="quantity" type="number" min="1" required solo hide-details />
</template>

<script>
export default {
    name: 'QuantityQuoteLine',
    props: {
        line: {
            type: Object,
            required: true,
            default: () => {},
        },
        id: {
            type: String,
            required: true,
            default: '',
        },
        masterQuoteId: {
            type: String,
            required: true,
            default: '',
        },
    },
    computed: {
        quantity: {
            get() {
                return this.line ? this.line.quantity : 1;
            },
            set(value) {
                if (value < 0) {
                    value = 1;
                }
                this.$store.commit('quote/setQuoteLineQuantity', {
                    quantity: Number(value),
                    deliveryLineId: this.line.id,
                    QuoteLineId: this.id,
                    MasterQuoteId: this.masterQuoteId,
                });
            },
        },
    },
};
</script>
