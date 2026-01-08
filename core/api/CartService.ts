import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Locale } from '../interfaces/IUser';
import { CartLineResponse, FastCartResponse } from '../interfaces/Cart/IReponseCart';
import { RequestUpdateCartLine, RequestCartBillingAddress } from '../interfaces/Cart/IRequestCart';

export default (axios: NuxtAxiosInstance) => ({
    /**
     * Function APIgetCartDetail
     * Get the basket of specified user
     *
     * @param  {string | boolean} jwt
     * @param  {Locale} lang
     */
    APIgetCartDetail(jwt: string | boolean, lang: Locale) {
        return axios.get<CartLineResponse>('/v1/shop/carts', {
            headers: { Authorization: `Bearer ${jwt}` },
            params: lang,
        });
    },

    /**
     * Function APIcreateCart
     * Create empty basket for one user
     *
     * @param  {string | boolean} jwt
     * @param  {Locale} lang
     */
    APIcreateCart(jwt: string | boolean, lang: Locale) {
        return axios.post<CartLineResponse>('/v1/shop/carts', null, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: lang,
        });
    },

    /**
     * Function APIdeteleCart
     * Delete basket for one user
     *
     * @param  {string | boolean} jwt
     */
    APIdeteleCart(jwt: string | boolean) {
        return axios.delete<string>('/v1/shop/carts', { headers: { Authorization: `Bearer ${jwt}` } });
    },

    /**
     * Function APIputCartLine
     * Add or update offer with quantity in basket
     *
     * @param  {string} cartId
     * @param  {RequestUpdateCartLine[]} data
     * @param  {string | boolean} jwt
     * @param  {Locale} lang
     */
    APIputCartLine(cartId: string, data: RequestUpdateCartLine[], jwt: string | boolean, lang: Locale) {
        return axios.put<CartLineResponse>(`/v1/shop/carts/${cartId}/lines`, data, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: lang,
        });
    },

    /**
     * Function APIdeleteCartLine
     * Delete line with offer in basket
     * Can't test it for now.
     *
     * @param  {string} cartId
     * @param  {string[]} linesID
     * @param  {string | boolean} jwt
     * @param  {string} locale
     */
    APIdeleteCartLine(cartId: string, linesID: string[], jwt: string | boolean, locale: string) {
        return axios.delete<string>(`/v1/shop/carts/${cartId}/lines?local=${locale}&offerPriceIds=${linesID}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIputBillingAddress
     * Set or Update billing address for this basket
     *
     * @param  {string} cartId
     * @param  {RequestCartBillingAddress} billingAddress
     * @param  {string | boolean} jwt
     * @param  {string} locale
     */
    APIputBillingAddress(
        cartId: string,
        billingAddress: RequestCartBillingAddress,
        jwt: string | boolean,
        locale: string,
    ) {
        return axios.put<CartLineResponse>(`/v1/shop/carts/${cartId}?local=${locale}`, billingAddress, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    // ************ FAST CART API ****************

    /**
     * Function APIgetCartStatus
     * Get cart import processing progress
     * CART-551
     *
     * @param  {string | boolean} jwt
     */
    APIgetCartStatus(jwt: string | boolean) {
        return axios.get<FastCartResponse>('/v1/shop/carts/import', { headers: { Authorization: `Bearer ${jwt}` } });
    },

    /**
     * Function APIgetCartStatus
     * Get cart import error report
     * CART-506
     *
     * @param  {string | boolean} jwt
     */
    APIgetCartErrorReport(jwt: string | boolean) {
        return axios.get<string[]>('/v1/shop/carts/import/error-report', {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUploadCartFile
     * Import cart from uploaded file. This operation will delete any already existing cart for the connected user.
     * CART-101
     *
     * @param  {string | boolean} jwt
     */
    APIUploadCartFile(jwt: string | boolean, file: File) {
        let data = new FormData();
        data.append('file', file);
        return axios.post<FastCartResponse>('/v1/shop/carts/import', data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    // ************ NEW CART V2 API ****************

    /**
     * Function APICreateCartV2
     * Create a new cart for the user
     * CART-100
     *
     */
    APICreateNewCart_B2B(body: { name: String }, jwt: String) {
        return axios.post('/v2/shop/carts', body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIGetCartstV2
     * Retrieve paginated carts in context
     * CART-550
     *
     */
    APIGetCartsList_B2B(jwt: String, currency: string, status: string[], type: string[], size: number = 20) {
        return axios.get(`/v2/shop/carts?currency=${currency}&status=${status}&type=${type}&size=${size}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIGetCartstV2
     * Retrieve paginated carts in context
     * CART-550
     *
     */
    APIGetPaginatedCartsList_B2B(
        jwt: String,
        currency: String,
        status: String[],
        type: String[],
        page: number,
        size: number,
    ) {
        return axios.get(
            `/v2/shop/carts?currency=${currency}&status=${status}&type=${type}&page=${page}&size=${size}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function APIUpdateCartV2
     * Update a Cart
     * CART-200
     *
     */
    APIUpdateCart_B2B(cartId: String, data: String, jwt: String) {
        return axios.put('/v2/shop/carts/' + cartId, data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIGetCartV2
     * Retrieve one Cart
     * CART-500
     *
     */
    APIGetCart_B2B(cartId: String, currency: String, jwt: String) {
        return axios.get('/v2/shop/carts/' + cartId + '?currency=' + currency, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIDeleteCartV2
     * Delete one Cart
     * CART-300
     *
     */
    APIDeleteCart_B2B(cartId: String, jwt: String) {
        return axios.delete('/v2/shop/carts/' + cartId, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIDeleteAllCartsV2
     * Delete all Carts
     * CART-351
     *
     */
    APIDeleteAllCarts_B2B(jwt: String) {
        return axios.delete('/v2/shop/carts/', {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateCartV2
     * Update a Cart
     * CART-200
     *
     */
    APIUpdateCartLine_B2B(
        data: { offerPriceId: String; quantity: Number; updateAction: String }[],
        cartId: String,
        jwt: String,
    ) {
        return axios.put('/v2/shop/carts/' + cartId + '/lines', data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateCartV2
     * Update a Cart
     * CART-200
     *
     */
    APIDeleteCartLine_B2B(data: { offerPriceId: String }[], cartId: String, jwt: String) {
        return axios.delete('/v2/shop/carts/' + cartId + '/lines', {
            data: data,
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateCartV2
     * Update a Cart
     * CART-200
     *
     */
    APIGetCartDetailProducts_B2B(cartId: String, request: object, jwt: String) {
        return axios.get('/v2/shop/carts/' + cartId + '/lines', {
            params: request,
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIUpdateCartV2
     * Update a Cart
     * CART-200
     *
     */
    APIInitializeOrderFromCart_B2B(cartId: String, jwt: String) {
        return axios.post('/v2/shop/carts/' + cartId + '/initialize-orders', {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },
});
