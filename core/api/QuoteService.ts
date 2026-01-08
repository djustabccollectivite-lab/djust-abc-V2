import { NuxtAxiosInstance } from '@nuxtjs/axios';
import * as QuoteRequest from '../interfaces/Quote/IRequestQuote';
import * as QuoteResponse from '../interfaces/Quote/IResponseQuote';

export default (axios: NuxtAxiosInstance) => ({
    /**
     * Function APIcreateMasterQuote
     * Create a master quote
     *
     * @param  {string} jwt
     * @param  {string} name
     */
    APIcreateMasterQuote(jwt: string, name: string) {
        const data = { name };
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.post<QuoteResponse.MasterQuoteResponse>('/v1/shop/master-quotes', data, config);
    },

    /**
     * Function APIaddProductToQuote
     * Update a master Quote ( Add Product to Quote)
     *
     * @param  {string} jwt
     * @param  {QuoteRequest.ProductToAdd} productToAdd
     */
    APIaddProductToQuote(jwt: string, productToAdd: QuoteRequest.ProductToAdd) {
        const data = productToAdd.data;
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.put<QuoteResponse.MasterQuoteResponse>(`/v1/shop/master-quotes/${productToAdd.masterQuoteId}`, data, config);
    },

    /**
     * Function APIRemoveProductFromQuote (Same API )
     * Remove Product from Quote
     *
     * @param  {string} jwt
     * @param  {QuoteRequest.ProductToRemove} productToRemove
     */
    APIRemoveProductFromQuote(jwt: string, productToRemove: QuoteRequest.ProductToRemove) {
        const data = productToRemove.data;
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.put<QuoteResponse.MasterQuoteResponse>(`/v1/shop/master-quotes/${productToRemove.masterQuoteId}`, data, config);
    },

    /**
     * Function APIDeleteMasterQuote
     * Delete the master quote
     *
     * @param  {string} jwt
     * @param  {QuoteRequest.MasterQuoteToDelete} masterQuoteToDelete
     */
    APIDeleteMasterQuote(jwt: string, masterQuoteToDelete: QuoteRequest.MasterQuoteToDelete) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.delete<void>(`/v1/shop/master-quotes/${masterQuoteToDelete.masterQuoteId}`, config);
    },

    /**
     * Function APIgetAllMasterQuotes
     * Get all master quotes
     *
     * @param  {string} jwt
     */
    APIgetAllMasterQuotes(jwt: string) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.get<QuoteResponse.PageMasterQuoteResponse>('/v1/shop/master-quotes?fromCustomerAccount=false&sort=updatedAt,desc&size=100', config);
    },

    /**
     * Function APIgetMasterQuote by Id
     * Get a master quote by id
     *
     * @param  {string} jwt
     * @param  {string} quoteId
     */
    APIgetMasterQuote(jwt: string, quoteId: string) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.get<QuoteResponse.MasterQuoteResponse>(`/v1/shop/master-quotes/?masterQuoteId=${quoteId}`, config);
    },

    /**
     * Function APIgetMasterQuote by Id
     * Get a master quote by id
     *
     * @param  {string} jwt
     * @param  {string} quoteId
     */
    APIgetMasterQuoteByID(jwt: string, quoteId: string) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.get<QuoteResponse.MasterQuoteResponse>(`/v1/shop/master-quotes/${quoteId}`, config);
    },

    /**
    * Function APIgetSupplierQuote by Id
    * Get a Supplier quote by id
    *
    * @param  {string} jwt
    * @param  {string} supplierQuoteId
    */
    APIgetSupplierQuoteByID(jwt: string, supplierQuoteId: string) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.get<QuoteResponse.SupplierQuoteResponse>(`/v1/shop/supplier-quotes/${supplierQuoteId}`, config);
    },

    /**
     * Function APIgetListSuppliersOfProduct
     * Fetch Suppliers of product
     *
     * @param  {string} jwt
     * @param  {string} productId
     */
    APIgetListSuppliersOfProduct(jwt: string, productId: string) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.get(`/v1/shop/suppliers/?productVariantId=${productId}`, config);
    },

    /**
     * Function APIvalidateMasterQuote (Create Supplier Quote)
     * Create a supplier Quote
     *
     * @param  {string} jwt
     * @param  {QuoteRequest.MasterQuoteToValidate} masterQuoteToValidate
     */
    APIvalidateMasterQuote(jwt: string, masterQuoteToValidate: QuoteRequest.MasterQuoteToValidate) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };

        return axios.post<QuoteResponse.SupplierQuoteResponse[]>('/v1/shop/supplier-quotes', masterQuoteToValidate, config);
    },

    /**
     * Function APIAcceptSupplierQuote (Create Supplier Quote)
     * Accept a supplier Quote
     *
     * @param  {string} jwt
     * @param  {string} supplierQuoteId
     */
    APIAcceptSupplierQuote(jwt: string, supplierQuoteId: string) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        return axios.put<QuoteResponse.SupplierQuoteResponse[]>(`/v1/shop/supplier-quotes/${supplierQuoteId}/accept`, config);
    },

    /**
     * Function APIrefuseSupplierQuote
     * Update supplier Quote status
     *
     * @param  {string} jwt
     * @param  {QuoteRequest.SupplierQuoteToRefuse} supplierQuoteToRefuse
     */
    APIrefuseSupplierQuote(jwt: string, supplierQuoteToRefuse: QuoteRequest.SupplierQuoteToRefuse) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        return axios.put<QuoteResponse.SupplierQuoteStatusResponse>(`/v1/shop/supplier-quotes/${supplierQuoteToRefuse.supplierQuoteId}/decline`, config);
    },

    /**
     * Function APIsendMessageSupplierQuote (Send Message from Supplier Quote)
     * Send Message from Supplier Quote
     *
     * @param  {string} jwt
     * @param  {string} supplierQuoteId
     * @param  {QuoteRequest.SupplierQuoteRequest} supplierQuoteRequest
     */
    APIsendMessageSupplierQuote(jwt: string, supplierQuoteId: string, supplierQuoteRequest: QuoteRequest.SupplierQuoteRequest) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        return axios.post<QuoteResponse.SupplierQuoteResponse>(`/v1/shop/supplier-quotes/${supplierQuoteId}/message`, supplierQuoteRequest, config);
    },

    /**
     * GET List of "QUOTE" customFields
     *
    */
    APIgetQuoteCustomFields(jwt: string) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        return axios.get<any>(`/v1/shop/custom-fields?sealedTarget=QUOTE`, config);
    },

    /**
    * UPDATE MASTER QUOTE
    * @param  {string} quoteId
   */
    APIupdateMasterQuote(jwt: string, quoteId: string, data: any) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        return axios.put<any>(`/v1/shop/master-quotes/${quoteId}`, data, config);
    },

    /**
     * UPDATE SUPPLIER QUOTE
     * @param  {string} quoteId
    */
    APIupdateSupplierQuote(jwt: string, supplierQuoteId: string, data: any) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        return axios.patch<any>(`/v1/shop/supplier-quotes/${supplierQuoteId}/custom-fields`, data, config);
    },


    /**
     * INITIALIZE SUPPLIER QUOTE
     * @param  {string} quoteId
    */
    APIinitializeQuoteOrder(jwt: string, supplierQuoteId: string, data: any) {
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        return axios.post<any>(`/v2/shop/supplier-quotes/${supplierQuoteId}/initialize-orders`, data, config);
    },
});
