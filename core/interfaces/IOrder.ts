import type { OfferCustomFieldSnapshotDtos } from './ICustomField';
import type { PriceRange } from './IOffer';

export interface Order {
    createdAt: string;
    reference: string;
    id: string;
    shippingTrackingUrl: string;
    orderLogisticPrices: OrderLogisticPrices;
    orderLogistics: OrderLogistic[];
}

export interface OrderLogistic {
    id: string;
    createdAt: string;
    updatedAt: string;
    reference: string;
    externalId: string | null;
    orderCommercialReference: string;
    incident: boolean;
    supplierSnapshot: SupplierSnapshot;
    shippingAddressSnapshot: AddressSnapshot;
    billingAddressSnapshot: AddressSnapshot;
    customerUserSnapshot: CustomerUserSnapshot;
    externalSource: string;
    status: string;
    paymentStatus: string;
    channel: string;
    orderLogisticPrices: OrderLogisticPrices;
    lines: OrderLogisticItem[];
    orderOrigin: string;
    shippingType: string;
}

export interface AddressSnapshot {
    additionalAddress: string | null;
    address: string;
    city: string;
    company?: string;
    country: string;
    externalId?: string;
    fullName: string;
    label: string;
    phone: string;
    state: string;
    zipcode: string;
}

export interface CustomerUserSnapshot {
    civility: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    parentId: string;
    parentName: string;
}

export interface OrderLogisticItem {
    id: string;
    quantity: number;
    confirmedQuantity: number;
    offerCustomFieldSnapshotDtos?: OfferCustomFieldSnapshotDtos[];
    orderLogisticLinePriceDto: orderLogisticItemPrice;
    orderLogisticLineProductDto: orderLogisticItemProduct;
    orderLogisticLineProductVariantDto: OrderLogisticItemProductVariant;
}

export interface orderLogisticItemProduct {
    sku: string;
    djustProductUuid: string;
    tags: string[];
    externalSource: string;
    productUnit: string;
    name: string;
    gtin: string;
    mainImageUrl: string;
    classificationCategory: string;
    brand: string;
    mpn: string;
    defaultLanguage: string;
    description: string;
    specifications: specifications[];
    navigationCategories: string[];
    productAttributeValues: ProductAttribute[];
}

interface ProductAttribute {
    attribute: string;
    attributeExternalId: string;
    attributeExternalSource: string;
    attributeId: string;
    attributeType: string;
    attributeValue: string;
    id: string;
    attributeName: Record<string, string>;
}

export interface specifications {
    attribute: string;
    value: string;
}

export interface OrderLogisticItemProductVariant {
    sku: string;
    name: string;
    externalReference: string | null;
    externalSource: string | null;
    gtin: string | null;
    mpn: string | null;
    mainImageUrl: string | null;
    attributeValues: attributeValues[];
}

export interface attributeValues {
    attribute: string;
    attributeValue: string;
}

export interface orderLogisticItemPrice {
    price: number;
    confirmedPrice: number;
    type: string;
    typeValue: string | null;
    itemPerPack: number;
    quantityPerItem: number;
    externalSource: string;
    currency: string;
    packingType: string;
    itemPriceWithoutTaxes: number;
    totalPriceWithTaxes: number;
    totalPriceWithoutTaxes: number;
}

export interface OfferPriceSnapshot {
    customerAccountId: string;
    customerGroupId: string;
    id: string;
    itemPerPack: number;
    offerInventorySnapshot: OfferInventorySnapshot;
    priceRanges: PriceRange[];
}

export interface OfferInventorySnapshot {
    currency: string;
    externalOfferInventoryId: string;
    externalSource: string;
    id: string;
    packingType: string;
    productVariantSnapshot: ProductVariantSnapshot;
    quantityPerItem: number;
    status: string;
    stock: number;
}

export interface ProductVariantSnapshot {
    additionalImageLink: string[];
    attributeValueSnapshots: AttributeValueSnapshot[];
    gtin: string;
    mainImageUrl: string;
    mpn: string;
    name: string;
    skuProduct: string;
    skuVariant: string;
}

