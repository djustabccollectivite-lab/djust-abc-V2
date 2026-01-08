import { CartDeliveryLine, FoProductVariant } from '../interfaces/ICart';
import { PriceRange } from '../interfaces/IOffer';
import { externalSource, Supplier, suppliersStatus } from '../interfaces/ISupplier';
import { ProductMediaInfoDTO, ProductSpecification, ProductV2, Thumbnails } from '../interfaces/IProduct';
import { Address, QuoteLine, SupplierQuote } from '../interfaces/IQuote';
import { BuyingList, BuyingListItem, BuyingListItemWithOfferId } from '../interfaces/IWishlist';
import { ProductThumbnail, ProductThumbnailVariant } from '../interfaces/IThumbnail';
import { FoCustomFieldValue, AttributeValueType } from '../interfaces/ICustomField';
import { FacetValue, Aggregation, ContentRecordSearchResponse } from '../interfaces/Product/IResponseProduct';

export interface AppGetters {
    getCurrency: (app: any) => any;
    getFormatPrice: (price: number, currency: string) => any;
}

export interface StatGetters {}

export interface AddressGetters {
    getFullAddress: (address: Address) => String;
    getAdditionalAddress: (address: Address) => String | null;
    getAddress: (address: Address) => String;
    getCity: (address: Address) => String;
    getCountry: (address: Address) => String;
    getFullName: (address: Address) => String;
    getLabel: (address: Address) => String;
    getPhone: (address: Address) => String;
    getState: (address: Address) => String;
    getCode: (address: Address) => String;
    getid: (address: Address) => String;
    getVersion: (address: Address) => Number;
    getShipping: (address: Address) => Boolean;
    getBilling: (address: Address) => Boolean;
    getDefaultAddrressId: (addresses: Address[]) => String | null;
}

export interface SupplierGetters {
    getId: (supplier: Supplier) => string;
    getName: (supplier: Supplier) => string;
    getExternalId: (supplier: Supplier) => string;
    getSupplierStatus: (Supplier: Supplier) => suppliersStatus;
    getTotalOffers: (Supplier: Supplier) => number;
    getTotalOrders: (Supplier: Supplier) => number;
    getTotalSales: (Supplier: Supplier) => number;
    getSupplierRating: (Supplier: Supplier) => string | null;
    getDescription: (Supplier: Supplier) => string | null;
    getimage1: (Supplier: Supplier) => string | null;
    getimage2: (Supplier: Supplier) => string | null;
    getimage3: (Supplier: Supplier) => string | null;
    getLogo: (Supplier: Supplier) => string | null;
    getIsDefault: (Supplier: Supplier) => boolean;
    getEvaluationCount: (Supplier: Supplier) => number;
    getExternalSource: (Supplier: Supplier) => externalSource;
}

