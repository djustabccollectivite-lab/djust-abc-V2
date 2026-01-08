/* eslint-disable no-use-before-define */
export interface RequestProductSku {
    jwt?: string | null | boolean;
    locale?: string;
    productIdType?: string;
    productSku?: string;
}
export interface RequestUserId {
    jwt: string | null | boolean;
    userId: string;
}
export interface RequestProductJwtLocaleSku {
    jwt: string | null | boolean;
    locale: string;
    productSku: string;
}
export interface RequestProductJwt {
    jwt: string | null | boolean;
    request: Request;
    locale?: string;
}
export interface RequestProductUserId {
    jwt: string | null | boolean;
}
export interface RequestProductReview {
    customerUserId: string;
    productSku: string;
    locale: string;
}

export interface Request {
    productSku: string;
    size: number;
}
export interface RequestLang {
    locale: string;
}
export interface RequestReview {
    message: string;
    productSku: string;
    rating: number;
}
export interface RequestPostProductBySku {
    skus: string;
    locale: string;
    currency: string;
    'order.type': string | null;
    'order.order': OrderRequest | null;
}
export interface RequestProductSkuJWT {
    locale?: string;
    productSku: string;
    jwt: string | null | boolean;
}
interface OrderRequest {
    ascending: boolean;
    descending: boolean;
    direction: string;
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
}