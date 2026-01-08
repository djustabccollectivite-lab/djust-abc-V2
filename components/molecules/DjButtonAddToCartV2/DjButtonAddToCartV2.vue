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
import { defineComponent, ref, useContext, useRouter, useStore } from '@nuxtjs/composition-api';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';
export default defineComponent({
    name: 'DjButtonAddToCartV2',
    components: { DjButton, DjCard, DjModal, DjSpacer, DjLink, DjIcon },
    props: {
        styleB: {
            type: String,
            require: true,
            default: 'button',
        },
        size: {
            type: String,
            require: false,
            default: 'standard',
        },
        products: {
            type: Array,
            require: true,
            default: () => [],
        },
        styleButton: {
            type: String,
            require: false,
            default: 'primary',
        },
        quantity: {
            type: Number,
            require: true,
            default: 1,
        },
        productName: {
            type: String,
            require: true,
            default: 'produit',
        },
        productSupplier: {
            type: String,
            require: true,
        },
        productPicture: {
            type: Object,
            require: false,
        },
        offerId: {
            type: String,
            require: true,
            default: null,
        },
        displayReturn: {
            type: Boolean,
            require: false,
            default: false,
        },
        textDisplayed: {
            type: Boolean,
            require: false,
            default: true,
        },
        iconDisplayed: {
            type: Boolean,
            require: false,
            default: true,
        },
        iconColor: {
            type: Boolean,
            require: false,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            require: false,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        textButton: {
            type: String,
            require: false,
            default: '',
        },
        quantityInStock: {
            type: Number,
            require: false,
            default: 10000000,
        },
        minOrderQuantity: {
            type: Number,
            require: false,
            default: 0,
        },
    },
    setup(props) {
        const productToCart = ref(false);
        const isLoading = ref(false);
        const offerId = ref(props.offerId);
        const products_ = ref(props.products);
        const ctx = useContext();
        const router = useRouter();
        async function handleAddToCart() {
            if (props.isDisabled) return;
            if (ctx.$auth.loggedIn) {
                // MultiProducts
                if (props.products.length > 0) {
                    let item = await multiProducts(props.products);
                    if (item.length > 0) {
                        await readyToUpdateCart(item);
                    } else {
                        isLoading.value = false;
                    }
                }
                // OnceProduct
                else {
                    let item = await oneProduct();
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
        async function multiProducts(products) {
            let item = [];
            products.length > 0
                ? products.forEach((product) => {
                      item.push({
                          offerPriceId: product.offerPriceId,
                          quantity: product.quantity,
                          updateAction: 'ADD_QUANTITY',
                      });
                  })
                : null;
            return item;
        }
        async function oneProduct() {
            let item = null;
            const checkQteIsOk = ctx.$config.checkStock
                ? props.quantity <= 0 || !props.quantity
                    ? false
                    : true
                : true;
            const checkStockControlIsOk = ctx.$config.checkStock
                ? props.quantity > props.quantityInStock || props.quantity < props.minOrderQuantity
                    ? false
                    : true
                : true;
            if (!checkQteIsOk) {
                ctx.$toast.error(ctx.app.i18n.t('notification.product.quantityError'));
            } else if (!checkStockControlIsOk) {
                ctx.$toast.error(ctx.app.i18n.t('notification.product.stockError'));
            } else {
                props.offerId
                    ? (item = [
                          {
                              offerPriceId: props.offerId,
                              quantity: props.quantity,
                              updateAction: 'ADD_QUANTITY',
                          },
                      ])
                    : null;
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
                ctx.$toast.success(ctx.app.i18n.t('notification.product.success'), { duration: 200 });
                setTimeout(
                    function () {
                        productToCart.value = false;
                    }.bind(ctx),
                    200
                );
            } else {
                isLoading.value = false;
                ctx.$toast.error(ctx.app.i18n.t('notification.product.stockError'));
            }
        }
        return { productToCart, handleAddToCart, products_, isLoading, offerId };
    },
});
</script>
