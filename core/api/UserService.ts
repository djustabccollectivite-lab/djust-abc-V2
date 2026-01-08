interface QueryCustomerAccountOrders {
    pageable: {
        page: number;
        size: number;
        sort: string;
    };
    page?: number;
    size?: number;
    sort?: string;
    locale: string;
    /**
     * @deprecated
     * REPLACED BY logisticOrderStatuses
     */
    orderLogisticStatusType?: string;
    logisticOrderStatuses?: Array<string>;
    nbPreviewLines?: number;
}

export default (axios: any) => ({
    /**
     * Function getUSerAddress
     * Retrieve shipping or billing addresses of customer account
     *
     * @param  {any} type
     * @param  {any} jwt
     */
    getUSerAddress(type: any, jwt: any) {
        return axios.get('/v1/shop/customer-accounts/addresses?' + type + '=true', {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APICreateAddress
     * Create new address
     *
     * @param  {any} request
     * @param  {any} jwt
     */
    APICreateAddress(request: any, jwt: any) {
        return axios.post('/v1/shop/customer-accounts/addresses', request, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function validation de compte
     *
     * @param {any} token
     */
    APIValidationAccount(token: any) {
        return axios.post(
            '/v1/shop/customer-users/activate',
            { token },
            { headers: { 'Content-Type': 'application/json' } },
        );
    },

    /**
     * Function validation de compte
     *
     * @param {any}
     */
    APIResendValidationAccountRequest(request: any) {
        return axios.post('/v1/shop/customer-users/resend-activation-request', request, {
            headers: { 'Content-Type': 'application/json' },
        });
    },

    /**
     * Function APICreateCustomerAccount
     *
     * @param  {any} data
     */
    APICreateCustomerAccount(data: any) {
        return axios.post('/v1/shop/customer-accounts', data);
    },

    /**
     * Function APIEditAddress
     * Update existing address
     *
     * @param  {any} addressId
     * @param  {any} request
     * @param  {any} jwt
     */
    APIEditAddress(addressId: any, request: any, jwt: any) {
        return axios.put('/v1/shop/customer-accounts/addresses/' + addressId, request, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIDeleteAddress
     * Delete address
     *
     * @param  {any} addressId
     * @param  {any} jwt
     */
    APIDeleteAddress(addressId: any, jwt: any) {
        return axios.delete('/v1/shop/customer-accounts/addresses/' + addressId, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIPutUser
     * Update user information
     *
     * @param {any} jwt
     */
    APIPutUser(request: any, jwt: any) {
        return axios.put('/v1/shop/customer-users', request, { headers: { Authorization: `Bearer ${jwt}` } });
    },

    /**
     * Function APIPutUser
     * Update user information
     *
     * @param {any} jwt
     */
    APIGetCustomerAccount(jwt: any) {
        return axios.get('/v1/shop/customer-accounts', { headers: { Authorization: `Bearer ${jwt}` } });
    },

    /**
     *
     * @param jwt
     * @param params
     * @constructor
     */
    APIGetCustomerAccountOrders(jwt: any, params: QueryCustomerAccountOrders) {
        const page = params.pageable.page;
        const size = params.pageable.size;
        const sort = params.pageable.sort;

        return axios.get(
            `/v1/shop/customer-accounts/orders?locale=${params.locale}&page=${page}&size=${size}&sort=${sort}&orderLogisticStatusType=${params.orderLogisticStatusType ?? ''}&logisticOrderStatuses=${params.logisticOrderStatuses ?? ''}&nbPreviewLines=${params.nbPreviewLines ?? 100}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     *
     * @param jwt
     * @param params
     * @constructor
     */
    APIGetCustomerAccountOrdersByAccountId(jwt: any, params: QueryCustomerAccountOrders, customerAccountId: string) {
        const page = params.pageable.page;
        const size = params.pageable.size;
        const sort = params.pageable.sort;

        return axios.get(
            `/v1/shop/customer-accounts/orders?locale=${params.locale}&page=${page}&size=${size}&sort=${sort}&orderLogisticStatusType=${params.orderLogisticStatusType ?? ''}&logisticOrderStatuses=${params.logisticOrderStatuses ?? ''}&nbPreviewLines=${params.nbPreviewLines ?? 100}`,
            {
                headers: { Authorization: `Bearer ${jwt}`, 'customer-account-id': customerAccountId },
            },
        );
    },

    /**
     * Function APIPutUser
     * Update user information
     *
     * @param {any} jwt
     */
    APIGetCustomerAccountById(jwt: any, customerAccountId: any) {
        return axios.get('/v1/shop/customer-accounts', {
            headers: { Authorization: `Bearer ${jwt}`, 'customer-account-id': customerAccountId },
        });
    },

    APIPutCustomer(request: any, jwt: any) {
        return axios.put('/v1/shop/customer-accounts', request, { headers: { Authorization: `Bearer ${jwt}` } });
    },

    APICreateUserOrganisation(request: any, jwt: any) {
        return axios.post('/v1/shop/customer-users', request, { headers: { Authorization: `Bearer ${jwt}` } });
    },

    APIPutCustomerUserOrganisation(request: any, organisationID: any, customerUserID: any, jwt: any) {
        return axios.put(
            '/v1/shop/customer-accounts/organisations/' + organisationID + '/users/' + customerUserID,
            request,
            { headers: { Authorization: `Bearer ${jwt}` } },
        );
    },

    APIGetUserInAccount(params: any, jwt: any, accountId?: string) {
        const headers = { Authorization: `Bearer ${jwt}` };
        if (accountId) {
            headers['customer-account-id'] = accountId;
        }
        return axios.get('/v1/shop/customer-accounts/users', {
            headers,
            params,
        });
    },

    APIGetOrga(jwt: any) {
        return axios.get('/v1/shop/customer-users/organisations', { headers: { Authorization: `Bearer ${jwt}` } });
    },

    APIGetUserInOrga(organisationId, jwt: any, accountId?: string) {
        const headers = { Authorization: `Bearer ${jwt}` };
        if (accountId) {
            headers['customer-account-id'] = accountId;
        }
        return axios.get('/v1/shop/customer-accounts/organisations/' + organisationId + '/users', {
            headers,
        });
    },

    APIGetOrdersInOrga(organisationId, params, jwt: any) {
        return axios.get('/v1/shop/customer-accounts/organisations/' + organisationId + '/orders', {
            headers: { Authorization: `Bearer ${jwt}` },
            params: {
                ...params,
            },
        });
    },

    APIPostOrganisation(request, jwt: any) {
        return axios.post('/v1/shop/customer-accounts/organisations', request, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    APIPutOrgaName(organisationId, request, jwt: any) {
        return axios.put(`/v1/shop/customer-accounts/organisations/${organisationId}`, request, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Get settings for Front Office
     */
    APIGetSettings() {
        return axios.get('v1/shop/settings', null);
    },

    APIPostMediaCf(
        cfId: string,
        value: {
            fileName: string;
            fileSize: number;
            customFieldIdType?: 'BUSINESS_ID' | 'EXTERNAL_ID';
            sealedTarget?:
                | 'OFFER'
                | 'ACCOUNT'
                | 'NAVIGATION_CATEGORY'
                | 'SUPPLIER'
                | 'CUSTOMER_USER'
                | 'CUSTOMER_ORGANISATION'
                | 'ORDER_LOGISTIC'
                | 'ORDER_LOGISTIC_LINE'
                | 'QUOTE'
                | 'QUOTE_LINE'
                | 'ORDER_INCIDENT';
        },
        jwt: any,
    ) {
        return axios.post(`/v1/shop/custom-fields/${cfId}/media`, null, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: {
                ...value,
            },
        });
    },

    /**
     * Get CF of Account
     */
    APIGetAccountCf() {
        return axios.get('/v1/shop/customer-accounts/custom-fields');
    },
    APIGetCustomFields(sealedTarget: string, status: string, type: string, size: number) {
        return axios.get('/v1/shop/custom-fields', {
            params: {
                sealedTarget,
                status,
                type,
                size,
            },
        });
    },
    APIGetOrganisationAddresses(organisationId: string) {
        return axios.get(`/v1/shop/customer-accounts/organisations/${organisationId}/addresses`);
    },
    APIGetAccountAddresses() {
        return axios.get(`/v1/shop/customer-accounts/addresses`);
    },
});
