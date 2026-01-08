<template>
    <div class="abc-container py-10">
        <DjSteps class="hidden-on-mobile" />
        <div class="row mt-10">
            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <figure class="dj-block--address">
                    <figcaption>
                        {{ $t('checkout.billing.billingAddress') }}
                    </figcaption>
                    <div v-if="billingAddress?.length > 0" class="row">
                        <div v-for="address in billingAddress" :key="address.id" class="col-12 col-md-5">
                            <AddressCard
                                :address="address"
                                :key="address.id + increment"
                                @refresh="refresh"
                                select="billing"
                            />
                        </div>
                    </div>
                    <div v-else class="d-flex justify-content-center">
                        <div>
                            <div class="text-center mb-4">{{ $t('checkout.billing.missBillingAddress') }}</div>
                            <div class="d-flex justify-content-center">
                                <nuxt-link :to="localePath('/checkout/shopping-cart')">
                                    <DjButton
                                        :text="$t('account.organisation.createAddress')"
                                        shape="button"
                                        variant="outlined"
                                    />
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </figure>
                <div class="hidden-on-mobile">
                    <div class="d-flex justify-content-between align-items-center mt-6">
                        <nuxt-link :to="localePath('/checkout/shopping-cart')">
                            <DjButton
                                :text="$t('checkout.shipping.return')"
                                shape="button"
                                variant="outlined"
                                :iconDisplayed="true"
                                icon="arrow-left-small"
                                iconPosition="left"
                            />
                        </nuxt-link>
                        <nuxt-link :to="localePath('/account/addresses')">
                            <DjButton
                                :text="$t('account.organisation.createAddress')"
                                shape="button"
                                variant="outlined"
                            />
                        </nuxt-link>
                    </div>
                </div>
                <div class="hidden-on-desktop mt-4">
                    <nuxt-link :to="localePath('/account/addresses')">
                        <DjButton
                            :text="$t('account.organisation.createAddress')"
                            shape="button"
                            variant="outlined"
                            :fullWidth="true"
                        />
                    </nuxt-link>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div v-if="isInitializing" class="p-4 shadow rounded">
                    <div class="text-center">
                        <div class="spinner-border" role="status" aria-label="Chargement">
                            <span class="sr-only">Chargement...</span>
                        </div>
                        <p class="mt-2">Calcul des montants...</p>
                    </div>
                </div>
                <ModuleOrderSummary v-else-if="isFDLReady">
                    <div @click="handleToShipping">
                        <DjButton
                            :text="$t('checkout.billing.continueButton')"
                            shape="button"
                            variant="contained"
                            :fullWidth="true"
                        />
                    </div>
                    <v-dialog v-model="dialog" width="500">
                        <div class="bg-white">
                            <div class="bg-grey text-center py-4 font-700 size-16">
                                {{ $t('checkout.billing.chooseYourBillingAddress') }}
                            </div>
                            <div class="px-2 pt-6 pb-4 text-center">
                                {{ $t('checkout.billing.messageBeforeContinue') }}
                            </div>
                            <v-divider></v-divider>
                            <div class="d-flex justify-content-end px-4 pb-2">
                                <div @click="dialog = false">
                                    <DjButton text="OK" shape="button" variant="contained" />
                                </div>
                            </div>
                        </div>
                    </v-dialog>
                </ModuleOrderSummary>
            </div>
        </div>
        <div class="hidden-on-desktop mt-6">
            <nuxt-link :to="localePath('/checkout/shopping-cart')">
                <DjButton
                    :text="$t('checkout.shipping.return')"
                    shape="button"
                    variant="outlined"
                    :iconDisplayed="true"
                    icon="arrow-left-small"
                    iconPosition="left"
                    :fullWidth="true"
                />
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import AddressCard from '@components/organisms/DjAddressCard/DjAddressCard.vue';
import ModuleOrderSummary from '@modules/checkout/components/modules/ModuleOrderSummary.vue';

export default {
    name: 'BillingPage',
    components: { ModuleOrderSummary, DjButton, DjSteps, AddressCard },
    computed: {
        ...mapState({
            billingAddress: (state) => state.user.addressBillingList,
            billingAddressSelected: (state) => state.cart.cartBillingAddressId,
            shippingAddress: (state) => state.user.addressShippingList,
            shippingAddressSelected: (state) => state.cart.cartShippingAddressId,
        }),
    },
    data() {
        return {
            dialog: false,
            increment: 1,
            isFDLReady: false,
            isInitializing: true,
        };
    },
    methods: {
        refresh() {
            this.increment++;
        },
        handleToShipping() {
            if (this.billingAddressSelected === null) {
                this.dialog = true;
            } else {
                this.$core.useCart.addBillingAddress();
                this.$router.push(this.localePath('/checkout/shipping'));
            }
        },
    },
    beforeMount() {
        this.$core.useUser.getUserBillingAddressList();
        this.$core.useUser.getUserShippingAddressList();
    },
    async mounted() {
        await this.$purjus.abc.useAbcDeliveryFeesHelper
            .cleanupFDLIfNeeded(this.$route.name)
            .catch(() => this.$toast && this.$toast.error('Erreur lors du nettoyage FDL'));
        if (this.$store.getters['purjus/cartv2/monoCart']) {
            await this.$store
                .dispatch('purjus/cartv2/retrieveCarts')
                .catch(() => this.$toast && this.$toast.error('Erreur lors du rafraîchissement du panier'));
        }
        this.isFDLReady = true;
        this.isInitializing = false;
    },
};
</script>
