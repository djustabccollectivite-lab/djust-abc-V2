/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/named */
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import * as RequestTypeProduct from '../interfaces/Product/IRequestProduct';
import * as ResponseTypeProduct from '../interfaces/Product/IResponseProduct';
import { ProductReviewRatings } from '../interfaces/IThumbnail';
import { RequestProductsList, Product } from '../interfaces/IProduct';
const queryStringModule = require('qs');

enum ProductType {
    SKU = 'SKU',
    EXTERNAL_ID = 'EXTERNAL_ID',
}

export default (axios: NuxtAxiosInstance) => ({
    /**
     * Function APIsendProductReview
     * Create a new product review
     *
     * @param { string | boolean} jwt
     * @param {RequestTypeProduct.RequestProductReview} data
     */
    APIsendProductReview(jwt: string | boolean, data: RequestTypeProduct.RequestProductReview) {
        return axios.post<ResponseTypeProduct.ProductReviewResponse>('/v1/shop/reviews', data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIgetProductsbySkus (List Skus)
     * Get products by list of skus (Using same api of getProducts)
     *
     * @param  {RequestTypeProduct.RequestProductUserId} userInfo
     * @param  {RequestTypeProduct.RequestPostProductBySku} request
     */
    APIgetProductsbySkus(jwt: string | boolean, request: RequestTypeProduct.RequestPostProductBySku) {
        return axios.get<ResponseTypeProduct.ProductReviewResponse>('/v1/shop/list', {
            params: request,
            paramsSerializer: function (params) {
                return queryStringModule.stringify(params, { arrayFormat: 'repeat' });
            },
            headers: { Authorization: `Bearer ${jwt}` },
        });
    },

    /**
     * Function APIGetProductbySku
     * Get product by sku
     *
     * @param  {RequestTypeProduct.RequestProductSku} ProductWithSku
     */
    APIGetProductbySku(ProductWithSku: RequestTypeProduct.RequestProductSku) {
        if (ProductWithSku.jwt) {
            return axios.get<ResponseTypeProduct.ProductsBySkuResponse>(
                `/v1/shop/products/${ProductWithSku.productSku}?productIdType=${ProductWithSku.productIdType}&locale=${ProductWithSku.locale}`,
                {
                    headers: { Authorization: `Bearer ${ProductWithSku.jwt}` },
                },
            );
        } else {
            return axios.get<ResponseTypeProduct.ProductsBySkuResponse>(
                `/v1/shop/products/${ProductWithSku.productSku}?productIdType=${ProductWithSku.productIdType}&locale=${ProductWithSku.locale}`,
            );
        }
    },

    /**
     * Function APIGetstatReviewsbyProductSku
     * Get Stat reviews by product sku ( rating & countRating)
     *
     * @param  {RequestTypeProduct.RequestStatReviews} data
     */
    APIGetstatReviewsbyProductSku(data: RequestTypeProduct.RequestProductSku) {
        return axios.get<ProductReviewRatings>(`/v1/shop/products/${data.productSku}/stat-reviews`, {
            headers: { Authorization: `Bearer ${data.jwt}` },
        });
    },

    /**
     * Function APIgetProductDetailReviews
     * Get product's reviews
     *
     * @param  {RequestTypeProduct.RequestProductJwtLocaleSku} data
     */
    APIgetProductDetailReviews(data: RequestTypeProduct.RequestProductJwtLocaleSku) {
        if (data.jwt === null) {
            return axios.get<ResponseTypeProduct.UserReviewResponse>(`/v1/shop/products/${data.productSku}/reviews`);
        } else {
            return axios.get<ResponseTypeProduct.UserReviewResponse>(`/v1/shop/products/${data.productSku}/reviews`, {
                headers: { Authorization: `Bearer ${data.jwt}` },
            });
        }
    },

    /**
     * Function APIgetProductRelatedProducts
     * Get related products of product
     *
     * @param  {RequestTypeProduct.RequestProductJwtLocaleSku} data
     * @param  {RequestTypeProduct.RequestLang} lang
     */
    APIgetProductRelatedProducts(
        data: RequestTypeProduct.RequestProductJwtLocaleSku,
        lang: RequestTypeProduct.RequestLang,
    ) {
        if (!data.jwt) {
            return axios.get<ResponseTypeProduct.RelatedProductResponse>(
                `/v1/shop/products/${data.productSku}/related-products`,
                { params: lang },
            );
        } else {
            return axios.get<ResponseTypeProduct.RelatedProductResponse>(
                `/v1/shop/products/${data.productSku}/related-products`,
                {
                    headers: { Authorization: `Bearer ${data.jwt}` },
                    params: lang,
                },
            );
        }
    },

    /**
     * Function APIgetProductDetailOffers
     * Get product's offers
     *
     * @param  {RequestTypeProduct.RequestProductSku} data
     * @param  {string} currency
     */
    APIgetProductDetailOffers(
        data: RequestTypeProduct.RequestProductSkuJWT,
        currency: string,
        withoutPrices: boolean = false,
        productIdType: string = 'SKU',
    ) {
        // API accept 'fr-FR' and 'en-EN' locale but that's defined as 'fr' and 'en' in the FOC
        let fixedLocale: string = '';

        if (data.locale && ['fr', 'en'].includes(data.locale)) {
            fixedLocale = `${data.locale}-${data.locale.toUpperCase()}`;
        }

        if (!data.jwt) {
            return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
                `/v1/shop/products/${data.productSku}/offers?currency=${currency}&locale=${fixedLocale || data.locale}&withoutPrices=${withoutPrices}&productIdType=${productIdType}`,
            );
        } else {
            return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
                `/v1/shop/products/${data.productSku}/offers?currency=${currency}&locale=${fixedLocale || data.locale}&withoutPrices=${withoutPrices}&productIdType=${productIdType}`,
                {
                    headers: { Authorization: `Bearer ${data.jwt}` },
                },
            );
        }
    },

    /**
     * Function APIgetProductDetailOffers
     * Get product's offers
     *
     * @param  {RequestTypeProduct.RequestProductJwt} data
     */
    APIgetProductVariants(data: RequestTypeProduct.RequestProductJwt) {
        if (!data.jwt) {
            return axios.get<ResponseTypeProduct.ProductVariantsResponse>(
                `/v1/shop/product-variants?locale=${data.locale}`,
                {
                    params: data.request,
                },
            );
        } else {
            return axios.get<ResponseTypeProduct.ProductVariantsResponse>(
                `/v1/shop/product-variants?locale=${data.locale}`,
                {
                    headers: { Authorization: `Bearer ${data.jwt}` },
                    params: data.request,
                },
            );
        }
    },

    /**
     * Function APIgetProductDetailAttributes
     * Get attributes by product sku
     *
     * @param  {RequestTypeProduct.RequestProductSku} data
     */
    APIgetProductDetailAttributes(data: RequestTypeProduct.RequestProductSku) {
        if (data.jwt === null) {
            return axios.get<ResponseTypeProduct.AttributeVariant[]>(
                `/v1/shop/products/${data.productSku}/variant-attributes?locale=FR&productIdType=${data.productIdType}`,
            );
        } else {
            return axios.get<ResponseTypeProduct.AttributeVariant[]>(
                `/v1/shop/products/${data.productSku}/variant-attributes?locale=FR&productIdType=${data.productIdType}`,
                {
                    headers: { Authorization: `Bearer ${data.jwt}` },
                },
            );
        }
    },

    /**
     * Function APIgetProductThumbnails
     * Get thumbnails of a product regrouping product,stat reviews, attributs and bestOffer
     *
     * @param  {RequestTypeProduct.RequestUserId | null} data
     * @param  {RequestProductsList | null} request
     */
    APIgetProductThumbnails(data: RequestTypeProduct.RequestUserId | null, request: RequestProductsList | null) {
        if (data === null) {
            return axios.get<ResponseTypeProduct.ProductReviewResponse>('/v1/shop/list', {
                params: request,
                paramsSerializer: function (params) {
                    return queryStringModule.stringify(params, { arrayFormat: 'repeat' });
                },
            });
        } else {
            return axios.get<ResponseTypeProduct.ProductReviewResponse>('/v1/shop/list', {
                params: request,
                paramsSerializer: function (params) {
                    return queryStringModule.stringify(params, { arrayFormat: 'repeat' });
                },
                headers: { Authorization: `Bearer ${data.jwt}`, client: 'ACCOUNT' },
            });
        }
    },

    /**
     * Function APIgetProductThumbnailsV2
     * Get thumbnails of a product regrouping product,stat reviews, attributs and bestOffer
     *
     * @param  {RequestTypeProduct.RequestUserId | null} data
     * @param  {RequestProductsList | null} request
     */
    APIgetProductThumbnailsv2(data: RequestTypeProduct.RequestUserId | null, request: RequestProductsList | null) {
        if (data === null) {
            return axios.get<ResponseTypeProduct.SearchResponse>('/v2/shop/search', {
                params: request,
                paramsSerializer: function (params) {
                    return queryStringModule.stringify(params, { arrayFormat: 'repeat' });
                },
            });
        } else {
            return axios.get<ResponseTypeProduct.SearchResponse>('/v2/shop/search', {
                params: request,
                paramsSerializer: function (params) {
                    return queryStringModule.stringify(params, { arrayFormat: 'repeat' });
                },
                headers: { Authorization: `Bearer ${data.jwt}`, client: 'ACCOUNT' },
            });
        }
    },

    /**
     * Function APIgetProductsBySupplier
     * Made for Franprix to get products only by supplier (use pagination)
     *
     * @param  {RequestTypeProduct.RequestUserId | null} data
     * @param  {object} request
     */
    APIgetProductsBySupplier(data: RequestTypeProduct.RequestUserId | null, request: object) {
        let headers = {};

        if (data?.jwt) headers = { Authorization: `Bearer ${data.jwt}` };

        return axios.get<ResponseTypeProduct.SearchResponse>('/v2/shop/search', {
            params: request,
            paramsSerializer: function (params) {
                return queryStringModule.stringify(params, { arrayFormat: 'repeat' });
            },
            headers,
        });
    },

    /**
     * Function APIsearch
     * Search product with text expression for search and autocomplete
     * -------------------------------------------------------------------------------
     * @param  {string} keyword
     * @param  {RequestTypeProduct.RequestUserId | null} data
     * @param  {string} locale
     */
    APIsearch(keyword: string, data: RequestTypeProduct.RequestUserId | null, locale: string) {
        if (data === null) {
            return axios.get('/v1/shop/autocomplete?search=' + keyword + '&locale=' + locale);
        } else {
            return axios.get('/v1/shop/autocomplete?search=' + keyword + '&locale=' + locale, {
                headers: { Authorization: `Bearer ${data.jwt}` },
            });
        }
    },
    APIsearchv2(
        keyword: string,
        data: RequestTypeProduct.RequestUserId | null,
        locale: string,
        currency: string,
        aggregation: string,
    ) {
        if (data === null) {
            return axios.get(
                `/v2/shop/autocomplete?input=${keyword}&locale=${locale}&currency=${currency}&aggregation=${aggregation}`,
            );
        } else {
            return axios.get(
                `/v2/shop/autocomplete?input=${keyword}&locale=${locale}&currency=${currency}&aggregation=${aggregation}`,
                {
                    headers: { Authorization: `Bearer ${data.jwt}` },
                },
            );
        }
    },

    APIgetProductDetail(data: RequestTypeProduct.RequestProductJwtLocaleSku) {
        if (data === null) {
            throw new Error("Le paramètre 'data' ne peut pas être null");
        }
        return axios.get<Product>(`/v1/shop/products/${data.productSku}`, {
            headers: data.jwt ? { Authorization: `Bearer ${data.jwt}` } : {},
            params: data.locale,
        });
    },
    /**
     * Function APIgetSuppliersByProductVariantID
     * Get suppliers by productVariantId
     *
     * @param  {string | boolean} data
     * @param  {string} productVariantId
     */
    APIgetSuppliersByProductVariantID(jwt: string | boolean, productVariantId: string) {
        return axios.get<ResponseTypeProduct.ResponseSupplierVariant[]>(
            `/v1/shop/product-variants/${productVariantId}/suppliers`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },
    APIgetProductVariantOffers(
        variantId: string,
        jwt: string | boolean | null,
        params?: {
            currency?: string;
            /**
             * @deprecated
             */
            productIdType?: 'EXTERNAL_ID' | 'SKU' | 'ID';
            withoutPrices?: boolean;
        },
    ) {
        if (!jwt) {
            return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
                `/v1/shop/product-variants/${variantId}/offers`,
                {
                    params,
                },
            );
        }
        return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
            `/v1/shop/product-variants/${variantId}/offers`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
                params,
            },
        );
    },
    APIgetProductVariantOffersByType(
        jwt: string | boolean | null,
        variantId: string,
        type: ProductType,
        currency: string,
        withoutPrices: boolean,
    ) {
        if (!jwt) {
            return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
                `/v1/shop/product-variants/${variantId}/offers?productIdType=${type}&currency=${currency}&withoutPrices=${withoutPrices}`,
            );
        }
        return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
            `/v1/shop/product-variants/${variantId}/offers?productIdType=${type}&currency=${currency}&withoutPrices=${withoutPrices}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            },
        );
    },

    /**
     * Function APIgetProductDetailOffersPaginated
     * Get product's offers
     * CODE API: PRODUCT-509
     *
     * @param  data
     * @param  {boolean} withoutPrices
     */
    APIgetProductDetailOffersPaginated(
        data: {
            jwt?: any;
            productSku: string;
            productIdType: string;
            pageable: {
                page: number;
                size: number;
                sort: string;
            };
            currency: string;
        },
        withoutPrices: boolean = false,
    ) {
        if (!data.jwt) {
            return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
                `/v1/shop/products/${data.productSku}/paginated-offers?page=${data.pageable.page}&size=${data.pageable.size}&sort=${data.pageable.sort}&productIdType=${data.productIdType}&currency=${data.currency}&locale=FR&withoutPrices=${withoutPrices}`,
            );
        } else {
            return axios.get<ResponseTypeProduct.ResponseEstimatedDeliveryDates[]>(
                `/v1/shop/products/${data.productSku}/paginated-offers?page=${data.pageable.page}&size=${data.pageable.size}&sort=${data.pageable.sort}&productIdType=${data.productIdType}&currency=${data.currency}&locale=FR&withoutPrices=${withoutPrices}`,
                {
                    headers: { Authorization: `Bearer ${data.jwt}` },
                },
            );
        }
    },

    APIgetProductAssets(
        // product ID or SKU
        id: string[],
        sizeType: string[],
        jwt?: any
    ) {
        return axios.get<any>(
            `/v1/shop/assets?id=${id}&sizeType=${sizeType}`,
            {
                headers: { Authorization: `Bearer ${jwt}` }
            }
        );
    },

});
