<template>
    <div>
        <div @click.prevent="handleAddToCart">
            <DjButton
                :text="textButton || $t('product.buttonAddToCart.button')"
                :iconDisplayed="iconDisplayed"
                :isDisabled="isDisabled"
                :styleButton="styleButton"
                :shape="styleB"
                :iconColor="iconColor"
                :textDisplayed="textDisplayed"
                icon="icon-cart"
                :size="size"
                :fullWidth="fullWidth"
                :isLoading="isLoading"
                :color="colorButton"
            />
        </div>
        <DjModal v-model="isProductToCart" width="500">
            <DjCard :withActions="true">
                <div class="pa-2">
                    <p v-if="products.length > 1">{{ $t('product.buttonAddAllToCart.confirmMessage') }}</p>
                    <p v-else>{{ $t('product.buttonAddToCart.confirmMessage') }}</p>
                </div>
                <template #actions>
                    <DjSpacer />
                    <DjLink
                        class="dj-btn dj-btn--primary"
                        to="/checkout/shopping-cart"
                        @click="isProductToCart = false"
                    >
                        <i class="icon-cart mr-2" />
                        {{ $t('product.buttonAddAllToCart.confirmButtonView') }}
                    </DjLink>
                    <DjLink class="dj-btn dj-btn--primary ml-3" @click="isProductToCart = false">
                        {{ $t('product.buttonAddAllToCart.confirmButtonContinue') }}
                    </DjLink>
                </template>
            </DjCard>
        </DjModal>
    </div>
</template>

<script>
import { defineComponent, ref, useContext, useRouter, computed } from '@nuxtjs/composition-api';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';

export default defineComponent({
    name: 'DjButtonAddToCart',
    components: {
        DjModal,
        DjCard,
        DjButton,
        DjLink,
        DjSpacer,
    },
    props: {
        colorButton: {
            type: String,
            default: '',
        },
        styleB: {
            type: String,
            require: true,
            default: 'button',
        },
        size: {
            type: String,
            default: 'standard',
        },
        products: {
            type: Array,
            require: true,
            default: () => [],
        },
        styleButton: {
            type: String,
            default: 'primary',
        },
        quantity: {
            type: Number,
            require: true,
            default: 1,
        },
        offerInventory: {
            type: Object,
            default: null,
        },
        productSupplier: {
            type: String,
            require: true,
        },
        productPicture: {
            type: Object,
        },
        offerId: {
            type: String,
            require: true,
            default: null,
        },
        displayReturn: {
            type: Boolean,
            default: false,
        },
        textDisplayed: {
            type: Boolean,
            default: true,
        },
        iconDisplayed: {
            type: Boolean,
            default: true,
        },
        iconColor: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        textButton: {
            type: String,
            default: '',
        },
        quantityInStock: {
            type: Number,
            default: 10000000,
        },
        minOrderQuantity: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const ctx = useContext();
        const router = useRouter();

        const isProductToCart = ref(false);
        const isLoading = ref(false);
        const addressList = computed(() => ctx.store.state.user.addressShippingList);

        async function handleAddToCart() {
            try {
                if (props.isDisabled || isLoading.value) {
                    return;
                }
                if (ctx.$auth.loggedIn) {
                    // MultiProducts
                    if (props.products.length > 0) {
                        let item = await multiProducts(props.products);
                        if (item.length > 0) {
                            await readyToUpdateCart(item);
                        } else {
                            isLoading.value = false;
                        }
                        this.nuxt.$emit('loading', false);
                    }
                    // OnceProduct
                    else {
                        const item = oneProduct();
                        if (item) {
                            await readyToUpdateCart(item);
                        } else {
                            isLoading.value = false;
                        }
                        this.nuxt.$emit('loading', false);
                    }
                } else {
                    router.push(ctx.localePath('/auth/login'));
                    isLoading.value = false;
                }
            } catch (error) {}
        }

        // Function for handleAddToCart
        async function multiProducts(products) {
            let item = [];
            if (addressList.value.length === 0) {
                ctx.$toast.error('Faut avoir au moins une adresse de livraison ');
                return;
            }
            if (products.length > 0) {
                products.forEach((product) => {
                    const checkMinOrder = product.minOrder <= product.quantity;
                    const checkStock = product.quantity <= product.stock;

                    if (!checkMinOrder) {
                        ctx.$toast.error(ctx.app.i18n.t('notification.product.quantityError'));
                    } else if (!checkStock) {
                        ctx.$toast.error(ctx.app.i18n.t('notification.product.stockError'));
                    } else if (!ctx.store.state.user.addressShippingList) {
                        ctx.$toast.error('Faut avoir au moins une adresse de livraison ');
                    } else {
                        item.push({
                            offerPriceId: product.offerId,
                            quantity: product.quantity,
                            deliveryLines: [
                                {
                                    id: null,
                                    quantity: product.quantity,
                                    addressId: ctx.$core.getAddress.getDefaultAddrressId(
                                        ctx.store.state.user.addressShippingList
                                    ),
                                },
                            ],
                        });
                    }
                });
            }

            return item;
        }

        function oneProduct() {
            if (props.offerInventory?.status === 'INACTIVE') {
                ctx.$toast.error(ctx.app.i18n.t('notification.product.status'));
                return;
            }

            if (addressList.value.length === 0) {
                ctx.$toast.error(
                    'Une adresse de livraison est nécessaire pour poursuivre vos achats. Veuillez l’ajouter dans votre espace mon compte'
                );
                return;
            }

            if (ctx.$config.checkStock) {
                if (!props.quantity || props.quantity <= 0) {
                    ctx.$toast.error(ctx.app.i18n.t('notification.product.quantityError'));
                    return;
                } else if (props.quantity > props.quantityInStock) {
                    ctx.$toast.error(ctx.app.i18n.t('notification.product.stockError'));
                    return;
                } else if (props.quantity < props.minOrderQuantity) {
                    ctx.$toast.warning(
                        ctx.app.i18n.t('notification.product.minOrderQuantity', {
                            minOrderQuantity: props.minOrderQuantity,
                        })
                    );
                    return;
                }
            }

            if (!props.offerId) {
                isLoading.value = true;
                return;
            }

            const argForReadyToUpdateCart = [
                {
                    offerPriceId: props.offerId,
                    quantity: props.quantity,
                    deliveryLines: [
                        {
                            id: null,
                            quantity: props.quantity,
                            addressId: ctx.$core.getAddress.getDefaultAddrressId(
                                ctx.store.state.user.addressShippingList
                            ),
                        },
                    ],
                },
            ];
            isLoading.value = true;
            return argForReadyToUpdateCart;
        }

        async function readyToUpdateCart(item) {
            try {
                const success = await ctx.$core.useCart.updateCartLines(item);
                if (success.value) {
                    isLoading.value = false;
                    if (props.displayReturn) {
                        isProductToCart.value = true;
                    }
                    ctx.$toast.success(ctx.app.i18n.t('notification.product.success'));
                    setTimeout(
                        function () {
                            isProductToCart.value = false;
                        }.bind(ctx),
                        1000
                    );
                } else {
                    isLoading.value = false;
                    ctx.$toast.error(ctx.app.i18n.t('notification.product.stockError'));
                }
            } catch (error) {}
        }

        /**
         * Expose
         */
        return {
            isProductToCart,
            isLoading,
            handleAddToCart,
        };
    },
});
</script>

<style>
.tdWidth {
    width: 230px;
}
</style>
