import { Context } from '@nuxt/types';
import { TokenableScheme } from '@nuxtjs/auth-next';
import Service from '../api/Service';
import {
    InitPaymentBody,
    PaymentMethodsRequest,
    PaymentMethodsResponse,
    InitiatePaymentResponse,
} from '../interfaces/IDjustPay';

export default (context: Context) => ({
    async getPaymentMethods(params: PaymentMethodsRequest): Promise<PaymentMethodsResponse['data'] | null> {
        const token = (context.$auth.strategy as TokenableScheme).token.get();
        if (typeof token !== 'string') {
            return null;
        }

        try {
            const response = await Service(context.$axios).pay.APIgetPaymentMethods(params, token);
            return response.data;
        } catch (error) {
            return null;
        }
    },

    async initPayment(request: InitPaymentBody): Promise<InitiatePaymentResponse['data'] | null> {
        const token = (context.$auth.strategy as TokenableScheme).token.get();
        if (typeof token !== 'string') {
            return null;
        }

        try {
            const response = await Service(context.$axios).pay.APIinitPayment(request, token);
            return response.data;
        } catch (error) {
            return null;
        }
    },

    async paymentDetailsCall(request: InitPaymentBody): Promise<InitiatePaymentResponse['data'] | null> {
        const token = (context.$auth.strategy as TokenableScheme).token.get();
        if (typeof token !== 'string') {
            return null;
        }

        try {
            const response = await Service(context.$axios).pay.APImakeDetailsCall(request, token);
            return response.data;
        } catch (error) {
            return null;
        }
    },

    async deleteTokenizedPayment(storedPaymentId: string): Promise<any | null> {
        const token = (context.$auth.strategy as TokenableScheme).token.get();
        if (typeof token !== 'string') {
            return null;
        }

        try {
            const response = await Service(context.$axios).pay.APIdeleteStoredPaymentMethod(storedPaymentId, token);
            // Explicitly return void (or nothing)
            return response.status;
        } catch (error) {
            return null;
        }
    },
});
