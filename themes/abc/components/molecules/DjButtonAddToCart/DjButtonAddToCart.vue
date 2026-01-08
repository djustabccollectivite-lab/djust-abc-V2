<template>
    <div :class="['bg-white', fullWidth ? 'w-full' : '']">
        <div @click.prevent="handleAddToCart">
            <DjButton
                :text="$t('product.buttonAddToCart.button')"
                :iconDisplayed="true"
                :isDisabled="isDisabled"
                :variant="variant"
                :shape="shape"
                :textDisplayed="shape === 'button'"
                :icon="shape === 'icon' ? 'cart-big' : 'cart-small'"
                :fullWidth="fullWidth"
                :isLoading="isLoading"
            />
        </div>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'DjButtonAddToCart',
    components: { DjButton },
    props: {
        quantity: {
            type: Number,
            required: false,
            default: 1,
        },
        offerId: {
            type: String,
            required: false,
            default: null,
        },
        products: {
            type: Array,
            required: false,
            default: () => [],
        },
        quantityInStock: {
            type: Number,
            required: false,
            default: 10000000,
        },
        minOrderQuantity: {
            type: Number,
            required: false,
            default: 0,
        },
        shape: {
            type: String,
            required: true,
            default: 'button',
        },
        variant: {
            type: String,
            required: false,
            default: 'contained',
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isLoading: false,
        };
    },
    computed: {
        ...mapGetters('purjus/cartv2', {
            cart: 'monoCart',
        }),
    },
    methods: {
        async handleAddToCart() {
            if (this.isDisabled) {
                this.$toast.error(this.$i18n.t('notification.product.onQuoteOnly'));
                return;
            }

            if (this.quantity < this.minOrderQuantity) {
                this.$toast.error(
                    this.$i18n.t('notification.product.minOrderQuantity', { minOrderQuantity: this.minOrderQuantity }),
                );
                return;
            }

            if (this.$auth.loggedIn) {
                this.isLoading = true;
                const cartId = this.cart.id;
                try {
                    if (this.offerId) {
                        await this.$purjus.useCartv2.modifyLines(cartId, [
                            {
                                offerPriceId: this.offerId,
                                quantity: this.quantity,
                                updateAction: 'ADD_QUANTITY',
                            },
                        ]);
                        this.$toast.success(this.$i18n.t('notification.product.success'), { duration: 200 });
                        await this.$purjus.useCartv2.getLines(cartId);
                    } else if (this.products) {
                        // Filtrer avant les produits sur devis (ne doivent pas pouvoir être ajouté dans le panier)
                        const filteredProducts = this.products.filter((product) => {
                            const onQuote = this.$purjus.utils.extractOfferCustomFieldValue(product, 'devis');
                            return onQuote[0] === 'FALSE';
                        });
                        const rejectedProducts = this.products.filter((product) => {
                            const onQuote = this.$purjus.utils.extractOfferCustomFieldValue(product, 'devis');
                            return onQuote[0] === 'TRUE';
                        });
                        if (rejectedProducts.length > 0) {
                            this.$toast.error(this.$i18n.tc('notification.product.rejected', rejectedProducts.length));
                        }
                        const productsToAdd = filteredProducts.map((product) => {
                            return {
                                offerPriceId: product.offerInventory.variant.externalId,
                                quantity: product.quantity,
                                updateAction: 'ADD_QUANTITY',
                            };
                        });
                        await this.$purjus.useCartv2.modifyLines(cartId, productsToAdd);
                        this.$toast.success(this.$i18n.t('notification.product.successMultipleProducts'), {
                            duration: 200,
                        });
                    } else {
                        this.$toast.error(this.$i18n.t('notification.product.stockError'));
                        return;
                    }
                    this.$store.dispatch('purjus/cartv2/retrieveCarts');
                } catch (error) {
                    this.$toast.error(this.$i18n.t('notification.product.stockError'));
                }
            } else {
                // Sauvegarder l'URL actuelle pour redirection après connexion
                const currentUrl = this.$route.fullPath;
                this.$router.push({
                    path: this.localePath('/auth/login'),
                    query: { redirect: currentUrl },
                });
            }
            this.isLoading = false;
        },
    },
};
</script>
