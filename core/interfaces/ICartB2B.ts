import { OfferInventory, OfferPrice, AttributeDetail, AttributeValue } from './IOffer';
import { ProductMediaInfoDTO } from './IProduct';
import { OfferCustomField } from './ICustomField';

export interface CartResume {
    id: String,
    name: string,
}


export interface CartInformations {
    creationDate: String;
    currency: string,
    id: string,
    name: string,
    numberOfLines: number,
    numberOfProducts: number,
    status: string,
    totalDiscountPrice: CartInformationsPrice,
    totalPrice: CartInformationsPrice,
    type: string,
    billingAddressId: string;
    customerUserId: string;
}

export interface CartInformationsPrice {
    priceWithTax: number,
    priceWithoutTax: number,
    taxAmount: number
}

export interface CartItem {
    offer: CartItemOffer,
    productVariant: CartItemProductVariant,
    quantity: number,
    supplier: CartItemSupplier
}

export interface CartItemProductVariant {
    brand: string,
    id: string,
    imageLink: string,
    name: string,
    sku: string,
    skuProduct: string,
    variantAttributesValues: CartItemVariantAttributesValues[]
}

export interface CartItemVariantAttributesValues {
}

export interface CartItemOffer {
    currency: number,
    stock: number,
    itemPerPack: number,
    minOrderQuantity: number,
    maxOrderQuantity: number,
    offerPriceId: string,
    totalDiscountPrice: CartInformationsPrice,
    totalPrice: CartInformationsPrice,
    customFieldValues: OfferCustomField[]
}

export interface CartItemSupplier {
    id: string,
    name: string,
}
