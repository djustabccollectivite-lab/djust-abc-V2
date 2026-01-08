import { CartItem, CartInformations } from '../interfaces/ICartB2B';
import tools from '../helpers/tools';
import { CartB2BGetters } from './types';

export const getProductExternalId = (cartLine: CartItem): string =>
    cartLine.productVariant.id ? cartLine.productVariant.id : cartLine.productVariant.sku;

export const getProductSku = (cartLine: CartItem): string => cartLine.productVariant.skuProduct;

export const getProductBrand = (cartLine: CartItem): string => {
    return cartLine.productVariant.brand;
};

export const getProductImage = (cartLine: CartItem): string => cartLine.productVariant.imageLink;

export const getProductName = (cartLine: CartItem): string | null => {
    return cartLine.productVariant.name ? cartLine.productVariant.name : null;
};

export const getOfferPriceId = (cartLine: CartItem): string => cartLine.offer.offerPriceId;

export const getQuantity = (cartLine: CartItem): number => cartLine.quantity;
export const getProductPerPack = (cartLine: CartItem): number => cartLine.offer.itemPerPack;

export const getSuppliersList = (cartItems: CartItem[]): any => {
    const data = cartItems.map((cartLine: CartItem) => {
        return cartLine.supplier.name;
    });
    return [...new Set(data)];
};

export const getCartItemsBySuppliers = (cartItems: CartItem[]): any => {
    return cartItems.reduce((memo: any, cartLine: any) => {
        if (!memo[cartLine.supplier.name]) {
            memo[cartLine.supplier.name] = [];
        }
        memo[cartLine.supplier.name].push(cartLine);
        return memo;
    }, {});
};

export const getOfferStock = (cartLine: CartItem): number => cartLine.offer.stock;
export const getOfferMinOrderQuantity = (cartLine: CartItem): number => cartLine.offer.minOrderQuantity;
export const getOfferMaxOrderQuantity = (cartLine: CartItem): number => cartLine.offer.maxOrderQuantity;

export const getSupplierName = (cartLine: CartItem): string => cartLine.supplier.name;

export const getProductAttributes = (cartLine: CartItem): any => {
    cartLine.productVariant.variantAttributesValues.map((attribut: any): any => {
        let valueAttribute = null;
        if (attribut.value != null) {
            valueAttribute =
                attribut.attribute?.type === 'LIST_TEXT'
                    ? attribut?.value[0]
                    : attribut?.attribute?.type === 'LIST_METRIC' || attribut?.attribute?.type === 'METRIC'
                      ? attribut?.value?.selectedValue + ' ' + attribut?.value?.unit
                      : attribut?.attribute?.type === 'LIST_COLOR'
                        ? attribut?.value[0]?.label
                        : attribut?.value;
        }
        return { label: attribut?.name, value: valueAttribute };
    });
};

export const getProductUnitPrice = (cartLine: CartItem, currency: string, maximumFractionDigits?: number): string => {
    const price = cartLine.offer.totalPrice.priceWithoutTax;
    return tools.formatCurrencyAuto(price, currency, maximumFractionDigits);
};

/**
 * @param  {CartItem} CartItem
 * @param  {string} currency
 * @param {number} ecoTax
 */
export const getProductUnitPriceWithoutEcoTax = (
    cartLine: CartItem,
    currency: string,
    ecoTax: number,
    maximumFractionDigits?: number,
): any => {
    const price = cartLine.offer.totalPrice.priceWithoutTax;
    return tools.formatCurrencyAuto(price - ecoTax, currency, maximumFractionDigits);
};

export const getProductTotalPriceWithoutEcoTax = (
    cartLine: CartItem,
    currency: string,
    ecoTax: number,
    maximumFractionDigits?: number,
): any => {
    const quantity = cartLine.quantity;
    const price = cartLine.offer.totalPrice.priceWithoutTax;
    return tools.formatCurrencyAuto(price * quantity - ecoTax * quantity, currency, maximumFractionDigits);
};

/**
 * @param  {CartLine} cartItem
 * @param  {string} currency
 */
