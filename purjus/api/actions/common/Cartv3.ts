import type { Context } from '@nuxt/types';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { AxiosInstance } from 'axios';

export type updateLineBody = {
    customFieldIdType: string;
    lineIdType: string;
    lineType: string;
    metadata?: Object;
    updateOrderCommercialLines: Array<{
        customFields?: Array<{
            customFieldId: string;
            customFieldValue: string;
        }>;
        id: string;
        metadata?: Object;
        quantity: number;
        updateAction: string;
    }>;
};
export type initPaymentBody = {
    paymentMethodData: {
        type: string;
    };
    browserInfo: {
        acceptHeader: string;
        colorDepth: number;
        javaEnabled: boolean;
        javaScriptEnabled: boolean;
        language: string;
        screenHeight: number;
        screenWidth: number;
        timeZoneOffset: number;
        userAgent: string;
    };
    customerUserIP: string;
    storePaymentMethod: boolean;
    countryCode: string;
    locale: string;
};
export type CustomField = {
    customFieldId: string;
    customFieldValue: string;
};
export type UpdateOrderCustomFieldsBody = {
    customFields: CustomField[];
    customFieldIdType: string;
};

export default (context: Context) => ({
    async getNonValidatedOrders(): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get(`/v2/shop/commercial-orders`, {
            headers: {
                'customer-account-id': context.store.state.app.account,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
            params: {
                locale: context.i18n.locale,
                isValidated: false,
            },
        });
        return response.data;
    },
    async getOrderByid(orderId: string): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get(`/v1/shop/commercial-orders/${orderId}`, {
            headers: {
                'customer-account-id': context.store.state.app.account,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
            params: {
                locale: context.i18n.locale,
            },
        });
        return response.data;
    },
    async createOrder() {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.post(
            `/v2/shop/commercial-orders`,
            {
                isFull: false,
                sourceType: 'OPERATION',
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
    },
    async updateOrderLines(orderId: string, body: updateLineBody) {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.put(
            `/v2/shop/commercial-orders/${orderId}/lines`,
            {
                ...body,
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
    },
    async getOrderLines(orderId: string, params: any): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get(`/v1/shop/commercial-orders/${orderId}/lines`, {
            headers: {
                'customer-account-id': context.store.state.app.account,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
            params: {
                locale: context.i18n.locale,
                ...params,
            },
        });
        return response.data;
    },
    async deleteOrderLines(orderId: string, body: { offerPriceId: string }[]) {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.delete(`/v2/shop/commercial-orders/${orderId}/lines`, {
            headers: {
                'customer-account-id': context.store.state.app.account,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
            // not rfc compliant but axios delete does not support body in delete method
            data: body,
        });
        return response.data;
    },
    async setBillingAddress(orderId: string, addressId: string) {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.put(
            `/v1/shop/commercial-orders/${orderId}/billing-information`,
            {
                billingAddressId: addressId,
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
    },
    async setShippingAddress(orderId: string, addressId: string, shippingType: string) {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.put(
            `/v1/shop/commercial-orders/${orderId}/shipping-information`,
            {
                shippingAddressId: addressId,
                shippingType,
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
    },
    async setOrderToCreated(
        orderId: string,
        body: {
            mangoPayOrderOptions?: { preAuthorizationId: string };
            paymentOption: string;
            paymentProvider?: string;
            referenceType: string;
        },
    ) {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.put(`/v1/shop/commercial-orders/${orderId}/created`, body, {
            headers: {
                'customer-account-id': context.store.state.app.account,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
        });
        return response.data;
    },
    async paymentPrecheck(orderId: string, params?: { referenceType: string }): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get('v1/shop/payments/precheck', {
            headers: {
                'customer-account-id': context.store.state.app.account,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
            params: {
                reference: orderId,
                ...params,
            },
        });
        return response.data;
    },
    async initPayment(orderId: string, body: initPaymentBody): Promise<any> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.post(
            '/v1/shop/payments',
            {
                reference: orderId,
                ...body,
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
    },
    async updateOrderCustomFields(orderId: string, body: UpdateOrderCustomFieldsBody) {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.put(`/v2/shop/commercial-orders/${orderId}`, body, {
            headers: {
                'customer-account-id': context.store.state.app.account,
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                'dj-store': context.$config.storeId,
                'dj-store-view': context.$config.storeIdViewId,
            },
        });
        return response.data;
    },
    async setShippingType(orderId: string, shippingType: string) {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.put(
            `/v1/shop/commercial-orders/${orderId}/shipping-type`,
            {
                shippingType,
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
    },
});
