<template>
    <div class="d-flex">
        <div class="dj-product__content_page mr-2">
            <v-text-field
                v-if="Line"
                v-model.number="quantity"
                type="number"
                min="1"
                required
                solo
                hide-details
            ></v-text-field>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuantityQuoteLine',
    props: {
        quoteLine: {
            type: Object,
            require: true,
            default: () => {},
        },
        Line: {
            type: Object,
            require: true,
            default: () => {},
        },
        id: {
            type: String,
            require: true,
            default: '0',
        },
        MasterQuoteId: {
            type: String,
            require: true,
            default: '0',
        },
    },
    computed: {
        quantity: {
            get() {
                return this.Line ? this.Line.quantity : 1;
            },
            set(value) {
                let finalValue = value;
                if (finalValue <= 0) {
                    finalValue = 1;
                }

                try {
                    this.$core.useQuote.updateMasterQuote(this.MasterQuoteId, {
                        masterQuoteDetailsToAdd: [
                            {
                                productVariantId: this.quoteLine?.productVariant?.id,
                                quantity: finalValue,
                            },
                        ],
                    });

                    this.$store.commit('quote/setQuoteLineQuantity', {
                        quantity: Number(finalValue),
                        deliveryLineId: this.quoteLine.deliveryLines[0].id,
                        QuoteLineId: this.quoteLine.id,
                        MasterQuoteId: this.MasterQuoteId,
                    });
                } catch (_error) {}
            },
        },
    },
};
</script>
