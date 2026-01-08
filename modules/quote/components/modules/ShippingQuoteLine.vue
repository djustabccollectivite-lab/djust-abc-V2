<template lang="html">
    <div class="d-flex" v-if="shippingAddress">
        <v-select
            v-model="select"
            :items="items"
            solo
            item-text="fullName"
            label="ShippingAdress"
            return-object
            hide-details
        ></v-select>
    </div>
</template>

<script>
export default {
    name: 'shippingQuoteLine',
    props: {
        Line: {
            type: Object,
            require: true,
            default: () => {}
        },
        id: {
            type: String,
            require: true,
            default: 0
        },
        MasterQuoteId: {
            type: String,
            require: true,
            default: 0
        }
    },
    async created() {
        await this.$core.useUser.getUserShippingAddressList();
    },
    computed: {
        shippingAddress() {
            return this.$store.state.user.addressShippingList;
        },
        select: {
            get() {
                return this.Line.addressId
                    ? this.shippingAddress.find(address => address.id === this.Line.addressId)
                    : null;
            },
            set(value) {
                this.$store.commit('quote/setQuoteLineAddress', {
                    addressId: value.id,
                    deliveryLineId: this.Line.id,
                    QuoteLineId: this.id,
                    MasterQuoteId: this.MasterQuoteId
                });
            }
        },
        items() {
            return this.shippingAddress ? this.shippingAddress : [];
        },
    }
};
</script>
