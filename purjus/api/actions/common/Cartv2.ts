import type { Context } from '@nuxt/types';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { AxiosInstance } from 'axios';
import { ConnexionError } from '../../exeptions/ConnexionError';
import type { Cart, CartLinesResponse, CartListResponse, CartResponse } from '../../../interfaces/common/cartv2';

export type Line = {
    offerPriceId: string;
    quantity: number;
    updateAction: 'ADD_QUANTITY' | 'REMOVE_QUANTITY' | 'REPLACE_QUANTITY';
};
type LineByVariant = Omit<Line, 'offerPriceId'> & { productVariantId: string };

export default (context: Context) => ({
    async createCart(cartName: string): Promise<Cart> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.post<Cart>(
                `/v2/shop/carts`,
                {
                    name: cartName,
                },
                {
                    headers: {
                        'customer-account-id': context.store.state.app.account,
                        Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                        'dj-store': context.$config.storeId,
                        'dj-store-view': context.$config.storeIdViewId,
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },
    async modifyLines(cartId: string, lines: Line[]): Promise<void> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.put<void>(`/v2/shop/carts/${cartId}/lines`, lines, {
                headers: {
                    'customer-account-id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
            });
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },

    async modifyLinesByVariantExternalId(cartId: string, lines: LineByVariant[]): Promise<void> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.put<void>(`/v2/shop/carts/${cartId}/lines-by-variant`, lines, {
                headers: {
                    'customer-account-id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
            });
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },

    async initOrder(cartId: string): Promise<string> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.post<string>(
                `/v2/shop/carts/${cartId}/initialize-orders`,
                {},
                {
                    headers: {
                        'customer-account-id': context.store.state.app.account,
                        Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                        'dj-store': context.$config.storeId,
                        'dj-store-view': context.$config.storeIdViewId,
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },

    async deleteCart(cartId: string): Promise<void> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.delete<void>(`/v2/shop/carts/${cartId}`, {
                headers: {
                    'customer-account-id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
            });
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },

    async getCarts(
        params: Record<string, unknown> = {},
        pageable: Record<string, unknown> = {},
    ): Promise<CartListResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<CartListResponse>(`/v2/shop/carts`, {
                headers: {
                    'customer-account-id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
                params: {
                    currency: 'EUR',
                    ...pageable,
                    ...params,
                },
            });
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },

    async getCart(cartId: string): Promise<CartResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<CartResponse>(`/v2/shop/carts/${cartId}`, {
                headers: {
                    'customer-account-id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
                params: {
                    currency: 'EUR',
                },
            });
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },

    async getLines(cartId: string, params: Record<string, string | number> = {}): Promise<CartLinesResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<CartLinesResponse>(`/v2/shop/carts/${cartId}/lines`, {
                headers: {
                    'customer-account-id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
                params: {
                    currency: 'EUR',
                    pageable: {},
                    ...params,
                },
            });
            context.store.commit('purjus/cartv2/setCartDetails', { cartDetails: { ...response.data } });
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },
    async deleteLines(cartId: string, offerPriceIds: string[]): Promise<void> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const data = offerPriceIds.map((offerPriceId) => ({ offerPriceId }));
        try {
            const response = await client.delete<void>(`/v2/shop/carts/${cartId}/lines`, {
                headers: {
                    'customer-account-id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
                data,
            });
            return response.data;
        } catch (error: any) {
            // console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw error;
        }
    },
});
