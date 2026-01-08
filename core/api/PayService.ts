import { NuxtAxiosInstance } from '@nuxtjs/axios';
import {
    PaymentMethodsResponse,
    InitPaymentBody,
    InitiatePaymentResponse,
    PaymentMethodsRequest,
} from '../interfaces/IDjustPay';

export default (axios: NuxtAxiosInstance) => ({
    APIgetPaymentMethods(params: PaymentMethodsRequest, jwt: string) {
        return axios.get<PaymentMethodsResponse['data']>('/v1/shop/payments/payment-methods', {
            params,
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    APIinitPayment(body: InitPaymentBody, jwt: string) {
        return axios.post<InitiatePaymentResponse['data']>('/v1/shop/payments', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    APImakeDetailsCall(body: InitPaymentBody, jwt: string) {
        return axios.post<InitiatePaymentResponse['data']>('/v1/shop/payments/details', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    APIdeleteStoredPaymentMethod(paymentMethodId: string, jwt: string) {
        return axios.delete<void>(`/v1/shop/payments/stored-payment-methods/${paymentMethodId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },
});
