import { FoAttributeValue, FoAttribute } from './ICart';
import { FoBestOfferPrice } from './IOffer';
import { AttributeVariant } from './Product/IResponseProduct';

export interface ProductUnit {
    type: string;
    unit: string;
}

export interface RequestProductsList {
    priceMin?: number | null;
    priceMax?: number | null;
    categoryIds?: string[] | null;
    brand?: string[] | null;
    customFieldsSupplier?: string[] | null;
    customFields?: string[] | null;
    rq?: string | null;
    productTags?: string[] | null;
    locale: string;
    size?: number | null;
    orderType?: string | null;
    order?: string | null;
    Sort?: string;
    SortType?: string;
}

export interface MediaInfoDTO {
    widthInPx: number;
    heightInPx: number;
    formatType: string;
    sizeType: string;
    url: string;
}

export interface ProductMediaInfoDTO {
    urls: MediaInfoDTO[];
    isMain: boolean;
}
export interface AttributeProduct {
    externalId: string;
    id: string;
    name: string;
    type: string;
}

export interface AttributeValueProduct {
    attribute: AttributeProduct;
    value: any;
}

export interface Role {
    id: string;
    name: string;
    version: number;
}

export interface Permission {
    id: string;
    name: string;
    permissionGroup: string;
    version: number;
}

export interface UserProfile {
    id: string;
    permissions: Permission[];
    type: string;
    version: number;
}

export interface User {
    civility: string;
    createdAt: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    permissions: Permission[];
    roles: Role[];
    updatedAt: string;
    userProfiles: UserProfile[];
    version: number;
}

export interface CustomerUser {
    createdAt: string;
    id: string;
    parentId: string;
    status: string;
    updatedAt: string;
    user: User;
    version: number;
}

export interface CatalogView {
    createdAt: string;
    customerUsers: CustomerUser[];
    description: string;
    id: string;
    name: string;
    status: string;
    updatedAt: string;
}

export interface ClassificationCategory {
    id: string;
    name: string;
    externalId: string;
    externalSource: string;
}

export interface NavigationCategorySimpleView {
    name: string;
    id: string;
}

export interface ProductSpecification {
    attribute: string;
    value: string;
}

export interface Thumbnails {
    url: string;
}

export interface Tags {
    id: string;
    name: string;
}

export interface Review {
    id: string;
    version: number;
    createdAt: string;
    customerUserId: string;
    productId: string;
    rating: number;
    message: string;
}
export interface Reviews {
    rating: number;
    message: string;
}
export interface UseReview {
    id: string;
    specificUserId: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface ProductFilters {
    customField?: string[];
    filter_tag?: string[];
    filter_brand?: string[];
    filter_attribute?: string[];
    filter_customField?: string[];
    filter_supplier?: string[];
    customFieldsSupplier?: string[];
    customFieldsOffer?: string[];
    customFields?: string[];
    sort_by?: string;
    page?: string;
    keyword?: string;
    size?: string;
    idType?: string;
    skus?: string[];
    withFacets?: boolean;
}

export interface AttributeValues {
    id: number;
    status: string;
    value: string;
}

export interface SelectedValue {
    selectedValue: number;
    unit: string;
}

export interface Product {
    id: string;
    sku: string;
    name: object;
    description: object;
    productStatus: string;
    brand: string;
    classificationCategory: ClassificationCategory;
    attributeValues: FoAttributeValue[];
    productUnit: ProductUnit;
    imageLinks: string[];
    productPictures: ProductMediaInfoDTO[];
    navigationCategories: NavigationCategorySimpleView[];
    specifications: ProductSpecification[];
    tags: Tags[];
    djustProductUuid: string;
    mpn: string;
    gtin: string;
    externalId: string;
    externalSource: string;
}

export interface LastIncomingProduct {
    bestOffer: FoBestOfferPrice;
    product: Product;
}

export interface ProductV2 {
    id: string;
    sku: string;
    name: string;
    description: object;
    brand: string;
    tags: Tags[];
    mpn: string;
    externalId: string;
    mainPictureUrl: string;
    unit: ProductUnit;
    pictureUrls: ProductMediaInfoDTO[];
}
export interface ProductVariantSearch {
    attributes: AttributeVariant[];
    description: string;
    ean: string;
    externalId: string;
    id: string;
    mpn: string;
    name: string;
    productPictures: ProductMediaInfoDTO[];
    sku: string;
}
export interface ProductVariant {
    attribute: FoAttribute;
    attributeValues: AttributeValues[];
}
export interface ProductReview {
    productReviews: Review;
    user: UseReview;
}

export enum AggreationQuerySearch {
    PRODUCT,
    VARIANT,
}
