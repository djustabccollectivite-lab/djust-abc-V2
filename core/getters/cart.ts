import { CartDeliveryLine, CartLine, DataType, FoAttributeValue } from '../interfaces/ICart';
import tools from '../helpers/tools';
import { CartGetters } from './types';
import { ProductMediaInfoDTO } from '../interfaces/IProduct';
import { CustomFieldData, FoCustomFieldValue } from '~/core/interfaces/ICustomField';

export const getProductId = (cartLine: CartLine): string => cartLine.offerInventory.variant.id;

export const getProductExternalId = (cartLine: CartLine): string =>
    cartLine.offerInventory.variant.externalId
        ? cartLine.offerInventory.variant.externalId
        : cartLine.offerInventory.variant.skuProduct;

export const getProductSku = (cartLine: CartLine): string => cartLine.offerInventory.variant.skuProduct;

export const getProductBrand = (cartLine: CartLine): string => {
    return cartLine.offerInventory.brand;
};

export const getProductMpn = (cartLine: CartLine): string => {
    return cartLine.offerInventory.variant.mpn;
};

export const getProductImage = (cartLine: CartLine): ProductMediaInfoDTO =>
    cartLine.offerInventory.variant.productMediaInfoDTO;

export const getOfferStock = (cartLine: CartLine): number => cartLine.offerInventory.stock;

export const getProductName = (cartLine: CartLine): string | null => {
    return cartLine.offerInventory.variant.name ? cartLine.offerInventory.variant.name : null;
};

export const getOfferPriceId = (cartLine: CartLine): string => cartLine.offerPrice.id;

export const getQuantity = (cartLine: CartLine): number => cartLine.quantity;

export const getProductPerPack = (cartLine: CartLine): number => cartLine.offerPrice.itemPerPack;

export const getSupplierName = (cartLine: CartLine): string => cartLine.supplier.name;

export const getProductAttributes = (cartLine: CartLine): any => {
    cartLine.offerInventory.variant.attributeValues.map((attribut: FoAttributeValue): any => {
        let valueAttribute = null;
        if (attribut.value != null) {
            valueAttribute =
                attribut.attribute.type === 'LIST_TEXT'
                    ? attribut.value[0]
                    : attribut.attribute.type === 'LIST_METRIC' || attribut.attribute.type === 'METRIC'
                    ? attribut.value.selectedValue + ' ' + attribut.value.unit
                    : attribut.attribute.type === 'LIST_COLOR'
                    ? attribut.value[0].label
                    : attribut.value;
        }

        return { label: 'test', value: valueAttribute };
    });
};

interface ProductAttributeValues {
    externalId: string;
    label: string;
    value: any;
}

interface ProductAttributeValues {
    externalId: string;
    label: string;
    value: any;
}

export const getProductAttributesValues = (cartLine: CartLine, locale: string): Array<ProductAttributeValues> =>
    cartLine.offerInventory.variant.attributeValues.map(
        (foAttributeValue: FoAttributeValue): ProductAttributeValues => ({
            externalId: foAttributeValue.attribute.externalId,
            label: foAttributeValue.attribute.name[locale],
            value: getAttributeValue(foAttributeValue.attribute.type, foAttributeValue.value),
        })
    );

const getAttributeValue = (type: DataType, value: any): any => {
    if (type === DataType.LIST_TEXT) {
        return value[0];
    } else if (type.includes('METRIC')) {
        return `${value.selectedValue} ${value.unit}`;
    } else {
        return value;
    }
};

/**
 * @param  {CartLine} cartLine
 * @param  {string} currency
 */
export const getProductUnitPrice = (cartLine: CartLine, currency: string, maximumFractionDigits?: number): any => {
    const quantity = cartLine.quantity;
    const priceRanges = cartLine.offerPrice.priceRanges;
    const result = tools.calculDetermineProductPrice(priceRanges, quantity);
    return tools.formatCurrencyAuto(result, currency, maximumFractionDigits);
};

/**
 * @param  {CartLine} cartLine
 * @param  {string} currency
 * @param {number} ecoTax
 */
export const getProductUnitPriceWithoutEcoTax = (cartLine: CartLine, currency: string, ecoTax: number): any => {
    const quantity = cartLine.quantity;
    const priceRanges = cartLine.offerPrice.priceRanges;
    const result = tools.calculDetermineProductPrice(priceRanges, quantity);
    return tools.formatCurrencyAuto(result - ecoTax, currency);
};

