import { Context } from '@nuxt/types';
import { TokenableScheme } from '@nuxtjs/auth-next';
import Service from '../api/Service';
import * as OrderRequest from '../interfaces/Order/IOrderRequest';
import * as OrderResponse from '../interfaces/Order/IOrderResponse';

export default (context: Context) => ({
    /**
     * @returns {Promise<void | OrderResponse.Order[]>}
     */
    async getOrdersList(): Promise<void | OrderResponse.Order[]> {
        return await Service(context.$axios)
            .order.APIgetOrderList(
                (context.$auth.strategy as TokenableScheme).token.get(),
                context.app.i18n.localeProperties.code.toUpperCase(),
            )
            .then((response) => {
                return response.data.content;
            })
            .catch(() => {});
    },

    /**
     * @returns {Promise<void | OrderResponse.Order[]>}
     */
    async getOrdersListPaginate(
        page: number = 0,
        size: number = 20,
    ): Promise<void | {
        content: OrderResponse.Order[];
        pageable: any;
        totalPages: number;
    }> {
        return await Service(context.$axios)
            .order.APIgetOrderList(
                (context.$auth.strategy as TokenableScheme).token.get(),
                context.app.i18n.localeProperties.code.toUpperCase(),
                size,
                page,
            )
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @returns {Promise<void | OrderResponse.Order[]>}
     */
    async getOrderListByCustomerAccountIds(
        customerAccountIds: string[] | string = [],
        connectedUserOnly: boolean = false,
        nbPreviewLines: number = 100,
        size: number = 100,
        page: number = 0,
    ): Promise<void | OrderResponse.Order[]> {
        return await Service(context.$axios)
            .order.APIgetOrderListByCustomerAccountIds(
                (context.$auth.strategy as TokenableScheme).token.get(),
                context.app.i18n.localeProperties.code.toUpperCase(),
                size,
                page,
                customerAccountIds,
                connectedUserOnly,
                nbPreviewLines,
            )
            .then((response) => {
                return response.data.content;
            })
            .catch(() => {});
    },

    /**
     * @returns {Promise<void | OrderResponse.Order[]>}
     */
    async getOrderListByCustomerAccountIdsPaginate(
        customerAccountIds: string[] | string = [],
        connectedUserOnly: boolean = false,
        page: number = 0,
        size: number = 20,
    ): Promise<void | {
        content: OrderResponse.Order[];
        pageable: any;
        totalPages: number;
    }> {
        return await Service(context.$axios)
            .order.APIgetOrderListByCustomerAccountIds(
                (context.$auth.strategy as TokenableScheme).token.get(),
                context.app.i18n.localeProperties.code.toUpperCase(),
                size,
                page,
                customerAccountIds,
                connectedUserOnly,
            )
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    async getOrdersLinesListPaginate(
        orderId: string,
        page: number = 0,
        size: number = 10,
        sort: string[] = [],
    ): Promise<void | {
        content: any[];
        pageable: any;
        totalPages: number;
    }> {
        try {
            const response = await Service(context.$axios).order.APIGetOrdersLines(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderId,
                size,
                page,
                sort,
            );
            return response.data;
        } catch (error) {}
    },

    async getAllOrderLinesRecursively(orderId: string, paginationSize: number = 10, sort: string[] = []) {
        try {
            const response: any = await this.getOrdersLinesListPaginate(orderId, 0, paginationSize, sort);

            const { totalElements, content } = response;

            let orderLinesArray = content;

            if (paginationSize < totalElements) {
                const iteration = Math.floor(totalElements / paginationSize);

                const promises: Array<Promise<any>> = [];

                for (let index = 1; index < iteration + 1; index++) {
                    const promise: Promise<any> = new Promise((resolve) => {
                        this.getOrdersLinesListPaginate(orderId, index, paginationSize, sort).then((result) =>
                            resolve(result),
                        );
                    });

                    promises.push(promise);
                }

                for (const products of await Promise.all(promises)) {
                    orderLinesArray = orderLinesArray.concat(products.content);
                }
            }

            return orderLinesArray;
        } catch (error) {
            return error;
        }
    },

    /**
     * @param {string} orderID
     * @returns {Promise<void | OrderResponse.Order>}
     */
    async getOrderById(orderID: string): Promise<void | OrderResponse.Order> {
        return await Service(context.$axios)
            .order.APIgetOrderbyid(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderID,
                context.app.i18n.localeProperties.code.toUpperCase(),
            )
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    async getOrderApprovers(orderId: string): Promise<void | OrderResponse.Order> {
        try {
            const response = await Service(context.$axios).order.APIgetOrderApprovers(
                orderId,
                (context.$auth.strategy as TokenableScheme).token.get(),
            );
            return response.data;
        } catch (error) {}
    },

    /**
     *
     * @param {string} orderID
     * @returns {Promise<void | OrderResponse.Order>}
     */
    async getCommercialOrderbyid(
        orderID: string,
        idType_: string,
        nbPreviewLines: number = 100,
    ): Promise<void | OrderResponse.Order> {
        const idType = idType_ || 'BUSINESS_ID';

        const request = {
            idType,
            locale: context.app.i18n.localeProperties.code.toUpperCase(),
            nbPreviewLines,
        };

        return await Service(context.$axios)
            .order.APIgetCommercialOrderbyid((context.$auth.strategy as TokenableScheme).token.get(), orderID, request)
            .then((response: { data: any }) => {
                // L'api peut nous renvoyer processing true, ce qui fait que les datas ne sont pas forcement correct.
                const { ...commercialOrder } = response.data;
                context.store.commit('orders/setOrders', response.data.orderLogistics);
                context.store.commit('orders/setCommercialOrder', commercialOrder);
                context.store.commit('orders/setCurrentOrder', response.data);
                context.store.commit('cart_b2b/setBillingAddressId');
                return response.data;
            })
            .catch((error) => {
                return error.response;
            });
    },

    /**
     * @param {string} orderID
     * @returns {Promise<void>}
     */
    async unvalidateOrder(orderID: string): Promise<void | OrderResponse.Order> {
        return await Service(context.$axios)
            .order.APIrefuseOrder(
                orderID,
                context.app.i18n.localeProperties.code.toUpperCase(),
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response) => {
                context.store.commit('orders/setOrder', response.data);

                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @param {string} orderID
     * @returns {Promise<void>}
     */
    async unvalidateOrderWithError(orderID: string): Promise<any | OrderResponse.Order> {
        return await Service(context.$axios)
            .order.APIrefuseOrder(
                orderID,
                context.app.i18n.localeProperties.code.toUpperCase(),
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response) => {
                context.store.commit('orders/setOrder', response.data);

                return response.data;
            })
            .catch((error) => {
                return error;
            });
    },

    /**
     * @returns {Promise<void | OrderResponse.Order[]>}
     */
    async getOrdersListWithIncident(sort: string[] = []): Promise<void | OrderResponse.Order[]> {
        return await Service(context.$axios)
            .order.APIgetOrderListWithIncident(
                (context.$auth.strategy as TokenableScheme).token.get(),
                context.app.i18n.localeProperties.code.toUpperCase(),
                sort,
            )
            .then((response) => {
                return response.data.content;
            })
            .catch(() => {});
    },

    /**
     * @param {string} orderID
     * @returns {Promise<OrderResponse.Order | any>}
     */
    async confirmOrderDelivery(orderID: string): Promise<OrderResponse.Order | any> {
        return await Service(context.$axios)
            .order.APIconfirmOrderDelivery(
                orderID,
                context.app.i18n.localeProperties.code.toUpperCase(),
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response) => {
                return response;
            })
            .catch(() => {});
    },

    /**
     * @param {string} orderID
     * @returns {Promise<void>}
     */
    async validateOrder(orderID: string): Promise<void | OrderResponse.Order> {
        return await Service(context.$axios)
            .order.APIvalidateOrder(
                orderID,
                context.app.i18n.localeProperties.code.toUpperCase(),
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response) => {
                context.store.commit('orders/setOrder', response.data);

                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @param {string} orderID
     * @returns {Promise<void>}
     */
    async validateOrderWithError(orderID: string): Promise<any | OrderResponse.Order> {
        return await Service(context.$axios)
            .order.APIvalidateOrder(
                orderID,
                context.app.i18n.localeProperties.code.toUpperCase(),
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response) => {
                context.store.commit('orders/setOrder', response.data);

                return response.data;
            })
            .catch((error) => {
                return error;
            });
    },

    /**
     * @param {string} orderID
     * @returns {Promise<boolean | OrderResponse.Document[]>}
     */
    async getAllOrderDocuments(orderID: string): Promise<boolean | OrderResponse.Document[]> {
        return await Service(context.$axios)
            .order.APIgetAllOrderDocument(orderID, (context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return false;
            });
    },

    /**
     * @param {string} orderID
     * @param {string} documentId
     * @param {string} documentName
     * @returns {Promise<boolean | void>}
     */
    async getdownloadDocumentByID(orderID: string, documentId: string, documentName: string): Promise<boolean | void> {
        return await Service(context.$axios)
            .order.APIdownloadDocumentByID(orderID, documentId, (context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                const typeDocument = response.data.type;
                const blob = new Blob([response.data], { type: typeDocument });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = documentName;
                link.href = url;
                link.click();
                URL.revokeObjectURL(link.href);
            })
            .catch(() => {
                return false;
            });
    },

    /**
     * @param {string} orderID
     * @param {string} review
     * @returns {Promise<boolean>}
     */
    async createOrderReview(orderID: string, review: string): Promise<boolean> {
        return await Service(context.$axios)
            .order.APIorderCreateReview(orderID, review, (context.$auth.strategy as TokenableScheme).token.get())
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    },

    /**
     * Does not exist anymore on swagger ? Ask Éric.
     * @param {string} orderID
     * @param {OrderRequest.Thread} thread
     * @returns {Promise<boolean>}
     */
    async createClaim(orderID: string, thread: OrderRequest.Thread): Promise<boolean> {
        return await Service(context.$axios)
            .order.APICreateOrderClaim(thread, orderID, (context.$auth.strategy as TokenableScheme).token.get())
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    },

    /**
     * @returns {Promise<OrderResponse.ReasonType[] | void>}
     */
    async APIgetAllReasonTypes(): Promise<OrderResponse.ReasonType[] | void> {
        return await Service(context.$axios)
            .order.APIgetAllReasonTypes((context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    /**
     *
     * @param {OrderRequest.ReasonType} reasonType
     * @returns {Promise<OrderResponse.Subreason[] | void>}
     */
    async getAllSubReasonTypes(reasonType: OrderRequest.ReasonType): Promise<OrderResponse.Subreason[] | void> {
        return await Service(context.$axios)
            .order.APIgetAllSubReasonTypes(reasonType, (context.$auth.strategy as TokenableScheme).token.get())
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @param {string} orderId
     * @param {string} paymentOption
     * @param  {string} paymentProvider
     * @returns {Promise<string | void>}
     */
    async getPaymentUrl(orderId: string, paymentOption: string, paymentProvider: string): Promise<string | void> {
        return await Service(context.$axios)
            .order.ApiPaymentCreditCardURL(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderId,
                paymentOption,
                paymentProvider,
            )
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @param {string} orderLogisticId
     * @param {OrderRequest.CustomFieldData[]} customFieldData
     * @returns {Promise<OrderResponse.Order | void>}
     */
    async updateLogisticOrderCustomFields(
        orderLogisticId: string,
        customFieldData: OrderRequest.CustomFieldData[],
        useStore: boolean = false,
    ): Promise<OrderResponse.Order | void> {
        return await Service(context.$axios)
            .order.ApiUpdateLogisticOrderCustomFields(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
                customFieldData,
            )
            .then((response) => {
                if (useStore) {
                    context.store.commit('orders/setCurrentLogisticOrder', response.data);
                }
                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @param {string} orderLogisticId
     * @param {string} orderLogisticLineId
     * @param {OrderRequest.CustomFieldData[]} customFieldData
     * @returns {Promise<OrderResponse.Order | void>}
     */
    async updateOrderLogisticLineCustomFields(
        orderLogisticId: string,
        orderLogisticLineId: string,
        customFieldData: OrderRequest.CustomFieldData[],
    ): Promise<OrderResponse.Order | void> {
        return await Service(context.$axios)
            .order.ApiUpdateOrderLogisticLineCustomFields(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
                orderLogisticLineId,
                customFieldData,
            )
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @param {EmailTemplate} emailTemplate
     * @returns {Promise<boolean>}
     */
    async sendMailAfterOrderValidation(emailTemplate: EmailTemplate): Promise<boolean> {
        return await context.$axios
            .post('https://api.sendinblue.com/v3/smtp/email', emailTemplate, {
                headers: {
                    'api-key': context.$config.Mail_Api_Key,
                },
            })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    },

    updateLogisticOrderBillingInformations(orderLogisticId: string, billingAddressId: string) {
        const body = { billingAddressId };
        const result = Service(context.$axios)
            .order.APIUpdateOrderLogisticBillingInformations(
                orderLogisticId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: { content: { content: any } } }) => {
                return response.data;
            })
            .catch(() => {});
        return result;
    },

    updateCommercialOrderBillingInformations(orderCommercialId: string, billingAddressId: string) {
        const body = { billingAddressId };
        const result = Service(context.$axios)
            .order.APIUpdateOrderCommercialBillingInformations(
                orderCommercialId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: { content: { content: any } } }) => {
                return response.data;
            })
            .catch(() => {});
        return result;
    },

    /**
     * @param {string} orderId
     * @returns {Promise<string | void>}
     */
    async getCxmlFormat(orderId: string): Promise<string | void> {
        const result = await Service(context.$axios)
            .order.ApiConvertToCxml((context.$auth.strategy as TokenableScheme).token.get(), orderId)
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
        return result;
    },

    /**
     * @param {Object} params
     * @returns {Promise<string>}
     */
    async getPunchoutCxmlFormat(params): Promise<string> {
        const jwt = (context.$auth.strategy as TokenableScheme).token.get();
        const payload = {
            tenantId: context.$config.punchout_tenant_id,
            tenantConfigId: context.$config.punchout_tenant_config_id,
            ...params,
        };
        const result = await Service(context.$axios)
            .order.ApiPunchOutConvertToCxml(jwt, payload)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error('Punchout - Failed to convert to Cxml' + error);
            });
        return result;
    },

    updateCommercialOrderShippingInformations(
        commercialOrderId: string,
        shippingAddressId: string,
        shippingType: string = 'STD',
    ) {
        const body = {
            shippingAddressId,
            shippingType,
        };
        const result = Service(context.$axios)
            .order.APIUpdateOrderCommercialShippingInformations(
                commercialOrderId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: any }) => {
                if (response.data) {
                    const { orderLogistics, ...commecial } = response.data;
                    context.store.commit('orders/setOrders', orderLogistics);
                    context.store.commit('orders/setCommercialOrder', commecial);
                    context.store.commit('orders/setCurrentOrder', response.data);
                    return response.data;
                } else {
                    return response;
                }
            })
            .catch(() => {});
        return result;
    },

    updateCommercialOrderShippingAddress(orderLogisticId: string, shippingAddressId: string) {
        const body = {
            shippingAddressId,
        };
        const result = Service(context.$axios)
            .order.APIUpdateOrderCommercialShippingAddress(
                orderLogisticId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: any }) => {
                if (response.data) {
                    const { orderLogistics, ...commecial } = response.data;
                    context.store.commit('orders/setOrders', orderLogistics);
                    context.store.commit('orders/setCommercialOrder', commecial);
                    context.store.commit('orders/setCurrentOrder', response.data);
                    return response.data;
                } else {
                    return response;
                }
            })
            .catch(() => {});
        return result;
    },

    validateLogisticOrder(orderLogisticIds: string[]) {
        orderLogisticIds.forEach((orderLogisticId) => {
            Service(context.$axios)
                .order.APIOrderLogisticValidation(
                    (context.$auth.strategy as TokenableScheme).token.get(),
                    orderLogisticId,
                )
                .then((response: { data: { content: { content: any } } }) => {
                    return response.data;
                })
                .catch(() => {});
        });
    },

    async updateLogisticOrderShippingInformations(
        orderLogisticId: string,
        shippingAddressId: string,
        shippingType: string,
    ) {
        const body = {
            shippingAddressId,
            shippingType,
        };
        const result = await Service(context.$axios)
            .order.APIUpdateOrderLogisticShippingInformations(
                orderLogisticId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: any }) => {
                return response.data;
            })
            .catch(() => {});
        return result;
    },

    updateLogisticOrderShippingAddress(orderLogisticId: string, shippingAddressId: string) {
        const body = {
            shippingAddressId,
        };
        const result = Service(context.$axios)
            .order.APIUpdateOrderLogisticShippingAddress(
                orderLogisticId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: any }) => {
                return response.data;
            })
            .catch(() => {});
        return result;
    },

    async updateLogisticOrderShippingType(orderLogisticId: string, shippingType: string) {
        const body = {
            shippingType,
        };
        const result = await Service(context.$axios)
            .order.APIUpdateOrderLogisticShippingType(
                orderLogisticId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: any }) => {
                return response.data;
            })
            .catch(() => {});
        return result;
    },

    async onHoldCommercialOrder(orderCommercialId: string) {
        const result = await Service(context.$axios)
            .order.APIOnHoldCommercialOrder(orderCommercialId, (context.$auth.strategy as TokenableScheme).token.get())
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => {
                throw error;
            });
        return result;
    },

    createCommercialOrder(orderCommercialId: string, body: object) {
        const result = Service(context.$axios)
            .order.APIcreateCommercialOrder(
                orderCommercialId,
                body,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: { data: any }) => {
                return response;
            })
            .catch((error: any) => {
                throw error;
            });
        return result;
    },

    createLogisticOrder(orderCommercialId: string) {
        const result = Service(context.$axios)
            .order.APIcreateLogisticOrder(orderCommercialId, (context.$auth.strategy as TokenableScheme).token.get())
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => {
                throw error;
            });
        return result;
    },

    cancelLogisticOrder(orderLogisticId: string, locale: string) {
        const result = Service(context.$axios)
            .order.APICancelLogisticOrder(
                orderLogisticId,
                locale,
                (context.$auth.strategy as TokenableScheme).token.get(),
            )
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => {
                throw error;
            });
        return result;
    },

    /**
     * @param {string} orderLogisticId
     */
    async getShippingTypes(orderLogisticId: string): Promise<any | void> {
        try {
            const response = await Service(context.$axios).order.APIGetShippingTypes(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
            );
            return response.data;
        } catch {}
    },

    async postOrderList(
        params: object,
        sort: string = '',
        size: number = 10,
        page: number = 0,
        nbPreviewLines: number = 100,
    ): Promise<any | void> {
        try {
            const response = await Service(context.$axios).order.APIPostOrderList(
                (context.$auth.strategy as TokenableScheme).token.get(),
                params,
                sort,
                size,
                page,
                nbPreviewLines,
            );

            return response.data;
        } catch (e) {}
    },

    async postOrderListRecursively(
        params: object,
        sort: string = '',
        size: number = 10,
        nbPreviewLines: number = 100,
    ): Promise<any | void> {
        try {
            const ordersResp = await this.postOrderList(params, sort, size, 0, nbPreviewLines);

            if (!ordersResp) return [];

            const { content, totalElements } = ordersResp;

            let ordersArray: any[] = content;

            if (size < totalElements) {
                const iteration = Math.floor(totalElements / size);

                const promises: Array<Promise<any>> = [];

                for (let index = 1; index < iteration + 1; index++) {
                    const promise = new Promise((resolve) => {
                        this.postOrderList(params, sort, size, index, nbPreviewLines).then((result) => resolve(result));
                    });

                    promises.push(promise);
                }

                for (const orders of await Promise.all(promises)) {
                    ordersArray = ordersArray.concat(orders.content);
                }
            }

            return ordersArray;
        } catch (e) {}
    },

    /**
     * @param {string} orderLogisticId
     * @param {object[]} lines
     */
    async updateOrderOnHoldLines(
        orderLogisticId: string,
        lines: {
            customFields: {
                customFieldId: string;
                customFieldValue: string;
            }[];
            id: string;
            quantity: string | number;
            updateAction: string;
        }[],
    ): Promise<OrderResponse.Order | void> {
        return await Service(context.$axios)
            .order.ApiUpdateOrderOnHoldLines(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
                lines,
            )
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },
    /**
     * @param {string} orderLogisticId
     * @param {string} orderLogisticLineId
     * @param {OrderRequest.CustomFieldData[]} customFieldData
     */
    async updateOrderOnHoldLogisticLineQuantity(
        orderLogisticId: string,
        orderLogisticLineId: string,
        quantity: number,
    ): Promise<OrderResponse.Order | void> {
        return await Service(context.$axios)
            .order.ApiUpdateOrderOnHoldLogisticLineQuantity(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
                orderLogisticLineId,
                quantity,
            )
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
    },

    /**
     * @param  {string} orderLogisticId
     * @param {object} body
     */
    async createOrderLinesIncident(orderLogisticId: string, body: object): Promise<any> {
        try {
            const { data } = await Service(context.$axios).order.ApiCreateOrderLinesIncident(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
                body,
            );

            return data;
        } catch {}
    },

    /**
     * @param  {array} params
     * @param {number} page
     * @param {number} size
     * @param {Array<string>} sort
     */
    async getIncidents(
        params: {
            linkedType?: string;
            ids?: Array<string>;
            status?: string;
        },
        page: number = 0,
        size: number = 10,
        sort: Array<string> = ['id,asc'],
    ): Promise<any> {
        try {
            const { data } = await Service(context.$axios).order.ApiGetIncidents(
                (context.$auth.strategy as TokenableScheme).token.get(),
                {
                    linkedType: params.linkedType ?? '',
                    ids: params.ids ?? [],
                    status: params.status ?? '',
                },
                {
                    page,
                    size,
                    sort,
                },
            );

            return data;
        } catch {}
    },

    /**
     * @param  {string} incidentId
     */
    async getIncident(incidentId: string): Promise<any> {
        try {
            const { data } = await Service(context.$axios).order.ApiGetIncident(
                (context.$auth.strategy as TokenableScheme).token.get(),
                incidentId,
            );

            return data;
        } catch {}
    },

    /**
     * @param  {string} orderLogisticId
     * @param  {string} incidentId
     * @param {object} body
     */
    async createOrderIncidentThread(orderLogisticId: string, incidentId: string, body: object): Promise<any> {
        try {
            const { data } = await Service(context.$axios).order.ApiCreateOrderIncidentThread(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
                incidentId,
                body,
            );

            return data;
        } catch {}
    },

    /**
     * @param  {string} orderLogisticId
     * @param  {string} incidentId
     * @param  {string} threadId
     */
    async getOrderIncidentThread(orderLogisticId: string, incidentId: string, threadId: string): Promise<any> {
        try {
            const { data } = await Service(context.$axios).order.ApiGetOrderIncidentThread(
                (context.$auth.strategy as TokenableScheme).token.get(),
                orderLogisticId,
                incidentId,
                threadId,
            );

            return data;
        } catch {}
    },

    /**
     * @param {string} commercialOrderId
     */
    async handleMangoPayCardRegistration(commercialOrderId: string): Promise<any | void> {
        return await Service(context.$axios)
            .order.APIMangoPayCartRegistration(
                (context.$auth.strategy as TokenableScheme).token.get(),
                commercialOrderId,
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Failed to fetch cardRegistration ->', error);
            });
    },

    handleMangoPayPreAuthorization(commercialOrderId: string, data: object): Promise<any | void> {
        return Service(context.$axios)
            .order.APIMangoPayPreAuthorization(
                (context.$auth.strategy as TokenableScheme).token.get(),
                commercialOrderId,
                data,
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Failed to fetch handleMangoPayPreAuthorization -> ', error);
            });
    },
});
