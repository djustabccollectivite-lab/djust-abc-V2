import { Context } from '@nuxt/types';
import { TokenableScheme } from '@nuxtjs/auth-next';
import Service from '../api/Service';
import { MasterQuoteResponse } from '../interfaces/Quote/IResponseQuote';
import * as QuoteRequest from '../interfaces/Quote/IRequestQuote';

export default (context: Context) => ({
    IsActive(): boolean {
        return Boolean(context.$config.quoteIsActive);
    },

    /**
     * Function createMasterQuote
     * Create a master quote
     *
     * @param  {QuoteRequest.MasterQuoteToCreate} masterQuoteToCreate
     */
    async createMasterQuote(masterQuoteToCreate: QuoteRequest.MasterQuoteToCreate) {
        return await Service(context.$axios)
            .quote.APIcreateMasterQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                masterQuoteToCreate.name,
            )
            .then((response) => {
                context.store.commit('quote/addMasterQuote', response.data);
                context.$core.useQuote.addProductToQuote({
                    masterQuoteId: response.data.id,
                    data: masterQuoteToCreate.productToAdd,
                });
                return true;
            })
            .catch(() => {
                return false;
            });
    },

    /**
     * Function getAllMasterQuotes
     * Get all master quotes
     *
     * @param  {string} jwt
     */
    async getAllMasterQuotes(jwt: string) {
        await Service(context.$axios)
            .quote.APIgetAllMasterQuotes(jwt)
            .then((response) => {
                context.store.commit('quote/clearQuotes');
                response.data.content.forEach((masterQuote: MasterQuoteResponse) => {
                    context.store.commit('quote/addQuote', masterQuote);
                });
            })
            .catch((_error) => { });
    },

    /**
     * Function getMasterQuote
     * Get a master quote by id
     *
     * @param  {string} quoteId
     */
    async getMasterQuote(quoteId: string) {
        return await Service(context.$axios)
            .quote.APIgetMasterQuote((context.$auth.strategy as TokenableScheme).token.get() as string, quoteId)
            .then((response) => {
                context.store.commit('quote/setMasterQuote', response.data);
                return response;
            })
            .catch((_error) => { });
    },

    /**
     * Function getMasterQuote
     * Get a master quote by id
     *
     * @param  {string} quoteId
     */
    async getMasterQuoteByID(quoteId: string) {
        return await Service(context.$axios)
            .quote.APIgetMasterQuoteByID((context.$auth.strategy as TokenableScheme).token.get() as string, quoteId)
            .then((response) => {
                return response.data;
            })
            .catch((_error) => { });
    },

    /**
     * Function getSupplierQuoteById
     * Get a Supplier quote by id
     *
     * @param  {string} supplierQuoteId
     */
    async getSupplierQuoteById(supplierQuoteId: string) {
        return await Service(context.$axios)
            .quote.APIgetSupplierQuoteByID(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                supplierQuoteId,
            )
            .then((response) => {
                return response.data;
            })
            .catch((_error) => { });
    },

    /**
     * Function getListSuppliers
     * Fetch Suppliers of product
     *
     * @param  {string} productId
     */
    async getListSuppliers(productId: string) {
        return await Service(context.$axios)
            .quote.APIgetListSuppliersOfProduct(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                productId,
            )
            .then((response) => {
                return response.data;
            })
            .catch((_error) => { });
    },

    /**
     * Function addProductToQuote
     * Update a master Quote (Add Product to Quote)
     *
     * @param  {QuoteRequest.ProductToAdd} productToAdd
     */
    async addProductToQuote(productToAdd: QuoteRequest.ProductToAdd) {
        return Service(context.$axios)
            .quote.APIaddProductToQuote((context.$auth.strategy as TokenableScheme).token.get() as string, productToAdd).then((response) => {
                if (response) {
                    context.store.commit('quote/setQuote', response.data);
                    context.$core.useQuote.getAllMasterQuotes(
                        (context.$auth.strategy as TokenableScheme).token.get() as string,
                    );
                }
                return response
            })
    },

    /**
     * Function removeProductFromQuote
     * Remove Product from Quote
     *
     * @param  {QuoteRequest.ProductToRemove} productToRemove
     */
    async removeProductFromQuote(productToRemove: QuoteRequest.ProductToRemove) {
        await Service(context.$axios)
            .quote.APIRemoveProductFromQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                productToRemove,
            )
            .then(() => {
                context.store.commit('quote/rmQuote', {
                    masterQuoteId: productToRemove.masterQuoteId,
                    quoteLineId: productToRemove.quoteLineId,
                });
            });
    },

    /**
     * Function deleteMasterQuote
     * Delete the master quote
     *
     * @param  {QuoteRequest.MasterQuoteToDelete} masterQuoteToDelete
     */
    async deleteMasterQuote(masterQuoteToDelete: QuoteRequest.MasterQuoteToDelete) {
        await Service(context.$axios)
            .quote.APIDeleteMasterQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                masterQuoteToDelete,
            )
            .then(() => {
                context.store.commit('quote/rmMasterQuote', {
                    masterQuoteId: masterQuoteToDelete.masterQuoteId,
                });
            });
    },

    /**
     * Function validateMasterQuote
     * Create a supplier Quote
     *
     * @param  {QuoteRequest.MasterQuoteToValidate} masterQuoteToValidate
     * @param  {string} message
     */
    async validateMasterQuote(masterQuoteToValidate: QuoteRequest.MasterQuoteToValidate, message: string) {
        return await Service(context.$axios)
            .quote.APIvalidateMasterQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                masterQuoteToValidate,
            )
            .then((response) => {
                context.store.commit('quote/setSupplierQuote', {
                    masterQuoteId: masterQuoteToValidate.masterQuoteId,
                    supplierQuote: response.data,
                });
                if (message) {
                    response.data.forEach(async (element) => {
                        const request = {
                            message,
                            username: element.customerName,
                        };
                        await context.$core.useQuote.sendMessageFromSupplierQuote(
                            element.id,
                            masterQuoteToValidate.masterQuoteId,
                            request,
                        );
                    });
                }
                return response.data;
            })
            .catch((_error) => {
                return false;
            });
    },

    /**
     * Function acceptSupplierQuote
     * accept a supplier Quote
     * @param  {QuoteRequest.MasterQuoteToValidate} masterQuoteToValidate
     * @param  {string} supplierQuoteId
     */
    async acceptSupplierQuote(masterQuoteToValidate: QuoteRequest.MasterQuoteToValidate, supplierQuoteId: string) {
        return await Service(context.$axios)
            .quote.APIAcceptSupplierQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                supplierQuoteId,
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error with API validateMasterQuote', error);
                return false;
            });
    },

    /**
     * Function refuseSupplierQuote
     * Update supplier Quote status
     *
     * @param  {QuoteRequest.SupplierQuoteToRefuse} supplierQuoteToRefuse
     */
    async refuseSupplierQuote(supplierQuoteToRefuse: QuoteRequest.SupplierQuoteToRefuse) {
        await Service(context.$axios)
            .quote.APIrefuseSupplierQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                supplierQuoteToRefuse,
            )
            .then((response) => {
                context.store.commit('quote/setSupplierQuoteStatus', {
                    masterQuoteId: supplierQuoteToRefuse.masterQuoteId,
                    supplierQuoteId: supplierQuoteToRefuse.supplierQuoteId,
                    supplierQuote: response.data,
                });
            })
            .catch((_error) => { });
    },

    /**
     * Function sendMessageFromSupplierQuote
     * Send Message from Supplier Quote
     *
     * @param  {string} supplierQuoteId
     * @param  {string} masterQuoteId
     * @param  {QuoteRequest.SupplierQuoteRequest} supplierQuoteRequest
     */
    async sendMessageFromSupplierQuote(
        supplierQuoteId: string,
        masterQuoteId: string,
        supplierQuoteRequest: QuoteRequest.SupplierQuoteRequest,
    ) {
        return await Service(context.$axios)
            .quote.APIsendMessageSupplierQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                supplierQuoteId,
                supplierQuoteRequest,
            )
            .then((response) => {
                context.store.commit('quote/setSupplierQuoteStatus', {
                    masterQuoteId,
                    supplierQuoteId,
                    supplierQuote: response.data,
                });
                return response.data;
            })
            .catch((_error) => { });
    },
    async getQuoteCustomFields() {
        return await Service(context.$axios)
            .quote.APIgetQuoteCustomFields((context.$auth.strategy as TokenableScheme).token.get() as string)
            .then((response) => {
                return response;
            })
            .catch((_error) => { });
    },
    async updateMasterQuote(masterQuoteId: string, data: any) {
        return await Service(context.$axios)
            .quote.APIupdateMasterQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                masterQuoteId,
                data,
            )
            .then((response) => {
                return response;
            })
            .catch((_error) => { });
    },
    async updateSupplierQuote(supplierQuoteId: string, data: any) {
        return await Service(context.$axios)
            .quote.APIupdateSupplierQuote(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                supplierQuoteId,
                data,
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error with API Failed update quote', error);
            });
    },

    async initializeQuoteOrder(supplierQuoteId: string, data: any) {
        return await Service(context.$axios)
            .quote.APIinitializeQuoteOrder(
                (context.$auth.strategy as TokenableScheme).token.get() as string,
                supplierQuoteId,
                data,
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error with API Failed initialize order from quote', error);
            });
    },
});