export interface CartGetters<CARTLINE> {
    getTotalNumberCartItems: (cartLine: CARTLINE[]) => any;
    getProductId: (cartLine: CARTLINE) => string;
    getProductSku: (cartLine: CARTLINE) => string;
    getProductExternalId: (cartLine: CARTLINE) => string;
    getProductImage: (cartLine: CARTLINE) => ProductMediaInfoDTO;
    getProductName: (cartLine: CARTLINE) => string | null;
    getProductBrand: (cartLine: CARTLINE) => string;
    getOfferStock: (cartLine: CARTLINE) => number;
    getOfferPriceId: (cartLine: CARTLINE) => string;
    getProductPerPack: (cartLine: CARTLINE) => number;
    getQuantity: (cartLine: CARTLINE) => number;
    getSupplierName: (cartLine: CARTLINE) => string;
    getProductAttributes: (cartLine: CARTLINE) => any;
    getProductUnitPrice: (cartLine: CARTLINE, currency: string) => any;
    getProductTotalPrice: (cartLine: CARTLINE, currency: string) => any;
    getProductTotalPriceWithVat: (cartLine: CARTLINE, currency: string) => any;
    getCurrency: (cartLine: CARTLINE) => string;
    getDeliveryLines: (cartLine: CARTLINE) => CartDeliveryLine[];
    getTotalAmountOfCart: (cartLine: CARTLINE[], currency: string) => any;
    getTotalAmountOfCartHT: (cartLine: CARTLINE[], currency: string) => any;
    getTotalAmountOfCartTTC: (cartLine: CARTLINE[], currency: string) => any;
    getTotalShippingFee: (cartLine: CARTLINE[], currency: string) => any;
    getTotalOrderValidated: (orderValidated: any, currency: string) => any;
    getTotalOrderValidatedWithShipping: (orderValidated: any, currency: string) => any;
    getTotalOrderValidatedVAT: (orderValidated: any, currency: string) => any;
    getTotalOrderValidatedWithVatAndShipping: (orderValidated: any, currency: string) => any;
    getCartItemsBySuppliers: (cartItems: CARTLINE[]) => any;
    getSuppliersList: (cartItems: CARTLINE[]) => any;
    getTaxAmount: (cartLine: CARTLINE[], currency: string) => any;
    getTotalAmountOfCartWithTax: (cartLine: CARTLINE[], currency: string) => any;
    getTotalOrderCommercialShipping: (orderValidated: any, currency: string) => any;
    getTotalOrderCommercialTax: (orderValidated: any, currency: string) => any;
    getTotalOrderCommercial: (orderValidated: any, currency: string) => any;
    getTotalOrderCommercialWithoutVatAndShipping: (orderValidated: any, currency: string) => any;
    getShippingTaxAmount: (cartLine: CARTLINE[], currency: string) => any;
    getTotalTVA: (cartLine: CARTLINE[], currency: string) => any;
    getShippingFeesWithoutTax: (cartLine: CARTLINE[], currency: string) => any;
    getTotalAmountOfSipping: (cartLine: CARTLINE[], currency: string) => any;
    getProductMpn: (cartLine: CARTLINE) => string;
    getProductAttributesValues: (cartLine: CARTLINE, locale: string) => any;
    getProductUnitPriceWithoutEcoTax: (cartLine: CARTLINE, currency: string, ecoTax: number) => any;
    getProductTotalPriceWithoutEcoTax: (cartLine: CARTLINE, currency: string, ecoTax: number) => any;
    getTotalShippingFeeFromSupplierName: (cartItems: CARTLINE[], currency: string, supplierName: string) => any;
}

export interface CartB2BGetters<CARTITEM, CARTINFORMATIONS> {
    getProductSku: (cartLine: CARTITEM) => string;
    getProductExternalId: (cartLine: CARTITEM) => string;
    getProductImage: (cartLine: CARTITEM) => string;
    getProductName: (cartLine: CARTITEM) => string | null;
    getProductBrand: (cartLine: CARTITEM) => string;
    getOfferPriceId: (cartLine: CARTITEM) => string;
    getQuantity: (cartLine: CARTITEM) => number;
    getProductPerPack: (cartLine: CARTITEM) => number;
    getOfferMaxOrderQuantity: (cartLine: CARTITEM) => number;
    getOfferMinOrderQuantity: (cartLine: CARTITEM) => number;
    getOfferStock: (cartLine: CARTITEM) => number;
    getSupplierName: (cartLine: CARTITEM) => string;
    getProductAttributes: (cartLine: CARTITEM) => any;
    getProductUnitPrice: (cartLine: CARTITEM, currency: string) => string;
    getProductUnitPriceWithoutEcoTax: (cartLine: CARTITEM, currency: string, ecoTax: number) => any;
    getProductTotalPriceWithoutEcoTax: (cartLine: CARTITEM, currency: string, ecoTax: number) => any;
    getProductUnitDiscountPrice: (cartLine: CARTITEM, currency: string) => string;
    getTotalNumberCartItems: (cartInformations: CARTINFORMATIONS) => number;
    getTotalAmountOfCart: (cartInformations: CARTINFORMATIONS) => number;
    getTotalAmountOfCartHT: (cartInformations: CARTINFORMATIONS, currency: string) => string;
    getTotalAmountOfCartTTC: (cartInformations: CARTINFORMATIONS, currency: string) => string;
    getProductTotalPriceHT: (cartLine: CARTITEM, currency: string) => string;
    getProductTotalDiscountPrice: (cartLine: CARTITEM, currency: string) => string;
    getProductTotalPriceTTC: (cartLine: CARTITEM, currency: string) => string;
    getSuppliersList: (cartItems: CARTITEM[]) => any;
    getCartItemsBySuppliers: (cartItems: CARTITEM[]) => any;
    getCartTotalWeight: (cartItems: CARTITEM[], currency: string) => any;
    getCartTotalVAT: (cartInformations: CARTINFORMATIONS) => any;
}

