<template>
    <table v-if="isDesktop" class="w-full mt-10 mb-16 cart-table">
        <thead>
            <tr>
                <th class="font-700 size-16 text-black uppercase p-4">
                    {{ $t('cart.table.product') }}
                </th>
                <th class="font-700 size-16 text-black text-center uppercase p-4">{{ $t('cart.table.price') }}</th>
                <th class="font-700 size-16 text-black text-center uppercase p-4">{{ $t('cart.table.quantity') }}</th>
                <th class="font-700 size-16 text-black text-center uppercase p-4">{{ $t('cart.table.total') }}</th>
                <th class="font-700 size-16 text-black text-center uppercase p-4">{{ $t('cart.table.action') }}</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(cartLine, index) in cartLines">
                <TableShoppingCartItem
                    :key="index"
                    :cartLine="cartLine"
                    :isDesktop="isDesktop"
                    @refreshLines="refreshLines"
                />
            </template>
        </tbody>
    </table>
    <div v-else>
        <div v-for="(cartLine, index) in cartLines" :key="index">
            <TableShoppingCartItem :cartLine="cartLine" :isDesktop="isDesktop" @refreshLines="refreshLines" />
        </div>
    </div>
</template>

<script>
import TableShoppingCartItem from '@modules/checkout/components/modules/TableShoppingCartItem.vue';

export default {
    name: 'TableShoppingCart',
    components: { TableShoppingCartItem },
    props: {
        cartLines: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    emits: ['refreshLines'],
    data() {
        return {
            isDesktop: window.innerWidth > 960,
        };
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        handleRemoveProductFromCart(product) {
            this.$core.useCart.removeProductFromCart({ offerPriceId: product.offerPriceId });
        },
        onResize() {
            this.isDesktop = window.innerWidth > 960;
        },
        refreshLines(values) {
            this.$emit('refreshLines', values);
        },
    },
};
</script>

<style lang="scss" scoped>
.cart-table {
    border-spacing: 0 8px;
    border-collapse: separate;
}
</style>
