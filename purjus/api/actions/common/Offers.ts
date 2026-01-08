import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import type { RefreshableScheme } from '@nuxtjs/auth-next';
import type { OfferResponse } from '~/purjus/interfaces/djustInterfaces';
import type { GetOffersListResponse } from '~/core/api/OfferService';

type GetOfferListParams = {
    productStatus?: 'NEW' | 'ACTIVE' | 'INACTIVE';
    offerInventoryStatus?: 'ACTIVE' | 'INACTIVE';
    variantStatus?: 'NEW' | 'ACTIVE' | 'INACTIVE';
    offerPriceStatus?: 'ACTIVE' | 'INACTIVE';
    supplierId?: string;
    offerIds?: string[];
    offerPriceIds?: string[];
    currency?: string;
    page?: number;
    size?: number;
    sort?: string;
    hasStock?: 'TRUE' | 'FALSE';
    idType?: ' DJUST_ID' | 'EXTERNAL_ID';
};

export default (context: Context) => ({
    async getOffersByProductId(id: string, params: Object): Promise<OfferResponse[]> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<OfferResponse[]>(`/v1/shop/products/${id}/offers`, {
            headers: {
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
            },
            params: {
                currency: context.store.state.app.currency,
                locale: context.i18n.locale,
                productIdentifier: 'SKU',
                ...params,
            },
        });
        return response.data;
    },

    async getOfferList(params: GetOfferListParams): Promise<GetOffersListResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<GetOffersListResponse>('/v1/shop/offer-inventories', {
            headers: {
                'dj-store': context.$config.storeId,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
            },
            params: {
                currency: context.store.state.app.currency,
                locale: context.i18n.locale,
                ...params,
            },
        });
        return response.data;
    },
});
