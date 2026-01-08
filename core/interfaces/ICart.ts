import { OfferInventory, OfferPrice, AttributeDetail } from './IOffer';
import { ProductMediaInfoDTO } from './IProduct';

export interface Cart {
    focCartLineDtos: CartLine[];
    billingAddressId: string;
    customerUserId: string;
    id: string;
}

export interface CartLine {
    id: string;
    quantity: number;
    offerPrice: OfferPrice;
    offerInventory: OfferInventory;
    supplier: FoSupplier;
    deliveryLines: CartDeliveryLine[];
}

export interface CartDeliveryLine {
    addressId: string;
    id: string;
    quantity: number;
    selectedShippingType: string;
    totalShippingFees: number;
    shippingTypes: ShippingTypeInformation[];
    tax: TaxInformations;
}

export interface TaxInformations {
    productTaxAmount: number;
    productTaxCode: number;
    productTaxRate: number;
    shippingTaxAmount: number;
    shippingTaxCode: string;
    shippingTaxRate: number;
}

export interface ShippingTypeInformation {
    totalShippingPrice: number;
    code: string;
    label: string;
}

export interface FoProductVariant {
    externalId: string;
    mpn: string;
    id: string;
    skuProduct: string;
    skuVariant: string;
    name: string;
    mainImageUrl: string;
    productMediaInfoDTO: ProductMediaInfoDTO;
    attributesDetails: AttributeDetail[];
    attributeValues: FoAttributeValue[];
    default: boolean;
    status: string;
}

export interface FoSupplier {
    id: string;
    name: string;
}

export interface FoAttributeValue {
    attribute: FoAttribute;
    value: any;
}
export enum DataType {
    LONG_TEXT = 'LONG_TEXT',
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    METRIC = 'METRIC',
    DATE = 'DATE',
    COLOR = 'COLOR',
    MEDIA = 'MEDIA',
    LIST_TEXT = 'LIST_TEXT',
    LIST_METRIC = 'LIST_METRIC',
    LIST_COLOR = 'LIST_COLOR',
}

export interface DataMap {
    [key: string]: any;
}
export interface FoAttribute {
    externalId: string;
    id: string;
    type: DataType;
    name: DataMap;
}

enum CartImportStatus {
    INITIALIZED = 'INITIALIZED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
}

export interface CartImportResponse {
    cartId: string;
    cartImportId: string;
    errorsFilePath: string;
    sourceFilePath: string;
    status: CartImportStatus;
    totalLines: number;
    totalLinesInError: number;
    totalLinesProcessed: number;
}
