export interface TotalDiscountPrice {
    priceWithTax: number;
    priceWithoutTax: number;
    taxAmount: number;
}

export interface TotalPrice {
    priceWithTax: number;
    priceWithoutTax: number;
    taxAmount: number;
}

export interface Cart {
    creationDate: string;
    currency: string;
    id: string;
    name: string;
    numberOfLines: number;
    numberOfProducts: number;
    status: string;
    totalDiscountPrice: TotalDiscountPrice;
    totalPrice: TotalPrice;
    type: string;
}

export interface CartListResponse {
    carts: Cart[];
    page: number;
    size: number;
    sort: string[];
    totalElement: number;
}

export interface CartResponse {
    creationDate: string;
    currency: string;
    id: string;
    name: string;
    nbFirstLines: Array<{
        blockedLineInformation: Array<{
            code: string;
            detail: string;
        }>;
        createdAt: string;
        offer: {
            currency: string;
            customFieldValues: Array<{
                id: string;
                name: string;
                value: string;
            }>;
            itemPerPack: number;
            maxOrderQuantity: number;
            minOrderQuantity: number;
            navigationCategory: string;
            offerPriceId: string;
            packingType: string;
            productUnit: string;
            quantityPerItem: number;
            status: string;
            stock: number;
            totalDiscountPrice: {
                priceWithTax: number;
                priceWithoutTax: number;
                taxAmount: number;
            };
            totalPrice: {
                priceWithTax: number;
                priceWithoutTax: number;
                taxAmount: number;
            };
        };
        productVariant: {
            brand: string;
            id: string;
            imageLink: string;
            mainProductBusinessId: string;
            name: string;
            sku: string;
            skuProduct: string;
            status: string;
            variantAttributesValues: Array<{
                id: string;
                name: string;
                value: string;
            }>;
        };
        quantity: number;
        supplier: {
            id: string;
            name: string;
            status: string;
        };
        updatedAt: string;
    }>;
    numberOfLines: number;
    numberOfProducts: number;
    status: string;
    supplierAggregates: Array<{
        numberOfLines: number;
        numberOfProducts: number;
        supplierId: string;
        supplierName: string;
        totalDiscountPrice: {
            priceWithTax: number;
            priceWithoutTax: number;
            taxAmount: number;
        };
        totalPrice: {
            priceWithTax: number;
            priceWithoutTax: number;
            taxAmount: number;
        };
    }>;
    totalDiscountPrice: {
        priceWithTax: number;
        priceWithoutTax: number;
        taxAmount: number;
    };
    totalPrice: {
        priceWithTax: number;
        priceWithoutTax: number;
        taxAmount: number;
    };
    type: string;
}

export interface CustomFieldValue {
    id: string;
    name: string;
    value: string;
}

export interface VariantAttributesValue {
    id: string;
    name: string;
    value: string;
}

export interface ProductVariant {
    brand: string;
    id: string;
    imageLink: string;
    mainProductBusinessId: string;
    name: string;
    sku: string;
    variantAttributesValues: VariantAttributesValue[];
}

export interface Supplier {
    id: string;
    name: string;
}

export interface Offer {
    currency: string;
    customFieldValues: CustomFieldValue[];
    itemPerPack: number;
    maxOrderQuantity: number;
    minOrderQuantity: number;
    offerPriceId: string;
    stock: number;
    totalDiscountPrice: TotalDiscountPrice;
    totalPrice: TotalPrice;
}

export interface CartLine {
    offer: Offer;
    productVariant: ProductVariant;
    quantity: number;
    supplier: Supplier;
}
export interface CartLinesResponse {
    cartLines: CartLine[];
    page: number;
    size: number;
    sort: string[];
    totalElement: number;
}
