<template>
    <div>
        <div v-if="supplier" class="title-supplier">
            {{ $t('cart.supplier') }} : <span class="name">{{ supplier }}</span>
        </div>
        <table class="table dj-table--responsive dj-table--shopping-cart">
            <thead>
                <tr>
                    <th>{{ $t('cart.table.product') }}</th>
                    <th>{{ $t('cart.table.price') }}</th>
                    <th>{{ $t('cart.table.quantity') }}</th>
                    <th>{{ $t('cart.table.total') }}</th>
                    <th>{{ $t('cart.table.action') }}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(cartLine, index) in cartLines">
                    <TableShoppingCartItem v-if="cartLine" :cartLine="cartLine" :key="index" />
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import TableShoppingCartItem from '@modules/checkout/components/modules/TableShoppingCartItem.vue';

export default {
    name: 'TableShoppingCart',
    components: { TableShoppingCartItem },
    props: {
        cartLines: {
            type: Array,
            require: false,
            default: () => [],
        },
        supplier: {
            type: String,
            require: false,
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
    },
    methods: {
        handleRemoveProductFromCart(product) {
            this.$core.useCart.removeProductFromCart({ offerPriceId: product.offerPriceId });
        },
    },
};
</script>
