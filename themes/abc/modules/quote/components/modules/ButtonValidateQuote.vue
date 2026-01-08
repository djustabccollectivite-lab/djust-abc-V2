<template>
    <div @click.prevent="handleValidate">
        <DjButton :text="$t('account.quotes.validate')" shape="button" variant="contained" :fullWidth="true" />
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'ButtonValidateQuote',
    components: {
        DjButton,
    },
    props: {
        billingAddress: {
            type: String,
            required: false,
            default: null,
        },
        masterQuote: {
            type: Object,
            required: false,
            default: () => {},
        },
        comments: {
            type: String,
            required: false,
            default: null,
        },
    },
    methods: {
        async handleValidate() {
            const createSupplierQuoteRequests = this.$core.createRequest.RequestAPIvalidateMasterQuote(
                this.masterQuote,
            );
            const errorQuantity = createSupplierQuoteRequests.some((unitProductCheck) =>
                unitProductCheck.createQuoteDeliveryLineRequests.some((array) => array.quantity <= 0),
            );
            if (errorQuantity === true) {
                this.$toast.error(this.$t('notification.quote.quantityError'));
            } else {
                const data = {
                    masterQuoteId: this.masterQuote.id,
                    createSupplierQuoteRequests,
                    billingAddressId: this.billingAddress,
                    supplierQuoteUrl: `${window.location.origin}/supplier-quotes/{supplierId}`,
                };
                const result = await this.$core.useQuote.validateMasterQuote(data, this.comments);
                if (result) {
                    this.$toast.success(this.$t('notification.quote.quoteValidate'));
                } else {
                    this.$toast.error(this.$t('notification.quote.quoteError'));
                }
            }
        },
    },
};
</script>