export interface CategoryGetters<CATEGORY> {
    getMenuCategories: (categories: CATEGORY[]) => any;
    getNewCategoriesList: (categories: CATEGORY[], customField: any) => any;
    getMenuCategoriesv2: (categories: CATEGORY[]) => any;
}

export interface OfferGetters<OFFERPRICE, CONTENTRECORDSEARCHRESPONSE, FOBESTOFFERPRICE, FOOFFERINVENTORYWITHPRICES> {
    getOfferId: (offer: OFFERPRICE) => string;
    getOfferExternalId: (offer: OFFERPRICE) => string;
    getOfferCurrency: (offer: FOBESTOFFERPRICE) => string;
    getOfferStock: (offer: FOOFFERINVENTORYWITHPRICES) => number;
    getOfferStockV2: (offer: { stock: number }) => number;
    getOfferLeadTimeToShip: (offer: FOOFFERINVENTORYWITHPRICES) => number;
    getOfferSupplierName: (offer: FOBESTOFFERPRICE) => string;
    getOfferSupplierId: (offer: FOBESTOFFERPRICE) => string;
    getOfferProductVariantId: (offer: FOBESTOFFERPRICE) => string | undefined;
    getOfferPrices: (offer: FOOFFERINVENTORYWITHPRICES) => OFFERPRICE[];
    getOfferPriceNbPriceRanges: (offerPrice: OFFERPRICE) => number;
    getOfferPricePriceRanges: (offerPrice: OFFERPRICE) => PriceRange[];
    getFirstPriceFromOfferPrice: (offerPrice: OFFERPRICE, currency: string, format: any) => any;
    getFirstDiscountPriceFromOfferPrice: (offerPrice: OFFERPRICE, currency: string, format: any) => any;
    getFirstPriceWithQuantityFromOfferPrice: (
        offerPrice: OFFERPRICE,
        quantity: number,
        currency: string,
        format: any,
    ) => any;
    // getBestPriceFromOfferInventory: (offerInventory: OFFER,currency: string, format:any) => any;
    getBestOfferPriceFromOfferInventory: (offers: FOOFFERINVENTORYWITHPRICES) => OFFERPRICE | boolean;
    getBestOfferFromList: (offers: FOOFFERINVENTORYWITHPRICES[]) => any;
    getOfferMinShippingFees: (offer: FOBESTOFFERPRICE) => any;
    getBestOfferFromSupplier: (
        offers: FOOFFERINVENTORYWITHPRICES[],
        supplier: string,
    ) => FOOFFERINVENTORYWITHPRICES | boolean;
    getFormatedPrice: (price: number, currency: string) => any;
    getNumberOffers: (offers: any) => number;
    getOffersToDisplay: (offers: any) => FOBESTOFFERPRICE[];
    getOffersSupplierList: (offers: FOBESTOFFERPRICE[]) => any;
    getOfferItemPerPack: (offer: OFFERPRICE) => number;
    getQuantityPerItem: (offer: FOBESTOFFERPRICE) => string;
    getOfferPackingType: (offer: FOBESTOFFERPRICE) => string;
    getOfferminOrderQuantity: (offer: FOOFFERINVENTORYWITHPRICES) => number;
    getOfferCustomFields: (offer: FOBESTOFFERPRICE) => FoCustomFieldValue[];
    getOfferCustomFieldsById: (offer: FOBESTOFFERPRICE, id: string) => FoCustomFieldValue;
    getProductsVariantsFromOffers: (offer: FOBESTOFFERPRICE[]) => FoProductVariant[];
    getDeliveryDates: (offer: FOBESTOFFERPRICE) => any;
    getProductVariantMpn: (offer: FOBESTOFFERPRICE) => string;
    getOfferIdFormSearch: (offer: CONTENTRECORDSEARCHRESPONSE) => string;
    getOfferPriceFormSearch: (offer: CONTENTRECORDSEARCHRESPONSE) => number;
    getOfferPriceHTFormSearch: (offer: CONTENTRECORDSEARCHRESPONSE) => number;
    getOfferVariantId: (offer: CONTENTRECORDSEARCHRESPONSE) => string;
}

