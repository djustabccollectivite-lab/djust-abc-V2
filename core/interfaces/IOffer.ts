import { FoSupplier, FoProductVariant } from './ICart';
import { FoCustomFieldValue } from './ICustomField';
import { Supplier } from './ISupplier';

export interface Offer {
    createdAt: string;
    currency: string;
    externalOfferInventoryId: string;
    externalSource: string;
    id: string;
    offerPrices: OfferPrice[];
    packingType: string;
    productUnit: string;
    productVariant: ProductVariant;
    quantityPerItem: number;
    status: string;
    stock: number;
    supplier: Supplier;
    updatedAt: string;
}

export interface FoBestOfferPrice {
    offerPrice: OfferPrice;
    offerInventory: OfferInventory;
    supplier: FoSupplier;
    estimatedDeliveryDates: DeliveryDates;
}

export interface DeliveryDates {
    code: string;
    deliveryTimeRange: DeliveryTime;
    label: string;
    shippingPriceUnit: number;
    shippingZone: AreaShipping;
}

export interface AreaShipping {
    code: string;
    label: string;
}
export interface DeliveryTime {
    earliestDeliveryDate: string;
    latestDeliveryDate: string;
}
export interface OfferInventory {
    id: string;
    quantityPerItem: number;
    stock: number;
    brand: string;
    externalSource: string;
    status: string;
    currency: string;
    packingType: string;
    productUnit: string;
    variant: FoProductVariant;
    maxOrderQuantity: number;
    minOrderQuantity: number;
    minStockAlert: number;
    minShippingPrice: number;
    minShippingPriceAdditional: number;
    minShippingType: number;
    minShippingZone: string;
    leadTimeToShip: number;
    customFieldValues: FoCustomFieldValue[];
}
export interface Offer {
    id: string;
    quantityPerItem: number;
    stock: number;
    currency: string;
    packingType: string;
    productUnit: string;
    maxOrderQuantity: number;
    minOrderQuantity: number;
    minStockAlert: number;
    minShippingPrice: number;
    leadTimeToShip: number;
    customFields: FoCustomFieldValue[];
    supplier: Supplier;
}

export interface OfferPrice {
    id: string;
    externalId: string;
    offerPriceType: string;
    itemPerPack: number;
    customerAccountId: string;
    customerTagId: string;
    priceRanges: PriceRange[];
}

export interface OfferPriceFormSearch {
    id: string;
    externalId: string;
    offerPriceType: string;
    itemPrice: number;
    itemPerPack: number;
    price: number;
}

export interface PriceRange {
    discountPrice: ProductPrice;
    quantity: number;
    price: ProductPrice;
}

export interface ProductPrice {
    itemPrice: number;
    unitPrice: number;
    itemPriceTTC: number;
    unitPriceTTC: number;
}

export interface ProductVariant {
    additionalImageLink: string[] | null;
    attributesDetails: AttributeDetail[];
    createdAt: string;
    updatedAt: string;
    default: boolean;
    externalSource: string | null;
    externalReference: string | null;
    gtin: string | null;
    externalId: string | null;
    id: string;
    mainImageUrl: string | null;
    mpn: string | null;
    name: string | null;
    skuProduct: string;
    skuVariant: string;
    status: string;
    version: number;
}

export interface AttributeDetail {
    attribute: Attribute;
    attributeValue: AttributeValue;
}
export interface AttributeValue {
    value: string;
    id: string;
    ranking: number;
    status: string;
}

export interface Attribute {
    id: string;
    name: string;
    status: string;
    type: string;
}

export interface FoOfferInventoryWithPrices {
    offerInventory: OfferInventory;
    supplier: FoSupplier;
    offerPrices: OfferPrice[];
}
