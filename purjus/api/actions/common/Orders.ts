import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { Order } from '~/core/interfaces/Order/IOrderResponse';
import type { LogisticOrderLinesResponse } from '~/purjus/interfaces/djustInterfaces';
import { LogisticOrderAccountingDocumentsResponse } from '~/purjus/interfaces/djustInterfaces';

type idType = 'BUSINESS_ID' | 'CART_ID';

export default (context: Context) => ({
    async getOrdersFromAccount(customerAccountIds: string, size = 20, nbPreviewLines = 20, params = {}): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<any>(`/v1/logistic-orders`, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
                params: {
                    size,
                    customerAccountIds,
                    nbPreviewLines,
                    ...params,
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Connection refused');
            }
            throw new Error('API Error');
        }
    },
    async getLogisticOrders(
        customerAccountIds: string,
        size = 20,
        nbPreviewLines = 20,
        params = {},
        page = 0,
    ): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<any>(`/v1/shop/logistic-orders`, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
                params: {
                    size,
                    customerAccountIds,
                    nbPreviewLines,
                    ...params,
                    page,
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Connection refused');
            }
            throw new Error('API Error');
        }
    },
    async getLogisticOrdersv2(body = {}, params = {}): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.post<any>(
                `/v1/shop/logistic-orders`,
                {
                    ...body,
                },
                {
                    headers: {
                        Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                        'dj-store': context.$config.storeId,
                        'dj-store-view': context.$config.storeIdViewId,
                    },
                    params: {
                        ...params,
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Connection refused');
            }
            throw new Error('API Error');
        }
    },
    async getCommercialOrderById(orderCommercialId: string, idType: idType = 'BUSINESS_ID'): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<any>(`/v1/shop/commercial-orders/${orderCommercialId}`, {
            headers: {
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
            params: {
                locale: context.i18n.locale,
                idType,
            },
        });
        return response.data;
    },
    async getLogisticOrderById(orderId: string, params = {}): Promise<Order> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<Order>(`/v1/shop/logistic-orders/${orderId}`, {
            headers: {
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
            },
            params: {
                locale: context.i18n.locale,
                ...params,
            },
        });
        return response.data;
    },

    async holdOrder(orderCommercialId: string): Promise<void> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.put<void>(
                `/v1/shop/commercial-orders/${orderCommercialId}/hold`,
                {},
                {
                    headers: {
                        Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Connection refused');
            }
            throw new Error('API Error');
        }
    },
    async createdOrder(orderCommercialId: string): Promise<void> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.put<void>(`/v1/shop/commercial-orders/${orderCommercialId}/created`, null, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'customer-account-id': context.store.state.app.account,
                    'content-type': 'application/json',
                    'dj-store': context.$config.storeId,
                    'dj-store-view': context.$config.storeIdViewId,
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Connection refused');
            }
            throw error;
        }
    },
    async getLogisticOrderLines(orderId: string, params = {}): Promise<LogisticOrderLinesResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<LogisticOrderLinesResponse>(`/v1/shop/logistic-orders/${orderId}/lines`, {
            headers: {
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
            },
            params,
        });
        return response.data;
    },
    async getLogisticOrderAccountingDocuments(
        orderId: string,
        params = {},
    ): Promise<LogisticOrderAccountingDocumentsResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<LogisticOrderAccountingDocumentsResponse>(
            `/v1/shop/logistic-orders/${orderId}/accounting-documents`,
            {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
                params,
            },
        );
        return response.data;
    },
    async downloadAccountingDocument(
        orderId: string,
        documentId: string,
        documentName: string,
        params = {},
    ): Promise<void> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<Blob>(
            `/v1/shop/logistic-orders/${orderId}/accounting-documents/${documentId}`,
            {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
                responseType: 'blob',
                params,
            },
        );
        context.$purjus.utils.downloadFile(response.data as Blob, documentName);
    },
});