export const getProductTotalPriceWithoutEcoTax = (cartLine: CartLine, currency: string, ecoTax: number): any => {
    const quantity = cartLine.quantity;
    const priceRanges = cartLine.offerPrice.priceRanges;
    const result = tools.calculDetermineProductPrice(priceRanges, quantity);
    return tools.formatCurrencyAuto(result * quantity - ecoTax * quantity, currency);
};

export const getProductTotalPrice = (cartLine: CartLine, currency: string, maximumFractionDigits?: number): any => {
    const quantity = cartLine.quantity;
    const priceRanges = cartLine.offerPrice.priceRanges;
    const result = tools.calculDetermineProductPrice(priceRanges, quantity);
    return tools.formatCurrencyAuto(result * quantity, currency, maximumFractionDigits);
};

export const getProductTotalPriceWithVat = (cartLine: CartLine, currency: string): any => {
    const quantity = cartLine.quantity;
    const priceRanges = cartLine.offerPrice.priceRanges;
    const result = tools.calculDetermineProductPriceWithVat(priceRanges, quantity);

    return tools.formatCurrencyAuto(result * quantity, currency);
};

export const getCurrency = (cartLine: CartLine): string => cartLine.offerInventory.currency;

export const getDeliveryLines = (cartLine: CartLine): CartDeliveryLine[] => cartLine.deliveryLines;

export const getTotalAmountOfCart = (cartItems: CartLine[], currency: string): any => {
    const test = cartItems.map((cartitem) => {
        return {
            price: tools.calculDetermineProductPrice(cartitem.offerPrice.priceRanges, cartitem.quantity),
            quantity: cartitem.quantity,
        };
    });
    const total = test.reduce((acc, { quantity, price }) => acc + quantity * price, 0);
    return tools.formatCurrencyAuto(total, currency);
};
export const getTotalAmountOfCartHT = (cartItems: CartLine[], currency: string): any => {
    const test = cartItems.map((cartitem) => {
        return {
            price: tools.calculDetermineProductPrice(cartitem.offerPrice.priceRanges, cartitem.quantity),
            quantity: cartitem.quantity,
        };
    });
    const total = test.reduce((acc, { quantity, price }) => acc + quantity * price, 0);
    return tools.formatCurrencyAuto(total, currency);
};
export const getTotalShippingFee = (cartItems: CartLine[], currency: string) => {
    let shippingFee = 0;
    cartItems.forEach(function (element) {
        if (element.deliveryLines[0]?.totalShippingFees) {
            shippingFee += element.deliveryLines[0].totalShippingFees;
        } else shippingFee += 0;
    });
    return tools.formatCurrencyAuto(shippingFee, currency);
};

export const getTotalAmountOfCartWithTax = (cartItems: CartLine[], currency: string): any => {
    const cartitemObject = cartItems.map((cartitem) => {
        return {
            price: tools.calculDetermineProductPriceWithVat(cartitem.offerPrice.priceRanges, cartitem.quantity),
            quantity: cartitem.quantity,
        };
    });

    const totalProduct = cartitemObject.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

    let totalShippingTaxAmount = 0;

    cartItems.forEach((cartItem) => {
        cartItem.deliveryLines.forEach((deliveryLine) => {
            if (deliveryLine.tax) totalShippingTaxAmount += deliveryLine.tax.shippingTaxAmount;
        });
    });

    let totalAmountOfSipping = 0;
    cartItems.forEach((cartItem) => {
        cartItem.deliveryLines.forEach((deliveryLine) => {
            if (deliveryLine.totalShippingFees) totalAmountOfSipping += deliveryLine.totalShippingFees;
        });
    });
    const total =
        totalProduct + totalShippingTaxAmount + totalAmountOfSipping < 0
            ? 0
            : totalProduct + totalShippingTaxAmount + totalAmountOfSipping;
    return tools.formatCurrencyAuto(total, currency);
};

export const getTaxAmount = (cartItems: CartLine[], currency: string): any => {
    const test = cartItems.map((cartitem) => {
        return {
            price: tools.calculDetermineVat(cartitem.offerPrice.priceRanges, cartitem.quantity),
            quantity: cartitem.quantity,
        };
    });
    const total = test.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    return tools.formatCurrencyAuto(total < 0 ? 0 : total, currency);
};

