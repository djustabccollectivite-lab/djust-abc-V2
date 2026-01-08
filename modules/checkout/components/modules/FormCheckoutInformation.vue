<template>
    <div>
        <div class="dj-section__content">
            <div class="row">
                <div class="col-12">
                    <figure class="dj-block--address dj-block--billing">
                        <figcaption>
                            {{ $t('checkout.billing.billingAddress') }}
                        </figcaption>
                        <div class="list-shipping--address" v-if="billingAddress?.length > 0">
                            <div class="address" v-for="address in billingAddress" :key="address.id">
                                <AdressCard
                                    :address="address"
                                    :key="address.id + increment"
                                    @refresh="refresh"
                                    :select="true"
                                />
                            </div>
                        </div>
                        <div class="missBilling" v-else>
                            <div>{{ $t('checkout.billing.missBillingAddress') }}</div>
                            <div @click="createBilling()">
                                <DjButton
                                    :text="$t('account.organisation.createAddress')"
                                    styleButton="outline"
                                    :size="'standard'"
                                    :textDisplayed="true"
                                />
                            </div>
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import AdressCard from '@components/organisms/DjAddressCard/DjAddressCard.vue';
import { mapState } from 'vuex';

export default {
    name: 'FormCheckoutInformation',
    components: { AdressCard, DjButton },
    data() {
        return {
            increment: 1,
        };
    },
    computed: {
        ...mapState({
            billingAddress: (state) => state.user.addressBillingList,
            shippingAddress: (state) => state.user.addressShippingList,
        }),
    },
    methods: {
        refresh() {
            this.$emit('refresh', 'refresh');
        },
        createBilling() {
            this.$router.push(this.localePath('/account/addresses'));
        },
    },
    beforeMount() {
        this.$core.useUser.getUserBillingAddressList();
        this.$core.useUser.getUserShippingAddressList();
    },
};
</script>

<style lang="scss" scoped>
.list-shipping--address {
    display: flex;
    flex-wrap: wrap;
    .address {
        flex: 0 0 33.333333%;
        padding: 5px;
    }
}
.missBilling {
    div {
        margin-bottom: 10px;
    }
}
</style>