export const getProductUnitDiscountPrice = (
    cartItem: CartItem,
    currency: string,
    maximumFractionDigits?: number,
): any => {
    const price = cartItem.offer.totalPrice;
    const discount = cartItem.offer.totalDiscountPrice;
    let result = price.priceWithoutTax;

    if (price.priceWithTax !== discount.priceWithTax) {
        result = discount.priceWithoutTax;
    }

    return tools.formatCurrencyAuto(result, currency, maximumFractionDigits);
};

/**
 * @param  {CartLine} cartItem
 * @param  {string} currency
 */
export const getProductTotalDiscountPrice = (
    cartItem: CartItem,
    currency: string,
    maximumFractionDigits?: number,
): any => {
    const quantity = cartItem.quantity;
    const price = cartItem.offer.totalPrice;
    const discount = cartItem.offer.totalDiscountPrice;
    let result = price.priceWithoutTax;

    if (price.priceWithTax !== discount.priceWithTax) {
        result = discount.priceWithoutTax;
    }
    result *= quantity;
    return tools.formatCurrencyAuto(result, currency, maximumFractionDigits);
};

export const getProductTotalPriceHT = (
    cartLine: CartItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    const price = cartLine.offer.totalPrice.priceWithoutTax;
    return tools.formatCurrencyAuto(price * cartLine.quantity, currency, maximumFractionDigits);
};

export const getProductTotalPriceTTC = (
    cartLine: CartItem,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    const price = cartLine.offer.totalPrice.priceWithTax;
    return tools.formatCurrencyAuto(price * cartLine.quantity, currency, maximumFractionDigits);
};

export const getTotalNumberCartItems = (cartInformations: CartInformations): number =>
    cartInformations.numberOfProducts ?? 0;

export const getTotalAmountOfCart = (cartInformations: CartInformations): number =>
    cartInformations.totalPrice?.priceWithoutTax;

export const getTotalAmountOfCartHT = (
    cartInformations: CartInformations,
    currency: string,
    maximumFractionDigits?: number,
): string => {
    const price = cartInformations?.totalDiscountPrice
        ? cartInformations.totalDiscountPrice
        : cartInformations.totalPrice;
    return tools.formatCurrencyAuto(price?.priceWithoutTax, currency, maximumFractionDigits);
};

export const getTotalAmountOfCartTTC = (
    cartInformations: CartInformations,
    currency: string,
    maximumFractionDigits?: number,
): string => tools.formatCurrencyAuto(cartInformations.totalPrice.priceWithTax, currency, maximumFractionDigits);

export const getCartTotalWeight = (
    cartItems: CartItem[]
) => {
    let totalPoidsKg = 0;

    cartItems.forEach(item => {
        const cartCf = item?.offer?.customFieldValues.find(
           (cf) => cf?.id === 'poids_kg'
        );

        const selectedValue =  parseFloat(cartCf?.value as any) || 0;
        totalPoidsKg += selectedValue * item.quantity;
    });

    return totalPoidsKg;
};

export const getCartTotalVAT = (
    cartInformations: CartInformations
) => {
    return cartInformations.totalPrice.priceWithTax;
};

const cartB2BGetters: CartB2BGetters<CartItem, CartInformations> = {
    getProductSku,
    getProductExternalId,
    getProductImage,
    getProductName,
    getProductBrand,
    getOfferPriceId,
    getQuantity,
    getProductPerPack,
    getSupplierName,
    getProductAttributes,
    getProductUnitPrice,
    getProductUnitPriceWithoutEcoTax,
    getProductTotalPriceWithoutEcoTax,
    getProductUnitDiscountPrice,
    getProductTotalDiscountPrice,
    getTotalNumberCartItems,
    getTotalAmountOfCart,
    getTotalAmountOfCartHT,
    getTotalAmountOfCartTTC,
    getOfferMaxOrderQuantity,
    getOfferMinOrderQuantity: getOfferMaxOrderQuantity,
    getOfferStock,
    getSuppliersList,
    getCartItemsBySuppliers,
    getProductTotalPriceHT,
    getProductTotalPriceTTC,
    getCartTotalWeight,
    getCartTotalVAT,
};

export default cartB2BGetters;