export interface OrderGetters<ORDERLOGISTICITEM, ORDERLOGISTIC, ORDER> {
    getProductUnitPrice: (orderLogistic: ORDERLOGISTICITEM, currency: string) => number;
    getProductUnitPriceFormated: (orderLogistic: ORDERLOGISTICITEM, currency: string) => string;
    getProductUnitPriceConfirmed: (orderLogistic: ORDERLOGISTICITEM, currency: string) => number;
    getProductUnitPriceConfirmedFormated: (orderLogistic: ORDERLOGISTICITEM, currency: string) => string;
    getProductTotalPrice: (orderLogistic: ORDERLOGISTICITEM, currency: string) => string;
    getQuantity: (orderLogistic: ORDERLOGISTICITEM) => number;
    getConfirmedQuantity: (orderLogistic: ORDERLOGISTICITEM) => number;
    getOrdersOnHold: (ordersList: ORDERLOGISTIC[], id: string) => any;
    getOrdersNotOnHold: (ordersList: ORDERLOGISTIC[], id: string) => any;
    getOrdersToApprove: (ordersList: ORDERLOGISTIC[], id: string) => any;
    getOrdersWaitingToApprove: (ordersList: ORDERLOGISTIC[], id: string) => any;
    getOrdersWaitingSupplierApproval: (ordersList: ORDERLOGISTIC[]) => any;
    getOrdersWaitingShipment: (ordersList: ORDERLOGISTIC[]) => any;
    getOrdersShipped: (ordersList: ORDERLOGISTIC[]) => any;
    getOrdersCompleted: (ordersList: ORDERLOGISTIC[]) => any;
    getOrdersCanceled: (ordersList: ORDERLOGISTIC[]) => any;
    getOrdersWithAccident: (ordersList: ORDERLOGISTIC[]) => any;
    getShippingTrackingURL: (order: ORDER) => string;
    getStepsOrder: (status: string) => any;
    getOrdersWithIncidents: (ordersList: ORDERLOGISTIC[], id: string) => any;
    getTotalOrder: (order: ORDERLOGISTIC, currency: string) => any;
    getOrderQuantity: (orderLogistic: ORDERLOGISTIC) => number;
    getVariantName: (orderLogistic: ORDERLOGISTICITEM) => string;
    getVariantImg: (orderLogistic: ORDERLOGISTICITEM) => string | null;
    getOrderProductSku: (orderLogistic: ORDERLOGISTICITEM) => string;
    getOrderProductBrand: (orderLogistic: ORDERLOGISTICITEM) => string;
    getOrderProductImage: (orderLogistic: ORDERLOGISTICITEM) => string;
    getOrderProductName: (orderLogistic: ORDERLOGISTICITEM) => string;
    getOrderProductPerPack: (orderLogistic: ORDERLOGISTICITEM) => number;
    getBillingAddressExternalId: (orderLogistic: ORDERLOGISTIC) => string | null;
    getShippingAddressExternalId: (orderLogistic: ORDERLOGISTIC) => string | null;
    getProductTotalPriceHT: (orderLogistic: ORDERLOGISTICITEM, currency: string) => string;
    getProductTotalPriceTTC: (orderLogistic: ORDERLOGISTICITEM, currency: string) => string;
    getSupplierName: (orderLogistic: ORDERLOGISTIC) => string | null;
    getProductPriceHT: (orderLogistic: ORDERLOGISTICITEM, currency: string) => string;
    getSuppliersList: (order: ORDERLOGISTIC[]) => any;
    getOrderItemsBySuppliers: (ordersList: ORDERLOGISTIC[]) => any;
    getOrderShippingFeesWithoutTax: (order: ORDER, currency: string) => string;
    getOrderShippingFeesWithTax: (order: ORDER, currency: string) => string;
    getOrderTotalTVA: (order: ORDER, currency: string) => string;
    getOrderTotalHT: (order: ORDER, currency: string) => string;
    getOrderTotalTTC: (order: ORDER, currency: string) => string;
    getOrderTotalEcoTaxHT: (order: ORDER, currency: string, customFieldKey: string) => string;
    getOrderTotalShippingFeeFromSupplierName: (
        orderLogistic: ORDERLOGISTIC[],
        supplierName: string,
        currency: string,
    ) => string;
    getFirstShippingAddressExternalIdFromCommercialOrder: (order: ORDER) => string | null;
    getBillingAddressExternalIdFromCommercialOrder: (order: ORDER) => string | null;
    getTotalProductTaxAmount: (order: ORDER) => string | null;
}