export const getShippingFeesWithoutTax = (cartItems: CartLine[], currency: string): any => {
    let total = 0;
    cartItems.forEach((cartItem) => {
        cartItem.deliveryLines.forEach((deliveryLine) => {
            total += deliveryLine.shippingTypes[0]?.totalShippingPrice;
        });
    });
    return tools.formatCurrencyAuto(total, currency);
};

export const getShippingTaxAmount = (cartItems: CartLine[], currency: string): any => {
    let totalShippingTaxAmount = 0;
    cartItems.forEach((cartItem) => {
        cartItem.deliveryLines.forEach((deliveryLine) => {
            if (deliveryLine.tax) {
                totalShippingTaxAmount += deliveryLine.tax?.shippingTaxAmount;
            }
        });
    });
    return tools.formatCurrencyAuto(totalShippingTaxAmount, currency);
};

export const getTotalTVA = (cartItems: CartLine[], currency: string): any => {
    let totalProductTax = 0;
    let totalShippingTax = 0;
    let totalTVA = 0;
    cartItems.forEach((cartItem) => {
        cartItem.deliveryLines.forEach((deliveryLine) => {
            if (deliveryLine.tax) {
                totalShippingTax += deliveryLine.tax?.shippingTaxAmount;
            }
        });
    });
    cartItems.forEach((cartItem) => {
        cartItem.offerPrice.priceRanges.forEach((priceRange) => {
            if (priceRange.price) {
                totalProductTax += (priceRange.price.unitPriceTTC - priceRange.price.unitPrice) * cartItem.quantity;
            }
        });
    });
    totalTVA = totalProductTax + totalShippingTax;
    return tools.formatCurrencyAuto(totalTVA, currency);
};

export const getTotalAmountOfSipping = (cartItems: CartLine[], currency: string): any => {
    let totalAmountOfSipping = 0;
    cartItems.forEach((cartItem) => {
        cartItem.deliveryLines.forEach((deliveryLine) => {
            if (deliveryLine.totalShippingFees) {
                totalAmountOfSipping += deliveryLine.totalShippingFees;
            }
        });
    });
    return tools.formatCurrencyAuto(totalAmountOfSipping, currency);
};

export const calculateTotalOrderPrice = (orderValidated: any): any => {
    let total = 0;
    orderValidated.orderLogistics.forEach((orderLogistic: any) => {
        orderLogistic.lines.forEach((item) => {
            total += item.orderLogisticLinePriceDto.price * item.quantity;
        });
    });
    return total;
};

export const getTotalOrderValidated = (orderValidated: any, currency: string): any => {
    return tools.formatCurrencyAuto(calculateTotalOrderPrice(orderValidated), currency);
};

export const getTotalOrderCommercialWithoutVatAndShipping = (orderValidated: any, currency: string): any => {
    const totalOrderCommercialWithourVatAndShipping = orderValidated.orderLogistics.reduce(
        (acc, { orderLogisticPrices }) => acc + orderLogisticPrices.totalProductWithoutTax,
        0
    );
    return tools.formatCurrencyAuto(totalOrderCommercialWithourVatAndShipping, currency);
};

export const getTotalOrderCommercialShipping = (orderValidated: any, currency: string): any => {
    const totalOrderCommercialShipping = orderValidated.orderLogistics.reduce(
        (acc, { orderLogisticPrices }) => acc + orderLogisticPrices.totalShippingFeesWithoutTax,
        0
    );
    return tools.formatCurrencyAuto(totalOrderCommercialShipping, currency);
};

export const getTotalOrderCommercialTax = (orderValidated: any, currency: string): any => {
    const totalOrderCommerciaTax = orderValidated.orderLogistics.reduce(
        (acc, { orderLogisticPrices }) => acc + orderLogisticPrices.totalTaxAmount,
        0
    );
    return tools.formatCurrencyAuto(totalOrderCommerciaTax, currency);
};

export const getTotalOrderCommercial = (orderValidated: any, currency: string): any => {
    const totalOrderCommercial = orderValidated.orderLogistics.reduce(
        (acc, { orderLogisticPrices }) => acc + orderLogisticPrices.totalOrderPrice,
        0
    );
    return tools.formatCurrencyAuto(totalOrderCommercial, currency);
};

