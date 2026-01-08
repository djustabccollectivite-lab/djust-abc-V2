import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import * as OrderResponse from '../interfaces/Order/IOrderResponse';
import * as OrderRequest from '../interfaces/Order/IOrderRequest';

export default (axios: NuxtAxiosInstance) => ({
    /**
     * Function APIgetOrderList
     * Get all logistic orders paginated (with & without incident)
     *  API CODE: ORDER-550
     *
     * @param  {string | boolean} jwt
     * @param  {string} locale
     * @param  {number} size
     * @param  {number} page
     */
    APIgetOrderList(jwt: string | boolean, locale: string, size: number = 100, page: number = 0) {
        return axios.get<OrderResponse.OrderList>(
            `/v1/shop/logistic-orders?locale=${locale}&sort=created_at,desc&size=${size}&page=${page}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function APIgetOrderListByCustomerAccountIds
     * Get all logistic orders paginated and filtered by customerAccountIds (with & without incident)
     * API CODE: ORDER-550
     *
     * @param  {string | boolean} jwt
     * @param  {string} locale
     * @param  {number} size
     * @param  {number} page
     * @param  {string[] | string} customerAccountIds
     * @param  {boolean} connectedUserOnly
     * @param  {number} nbPreviewLines
     */
    APIgetOrderListByCustomerAccountIds(
        jwt: string | boolean,
        locale: string,
        size: number = 100,
        page: number = 0,
        customerAccountIds: string[] | string = [],
        connectedUserOnly: boolean = false,
        nbPreviewLines: number = 100,
    ) {
        if (Array.isArray(customerAccountIds)) {
            customerAccountIds = customerAccountIds.join(',');
        }

        return axios.get<OrderResponse.OrderList>(
            `/v1/shop/logistic-orders?locale=${locale}&sort=created_at,desc&size=${size}&page=${page}&customerAccountIds=${customerAccountIds}&connectedUserOnly=${connectedUserOnly}&nbPreviewLines=${nbPreviewLines}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function APIgetOrderbyid
     * Get Order logisitic by id
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderId
     * @param  {string} locale
     */
    APIgetOrderbyid(jwt: string | boolean, orderId: string, locale: string) {
        return axios.get<OrderResponse.Order>(`/v1/shop/logistic-orders/${orderId}?locale=${locale}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIgetCommercialOrderbyid
     * Get Order commercial by id
     *
     * @param  {string | boolean} jwt
     * @param  {string} commercialOrderId
     * @param  {string} idType
     * @param  {string} locale
     */
    APIgetCommercialOrderbyid(jwt: string | boolean, commercialOrderId: string, request: object) {
        return axios.get<OrderResponse.Order>(`/v1/shop/commercial-orders/${commercialOrderId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: request,
        });
    },

    /**
     * Function APIrefuseOrder
     * Disapprove logistic order
     *
     * @param  {string} orderId
     * @param  {string} locale
     * @param  {string | boolean} jwt
     */
    APIrefuseOrder(orderId: string, locale: string, jwt: string | boolean) {
        return axios.put<OrderResponse.Order>(`/v1/shop/logistic-orders/${orderId}/disapprove?locale=${locale}`, null, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIgetOrderListWithIncident
     * Get all order logistic with incident
     *
     * @param  {string | boolean} jwt
     * @param  {string} locale
     */
    APIgetOrderListWithIncident(jwt: string | boolean, locale: string, sort: string[] = []) {
        return axios.get<OrderResponse.OrderList>(`/v1/shop/logistic-orders?locale=${locale}&incident=true`, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: {
                sort: sort.join(','),
            },
        });
    },

    /**
     * Function APIconfirmOrderDelivery
     * Confirm reception of logistic order
     *
     * @param  {string} orderId
     * @param  {string} locale
     * @param  {string | boolean} jwt
     */
    APIconfirmOrderDelivery(orderId: string, locale: string, jwt: string | boolean) {
        return axios.put<OrderResponse.Order>(
            `/v1/shop/logistic-orders/${orderId}/confirm-reception?locale=${locale}`,
            null,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function APIvalidateOrder
     * Approve logistic order
     *
     * @param  {string} orderId
     * @param  {string} locale
     * @param  {string | boolean} jwt
     */
    APIvalidateOrder(orderId: string, locale: string, jwt: string | boolean) {
        return axios.put<OrderResponse.Order>(`/v1/shop/logistic-orders/${orderId}/approve?locale=${locale}`, null, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIgetAllOrderDocument (ORDER-552)
     * Download the Order documents (all)
     *
     * @param  {string} orderLogisticId
     * @param  {string | boolean} jwt
     */
    APIgetAllOrderDocument(orderLogisticId: string, jwt: string | boolean) {
        return axios.get<OrderResponse.Document[]>(`/v1/shop/logistic-orders/${orderLogisticId}/documents`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIdownloadDocument (ORDER_508)
     * Confirm reception of logistic order
     *
     * @param  {string} orderLogisticId
     * @param  {string} documentId
     * @param  {string | boolean} jwt
     */
    APIdownloadDocumentByID(orderLogisticId: string, documentId: string, jwt: string | boolean) {
        return axios.get<Blob>(`/v1/shop/logistic-orders/${orderLogisticId}/documents/${documentId}`, {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIorderCreateReview
     * Confirm reception of logistic order
     *
     * @param  {string} orderId
     * @param  {string} review
     * @param  {string | boolean} jwt
     */
    APIorderCreateReview(orderId: string, review: string, jwt: string | boolean) {
        return axios.put<OrderResponse.Review>(`/v1/shop/rating-orders/${orderId}`, review, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIgetOrderApprovers
     * Confirm reception of logistic order
     *
     */
    APIgetOrderApprovers(orderId: string, jwt: string | boolean) {
        return axios.get<any>(`/v1/shop/logistic-orders/${orderId}/approvers`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIallSubReasonTypes
     * Get the main reason types
     *
     * @param  {OrderRequest.Thread} thread
     * @param  {string} orderLogisticId
     * @param  {string | boolean} jwt
     */
    APICreateOrderClaim(thread: OrderRequest.Thread, orderLogisticId: string, jwt: string | boolean) {
        return axios.post<void>(`/v1/shop/logistic-orders/${orderLogisticId}/threads`, thread, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIallContactTypes
     * Get the main reason types
     *
     * @param  {string | boolean} jwt
     */
    APIgetAllReasonTypes(jwt: string | boolean) {
        return axios.get<OrderResponse.ReasonType[]>('/v1/shop/threads/reason-types/', {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIallSubReasonTypes
     * Get the main reason types
     *
     * @param  {OrderRequest.ReasonType} OrderReasonTypeRequest
     * @param  {string | boolean} jwt
     */
    APIgetAllSubReasonTypes(reasonType: OrderRequest.ReasonType, jwt: string | boolean) {
        return axios.get<OrderResponse.Subreason[]>(`/v1/shop/threads/reason-types/${reasonType}/sub-reasons`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateOrderLogisticSBillingInformations
     * Get the main reason types
     *
     * @param  {any} orderId
     * @param  {any} jwt
     */
    APIUpdateOrderLogisticBillingInformations(orderLogisticId: string, body: object, jwt: string | boolean) {
        return axios.put('/v1/shop/logistic-orders/' + orderLogisticId + '/billing-information?locale=FR', body, {
            headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
        });
    },

    /**
     * Function APIUpdateOrderCommercialBillingInformations
     * Get the main reason types
     *
     * @param  {any} orderCommercialId
     * @param  {any} jwt
     */
    APIUpdateOrderCommercialBillingInformations(orderCommercialId: string, body: object, jwt: string | boolean) {
        return axios.put('/v1/shop/commercial-orders/' + orderCommercialId + '/billing-information?locale=FR', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateOrderCommercialShippingInformations
     * Get the main reason types
     *
     * @param  {any} orderCommercialId
     * @param  {any} jwt
     */
    APIUpdateOrderCommercialShippingInformations(
        orderCommercialId: string,
        params: {
            shippingAddressId: string;
            shippingType: string;
        },
        jwt: string | boolean,
    ) {
        const body = params;
        if (!Object.keys(body).includes('shippingType') || !body.shippingType) {
            body.shippingType = 'STD';
        }
        return axios.put('/v1/shop/commercial-orders/' + orderCommercialId + '/shipping-information', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateOrderCommercialShippingAddress
     * Get the main reason types
     *
     * @param  {any} orderCommercialId
     * @param  {any} jwt
     */
    APIUpdateOrderCommercialShippingAddress(orderCommercialId: string, body: object, jwt: string | boolean) {
        return axios.put('/v1/shop/commercial-orders/' + orderCommercialId + '/shipping-address?locale=FR', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },
    /**
     * Function APIUpdateOrderLogisticShippingInformations
     * Get the main reason types
     *
     * @param  {any} orderId
     * @param  {any} jwt
     */
    APIUpdateOrderLogisticShippingInformations(orderLogisticId: string, body: any, jwt: string | boolean) {
        return axios.put('/v1/shop/logistic-orders/' + orderLogisticId + '/shipping-information?locale=FR', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateOrderLogisticShippingAddress
     * Get the main reason types
     *
     * @param  {any} orderLogisticId
     * @param  {any} jwt
     */
    APIUpdateOrderLogisticShippingAddress(orderLogisticId: string, body: object, jwt: string | boolean) {
        return axios.put('/v1/shop/logistic-orders/' + orderLogisticId + '/shipping-address', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateOrderLogisticShippingType
     * Get the main reason types
     *
     * @param  {any} orderLogisticId
     * @param  {any} jwt
     */
    APIUpdateOrderLogisticShippingType(orderLogisticId: string, body: object, jwt: string | boolean) {
        return axios.put('/v1/shop/logistic-orders/' + orderLogisticId + '/shipping-type', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIOnHoldCommercialOrder
     * Get the main reason types
     *
     * @param  {any} orderCommercialId
     * @param  {any} jwt
     */
    APIOnHoldCommercialOrder(orderCommercialId: string, jwt: string | boolean) {
        return axios.put('/v1/shop/commercial-orders/' + orderCommercialId + '/hold', null, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIcreateCommercialOrder
     * Get the main reason types
     *
     * @param  {any} orderCommercialId
     * @param  {any} body
     * @param  {any} jwt
     */
    APIcreateCommercialOrder(orderCommercialId: string, body: object, jwt: string | boolean) {
        return axios.put('/v1/shop/commercial-orders/' + orderCommercialId + '/created', body, {
            headers: { Authorization: `Bearer ${jwt}`, 'content-type': 'application/json' },
        });
    },

    /**
     * Function APIcreateCommercialOrder
     * Get the main reason types
     *
     * @param  {any} orderCommercialId
     * @param  {any} body
     * @param  {any} jwt
     */
    APIcreateLogisticOrder(orderLogisticId: string, jwt: string | boolean) {
        return axios.put(`/v1/shop/logistic-orders/${orderLogisticId}/created`, {
            headers: { Authorization: `Bearer ${jwt}`, 'content-type': 'application/json' },
        });
    },

    /**
     * Function APICancelLogisticOrder
     * Get the main reason types
     *
     * @param  {string} orderLogisticId
     * @param  {any} locale
     * @param  {any} jwt
     */
    APICancelLogisticOrder(orderLogisticId: string, locale: string, jwt: string | boolean) {
        return axios.put(`/v1/shop/logistic-orders/${orderLogisticId}/cancel?locale=${locale}`, {
            headers: { Authorization: `Bearer ${jwt}`, 'content-type': 'application/json' },
        });
    },

    /**
     * Function APIallSubReasonTypes
     * Get the main reason types
     *
     * @param  {any} orderId
     * @param  {any} jwt
     */
    APIOrderLogisticValidation(jwt: string | boolean, orderLogisticId: string) {
        return axios.put('/v1/shop/logistic-orders/' + orderLogisticId + '/hold', null, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function ApiPaymentCreditCardURL Credit Card
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderId
     * @param  {string} paymentOption
     * @param  {string} paymentProvider
     */
    ApiPaymentCreditCardURL(jwt: string | boolean, orderId: string, paymentOption: string, paymentProvider: string) {
        return axios.get<string>(
            `/v1/shop/commercial-orders/${orderId}/payment-page?paymentOption=${paymentOption}&paymentProvider=${paymentProvider}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function ApiUpdateLogisticOrderCustomFields
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     * @param  {OrderRequest.CustomFieldData[]} customFieldData
     */
    ApiUpdateLogisticOrderCustomFields(
        jwt: string | boolean,
        orderLogisticId: string,
        customFieldData: OrderRequest.CustomFieldData[],
    ) {
        return axios.patch<OrderResponse.Order>(`/v1/shop/logistic-orders/${orderLogisticId}`, customFieldData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function ApiUpdateOrderLogisticLineCustomFields
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     * @param {string} orderLogisticLineId
     * @param  {OrderRequest.CustomFieldData[]} customFieldData
     */
    ApiUpdateOrderLogisticLineCustomFields(
        jwt: string | boolean,
        orderLogisticId: string,
        orderLogisticLineId: string,
        customFieldData: OrderRequest.CustomFieldData[],
    ) {
        return axios.patch<OrderResponse.Order>(
            `/v1/shop/logistic-orders/${orderLogisticId}/lines/${orderLogisticLineId}`,
            customFieldData,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function Api Convert to cxml
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderId
     */
    ApiConvertToCxml(jwt: string | boolean, orderId: string) {
        return axios.get<string>(`/cxml/orders/${orderId}/to-cxml`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * API Function: Converts to CXML PUNCHOUT format
     *
     * @param {string} jwt
     * @param {Object} params - The parameters required for the API call.
     * @param {string} params.tenantId - The ID of the tenant.
     * @param {string} params.tenantConfigId - The configuration ID of the tenant.
     * @param {string} params.commercialBusinessId - The ID of the commercial business.
     * @param {string} params.buyerCookie - The buyer's cookie.
     * @param {string} params.locale - The locale for the API request.
     * @returns {Promise<string>} - CXML response as a string.
     */
    ApiPunchOutConvertToCxml(jwt: string | boolean, params: OrderRequest.PunchoutRequest) {
        return axios.get<string>(
            `/cxml/punchout/${params.tenantId}-${params.tenantConfigId}/commercial-orders/${params.commercialBusinessId}/cxml?buyerCookie=${params.buyerCookie}&locale=${params.locale}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            },
        );
    },

    /**
     * @param {OrderRequest.CreateOrder} params
     * @param {string | boolean} jwt
     */
    APIcreateOrder(params: OrderRequest.CreateOrder, jwt: string | boolean) {
        return axios.post<OrderResponse.CreateOrder>('/v1/shop/commercial-orders', params, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIGetShippingTypes
     * Get Shipping Types for Orders by OrderLogisticId
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     */
    APIGetShippingTypes(jwt: string | boolean, orderLogisticId: string) {
        return axios.get<string>(`/v1/shop/logistic-orders/${orderLogisticId}/shipping-information`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    APIGetOrdersLines(
        jwt: string | boolean,
        orderLogisticId: string,
        size: number = 10,
        page: number = 0,
        sort: string[] = [],
    ) {
        return axios.get<any>(
            `/v1/shop/logistic-orders/${orderLogisticId}/lines?size=${size}&page=${page}&sort=${sort.toString()}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },
    /**
     * Function APIgetOrderList
     * Get all logistic orders paginated ( with & without incident)
     *
     * @param  {string | boolean} jwt
     * @param  {string} locale
     */
    APIPostOrderList(
        jwt: string | boolean,
        params: Object,
        sort: string = '',
        size: number = 10,
        page: number = 0,
        nbPreviewLines: number = 100,
    ) {
        return axios.post<OrderResponse.OrderList>(
            `/v1/shop/logistic-orders?nbPreviewLines=${nbPreviewLines}&size=${size}&page=${page}&sort=${sort}`,
            params,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function ApiUpdateOrderOnHoldLines
     * CODE API: ORDER-250
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     * @param  {object[]} lines
     */
    ApiUpdateOrderOnHoldLines(
        jwt: string | boolean,
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
    ) {
        return axios.put<OrderResponse.Order>(
            `/v1/shop/logistic-orders/${orderLogisticId}/lines/`,
            { lines },
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function ApiUpdateOrderOnHoldLogisticLineQuantity
     * CODE API: ORDER-218
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     * @param {string} orderLogisticLineId
     * @param  {number} quantity
     */
    ApiUpdateOrderOnHoldLogisticLineQuantity(
        jwt: string | boolean,
        orderLogisticId: string,
        orderLogisticLineId: string,
        quantity: number,
    ) {
        return axios.put<OrderResponse.Order>(
            `/v1/shop/logistic-orders/${orderLogisticId}/lines/${orderLogisticLineId}`,
            { quantity },
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function ApiCreateOrderLinesIncident
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     * @param {object} body
     */
    ApiCreateOrderLinesIncident(jwt: string | boolean, orderLogisticId: string, body: object) {
        return axios.post<any>(`/v1/shop/logistic-orders/${orderLogisticId}/lines/incidents`, body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function ApiGetIncidents
     * API CODE: ORDER-503
     *
     * @param  {string | boolean} jwt
     * @param {object} pageable
     */
    ApiGetIncidents(
        jwt: string | boolean,
        params: {
            linkedType: string;
            ids?: Array<string>;
            status?: string;
        },
        pageable: {
            page: number;
            size: number;
            sort: Array<string>;
        },
    ) {
        const { page, size, sort } = pageable;

        return axios.get<any>(
            `/v1/shop/incidents?linkedType=${params.linkedType}&ids=${params.ids}&status=${params.status}&page=${page}&size=${size}&sort=${sort}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function ApiGetIncident
     * API CODE: ORDER-559
     *
     * @param  {string | boolean} jwt
     * @param  {string} incidentId
     */
    ApiGetIncident(jwt: string | boolean, incidentId: string) {
        return axios.get<any>(`/v1/shop/incidents/${incidentId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function ApiCreateOrderIncidentThread
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     * @param  {string} incidentId
     * @param {object} body
     */
    ApiCreateOrderIncidentThread(jwt: string | boolean, orderLogisticId: string, incidentId: string, body: object) {
        return axios.post<any>(`/v2/shop/logistic-orders/${orderLogisticId}/incidents/${incidentId}/threads`, body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function ApiGetOrderIncidentThread
     *
     * @param  {string | boolean} jwt
     * @param  {string} orderLogisticId
     * @param  {string} incidentId
     * @param  {string} threadId
     */
    ApiGetOrderIncidentThread(jwt: string | boolean, orderLogisticId: string, incidentId: string, threadId: string) {
        return axios.get<any>(
            `/v2/shop/logistic-orders/${orderLogisticId}/incidents/${incidentId}/threads/${threadId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function APIMangoPayCartRegistration
     * Mangopay Card Registration API
     *
     * @param  {string | boolean} jwt
     * @param  {string} commercialOrderId
     */
    APIMangoPayCartRegistration(jwt: string | boolean, commercialOrderId: string) {
        return axios.post<any>(
            `/v1/shop/commercial-orders/${commercialOrderId}/card-registration?paymentProvider=MANGOPAY&currency=EUR`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function APIMangoPayPreAuthorization
     * Mangopay Pre Authorization API
     *
     * @param  {string | boolean} jwt
     * @param  {string} commercialOrderId
     * @param  {object} data
     */
    APIMangoPayPreAuthorization(jwt: string | boolean, commercialOrderId: string, data: any) {
        return axios.post<any>(
            `/v1/shop/commercial-orders/${commercialOrderId}/preauthorization?paymentProvider=MANGOPAY`,
            data,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },
});
