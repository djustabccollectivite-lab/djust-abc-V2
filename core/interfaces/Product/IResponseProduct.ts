import * as ProductResponse from '../IProduct';
import { Thumbnail, Pageable } from '../IThumbnail';
import { FoAttributeValue, DataType, DataMap } from '../ICart';
import { FoCustomFieldValue } from '../ICustomField';
import { PaymentDueDate } from '../ISupplier';
import { DeliveryDates, OfferInventory, OfferPrice, OfferPriceFormSearch, Offer } from '../IOffer';
import { Sort } from '../Order/IOrderResponse';

export enum externalSource {
    MIRAKL,
    CLIENT,
    NOT_DEFINED,
    EXTERN,
}

export interface ProductsBySkuResponse {
    attributesValues: ProductResponse.AttributeValueProduct[];
    brand: string;
    classificationCategory: ProductResponse.ClassificationCategory;
    description: string;
    externalId: string;
    externalSource: externalSource;
    id: string;
    name: string;
    productPictures: ProductResponse.ProductMediaInfoDTO[];
    productStatus: string;
    productUnit: ProductResponse.ProductUnit;
    sku: string;
    tags: ProductResponse.Tags[];
}
export interface ProductReviewResponse {
    productReview: ProductResponse.Reviews;
    user: UserReviewResponse;
}
export interface UserReviewResponse {
    customerUserId: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface RelatedProductResponse {
    aggregations: Aggregation[];
    productThumbnails: Thumbnail;
}
export interface ProductVariantsResponse {
    content: AttributeValues[];
}
export interface AttributeValues {
    attributeValues: FoAttributeValue[];
    status: string;
}

export interface AttributeVariant {
    externalId: string;
    id: string;
    name: DataMap;
    type: DataType;
    values: string[];
}

export interface Aggregation {
    buckets: Buckets[];
    type: string;
}
export interface Buckets {
    count: number;
    key: string;
    values: string[];
}

export interface ResponseSupplierVariant {
    additionalImageLink: string[];
    banner: string;
    createAt: Date;
    customFieldValues: FoCustomFieldValue[];
    description: string;
    evaluationCount: number;
    externalId: string;
    externalSource: string;
    id: string;
    isDefault: boolean;
    logo: string;
    name: string;
    paymentDueDate: PaymentDueDate;
    returnPolicy: string;
    supplierRating: string;
    supplierStatus: string;
    totalOffers: number;
    totalOrders: number;
    totalSales: number;
    updatedAt: Date;
}
export interface ResponseEstimatedDeliveryDates {
    estimatedDeliveryDates: DeliveryDates[];
    offerInventory: OfferInventory;
    offerPrices: OfferPrice[];
    supplier: { customFieldValues: FoCustomFieldValue };
}

export interface FacetValue {
    count: number;
    key: string;
    values: string[];
    externalId: number;
    id: number;
    name: string;
}

//Search V2

export interface SearchWithDataResponse {
    data: SearchResponse;
}
export interface SearchResponse {
    facets: FacetsSearch[];
    products: PageRecordSearchResponse;
}

export interface FacetsSearch {
    id: string;
    name: string;
}

export interface PageRecordSearchResponse {
    content: ContentRecordSearchResponse[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
}

export interface ContentRecordSearchResponse {
    offer: Offer;
    offerPrice: OfferPriceFormSearch;
    product: ProductResponse.ProductV2;
    variant: ProductResponse.ProductVariantSearch;
}
