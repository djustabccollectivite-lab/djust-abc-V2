import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { Supplier } from '../../../interfaces/djustInterfaces';

export default (context: Context) => ({
     async updateOrderCustomField(orderLogisticId: string, parameters: {
        customFieldId: string,
        customFieldValue: number,
    }[]): Promise<Supplier> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.patch<Supplier>(`/v1/shop/logistic-orders/${orderLogisticId}`, parameters, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
            });
            return response.data;
        } catch (error: any) {
            console.error(error);
            if ('ECONNREFUSED' === error.code) {
                throw new Error('Connection refused');
            }
            throw new Error('API Error');
        }
    },

    async updateOrderLineCustomField(
        orderLogisticId: string,
        orderLogisticLineId: string,
        parameters: {
            customFieldId: string;
            customFieldValue: number;
        }[],
    ): Promise<Supplier> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.patch<Supplier>(
                `/v1/shop/logistic-orders/${orderLogisticId}/lines/${orderLogisticLineId}`,
                parameters,
                {
                    headers: {
                        Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            console.error(error);
            if ('ECONNREFUSED' === error.code) {
                throw new Error('Connection refused');
            }
            throw new Error('API Error');
        }
    },
});