export interface ProductGetters<PRODUCT> {
    getProductId: (product: PRODUCT) => string;
    getProductExternalId: (product: PRODUCT) => string;
    getProductTitle: (product: PRODUCT) => string | null;
    getProductNpm: (product: PRODUCT) => string | null;
    getProductCategory: (product: PRODUCT) => string;
    getProductSku: (product: PRODUCT) => string;
    getProductMainImage: (product: PRODUCT) => ProductMediaInfoDTO | null;
    getProductDescription: (product: PRODUCT) => string;
    getProductBrand: (product: PRODUCT) => string;
    getProductTags: (product: PRODUCT) => Array<string>;
    getProductSpecifications: (product: PRODUCT) => ProductSpecification[];
    getProductThumbnails: (product: PRODUCT) => Thumbnails[] | null;
    getRatingProduct: (product: any) => any;
    getReviews: (product: any) => any;
    getAttributes: (product: any) => any;
    getProductAttributes: (product: PRODUCT) => any[];
    getProductPictures: (product: PRODUCT) => ProductMediaInfoDTO[] | null;
    getProductAttributesValues: (product: PRODUCT, locale: string) => any;
    getProductCustomField: (product: PRODUCT, customFieldExternalID: string) => AttributeValueType[];
    getProductUnit: (product: PRODUCT) => string;
    getProductName: (product: ProductV2) => string;
    getMainPictureUrl: (product: ProductV2) => string;
}

export interface QuoteGetters<QUOTE, SUPPLIERQUOTE> {
    getTotal: (quotes: QUOTE[]) => number;
    getQuoteId: (quote: QUOTE) => string;
    getQuoteName: (quote: QUOTE) => string;
    getQuoteNbItems: (quote: any) => number;
    getSupplierQuotes: (quote: QUOTE) => SupplierQuote[];
    getQuoteCreate: (quote: QUOTE) => boolean;
    getMasterQuoteLines: (quote: QUOTE) => QuoteLine[];
    getSupplierQuoteTotalAmount: (supplierQuote: any, currency: any) => string;
    getSuppliersForProduct: (productVariantId: string, supplierQuotes: SUPPLIERQUOTE[]) => any;
    getDeliveryLinesForProduct: (productVariantId: string, supplierQuotes: any) => any;
    getSupplierQuoteLineTotalAmount: (supplierQuoteLine: any, currency: any) => string;
    getStepsQuote: (status: string) => any;
    getStatusQuote: (status: string) => string;
    getSupplierQuoteTotalProductsNoTax: (supplierQuote: any, currency: any) => string;
    getSupplierQuoteTotalProductsTax: (supplierQuote: any, currency: any) => string;
    getSupplierQuoteTotalShippingNotTax: (supplierQuote: any, currency: any) => string;
    getSupplierQuoteTotalTVA: (supplierQuote: any, currency: any) => string;
    getSupplierQuoteTotalShippingTax: (supplierQuote: any, currency: any) => string;
    getSupplierQuoteTotalTax: (supplierQuote: any, currency: any) => string;
    getProductAttributesValues: (productVariantId: any, locale: string) => any;
}

