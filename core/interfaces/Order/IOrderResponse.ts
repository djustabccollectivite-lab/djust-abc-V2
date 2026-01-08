import { FoCustomFieldValue } from "../ICustomField";
import { AddressSnapshot, CustomerUserSnapshot, OrderLogistic, OrderLogisticPrices, attributeValues } from "../IOrder";
import { SupplierSnapShot } from "../ISupplier";
import { Pageable } from "../IThumbnail";
import { ReasonType as RequestReasonType } from "./IOrderRequest";

export interface OrderList {
  content: Order[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort[];
  totalElements: number;
  totalPages: number;
}

export interface CreateOrder {
  createdAt: string;
  id: string;
  orderLogistics: OrderLogistic[];
  processing: boolean;
  reference: string;
}

export interface Order {
  billingAddressSnapshot: AddressSnapshot;
  channel: string;
  createdAt: string;
  customFieldValues: FoCustomFieldValue[];
  customUserSnapshot: CustomerUserSnapshot;
  externalId: string;
  externalSource: string;
  fulfillmentMessage: string;
  id: string;
  incidentDeclared: boolean;
  initialPrice: Price;
  lines: OrderLine[];
  orderCommercialId: string;
  orderCommercialReference: string;
  orderLogisticPrices: OrderLogisticPrices;
  orderOrigin: string;
  partiallyDeclinedBySupplier: boolean;
  paymentOption: string;
  paymentStatus: string;
  reference: string;
  shippingAddressSnapshot: AddressSnapshot;
  shippingTrackingUrl: string;
  shippingType: string;
  status: string;
  supplierSnapShot: SupplierSnapShot;
  updatedAt: string;
}

export interface Document {
  filename: string;
  id: string;
  name: string;
  type: DocumentType;
  uploadedAt: string;
}

export interface Review {
  comment: string;
  grade: number;
}

export interface ReasonType {
  claimReasonType: string;
  label: string;
}

export interface Subreason {
  description: string;
  externalId: string;
  externalSource: string;
  id: string;
  label: string;
  type: RequestReasonType;
}

interface Price {
  priceWithTax: number;
  priceWithouTax: number;
  shippingPriceWithTax: number;
  shippingPricewithoutTax: number;
  totalPriceWithTax: number;
  totalPriceWithoutTax: number;
}

export interface Sort {
  ascending: boolean;
  descending: boolean;
  direction: string;
  ignoreCase: boolean;
  nullHandling: string;
  property: string;
}

interface DocumentType {
  description: string;
  externalId: string;
  id: string;
  label: string;
}

export interface OrderLine {
  confirmedQuantity: number;
  customFieldValues: unknown[];
  id: string;
  incidentDeclared: boolean;
  orderLogisticLinePriceDto: OrderLogisticLinePriceDto;
  orderLogisticLineProductDto: OrderLogisticLineProductDto;
  orderLogisticLineProductVariantDto: OrderLogisticLineProductVariantDto;
  paymentStatus: string;
  quantity: number;
  status: string;
}

interface OrderLogisticLinePriceDto {
  confirmedPrice: number;
  currency: string;
  externalOfferId: string;
  externalSource: string;
  itemPerPack: number;
  itemPriceWithoutTaxes: number;
  packingType: string;
  price: number;
  priceWithTaxes: number;
  quantityPerItem: string;
  shippingPriceWithTaxes: number;
  shippingPriceWithoutTaxes: number;
  shippingTaxAmount: number;
  taxAmount: number;
  taxInformation: unknown;
  taxRate: number;
  totalItemPrice: number;
  totalItemPriceWithTaxes: number;
  totalItemTaxAmount: number;
  totalPriceWithTaxes: number;
  totalPriceWithoutTaxes: number;
  totalTaxes: number;
  type: string;
  typeValue: unknown;
}

interface OrderLogisticLineProductDto {
  brand: string;
  classificationCategory: string;
  defaultLanguage: string;
  description: string;
  djustProductUuid: string;
  externalId: string;
  externalSource: string;
  gtin: string;
  mainImageUrl: string;
  mpn: string;
  name: string;
  navigationCategories: unknown[];
  productUnit: string;
  sku: string;
  specifications: unknown[];
  tags: unknown[];
}

interface OrderLogisticLineProductVariantDto {
  attributeValues: attributeValues[];
  description: string;
  ean: string;
  externalId: string;
  externalReference: string;
  externalSource: string;
  gtin: string;
  mainImageUrl: string;
  mpn: string;
  name: string;
  productMediaInfoDTOS: ProductMediaInfoDTOS[];
  sku: string;
}

interface ProductMediaInfoDTOS {
  isMain: boolean;
  urls: Url[];
}

interface Url {
  formatType: string;
  heightInPx: number;
  sizeType: string;
  url: string;
  widthInPx: number;
}
