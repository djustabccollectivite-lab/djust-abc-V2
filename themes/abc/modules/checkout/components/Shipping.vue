<template>
    <div class="abc-container py-10">
        <DjSteps class="hidden-on-mobile" />
        <div class="row mt-10">
            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <figure class="dj-block--address dj-block--billing">
                    <figcaption>
                        {{ $t('checkout.shipping.address') }}
                    </figcaption>
                    <div v-if="shippingAddress?.length > 0" class="row">
                        <div v-for="address in shippingAddress" :key="address.id" class="col-12 col-md-5">
                            <AddressCard
                                :key="address.id + increment"
                                :address="address"
                                select="shipping"
                                @refresh="refresh"
                                @addressSelected="onAddressSelected"
                            />
                        </div>
                    </div>
                    <div v-else class="d-flex justify-content-center">
                        <div>
                            <div class="text-center mb-4">{{ $t('checkout.shipping.missShippingAddress') }}</div>
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
                <ModuleOrderSummary v-else-if="isFDLReady" :shipping="true" :deliveryFees="totalDeliveryFees">
                    <div @click="handleToPayment">
                        <DjButton
                            :text="!isLoading ? 'Continuer vers le paiement' : 'En cours de creation'"
                            shape="button"
                            variant="contained"
                            :fullWidth="true"
                            :isLoading="isLoading"
                        />
                    </div>
                    <v-dialog v-model="dialog" width="500">
                        <div class="bg-white">
                            <div class="bg-grey text-center py-4 font-700 size-16">
                                {{ $t('checkout.shipping.chooseYourShippingAddress') }}
                            </div>
                            <div class="px-2 pt-6 pb-4 text-center">
                                {{ $t('checkout.shipping.messageBeforeContinue') }}
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
            <nuxt-link :to="localePath('/checkout/billing')">
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
import { mapGetters, mapState } from 'vuex';
import ModuleOrderSummary from '@modules/checkout/components/modules/ModuleOrderSummary.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';
import AddressCard from '@components/organisms/DjAddressCard/DjAddressCard.vue';

export default {
    name: 'ShippingPage',
    components: {
        ModuleOrderSummary,
        DjButton,
        DjSteps,
        AddressCard,
    },
    data() {
        return {
            dialog: false,
            increment: 1,
            isLoading: false,
            deliveryFeesBySuppliers: {},
            cartItems: [],
            isFDLReady: false,
            isInitializing: true,
        };
    },
    computed: {
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
        }),
        ...mapState({
            billingAddress: (state) => state.user.addressBillingList,
            billingAddressSelected: (state) => state.cart.cartBillingAddressId,
            shippingAddress: (state) => state.user.addressShippingList,
            shippingAddressSelected: (state) => state.cart.cartShippingAddressId,
        }),
        totalDeliveryFees() {
            return Object.values(this.deliveryFeesBySuppliers).reduce((acc, value) => acc + value, 0);
        },
    },
    created() {
        this.$nuxt.$on('updateNewAddress', () => {
            this.increment++;
        });
        if (this.billingAddressSelected === null) {
            this.$router.push(this.localePath(`/checkout/billing`));
        }
        if (this.shippingAddressSelected !== null) {
            this.onAddressSelected();
        }
    },
    beforeMount() {
        this.$core.useUser.getUserShippingAddressList();
    },
    async mounted() {
        await this.$purjus.abc.useAbcDeliveryFeesHelper
            .cleanupFDLIfNeeded(this.$route.name)
            .catch(() => this.$toast && this.$toast.error('Erreur lors du nettoyage FDL'));
        if (this.cart) {
            await this.$store
                .dispatch('purjus/cartv2/retrieveCarts')
                .catch(() => this.$toast && this.$toast.error('Erreur lors du rafraîchissement du panier'));
        }
        this.isFDLReady = true;
        this.isInitializing = false;
    },
    methods: {
        async onAddressSelected() {
            const cartDetails = await this.$purjus.useCartv2.getLines(this.cart.id);
            this.cartItems = cartDetails.cartLines;
            const productItemsOnly = this.cartItems.filter((item) => item.productVariant.id !== 'FDL');
            this.deliveryFeesBySuppliers =
                await this.$purjus.abc.useAbcDeliveryFeesHelper.getTotalDeliveryFees(productItemsOnly);
        },
        refresh() {
            this.increment++;
        },
        async asyncOrdergetter(orderId) {
            const tries = 10;
            for (let i = 0; i < tries; i++) {
                const commercialOrder = await this.$purjus.useOrders.getCommercialOrderById(orderId);
                if (commercialOrder.processing === false) {
                    return commercialOrder;
                }
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        },
        async handleToPayment() {
            if (this.shippingAddressSelected === null) {
                this.dialog = true;
            } else {
                this.isLoading = true;
                this.isInitializing = true;
                await this.$core.useCart.validAddress();
                const cartId = this.cart.id;
                await this.$purjus.abc.useAbcDeliveryFeesHelper.addDeliveryFeesToCart(
                    cartId,
                    this.deliveryFeesBySuppliers,
                );
                await this.$store.dispatch('purjus/cartv2/retrieveCarts');
                let orderId;
                if (this.cart.status === 'INIT') {
                    orderId = await this.$purjus.useCartv2.initOrder(cartId);
                } else {
                    orderId = (await this.$purjus.useOrders.getCommercialOrderById(cartId, 'CART_ID')).id;
                }
                const commercialOrder = await this.asyncOrdergetter(orderId);
                const logisticOrderId = commercialOrder.orderLogistics[0].id;
                const orderReference = sessionStorage.getItem('orderReference');
                const ecotaxItems = sessionStorage.getItem('cartItems');
                commercialOrder.orderLogistics[0].lines.forEach((line) => {
                    const ecoTaxItem = JSON.parse(ecotaxItems).find(
                        (item) => item.offerPriceId === line.orderLogisticLinePriceDto.externalOfferId,
                    );
                    const requestCustomField = [
                        {
                            customFieldId: 'TOTAL_ECOPART',
                            customFieldValue: line.quantity * ecoTaxItem?.ecoParticipation,
                        },
                    ];
                    this.$purjus.useOrder.updateOrderLineCustomField(logisticOrderId, line.id, requestCustomField);
                });
                if (orderReference) {
                    const requestCustomField = [
                        {
                            customFieldId: 'REF_COMMANDE',
                            customFieldValue: orderReference,
                        },
                    ];
                    await this.$purjus.useOrder.updateOrderCustomField(logisticOrderId, requestCustomField);
                }
                const shippingType = 'STD';
                const shippingAddress = this.shippingAddress.find(
                    (address) => address.id === this.shippingAddressSelected,
                );
                await this.$core.useOrder.updateCommercialOrderShippingInformations(
                    commercialOrder.id,
                    shippingAddress.externalId,
                    shippingType,
                );
                const billingAddress = this.billingAddress.find(
                    (address) => address.id === this.billingAddressSelected,
                );
                await this.$core.useOrder.updateCommercialOrderBillingInformations(
                    commercialOrder.id,
                    billingAddress.externalId,
                );
                try {
                    this.$router.push(this.localePath(`/checkout/payment`));
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                    this.isInitializing = false;
                    this.$toast.error(this.$t('checkout.orderValidation.orderError'));
                }
            }
        },
    },
};
</script>
