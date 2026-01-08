import type { Context } from '@nuxt/types';
import type { ActionContext } from 'vuex';
import RootState from '~/store/app/state';
import CartState from '~/store/purjus/cartv2/state';

enum CartStatus {
    INIT = 'INIT',
    LOADING = 'LOADING',
    ON_GOING = 'ON_GOING',
    COMPLETED = 'COMPLETED',
}

const actions = {
    async retrieveCarts(context: ActionContext<ReturnType<typeof CartState>, ReturnType<typeof RootState>>) {
        const appContext = this as unknown as Context;
        const cartsResponse = await appContext.$purjus.useCartv2.getCarts(
            {
                status: [CartStatus.INIT, CartStatus.LOADING, CartStatus.ON_GOING],
            },
            {
                size: 200,
            },
        );
        context.commit('clearCarts');
        context.commit('addCarts', { carts: cartsResponse.carts });
    },
};

export default actions;