export const getTotalOrderValidatedWithShipping = (orderValidated: any, currency: string): any => {
    return tools.formatCurrencyAuto(calculateTotalOrderPrice(orderValidated) + 50, currency);
};

export const getTotalOrderValidatedVAT = (orderValidated: any, currency: string): any => {
    return tools.formatCurrencyAuto((calculateTotalOrderPrice(orderValidated) + 50) * 0.2, currency);
};

export const getTotalOrderValidatedWithVatAndShipping = (orderValidated: any, currency: string): any => {
    return tools.formatCurrencyAuto((calculateTotalOrderPrice(orderValidated) + 50) * 1.2, currency);
};

export const getTotalNumberCartItems = (cartItems: CartLine[]): number => cartItems.length;

export const getCartItemsBySuppliers = (cartItems: CartLine[]): any => {
    return cartItems.reduce((memo: any, cartLine: any) => {
        if (!memo[cartLine.supplier.name]) {
            memo[cartLine.supplier.name] = [];
        }
        memo[cartLine.supplier.name].push(cartLine);
        return memo;
    }, {});
};

export const getSuppliersList = (cartItems: CartLine[]): any => {
    const data = cartItems.map((cartLine: any) => {
        return cartLine.supplier.name;
    });
    return [...new Set(data)];
};

export const getTotalShippingFeeFromSupplierName = (cartItems: CartLine[], currency: string, supplierName: string) => {
    const cartItemsBySuppliers = getCartItemsBySuppliers(cartItems);

    return getTotalShippingFee(cartItemsBySuppliers[supplierName], currency);
};

const cartGetters: CartGetters<CartLine> = {
    getTotalNumberCartItems: getTotalNumberCartItems,
    getProductId: getProductId,
    getProductSku: getProductSku,
    getProductImage: getProductImage,
    getOfferStock: getOfferStock,
    getProductName: getProductName,
    getProductBrand: getProductBrand,
    getOfferPriceId: getOfferPriceId,
    getProductPerPack: getProductPerPack,
    getQuantity: getQuantity,
    getSupplierName: getSupplierName,
    getProductAttributes: getProductAttributes,
    getProductUnitPrice: getProductUnitPrice,
    getProductTotalPrice: getProductTotalPrice,
    getProductTotalPriceWithVat: getProductTotalPriceWithVat,
    getCurrency: getCurrency,
    getDeliveryLines: getDeliveryLines,
    getTotalAmountOfCart: getTotalAmountOfCart,
    getTotalAmountOfCartHT: getTotalAmountOfCartHT,
    getTotalAmountOfCartTTC: getTotalAmountOfCartWithTax,
    getTotalOrderValidated: getTotalOrderValidated,
    getTotalOrderValidatedWithShipping: getTotalOrderValidatedWithShipping,
    getTotalOrderValidatedVAT: getTotalOrderValidatedVAT,
    getTotalOrderValidatedWithVatAndShipping: getTotalOrderValidatedWithVatAndShipping,
    getCartItemsBySuppliers: getCartItemsBySuppliers,
    getSuppliersList: getSuppliersList,
    getTaxAmount: getTaxAmount,
    getTotalAmountOfCartWithTax: getTotalAmountOfCartWithTax,
    getTotalOrderCommercialShipping: getTotalOrderCommercialShipping,
    getTotalOrderCommercialTax: getTotalOrderCommercialTax,
    getTotalOrderCommercial: getTotalOrderCommercial,
    getTotalOrderCommercialWithoutVatAndShipping: getTotalOrderCommercialWithoutVatAndShipping,
    getShippingTaxAmount: getShippingTaxAmount,
    getTotalTVA: getTotalTVA,
    getShippingFeesWithoutTax: getShippingFeesWithoutTax,
    getTotalAmountOfSipping: getTotalAmountOfSipping,
    getProductMpn: getProductMpn,
    getProductExternalId: getProductExternalId,
    getTotalShippingFee: getTotalShippingFee,
    getProductAttributesValues: getProductAttributesValues,
    getProductUnitPriceWithoutEcoTax: getProductUnitPriceWithoutEcoTax,
    getProductTotalPriceWithoutEcoTax: getProductTotalPriceWithoutEcoTax,
    getTotalShippingFeeFromSupplierName: getTotalShippingFeeFromSupplierName,
};

export default cartGetters;