export interface OrderLogisticPrices {
    currency: string;
    totalItemPrice: number;
    totalOrderPrice: number;
    totalPriceWithTax: number;
    totalPriceWithoutTax: number;
    totalProductTaxAmount: number;
    totalProductWithTax: number;
    totalProductWithoutTax: number;
    totalShippingFees: number;
    totalShippingFeesWithTax: number;
    totalShippingFeesWithoutTax: number;
    totalShippingTaxAmount: number;
    totalTaxAmount: number;
}

export interface SupplierSnapshot {
    description: string | null;
    id: string;
    name: string;
    totalOffers: number;
    totalOrders: number;
    totalSales: number;
}

export interface AttributeValueSnapshot {
    attributeSnapshot: AttributeSnapshot;
    code: string;
    ranking: string;
}

export interface AttributeSnapshot {
    name: string;
    type: string;
}

export enum OrderStatus {
    ORDER_CREATED = 'ORDER_CREATED',
    WAITING_CUSTOMER_APPROVAL = 'WAITING_CUSTOMER_APPROVAL',
    WAITING_SUPPLIER_APPROVAL = 'WAITING_SUPPLIER_APPROVAL',
    DRAFT_ORDER_ON_HOLD = 'DRAFT_ORDER_ON_HOLD',
    DECLINED_BY_CUSTOMER = 'DECLINED_BY_CUSTOMER',
    DECLINED_BY_SUPPLIER = 'DECLINED_BY_SUPPLIER',
    ACCEPTED_BY_SUPPLIER = 'ACCEPTED_BY_SUPPLIER',
    WAITING_FULFILLMENT = 'WAITING_FULFILLMENT',
    WAITING_SHIPMENT = 'WAITING_SHIPMENT',
    PARTIALLY_SHIPPED = 'PARTIALLY_SHIPPED',
    PARTIALLY_CANCELED = 'PARTIALLY_CANCELED',
    SHIPPED = 'SHIPPED',
    INCIDENT = 'INCIDENT',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

export enum OrderStatusNew {
    CREATING = 'CREATING',
    DRAFT_ORDER = 'DRAFT_ORDER',
    DRAFT_ORDER_ON_HOLD = 'DRAFT_ORDER_ON_HOLD',
    ORDER_CREATED = 'ORDER_CREATED',
    WAITING_CUSTOMER_APPROVAL = 'WAITING_CUSTOMER_APPROVAL',
    WAITING_SUPPLIER_APPROVAL = 'WAITING_SUPPLIER_APPROVAL',
    DECLINED_BY_CUSTOMER = 'DECLINED_BY_CUSTOMER',
    DECLINED_BY_SUPPLIER = 'DECLINED_BY_SUPPLIER',
    ACCEPTED_BY_SUPPLIER = 'ACCEPTED_BY_SUPPLIER',
    WAITING_FULFILLMENT = 'WAITING_FULFILLMENT',
    WAITING_SHIPMENT = 'WAITING_SHIPMENT',
    PARTIALLY_SHIPPED = 'PARTIALLY_SHIPPED',
    PARTIALLY_CANCELED = 'PARTIALLY_CANCELED',
    SHIPPED = 'SHIPPED',
    INCIDENT = 'INCIDENT',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}
export enum OrderPaymentStatus {
    INIT_PAYMENT = 'INIT_PAYMENT',
    AUTHORIZATION_PENDING = 'AUTHORIZATION_PENDING',
    AUTHORIZED = 'AUTHORIZED',
    WAITING_AUTHORIZATION = 'WAITING_AUTHORIZATION',
    WAITING_PAYMENT = 'WAITING_PAYMENT',
    CAPTURE_PENDING = 'CAPTURE_PENDING',
    PAID = 'PAID',
    PARTIALLY_PAID = 'PARTIALLY_PAID',
    OVER_PAID = 'OVER_PAID',
    REFUSED = 'REFUSED',
    WAITING_REFUND = 'WAITING_REFUND',
    PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
    REFUNDED = 'REFUNDED',
}
export enum OrderPaymentOption {
    BANK_WIRE = 'BANK_WIRE',
    BANK_WIRE_ON_DUE_DATE = 'BANK_WIRE_ON_DUE_DATE',
    CREDIT_CARD = 'CREDIT_CARD',
    DIRECT_PAYMENT = 'DIRECT_PAYMENT',
    BANK_WIRE_ON_ACCEPTANCE = 'BANK_WIRE_ON_ACCEPTANCE',
}
