<template>
    <div class="abc-container pt-10 mb-10">
        <DjSteps class="hidden-on-mobile" />
        <div v-if="cartItems && cartItems.length > 0">
            <div v-for="supplier in suppliersList" :key="supplier.id">
                <TableShoppingCart :cartLines="cartItemsBySuppliers[supplier]" @refreshLines="updateLines" />
            </div>
        </div>
        <p v-else class="text-center py-16 font-700 size-18">
            {{ $t('cart.emptyCart') }}
        </p>
        <p
            :class="[
                'text-center mt-4 text-black',
                isDesktop ? 'hidden-on-mobile font-700 size-18' : 'hidden-on-desktop font-400 size-14',
            ]"
        >
            Frais de port appliqués à l’étape « Détails de livraison »
            <br />
            Livraison offerte à partir de 2000€ HT sauf exceptions
        </p>
        <p
            :class="[
                'text-center mt-4 text-black',
                isDesktop ? 'hidden-on-mobile font-700 size-18' : 'hidden-on-desktop font-400 size-14',
            ]"
        >
            Si votre site n’est pas accessible aux véhicules PL et semi-remorques, Merci de passer par le devis. Nous
            pouvons chiffrer la livraison avec un camion Hayon
        </p>

        <div class="hidden-on-mobile">
            <div class="d-flex justify-content-between align-items-center pa-4">
                <div @click="handleBackToShop">
                    <DjButton
                        :text="$t('cart.backToShopButton')"
                        shape="button"
                        variant="outlined"
                        :iconDisplayed="true"
                        icon="arrow-left-small"
                        iconPosition="left"
                    />
                </div>
                <div>
                    <v-text-field
                        v-model.trim="orderReference"
                        label="Vos références"
                        outlined
                        hide-details
                        dense
                        height="42"
                    />
                </div>
                <div class="d-flex justify-content-between align-items-center font-700 size-16 text-black">
                    <span class="mr-4 lh-1">{{ $t('cart.total') }} :</span>
                    <span class="lh-1" v-html="totalAmountOfCart" />
                </div>
                <DjButton
                    :text="$t('cart.ProceedToCheckoutButton')"
                    shape="button"
                    variant="contained"
                    :iconDisplayed="true"
                    icon="arrow-right-2-small"
                    iconPosition="right"
                    :isDisabled="cartItems.length === 0"
                    @click.native="handleToBilling"
                />
            </div>
            <div class="py-1 pointer text-center" style="width: 200px" @click="clearBasket()">
                <SvgIcon name="trash" class="relative-top" />
                <span class="text-grey-6 font-500 underline">{{ $t('header.miniCart.clearBasket') }}</span>
            </div>
        </div>
        <div class="hidden-on-desktop">
            <div class="d-flex justify-content-between align-items-center my-4">
                <div>
                    <v-text-field
                        v-model.trim="orderReference"
                        label="Vos références"
                        outlined
                        hide-details
                        dense
                        height="42"
                    />
                </div>
                <div class="d-flex justify-content-between align-items-center font-700 size-16 text-black">
                    <span class="mr-4 lh-1">{{ $t('cart.total') }} :</span>
                    <span class="lh-1" v-html="totalAmountOfCart" />
                </div>
            </div>
            <DjButton
                :text="$t('cart.ProceedToCheckoutButton')"
                shape="button"
                variant="contained"
                :iconDisplayed="true"
                icon="arrow-right-2-small"
                iconPosition="right"
                :isDisabled="cartItems.length === 0"
                :fullWidth="true"
                class="mb-4"
                @click.native="handleToBilling"
            />
            <DjButton
                :text="$t('cart.backToShopButton')"
                shape="button"
                variant="outlined"
                :iconDisplayed="true"
                icon="arrow-left-small"
                iconPosition="left"
                :fullWidth="true"
                class="mb-4"
                @click.native="handleBackToShop"
            />
            <DjButton
                :text="$t('header.miniCart.clearBasket')"
                shape="button"
                variant="outlined"
                :iconDisplayed="true"
                icon="trash"
                iconPosition="left"
                :fullWidth="true"
                class="mb-6"
                @click.native="clearBasket"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TableShoppingCart from '@modules/checkout/components/modules/TableShoppingCart.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'ShoppingCart',
    components: {
        TableShoppingCart,
        DjButton,
        DjSteps,
        SvgIcon,
    },
    data() {
        return {
            isDesktop: window.innerWidth > 960,
            orderReference: '',
            cartItems: [],
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
            return this.$purjus.utils.formatPrice(this.cart.totalPrice.priceWithoutTax, this.currency);
        },
        cartItemsBySuppliers() {
            return this.$core.getCart.getCartItemsBySuppliers(this.cartItems);
        },
        suppliersList() {
            return this.$core.getCart.getSuppliersList(this.cartItems);
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
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });

        if (this.cart) {
            this.updateLines();
        }
        await this.$purjus.abc.useAbcDeliveryFeesHelper.cleanupFDLIfNeeded(this.$route.name);
        sessionStorage.removeItem('orderReference');
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        updateLines() {
            this.cartItems = this.cartDetails?.cartLines.filter((item) => item.productVariant.id !== 'FDL') ?? [];
        },
        handleToBilling() {
            sessionStorage.setItem('orderReference', this.orderReference);
            this.$router.push(this.localePath('/checkout/billing'));
        },
        handleBackToShop() {
            this.$router.push(this.localePath('/'));
        },
        async clearBasket() {
            if (this.cartItems.length === 0) {
                return;
            }
            await this.$purjus.useCartv2.deleteLines(
                this.cart.id,
                this.cartItems.map((item) => item.offer.offerPriceId),
            );
            this.$toast.success(this.$t('header.miniCart.clearSucessful'));
            this.cartItems = 0;
            this.$store.commit('purjus/cartv2/clearCartDetails');
        },
        onResize() {
            this.isDesktop = window.innerWidth > 960;
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-shipping-layout {
    width: 100%;
    background: #ffffff;
    margin-left: auto;
    margin-right: auto;
    padding-top: 24px;
    padding-bottom: 24px;
    @media (min-width: 640px) {
        padding-left: 24px;
        padding-right: 24px;
    }
    @media (min-width: 1024px) {
        padding-left: 48px;
        padding-right: 48px;
    }
    .column {
        @media (max-width: 740px) {
            flex-direction: column;
        }
    }
}
</style>
