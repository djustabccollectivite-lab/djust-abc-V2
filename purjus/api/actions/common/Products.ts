import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import { ConnexionError } from '../../exeptions/ConnexionError';
import { ApiError } from '../../exeptions/ApiError';
import * as ResponseTypeProduct from '~/core/interfaces/Product/IResponseProduct';

export default (context: Context) => ({
    async getProductsBySkus(skus: string[]): Promise<ResponseTypeProduct.RelatedProductResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const params = {
            skus: skus.join(','),
            locale: context.i18n.localeProperties.code.toUpperCase(),
            currency: context.store.state.app.currency,
        };
        try {
            const response = await client.get<ResponseTypeProduct.RelatedProductResponse>(`/v1/shop/list`, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
                params,
            });
            return response.data;
        } catch (error: any) {
            console.error(error);
            if ('ECONNREFUSED' === error.code) {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
});