export interface ShopGetters<THUMBNAIL> {
    getTotalPages: (thumbnail: THUMBNAIL) => number;
    getTotalElements: (thumbnail: THUMBNAIL) => number;
    getProducts: (thumbnail: THUMBNAIL) => ProductThumbnail[];
    prioritizeFacets: (facets: FacetValue[], filters: string[]) => FacetValue[];
    filterList: (items: Aggregation[], search: string, filterValues: string[]) => FacetValue[];
    filterFacet: (items: Aggregation[], search: string, filterValues: string[]) => FacetValue[];
}

export interface WishlistGetters {
    getTotal: (items: any) => any;
    getOfferIdFromBuyingListItem: (item: BuyingListItem) => String;
    getQteFromBuyingListItem: (item: BuyingListItem) => Number;
    getBuyingListToOrder: (item: BuyingList) => BuyingListItemWithOfferId[];
    getMinOrderFromBuyingListItem: (item: BuyingListItem) => Number;
    getStockFromBuyingListItem: (item: BuyingListItem) => Number;
    getBuyingListToOrderV2: (item: BuyingList) => BuyingListItemWithOfferId[];
    getBuyingListTotalPriceHT: (item: BuyingListItem[], currency: string) => string;
}

export interface ThumbnailGetters<PRODUCTTHUMBNAIL, ProductThumbnailv2, PRODUCT, ProductThumbnailVariantPictureUrl> {
    getProductThumbnailId: (productThumbnail: PRODUCTTHUMBNAIL) => string;
    getProductThumbnailTitle: (productThumbnail: PRODUCTTHUMBNAIL) => string;
    getProductThumbnailCategory: (productThumbnail: PRODUCTTHUMBNAIL) => string;
    getProductThumbnailSku: (productThumbnail: PRODUCTTHUMBNAIL) => string;
    getProductThumbnailBrandName: (productThumbnail: PRODUCTTHUMBNAIL) => string;
    getProductThumbnailNbReviews: (productThumbnail: PRODUCTTHUMBNAIL) => number;
    getProductThumbnaiRating: (productThumbnail: PRODUCTTHUMBNAIL) => number;
    getProductThumbnailImages: (productThumbnail: PRODUCTTHUMBNAIL) => Thumbnails[];
    getProductThumbnailBestOffer: (productThumbnail: PRODUCTTHUMBNAIL) => any;
    getProductsThumbnailId: (productsList: PRODUCT[]) => any;
    getProductThumbnailDescription: (productThumbnail: PRODUCTTHUMBNAIL) => string;
    getProductFromThumbnail: (productThumbnail: PRODUCTTHUMBNAIL) => PRODUCT;
    getProductminShippingPrice: (productThumbnail: PRODUCTTHUMBNAIL) => number | null;
    getProductBestOfferName: (ProductThumbnail: PRODUCTTHUMBNAIL) => string | undefined;
    getProductVariantName: (ProductThumbnail: ContentRecordSearchResponse) => string;
    getProductVariantFromThumbnail: (productThumbnail: ProductThumbnailv2) => ProductThumbnailVariant;
    getProductThumbnailMainImage: (productThumbnail: ProductThumbnailVariant) => ProductThumbnailVariantPictureUrl[];
}

export interface ProductVariantGetters<PRODUCTVARIANT> {
    getProductId: (product: PRODUCTVARIANT) => string;
    getProductTitle: (product: PRODUCTVARIANT) => string | null;
    getProductNpm: (product: PRODUCTVARIANT) => string | null;
    getProductSku: (product: PRODUCTVARIANT) => string;
    getProductMainImage: (product: PRODUCTVARIANT) => string | null;
    getProductPictures: (productVariant: ProductV2) => ProductMediaInfoDTO[] | null;
}

export interface OrganisationGetters<FoCustomerOrganisationDto, EnumOrganisationStatus> {
    getOrganisationId: (organisation: FoCustomerOrganisationDto) => string;
    getAccountId: (organisation: FoCustomerOrganisationDto) => string;
    getOrganisationName: (organisation: FoCustomerOrganisationDto) => string;
    getChildrenOrga: (organisation: FoCustomerOrganisationDto) => FoCustomerOrganisationDto[];
    getEnumOrganisationStatus: (organisation: FoCustomerOrganisationDto) => EnumOrganisationStatus;
}
