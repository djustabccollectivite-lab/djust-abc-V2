<template>
    <div>
        <div @click.prevent="handleAcceptQuote" v-if="$core.usePayement.IsActive() || $core.useShop.IsActive()">
            <button-ui
                :text="$t('account.quotes.acceptthisquote')"
                styleButton="primary"
                :shape="styleB"
                :size="size"
            />
        </div>
        <div @click.prevent="dialog = true" v-else>
            <button-ui
                :text="$t('account.quotes.acceptthisquote')"
                styleButton="primary"
                :shape="styleB"
                :size="size"
            />
        </div>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    {{ $t('shipping.confirmCommand') }}
                </v-card-title>
                <div class="pa-2">
                    <p>
                        {{ $t('cart.confirmCommand') }}
                    </p>
                </div>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <a @click="handleAcceptQuote()">
                        <DjButton
                            :text="$t('checkout.orderValidation.confirmed')"
                            :fullWidth="true"
                            styleButton="primary"
                        />
                    </a>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api';
import ButtonUi from '@components/atoms/DjButton/DjButton.vue';
import PaymentQuote from '@modules/quote/components/PayementQuote';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default defineComponent({
    name: 'ButtonAcceptQuote',
    components: { ButtonUi, PaymentQuote, DjButton },
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
        quantity: {
            type: Number,
            require: true,
            default: 1,
        },
        supplier: {
            type: Object,
            require: true,
            default: null,
        },
        quoteId: {
            type: String,
            require: true,
        },
    },
    setup(props) {
        const productToCart = ref(false);
        var supp = ref(false);
        var dialog = ref(false);
        const router = useRouter();
        const ctx = useContext();
        async function handleAcceptQuote() {
            ctx.store.commit('quote/setQuoteToOrder', true);
            if (ctx.$core.usePayement.IsActive() && ctx.$core.useShop.IsActive()) {
                ctx.store.commit('quote/setSelectedQuote', props.supplier);
                router.push({
                    path: ctx.localePath('/checkout/payment'),
                    query: {
                        origin: 'SUPPLIER_QUOTE',
                        supplier: props.supplier,
                        quoteId: props.quoteId,
                    },
                });
            } else if (ctx.$core.useShop.IsActive()) {
                let origin = 'SUPPLIER_QUOTE';
                let originId = props.quoteId;
                const submit = await ctx.$core.useCart.createOrder(origin, originId);
                if (submit) {
                    router.push(ctx.localePath('/checkout/order-validation'));
                    ctx.$toast.success(ctx.app.i18n.t('notification.quote.success'));
                } else if (submit === 'echec') {
                    ctx.$toast.error(ctx.app.i18n.t('notification.order.error'));
                } else {
                    ctx.$toast.error(ctx.app.i18n.t('notification.order.error'));
                }
            } else {
                let origin = 'SUPPLIER_QUOTE';
                let originId = props.quoteId;
                const submit = await ctx.$core.useCart.createOrder(origin, originId);
                if (submit) {
                    router.push(ctx.localePath('/checkout/order-validation'));
                    ctx.$toast.success(ctx.app.i18n.t('notification.quote.success'));
                } else if (submit === 'echec') {
                    ctx.$toast.error(ctx.app.i18n.t('notification.order.error'));
                } else {
                    ctx.$toast.error(ctx.app.i18n.t('notification.order.error'));
                }
            }
        }

        return { productToCart, supp, dialog, handleAcceptQuote };
    },
});
</script>
