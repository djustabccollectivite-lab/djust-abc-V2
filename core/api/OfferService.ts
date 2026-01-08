/* eslint-disable import/named */
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export type ProductStatus = 'NEW' | 'ACTIVE' | 'INACTIVE';
export type OfferInventoryStatus = 'ACTIVE' | 'INACTIVE';
export type VariantStatus = 'NEW' | 'ACTIVE' | 'INACTIVE';
export type OfferPriceStatus = 'ACTIVE' | 'INACTIVE';
export type HasStock = 'TRUE' | 'FALSE';

export interface Offer {
    externalId: string;
    offerPrices: {
        externalId: string;
        price: number;
    }[];
    productId: string;
    status: string;
    stock: number;
    supplierId: string;
    variantId: string;
}

interface OfferListSort {
    ascending: boolean;
    descending: boolean;
    direction: string;
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
}

export interface GetOffersListResponse {
    content: Offer[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: OfferListSort[];
        unpaged: boolean;
    };
    size: number;
    sort: OfferListSort[];
    totalElements: number;
    totalPages: number;
}

export default (axios: NuxtAxiosInstance) => ({
    APIGetOffersList(
        jwt: string | boolean,
        productStatus: ProductStatus,
        offerInventoryStatus: OfferInventoryStatus,
        variantStatus: VariantStatus,
        offerPriceStatus: OfferPriceStatus,
        supplierId: string,
        offerIds: string[],
        offerPriceIds: string[],
        currency: string,
        page: number = 0,
        size: number = 20,
        sort: string[] = [],
        hasStock: HasStock = 'FALSE',
    ) {
        const queryParams = new URLSearchParams({
            productStatus: productStatus.toString(),
            offerInventoryStatus: offerInventoryStatus.toString(),
            variantStatus: variantStatus.toString(),
            offerPriceStatus: offerPriceStatus.toString(),
            supplierId,
            offerIds: offerIds.join(','),
            offerPriceIds: offerPriceIds.join(','),
            currency,
            page: page.toString(),
            size: size.toString(),
            sort: sort.join(','),
            hasStock: hasStock.toString().toLowerCase(),
        });

        return axios.get<GetOffersListResponse>(`/v1/shop/offer-inventories?${queryParams.toString()}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },
});
