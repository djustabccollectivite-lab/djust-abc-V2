import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { SupplierDetailReponse, SupplierEvaluationsResponse } from '../interfaces/Supplier/IReponseSupplier';

export default (axios: NuxtAxiosInstance) => ({
    /**
     * @param {number} size
     * @param {number} page
     */
    APIgetSuppliers(
        params: {
            supplierStatus: string;
            supplierIds: Array<string>;
            idType: string;
        },
        size: number = 20,
        page: number = 0,
    ) {
        return axios.get<SupplierDetailReponse[]>(
            `/v1/shop/suppliers?supplierStatus=${params.supplierStatus}&supplierIds=${params.supplierIds}&idType=${params.idType}&size=${size}&page=${page}`,
        );
    },
    /**
     * @param {string|null} id
     */
    APIgetSupplierDetail(id?: string, idType: string = 'DJUST_ID') {
        if (id) {
            return axios.get<SupplierDetailReponse[]>(`/v1/shop/suppliers/${id}?idType=${idType}`);
        } else {
            return axios.get<SupplierDetailReponse[]>('/v1/shop/suppliers?size=100');
        }
    },
    APIgetSupplierById(id: string, idType: string = 'DJUST_ID') {
        return axios.get<SupplierDetailReponse[]>(`/v1/shop/suppliers/${id}?idType=${idType}`);
    },
    /**
     * @param {string} id
     */
    APIgetSupplierEvaluation(id: string) {
        return axios.get<SupplierEvaluationsResponse[]>(`/v1/shop/suppliers/${id}/evaluations`);
    },
});
