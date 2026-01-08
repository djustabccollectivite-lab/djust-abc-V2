import type { Context } from '@nuxt/types';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { AxiosInstance } from 'axios';
import type { Product552Response, Product552Data } from '~/purjus/interfaces/common/searchv2';
export default (context: Context) => ({
    async product552(params: Product552Data): Promise<Product552Response> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const headers: Record<string, string> = {
            'customer-account-id': context.store.state.app.account,
            'dj-store': context.$config.storeId,
            'dj-store-view': context.$config.storeIdViewId,
        };

        const token = (context.$auth.strategy as RefreshableScheme).token.get();
        if (typeof token === 'string') {
            headers.Authorization = token;
        }

        const response = await client.get<Product552Response>('/v2/shop/search', {
            headers,
            params: params.query,
        });
        return response.data;
    },
});
