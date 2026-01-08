import type { Context } from '@nuxt/types';
import { RefreshableScheme } from '@nuxtjs/auth-next';
import type { AxiosInstance } from 'axios';
import type { ProductThumbnailsResponse, ProductThumbnailsResponsev2 } from '../../../interfaces/djustInterfaces';
import { ConnexionError } from '../../exeptions/ConnexionError';
import { ApiError } from '../../exeptions/ApiError';
import { ProductFilters } from '~/core/interfaces/IProduct';

function generateArrayQueryParams(array: string[] | null | undefined, name: string): Object {
    if (!array) {
        return {};
    }
    return array.reduce((acc, curr, index) => {
        acc[`${name}[${index}]`] = curr;
        return acc;
    }, {});
}

export default (context: Context) => ({
    async getProductThumbnails(
        params: {
            attributes: string[];
            brand: string[];
            supplier: string;
        },
        size = 20,
        page = 0,
    ): Promise<ProductThumbnailsResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const attributes = generateArrayQueryParams(params.attributes, 'attribute');
            const brand = generateArrayQueryParams(params.brand, 'brand');
            const response = await client.get<ProductThumbnailsResponse>(`/v1/shop/list?&size=${size}&page=${page}`, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                    'Customer-Account-Id': context.store.state.app.account,
                },
                params: {
                    ...attributes,
                    ...brand,
                    locale: 'FR',
                    currency: 'EUR',
                    supplier: params.supplier,
                    paged: true,
                    'order.type': 'CREATION',
                    'order.order': 'DESC',
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
    async getFilteredProductsThumbnail(
        categoryId: string | null,
        params: ProductFilters,
        size = 20,
        page = 0,
    ): Promise<ProductThumbnailsResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;

        try {
            const response = await client.get<ProductThumbnailsResponse>(`/v1/shop/list`, {
                headers: {
                    'Customer-Account-Id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
                params: {
                    attribute: params.filter_attribute,
                    brand: params.filter_brand ?? context.store.state.shop.brand,
                    supplier: params.filter_supplier,
                    locale: 'FR',
                    currency: 'EUR',
                    paged: true,
                    'order.type': 'CREATION',
                    'order.order': 'DESC',
                    customFieldsSupplier: context.store.state.shop.customFieldsSupplier ?? null,
                    priceMin: context.store.state.shop.priceMin ?? null,
                    priceMax: context.store.state.shop.priceMax ?? null,
                    rq: params?.keyword ?? context.store.state.shop.rq,
                    size,
                    page: params?.page ?? page,
                    productTags: params?.filter_tag ?? context.store.state.shop.productsTags,
                    idType: params?.idType ?? context.store.state.shop.idType,
                    categoryIds: categoryId ?? null,
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
    async getFilteredProductsThumbnailv2(
        categoryId: string | null,
        params: ProductFilters,
        size = 20,
        page = 0,
    ): Promise<ProductThumbnailsResponse> {
        const client: AxiosInstance = context.$purjus.djustClient;

        try {
            const currentCustomFields = Array.isArray(params.filter_customField)
                ? params.filter_customField
                : [params.filter_customField];

            const sort = context.store.state.shop.sort === 'DESC' ? 'name|DESC' : context.store.state.shop.sort;

            const response = await client.get<ProductThumbnailsResponse>(`/v2/shop/search`, {
                headers: {
                    'Customer-Account-Id': context.store.state.app.account,
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
                params: {
                    attributes: params.filter_attribute,
                    customFields: currentCustomFields,
                    brand: params.filter_brand ?? context.store.state.shop.brand,
                    suppliers: params.filter_supplier,
                    locale: 'FR',
                    currency: 'EUR',
                    paged: true,
                    sort,
                    customFieldsSupplier: context.store.state.shop.customFieldsSupplier ?? null,
                    priceMin: context.store.state.shop.priceMin ?? null,
                    priceMax: context.store.state.shop.priceMax ?? null,
                    query: params?.keyword ?? context.store.state.shop.rq,
                    size,
                    page: params?.page ?? page,
                    productTags: params?.filter_tag ?? context.store.state.shop.productsTags,
                    idType: params?.idType ?? context.store.state.shop.idType,
                    categoryIds: categoryId ?? null,
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
    async getProductThumbnailsv2(
        params: {
            attributes: string[];
            brand: string[];
            supplier: string;
        },
        size = 20,
        page = 0,
    ): Promise<ProductThumbnailsResponsev2> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const attributes = generateArrayQueryParams(params.attributes, 'attribute');
            const brand = generateArrayQueryParams(params.brand, 'brand');
            const response = await client.get<ProductThumbnailsResponsev2>(
                `/v2/shop/search?&size=${size}&page=${page}`,
                {
                    headers: {
                        Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                        'Customer-Account-Id': context.store.state.app.account,
                    },
                    params: {
                        ...attributes,
                        ...brand,
                        locale: 'FR',
                        currency: 'EUR',
                        supplier: params.supplier,
                        paged: true,
                        'order.type': 'CREATION',
                        'order.order': 'DESC',
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
});
