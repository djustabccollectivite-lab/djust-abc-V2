<template>
    <div>
        <div @click.prevent="!isDisabled ? handleValidate() : null">
            <button-ui
                :isDisabled="isDisabled"
                :text="$t('account.quotes.validate')"
                styleButton="primary"
                :shape="styleB"
                :size="size"
            />
        </div>
    </div>
</template>

<script>
import ButtonUi from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'ButtonValidateQuote',
    components: { ButtonUi },
    props: {
        styleB: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: false,
            default: 'standard',
        },
        billingAddress: {
            type: String,
            required: true,
        },
        masterquote: {
            type: Object,
            required: false,
            default: () => {},
        },
        comments: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            clickDiv: 'disableDiv',
        };
    },
    computed: {
        isDisabled() {
            const createSupplierQuoteRequests = this.$core.createRequest.RequestAPIvalidateMasterQuote(
                this.masterquote,
            );

            const checkSupplier = createSupplierQuoteRequests.some(
                (unitProductSupplierCheck) => unitProductSupplierCheck.supplierIds.length === 0,
            );

            if (checkSupplier) this.clickDiv = 'disableDiv';
            else this.clickDiv = '';

            return checkSupplier;
        },
    },
    methods: {
        async handleValidate() {
            const createSupplierQuoteRequests = this.$core.createRequest.RequestAPIvalidateMasterQuote(
                this.masterquote,
            );

            const errorQuantity = createSupplierQuoteRequests.some((unitProductCheck) =>
                unitProductCheck.createQuoteDeliveryLineRequests.some((array) => array.quantity <= 0),
            );

            if (!errorQuantity) {
                const data = {
                    masterQuoteId: this.masterquote.id,
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
            } else {
                this.$toast.error(this.$t('notification.quote.quantityError'));
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.disableDiv {
    pointer-events: none;
}
</style>
