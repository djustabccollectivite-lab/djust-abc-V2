<template>
    <section aria-labelledby="summary-heading" class="p-4 shadow rounded">
        <h2 class="text-center text-black font-700 size-16 mt-2 mb-4 text-uppercase">
            {{ $t('account.orders.summary') }}
        </h2>
        <div v-if="isInitializing" class="text-center">
            <div class="spinner-border" role="status" aria-label="Chargement">
                <span class="sr-only">Chargement...</span>
            </div>
            <p class="mt-2">Calcul des montants...</p>
        </div>
        <div v-else-if="isFDLReady && cartItems && cartItems.length > 0">
            <div v-for="cartLine in cartItems" :key="cartLine.id" class="mb-4">
                <ShoppingCartOrderSummaryItem :cartLine="cartLine" />
            </div>
            <div
                v-if="isShippingStep && !freeDelivery"
                class="d-flex justify-content-between align-items-center border-bottom"
            >
                <div>Frais de livraison HT</div>
                <div class="ml-2 font-700 size-16">
                    {{ $purjus.utils.formatPrice(deliveryFees, currency) }}
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    {{ $t('account.orders.totalProductHT') }}
                </div>
                <div class="font-700 size-16" v-html="totalAmountOfCart"></div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-1 mb-4">
                <div>Dont éco-participation</div>
                <div class="text-grey-4 font-700" v-html="totalAmountEcoPart"></div>
            </div>
            <p v-if="isShippingStep && 2000 < cart.totalPrice.priceWithoutTax" class="text-black font-700 size-14">
                Livraison offerte
            </p>
            <div class="d-flex justify-content-between align-items-center border-bottom">
                <div class="order-detail">
                    <span>{{ $t('account.orders.vat') }}<span v-if="!isShippingStep">*</span></span>
                </div>
                <div class="font-700 size-16" v-html="totalTaxOfCart"></div>
            </div>
            <div v-if="!isShippingStep" class="border-bottom py-4">
                <div class="italic">
                    <p>Frais de port appliqués à l’étape « Détails de livraison »</p>
                    <div>* Prix indicatifs, hors frais de livraison (frais appliqués selon l'adresse de livraison)</div>
                    <div>** Livraison offerte à partir de 2000€ HT sauf exceptions.</div>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="font-700 size-16">{{ $t('account.orders.invoice.totalWithTax') }}</div>
                <div class="font-700 size-16" v-html="totalAmountOfCartWithTax"></div>
            </div>
        </div>
        <div class="mt-6">
            <slot />
        </div>
    </section>
</template>

<script>
import ShoppingCartOrderSummaryItem from '@modules/checkout/components/modules/ShoppingCartOrderSummaryItem.vue';
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'ModuleOrderSummary',
    components: { ShoppingCartOrderSummaryItem },
    props: {
        shipping: {
            type: Boolean,
            default: () => false,
        },
        deliveryFees: {
            type: Number,
            default: () => 0,
        },
    },
    data() {
        return {
            cartItems: [],
            totalAmountEcoPart: 0,
            isShippingStep: this.$route.name === 'checkout Shipping',
            isFDLReady: false,
            isInitializing: true,
        };
    },
    computed: {
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
            cartDetails: 'getCartDetails',
        }),
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        totalAmountOfCart() {
            return this.$purjus.utils.formatPrice(
                this.cart.totalPrice.priceWithoutTax + this.deliveryFees,
                this.currency,
            );
        },
        totalTaxOfCart() {
            return this.$purjus.utils.formatPrice(this.cart.totalPrice.taxAmount + this.deliveryFeesVat, this.currency);
        },
        totalAmountOfCartWithTax() {
            return this.$purjus.utils.formatPrice(
                this.cart.totalPrice.priceWithTax + this.deliveryFeesWithVat,
                this.currency,
            );
        },
        deliveryFeesVat() {
            return this.deliveryFees * 0.2;
        },
        deliveryFeesWithVat() {
            return this.deliveryFees + this.deliveryFeesVat;
        },
        freeDelivery() {
            return this.cart.totalPrice.priceWithoutTax >= 2000;
        },
    },
    watch: {
        cartDetails(newValue) {
            if (newValue) {
                this.updateLines();
            }
        },
    },
    async mounted() {
        if (this.cart) {
            this.updateLines();
        }
        await this.$purjus.abc.useAbcDeliveryFeesHelper
            .cleanupFDLIfNeeded(this.$route.name)
            .catch(() => this.$toast && this.$toast.error('Erreur lors du nettoyage FDL'));
        if (this.cart) {
            await this.$store
                .dispatch('purjus/cartv2/retrieveCarts')
                .catch(() => this.$toast && this.$toast.error('Erreur lors du rafraîchissement du panier'));
            this.updateLines();
        }
        this.isFDLReady = true;
        this.isInitializing = false;
    },
    methods: {
        updateLines() {
            const allItems = this.cartDetails?.cartLines || [];
            this.cartItems = allItems.filter((item) => item.productVariant.id !== 'FDL');
            const cartItemsStorage = JSON.parse(sessionStorage.getItem('cartItems'));
            const totalAmountEcoPart = this.cartItems.reduce((currentTotal, item) => {
                const offer = cartItemsStorage.find(
                    (cartItemStorage) => cartItemStorage.offerPriceId === item.offer.offerPriceId,
                );
                const ecoTax = offer?.ecoParticipation ?? 0;
                return currentTotal + ecoTax * item.quantity;
            }, 0);
            this.totalAmountEcoPart = this.$purjus.utils.formatPrice(totalAmountEcoPart, this.currency);
        },
    },
};
</script>
<style scoped>
.is-blurred {
    filter: blur(4px);
    pointer-events: none;
}
</style>
