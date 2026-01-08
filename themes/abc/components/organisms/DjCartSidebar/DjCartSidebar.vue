<template>
    <div id="cart_side" class="add_to_cart right" :class="{ openSide: openCart }">
        <DjLink href="javascript:void(0)" class="overlay" @click="closeCart()"></DjLink>
        <div class="cart-inner">
            <div class="p-5 d-flex justify-content-between align-items-center border-bottom">
                <div class="text-black font-700 size-18 uppercase">{{ $t('cart.shoppingCart') }}</div>
                <div @click="closeCart(openCart)">
                    <DjLink href="javascript:void(0)" @click="closeCart(openCart)">
                        <SvgIcon name="arrow-right-2" />
                    </DjLink>
                </div>
            </div>
            <div v-if="isInitializing" class="px-6 mt-6">
                <div class="text-center">
                    <div class="spinner-border" role="status" aria-label="Chargement">
                        <span class="sr-only">Chargement...</span>
                    </div>
                    <p class="mt-2">Calcul des montants...</p>
                </div>
            </div>
            <div v-else-if="cartItems.length" class="px-6 mt-6">
                <ul class="cart_product">
                    <DjMiniProductCart
                        v-for="item in cartItems"
                        :key="`${item.offer.offerPriceId} - ${increment}`"
                        class="pb-3"
                        :cartLine="item"
                        :quantityUpdate="item.quantity"
                        :ecoTaxPrices="ecoTaxPrices"
                        @refreshLines="updateLines"
                    />
                </ul>

                <div v-if="isFDLReady" class="mb-6">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="font-700 text-black">
                            {{ $t('header.miniCart.subTotal') }}
                        </div>
                        <div class="text-black font-700 size-18">
                            <span v-html="totalAmountOfCart"></span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div class="text-grey-6">({{ $t('header.miniCart.ecoPart') }}</div>
                        <div class="text-grey-6"><span v-html="totalAmountEcoPart"></span>)</div>
                    </div>
                    <div class="mb-4">
                        <p class="text-black font-500 size-14">
                            {{ $t('header.miniCart.deliveryReport') }}
                        </p>
                        <p class="text-black font-700 size-14">
                            {{ $t('header.miniCart.delivery') }}
                        </p>
                    </div>
                    <div class="d-flex flex-column gap-4">
                        <div class="buttons">
                            <div class="mb-4 mt-1" @click="checkout()">
                                <DjButton
                                    :text="$t('header.miniCart.checkout')"
                                    shape="button"
                                    variant="contained"
                                    :fullWidth="true"
                                />
                            </div>
                            <div @click="viewCart()">
                                <DjButton
                                    :text="$t('header.miniCart.viewCart')"
                                    shape="button"
                                    variant="contained"
                                    :fullWidth="true"
                                />
                            </div>
                        </div>
                        <div class="d-flex justify-content-center py-2 pointer" @click="clearBasket()">
                            <span class="text-grey-6 font-700">{{ $t('header.miniCart.clearBasket') }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!cartItems.length" class="col-sm-12 empty-cart-cls text-left">
                <div class="mt-3">
                    <strong>{{ $t('cart.emptyCart') }}</strong>
                </div>
                <nuxt-link :to="localePath('/search')">
                    <DjButton
                        :text="$t('cart.backToShopButton')"
                        shape="button"
                        variant="contained"
                        :fullWidth="true"
                        @click.native="closeCart(openCart)"
                    />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import DjMiniProductCart from '@components/organisms/DjMiniProductCart/DjMiniProductCart.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import { mapGetters, mapState } from 'vuex';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    components: { DjMiniProductCart, DjLink, DjButton, SvgIcon },
    props: {
        openCart: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            loading: false,
            increment: 0,
            cartItems: [],
            totalAmountEcoPart: 0,
            ecoTaxPrices: null,
            isFDLReady: false,
            isInitializing: true,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
            billingAddress: (state) => state.user.addressBillingList,
            shippingAddress: (state) => state.user.addressShippingList,
        }),
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
            cartDetails: 'getCartDetails',
        }),
        totalAmountOfCart() {
            if (!this.cart) {
                return null;
            }
            return this.$purjus.utils.formatPrice(this.cart.totalPrice.priceWithoutTax, this.currency);
        },
    },
    watch: {
        cart() {
            const totalQuantity = this.cartItems.reduce((currentTotal, item) => {
                return item.quantity + currentTotal;
            }, 0);
            if (this.cartItems.length !== this.cart.numberOfLines || totalQuantity !== this.cart.numberOfProducts) {
                this.updateLines();
            }
        },
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

        // Nettoyer les FDL si nécessaire
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
        // await this.$purjus.useCartv2.deleteCart(this.cart.id)
    },
    methods: {
        updateLines() {
            this.cartItems = this.cartDetails?.cartLines.filter((item) => item.productVariant.id !== 'FDL') ?? [];
            this.updateEcoParticipation();
        },
        async updateEcoParticipation() {
            let offersWithEcoParticipation = this.cartItems.map((item) => {
                return {
                    offerPriceId: item.offer.offerPriceId,
                    skuProduct: item.productVariant.skuProduct,
                    ecoParticipation: null,
                };
            });
            // On récupère les valeurs connues dans le sessionStorage
            const offersInStorage = sessionStorage.getItem('cartItems');
            let offersData;
            if (!offersInStorage) {
                // On récupère toutes les offers (init)
                offersData = await this.getMissingOffers(offersWithEcoParticipation.map((item) => item.skuProduct));
            } else {
                // On récupère les offers où il manque l'écoparticipation
                offersWithEcoParticipation.map((offer) => {
                    const offerFound = JSON.parse(offersInStorage).find(
                        (offerInStorage) => offerInStorage.offerPriceId === offer.offerPriceId,
                    );
                    if (offerFound) {
                        offer.ecoParticipation = offerFound.ecoParticipation;
                    }
                    return offer;
                });
                const missingOffers = offersWithEcoParticipation.filter((offer) => offer.ecoParticipation === null);
                offersData = await this.getMissingOffers(missingOffers.map((item) => item.skuProduct));
            }
            // On a récupéré les offers manquantes, on peut mettre à jour les données d'écoparticipation
            offersWithEcoParticipation = offersWithEcoParticipation.map((offer) => {
                if (offer.ecoParticipation === null) {
                    const product = offersData.find(
                        (product) => product[0].offerInventory.variant.skuProduct === offer.skuProduct,
                    );
                    const offerUpdated = product.find(
                        (offerPrice) => offerPrice.offerPrices[0].externalId === offer.offerPriceId,
                    );
                    const ecoParticipation =
                        this.$purjus.utils.extractOfferCustomFieldValue(offerUpdated, 'ecoparticipation') ?? 0;
                    offer.ecoParticipation = parseFloat(ecoParticipation);
                }
                return offer;
            });
            sessionStorage.setItem('cartItems', JSON.stringify(offersWithEcoParticipation));
            this.ecoTaxPrices = offersWithEcoParticipation;
            // On peut maintenant calculer le total de l'écoparticipation
            const totalAmountEcoPart = this.cartItems.reduce((currentTotal, item) => {
                const offerWithEcoParticipation = offersWithEcoParticipation.find(
                    (offer) => offer.offerPriceId === item.offer.offerPriceId,
                );
                return currentTotal + offerWithEcoParticipation.ecoParticipation * item.quantity;
            }, 0);
            this.totalAmountEcoPart = this.$purjus.utils.formatPrice(totalAmountEcoPart, this.currency);
        },
        async getMissingOffers(skus) {
            const promises = [];
            skus.forEach((sku) => {
                promises.push(this.$core.useOffer.getProductOffers(sku, 'SKU', false));
            });
            return await Promise.all(promises);
        },
        closeCart() {
            this.$emit('closeCart', true);
        },
        viewCart() {
            this.$emit('closeCart', true);
            this.$router.push(this.localePath('/checkout/shopping-cart'));
        },
        checkout() {
            this.$emit('closeCart', true);
            this.$router.push(this.localePath('/checkout/billing'));
        },
        async clearBasket() {
            await this.$purjus.useCartv2.deleteLines(
                this.cart.id,
                this.cartDetails?.cartLines.map((item) => item.offer.offerPriceId),
            );
            this.$toast.success(this.$t('header.miniCart.clearSucessful'));
            this.cartItems = 0;
            this.$store.commit('purjus/cartv2/clearCartDetails');
        },
    },
};
</script>
