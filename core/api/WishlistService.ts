import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Locale } from '../interfaces/IUser';
import * as BuyingListRequest from '../interfaces/BuyingList/IRequestBuyingList';
import { BuyingListResponse } from '../interfaces/BuyingList/IResponseBuyingList';

export default (axios: NuxtAxiosInstance) => ({
    /**
     * Function APIgetBuyingList
     * Fetch Buying Lists of user
     *
     * @param  {string | boolean} jwt
     * @param  {Locale} language
     */
    APIgetBuyingList(jwt: string | boolean, language: Locale) {
        return axios.get<BuyingListResponse[]>('/v1/shop/buying-lists', {
            headers: { Authorization: `Bearer ${jwt}`, client: 'ACCOUNT', 'dj-client': 'ACCOUNT' },
            params: language,
        });
    },

    /**
     * Function APIgetBuyingListPaginate
     * Fetch Buying Lists of user with pagination
     *
     * @param  {string | boolean} jwt
     * @param  {Locale} language
     * @param  {number} page
     * @param  {number} size
     * @param  {string} sort
     */
    APIgetBuyingListPaginate(
        jwt: string | boolean,
        language: Locale,
        page: number = 0,
        size: number = 10,
        sort: string = '',
    ) {
        return axios.get(`/v2/shop/buying-lists?page=${page}&size=${size}&sort=${sort}`, {
            headers: { Authorization: `Bearer ${jwt}`, client: 'ACCOUNT', 'dj-client': 'ACCOUNT' },
            params: language,
        });
    },

    /**
     * Function APIcreateBuyingList
     * Create a new buying List
     *
     * @param  {string} name
     * @param  {string | boolean} jwt
     * @param  {Locale} language
     */
    APIcreateBuyingList(name: string, jwt: string | boolean, language: Locale) {
        return axios.post<BuyingListResponse>(
            '/v1/shop/buying-lists',
            { name },
            { headers: { Authorization: `Bearer ${jwt}` }, params: language },
        );
    },

    /**
     * Function APIupdateBuyingList
     * Update buying List
     *
     * @param  {string} name
     * @param  {string | boolean} jwt
     * @param  {Locale} language
     */
    APIupdateBuyingList(buyingListId: string, name: string, jwt: string | boolean, language: Locale) {
        return axios.put<BuyingListResponse>(
            '/v1/shop/buying-lists/' + buyingListId,
            { name },
            { headers: { Authorization: `Bearer ${jwt}` }, params: language },
        );
    },

    /**
     * Function APIputBuyingList
     * Add or Update Buying List Items
     *
     * @param  {BuyingListRequest.IParamBuyingListItemRequest} productToAdd
     * @param  {string | boolean} jwt
     * @param  {Locale} language
     */
    APIputBuyingList(productToAdd: BuyingListRequest.BuyingListItemRequest, jwt: string | boolean, language: object) {
        const buyingListId: string = productToAdd.buyingListtId;
        const buyingListItem: BuyingListRequest.PutBuyingListItemRequest[] = productToAdd.data;
        return axios.put<BuyingListResponse>(`/v1/shop/buying-lists/${buyingListId}/items`, buyingListItem, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: language,
        });
    },

    /**
     * Function APIdeleteBuyingList
     * Delete a buying list by id
     *
     * @param  {string} buyingListtId
     * @param  {string | boolean} jwt
     */
    APIdeleteBuyingList(buyingListtId: string, jwt: string | boolean): any {
        return axios.delete(`/v1/shop/buying-lists/${buyingListtId}`, { headers: { Authorization: `Bearer ${jwt}` } });
    },

    /**
     * Function APIdeleteBuyingListItems
     * Delete buying List items
     *
     * @param  {BuyingListRequest.DeleteBuyingListItem} productToRemove
     * @param  {string | boolean} jwt
     */
    APIdeleteBuyingListItems(productToRemove: BuyingListRequest.DeleteBuyingListItem, jwt: string | boolean): any {
        return axios.delete(
            `/v1/shop/buying-lists/${productToRemove.buyingListId}/items?itemIds=${productToRemove.data}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },
    /**
     *
     */
    APIchangeOwnerBuyingList(
        newOwner: BuyingListRequest.TransferWishList,
        buyingListId: string,
        jwt: string | boolean,
    ) {
        return axios.post(`/v1/shop/buying-lists/${buyingListId}/change-owner`, newOwner, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },
});
