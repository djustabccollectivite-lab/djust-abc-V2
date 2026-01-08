import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { Supplier } from '../../../interfaces/djustInterfaces';

export default (context: Context) => ({
    async getAccountDetails(customerAccountId): Promise<Supplier> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<Supplier>(`/v1/customer-accounts/${customerAccountId}`, {
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
});
