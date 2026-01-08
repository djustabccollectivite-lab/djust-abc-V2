import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { Supplier } from '../../../interfaces/djustInterfaces';
import { ConnexionError } from '../../exeptions/ConnexionError';
import { ApiError } from '../../exeptions/ApiError';

export default (context: Context) => ({
    async getSuppliers(size = 20, page = 0): Promise<Supplier> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<Supplier>(`/v1/shop/suppliers?size=${size}&page=${page}`, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
            });
            return response.data;
        } catch (error: any) {
            console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
    async getSupplierDetails(id: string, idType = 'EXTERNAL_ID') {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<Supplier>(`/v1/shop/suppliers/${id}?idType=${idType}`, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
            });

            return response.data;
        } catch (error: any) {
            console.error(error);
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
});
