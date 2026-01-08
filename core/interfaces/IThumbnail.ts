import { AttributeDetail, FoBestOfferPrice } from './IOffer';
import { Product } from './IProduct';

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
}

export interface ProductReviewRatings {
    countRating: number;
    rating: number;
}
export interface ProductThumbnail {
    product: Product;
    productReviewRatings: ProductReviewRatings;
    attributeViewDetails: AttributeDetail[];
    bestOffer: FoBestOfferPrice | null;
}
export interface Thumbnail {
    content: ProductThumbnail[];
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

export interface ProductThumbnailVariantPictureUrl {
    formatType: string;
    heightInPx: number;
    main: boolean;
    sizeType: string;
    url: string;
    widthInPx: number;
}
export interface ProductThumbnailVariant {
    description: string;
    ean: string;
    externalId: string;
    id: string;
    mpn: string;
    name: string;
    pictureUrls: [ProductThumbnailVariantPictureUrl];
    sku: string;
}

export interface ProductThumbnailProduct {
    brand: string;
    description: string;
    externalId: string;
    id: string;
    mainPictureUrl: string;
    name: string;
    sku: string;
    tags: Array<{
        id: string;
        name: string;
    }>;
    unit: {
        id: string;
        type: string;
        unit: string;
    };
}

export interface ProductThumbnailSupplier {
    externalId: string;
    id: string;
    name: string;
}

export interface ProductThumbnailOffer {
    brand: string;
    currency: string;
    customFields: Array<{
        externalId: string;
        id: string;
        name: string;
        value: {};
    }>;
    id: string;
    leadTimeToShip: number;
    maxOrderQuantity: number;
    minOrderQuantity: number;
    minShippingPrice: number;
    minStockAlert: number;
    packingType: string;
    productUnit: string;
    quantityPerItem: number;
    stock: number;
}

export interface ProductThumbnailOffePrice {
    externalId: string;
    itemPerPack: number;
    offerPriceType: string;
    price: number;
}

export interface ProductThumbnailNavigations {
    externalId: string;
    name: string;
}

export interface ProductThumbnailv2 {
    [x: string]: any;
    offer: ProductThumbnailOffer;
    offerPrice: ProductThumbnailOffePrice;
    product: ProductThumbnailProduct;
    supplier: ProductThumbnailSupplier;
    variant: ProductThumbnailVariant;
    navigations: ProductThumbnailNavigations;
    attributes: any;
}
