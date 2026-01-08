<template>
    <div>
        <div v-if="offerId || products.length > 0" @click.prevent="handleAddToCart">
            <DjButton
                :text="textButton ? textButton : $t('product.buttonAddToCart.button')"
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
            />
        </div>
        <DjModal v-model="productToCart" width="500">
            <DjCard :withActions="true">
                <div class="pa-2">
                    <p v-if="products.length > 1">{{ $t('product.buttonAddAllToCart.confirmMessage') }}</p>
                    <p v-else>{{ $t('product.buttonAddToCart.confirmMessage') }}</p>
                </div>
                <template #actions>
                    <DjSpacer></DjSpacer>
                    <DjLink class="dj-btn dj-btn--primary" to="/checkout/shopping-cart" @click="productToCart = false">
                        <i class="icon-cart mr-2"></i>
                        {{ $t('product.buttonAddAllToCart.confirmButtonView') }}
                    </DjLink>
                    <DjLink class="dj-btn dj-btn--primary ml-3" @click="productToCart = false">
                        {{ $t('product.buttonAddAllToCart.confirmButtonContinue') }}
                    </DjLink>
                </template>
            </DjCard>
        </DjModal>
    </div>
</template>

<script>
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';
export default defineComponent({
    name: 'DjButtonAddToCartV2',
    components: { DjButton, DjCard, DjModal, DjSpacer, DjLink },
    props: {
        styleB: {
            type: String,
            required: false,
            default: 'button',
        },
        size: {
            type: String,
            required: false,
            default: 'standard',
        },
        products: {
            type: Array,
            required: false,
            default: () => [],
        },
        styleButton: {
            type: String,
            required: false,
            default: 'primary',
        },
        quantity: {
            type: Number,
            required: false,
            default: 1,
        },
        productName: {
            type: String,
            required: false,
            default: 'produit',
        },
        productSupplier: {
            type: String,
            required: false,
        },
        productPicture: {
            type: Object,
            required: false,
        },
        offerId: {
            type: String,
            required: false,
            default: null,
        },
        displayReturn: {
            type: Boolean,
            required: false,
            default: false,
        },
        textDisplayed: {
            type: Boolean,
            required: false,
            default: true,
        },
        iconDisplayed: {
            type: Boolean,
            required: false,
            default: true,
        },
        iconColor: {
            type: Boolean,
            required: false,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        textButton: {
            type: String,
            required: false,
            default: '',
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
    },
    setup(props, { emit }) {
        const productToCart = ref(false);
        const isLoading = ref(false);
        const products_ = ref(props.products);
        const ctx = useContext();
        const router = useRouter();
        async function handleAddToCart() {
            if (props.isDisabled) return;
            if (ctx.$auth.loggedIn) {
                // MultiProducts
                if (props.products.length > 0) {
                    const item = await multiProducts(props.products);
                    if (item.length > 0) {
                        await readyToUpdateCart(item);
                    } else {
                        isLoading.value = false;
                    }
                }
                // OnceProduct
                else {
                    const item = await oneProduct();
                    if (item) {
                        await readyToUpdateCart(item);
                    } else {
                        isLoading.value = false;
                    }
                }
            } else {
                router.push('/auth/login');
                isLoading.value = false;
            }
        }
        // Function for handleAddToCart
        function multiProducts(products) {
            const item = [];
            if (products.length > 0) {
                products.forEach((product) => {
                    item.push({
                        offerPriceId: product.offerId,
                        quantity: product.quantity,
                        updateAction: 'ADD_QUANTITY',
                    });
                });
            }
            return item;
        }
        function oneProduct() {
            let item = null;
            const checkQteIsOk = ctx.$config.checkStock ? !(props.quantity <= 0 || !props.quantity) : true;
            const checkStockControlIsOk = ctx.$config.checkStock
                ? !(props.quantity > props.quantityInStock || props.quantity < props.minOrderQuantity)
                : true;
            if (!checkQteIsOk) {
                ctx.$toast.error(ctx.app.i18n.t('notification.product.quantityError'));
            } else if (!checkStockControlIsOk) {
                ctx.$toast.error(ctx.app.i18n.t('notification.product.stockError'));
            } else {
                if (props.offerId) {
                    item = [
                        {
                            offerPriceId: props.offerId,
                            quantity: props.quantity,
                            updateAction: 'ADD_QUANTITY',
                        },
                    ];
                }
                isLoading.value = true;
                return item;
            }
        }
        async function readyToUpdateCart(item) {
            const success = await ctx.$core.useCartB2B.updateCartLines_B2B(item);
            if (success) {
                isLoading.value = false;
                if (props.displayReturn) {
                    productToCart.value = true;
                }
                const messageKey =
                    item.length > 1 ? 'notification.product.multipleSuccess' : 'notification.product.success';
                ctx.$toast.success(ctx.app.i18n.t(messageKey), { duration: 200 });
                setTimeout(function () {
                    productToCart.value = false;
                }, 200);
                emit('added');
            } else {
                isLoading.value = false;
                ctx.$toast.error(ctx.app.i18n.t('notification.product.stockError'));
            }
        }
        return { productToCart, handleAddToCart, products_, isLoading };
    },
});
</script>
