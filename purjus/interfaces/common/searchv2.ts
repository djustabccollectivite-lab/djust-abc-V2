export type Currency =
    | 'USD'
    | 'EUR'
    | 'GBP'
    | 'INR'
    | 'AUD'
    | 'CAD'
    | 'SGD'
    | 'CHF'
    | 'MYR'
    | 'JPY'
    | 'CNY'
    | 'SEK'
    | 'DKK'
    | 'NOK'
    | 'AED'
    | 'TRY';

export type PackingType = 'BOX' | 'BOTTLE' | 'UNIT';

export type OfferPriceType = 'PUBLIC' | 'GROUP' | 'ACCOUNT';

export type UnitType =
    | 'ITEM'
    | 'WEIGHT_METRIC'
    | 'VOLUME_METRIC'
    | 'LENGTH_METRIC'
    | 'AREA_METRIC'
    | 'WEIGHT_IMPERIAL'
    | 'VOLUME_IMPERIAL'
    | 'LENGTH_IMPERIAL'
    | 'AREA_IMPERIAL';

export type FoTag = {
    id?: string;
    name?: string;
};

export type ProductUnitDto = {
    id?: string;
    type?: UnitType;
    unit?: string;
};

export type ProductSearch = {
    brand?: string;
    description?: string;
    externalId?: string;
    id?: string;
    mainPictureUrl?: string;
    name?: string;
    sku?: string;
    tags?: Array<FoTag>;
    unit?: ProductUnitDto;
};

export type OfferPriceSearch = {
    discountItemPrice?: number;
    discountUnitPrice?: number;
    externalId?: string;
    id?: string;
    itemPerPack?: number;
    itemPrice?: number;
    offerPriceType?: OfferPriceType;
    price?: number;
    unitPrice?: number;
    unitPriceTTC?: number;
};

export type CustomFieldSearch = {
    externalId?: string;
    id?: string;
    name?: string;
    /**
     * @deprecated
     */
    value?: string;
    values?: Array<string>;
};

export type OfferInventorySearch = {
    currency?: Currency;
    customFields?: Array<CustomFieldSearch>;
    externalId?: string;
    id?: string;
    leadTimeToShip?: string;
    maxOrderQuantity?: number;
    minOrderQuantity?: number;
    minShippingPrice?: number;
    minStockAlert?: number;
    packingType?: PackingType;
    productUnit?: string;
    quantityPerItem?: number;
    stock?: number;
};

export type ExternalSource = 'MIRAKL' | 'CLIENT' | 'NOT_DEFINED' | 'EXTERN' | 'SYSTEM';

export type Attribute = {
    externalId: string;
    externalSource: ExternalSource;
    id?: string;
    names: {
        [key: string]: string;
    };
    type: string;
    value: string;
};

export type SupplierSearch = {
    externalId?: string;
    id?: string;
    name?: string;
};

export type MediaDTO = {
    formatType?: string;
    heightInPx?: number;
    main?: boolean;
    sizeType?: string;
    url?: string;
    widthInPx?: number;
};

export type ProductVariantSearch = {
    description?: string;
    ean?: string;
    externalId?: string;
    id?: string;
    mpn?: string;
    name?: string;
    pictureUrls?: Array<MediaDTO>;
    sku?: string;
};

export type RecordResponseSearch = {
    attributes?: Array<Attribute>;
    offer?: OfferInventorySearch;
    offerPrice?: OfferPriceSearch;
    product?: ProductSearch;
    supplier?: SupplierSearch;
    variant?: ProductVariantSearch;
};

export type Direction = 'ASC' | 'DESC';

export type NullHandling = 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST';

export type Order = {
    ascending?: boolean;
    descending?: boolean;
    direction?: Direction;
    ignoreCase?: boolean;
    nullHandling?: NullHandling;
    property?: string;
};

export type PageableObject = {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    sort?: Array<Order>;
    unpaged?: boolean;
};

export type PageRecordResponseSearch = {
    content?: Array<RecordResponseSearch>;
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: PageableObject;
    size?: number;
    sort?: Array<Order>;
    totalElements?: number;
    totalPages?: number;
};

export type FacetCustomFieldSearch = {
    id?: string;
    name?: string;
    values?: Array<string>;
};

export type FacetSupplierSearch = {
    id?: string;
    name?: string;
};

export type FacetBrandSearch = {
    id?: string;
    name?: string;
};

export type FacetAttributeSearch = {
    id?: string;
    name?: string;
    values?: Array<string>;
};

export type FacetsSearch = {
    attributes?: Array<FacetAttributeSearch>;
    brands?: Array<FacetBrandSearch>;
    customFields?: Array<FacetCustomFieldSearch>;
    suppliers?: Array<FacetSupplierSearch>;
};

export type SearchResponse = {
    facets?: FacetsSearch;
    products?: PageRecordResponseSearch;
};

export type Pageable = {
    page?: number;
    size?: number;
    sort?: Array<string>;
};

export type AggregationEnum = 'PRODUCT' | 'VARIANT';

export type Product552Data = {
    query: {
        aggregation?: AggregationEnum;
        attributes?: Array<string>;
        brand?: Array<string>;
        categoryIds?: Array<string>;
        currency?: Currency;
        customFields?: Array<string>;
        locale: string;
        offerUpdatedTime?: string;
        /**
         * Zero-based page index (0..N)
         */
        page?: number;
        pageable: Pageable;
        productTags?: Array<string>;
        productUpdatedTime?: string;
        query?: string;
        /**
         * The size of the page to be returned
         */
        size?: number;
        skus?: Array<string>;
        /**
         * Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         */
        sort?: Array<string>;
        suppliers?: Array<string>;
    };
};

export type Product552Response = SearchResponse;
